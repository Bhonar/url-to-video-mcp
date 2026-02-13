#!/usr/bin/env node

/**
 * Create a modern style video from stripe.com
 * Simplified version without audio generation
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
  console.log(`  Description: ${extracted.content.description.substring(0, 100)}...`);
  console.log(`  Features: ${extracted.content.features.slice(0, 5).join(', ')}`);
  console.log(`  Industry: ${extracted.metadata.industry}`);
  console.log(`  Logo: ${extracted.branding.logo.url}`);
  console.log(`  Colors: Primary=${extracted.branding.colors.primary}, Secondary=${extracted.branding.colors.secondary}`);
  console.log(`  Accent: ${extracted.branding.colors.accent}, Background=${extracted.branding.colors.background}\n`);

  // Step 2: Prepare input props for Remotion composition
  console.log('Step 2: Preparing video composition with mock audio...');

  // Create better Stripe branding colors (since extraction gave us muted grays)
  const stripeBranding = {
    ...extracted.branding,
    colors: {
      primary: '#635BFF', // Stripe's signature purple
      secondary: '#0A2540', // Stripe's dark blue
      accent: '#00D4FF', // Stripe's cyan accent
      background: '#FFFFFF'
    },
    theme: 'light',
  };

  const inputProps = {
    content: {
      title: 'Stripe',
      description: 'Financial infrastructure for the internet',
      features: [
        'Accept payments in 135+ currencies',
        'Process billions in transactions',
        'Launch subscription billing in minutes',
        '99.999% historical uptime',
        'Trusted by Fortune 100 companies'
      ],
      heroImage: extracted.content.heroImage,
    },
    branding: stripeBranding,
    audio: {
      music: { localPath: '' }, // Empty for now - video will render without audio
      narration: { localPath: '', timecodes: [] },
      beats: [], // No beat sync without audio
    },
    duration: 30
  };

  console.log('✓ Composition prepared with Stripe branding\n');

  // Step 3: Render video
  console.log('Step 3: Rendering video...');
  console.log('(This may take a few minutes)\n');

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
  console.log('\nNote: This version was created without audio. To add music and narration,');
  console.log('the MiniMax API integration needs to be configured correctly.');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  console.error(error);
  process.exit(1);
});
