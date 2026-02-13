#!/usr/bin/env node

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { extractUrlContent } from './mcp-server/dist/tools/extract-url.js';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import fs from 'fs';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

const testUrl = process.argv[2] || 'https://stripe.com';
const style = process.argv[3] || 'Modern';

console.log('🎬 Fixed Video Generation Test\n');

(async () => {
  try {
    console.log('Step 1/3: 🔍 Extracting content...');
    const extracted = await extractUrlContent(testUrl);
    
    // FIX: Override poor colors with vibrant defaults
    const hasGoodColors = extracted.branding.colors.primary !== '#f8f8f8';
    
    if (!hasGoodColors) {
      console.log('⚠️  Detected poor color extraction, using vibrant defaults...');
      extracted.branding.colors = {
        primary: '#0066FF',    // Vibrant blue
        secondary: '#003D99',  // Dark blue
        accent: '#00D9FF',     // Cyan accent
        background: '#001F4D', // Deep blue background
      };
      extracted.branding.theme = 'dark';
    }
    
    console.log('✅ Content ready!');
    console.log(`   Title: ${extracted.content.title}`);
    console.log(`   Colors: ${extracted.branding.colors.primary} → ${extracted.branding.colors.secondary}`);
    console.log(`   Theme: ${extracted.branding.theme}`);

    const videoProps = {
      content: {
        title: extracted.content.title,
        description: extracted.content.description || "Discover an amazing solution that transforms the way you work. Powerful, intuitive, and built for modern teams.",
        features: extracted.content.features?.length > 0 
          ? extracted.content.features 
          : [
              "Lightning-fast performance",
              "Beautiful, intuitive interface", 
              "Seamless team collaboration",
              "Enterprise-grade security",
              "24/7 customer support"
            ],
        heroImage: extracted.content.heroImage,
      },
      branding: extracted.branding,
      audio: {
        music: { localPath: '' },
        narration: { localPath: '', timecodes: [] },
        beats: [],
      },
      duration: 30,
    };

    console.log('\nStep 2/3: 🎥 Bundling Remotion...');
    const remotionRoot = join(__dirname, 'remotion-project', 'src', 'index.ts');
    const bundleLocation = await bundle({
      entryPoint: remotionRoot,
      webpackOverride: (config) => config,
    });
    console.log('✅ Bundle complete!');

    console.log('\nStep 3/3: 🎬 Rendering video (this takes 1-2 minutes)...');
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: style,
      inputProps: videoProps,
    });

    const outputDir = join(os.homedir(), 'Videos', 'url-to-video');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, `${extracted.metadata.domain}-fixed-${Date.now()}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: videoProps,
      onProgress: ({ progress }) => {
        process.stdout.write(`\r   Progress: ${Math.round(progress * 100)}%`);
      },
    });

    console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 Success! Video created with proper colors!\n');
    console.log(`📹 Video saved to:`);
    console.log(`   ${outputPath}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
})();
