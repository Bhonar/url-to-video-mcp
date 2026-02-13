# 🚀 Install and Go - 5 Minutes to Your First Video

No Docker. No complex setup. Just npm install and go!

## ✅ Prerequisites (2 minutes)

**1. Node.js 18+**
```bash
node --version  # Should be 18 or higher
```

**2. Get API Keys (free trials available)**
- **Tabstack**: Sign up at https://tabstack.ai → Dashboard → API Keys
- **MiniMax**: Sign up at https://platform.minimax.chat → API Keys

**3. Claude Code**
- Install: https://claude.com/code
- Requires paid subscription

## 📦 Installation (3 minutes)

```bash
# 1. Navigate to project
cd url-to-video-mcp

# 2. Quick setup (installs everything)
chmod +x setup.sh
./setup.sh

# 3. Add your API keys
cp mcp-server/.env.example mcp-server/.env
nano mcp-server/.env  # or use any text editor
```

**Edit `.env` file:**
```bash
TABSTACK_API_KEY=paste_your_tabstack_key_here
MINIMAX_API_KEY=paste_your_minimax_key_here
```

That's it! No Docker, no Group ID, no complex configuration.

## 🎬 Usage (1 minute)

**Start Claude Code:**
```bash
claude
```

**Create your first video:**
```
"Turn https://stripe.com into a 30-second modern style video"
```

Claude will automatically:
1. ✅ Extract content from Stripe.com (Tabstack API)
2. ✅ Get logo and colors (Cloud APIs - Clearbit/Brandfetch)
3. ✅ Generate music + narration (MiniMax API)
4. ✅ Render video with Remotion
5. ✅ Save to `~/Videos/url-to-video/`

## 🎨 Available Styles

**For SaaS/Tech Products:**
- `modern` - Clean, professional, smooth animations
- `bold` - High energy, fast cuts, vibrant
- `creative` - Playful, unexpected, colorful

**For Other Industries:**
- `cinematic` - Dramatic, premium, film-like
- `minimal` - Elegant, spacious, subtle
- `retro` - Vintage, warm, nostalgic

## 💡 Example Commands

```
"Create a bold style video from https://vercel.com"

"Turn https://linear.app into a creative style video with lo-fi music"

"Make a 45-second cinematic video from https://apple.com"

"Generate a minimal style video from https://airbnb.com"
```

## 🎵 Music Styles

All instrumental (no vocals):
- `lo-fi` - Chill, relaxed
- `pop` - Upbeat, catchy
- `hip-hop` - Energetic beats
- `jazz` - Sophisticated, smooth
- `ambient` - Atmospheric, calm
- `cinematic` - Epic, orchestral
- `rock` - Powerful, driving
- `rap` - Rhythmic, bold

## 🔧 How It Works (Behind the Scenes)

**No Docker needed! We use:**
1. **Tabstack API** - Extracts title, description, features from any URL
2. **Cloud Logo APIs** - 4-layer fallback for logos:
   - Clearbit (high quality, free)
   - Brandfetch (brand assets)
   - Common paths (/logo.svg, /logo.png)
   - Google Favicon (always works)
3. **Playwright Screenshots** - Extracts colors from actual website
4. **MiniMax API** - Generates AI music and ultra-realistic narration
5. **Remotion** - Renders professional motion graphics locally

## 🐛 Troubleshooting

**"Tabstack API error"**
- Check your API key in `.env`
- Verify credits at https://tabstack.ai/dashboard

**"MiniMax API error"**
- Check your API key in `.env`
- Group ID is NOT required (ignore if mentioned)
- Verify credits at https://platform.minimax.chat

**"Cannot find module"**
```bash
cd mcp-server && npm install && npm run build
cd ../remotion-project && npm install
```

**"MCP server not found"**
- Add to `~/.claude/config.json`:
```json
{
  "mcpServers": {
    "url-to-video": {
      "command": "node",
      "args": ["/full/path/to/url-to-video-mcp/mcp-server/dist/server.js"]
    }
  }
}
```
- Replace `/full/path/to/` with your actual path
- Restart Claude Code

## ✨ What You Get

Each video includes:
- ✅ Auto-extracted content and branding
- ✅ AI-generated instrumental music
- ✅ Ultra-realistic AI narration
- ✅ Beat-synced transitions
- ✅ Brand colors and typography
- ✅ Professional motion graphics
- ✅ 1080p HD quality

**All rendered locally on your machine!**

## 📊 Output

Videos saved to: `~/Videos/url-to-video/`

Default settings:
- Resolution: 1920×1080 (Full HD)
- Frame rate: 30 FPS
- Duration: 30 seconds (customizable: 15-60s)
- Format: MP4 (H.264)

## 🎯 Next Steps

**Try different combinations:**
- Different styles: Modern, Bold, Creative, Cinematic, Minimal, Retro
- Different music: Lo-fi, Pop, Hip-hop, Jazz, Ambient, Cinematic, Rock
- Different durations: "Create a 45-second video..."
- Different URLs: Any landing page works!

**Advanced usage:**
- Read `skill/SKILL.md` to understand the full workflow
- Check `FINAL_STATUS.md` for complete feature list
- See `BUILD_SUMMARY.md` for technical architecture

## 🚀 You're Ready!

**No Docker. No complex config. Just install and go!**

Start creating amazing product videos in 5 minutes. 🎬
