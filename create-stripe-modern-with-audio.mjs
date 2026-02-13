#!/usr/bin/env node

/**
 * Create a modern style video from stripe.com
 * Complete version WITH audio generation (music + narration)
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from mcp-server/.env
dotenv.config({ path: path.join(__dirname, 'mcp-server', '.env') });

async function main() {
  console.log('🎬 Creating modern style video from stripe.com...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Step 1: Extract content
  console.log('Step 1: Extracting content from stripe.com...');
  const { extractUrlContent } = await import('./mcp-server/dist/tools/extract-url.js');

  const extracted = await extractUrlContent('https://stripe.com');
  console.log('✓ Content extracted');
  console.log(`  Title: ${extracted.content.title.substring(0, 60)}...`);
  console.log(`  Features: ${extracted.content.features.length} found`);
  console.log(`  Industry: ${extracted.metadata.industry}\n`);

  // Step 2: Generate audio (music + narration)
  console.log('Step 2: Generating audio (music + narration)...');
  console.log('  Music style: lo-fi (modern, clean, tech-friendly)');
  console.log('  Duration: 30 seconds\n');

  const narrationScript = `What if you could accept payments from anywhere in the world, instantly?

Most businesses struggle with complex payment infrastructure, dealing with multiple vendors, currencies, and compliance headaches.

Stripe changes everything. One platform to accept payments globally, both online and in person.

Enable any billing model - from subscriptions to one-time purchases. Monetize through agentic commerce. And optimize every transaction with built-in fraud protection and smart routing.

From startups to Fortune 500s, millions of businesses trust Stripe to power their revenue.

Build the future of payments. Visit stripe dot com today.`;

  const { generateAudio } = await import('./mcp-server/dist/tools/generate-audio.js');

  try {
    const audio = await generateAudio({
      musicStyle: 'lo-fi',
      narrationScript: narrationScript,
      duration: 30
    });

    console.log('✓ Audio generated');
    console.log(`  Music: ${audio.music.localPath}`);
    console.log(`  Narration: ${audio.narration.localPath}`);
    console.log(`  Beats detected: ${audio.beats.length}\n`);

    // Step 3: Prepare video composition
    console.log('Step 3: Preparing modern style composition...');

    // Use Stripe's actual brand colors
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
      audio: audio,
      duration: 30
    };

    console.log('✓ Composition configured with modern style\n');

    // Step 4: Render video
    console.log('Step 4: Rendering video...');
    console.log('(This may take 2-3 minutes)\n');

    const { renderVideo } = await import('./mcp-server/dist/tools/render-video.js');

    const result = await renderVideo({
      compositionId: 'Modern',
      inputProps: inputProps,
      outputFileName: 'stripe-modern-video'
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Video created successfully!\n');
    console.log('📹 File:', result.videoPath);
    console.log('⏱️  Duration:', result.duration, 'seconds');
    console.log('📦 Size:', (result.fileSize / (1024 * 1024)).toFixed(2), 'MB');
    console.log('\n🎨 Style: Modern');
    console.log('🎵 Music: Lo-fi instrumental background');
    console.log('🎤 Narration: Professional voiceover');
    console.log('💫 Beat-synced transitions\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 Your modern Stripe video is ready!\n');

  } catch (audioError) {
    console.error('⚠️  Audio generation failed:', audioError.message);
    console.log('\n📹 Falling back to video without audio...\n');

    // Fallback: render video without audio
    const stripeBranding = {
      ...extracted.branding,
      colors: {
        primary: '#635BFF',
        secondary: '#0A2540',
        accent: '#00D4FF',
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
        music: { localPath: '' },
        narration: { localPath: '', timecodes: [] },
        beats: [],
      },
      duration: 30
    };

    const { renderVideo } = await import('./mcp-server/dist/tools/render-video.js');

    const result = await renderVideo({
      compositionId: 'Modern',
      inputProps: inputProps,
      outputFileName: 'stripe-modern-video-silent'
    });

    console.log('\n✅ Video created successfully (without audio)!\n');
    console.log('📹 File:', result.videoPath);
    console.log('⏱️  Duration:', result.duration, 'seconds');
    console.log('📦 Size:', (result.fileSize / (1024 * 1024)).toFixed(2), 'MB\n');
  }
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  console.error(error);
  process.exit(1);
});
