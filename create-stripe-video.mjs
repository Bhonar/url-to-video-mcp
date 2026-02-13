#!/usr/bin/env node

/**
 * Create a modern style video from stripe.com
 * This script orchestrates the full workflow
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from mcp-server/.env
dotenv.config({ path: path.join(__dirname, 'mcp-server', '.env') });

// Import tools
async function main() {
  console.log('🎬 Creating modern style video from stripe.com...\n');

  // Step 1: Extract content
  console.log('Step 1: Extracting content from stripe.com...');
  const { extractUrlContent } = await import('./mcp-server/src/tools/extract-url.ts');

  const extracted = await extractUrlContent('https://stripe.com');
  console.log('✓ Content extracted:');
  console.log(`  Title: ${extracted.content.title}`);
  console.log(`  Features: ${extracted.content.features.length} found`);
  console.log(`  Industry: ${extracted.metadata.industry}`);
  console.log(`  Colors: ${extracted.branding.colors.primary}, ${extracted.branding.colors.secondary}\n`);

  // Step 2: Write narration script following the story arc
  console.log('Step 2: Writing narration script...');
  const narrationScript = `
What if payments could be as simple as a single API call?

Most businesses struggle with complex payment infrastructure. Multiple vendors, fragmented systems, and endless integration headaches slow down growth.

Stripe solves this with a unified financial platform that scales from your first transaction to your billionth. Built for developers, trusted by enterprises.

Accept payments in over 135 currencies. Launch subscription billing in minutes. Issue cards instantly. Move money globally with borderless infrastructure. All with 99.999% uptime.

Already processing over 1.4 trillion dollars annually. Trusted by 50% of Fortune 100 companies.

Ready to accelerate your revenue? Start with Stripe today.
  `.trim();

  console.log('✓ Narration script created\n');
  console.log('Script preview:');
  console.log(narrationScript.substring(0, 150) + '...\n');

  // Step 3: Generate audio (music + narration)
  console.log('Step 3: Generating audio (music + narration)...');
  const { generateAudio } = await import('./mcp-server/src/tools/generate-audio.ts');

  const audio = await generateAudio({
    musicStyle: 'ambient', // Modern style works well with ambient/lo-fi
    narrationScript: narrationScript,
    duration: 30
  });

  console.log('✓ Audio generated:');
  console.log(`  Music: ${audio.music.localPath}`);
  console.log(`  Narration: ${audio.narration.localPath}`);
  console.log(`  Beats detected: ${audio.beats.length}\n`);

  // Step 4: Prepare input props for Remotion composition
  console.log('Step 4: Preparing video composition...');
  const inputProps = {
    content: extracted.content,
    branding: extracted.branding,
    audio: audio,
    duration: 30
  };

  // Step 5: Render video
  console.log('Step 5: Rendering video...');
  const { renderVideo } = await import('./mcp-server/src/tools/render-video.ts');

  const result = await renderVideo({
    compositionId: 'Modern',
    inputProps: inputProps,
    outputFileName: 'stripe-modern-video'
  });

  console.log('\n✅ Video created successfully!\n');
  console.log('📹 File:', result.videoPath);
  console.log('⏱️  Duration:', result.duration, 'seconds');
  console.log('📦 Size:', (result.fileSize / (1024 * 1024)).toFixed(2), 'MB');
  console.log('\n🎉 Your modern Stripe video is ready!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  console.error(error);
  process.exit(1);
});
