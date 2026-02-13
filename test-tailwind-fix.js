#!/usr/bin/env node

/**
 * Quick test to verify Tailwind CSS is now working in videos
 * Tests ONLY the render_video fix (not full pipeline)
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { renderVideo } from './mcp-server/dist/tools/render-video.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

console.log('🧪 Testing Tailwind CSS Fix\n');
console.log('This will render a video with vibrant colors and test data');
console.log('to verify Tailwind CSS is working properly.\n');

const testProps = {
  content: {
    title: 'Tailwind CSS Test',
    description: 'This video tests that Tailwind utility classes are being processed correctly. You should see proper layout, spacing, and styling.',
    features: [
      'Flexbox layout working',
      'Text styling applied',
      'Colors and spacing correct',
      'Animations rendering smoothly',
      'Background gradients visible'
    ],
    heroImage: '',
  },
  branding: {
    logo: { url: 'https://logo.clearbit.com/stripe.com' },
    colors: {
      primary: '#6366F1',    // Vibrant indigo
      secondary: '#4F46E5',  // Deep indigo
      accent: '#818CF8',     // Light indigo
      background: '#1E1B4B', // Dark indigo
    },
    font: 'system-ui, sans-serif',
    theme: 'dark',
  },
  audio: {
    music: { localPath: '' },
    narration: { localPath: '', timecodes: [] },
    beats: [],
  },
  duration: 30,
};

(async () => {
  try {
    console.log('🎬 Rendering test video...\n');

    const result = await renderVideo({
      compositionId: 'Modern',
      inputProps: testProps,
      outputFileName: 'tailwind-test-' + Date.now(),
    });

    console.log('\n✅ SUCCESS!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📹 Video Details:');
    console.log(`   Path: ${result.videoPath}`);
    console.log(`   Duration: ${result.duration}s`);
    console.log(`   Size: ${(result.fileSize / 1024 / 1024).toFixed(2)} MB`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎯 What to Check:\n');
    console.log('Open the video and verify:');
    console.log('  ✓ Screen is FULL of content (not empty)');
    console.log('  ✓ Text is VISIBLE (white on dark indigo)');
    console.log('  ✓ Layout is CENTERED (flexbox working)');
    console.log('  ✓ Feature cards have backgrounds and borders');
    console.log('  ✓ Animations are smooth\n');
    console.log('If you see all this → Tailwind CSS is FIXED! 🎉\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
})();
