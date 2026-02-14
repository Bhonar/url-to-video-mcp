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
    logo: { url: string; staticPath?: string; base64?: string; quality?: 'high' | 'medium' | 'favicon' };
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
  warnings: string[];
  extractionMethod: 'tabstack' | 'playwright-fallback' | 'placeholder-fallback';
}

export async function extractUrlContent(url: string): Promise<ExtractedContent> {
  console.error(`Extracting content from: ${url}`);

  const domain = new URL(url).hostname;
  const warnings: string[] = [];
  let extractionMethod: ExtractedContent['extractionMethod'] = 'tabstack';

  // Strategy 1: Try Tabstack API
  let content: ExtractedContent['content'] | null = null;
  try {
    content = await extractWithTabstack(url);
    console.error('✓ Content extracted with Tabstack');
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('✗ Tabstack failed:', msg);
    warnings.push(`Tabstack content extraction failed: ${msg}`);
  }

  // Strategy 2: Try cloud logo APIs + color extraction
  let branding: ExtractedContent['branding'] | null = null;
  try {
    branding = await extractBrandingSimple(url, warnings);
    console.error('✓ Branding extracted with cloud APIs');
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('✗ Cloud branding extraction failed:', msg);
    warnings.push(`Cloud branding extraction failed: ${msg}`);
  }

  // Strategy 3: Fallback — use Playwright for content + CSS colors
  if (!content || !branding) {
    console.error('Falling back to Playwright extraction...');

    // Try Playwright-based extraction for both content and colors in one session
    const playwrightResult = await extractWithPlaywright(url, warnings);

    if (!content) {
      if (playwrightResult.content) {
        content = playwrightResult.content;
        extractionMethod = 'playwright-fallback';
        warnings.push('Content extracted via Playwright (title, meta tags, headings). May be less detailed than Tabstack.');
      } else {
        // Last resort: hardcoded placeholder
        content = createPlaceholderContent(url);
        extractionMethod = 'placeholder-fallback';
        warnings.push(
          'PLACEHOLDER CONTENT: Title, description, and features are generic text. ' +
          'Agent MUST rewrite these based on the domain name and brand context.'
        );
      }
    }

    if (!branding) {
      const screenshot = await takeScreenshot(url);
      let colors = await extractColorsFromScreenshot(screenshot);

      // Override with CSS-extracted colors if available
      if (playwrightResult.cssColors) {
        if (playwrightResult.cssColors.primary) {
          colors.primary = playwrightResult.cssColors.primary;
          colors.secondary = darkenHex(playwrightResult.cssColors.primary, 0.6);
        }
        if (playwrightResult.cssColors.accent) {
          colors.accent = playwrightResult.cssColors.accent;
        }
      }

      branding = {
        logo: { url: `https://www.google.com/s2/favicons?domain=${domain}&sz=256`, quality: 'favicon' },
        colors,
        font: 'system-ui, sans-serif',
        theme: detectTheme(colors),
      };
      warnings.push('Colors extracted from screenshot/CSS analysis. Logo is a low-res favicon fallback.');
    }
  }

  // Try to improve colors with CSS extraction even when Tabstack succeeded
  // (screenshot colors are often washed out)
  if (extractionMethod === 'tabstack' && branding) {
    try {
      const playwrightResult = await extractWithPlaywright(url, []);
      if (playwrightResult.cssColors) {
        const oldPrimary = branding.colors.primary;
        if (playwrightResult.cssColors.primary) {
          branding.colors.primary = playwrightResult.cssColors.primary;
          branding.colors.secondary = darkenHex(playwrightResult.cssColors.primary, 0.6);
        }
        if (playwrightResult.cssColors.accent) {
          branding.colors.accent = playwrightResult.cssColors.accent;
        }
        if (oldPrimary !== branding.colors.primary) {
          console.error(`✓ Colors improved via CSS: ${oldPrimary} → ${branding.colors.primary}`);
        }
      }
    } catch {
      // Non-critical: CSS color extraction is a bonus
    }
  }

  // Infer industry from domain/content
  const industry = inferIndustry(content!.title, content!.description);

  // Download logo to remotion-project/public/images/ for staticFile() access
  const logoStaticPath = await downloadLogoToPublic(branding!.logo.url, domain);
  if (logoStaticPath) {
    branding!.logo.staticPath = logoStaticPath;
  } else {
    warnings.push('Logo download failed. Use branding.logo.url as fallback in Generated.tsx.');
  }

  return {
    content: content!,
    branding: branding!,
    metadata: {
      industry,
      domain,
    },
    warnings,
    extractionMethod,
  };
}

// --- Tabstack extraction ---

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

// --- Playwright-based extraction (content + CSS colors) ---

interface PlaywrightResult {
  content: ExtractedContent['content'] | null;
  cssColors: {
    primary: string | null;
    accent: string | null;
  } | null;
}

async function extractWithPlaywright(url: string, warnings: string[]): Promise<PlaywrightResult> {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // --- Extract content ---
    const title = await page.title();
    const h1Text = await page.$eval('h1', (el) => el.textContent?.trim() || '').catch(() => '');
    const metaDesc = await page.$eval(
      'meta[name="description"]',
      (el) => el.getAttribute('content') || ''
    ).catch(() => '');
    const ogDesc = await page.$eval(
      'meta[property="og:description"]',
      (el) => el.getAttribute('content') || ''
    ).catch(() => '');

    // Get feature-like items from lists
    const listItems = await page.$$eval('ul li, ol li', (items) =>
      items.slice(0, 8).map((item) => item.textContent?.trim() || '').filter(t => t.length > 5 && t.length < 120)
    ).catch(() => [] as string[]);

    // Get headings for sections
    const headings = await page.$$eval('h2, h3', (els) =>
      els.slice(0, 6).map((el) => ({
        heading: el.textContent?.trim() || '',
        text: '',
      })).filter(s => s.heading.length > 2 && s.heading.length < 100)
    ).catch(() => [] as Array<{ heading: string; text: string }>);

    let content: ExtractedContent['content'] | null = null;
    const finalTitle = h1Text || title;
    const finalDesc = metaDesc || ogDesc || '';

    if (finalTitle && finalTitle.length > 1) {
      content = {
        title: finalTitle,
        description: finalDesc || `${finalTitle} — visit ${new URL(url).hostname} for more details`,
        features: listItems.length >= 2 ? listItems.slice(0, 5) : [],
        heroImage: '',
        sections: headings,
      };

      if (!finalDesc) {
        warnings.push('No meta description found on page. Description may need agent rewriting.');
      }
      if (listItems.length < 2) {
        warnings.push('No feature list found on page. Agent should write features based on page content.');
      }
    }

    // --- Extract CSS colors ---
    const cssColors = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);

      // Try CSS custom properties
      const tryProps = (names: string[]) => {
        for (const name of names) {
          const val = styles.getPropertyValue(name).trim();
          if (val && val !== '') return val;
        }
        return null;
      };

      const primary = tryProps([
        '--primary', '--primary-color', '--brand-color', '--color-primary',
        '--theme-primary', '--main-color',
      ]);
      const accent = tryProps([
        '--accent', '--accent-color', '--color-accent', '--secondary',
        '--secondary-color', '--theme-accent',
      ]);

      // Get prominent button background (most reliable brand color signal)
      let buttonBg: string | null = null;
      const buttons = document.querySelectorAll('button, a.btn, [class*="button"], [class*="btn"], [class*="cta"]');
      for (const btn of Array.from(buttons).slice(0, 10)) {
        const bg = getComputedStyle(btn).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && bg !== 'rgb(255, 255, 255)') {
          buttonBg = bg;
          break;
        }
      }

      // Get prominent link color
      let linkColor: string | null = null;
      const links = document.querySelectorAll('a');
      for (const link of Array.from(links).slice(0, 10)) {
        const color = getComputedStyle(link).color;
        if (color && color !== 'rgb(0, 0, 0)' && color !== 'rgb(255, 255, 255)') {
          linkColor = color;
          break;
        }
      }

      return { primary, accent, buttonBg, linkColor };
    }).catch(() => ({ primary: null, accent: null, buttonBg: null, linkColor: null }));

    // Resolve CSS colors to hex
    let resolvedPrimary: string | null = null;
    let resolvedAccent: string | null = null;

    if (cssColors.primary) {
      resolvedPrimary = rgbaToHex(cssColors.primary);
    } else if (cssColors.buttonBg) {
      resolvedPrimary = rgbaToHex(cssColors.buttonBg);
    } else if (cssColors.linkColor) {
      resolvedPrimary = rgbaToHex(cssColors.linkColor);
    }

    if (cssColors.accent) {
      resolvedAccent = rgbaToHex(cssColors.accent);
    }

    const colorResult = (resolvedPrimary || resolvedAccent)
      ? { primary: resolvedPrimary, accent: resolvedAccent }
      : null;

    return { content, cssColors: colorResult };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    warnings.push(`Playwright extraction failed: ${msg}`);
    return { content: null, cssColors: null };
  } finally {
    await browser?.close();
  }
}

// --- Branding extraction ---

async function extractBrandingSimple(url: string, warnings: string[]): Promise<ExtractedContent['branding']> {
  const domain = new URL(url).hostname.replace('www.', '');

  // Get logo from cloud services
  const logoResult = await extractLogoFromCloud(domain, url, warnings);

  // Extract colors from screenshot
  const screenshot = await takeScreenshot(url);
  const colors = await extractColorsFromScreenshot(screenshot);

  return {
    logo: {
      url: logoResult.url,
      quality: logoResult.quality,
    },
    colors,
    font: 'system-ui, -apple-system, sans-serif',
    theme: detectTheme(colors),
  };
}

async function extractLogoFromCloud(
  domain: string,
  fullUrl: string,
  warnings: string[],
): Promise<{ url: string; quality: 'high' | 'medium' | 'favicon' }> {
  console.error(`Extracting logo for: ${domain}`);

  // Strategy 1: Clearbit Logo API (free, high quality)
  try {
    const clearbitUrl = `https://logo.clearbit.com/${domain}`;
    const response = await axios.head(clearbitUrl, { timeout: 5000 });
    if (response.status === 200) {
      console.error('✓ Logo found via Clearbit');
      return { url: clearbitUrl, quality: 'high' };
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
      return { url: logoUrl, quality: 'high' };
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
        return { url: logoPath, quality: 'medium' };
      }
    } catch {}
  }

  // Strategy 4: Google Favicon Service (always works, fallback)
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
  console.error('✓ Using Google Favicon as fallback');
  warnings.push(`No high-quality logo found for ${domain}. Using Google favicon (256px). Consider providing a logo URL manually.`);
  return { url: faviconUrl, quality: 'favicon' };
}

// --- Placeholder content (last resort) ---

function createPlaceholderContent(url: string): ExtractedContent['content'] {
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

// --- Utilities ---

function rgbaToHex(rgba: string): string {
  // Handle hex passthrough
  if (rgba.startsWith('#')) return rgba;

  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return rgba;
  const [, r, g, b] = match;
  return '#' + [r, g, b].map(c => parseInt(c).toString(16).padStart(2, '0')).join('');
}

function darkenHex(hex: string, factor: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return '#' + [r, g, b].map(c => Math.round(c * factor).toString(16).padStart(2, '0')).join('');
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
