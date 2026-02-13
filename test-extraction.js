#!/usr/bin/env node

/**
 * Simple test script to verify URL extraction works
 * Tests cloud-based logo APIs (no Docker needed!)
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file from mcp-server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

import { extractUrlContent } from './mcp-server/dist/tools/extract-url.js';

const testUrl = process.argv[2] || 'https://stripe.com';

console.log('🧪 Testing URL-to-Video Extraction\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`📍 URL: ${testUrl}\n`);

(async () => {
  try {
    const startTime = Date.now();

    console.log('🔍 Extracting content...\n');
    const result = await extractUrlContent(testUrl);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n✅ Success! Extraction completed in ' + duration + 's\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Display results
    console.log('📄 CONTENT:');
    console.log('  Title:', result.content.title);
    console.log('  Description:', result.content.description.slice(0, 80) + '...');
    console.log('  Features:', result.content.features.slice(0, 3).join(', '));
    console.log('  Hero Image:', result.content.heroImage ? '✓ Found' : '✗ None');
    console.log();

    console.log('🎨 BRANDING:');
    console.log('  Logo:', result.branding.logo.url);
    console.log('  Primary Color:', result.branding.colors.primary);
    console.log('  Secondary Color:', result.branding.colors.secondary);
    console.log('  Accent Color:', result.branding.colors.accent);
    console.log('  Background:', result.branding.colors.background);
    console.log('  Font:', result.branding.font);
    console.log('  Theme:', result.branding.theme);
    console.log();

    console.log('📊 METADATA:');
    console.log('  Industry:', result.metadata.industry);
    console.log('  Domain:', result.metadata.domain);
    console.log();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 All systems working! No Docker needed!\n');
    console.log('💡 Try with different URLs:');
    console.log('   node test-extraction.js https://vercel.com');
    console.log('   node test-extraction.js https://linear.app\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('  1. Check your .env file has TABSTACK_API_KEY');
    console.error('  2. Make sure you ran: npm run build');
    console.error('  3. Verify the URL is accessible\n');
    process.exit(1);
  }
})();
