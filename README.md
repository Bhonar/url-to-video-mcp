# URL to Video MCP + Skill

Transform any landing page into high-quality motion graphics videos using AI.

## 🎬 Features

- **Automatic Content Extraction**: Extracts text, images, logos, colors, and fonts from URLs
- **AI-Generated Audio**: Background music + narration using MiniMax 2.5 (no singing!)
- **Beat-Synced Transitions**: Video transitions sync to music beats
- **7 Video Styles**: Modern, Bold, Corporate, Creative, Cinematic, Minimal, Retro
- **Professional Animations**: Anime.js + GSAP + Remotion native
- **Local Rendering**: Videos saved directly to your Mac/PC

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│  Claude Code + URL-to-Video Skill           │
│  (Story generation, Remotion code)          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  MCP Server (Node.js/TypeScript)            │
│  ├─ extract_url_content                     │
│  ├─ generate_audio                          │
│  └─ render_video                            │
└────────────────┬────────────────────────────┘
                 │
                 ├─► Tabstack API (content extraction)
                 ├─► Cloud Logo APIs (Clearbit, Brandfetch)
                 ├─► MiniMax API (music + narration)
                 └─► @remotion/renderer
```

## 📦 Project Structure

```
url-to-video-mcp/
├── mcp-server/              # MCP server
├── remotion-project/        # Remotion templates
├── skill/                   # Claude Code skill
└── setup.sh                 # Quick setup script
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Claude Code (paid subscription)
- API Keys:
  - [Tabstack API key](https://tabstack.ai)
  - [MiniMax API key](https://platform.minimax.chat)

### Installation

```bash
# 1. Clone and setup
cd url-to-video-mcp
chmod +x setup.sh
./setup.sh

# 2. Configure environment variables
cp mcp-server/.env.example mcp-server/.env
# Edit .env with your API keys (Tabstack + MiniMax)

# 3. Install MCP server
cd mcp-server
npm install
npm run build

# 4. Install Remotion project
cd ../remotion-project
npm install

# 5. Install skill
npx skills add ./skill
```

### Usage

```bash
# Start Claude Code in your project
claude

# Example prompts:
"Turn https://fastdeploy.com into a 45-second bold style video"
"Create a modern style video from https://myproduct.com"
"Generate a 30-second cinematic product launch video from https://example.com"
```

## 🎨 Video Styles

| Style | Best For | Colors | Animations |
|-------|----------|--------|------------|
| Modern | Tech, SaaS | Clean gradients, blues | Smooth fades, slides |
| Bold | Gaming, Sports | High contrast, vibrant | Fast cuts, zooms |
| Corporate | Finance, B2B | Muted blues, grays | Slow, professional |
| Creative | Design, Art | Playful, multi-color | Unexpected, quirky |
| Cinematic | Premium products | Dark, dramatic | Film-like, depth |
| Minimal | Luxury, Fashion | Monochrome, spacious | Subtle, elegant |
| Retro | Food, Lifestyle | Warm, vintage | Nostalgic effects |

## 🎵 Music Styles

- Pop
- Hip-hop
- Rap
- Jazz
- Lo-fi
- Ambient
- Cinematic
- Rock

**Note:** All background music is instrumental only (no singing/vocals).

## 📝 MCP Tools

### `extract_url_content`
Extracts content, logo, colors, fonts, and theme from a URL.

**Input:**
```typescript
{ url: string }
```

**Output:**
```typescript
{
  content: { title, description, features[], heroImage, sections[] },
  branding: { logo, colors, font, theme },
  metadata: { industry, domain }
}
```

### `generate_audio`
Generates background music and narration with beat detection.

**Input:**
```typescript
{
  musicStyle: string,      // "lo-fi", "jazz", etc.
  narrationScript: string,
  duration: number
}
```

**Output:**
```typescript
{
  music: { url, duration },
  narration: { url, timecodes[] },
  beats: number[]  // Beat timecodes for sync
}
```

### `render_video`
Renders the Remotion composition to video file.

**Input:**
```typescript
{
  compositionCode: string,
  audioData: { musicUrl, narrationUrl, beats[] },
  style: string,
  outputPath: string
}
```

**Output:**
```typescript
{
  videoPath: string,
  duration: number,
  fileSize: number
}
```

## 🛠️ Development

```bash
# MCP server development
cd mcp-server
npm run dev

# Remotion preview
cd remotion-project
npm run dev

# Test MCP tools
cd mcp-server
npm run test
```

## 📚 Documentation

- [MCP Server API](./mcp-server/README.md)
- [Remotion Templates](./remotion-project/README.md)
- [Skill Guide](./skill/SKILL.md)
- [Animation Libraries](./docs/animations.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

- [Remotion](https://remotion.dev) - Video rendering framework
- [Tabstack](https://tabstack.ai) - Web content extraction
- [MiniMax](https://minimax.com) - AI audio generation
- [Clearbit](https://clearbit.com) & [Brandfetch](https://brandfetch.com) - Logo APIs
- [Anime.js](https://animejs.com) - Animation library
- [GSAP](https://gsap.com) - Animation platform
