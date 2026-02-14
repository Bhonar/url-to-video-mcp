# URL to Video MCP Server

Node.js/TypeScript MCP server that provides tools for converting URLs to motion graphics videos.

## Tools

### 1. `extract_url_content`

Extracts content, branding (logo, colors, fonts), and metadata from a URL.

**Strategy:**
1. Tabstack API → Extract text content
2. Brand Identity Extractor → Extract logo + color palette
3. Playwright screenshot fallback → If above fail
4. Claude Vision fallback → Analyze screenshot

**Input:**
```json
{
  "url": "https://example.com"
}
```

**Output:**
```json
{
  "content": {
    "title": "Product Name",
    "description": "Product description",
    "features": ["Feature 1", "Feature 2", "Feature 3"],
    "heroImage": "https://example.com/hero.jpg",
    "sections": [...]
  },
  "branding": {
    "logo": {
      "url": "https://example.com/logo.png",
      "base64": "data:image/png;base64,..."
    },
    "colors": {
      "primary": "#0066FF",
      "secondary": "#003D99",
      "accent": "#66B3FF",
      "background": "#FFFFFF"
    },
    "font": "system-ui, sans-serif",
    "theme": "light"
  },
  "metadata": {
    "industry": "tech",
    "domain": "example.com"
  }
}
```

### 2. `generate_audio`

Generates background music and narration using MiniMax API.

**Input:**
```json
{
  "musicStyle": "lo-fi",
  "narrationScript": "Your narration script here...",
  "duration": 30
}
```

**Music Styles:**
- pop, hip-hop, rap, jazz, lo-fi, ambient, cinematic, rock

**Output:**
```json
{
  "music": {
    "url": "https://...",
    "localPath": "/tmp/music-123.mp3",
    "duration": 30
  },
  "narration": {
    "url": "https://...",
    "localPath": "/tmp/narration-123.mp3",
    "timecodes": [
      { "start": 0, "end": 5.2, "text": "First sentence..." },
      { "start": 5.7, "end": 10.3, "text": "Second sentence..." }
    ]
  },
  "beats": [1.2, 2.4, 3.6, 4.8, ...]
}
```

### 3. `render_video`

Renders a Remotion composition to MP4 video file.

**Input:**
```json
{
  "compositionId": "Modern",
  "inputProps": {
    "content": {...},
    "branding": {...},
    "audio": {...},
    "duration": 30
  },
  "outputFileName": "product-video"
}
```

**Output:**
```json
{
  "videoPath": "/Users/username/Videos/url-to-video/product-video.mp4",
  "duration": 30,
  "fileSize": 12582912
}
```

## Environment Variables

Create `.env` file with:

```bash
# Required
TABSTACK_API_KEY=your_tabstack_api_key
MINIMAX_API_KEY=your_minimax_api_key
MINIMAX_GROUP_ID=your_minimax_group_id

# Optional
BRAND_EXTRACTOR_URL=http://localhost:8000
REMOTION_PROJECT_PATH=../remotion-project
REMOTION_OUTPUT_PATH=~/Videos/url-to-video
ANTHROPIC_API_KEY=your_claude_api_key  # For fallback story generation
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode
npm run dev

# Start server
npm start
```

## Testing

```bash
# Run tests
npm test

# Test individual tool
node dist/server.js
# Then send MCP request
```

## Integration with Claude Code

Add to your Claude Code MCP configuration (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "url-to-video": {
      "command": "node",
      "args": ["/path/to/url-to-video-mcp/mcp-server/dist/server.js"],
      "cwd": "/path/to/url-to-video-mcp/mcp-server"
    }
  }
}
```

**Important:** The `cwd` (current working directory) option is required so the server can find the `.env` file with API keys and configuration.

## Architecture

```
src/
├── server.ts              # Main MCP server
├── tools/
│   ├── extract-url.ts     # URL content extraction
│   ├── generate-audio.ts  # Audio generation (MiniMax)
│   └── render-video.ts    # Video rendering (Remotion)
└── utils/
    ├── screenshot.ts      # Playwright screenshot
    ├── color-extraction.ts # Color palette extraction
    └── beat-detection.ts  # Music beat detection
```

## Troubleshooting

### Tabstack API Errors

- Check API key is valid
- Verify URL is accessible
- Check rate limits

### Brand Identity Extractor Not Running

```bash
docker-compose up -d
docker-compose logs brand-identity-extractor
```

### Remotion Rendering Fails

- Check Remotion project path is correct
- Verify output directory has write permissions
- Check disk space

### MiniMax API Errors

- Verify API key and group ID
- Check account credits
- Ensure music style is valid

## API Keys

Get your API keys from:

- **Tabstack**: https://tabstack.ai/dashboard
- **MiniMax**: https://platform.minimax.chat/
- **Anthropic** (optional): https://console.anthropic.com/
