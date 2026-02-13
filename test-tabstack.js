#!/usr/bin/env node

import dotenv from 'dotenv';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

const apiKey = process.env.TABSTACK_API_KEY;

console.log('🧪 Testing Tabstack API\n');
console.log('API Key:', apiKey ? `${apiKey.slice(0, 10)}...` : 'NOT SET');
console.log('\nAttempting to extract from: https://stripe.com\n');

const testPayload = {
  url: 'https://stripe.com',
  schema: {
    title: 'string',
    description: 'string',
    features: 'array of strings (3-5 key features or bullet points)',
    heroImage: 'main hero/banner image URL',
    sections: 'array of objects with heading and text',
  },
};

console.log('Request payload:');
console.log(JSON.stringify(testPayload, null, 2));
console.log('\n---\n');

try {
  const response = await axios.post(
    'https://api.tabstack.ai/v1/extract/json',
    testPayload,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    }
  );

  console.log('✅ Success!');
  console.log('\nResponse:');
  console.log(JSON.stringify(response.data, null, 2));

} catch (error) {
  console.error('❌ Failed!');
  console.error('\nError details:');
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Status Text:', error.response.statusText);
    console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    console.error('No response received');
    console.error('Request:', error.request);
  } else {
    console.error('Error:', error.message);
  }
}
