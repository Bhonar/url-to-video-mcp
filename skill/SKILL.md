---
name: url-to-video
description: Create motion graphics videos from URLs using Remotion with AI-generated audio
---

# URL to Video - Remotion Skill

Create unique promotional videos (30-90s) from landing page URLs. Every video is custom-designed based on the brand's personality, colors, and content. No templates.

**What it produces:** MP4 video with custom animations, AI-generated instrumental music, AI narration, beat-synced transitions, and brand-accurate styling.

**Target file:** `remotion-project/src/compositions/Generated.tsx` (overwritten each run)

---

## 6-Step Workflow

### Step 1: Extract & Analyze

**Call `extract_url_content` with the URL.**

Returns:
- `content` — title, description, features[], domain
- `branding` — logo (url + staticPath), colors (primary/secondary/accent/background), font, theme
- `metadata` — domain, industry

**Then analyze the brand:**

1. **Brand Personality** — based on colors + industry:
   - Vibrant colors + tech = Modern/Bold/Energetic
   - Muted colors + corporate = Professional/Trustworthy
   - Dark + high contrast = Dramatic/Cinematic
   - Bright + playful = Fun/Approachable
   - Minimal/grayscale = Clean/Sophisticated

2. **Animation Tempo** — based on personality:
   - Energetic/Tech = Fast (animations < 1s)
   - Professional/Corporate = Medium (1-2s)
   - Dramatic/Minimal = Slow (2-3s)

3. **Music Style** — based on personality:

   | Personality | Music Style |
   |------------|-------------|
   | Modern/Tech | lo-fi, hip-hop |
   | Professional | jazz, ambient |
   | Dramatic | cinematic |
   | Playful | pop |
   | Minimal | ambient |

---

### Step 2: Write Script & Generate Audio

**Write a narration script** following this arc:
- **Hook** (3-5s) — Attention-grabbing question or statement
- **Problem** (5-10s) — Pain point the product solves
- **Solution** (10-15s) — Introduce the product using content.title and content.description
- **Features** (15-25s) — Highlight 3-5 features from content.features[]
- **CTA** (3-5s) — Call to action with content.domain

Guidelines: conversational tone, ~150 words/min, match brand voice.

**Call `generate_audio`** with:
- `musicStyle` — from analysis above
- `narrationScript` — your script
- `duration` — total video length in seconds

**Save these returned values:**
- `audio.music.staticPath` — for `staticFile()` in Generated.tsx
- `audio.narration.staticPath` — for `staticFile()` in Generated.tsx
- `audio.beats` — beat timecodes for transition sync

---

### Step 3: Design Scenes

Plan 4-6 scenes before writing code:

**Required scenes:**
- **Hook** (3-5s) — Logo reveal, dramatic entrance
- **Solution** (10-15s) — Product introduction
- **CTA** (3-5s) — Call to action with domain

**Optional scenes:**
- **Problem** (5-10s) — Pain point
- **Features** (15-25s) — Key benefits showcase
- **Social Proof** (5-10s) — Stats or testimonials

**For each scene, decide:**
- Duration in seconds and frames (seconds * 30fps)
- Layout (centered, split-screen, grid, full-bleed)
- Animation type (spring for organic, interpolate for precise)
- Transition to next scene (fade, slide, wipe, flip)

**Frame calculation:** `durationInFrames = seconds * fps` (fps = 30)

---

### Creative Direction

Follow these principles to produce bespoke videos, not template output. **Every video must feel unique.**

#### Scene Layout Variety

Never use the same layout for consecutive scenes. Mix from this palette:

| Layout | Best For | How |
|--------|----------|-----|
| **Full-bleed** | Hook, CTA, dramatic moments | Content centered on gradient/image background, large text |
| **Split-screen** | Problem/Solution, before/after | 60/40 or 50/50 vertical divide, content on one side |
| **Asymmetric** | Feature highlights | Large visual (70%) + text sidebar (30%), offset from center |
| **Grid** | Multiple features, comparisons | 2x2 or 3-column cards with icons or numbers |
| **Stacked** | Sequential info, step-by-step | Top-to-bottom reveals with staggered animations |
| **Isolated** | Key stats, testimonials, quotes | Single element centered with generous white space (60%+) |

**Rule: Every video must use at least 3 different layouts across its scenes.**

#### Visual Depth & Layering

Flat designs look like slides. Add depth with 3 layers using `AbsoluteFill` stacking:

- **Background layer**: Gradient, blurred geometric shapes at 5-10% opacity, subtle grid pattern
- **Mid layer**: Content cards, images, text blocks
- **Foreground layer**: Floating accent shapes, thin decorative lines, small dots

Animate layers at different speeds for parallax feel:
```typescript
const bgShift = interpolate(frame, [0, duration], [0, -20], { extrapolateRight: 'clamp' });
const fgShift = interpolate(frame, [0, duration], [0, 20], { extrapolateRight: 'clamp' });
```

#### Color Usage Strategy

Follow the **60-30-10 rule** — never use brand colors at full saturation everywhere:

- **60%** — Background/base: use `branding.colors.background` or a light tint of primary
- **30%** — Secondary areas: cards, dividers, section fills — use `branding.colors.secondary` or primary at 20% opacity
- **10%** — Accent pops: CTAs, highlights, key numbers — use `branding.colors.accent`

**Gradients over flat fills**: Use `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` for scene backgrounds. Never use a single flat color fill.

**Text contrast**: On dark backgrounds use white/light text. On light backgrounds use dark text. Always verify readability.

#### Animation as Personality

Different brands need different motion. Don't use the same spring config for every element.

| Brand Type | Enter Animation | Emphasis | Exit |
|-----------|----------------|----------|------|
| **Tech/Modern** | Slide from bottom, snappy: `{ damping: 12, stiffness: 200 }` | Scale pulse 1.0→1.05 | Fade + slide up |
| **Corporate** | Fade in, smooth: `{ damping: 200 }` | Color shift via `interpolateColors` | Fade out |
| **Creative/Playful** | Bounce in: `{ damping: 8 }`, slight overshoot | Rotate wiggle ±3deg | Scale down |
| **Luxury/Minimal** | Slow fade (2s), slide from center outward | Letter-spacing expand | Slow fade |
| **Startup/Bold** | Fast slide from left: `{ damping: 15, stiffness: 300 }` | Underline draw-on | Wipe out |

**Stagger rule**: When multiple elements enter a scene, stagger by 5-8 frames each. Never animate everything simultaneously:
```typescript
{features.map((feature, i) => {
  const delay = i * 6;
  const y = spring({ frame: frame - delay, fps, from: 40, to: 0, config: { damping: 14 } });
  const opacity = spring({ frame: frame - delay, fps, from: 0, to: 1 });
  return <div key={i} style={{ transform: `translateY(${y}px)`, opacity }}>{feature}</div>;
})}
```

#### Typography Hierarchy

Every scene needs clear visual hierarchy — one dominant, one supporting, one detail level:

- **Dominant**: Largest text (hero title `height * 0.10` to `height * 0.14`), weight 700-800
- **Supporting**: 60% of dominant size, weight 400-500
- **Details**: 40% of dominant size, weight 300-400

**Letter spacing**: Tighten large headings (`letterSpacing: -1`). Open up small text (`letterSpacing: 1`).

**Weight contrast**: Always pair bold headings (700) with regular body (400). Same weight for everything = template look.

#### Industry-Specific Scene Ideas

Use these patterns based on `metadata.industry`:

- **Tech/SaaS**: Floating UI mockup cards, code snippet reveals, animated metric counters, dark-mode gradients
- **E-commerce**: Product spotlight with glow effect, price + discount animation, card grid showcases
- **Finance**: Chart line draw-on animations, trust badges, number counters animating from 0
- **Healthcare**: Soft gradients (pastel), circular/rounded elements, calming pace, icon-driven features
- **Education**: Step-by-step progress bar fills, sequential reveals, book/page metaphors
- **General**: Strong 60-30-10 color usage, typography hierarchy, staggered animations

---

### Step 4: Load Font

Choose a Google Font that matches the brand personality. Load it using `@remotion/google-fonts`:

```typescript
import { loadFont } from '@remotion/google-fonts/Inter'; // or Montserrat, Roboto, etc.
const { fontFamily } = loadFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});
```

Use `fontFamily` in your styles instead of raw `branding.font`. If the brand's font is available as a Google Font, use that. Otherwise pick a suitable match:
- Modern/Tech: Inter, Space Grotesk, DM Sans
- Professional: Roboto, Open Sans, Source Sans 3
- Dramatic: Playfair Display, Oswald
- Playful: Nunito, Poppins, Quicksand
- Minimal: Lato, Raleway, Jost

---

### Step 5: Write Generated.tsx

Write the full composition at `remotion-project/src/compositions/Generated.tsx`.

**You MUST follow ALL Remotion Rules below. Violating any FORBIDDEN rule will produce a broken video.**

**Required file structure:**

```typescript
import React from 'react';
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  staticFile, Img, Sequence, interpolate, spring, Easing,
} from 'remotion';
import { Audio } from '@remotion/media';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
// Add other transitions as needed: wipe, flip, clockWipe
import { loadFont } from '@remotion/google-fonts/YourChosenFont';
import { VideoProps } from '../Root';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const Generated: React.FC<VideoProps> = ({
  content, branding, audio, duration,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
      fontFamily,
    }}>
      {/* Audio */}
      {audio.music?.staticPath && (
        <Audio src={staticFile(audio.music.staticPath)} volume={0.3} />
      )}
      {audio.narration?.staticPath && (
        <Audio src={staticFile(audio.narration.staticPath)} volume={1} />
      )}

      {/* Scenes using TransitionSeries */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={/* scene1 frames */}>
          <HookScene /* props */ />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        {/* ... more scenes and transitions */}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

**Scene component pattern:**

```typescript
const SceneName: React.FC<{
  colors: VideoProps['branding']['colors'];
  width: number;
  height: number;
  // scene-specific props
}> = ({ colors, width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations using frame + spring/interpolate
  const opacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });
  const titleSize = height * 0.12; // Responsive sizing

  return (
    <AbsoluteFill style={{ /* brand colors */ }}>
      {/* Scene content */}
    </AbsoluteFill>
  );
};
```

---

### Step 6: Validate & Render

**Run this checklist (must pass 12/15):**

1. Audio imported from `@remotion/media` (not `remotion`)
2. Audio uses `staticFile()` with `staticPath`
3. Conditional audio rendering (`{audio.music?.staticPath && ...}`)
4. Font loaded via `@remotion/google-fonts`
5. All 4 brand colors used (primary, secondary, accent, background)
6. No hardcoded hex colors (all from `branding.colors`)
7. No CSS animations or Tailwind `animate-*` classes
8. All animations use `useCurrentFrame()` + `spring`/`interpolate`
9. Scene durations calculated from fps (not hardcoded frame numbers)
10. Content from props displayed (title, features, domain)
11. Responsive sizing (font sizes relative to height, spacing relative to width)
12. Transitions between scenes (TransitionSeries or Sequence)
13. Logo displayed using `staticFile(branding.logo.staticPath)` or `branding.logo.url`
14. Color contrast is readable (text visible against backgrounds)
15. CTA scene shows `content.domain`

**Call `render_video`** with:
- `inputProps` — the full props object (content, branding, audio with staticPaths, metadata, duration)
- `outputFileName` — descriptive name like `stripe-promo` or `acme-launch`

Duration is automatically calculated from audio length via `calculateMetadata`.

---

## Remotion Rules

**These rules are mandatory. Violating FORBIDDEN rules produces broken or silent videos.**

### RULE: Animations

**FORBIDDEN:**
- CSS transitions (`transition`, `@keyframes`, `animation` CSS property)
- Tailwind animation classes (`animate-spin`, `animate-bounce`, `animate-pulse`, etc.)
- Framer Motion, react-spring, or any non-Remotion animation library
- `setTimeout`, `setInterval`, `requestAnimationFrame`
- React state for animation values (`useState` + `useEffect` for timing)

**REQUIRED:**
- All motion must use `useCurrentFrame()` with `spring()` or `interpolate()`
- Write timing in seconds, multiply by fps: `2 * fps` = 2 seconds
- Always clamp interpolation: `extrapolateRight: 'clamp'`
- Use `interpolateColors()` for color transitions

**Spring configs by personality:**
```typescript
// Smooth (professional): no bounce
spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } })

// Snappy (modern): minimal bounce
spring({ frame, fps, from: 0, to: 1, config: { damping: 20, stiffness: 200 } })

// Bouncy (playful): visible bounce
spring({ frame, fps, from: 0, to: 1, config: { damping: 8 } })

// Heavy (dramatic): slow settle
spring({ frame, fps, from: 0, to: 1, config: { damping: 15, stiffness: 80, mass: 2 } })
```

**Easing options for `interpolate()`:**
```typescript
import { Easing } from 'remotion';
// Smooth: Easing.inOut(Easing.cubic)
// Bounce landing: Easing.out(Easing.bounce)
// Overshoot: Easing.out(Easing.back(1.5))
```

---

### RULE: Audio

**REQUIRED:**
- Import: `import { Audio } from '@remotion/media';`
- Use `staticFile()` for src: `<Audio src={staticFile(audio.music.staticPath)} />`
- Conditional rendering: `{audio.music?.staticPath && <Audio ... />}`
- Music volume: `0.2` to `0.4` (background level)
- Narration volume: `1.0`

**FORBIDDEN:**
- `import { Audio } from 'remotion'` — this is `Html5Audio`, wrong component
- Raw file paths as src (e.g., `/var/folders/.../music.mp3`)
- Omitting conditional checks on audio paths

**Trimming and timing:**
```typescript
const { fps } = useVideoConfig();
// Trim: skip first 2 seconds, end at 10 seconds
<Audio src={...} trimBefore={2 * fps} trimAfter={10 * fps} />
// Delay: wrap in Sequence
<Sequence from={1 * fps}><Audio src={...} /></Sequence>
// Dynamic volume (fade in):
<Audio src={...} volume={(f) =>
  interpolate(f, [0, 1 * fps], [0, 1], { extrapolateRight: 'clamp' })
} />
```

---

### RULE: Fonts

**REQUIRED:**
- Load fonts with `@remotion/google-fonts` before using them:
```typescript
import { loadFont } from '@remotion/google-fonts/Inter';
const { fontFamily } = loadFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});
// Use fontFamily in style={{ fontFamily }}
```
- Call `loadFont()` at module level (outside component), not inside render

**FORBIDDEN:**
- Setting `fontFamily` in CSS without loading the font first
- Assuming fonts are pre-installed or available via `branding.font` alone

---

### RULE: Images & Assets

**REQUIRED:**
- Use `<Img>` from `remotion` (not `<img>`)
- Use `staticFile()` for local assets in `public/`
- For logo: prefer `staticFile(branding.logo.staticPath)`, fallback to `branding.logo.url`
- Add `objectFit: 'contain'` to prevent stretching
- All local files must be in `remotion-project/public/`

**FORBIDDEN:**
- Native `<img>` elements (won't wait for load, causes blank frames)
- CSS `background-image` for important visuals
- Absolute filesystem paths in src

**Pattern:**
```typescript
import { Img, staticFile } from 'remotion';
// Local asset
<Img src={staticFile('images/logo-stripe.com.png')} style={{ width: 300, objectFit: 'contain' }} />
// Remote URL fallback
<Img src={branding.logo.url} style={{ width: 300, objectFit: 'contain' }} />
```

---

### RULE: Sequencing & Timing

**REQUIRED:**
- Calculate durations from fps: `const sceneDuration = seconds * fps`
- Use `<TransitionSeries>` for scene transitions (recommended)
- Use `<Sequence>` for within-scene timing and delays
- Frame counts across all scenes must equal total composition duration
- Inside a Sequence, `useCurrentFrame()` returns local frame (starts at 0)

**FORBIDDEN:**
- Hardcoded frame numbers without fps calculation
- Overlapping Sequences without TransitionSeries

**Premounting** — load components before they play:
```typescript
<Sequence from={2 * fps} premountFor={30}>
  <HeavyComponent />
</Sequence>
```

---

### RULE: Transitions

**REQUIRED:**
- Import from `@remotion/transitions` and sub-paths
- Wrap scenes in `<TransitionSeries>` with `<TransitionSeries.Transition>` between them

**Available transitions:**
```typescript
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { flip } from '@remotion/transitions/flip';
import { clockWipe } from '@remotion/transitions/clock-wipe';
```

**Timing options:**
```typescript
import { linearTiming, springTiming } from '@remotion/transitions';
// Fixed duration:
timing={linearTiming({ durationInFrames: 15 })} // 0.5s at 30fps
// Physics-based:
timing={springTiming({ config: { damping: 200 } })}
```

**Slide directions:**
```typescript
slide({ direction: 'from-left' })  // or from-right, from-top, from-bottom
```

**Match transition to personality:**
| Personality | Transition |
|------------|------------|
| Modern/Tech | `slide()` |
| Professional | `fade()` |
| Dramatic | `wipe()` or `clockWipe()` |
| Playful | `flip()` |
| Minimal | `fade()` |

**Important:** Transitions overlap adjacent scenes, so total composition length is shorter than sum of all sequence durations.

---

### RULE: Styling

**REQUIRED:**
- Use brand colors from props (`branding.colors.primary`, etc.)
- Responsive font sizing relative to video height:
  - Hero title: `height * 0.10` to `height * 0.14`
  - Section heading: `height * 0.07` to `height * 0.09`
  - Body text: `height * 0.04` to `height * 0.06`
  - Caption: `height * 0.03` to `height * 0.04`
- Responsive spacing relative to dimensions:
  - Padding: `width * 0.05` to `width * 0.08`
  - Gaps: `height * 0.04` to `height * 0.06`
- Use `fitText()` from `@remotion/layout-utils` for variable-length titles
- `AbsoluteFill` as root container for every scene

**FORBIDDEN:**
- Hardcoded hex colors like `#0066FF` (must come from `branding.colors`)
- Fixed pixel font sizes like `fontSize: 72` (must be relative)
- Tailwind `animate-*` classes

**fitText pattern:**
```typescript
import { fitText } from '@remotion/layout-utils';
const { fontSize } = fitText({
  text: content.title,
  withinWidth: width * 0.8,
  fontFamily,
  fontWeight: 'bold',
});
```

---

### RULE: staticFile

**REQUIRED:**
- All local files (audio, images) must be in `remotion-project/public/`
- Reference with `staticFile('audio/music-123.mp3')` — path relative to `public/`
- The MCP tools save files to `public/` automatically and return `staticPath`

**FORBIDDEN:**
- Absolute filesystem paths (e.g., `/var/folders/.../music.mp3`)
- Paths not relative to `public/`

---

### RULE: Text Animations

**Typewriter effect** — use string slicing, never per-character opacity:
```typescript
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
const text = 'Hello World';
const charsToShow = Math.floor(interpolate(frame, [0, 2 * fps], [0, text.length], {
  extrapolateRight: 'clamp',
}));
<div>{text.slice(0, charsToShow)}</div>
```

**Word-by-word reveal:**
```typescript
const words = text.split(' ');
{words.map((word, i) => {
  const delay = i * 5; // 5 frames between words
  const opacity = spring({ frame: frame - delay, fps, from: 0, to: 1 });
  return <span key={i} style={{ opacity, marginRight: 10 }}>{word}</span>;
})}
```

---

## API Quick Reference

### spring()
```typescript
spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } })
// Optional: delay (frames), durationInFrames (stretches animation)
```

### interpolate()
```typescript
interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: Easing.inOut(Easing.cubic),
})
```

### interpolateColors()
```typescript
import { interpolateColors } from 'remotion';
const color = interpolateColors(frame, [0, 2 * fps], [colors.primary, colors.accent]);
```

### TransitionSeries
```typescript
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={150}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Audio
```typescript
import { Audio } from '@remotion/media';
<Audio src={staticFile(audio.music.staticPath)} volume={0.3} />
```

### Img
```typescript
import { Img, staticFile } from 'remotion';
<Img src={staticFile(branding.logo.staticPath)} style={{ width: 300, objectFit: 'contain' }} />
// Or remote fallback:
<Img src={branding.logo.url} style={{ width: 300, objectFit: 'contain' }} />
```

### staticFile
```typescript
import { staticFile } from 'remotion';
staticFile('audio/music-123.mp3') // resolves to file in public/audio/
staticFile('images/logo-stripe.com.png') // resolves to file in public/images/
```

### loadFont
```typescript
import { loadFont } from '@remotion/google-fonts/Inter';
const { fontFamily } = loadFont('normal', { weights: ['400', '700'], subsets: ['latin'] });
```

### fitText
```typescript
import { fitText } from '@remotion/layout-utils';
const { fontSize } = fitText({ text, withinWidth: width * 0.8, fontFamily, fontWeight: 'bold' });
```

### Sequence
```typescript
<Sequence from={3 * fps} durationInFrames={5 * fps}>
  <MyComponent />
</Sequence>
```

### useVideoConfig
```typescript
const { fps, width, height, durationInFrames } = useVideoConfig();
```
