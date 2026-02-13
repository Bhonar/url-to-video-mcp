---
name: url-to-video
description: Create high-quality motion graphics videos from landing page URLs using Remotion, with AI-generated music and narration
---

# URL to Video - Remotion Skill

Create high-quality motion graphics videos from landing page URLs.

## When to Use

When the user provides a URL and wants to create a video for:
- Product launches
- Social media marketing
- Landing page promos
- Explainer videos
- Brand showcases

## Video Capabilities

- **Dynamic Generation**: Claude generates custom Remotion code for each video (no templates!)
- **AI Audio**: Background music + narration (instrumental only, no singing)
- **Beat-Synced Transitions**: Transitions sync to music beats
- **Auto-Extraction**: Logo, colors, fonts, content from URL
- **Local Rendering**: Saves to user's Mac/PC
- **Creative Freedom**: Unique designs tailored to each landing page's content and brand

## Complete Workflow

### Step 1: Extract Content from URL

Call the MCP tool `extract_url_content`:

```
extract_url_content({ url: "https://example.com" })
```

**Returns:**
- `content`: title, description, features[], heroImage, sections[]
- `branding`: logo, colors (primary, secondary, accent, background), font, theme
- `metadata`: industry, domain

**What it does:**
1. Uses Tabstack API to extract page content
2. Uses Brand Identity Extractor for logo + color palette
3. Falls back to Playwright screenshot → Claude Vision if needed
4. Infers industry from content

### Step 2: Generate Video Story Script

Using the extracted content, write a compelling narration script following this structure:

#### Story Arc (Follow Exactly)

**1. Hook (3-5 seconds)**
- Grab attention immediately
- Use a question, stat, or bold statement
- Example: "Tired of slow deployments?"

**2. Problem (5-10 seconds)**
- Describe the pain point your audience faces
- Make it relatable and specific
- Example: "Most teams wait hours for CI/CD pipelines to complete..."

**3. Solution (10-15 seconds)**
- Introduce the product as the answer
- State the core value proposition clearly
- Example: "FastDeploy cuts deployment time from hours to minutes with AI-powered optimization..."

**4. Features (15-25 seconds)**
- Highlight 3-5 key features (NOT all features)
- Each feature gets 3-5 seconds
- Focus on benefits, not just specs
- Example: "One-click rollbacks keep you safe. Real-time monitoring shows exactly what's happening. Auto-scaling handles traffic spikes automatically."

**5. Social Proof (5-10 seconds)** (optional - if available)
- Stats, testimonials, trust signals
- Example: "Trusted by 10,000+ developers at companies like..."

**6. Call to Action (3-5 seconds)**
- Clear, actionable next step
- Example: "Start deploying faster today. Visit FastDeploy.com"

#### Script Writing Guidelines

- **Tone**: Conversational, not robotic
- **Pacing**: Natural pauses for emphasis
- **Length**: Match to video duration (aim for ~150 words/minute)
- **Voice**: Match brand personality (professional, playful, bold, etc.)
- **Avoid**: Jargon (unless industry-specific), filler words, repetition

#### Example Template

```
[Hook] {Attention-grabbing question or stat}

[Problem] Most {target audience} struggle with {specific pain point}. {Elaborate with 1-2 sentences}

[Solution] {Product name} solves this by {core benefit}. {Explain how it works in 1-2 sentences}

[Features] With {feature 1}, you can {benefit 1}. {Feature 2} means {benefit 2}. And {feature 3} gives you {benefit 3}.

[Social Proof] Already trusted by {number} {audience}, with {impressive stat}.

[CTA] Ready to {desired action}? Visit {product name} dot com today.
```

### Step 3: Analyze Content & Design Video Structure

**DO NOT use templates.** Instead, analyze the extracted content and design a unique video structure:

**Questions to Answer:**
1. What is the tone/personality of this brand? (playful, professional, edgy, luxurious, etc.)
2. What visual style matches the content? (minimal, bold, cinematic, playful, etc.)
3. How many scenes are needed to tell the story? (typically 4-6 scenes)
4. What animations would be most impactful for this specific content?
5. What layout/composition works best? (centered, split-screen, layered, etc.)

**Design Principles:**
- **Brand-First**: Use extracted colors, fonts, and visual style
- **Content-Driven**: Number of scenes = story complexity (not fixed template)
- **Creative**: Each video should feel unique and tailored
- **Engaging**: Prioritize eye-catching animations and smooth transitions
- **Professional**: High production quality, polished execution

**Example Analysis:**
```
Brand: FastDeploy (Tech SaaS)
Tone: Modern, professional, innovative
Colors: Blue gradient (#0066FF → #003D99)
Visual Style: Clean, minimal, tech-forward
Scenes: 5 (Hook → Problem → Solution → Features → CTA)
Key Animations: Smooth fades, terminal-style text reveal, pulsing CTAs
Layout: Centered with generous spacing, floating elements
```

### Step 4: Design Scene Structure & Timing

Based on your analysis, plan the video timeline:

**Scene Planning Template:**
```
Scene 1: Hook (0-3s, 0-90 frames)
  - Visual: [Dramatic logo reveal with particles]
  - Animation: [Scale + fade + rotation]
  - Layout: [Centered, full screen]

Scene 2: Problem (3-8s, 90-240 frames)
  - Visual: [Split screen: problem vs solution imagery]
  - Animation: [Slide in from sides, text typewriter effect]
  - Layout: [50/50 split]

Scene 3: Solution (8-15s, 240-450 frames)
  - Visual: [Product demo mockup with highlights]
  - Animation: [Zoom in, pulsing highlights on key features]
  - Layout: [Centered with side annotations]

Scene 4: Features (15-25s, 450-750 frames)
  - Visual: [Icon grid with text, staggered reveals]
  - Animation: [Each feature slides in from different direction]
  - Layout: [Grid 2x2 or vertical list]

Scene 5: CTA (25-30s, 750-900 frames)
  - Visual: [Bold button with website URL]
  - Animation: [Pulsing glow effect, spring bounce]
  - Layout: [Centered, large and bold]
```

**Timing Guidelines:**
- Hook: 3-5 seconds (grab attention fast)
- Problem: 5-10 seconds (build empathy)
- Solution: 7-12 seconds (present product)
- Features: 10-20 seconds (highlight benefits)
- CTA: 3-5 seconds (drive action)

### Step 5: Generate Audio

Call the MCP tool `generate_audio`:

```
generate_audio({
  musicStyle: "lo-fi",  // or inferred from style/industry
  narrationScript: [your written script],
  duration: 30
})
```

**Music Styles Available:**
- `pop` - Upbeat, catchy, energetic
- `hip-hop` - Rhythmic beats, urban, modern
- `rap` - Strong drums, bass-heavy (instrumental only!)
- `jazz` - Smooth, sophisticated, piano/sax
- `lo-fi` - Mellow, relaxing, chill vibes
- `ambient` - Atmospheric, calm, ethereal
- `cinematic` - Orchestral, dramatic, epic
- `rock` - Electric guitar, energetic, bold

**Music Selection Logic:**
- Bold style → hip-hop, rock, rap
- Modern style → lo-fi, ambient, pop
- Corporate → jazz, ambient
- Cinematic → cinematic (orchestral)
- Minimal → ambient, lo-fi
- Creative → pop, jazz
- Retro → jazz, rock
- **User can override via parameter**

**CRITICAL**: All music is instrumental only (NO singing, NO vocals!)

**Returns:**
- `music`: { url, localPath, duration }
- `narration`: { url, localPath, timecodes[] }
- `beats`: [1.2, 2.4, 3.6, ...] (beat timecodes in seconds)

### Step 6: Write Custom Remotion Component Code

**CRITICAL**: You MUST write custom Remotion code to `/Users/bella/Cooking/remotion/url-to-video-mcp/remotion-project/src/compositions/Generated.tsx`

This is NOT a template - generate unique code based on your scene design from Step 4.

#### Animation Libraries to Use

**Primary (Always use):**
- `interpolate()` from Remotion - Map frame ranges to values
- `spring()` from Remotion - Physics-based animations
- Tailwind CSS classes for styling

**Secondary (For complex animations):**
- Anime.js - For morphing, path animations, complex keyframes
- GSAP - For timeline control, advanced sequencing

**DO NOT USE:**
- ❌ Framer Motion (not compatible)
- ❌ react-spring (use Remotion's spring instead)
- ❌ Auto-playing CSS animations (causes flickering)

#### Code Structure (Write to Generated.tsx)

**File Path**: `/Users/bella/Cooking/remotion/url-to-video-mcp/remotion-project/src/compositions/Generated.tsx`

```typescript
import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { VideoProps } from '../Root';

export const Generated: React.FC<VideoProps> = ({
  content,
  branding,
  audio,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
        fontFamily: branding.font,
      }}
    >
      {/* Audio */}
      {audio.music.localPath && <Audio src={audio.music.localPath} />}
      {audio.narration.localPath && <Audio src={audio.narration.localPath} />}

      {/* YOUR CUSTOM SCENES BASED ON STEP 4 DESIGN */}
      {/* Example - replace with your actual scene design: */}

      {/* Scene 1: Hook (0-3s = 0-90 frames at 30fps) */}
      <Sequence from={0} durationInFrames={90}>
        <HookScene title={content.title} logo={branding.logo.url} colors={branding.colors} />
      </Sequence>

      {/* Scene 2: Problem (3-8s = 90-240 frames) */}
      <Sequence from={90} durationInFrames={150}>
        <ProblemScene description={content.description} colors={branding.colors} />
      </Sequence>

      {/* Add more scenes based on your design... */}
    </AbsoluteFill>
  );
};

// Implement your custom scene components below
// Make each scene unique to this specific content!

const HookScene: React.FC<{
  title: string;
  logo: string;
  colors: VideoProps['branding']['colors'];
}> = ({ title, logo, colors }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // YOUR CUSTOM ANIMATION CODE HERE
  // Use spring(), interpolate(), creative transforms
  // Make it unique to this brand!

  return (
    <AbsoluteFill style={{ /* your styles */ }}>
      {/* your JSX */}
    </AbsoluteFill>
  );
};

// Add more scene components...
```

**Important:**
- Export the main component as `Generated`
- Use `VideoProps` interface from `../Root`
- Implement scene components inline (don't import from other files)
- Make animations and layout unique to this content
- Use extracted branding colors and fonts

#### Beat-Synced Transitions

Sync scene transitions or animations to music beats:

```typescript
const frame = useCurrentFrame();
const fps = 30;
const currentTime = frame / fps;

// Check if we're at a beat
const nearestBeat = audio.beats.find(beat =>
  Math.abs(beat - currentTime) < 0.033  // Within 1 frame
);

const shouldPulse = nearestBeat !== undefined;

const scale = shouldPulse ? 1.1 : 1;
```

#### Animation Best Practices

1. **Non-Repetitive**: Vary animation types across scenes
   - Scene 1: Fade in
   - Scene 2: Slide up
   - Scene 3: Zoom and rotate
   - Scene 4: Morph

2. **Smooth**: Use spring physics for natural motion
   ```typescript
   const opacity = spring({ frame, fps: 30, from: 0, to: 1 });
   ```

3. **Creative**: Unexpected but intentional
   - Logo reveals with particle effects
   - Text morphing
   - 3D transformations (use CSS 3D transforms)

4. **Eye-Grabbing**: First 3 seconds must hook
   - Fast zoom
   - Dramatic reveal
   - Bold typography

### Step 7: Register Composition in Root.tsx

After writing `Generated.tsx`, you MUST register it in Root.tsx:

**File**: `/Users/bella/Cooking/remotion/url-to-video-mcp/remotion-project/src/Root.tsx`

Add the import and Composition:

```typescript
import { Generated } from './compositions/Generated';

// In the Root component, add:
<Composition
  id="Generated"
  component={Generated}
  durationInFrames={900} // 30 seconds at 30fps (adjust based on duration)
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{
    content: {
      title: 'Generated Video',
      description: 'Dynamically generated',
      features: [],
    },
    branding: {
      logo: { url: '' },
      colors: {
        primary: '#0066FF',
        secondary: '#003D99',
        accent: '#66B3FF',
        background: '#FFFFFF',
      },
      font: 'system-ui',
      theme: 'light' as const,
    },
    audio: {
      music: { localPath: '' },
      narration: { localPath: '', timecodes: [] },
      beats: [],
    },
    duration: 30,
  }}
/>
```

### Step 8: Render Video

Call the MCP tool `render_video`:

```
render_video({
  inputProps: {
    content: [extracted content],
    branding: [extracted branding],
    audio: [generated audio],
    duration: 30
  },
  outputFileName: "product-launch-video"
})
```

**Note**: No `compositionId` needed - it always renders the Generated composition.

**Returns:**
- `videoPath`: Full path to rendered video (saved locally on user's Mac/PC)
- `duration`: Video duration in seconds
- `fileSize`: File size in bytes

**Output Location:**
- Default: `~/Videos/url-to-video/[filename].mp4`
- Or custom path specified in env

### Step 9: Return Result to User

```
Video rendered successfully!

📹 File: ~/Videos/url-to-video/product-launch-video.mp4
⏱️ Duration: 30 seconds
📦 Size: 12.5 MB

The video features:
- Custom-designed scenes tailored to [brand name]
- Music: [style] instrumental background
- Narration: Professional AI voiceover
- Beat-synced transitions
- [Number] unique animated scenes

You can find the video at: [full path]
```

## Advanced Techniques

### Color Harmony

Use extracted colors correctly:
- **Primary**: Main brand color, use for CTA buttons, headings
- **Secondary**: Supporting color, use for gradients, backgrounds
- **Accent**: Highlight color, use for emphasis, glow effects
- **Background**: Base color, use for canvas

Ensure contrast:
- Light theme: Dark text on light background
- Dark theme: Light text on dark background

### Typography Hierarchy

- **Hero Title**: 72-96px, bold, attention-grabbing
- **Section Headings**: 48-64px, semi-bold
- **Body Text**: 24-36px, regular
- **Captions/Labels**: 18-24px, light

### Audio Sync

Match visual emphasis to narration:
- **Narration starts** → Fade in related visual
- **Key word** → Zoom or highlight
- **Pause** → Hold frame or subtle animation
- **Music beat** → Transition or pulse effect

### Performance Tips

- Keep animations frame-based (use `useCurrentFrame()`)
- Avoid heavy computations in render
- Preload images and assets
- Use `Sequence` to organize timeline

## Error Handling

If extraction fails:
1. **Tabstack fails** → Try Brand Identity Extractor
2. **Brand Identity Extractor fails** → Use Playwright screenshot
3. **Screenshot fails** → Ask user for manual input

Never use hardcoded fallbacks like default blue colors. Always try alternatives first.

## Example: Complete Workflow

**User input:**
> "Turn https://fastdeploy.com into a 45-second video"

**Your response:**

1. Call `extract_url_content("https://fastdeploy.com")`
   - Extract: title="FastDeploy", features, logo, colors (blue tech gradient)

2. Write narration script (following story arc)

3. Analyze content:
   - Brand: Tech SaaS, modern, innovative
   - Visual style: Clean, tech-forward, bold typography
   - Tone: Professional but energetic

4. Design scene structure:
   - Scene 1: Dramatic logo reveal with code particles (3s)
   - Scene 2: Split-screen problem/solution comparison (5s)
   - Scene 3: Terminal-style deployment demo (7s)
   - Scene 4: Feature grid with pulse animations (15s)
   - Scene 5: CTA with glowing button (5s)

5. Call `generate_audio({ musicStyle: "hip-hop", narrationScript, duration: 45 })`

6. Write custom Remotion code to `Generated.tsx`:
   - Implement unique scenes with terminal effects
   - Code-themed animations (syntax highlighting, cursor blink)
   - Blue gradient backgrounds with tech aesthetic
   - Beat-synced pulses on key features

7. Register `Generated` composition in `Root.tsx`

8. Call `render_video({ inputProps, outputFileName: "fastdeploy-launch" })`

9. Return result with file path

## Tips for Success

- **Always read extracted content before writing script**
- **Match tone to brand** (formal vs casual)
- **Keep features to 3-5 max** (more is overwhelming)
- **Use beats for impactful moments** (transitions, emphasis)
- **Test timing** (narration should finish ~2s before video ends)
- **Vary animations** (don't repeat the same effect)

## Common Mistakes to Avoid

- ❌ Using template code instead of generating unique designs
- ❌ Copying existing composition code - create new scenes from scratch
- ❌ Generic animations that could work for any brand
- ❌ Using hardcoded content when extraction fails
- ❌ Writing scripts longer than video duration
- ❌ Ignoring beat timecodes (audio won't sync)
- ❌ Using Framer Motion or react-spring (not compatible)
- ❌ Auto-playing CSS animations (causes flicker)
- ❌ Requesting music with vocals/singing
- ❌ Creating videos without story arc (hook, problem, solution, CTA)
- ❌ Forgetting to register Generated composition in Root.tsx

## Remember

You are creating a **high-quality, professional video** that:
- Tells a compelling story
- Matches the brand perfectly
- Uses smooth, creative animations
- Syncs to music beats
- Grabs attention immediately
- Drives action with clear CTA

The user's landing page is their product. Your video is their marketing superpower.
