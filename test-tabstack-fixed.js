#!/usr/bin/env node
import dotenv from 'dotenv';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

const apiKey = process.env.TABSTACK_API_KEY;

console.log('🧪 Testing Tabstack API (FIXED)\n');

try {
  const response = await axios.post(
    'https://api.tabstack.ai/v1/extract/json',
    {
      url: 'https://stripe.com',
      json_schema: {
        title: 'string',
        description: 'string', 
        features: 'array of strings (3-5 key features)',
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

  console.log('✅ SUCCESS!\n');
  console.log('Title:', response.data.title);
  console.log('Description:', response.data.description?.slice(0, 150));
  console.log('Features:', response.data.features);

} catch (error) {
  console.error('❌ Failed:', error.response?.data || error.message);
}
