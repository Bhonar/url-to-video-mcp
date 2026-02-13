# Test Plan - URL to Video Skill

## Prerequisites
- [ ] API keys in `mcp-server/.env` (TABSTACK_API_KEY, MINIMAX_API_KEY)
- [ ] MCP server built: `cd mcp-server && npm run build`
- [ ] Remotion project deps installed: `cd remotion-project && npm install`
- [ ] Skill installed: `ls ~/.claude/skills/url-to-video/SKILL.md` exists

## Test Steps

### 1. Restart Claude Code
**Why:** Skills load at session start. Current session doesn't see the skill.

**How:**
- Close current Claude Code
- Open new Claude Code session
- cd to `/Users/bella/Cooking/remotion/url-to-video-mcp`

### 2. Run the Skill
```bash
/url-to-video https://tabstack.ai
```

**What should happen:**
- ✅ Extract content from Tabstack (logo, colors, fonts, features)
- ✅ Generate narration script
- ✅ Analyze brand (tone, style, visual design)
- ✅ Generate audio (music + narration with REAL beats)
- ✅ Read Remotion skill files for best practices
- ✅ Write custom Generated.tsx with proper animations
- ✅ Register in Root.tsx
- ✅ Render video

### 3. What to Check

**Content Extraction:**
- [ ] Logo URL fetched
- [ ] Colors match website (light mode, not dark!)
- [ ] Font detected correctly
- [ ] Features extracted

**Audio Generation:**
- [ ] Music file created
- [ ] Narration file created
- [ ] Beats array has real values (not fake [1.2, 2.4...])

**Code Quality:**
- [ ] Reads Remotion skill files (animations.md, transitions.md, timing.md)
- [ ] Uses proper animation patterns from skills
- [ ] Beat-sync actually works (transitions on real beats)
- [ ] Rich UI components (not just text)
- [ ] Colors match extracted brand colors

**Video Output:**
- [ ] Audio plays (music + narration)
- [ ] Animations smooth and professional
- [ ] Beat transitions work perfectly
- [ ] Looks high-quality (Remotion skills quality)

## Success Criteria

✅ **Video has audio**
✅ **Colors match Tabstack.ai (light, not dark)**
✅ **Animations use Remotion best practices**
✅ **Beat sync actually works**
✅ **Quality matches "pure Remotion skills" standard**

## If It Fails

**Skill not found:**
- Check: `ls ~/.claude/skills/url-to-video/SKILL.md`
- Verify frontmatter in SKILL.md

**MCP tools fail:**
- Check MCP server: `cat ~/.claude/config.json | jq .mcpServers`
- Restart: `cd mcp-server && npm run build`

**Audio not generated:**
- Check MINIMAX_API_KEY in mcp-server/.env
- Check MCP generate_audio tool logs

**Wrong colors/fonts:**
- Check extract_url_content output
- Verify Tabstack API key or screenshot fallback worked

## Expected Result

A **bold, exciting 30s video** for Tabstack.ai with:
- Light mode colors matching their brand
- Real audio (music + narration)
- Beat-synced transitions
- Professional Remotion-quality animations
- Rich UI components
