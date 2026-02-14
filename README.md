# URL to Video MCP + Skill

Transform any landing page into a motion graphics video using AI. Works as a **Claude Code skill + MCP server** — Claude analyzes the page, writes custom Remotion code, generates audio, and renders an MP4.

## How It Works

1. **Extract** — MCP tool scrapes the URL for content, logo, colors, fonts
2. **Script** — Claude writes a narration script and selects music style
3. **Audio** — MCP tool generates instrumental music + AI narration (ElevenLabs, with MiniMax fallback)
4. **Design** — Claude designs 4-6 animated scenes matching the brand
5. **Code** — Claude writes custom `Generated.tsx` with Remotion animations
6. **Render** — MCP tool bundles and renders to MP4

Every video is unique — no templates. Claude writes fresh animation code for each URL based on brand personality, colors, and content.

## Architecture

```
Claude Code + Skill (SKILL.md)
  |
  v
MCP Server (3 tools)
  |-- extract_url_content  --> Tabstack API + Cloud Logo APIs
  |-- generate_audio       --> ElevenLabs (music + narration) or MiniMax
  |-- render_video         --> @remotion/renderer
  |
  v
remotion-project/
  |-- src/compositions/Generated.tsx  (overwritten each run)
  |-- public/audio/                   (generated audio files)
  |-- public/images/                  (downloaded logos)
```

## Quick Start

### 1. Get the code

```bash
mkdir ~/Projects
cd ~/Projects
git clone <repo-url> url-to-video-mcp
cd url-to-video-mcp
```

### 2. Get API keys

- [tabstack.ai](https://tabstack.ai) — sign up, copy API key (required for URL extraction)
- [elevenlabs.io](https://elevenlabs.io) — sign up, copy API key (free tier, for music + narration). **Important:** when creating your API key, enable **Text to Speech** and **Music** permissions (or select "All permissions")
- [platform.minimax.chat](https://platform.minimax.chat) — optional, fallback for music (requires credits)

### 3. Install

```bash
cd mcp-server
npm install
cp .env.example .env
# Edit .env — paste your API keys
npm run build
cd ..

cd remotion-project
npm install
cd ..
```

### 4. Add MCP server to Claude Code

```bash
claude mcp add url-to-video -- node $(pwd)/mcp-server/dist/server.js
```

### 5. Install the skill

```bash
mkdir -p .claude/skills
cp skill/SKILL.md .claude/skills/url-to-video.md
```

### 6. Use it

```bash
claude
```

Then type:

```
"Turn https://stripe.com into a video"
```

That's it. No `cwd` config needed — the server finds `.env` and the Remotion project automatically from its own file location.

### Other example prompts

```
"Create a 45-second cinematic video from https://myproduct.com"
"Make a bold, energetic promo video from https://startup.io"
```

## MCP Tools

### `extract_url_content`

Extracts content, branding, and metadata from a URL. Downloads the logo to `remotion-project/public/images/` for `staticFile()` access.

**Input:** `{ url: string }`

**Returns:**
```
content:  { title, description, features[], heroImage, sections[] }
branding: { logo: { url, staticPath }, colors: { primary, secondary, accent, background }, font, theme }
metadata: { industry, domain }
```

### `generate_audio`

Generates instrumental background music and AI narration. Uses ElevenLabs (free tier) as primary provider with MiniMax fallback. Saves files to `remotion-project/public/audio/`.

**Input:** `{ narrationScript: string, duration: number, musicStyle?: string }`

**Returns:**
```
music:     { url, staticPath, duration }
narration: { url, staticPath, timecodes[] }
beats:     number[]
```

### `render_video`

Renders `Generated.tsx` to MP4. Duration is automatically calculated from audio length via `calculateMetadata`.

**Input:** `{ inputProps: object, outputFileName: string }`

**Returns:**
```
{ videoPath, duration, fileSize }
```

## Music Styles

All background music is instrumental only (no vocals):

- `pop` — upbeat, energetic
- `hip-hop` — rhythmic, bass-heavy
- `jazz` — smooth, sophisticated
- `lo-fi` — chill, relaxed (default)
- `ambient` — atmospheric, calming
- `cinematic` — dramatic, orchestral
- `rock` — guitar-driven, energetic

## Project Structure

```
url-to-video-mcp/
├── mcp-server/                    # MCP server (TypeScript)
│   ├── src/
│   │   ├── server.ts              # MCP server entry point
│   │   └── tools/
│   │       ├── extract-url.ts     # URL content extraction
│   │       ├── generate-audio.ts  # ElevenLabs (music + narration) + MiniMax fallback
│   │       └── render-video.ts    # Remotion rendering
│   ├── .env.example               # Environment template
│   └── package.json
├── remotion-project/              # Remotion video project
│   ├── src/
│   │   ├── Root.tsx               # Composition + calculateMetadata
│   │   └── compositions/
│   │       └── Generated.tsx      # Dynamic video (overwritten each run)
│   ├── public/
│   │   ├── audio/                 # Generated audio files
│   │   └── images/                # Downloaded logos
│   └── package.json
├── skill/
│   └── SKILL.md                   # Claude Code skill instructions
├── setup.sh                       # Quick setup script
└── README.md
```

## Troubleshooting

### "TABSTACK_API_KEY not set"

The MCP server can't find your `.env` file. Make sure `mcp-server/.env` exists with valid API keys (copy from `.env.example` if missing).

### ElevenLabs returns 401 "missing_permissions"

Your ElevenLabs API key was created without the required permissions. Go to [elevenlabs.io](https://elevenlabs.io) > Profile > API Keys, create a new key, and enable **Text to Speech** and **Music** permissions (or select "All permissions").

### Audio not playing in rendered video

Audio files must be in `remotion-project/public/audio/` and referenced via `staticFile()`. The MCP server handles this automatically. If audio is missing, check that `REMOTION_PROJECT_PATH` in `.env` points to the correct location (default: `../remotion-project`).

### Video renders with wrong duration

Duration is automatically calculated from audio length using `calculateMetadata` in `Root.tsx`. If no audio is available, it falls back to `props.duration` or 30 seconds.

### Remotion studio not loading

```bash
cd remotion-project
npm install
npx remotion studio
```

### Build errors in MCP server

```bash
cd mcp-server
npm install
npm run build
```

If TypeScript errors persist, ensure all `@remotion/*` packages are at the same version (`4.0.421`).

## Credits

- [Remotion](https://remotion.dev) — React video framework
- [Tabstack](https://tabstack.ai) — Web content extraction
- [ElevenLabs](https://elevenlabs.io) — AI music + narration (free tier)
- [MiniMax](https://platform.minimax.chat) — AI music fallback
- [Clearbit](https://clearbit.com) & [Brandfetch](https://brandfetch.com) — Logo APIs

## License

MIT
