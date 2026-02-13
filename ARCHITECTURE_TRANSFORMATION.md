# Architecture Transformation: Template-Based → Dynamic Generation

**Date:** February 13, 2026
**Status:** Complete
**Impact:** Breaking change - Complete system redesign

---

## 🎯 Executive Summary

We transformed the URL-to-Video system from using **rigid template compositions** to **dynamic, AI-generated video code**. Claude now analyzes each landing page and generates unique, custom-tailored Remotion components instead of filling pre-designed templates.

**Result:** Every video is now uniquely designed for its specific brand and content, not constrained by template limitations.

---

## ❌ The Problem: Template Rigidity

### What We Had Before

The original system used 7 pre-designed template compositions:
- Modern
- Bold
- Creative
- Cinematic
- Minimal
- Retro
- Corporate

**How it worked:**
1. Extract content from URL
2. Generate audio
3. **Select a template** (Modern, Bold, etc.)
4. **Fill template slots** with extracted data
5. Render video

### Why This Was Limiting

**User Feedback:** *"compositions are acting like rigid templates... I want the agent to be free in designing the scenes"*

**Problems:**
1. **Template Prison** - Every video looked similar, just with different colors/text
2. **No Creative Freedom** - Agent couldn't adapt scene structure to content
3. **Fixed Scene Count** - Always same number of scenes regardless of content complexity
4. **Generic Animations** - Same animations for every brand
5. **One-Size-Fits-All** - Tech startup got same structure as luxury brand

**Example of the rigidity:**
```typescript
// ALL videos had this exact structure:
Scene 1: Hero (0-3s) - Logo + Title
Scene 2: Problem (3-6s) - Description
Scene 3: Features (6-21s) - Feature list
Scene 4: CTA (21-30s) - Call to action
```

No matter if your product had 3 features or 10, if it needed a demo section, or if the story required different pacing - **you got the same 4 scenes**.

---

## ✅ The Solution: Dynamic Generation

### How It Works Now

**Official Remotion Approach**: Let Claude Code (the agent) generate custom Remotion code for each video.

**New Workflow:**
1. Extract content from URL
2. **Analyze brand & content** (tone, style, complexity)
3. **Design custom scene structure** (number of scenes adapts to content)
4. **Plan unique animations** (tailored to brand personality)
5. Generate audio
6. **Write custom Remotion component code** (`Generated.tsx`)
7. Register composition in `Root.tsx`
8. Render the uniquely-generated video

### Key Difference

**Before:**
```
URL → Extract → Select Template → Fill Slots → Render
        ↓
    Always same structure
```

**After:**
```
URL → Extract → Analyze → Design Structure → Generate Code → Render
                   ↓
              Unique every time
```

---

## 🔧 Technical Changes

### 1. Installed Official Remotion Skills

```bash
npx skills add remotion-dev/skills
```

**What this does:** Teaches Claude best practices for writing Remotion code, improving generation quality.

**Location:** `.agents/skills/remotion-best-practices` (symlinked for Claude Code)

### 2. Updated MCP `render_video` Tool

**Before:**
```typescript
interface RenderParams {
  compositionId: string;  // "Modern", "Bold", etc.
  inputProps: Record<string, any>;
  outputFileName: string;
}
```

**After:**
```typescript
interface RenderParams {
  // No compositionId - always renders "Generated"
  inputProps: Record<string, any>;
  outputFileName: string;
}
```

**Why:** There's no template to select anymore. We always render the dynamically-generated `Generated` composition.

### 3. Rewrote Skill Workflow

**File:** `skill/SKILL.md`

**New Steps Added:**
- **Step 3:** Analyze Content & Design Video Structure
  - What tone? (playful, professional, edgy, luxurious)
  - What visual style? (minimal, bold, cinematic, playful)
  - How many scenes? (adapts to story complexity)
  - What animations would be impactful?

- **Step 4:** Design Scene Structure & Timing
  - Plan each scene's visual, animation, layout
  - Customize timing based on content

- **Step 6:** Write Custom Remotion Component Code
  - Generate TypeScript/React code
  - Save to `Generated.tsx`
  - Implement unique scene components

- **Step 7:** Register Composition in Root.tsx
  - Import and register the Generated component

**Old workflow was:** Extract → Script → Select Style → Audio → Render
**New workflow is:** Extract → Script → Analyze → Design → Audio → Code → Register → Render

### 4. Deleted All Template Compositions

**Removed:**
- `src/compositions/Modern.tsx` ❌
- `src/compositions/Bold.tsx` ❌
- `src/compositions/Creative.tsx` ❌
- `src/compositions/Cinematic.tsx` ❌
- `src/compositions/Minimal.tsx` ❌
- `src/compositions/Retro.tsx` ❌

**Kept (for testing only):**
- `src/compositions/TailwindTest.tsx` ✓
- `src/compositions/InlineTest.tsx` ✓

**Why delete them?** They're now obsolete and would tempt falling back to template-based approach.

### 5. Updated Root.tsx

**Before:** Registered 6 template compositions
**After:** Only test compositions + commented placeholder for `Generated`

```typescript
// Uncomment after Generated.tsx is created:
// import { Generated } from './compositions/Generated';
// <Composition id="Generated" component={Generated} ... />
```

---

## 📊 Comparison: Before vs After

| Aspect | Template-Based (Before) | Dynamic Generation (After) |
|--------|------------------------|---------------------------|
| **Design Freedom** | 7 pre-defined styles | Unlimited, tailored to brand |
| **Scene Structure** | Always 4 scenes | Adapts to content (3-8+ scenes) |
| **Animations** | Same per template | Unique per video |
| **Agent Role** | Fill in blanks | Full creative control |
| **Video Uniqueness** | Similar with different colors | Truly unique every time |
| **Content Adaptation** | One-size-fits-all | Custom-fit |
| **Quality** | Good but generic | High-quality & bespoke |

---

## 🎨 Example: How A Video Gets Designed Now

**Input:** `https://fastdeploy.com` (fictional tech SaaS)

### Step 3: Analysis
```
Brand: FastDeploy (Tech SaaS)
Tone: Modern, professional, innovative
Colors: Blue gradient (#0066FF → #003D99)
Personality: Fast-paced, developer-focused
Visual Style: Clean, tech-forward, code-themed
```

### Step 4: Scene Design
```
Scene 1: Hook (0-3s)
  Visual: Dramatic logo reveal with floating code particles
  Animation: Logo scales + fades + particles float upward
  Layout: Centered, minimalist

Scene 2: Problem (3-8s)
  Visual: Split screen - slow old deploy vs fast new deploy
  Animation: Slide in from opposite sides, code scrolling
  Layout: 50/50 split with animated divider

Scene 3: Solution (8-15s)
  Visual: Terminal showing deployment in action
  Animation: Typewriter effect, cursor blink, success checkmarks
  Layout: Terminal mockup centered, syntax highlighted

Scene 4: Features (15-25s)
  Visual: Feature cards with developer icons
  Animation: Each card slides from different direction, beat-synced
  Layout: Staggered grid, alternating sides

Scene 5: CTA (25-30s)
  Visual: Bold "Deploy Now" button with URL
  Animation: Pulsing glow, spring bounce
  Layout: Centered, large scale
```

### Step 6: Generated Code
Claude writes **custom React/TypeScript code** implementing these scenes with:
- Terminal-themed styling
- Code syntax highlighting effects
- Developer-focused animations
- Blue tech gradient throughout
- Fast-paced transitions

**Result:** A video that looks like it was designed specifically for FastDeploy, not a generic template.

---

## 🚀 Benefits

### 1. **True Customization**
Each video reflects the unique personality and needs of the brand.

### 2. **Better Storytelling**
Scene count and pacing adapt to content complexity, not forced into fixed structure.

### 3. **Agent Creativity**
Claude can use full knowledge of design, animation, and React to create innovative solutions.

### 4. **Higher Quality**
Official Remotion skills guide Claude to write better code with proper patterns.

### 5. **No More "Template Feel"**
Videos look professionally designed, not template-generated.

### 6. **Scalable**
Agent improves over time as it learns from each generation (vs static templates).

---

## 📝 Migration Guide

### For Users

**Old way:**
```bash
/url-to-video https://example.com --style modern
```

**New way:**
```bash
/url-to-video https://example.com
# No style selection - Claude designs it automatically
```

**What changed for you:**
- ✅ Same simple command
- ✅ Better quality output
- ✅ No more choosing styles (Claude analyzes and decides)
- ⚠️ First run will take slightly longer (code generation time)

### For Developers

**If you're running the system:**

1. **Pull latest code**
   ```bash
   git pull origin main
   ```

2. **Verify official Remotion skills are installed**
   ```bash
   ls .agents/skills/remotion-best-practices
   # Should exist (symlinked)
   ```

3. **Rebuild MCP server**
   ```bash
   cd mcp-server && npm run build
   ```

4. **First video will create `Generated.tsx`**
   - Claude will write it automatically
   - Uncomment the import/registration in `Root.tsx` after first generation

5. **Template compositions are gone**
   - If you need reference examples, check git history
   - Don't recreate them - defeats the purpose!

---

## ⚠️ Breaking Changes

### What No Longer Works

❌ **Selecting specific styles**
```bash
# This old parameter doesn't exist anymore:
/url-to-video https://example.com --style bold
```

❌ **Hardcoded template references**
```typescript
// This won't work - Modern.tsx deleted:
render_video({ compositionId: "Modern", ... })
```

❌ **Expecting consistent structure**
- Scene count varies per video
- Animations differ per video
- Layout adapts per content

### What Still Works

✅ **Same MCP tools** (updated, but same names)
✅ **Same skill command** (`/url-to-video`)
✅ **Same output format** (MP4 videos in `~/Videos/url-to-video/`)
✅ **Audio generation** (unchanged)
✅ **Content extraction** (unchanged)

---

## 🧪 Testing Checklist

When testing the transformed system:

- [ ] Content extraction still works
- [ ] Claude analyzes brand correctly
- [ ] Custom scene design makes sense
- [ ] Generated.tsx code is valid TypeScript
- [ ] Composition registers in Root.tsx
- [ ] Audio generation works (music + narration)
- [ ] Audio syncs to visuals
- [ ] Video renders successfully
- [ ] Output is unique (not template-like)
- [ ] Quality is high

---

## 🤔 Why This Matters

### The Vision

**Before:** "Generate a video from this URL" → Get a template filled with your data

**Now:** "Generate a video from this URL" → Get a professionally designed, custom video that looks like a human designer spent hours crafting it specifically for your brand

### Real-World Impact

- **Marketing teams:** No more "template" feel - clients see truly custom work
- **Agencies:** Can serve clients with bespoke video content at scale
- **Developers:** System becomes smarter over time as Claude learns
- **End users:** Better quality videos that actually represent their brand

---

## 📚 Further Reading

- [Official Remotion Skills Documentation](https://www.remotion.dev/docs/ai/skills)
- [Remotion + Claude Code Guide](https://www.remotion.dev/docs/ai/claude-code)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

---

## 🙏 Acknowledgments

This transformation was inspired by Remotion's official approach to AI-powered video generation, where the agent has full creative freedom to write custom code rather than being constrained by templates.

**Key Insight:** The best way to generate unique videos isn't better templates - it's letting the AI design from scratch every time.

---

**Questions?** Open an issue on GitHub.

**Ready to test?** See the main [README.md](./README.md) for setup instructions.
