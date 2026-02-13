# Quick Start Guide

Get up and running in 10 minutes!

## Step 1: Prerequisites

Install these first:
- [Node.js 18+](https://nodejs.org/)
- [Claude Code](https://claude.com/code) (paid subscription)

## Step 2: Get API Keys

You'll need:

1. **Tabstack API Key**
   - Sign up at https://tabstack.ai
   - Go to Dashboard → API Keys
   - Copy your API key

2. **MiniMax API Key**
   - Sign up at https://platform.minimax.chat
   - Go to API Keys section
   - Copy your API key (Group ID is optional)

## Step 3: Quick Setup

```bash
cd url-to-video-mcp
chmod +x setup.sh
./setup.sh
```

This will:
- Install all dependencies
- Set up MCP server
- Set up Remotion project
- Install the skill

## Step 4: Configure API Keys

Edit `mcp-server/.env`:

```bash
TABSTACK_API_KEY=your_actual_key_here
MINIMAX_API_KEY=your_actual_key_here
# MINIMAX_GROUP_ID is optional - leave commented out unless you have one
```

## Step 5: Configure Claude Code

Add to your Claude Code settings (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "url-to-video": {
      "command": "node",
      "args": ["/Users/bella/cooking/remotion/url-to-video-mcp/mcp-server/dist/server.js"]
    }
  }
}
```

**Replace** `/Users/bella/cooking/remotion/url-to-video-mcp` with your actual path!

## Step 6: Test It!

```bash
# Start Claude Code
claude

# Try this command:
"Turn https://remotion.dev into a 30-second modern style video"
```

Claude will:
1. Extract content from the URL
2. Generate a story script
3. Generate music and narration
4. Create Remotion code
5. Render the video
6. Save it to `~/Videos/url-to-video/`

## Example Commands

```
"Create a bold style product video from https://stripe.com"

"Turn https://vercel.com into a 45-second cinematic video"

"Make a minimal style video from https://linear.app with lo-fi music"

"Generate a 60-second corporate video from https://salesforce.com"
```

## Troubleshooting

### "Tabstack API error"
- Check your API key in `.env`
- Verify you have credits

### "Logo extraction failed"
- We automatically fallback to Google Favicon
- Check that the URL is accessible

### "Remotion render failed"
- Check disk space
- Verify output directory exists: `~/Videos/url-to-video/`

### "MCP server not found"
- Check the path in Claude Code config
- Make sure you ran `npm run build` in mcp-server

## What Gets Created

After rendering, you'll find:

```
~/Videos/url-to-video/
├── product-video.mp4          # Your rendered video
├── another-video.mp4
└── ...
```

Each video includes:
- Extracted content from the URL
- Auto-generated narration
- Instrumental background music
- Beat-synced transitions
- Brand colors and fonts

## Next Steps

- Explore different styles: Modern, Bold, Corporate, Creative, Cinematic, Minimal, Retro
- Try different music styles: pop, hip-hop, jazz, lo-fi, ambient, cinematic, rock
- Customize video duration (15-60 seconds recommended)
- Share your videos on social media!

## Need Help?

- Check the full [README.md](./README.md)
- Read the [SKILL.md](./skill/SKILL.md) for detailed workflow
- Report issues at https://github.com/your-repo/issues

---

**🎬 You're ready to create amazing videos! Have fun!**
