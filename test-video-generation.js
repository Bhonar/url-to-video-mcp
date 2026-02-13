#!/usr/bin/env node

/**
 * Full video generation test
 * Tests the complete pipeline: Extract → Generate Audio → Render Video
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { extractUrlContent } from './mcp-server/dist/tools/extract-url.js';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';

const require = createRequire(import.meta.url);

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

const testUrl = process.argv[2] || 'https://tabstack.ai';
const style = process.argv[3] || 'Modern';

console.log('🎬 Full Video Generation Test\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`📍 URL: ${testUrl}`);
console.log(`🎨 Style: ${style}`);
console.log(`⏱️  Duration: 30 seconds\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

(async () => {
  try {
    // Step 1: Extract URL content
    console.log('Step 1/3: 🔍 Extracting content from URL...');
    const extracted = await extractUrlContent(testUrl);
    console.log('✅ Content extracted!');
    console.log(`   Title: ${extracted.content.title}`);
    console.log(`   Logo: ${extracted.branding.logo.url}`);
    console.log(`   Theme: ${extracted.branding.theme}`);
    console.log();

    // Step 2: Prepare video props (skip audio generation for now)
    console.log('Step 2/3: 🎵 Preparing video data...');
    const videoProps = {
      content: extracted.content,
      branding: extracted.branding,
      audio: {
        music: { localPath: '' },
        narration: { localPath: '', timecodes: [] },
        beats: [],
      },
      duration: 30,
    };
    console.log('✅ Video data ready!');
    console.log();

    // Step 3: Render video with Remotion
    console.log('Step 3/3: 🎥 Rendering video with Remotion...');
    console.log('   This may take 1-2 minutes...\n');

    const compositionId = style;
    const remotionRoot = join(__dirname, 'remotion-project', 'src', 'index.ts');

    // Bundle Remotion project
    console.log('   📦 Bundling Remotion project...');
    const bundleLocation = await bundle({
      entryPoint: remotionRoot,
      webpackOverride: (config) => config,
    });
    console.log('   ✅ Bundle complete!');

    // Select composition
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: videoProps,
    });

    // Render video
    const outputDir = join(os.homedir(), 'Videos', 'url-to-video');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, `${extracted.metadata.domain}-${Date.now()}.mp4`);

    console.log('   🎬 Rendering video...');
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: videoProps,
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 Success! Video created!\n');
    console.log(`📹 Video saved to:`);
    console.log(`   ${outputPath}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('  1. Make sure both mcp-server and remotion-project are built');
    console.error('  2. Check that all dependencies are installed');
    console.error('  3. Verify your API keys in .env file\n');
    console.error('Full error:', error);
    process.exit(1);
  }
})();
