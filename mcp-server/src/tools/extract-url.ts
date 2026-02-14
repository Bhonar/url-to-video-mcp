import axios from 'axios';
import { chromium } from 'playwright';
import { extractColorsFromScreenshot } from '../utils/color-extraction.js';
import { takeScreenshot } from '../utils/screenshot.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExtractedContent {
  content: {
    title: string;
    description: string;
    features: string[];
    heroImage: string;
    sections: Array<{ heading: string; text: string }>;
  };
  branding: {
    logo: { url: string; staticPath?: string; base64?: string };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    font: string;
    theme: 'light' | 'dark';
  };
  metadata: {
    industry: string;
    domain: string;
  };
}

export async function extractUrlContent(url: string): Promise<ExtractedContent> {
  console.error(`Extracting content from: ${url}`);

  // Extract domain
  const domain = new URL(url).hostname;

  // Strategy 1: Try Tabstack
  let content: ExtractedContent['content'] | null = null;
  try {
    content = await extractWithTabstack(url);
    console.error('✓ Content extracted with Tabstack');
  } catch (error) {
    console.error('✗ Tabstack failed:', error instanceof Error ? error.message : String(error));
  }

  // Strategy 2: Try cloud logo APIs + color extraction
  let branding: ExtractedContent['branding'] | null = null;
  try {
    branding = await extractBrandingSimple(url);
    console.error('✓ Branding extracted with cloud APIs');
  } catch (error) {
    console.error('✗ Cloud branding extraction failed:', error instanceof Error ? error.message : String(error));
  }

  // Strategy 3: Fallback to Playwright screenshot + analysis
  if (!content || !branding) {
    console.error('Falling back to screenshot analysis...');
    const screenshot = await takeScreenshot(url);

    if (!content) {
      // Extract content from screenshot (would need Claude Vision API here)
      // For now, use basic extraction
      content = await extractContentFromScreenshot(screenshot, url);
    }

    if (!branding) {
      // Extract colors from screenshot
      const colors = await extractColorsFromScreenshot(screenshot);
      branding = {
        logo: { url: `${url}/favicon.ico` },
        colors,
        font: 'system-ui, sans-serif',
        theme: detectTheme(colors),
      };
    }
  }

  // Infer industry from domain/content
  const industry = inferIndustry(content!.title, content!.description);

  // Download logo to remotion-project/public/images/ for staticFile() access
  const logoStaticPath = await downloadLogoToPublic(branding!.logo.url, domain);
  if (logoStaticPath) {
    branding!.logo.staticPath = logoStaticPath;
  }

  return {
    content: content!,
    branding: branding!,
    metadata: {
      industry,
      domain,
    },
  };
}

async function extractWithTabstack(url: string): Promise<ExtractedContent['content']> {
  const apiKey = process.env.TABSTACK_API_KEY;
  if (!apiKey) {
    throw new Error('TABSTACK_API_KEY not set');
  }

  try {
    const response = await axios.post(
      'https://api.tabstack.ai/v1/extract/json',
      {
        url,
        json_schema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'The main title or product name' },
            description: { type: 'string', description: 'A brief description or value proposition' },
            features: {
              type: 'array',
              description: '3-5 key features or benefits',
              items: { type: 'string' }
            },
            heroImage: { type: 'string', description: 'URL of the main hero or banner image' },
            sections: {
              type: 'array',
              description: 'Main content sections',
              items: {
                type: 'object',
                properties: {
                  heading: { type: 'string' },
                  text: { type: 'string' }
                }
              }
            }
          },
          required: ['title', 'description', 'features']
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Tabstack API error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Extract branding using cloud APIs (no Docker needed!)
 * Fallback chain: Clearbit → Brandfetch → Common paths → Google Favicon
 */
async function extractBrandingSimple(url: string): Promise<ExtractedContent['branding']> {
  const domain = new URL(url).hostname.replace('www.', '');

  // Get logo from cloud services
  const logoUrl = await extractLogoFromCloud(domain, url);

  // Extract colors from screenshot
  const screenshot = await takeScreenshot(url);
  const colors = await extractColorsFromScreenshot(screenshot);

  return {
    logo: {
      url: logoUrl,
    },
    colors,
    font: 'system-ui, -apple-system, sans-serif',
    theme: detectTheme(colors),
  };
}

/**
 * Extract logo using cloud APIs - no Docker needed!
 */
async function extractLogoFromCloud(domain: string, fullUrl: string): Promise<string> {
  console.error(`Extracting logo for: ${domain}`);

  // Strategy 1: Clearbit Logo API (free, high quality)
  try {
    const clearbitUrl = `https://logo.clearbit.com/${domain}`;
    const response = await axios.head(clearbitUrl, { timeout: 5000 });
    if (response.status === 200) {
      console.error('✓ Logo found via Clearbit');
      return clearbitUrl;
    }
  } catch (error) {
    console.error('Clearbit failed, trying next method...');
  }

  // Strategy 2: Brandfetch API (free tier)
  try {
    const response = await axios.get(
      `https://api.brandfetch.io/v2/brands/${domain}`,
      { timeout: 5000 }
    );
    if (response.data?.logos?.[0]?.formats?.[0]?.src) {
      const logoUrl = response.data.logos[0].formats[0].src;
      console.error('✓ Logo found via Brandfetch');
      return logoUrl;
    }
  } catch (error) {
    console.error('Brandfetch failed, trying next method...');
  }

  // Strategy 3: Try common logo paths
  const origin = new URL(fullUrl).origin;
  const commonPaths = [
    `${origin}/logo.svg`,
    `${origin}/logo.png`,
    `${origin}/assets/logo.svg`,
    `${origin}/assets/logo.png`,
    `${origin}/images/logo.svg`,
    `${origin}/images/logo.png`,
  ];

  for (const logoPath of commonPaths) {
    try {
      const response = await axios.head(logoPath, { timeout: 3000 });
      if (response.status === 200) {
        console.error(`✓ Logo found at: ${logoPath}`);
        return logoPath;
      }
    } catch {}
  }

  // Strategy 4: Google Favicon Service (always works, fallback)
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
  console.error('✓ Using Google Favicon as fallback');
  return faviconUrl;
}

async function extractContentFromScreenshot(
  screenshot: Buffer,
  url: string
): Promise<ExtractedContent['content']> {
  // Fallback: basic content extraction
  // In production, you'd send screenshot to Claude Vision API
  const domain = new URL(url).hostname.replace('www.', '').split('.')[0];

  return {
    title: domain.charAt(0).toUpperCase() + domain.slice(1),
    description: `Discover ${domain} - Your solution for better productivity`,
    features: [
      'Easy to use',
      'Fast performance',
      'Reliable support',
    ],
    heroImage: '',
    sections: [],
  };
}

function extractFontFromCss(css: string): string {
  // Simple font extraction from CSS
  const fontFamilyMatch = css.match(/font-family:\s*([^;]+)/);
  if (fontFamilyMatch) {
    return fontFamilyMatch[1].replace(/['"]/g, '').trim();
  }
  return 'system-ui, sans-serif';
}

function detectTheme(colors: ExtractedContent['branding']['colors']): 'light' | 'dark' {
  // Simple luminance check
  const bgColor = colors.background;
  const rgb = parseInt(bgColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? 'light' : 'dark';
}

async function downloadLogoToPublic(logoUrl: string, domain: string): Promise<string> {
  if (!logoUrl) return '';

  try {
    const response = await axios.get(logoUrl, { responseType: 'arraybuffer', timeout: 10000 });
    const buffer = Buffer.from(response.data);

    // Determine extension from content-type or URL
    const contentType = (response.headers['content-type'] as string) || '';
    let ext = 'png';
    if (contentType.includes('svg')) ext = 'svg';
    else if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = 'jpg';
    else if (logoUrl.endsWith('.svg')) ext = 'svg';
    else if (logoUrl.endsWith('.jpg') || logoUrl.endsWith('.jpeg')) ext = 'jpg';

    const remotionProjectPath = process.env.REMOTION_PROJECT_PATH || path.join(__dirname, '../../../remotion-project');
    const publicImagesDir = path.join(remotionProjectPath, 'public', 'images');
    await fs.mkdir(publicImagesDir, { recursive: true });

    const cleanDomain = domain.replace('www.', '').replace(/[^a-z0-9.-]/g, '');
    const fileName = `logo-${cleanDomain}.${ext}`;
    const filePath = path.join(publicImagesDir, fileName);

    await fs.writeFile(filePath, buffer);
    console.error(`✓ Downloaded logo to: ${filePath} (staticPath: images/${fileName})`);

    return `images/${fileName}`; // Path relative to public/ for staticFile()
  } catch (error) {
    console.error('Failed to download logo:', error instanceof Error ? error.message : String(error));
    return ''; // Agent will use branding.logo.url as fallback
  }
}

function inferIndustry(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();

  const industries = {
    tech: ['software', 'app', 'platform', 'cloud', 'saas', 'api', 'developer'],
    finance: ['bank', 'payment', 'finance', 'invest', 'trading', 'crypto'],
    healthcare: ['health', 'medical', 'doctor', 'patient', 'clinic', 'hospital'],
    ecommerce: ['shop', 'store', 'buy', 'product', 'marketplace', 'retail'],
    education: ['learn', 'course', 'education', 'student', 'training', 'teach'],
    marketing: ['marketing', 'advertising', 'campaign', 'brand', 'social media'],
    gaming: ['game', 'play', 'gaming', 'esports', 'player'],
  };

  for (const [industry, keywords] of Object.entries(industries)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return industry;
    }
  }

  return 'general';
}
