#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

// Import tools
import { extractUrlContent } from './tools/extract-url.js';
import { generateAudio } from './tools/generate-audio.js';
import { renderVideo } from './tools/render-video.js';

// Load environment variables
dotenv.config();

// Create MCP server
const server = new Server(
  {
    name: 'url-to-video-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'extract_url_content',
      description: 'Extract content, branding (logo, colors, fonts), and metadata from a URL. Uses Tabstack API, Brand Identity Extractor, and Playwright screenshot fallback.',
      inputSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL to extract content from',
          },
        },
        required: ['url'],
      },
    },
    {
      name: 'generate_audio',
      description: 'Generate background music and narration using MiniMax API. Detects beats for video transition sync. Music is instrumental only (no singing/vocals).',
      inputSchema: {
        type: 'object',
        properties: {
          musicStyle: {
            type: 'string',
            description: 'Music style: pop, hip-hop, rap, jazz, lo-fi, ambient, cinematic, rock',
          },
          narrationScript: {
            type: 'string',
            description: 'The script for AI narration (text-to-speech)',
          },
          duration: {
            type: 'number',
            description: 'Duration in seconds',
          },
        },
        required: ['narrationScript', 'duration'],
      },
    },
    {
      name: 'render_video',
      description: 'Render the dynamically generated Remotion composition (Generated.tsx) to video file. Claude should write custom video code to src/compositions/Generated.tsx before calling this tool. Saves locally to user\'s machine.',
      inputSchema: {
        type: 'object',
        properties: {
          inputProps: {
            type: 'object',
            description: 'Props to pass to the composition (content, branding, audio, etc.)',
          },
          outputFileName: {
            type: 'string',
            description: 'Output file name (without extension)',
          },
        },
        required: ['inputProps', 'outputFileName'],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'extract_url_content': {
        const { url } = args as { url: string };
        if (!url) {
          throw new McpError(ErrorCode.InvalidParams, 'URL is required');
        }
        const result = await extractUrlContent(url);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'generate_audio': {
        const { musicStyle, narrationScript, duration } = args as {
          musicStyle?: string;
          narrationScript: string;
          duration: number;
        };
        if (!narrationScript || !duration) {
          throw new McpError(
            ErrorCode.InvalidParams,
            'narrationScript and duration are required'
          );
        }
        const result = await generateAudio({
          musicStyle: musicStyle || 'lo-fi',
          narrationScript,
          duration,
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'render_video': {
        const { inputProps, outputFileName } = args as {
          inputProps: Record<string, any>;
          outputFileName: string;
        };
        if (!inputProps || !outputFileName) {
          throw new McpError(
            ErrorCode.InvalidParams,
            'inputProps and outputFileName are required'
          );
        }
        const result = await renderVideo({
          inputProps,
          outputFileName,
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('URL-to-Video MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
