# Testing Through Claude Code - Full Pipeline

## How to Run the Test

### 1. Start Claude Code

Open a **new terminal window** (keep this one for observing):

```bash
cd /Users/bella/Cooking/remotion/url-to-video-mcp
claude
```

### 2. Run This Exact Command

Copy and paste this into Claude Code:

```
Create a modern style video from https://stripe.com
```

## What Should Happen

Claude Code will follow the Skill workflow:

### Step 1: Extract URL Content
```
Calling: extract_url_content({ url: "https://stripe.com" })

Result:
- Title: "Financial infrastructure to grow your revenue..."
- Features: ["Accept and optimize payments globally", ...]
- Logo, colors, theme extracted
```

### Step 2: Generate Story Script
Claude will write a narration script with:
- Hook
- Problem
- Solution
- Features
- CTA

### Step 3: Generate Audio
```
Calling: generate_audio({
  musicStyle: "lo-fi",
  narrationScript: "...",
  duration: 30
})

Result:
- Music file generated (or fails)
- Narration generated (or fails)
- Beats detected
```

### Step 4: Render Video
```
Calling: render_video({
  compositionId: "Modern",
  inputProps: { content, branding, audio },
  outputFileName: "stripe-modern-video"
})

Result:
- Video rendered
- Saved to ~/Videos/url-to-video/
```

## What to Watch For

### ✅ Should Work:
- URL extraction (Tabstack working)
- Story script generation (Claude AI)
- Video rendering with Tailwind

### ⚠️ Might Fail:
- Audio generation (MiniMax API untested)
- Animations (if there's another issue)

### ❌ Known Issues:
- Colors might be washed out (light grays)

## Comparison Points

After the test, compare the Claude Code video vs the test video:

| Aspect | Test Video | Claude Code Video |
|--------|-----------|-------------------|
| **Content** | Generic test data | Real Stripe content |
| **Story** | None | AI-generated script |
| **Animation** | Should have | ? |
| **Audio** | Silent | Should have audio |
| **Layout** | Some elements | ? |
| **Quality** | ? | ? |

## Debug Logs

Watch for these in Claude Code output:

```
✓ Content extracted with Tabstack
✓ Music generated
✓ Narration generated
✓ Beat detection: X beats
✓ Bundling Remotion project...
✓ Rendering video...
```

Any failures will show as errors.

---

**Ready to run?** Start Claude Code and paste the command!
