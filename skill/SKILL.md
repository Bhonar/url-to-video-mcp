---
name: url-to-video
description: Create motion graphics videos from URLs using Remotion with AI-generated audio
---

# URL to Video - Remotion Skill

Turn any landing page URL into a high-quality promotional video with AI-generated music and narration.

## Table of Contents

**Getting Started:**
- [Quick Start](#quick-start) - 5-step process and minimal example
- [Complete Workflow](#complete-workflow) - Detailed guide with full code

**Core Features** (use these in every video):
- [Animations](#core-animations) - useCurrentFrame, interpolate, spring
- [Sequencing](#core-sequencing) - Sequence, Series, timing
- [Transitions](#core-transitions) - Professional scene transitions
- [Audio](#core-audio) - Background music and narration
- [Responsive Sizing](#core-responsive-sizing) - fitText, dynamic dimensions

**Advanced Features** (use when needed):
- [When you need audio visualization](#audio-visualization)
- [When you need text effects](#text-animations)
- [When you need charts](#charts-and-data-visualization)
- [When you need maps](#maps-mapbox)
- [When you need captions](#captions-and-subtitles)
- [When you need 3D graphics](#3d-graphics)
- [When you need visual effects](#visual-effects)

**API Reference:**
- [Full API Documentation](#api-reference)

---

## Quick Start

### The 5-Step Process

Every URL-to-video workflow follows these steps:

```
1. Extract → 2. Script → 3. Audio → 4. Code → 5. Render
```

### Minimal Example

```tsx
// Step 1: Extract content from URL
const extracted = await extract_url_content({ url: "https://example.com" });

// Step 2: Write narration script
const script = `
Are you tired of [problem]?
[Product] solves this by [solution].
With [features], you can [benefits].
Try [product] today at [domain].
`;

// Step 3: Generate audio
const audio = await generate_audio({
  musicStyle: "lo-fi",
  narrationScript: script,
  duration: 30,
});

// Step 4: Write Remotion code to Generated.tsx
// (See Complete Workflow for full example)

// Step 5: Render video
const result = await render_video({
  inputProps: { content: extracted.content, branding: extracted.branding, audio, duration: 30 },
  outputFileName: "my-video",
});
```

### Common Mistakes to Avoid

❌ **Using CSS animations instead of useCurrentFrame()**
```tsx
// WRONG - will cause flickering
<div className="animate-fade-in">Text</div>

// RIGHT - frame-based animation
const opacity = spring({ frame, fps, from: 0, to: 1 });
<div style={{ opacity }}>Text</div>
```

❌ **Hardcoding frame numbers**
```tsx
// WRONG - not responsive to fps changes
const opacity = interpolate(frame, [0, 90], [0, 1]);

// RIGHT - use fps multiplier
const { fps } = useVideoConfig();
const opacity = interpolate(frame, [0, 3 * fps], [0, 1]);
```

❌ **Not using TransitionSeries for scene changes**
```tsx
// WRONG - abrupt cuts
<Sequence from={0} durationInFrames={60}><SceneA /></Sequence>
<Sequence from={60} durationInFrames={60}><SceneB /></Sequence>

// RIGHT - smooth transitions
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}><SceneA /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
  <TransitionSeries.Sequence durationInFrames={60}><SceneB /></TransitionSeries.Sequence>
</TransitionSeries>
```

---

## Complete Workflow

### Step 1: Extract Content from URL

**Call the MCP tool:**
```typescript
const extracted = await extract_url_content({ url: "https://tabstack.ai" });
```

**Returns:**
```typescript
{
  content: {
    title: "TabStack",
    description: "Web scraping API",
    features: ["Extract text", "Get screenshots", "Scale requests"],
    heroImage: "https://...",
    sections: [...]
  },
  branding: {
    logo: { url: "https://..." },
    colors: {
      primary: "#0066FF",
      secondary: "#003D99",
      accent: "#66B3FF",
      background: "#FFFFFF"
    },
    font: "Inter",
    theme: "light"
  },
  metadata: {
    domain: "tabstack.ai",
    industry: "SaaS"
  }
}
```

**What it does:**
1. Uses Tabstack API to extract page content
2. Uses Brand Identity Extractor for logo + color palette
3. Falls back to Playwright screenshot → Claude Vision if needed
4. Infers industry from content

### Step 2: Write Narration Script

Follow this **story arc** structure:

**1. Hook (3-5 seconds)** - Grab attention
```
"Tired of slow deployments?"
```

**2. Problem (5-10 seconds)** - Describe pain point
```
"Most teams wait hours for CI/CD pipelines to complete."
```

**3. Solution (10-15 seconds)** - Introduce product
```
"FastDeploy cuts deployment time from hours to minutes with AI-powered optimization."
```

**4. Features (15-25 seconds)** - Highlight 3-5 key benefits
```
"One-click rollbacks keep you safe. Real-time monitoring shows exactly what's happening. Auto-scaling handles traffic spikes automatically."
```

**5. Call to Action (3-5 seconds)** - Drive action
```
"Start deploying faster today. Visit FastDeploy.com"
```

**Script Writing Guidelines:**
- **Tone**: Conversational, not robotic
- **Pacing**: ~150 words/minute
- **Length**: Match to video duration
- **Voice**: Match brand personality
- **Avoid**: Jargon, filler words, repetition

**Example script:**
```typescript
const narrationScript = `
Struggling to extract data from websites?

Most developers waste hours dealing with complex web scraping, APIs that break, and pages that won't load.

TabStack changes everything. With one simple API call, get any website's content instantly—no headless browsers, no maintenance, no hassle.

Extract text, images, and structured data from any page. Get screenshots and PDFs automatically. And scale to millions of requests without breaking a sweat.

Trusted by thousands of developers who've ditched the old way of web scraping.

Ready to simplify your workflow? Try TabStack today.
`;
```

### Step 3: Generate Audio

**Call the MCP tool:**
```typescript
const audio = await generate_audio({
  musicStyle: "lo-fi",  // pop, hip-hop, rap, jazz, lo-fi, ambient, cinematic, rock
  narrationScript: narrationScript,
  duration: 30
});
```

**Music style selection logic:**
- Bold style → hip-hop, rock, rap
- Modern style → lo-fi, ambient, pop
- Corporate → jazz, ambient
- Cinematic → cinematic (orchestral)
- Minimal → ambient, lo-fi
- Creative → pop, jazz

**CRITICAL**: All music is **instrumental only** (NO singing, NO vocals!)

**Returns:**
```typescript
{
  music: { url: "https://...", localPath: "/path/to/music.mp3", duration: 30 },
  narration: { url: "https://...", localPath: "/path/to/narration.mp3", timecodes: [...] },
  beats: [1.2, 2.4, 3.6, ...] // Beat timecodes in seconds
}
```

### Step 4: Write Custom Remotion Code

**CRITICAL**: Write unique code for each video. Do NOT use templates.

**Analyze the content first:**
1. What is the tone/personality of this brand? (playful, professional, edgy, etc.)
2. What visual style matches the content? (minimal, bold, cinematic, etc.)
3. How many scenes are needed to tell the story? (typically 4-6 scenes)
4. What animations would be most impactful?
5. What layout works best? (centered, split-screen, layered, etc.)

**Example analysis:**
```
Brand: TabStack (Tech SaaS)
Tone: Modern, professional, innovative
Colors: Blue gradient (#0066FF → #003D99)
Visual Style: Clean, minimal, tech-forward
Scenes: 5 (Hook → Problem → Solution → Features → CTA)
Key Animations: Smooth fades, terminal-style text, pulsing CTAs
Layout: Centered with generous spacing
```

**Write code to `/Users/bella/Cooking/remotion/url-to-video-mcp/remotion-project/src/compositions/Generated.tsx`:**

```tsx
import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Audio } from '@remotion/media';
import { fitText } from '@remotion/layout-utils';
import { VideoProps } from '../Root';

export const Generated: React.FC<VideoProps> = ({
  content,
  branding,
  audio,
  metadata,
  duration,
}) => {
  const { fps, width, height } = useVideoConfig();

  // Scene durations in frames (customize based on content)
  const hookDuration = 3 * fps;
  const problemDuration = 5 * fps;
  const solutionDuration = 7 * fps;
  const featuresDuration = 10 * fps;
  const ctaDuration = 5 * fps;
  const transitionDuration = 0.5 * fps;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${branding.colors.background || '#000000'}, ${branding.colors.primary})`,
        fontFamily: branding.font || 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Audio */}
      {audio.music?.localPath && <Audio src={audio.music.localPath} />}
      {audio.narration?.localPath && <Audio src={audio.narration.localPath} />}

      <TransitionSeries>
        {/* Scene 1: Hook - Logo reveal */}
        <TransitionSeries.Sequence durationInFrames={hookDuration}>
          <HookScene
            title={content.title}
            logo={branding.logo.url}
            colors={branding.colors}
            width={width}
            height={height}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Problem - Show pain point */}
        <TransitionSeries.Sequence durationInFrames={problemDuration}>
          <ProblemScene
            colors={branding.colors}
            width={width}
            height={height}
            description={content.description}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Solution - Introduce product */}
        <TransitionSeries.Sequence durationInFrames={solutionDuration}>
          <SolutionScene
            title={content.title}
            description={content.description}
            colors={branding.colors}
            width={width}
            height={height}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: Features - Highlight benefits */}
        <TransitionSeries.Sequence durationInFrames={featuresDuration}>
          <FeaturesScene
            features={content.features}
            colors={branding.colors}
            width={width}
            height={height}
            title={content.title}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: CTA - Drive action */}
        <TransitionSeries.Sequence durationInFrames={ctaDuration}>
          <CTAScene
            colors={branding.colors}
            width={width}
            height={height}
            title={content.title}
            domain={content.domain}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Scene 1: Hook - Logo reveal with particles
const HookScene: React.FC<{
  title: string;
  logo: string;
  colors: any;
  width: number;
  height: number;
}> = ({ title, logo, colors, width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Responsive sizing
  const logoSize = Math.min(width, height) * 0.35;
  const titleMaxWidth = width * 0.8;

  // Fit title to container
  const { fontSize: titleFontSize } = fitText({
    text: title,
    withinWidth: titleMaxWidth,
    fontFamily: 'system-ui',
    fontWeight: 'bold',
  });

  // Smooth animations
  const opacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });
  const scale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 200 } });
  const glowIntensity = interpolate(frame, [0, 1.5 * fps, 3 * fps], [0, 1, 0.7], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Pulsing glow effect */}
      <div
        style={{
          position: 'absolute',
          width: `${width * 0.6}px`,
          height: `${height * 0.6}px`,
          background: `radial-gradient(circle, ${colors.accent || colors.primary}44 0%, transparent 70%)`,
          opacity: glowIntensity,
        }}
      />

      {/* Logo */}
      {logo && (
        <div style={{ position: 'relative', transform: `scale(${scale})` }}>
          <Img
            src={logo}
            style={{
              width: logoSize,
              height: logoSize,
              objectFit: 'contain',
              filter: `drop-shadow(0 ${height * 0.02}px ${height * 0.04}px rgba(255,255,255,0.2))`,
            }}
          />
        </div>
      )}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          bottom: `${height * 0.15}px`,
          fontSize: Math.min(titleFontSize * 0.8, height * 0.12),
          fontWeight: 'bold',
          color: colors.accent || '#ffffff',
          textShadow: `0 ${height * 0.004}px ${height * 0.02}px rgba(0,0,0,0.8)`,
          transform: `scale(${scale})`,
          letterSpacing: `${width * 0.001}px`,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Problem - Show pain point
const ProblemScene: React.FC<{
  colors: any;
  width: number;
  height: number;
  description: string;
}> = ({ colors, width, height, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxWidth = width * 0.85;

  // Fit text dynamically
  const { fontSize: mainFontSize } = fitText({
    text: description,
    withinWidth: maxWidth,
    fontFamily: 'system-ui',
    fontWeight: '700',
  });

  const slideIn = spring({ frame, fps, from: 100, to: 0, config: { damping: 200 } });
  const textOpacity = spring({
    frame: frame - 0.5 * fps,
    fps,
    from: 0,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${height * 0.1}px ${width * 0.05}px`,
      }}
    >
      {/* Main text */}
      <div
        style={{
          fontSize: Math.min(mainFontSize * 0.7, height * 0.09),
          fontWeight: 700,
          color: colors.accent || '#ffffff',
          textAlign: 'center',
          maxWidth: maxWidth,
          lineHeight: 1.3,
          transform: `translateY(${slideIn}px)`,
          opacity: textOpacity,
        }}
      >
        {description}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Solution - Introduce product
const SolutionScene: React.FC<{
  title: string;
  description: string;
  colors: any;
  width: number;
  height: number;
}> = ({ title, description, colors, width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxWidth = width * 0.9;

  // Fit title dynamically
  const { fontSize: titleFontSize } = fitText({
    text: title,
    withinWidth: maxWidth,
    fontFamily: 'system-ui',
    fontWeight: '900',
  });

  const zoom = spring({ frame, fps, from: 1.3, to: 1, config: { damping: 200 } });
  const opacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });
  const lineWidth = interpolate(frame, [1.3 * fps, 3.3 * fps], [0, width * 0.4], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${height * 0.1}px ${width * 0.05}px`,
        opacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: Math.min(titleFontSize * 0.8, height * 0.14),
          fontWeight: 900,
          color: colors.accent || '#ffffff',
          marginBottom: `${height * 0.05}px`,
          textShadow: `0 ${height * 0.004}px ${height * 0.024}px rgba(0,0,0,0.6)`,
          transform: `scale(${zoom})`,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: height * 0.055,
          color: colors.secondary || '#cccccc',
          textAlign: 'center',
          maxWidth: width * 0.8,
          lineHeight: 1.4,
          marginBottom: `${height * 0.04}px`,
        }}
      >
        {description}
      </div>

      {/* Animated underline */}
      <div
        style={{
          width: lineWidth,
          height: height * 0.008,
          background: `linear-gradient(90deg, ${colors.accent || '#ffffff'}, transparent)`,
          borderRadius: height * 0.004,
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 4: Features - Staggered reveal
const FeaturesScene: React.FC<{
  features: string[];
  colors: any;
  width: number;
  height: number;
  title: string;
}> = ({ features, colors, width, height, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: `${height * 0.1}px ${width * 0.1}px`,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: height * 0.09,
          fontWeight: 'bold',
          color: colors.accent || '#ffffff',
          marginBottom: `${height * 0.1}px`,
          opacity: titleOpacity,
        }}
      >
        {title}
      </div>

      {/* Features list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${height * 0.06}px`,
        }}
      >
        {features.slice(0, 5).map((feature, i) => {
          const delay = i * 1.3 * fps;
          const featureOpacity = spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 1,
            config: { damping: 200 },
          });
          const slideIn = spring({
            frame: frame - delay,
            fps,
            from: -width * 0.3,
            to: 0,
            config: { damping: 200 },
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${width * 0.02}px`,
                opacity: featureOpacity,
                transform: `translateX(${slideIn}px)`,
              }}
            >
              {/* Bullet */}
              <div
                style={{
                  fontSize: height * 0.05,
                  width: width * 0.03,
                  color: colors.accent || '#ffffff',
                }}
              >
                •
              </div>

              {/* Text */}
              <div
                style={{
                  fontSize: height * 0.06,
                  color: colors.secondary || '#dddddd',
                  fontWeight: 500,
                }}
              >
                {feature}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: CTA - Pulsing call to action
const CTAScene: React.FC<{
  colors: any;
  width: number;
  height: number;
  title: string;
  domain: string;
}> = ({ colors, width, height, title, domain }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = 1 + Math.sin(frame / (fps * 0.5)) * 0.08;
  const opacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });
  const buttonScale = spring({
    frame: frame - 1 * fps,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Button */}
      <div
        style={{
          padding: `${height * 0.04}px ${width * 0.05}px`,
          background: `linear-gradient(135deg, ${colors.accent || '#ffffff'}, ${colors.secondary || '#cccccc'})`,
          borderRadius: height * 0.02,
          fontSize: height * 0.08,
          fontWeight: 'bold',
          color: colors.background || '#000000',
          transform: `scale(${pulse * buttonScale})`,
          boxShadow: `0 ${height * 0.03}px ${height * 0.08}px ${colors.accent || '#ffffff'}44`,
        }}
      >
        {title}
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: `${height * 0.05}px`,
          fontSize: height * 0.05,
          color: colors.secondary || '#999999',
          letterSpacing: `${width * 0.0005}px`,
        }}
      >
        {domain}
      </div>
    </AbsoluteFill>
  );
};
```

**Important:**
- Export the main component as `Generated`
- Use `VideoProps` interface from `../Root`
- Make animations and layout unique to this content
- Use extracted branding colors and fonts
- Base all sizing on `width` and `height` from `useVideoConfig()`

### Step 5: Render Video

**Call the MCP tool:**
```typescript
const result = await render_video({
  inputProps: {
    content: {
      ...extracted.content,
      domain: extracted.metadata.domain, // Display-friendly domain for CTA
    },
    branding: extracted.branding,
    audio,
    metadata: extracted.metadata,
    duration: 30,
  },
  outputFileName: "tabstack-promo",
});
```

**Returns:**
```typescript
{
  videoPath: "~/Videos/url-to-video/tabstack-promo.mp4",
  duration: 30,
  fileSize: 12582912 // bytes
}
```

**Response to user:**
```
✨ Video rendered successfully!

📹 File: ~/Videos/url-to-video/tabstack-promo.mp4
⏱️  Duration: 30 seconds
📦 Size: 12.5 MB

The video features:
  • Custom-designed scenes for TabStack
  • Lo-fi instrumental background music
  • Professional AI voiceover narration
  • Beat-synced transitions
  • 5 unique animated scenes
```

---

## Core Features

Use these features in **every video** you create.

### Core: Animations

**Always use `useCurrentFrame()` for animations. NEVER use CSS animations.**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Linear interpolation
const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: 'clamp', // Always add this!
});

// Spring animation (physics-based, organic motion)
const scale = spring({
  frame,
  fps,
  from: 0,
  to: 1,
  config: { damping: 200 }, // Smooth, no bounce
});
```

**Why not CSS animations?**
- CSS animations cause flickering in rendered videos
- Not synchronized with Remotion's timeline
- Cannot be controlled frame-by-frame

**Common spring configs:**
- `{ damping: 200 }` - Smooth, no bounce (DEFAULT for professional videos)
- `{ damping: 20, stiffness: 200 }` - Snappy, minimal bounce
- `{ damping: 8 }` - Bouncy entrance

**Easing functions** (for interpolate):

```tsx
import { interpolate, Easing } from 'remotion';

// Apply easing to interpolation
const value = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

**Built-in easings:**

```tsx
// Quadratic
Easing.in(Easing.quad)     // Slow start
Easing.out(Easing.quad)    // Slow end
Easing.inOut(Easing.quad)  // Slow start and end

// Cubic (more pronounced)
Easing.in(Easing.cubic)
Easing.out(Easing.cubic)
Easing.inOut(Easing.cubic)

// Sine (gentle curves)
Easing.in(Easing.sin)
Easing.out(Easing.sin)
Easing.inOut(Easing.sin)

// Exponential (very dramatic)
Easing.in(Easing.exp)
Easing.out(Easing.exp)
Easing.inOut(Easing.exp)

// Circular
Easing.in(Easing.circle)
Easing.out(Easing.circle)
Easing.inOut(Easing.circle)

// Back (overshoots then settles)
Easing.in(Easing.back(1.5))
Easing.out(Easing.back(1.5))
Easing.inOut(Easing.back(1.5))

// Elastic (bouncy)
Easing.in(Easing.elastic(1))
Easing.out(Easing.elastic(1))
Easing.inOut(Easing.elastic(1))

// Bounce
Easing.in(Easing.bounce)
Easing.out(Easing.bounce)
Easing.inOut(Easing.bounce)

// Linear (no easing)
Easing.linear

// Custom bezier
Easing.bezier(0.42, 0, 0.58, 1) // CSS cubic-bezier equivalent
```

**When to use:**
- **Spring** - Organic, natural motion (DEFAULT choice)
- **Easing.out(Easing.quad)** - Smooth deceleration (UI elements entering)
- **Easing.inOut(Easing.cubic)** - Smooth acceleration and deceleration
- **Easing.out(Easing.back())** - Overshoot effect (playful animations)
- **Easing.out(Easing.bounce)** - Bouncy landing
- **Easing.linear** - Constant speed (loading indicators, progress bars)

### Core: Sequencing

**Use `<Sequence>` to delay when elements appear.**

```tsx
import { Sequence, useVideoConfig } from "remotion";

const { fps } = useVideoConfig();

// Scene appears at 1 second, lasts 2 seconds
<Sequence from={1 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Title />
</Sequence>
```

**ALWAYS add `premountFor={1 * fps}`** to preload content before playback.

**Why premountFor is important:**

Without `premountFor`, components mount exactly when they appear on screen. This causes:
- **Asset loading delays** - Images/videos not loaded in time
- **Layout shifts** - Component sizes calculated too late
- **Janky playback** - Stuttering when sequences start

With `premountFor={1 * fps}`:
- Component mounts **1 second early** (before visible)
- Assets preload in the background
- Layout calculated ahead of time
- Smooth playback guaranteed

```tsx
// BAD - component mounts at frame 60, may cause stutter
<Sequence from={60}>
  <HeavyComponent />
</Sequence>

// GOOD - component mounts at frame 30 (1s early at 30fps)
<Sequence from={60} premountFor={30}>
  <HeavyComponent />
</Sequence>

// BEST - use fps for automatic adjustment
const { fps } = useVideoConfig();
<Sequence from={60} premountFor={1 * fps}>
  <HeavyComponent />
</Sequence>
```

**Rule of thumb:** Longer `premountFor` for heavier content (images, videos, complex layouts)

---

**For sequential scenes (no overlap), use `<Series>`:**

### Series Component (Full API)

Automatically sequences children one after another with no overlap.

```tsx
import { Series } from 'remotion';

<Series>
  <Series.Sequence durationInFrames={45}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <MainContent />
  </Series.Sequence>
  <Series.Sequence durationInFrames={30}>
    <Outro />
  </Series.Sequence>
</Series>
```

**How it works:**
- First sequence starts at frame 0, lasts 45 frames
- Second sequence starts at frame 45, lasts 60 frames
- Third sequence starts at frame 105, lasts 30 frames
- Total duration: 135 frames

**Props:**

```typescript
<Series>
  <Series.Sequence durationInFrames={number}>
    {children}
  </Series.Sequence>
</Series>
```

**Series.Sequence props:**
- `durationInFrames` (required) - How long this sequence lasts
- `layout` - `"absolute-fill"` (default) or `"none"`
- `style` - CSS styles for the sequence container
- `name` - Name for debugging in Remotion Studio
- `premountFor` - Frames to premount (same as regular Sequence)

**Compared to regular Sequence:**

```tsx
// Using Series - durations calculated automatically
<Series>
  <Series.Sequence durationInFrames={30}><A /></Series.Sequence>
  <Series.Sequence durationInFrames={60}><B /></Series.Sequence>
  <Series.Sequence durationInFrames={45}><C /></Series.Sequence>
</Series>

// Using Sequence - must calculate timing manually
<>
  <Sequence from={0} durationInFrames={30}><A /></Sequence>
  <Sequence from={30} durationInFrames={60}><B /></Sequence>
  <Sequence from={90} durationInFrames={45}><C /></Sequence>
</>
```

**Benefits of Series:**
- ✅ No manual timing calculations
- ✅ Easy to reorder sequences
- ✅ Easy to change durations without breaking layout
- ✅ Less error-prone

**When to use Series vs Sequence:**
- Use **Series** when scenes play one after another (no overlap)
- Use **Sequence** when you need precise control over timing or overlaps

### Core: Transitions

**Use `<TransitionSeries>` for professional scene transitions.**

```bash
npx remotion add @remotion/transitions
```

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />

  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

**Available transitions:**
- `fade()` - Crossfade
- `slide({ direction: "from-left" })` - Slide in from direction
- `wipe()` - Wipe effect
- `flip()` - 3D flip
- `clockWipe()` - Clock wipe

**Slide directions:**
- `"from-left"`, `"from-right"`, `"from-top"`, `"from-bottom"`

### Core: Audio

**Always import Audio from `@remotion/media`, not `remotion`.**

```bash
npx remotion add @remotion/media
```

```tsx
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";

<Audio src={staticFile("audio.mp3")} />
```

**Volume control:**
```tsx
// Static volume
<Audio src={staticFile("audio.mp3")} volume={0.5} />

// Dynamic volume (fade in)
<Audio
  src={staticFile("audio.mp3")}
  volume={(f) => interpolate(f, [0, 1 * fps], [0, 1], { extrapolateRight: "clamp" })}
/>
```

**Trimming:**
```tsx
<Audio
  src={staticFile("audio.mp3")}
  trimBefore={2 * fps} // Skip first 2 seconds
  trimAfter={10 * fps} // End at 10 second mark
/>
```

### Core: Responsive Sizing

**Use `fitText()` to automatically size text to fit containers.**

```bash
npx remotion add @remotion/layout-utils
```

```tsx
import { fitText } from "@remotion/layout-utils";
import { useVideoConfig } from "remotion";

const { width } = useVideoConfig();

const { fontSize } = fitText({
  text: "Hello World",
  withinWidth: width * 0.8, // 80% of video width
  fontFamily: "Inter",
  fontWeight: "bold",
});

<div style={{ fontSize, fontFamily: "Inter", fontWeight: "bold" }}>
  Hello World
</div>
```

**Base all sizes on video dimensions:**

```tsx
const { width, height } = useVideoConfig();

// Good - responsive sizing
const logoSize = Math.min(width, height) * 0.35;
const padding = width * 0.05;
const titleSize = height * 0.12;

// Bad - hardcoded values
const logoSize = 300;
const padding = 50;
const titleSize = 72;
```

---

## Advanced Features

Use these features **when needed** for specific effects or content types.

### Audio Visualization

**When you need:** Spectrum bars, waveforms, bass-reactive effects

```bash
npx remotion add @remotion/media-utils
```

**Spectrum bar visualization:**

```tsx
import { useWindowedAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const { audioData, dataOffsetInSeconds } = useWindowedAudioData({
  src: staticFile("music.mp3"),
  frame,
  fps,
  windowInSeconds: 30,
});

if (!audioData) return null;

const frequencies = visualizeAudio({
  fps,
  frame,
  audioData,
  numberOfSamples: 256,
  optimizeFor: "speed",
  dataOffsetInSeconds,
});

return (
  <div style={{ display: "flex", alignItems: "flex-end", height: 200 }}>
    {frequencies.map((v, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          height: `${v * 100}%`,
          backgroundColor: "#0b84f3",
          margin: "0 1px",
        }}
      />
    ))}
  </div>
);
```

**Bass-reactive effects (scale elements with bass):**

```tsx
const frequencies = visualizeAudio({
  fps,
  frame,
  audioData,
  numberOfSamples: 128,
  optimizeFor: "speed",
  dataOffsetInSeconds,
});

const lowFrequencies = frequencies.slice(0, 32);
const bassIntensity =
  lowFrequencies.reduce((sum, v) => sum + v, 0) / lowFrequencies.length;

const scale = 1 + bassIntensity * 0.5; // Scales from 1 to 1.5 based on bass

<div style={{ transform: `scale(${scale})` }}>Logo</div>
```

### Text Animations

**When you need:** Typewriter effects, animated text reveals

**Typewriter effect:**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charsToShow = Math.floor(
    interpolate(frame, [0, 2 * fps], [0, text.length], {
      extrapolateRight: "clamp",
    })
  );

  return <div>{text.slice(0, charsToShow)}</div>;
};
```

**NEVER use per-character opacity** - it's inefficient. Use string slicing instead.

### Charts and Data Visualization

**When you need:** Bar charts, line charts, pie charts, data animations

**Animated bar chart:**

```tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const bars = data.map((item, i) => {
  const height = spring({
    frame,
    fps,
    delay: i * STAGGER_DELAY,
    config: { damping: 200 },
  });

  return (
    <div
      key={i}
      style={{
        height: height * item.value,
        background: '#0b84f3',
        width: 50,
      }}
    />
  );
});
```

**Animated line chart (SVG path):**

```bash
npx remotion add @remotion/paths
```

```tsx
import { evolvePath } from "@remotion/paths";

const path = "M 100 200 L 200 150 L 300 180 L 400 100";
const progress = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

const { strokeDasharray, strokeDashoffset } = evolvePath(progress, path);

<svg>
  <path
    d={path}
    fill="none"
    stroke="#FF3232"
    strokeWidth={4}
    strokeDasharray={strokeDasharray}
    strokeDashoffset={strokeDashoffset}
  />
</svg>
```

### Maps (Mapbox)

**When you need:** Location-based videos, geographic visualizations

```bash
npm i mapbox-gl @turf/turf @types/mapbox-gl
```

**Setup:**
1. Create access token at https://console.mapbox.com/account/access-tokens/
2. Add to `.env`: `REMOTION_MAPBOX_TOKEN=pk.your-token`

**Basic usage:**

```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { AbsoluteFill, useDelayRender, useVideoConfig } from 'remotion';
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken = process.env.REMOTION_MAPBOX_TOKEN as string;

export const MyComposition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { delayRender, continueRender } = useDelayRender();
  const { width, height } = useVideoConfig();
  const [handle] = useState(() => delayRender('Loading map...'));
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const _map = new Map({
      container: ref.current!,
      zoom: 11.53,
      center: [6.5615, 46.0598],
      style: 'mapbox://styles/mapbox/standard',
      interactive: false,
      fadeDuration: 0, // CRITICAL - disable animations
    });

    _map.on('load', () => {
      continueRender(handle);
      setMap(_map);
    });
  }, [handle]);

  const style: React.CSSProperties = useMemo(
    () => ({ width, height, position: 'absolute' }),
    [width, height]
  );

  return <AbsoluteFill ref={ref} style={style} />;
};
```

**Important:**
- Set `fadeDuration: 0` and `interactive: false` (disable Mapbox animations)
- Element MUST have explicit width/height and `position: "absolute"`
- Do NOT add `_map.remove()` cleanup

### Captions and Subtitles

**When you need:** Subtitles, closed captions, TikTok-style captions

```bash
npx remotion add @remotion/captions
```

**TikTok-style captions:**

```tsx
import { useState, useEffect } from "react";
import { staticFile, useDelayRender } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const MyComponent: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fetch(staticFile("captions.json"))
      .then((res) => res.json())
      .then((data) => {
        setCaptions(data);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle, continueRender, cancelRender]);

  if (!captions) return null;

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
  });

  return <div>{/* Render pages */}</div>;
};
```

**Import SRT files:**

```tsx
import { parseSrt } from "@remotion/captions";

const response = await fetch(staticFile("subtitles.srt"));
const text = await response.text();
const { captions: parsed } = parseSrt({ input: text });
```

**Transcribe audio with Whisper.cpp:**

```bash
npx remotion add @remotion/install-whisper-cpp
```

```ts
import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
  toCaptions,
} from "@remotion/install-whisper-cpp";

const to = path.join(process.cwd(), "whisper.cpp");

await installWhisperCpp({ to, version: "1.5.5" });
await downloadWhisperModel({ model: "medium.en", folder: to });

const whisperCppOutput = await transcribe({
  model: "medium.en",
  whisperPath: to,
  inputPath: "/path/to/audio.wav",
  tokenLevelTimestamps: true,
});

const { captions } = toCaptions({ whisperCppOutput });
fs.writeFileSync("captions.json", JSON.stringify(captions, null, 2));
```

### 3D Graphics

**When you need:** 3D models, 3D animations, rotating objects

```bash
npx remotion add @remotion/three
npm i three @react-three/fiber @react-three/drei
```

**Basic 3D scene:**

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame } from "remotion";

const MyComponent = () => {
  const frame = useCurrentFrame();

  return (
    <ThreeCanvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh rotation={[0, frame * 0.01, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </ThreeCanvas>
  );
};
```

**Load 3D models (GLTF/GLB):**

```tsx
import { useGLTF } from "@react-three/drei";
import { staticFile } from "remotion";

const Model = () => {
  const { scene } = useGLTF(staticFile("model.glb"));
  return <primitive object={scene} />;
};
```

### Visual Effects

**Light leaks (cinematic overlay effects):**

```bash
npx remotion add @remotion/light-leaks
```

```tsx
import { TransitionSeries } from "@remotion/transitions";
import { LightLeak } from "@remotion/light-leaks";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>

  <TransitionSeries.Overlay durationInFrames={30}>
    <LightLeak seed={5} hueShift={240} /> {/* Blue-tinted */}
  </TransitionSeries.Overlay>

  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

**Noise and texture effects:**

```bash
npx remotion add @remotion/noise
```

```tsx
import { noise2D, noise3D } from "@remotion/noise";

const MyComponent = () => {
  const frame = useCurrentFrame();

  // 2D noise: returns value between -1 and 1
  const noiseValue = noise2D("seed", frame * 0.01, 0);

  return (
    <div style={{ opacity: (noiseValue + 1) / 2 }}>
      Animated texture
    </div>
  );
};
```

**GIFs and animated images:**

```tsx
import { AnimatedImage, staticFile } from "remotion";

<AnimatedImage
  src={staticFile("animation.gif")}
  width={500}
  height={500}
  playbackRate={2} // 2x speed
  loopBehavior="loop"
/>
```

---

## API Reference

Complete API documentation for all Remotion features.

### staticFile()

Reference files in the `public/` folder.

```tsx
import { Img, staticFile } from "remotion";

const myImage = staticFile("/my-image.png");
<Img src={myImage} />
```

**Setup:**
- Create a `public/` folder at project root (same directory as `package.json`)
- Store assets like images, fonts, and audio files in this folder

**Returns:** Encoded URL reference: `/static-32e8nd/my-image.png`

**Compatible with:** `<Img>`, `<Audio>`, `<Video>`, `fetch()`, `FontFace()`, any URL-based loader

**Note:** Since v4.0, automatically encodes special characters (`#`, `?`, `&`). Do not manually encode filenames.

### random()

Deterministic pseudorandom values for consistent rendering.

```tsx
import { random } from "remotion";

const rand = random(1); // Always returns 0.07301638228818774
const rand2 = random("my-seed"); // Consistent output for same seed

// Example: Random coordinates
const randomCoordinates = new Array(10).fill(true).map((a, i) => ({
  x: random(`random-x-${i}`),
  y: random(`random-y-${i}`),
}));
```

**Why use this?** `Math.random()` produces inconsistent values during multi-threaded rendering.

**For true randomness:**
```tsx
random(null) === random(null); // false - generates different values
```

### useCurrentFrame()

Returns the current frame number of the video. **This is the fundamental hook for all animations in Remotion.**

```tsx
import { useCurrentFrame } from "remotion";

const MyComponent = () => {
  const frame = useCurrentFrame();

  return <div>Current frame: {frame}</div>;
};
```

**Returns:** `number` - The current frame (0-indexed, starts at 0)

**Important:**
- Inside a `<Sequence>`, returns the **local frame** (relative to the sequence start)
- Inside a `<Loop>`, resets to 0 for each iteration
- Inside a `<Freeze>`, returns the frozen frame number

**Example - Animations:**
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Fade in over 2 seconds
const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: 'clamp',
});

// Rotate continuously
const rotation = frame * 2; // 2 degrees per frame
```

**Example - Conditional rendering:**
```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Show element only between 2-5 seconds
if (frame >= 2 * fps && frame <= 5 * fps) {
  return <div>Visible between 2-5s</div>;
}
```

### useVideoConfig()

Returns the configuration of the current composition (dimensions, fps, duration).

```tsx
import { useVideoConfig } from "remotion";

const MyComponent = () => {
  const { width, height, fps, durationInFrames, id } = useVideoConfig();

  return (
    <div>
      Video: {width}x{height} at {fps}fps
    </div>
  );
};
```

**Returns:**
```typescript
{
  width: number;           // Video width in pixels
  height: number;          // Video height in pixels
  fps: number;             // Frames per second
  durationInFrames: number; // Total duration in frames
  id: string;              // Composition ID
}
```

**Use cases:**

**1. Responsive sizing:**
```tsx
const { width, height } = useVideoConfig();

const logoSize = Math.min(width, height) * 0.3;
const padding = width * 0.05;
```

**2. Time calculations:**
```tsx
const { fps, durationInFrames } = useVideoConfig();

const durationInSeconds = durationInFrames / fps;
const halfway = durationInFrames / 2;
```

**3. Aspect ratio detection:**
```tsx
const { width, height } = useVideoConfig();

const isPortrait = height > width;
const isSquare = width === height;
const aspectRatio = width / height;
```

### AbsoluteFill

A layout component that fills the entire composition space. **Use this as the root container for scenes.**

```tsx
import { AbsoluteFill } from "remotion";

const MyComponent = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Centered Content</h1>
    </AbsoluteFill>
  );
};
```

**What it does:**
- Sets `position: absolute`
- Sets `top: 0`, `left: 0`, `right: 0`, `bottom: 0`
- Sets `width: 100%`, `height: 100%`
- Adds `display: flex` by default

**Props:**
```typescript
{
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}
```

**Common patterns:**

**Centered content:**
```tsx
<AbsoluteFill
  style={{
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Logo />
</AbsoluteFill>
```

**Background + foreground layers:**
```tsx
<>
  {/* Background layer */}
  <AbsoluteFill style={{ backgroundColor: '#000' }} />

  {/* Foreground content */}
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Content />
  </AbsoluteFill>
</>
```

**Gradient background:**
```tsx
<AbsoluteFill
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  }}
/>
```

### delayRender() / continueRender()

Pause rendering for async operations like data fetching or font loading.

```tsx
import { useDelayRender } from "remotion";
import { useState, useEffect } from "react";

const MyComponent = () => {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fetchData()
      .then(() => continueRender(handle))
      .catch((err) => cancelRender(err));
  }, [handle]);

  return <div>Content</div>;
};
```

**Important:**
- Must call `continueRender()` within 30 seconds or rendering fails
- Use `useDelayRender()` hook (recommended) over direct `delayRender()` import
- Call `delayRender()` inside `useState()` to avoid creating multiple handles

**Alternative:** Use `calculateMetadata()` for data fetching - runs once per composition.

### Loop

Repeat animations for a specified number of times or infinitely.

```tsx
import { Loop } from "remotion";

<Loop durationInFrames={50} times={3}>
  <Animation />
</Loop>

// Infinite loop
<Loop durationInFrames={50}>
  <Animation />
</Loop>
```

**Props:**
- `durationInFrames` - Frame count for each iteration (required)
- `times` - Number of repetitions (default: `Infinity`)
- `layout` - `"absolute-fill"` (default) or `"none"`
- `style` - CSS styling for container (v3.3.4+)

**useLoop() hook (v4.0.142+):**
```tsx
const MyComponent = () => {
  const loop = Loop.useLoop();
  // Returns: { durationInFrames: 50, iteration: 0 }
  // Returns null if not inside a Loop

  return <div>Iteration {loop?.iteration}</div>;
};
```

### Freeze

Hold a specific frame while the rest of the timeline progresses.

```tsx
import { Freeze } from "remotion";

<Freeze frame={30}>
  <BlueSquare />
</Freeze>
```

**Props:**
- `frame` - Frame number to freeze at (required)
- `active` - Boolean or callback to conditionally disable freezing (v4.0.127+)

**Effects:**
- `useCurrentFrame()` inside always returns the specified frame
- `<Video>` elements are paused
- `<Audio>` elements are muted

**Conditional freezing:**
```tsx
<Freeze frame={30} active={(frame) => frame >= 60 && frame <= 120}>
  <Content />
</Freeze>
```

### Still

Single-frame compositions for rendering images.

```tsx
import { Still } from "remotion";

<Still
  id="MyImage"
  component={MyImageComponent}
  width={1920}
  height={1080}
  defaultProps={{
    title: "Hello World",
  }}
/>
```

**Key differences from Composition:**
- No `durationInFrames` prop (single frame)
- No `fps` prop
- Renders to image formats (PNG, JPEG, PDF)

**CLI rendering:**
```bash
npx remotion still MyImage output.png
```

### Measuring Text

```bash
npx remotion add @remotion/layout-utils
```

**measureText() - Get text dimensions:**

```tsx
import { measureText } from "@remotion/layout-utils";

const { width, height } = measureText({
  text: "Hello World",
  fontFamily: "Arial",
  fontSize: 32,
  fontWeight: "bold",
});
```

### Images

Always use `<Img>` from `remotion`.

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("photo.png")} />
```

**DO NOT use:**
- Native HTML `<img>` elements
- Next.js `<Image>` component
- CSS `background-image`

**Remote images:**
```tsx
<Img src="https://example.com/image.png" />
```

**Sizing:**
```tsx
<Img
  src={staticFile("photo.png")}
  style={{
    width: 500,
    height: 300,
    objectFit: "cover",
  }}
/>
```

### Videos

```bash
npx remotion add @remotion/media
```

```tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

<Video src={staticFile("video.mp4")} />
```

**Trimming:**
```tsx
<Video
  src={staticFile("video.mp4")}
  trimBefore={2 * fps}
  trimAfter={10 * fps}
/>
```

**Volume & Speed:**
```tsx
<Video src={staticFile("video.mp4")} volume={0.5} playbackRate={2} />
```

### OffthreadVideo

**Performance-optimized video component** that renders video frames in a separate thread. Use this for better performance when embedding videos.

```bash
npx remotion add @remotion/offthread-video
```

```tsx
import { OffthreadVideo } from "@remotion/offthread-video";
import { staticFile } from "remotion";

<OffthreadVideo src={staticFile("video.mp4")} />
```

**Why use OffthreadVideo?**
- ✅ **Faster rendering** - Video decoding happens off the main thread
- ✅ **Better performance** - Doesn't block other rendering operations
- ✅ **Same API** - Works like regular `<Video>` component

**All Video props supported:**
```tsx
<OffthreadVideo
  src={staticFile("video.mp4")}
  volume={0.5}
  playbackRate={1.5}
  trimBefore={30}
  trimAfter={90}
  startFrom={0}
  endAt={120}
/>
```

**When to use:**
- ✅ Embedding multiple videos in one composition
- ✅ Large video files (better performance)
- ✅ Complex compositions with many elements
- ❌ Browser playback (not supported - renders only)

**Important:** OffthreadVideo only works during rendering, not in preview. For preview, it falls back to regular Video component.

### Prefetch

Preload images and assets before they appear on screen to avoid loading delays.

```tsx
import { prefetch } from "remotion";
import { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    // Prefetch images
    const { free, waitUntilDone } = prefetch("https://example.com/image.png");

    // Optional: wait for prefetch to complete
    waitUntilDone().then(() => {
      console.log("Image preloaded!");
    });

    // Cleanup
    return () => {
      free();
    };
  }, []);

  return <img src="https://example.com/image.png" />;
};
```

**Returns:**
```typescript
{
  free: () => void;          // Cancel prefetch and cleanup
  waitUntilDone: () => Promise<void>; // Wait for prefetch completion
}
```

**Use cases:**

**Prefetch next scene images:**
```tsx
useEffect(() => {
  if (frame > 60) {
    // Prefetch image that appears at frame 90
    const { free } = prefetch(staticFile("scene2-bg.jpg"));
    return free;
  }
}, [frame]);
```

**Prefetch multiple images:**
```tsx
useEffect(() => {
  const images = [
    "image1.png",
    "image2.png",
    "image3.png",
  ];

  const cleanups = images.map((img) => prefetch(staticFile(img)));

  return () => {
    cleanups.forEach((c) => c.free());
  };
}, []);
```

**When to use:**
- ✅ Large images that take time to load
- ✅ Images that appear later in the video
- ✅ Multiple images in sequence
- ❌ Small images (overhead not worth it)
- ❌ Images that appear immediately (already loaded)

### interpolateColors()

Smoothly interpolate between two colors (hex, rgb, rgba, hsl).

```tsx
import { interpolateColors } from "remotion";

const MyComponent = () => {
  const frame = useCurrentFrame();

  const color = interpolateColors(
    frame,
    [0, 100],
    ["#ff0000", "#0000ff"] // red to blue
  );

  return <div style={{ backgroundColor: color }}>Color transition</div>;
};
```

**Supported color formats:**
```tsx
// Hex colors
interpolateColors(frame, [0, 100], ["#ff0000", "#0000ff"]);

// RGB
interpolateColors(frame, [0, 100], ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]);

// RGBA (with opacity)
interpolateColors(frame, [0, 100], ["rgba(255, 0, 0, 1)", "rgba(0, 0, 255, 0.5)"]);

// HSL
interpolateColors(frame, [0, 100], ["hsl(0, 100%, 50%)", "hsl(240, 100%, 50%)"]);
```

**With extrapolation:**
```tsx
const color = interpolateColors(
  frame,
  [0, 100],
  ["#ff0000", "#0000ff"],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }
);
```

**Multi-color gradients:**
```tsx
// Fade through multiple colors
const color = interpolateColors(
  frame,
  [0, 50, 100],
  ["#ff0000", "#00ff00", "#0000ff"] // red → green → blue
);
```

**Use cases:**
- Background color transitions
- Text color animations
- Gradient shifts
- Theme transitions

### getRemotionEnvironment()

Detect the current Remotion environment (rendering, preview, or regular browser).

```tsx
import { getRemotionEnvironment } from "remotion";

const env = getRemotionEnvironment();

if (env.isRendering) {
  console.log("Rendering video...");
}

if (env.isPlayer) {
  console.log("In Remotion Player");
}

if (env.isStudio) {
  console.log("In Remotion Studio");
}
```

**Returns:**
```typescript
{
  isRendering: boolean;  // True during npx remotion render
  isPlayer: boolean;     // True in Remotion Player
  isStudio: boolean;     // True in Remotion Studio (preview)
}
```

**Use cases:**

**Conditional logging:**
```tsx
const env = getRemotionEnvironment();

if (!env.isRendering) {
  console.log("Frame:", frame); // Only log during preview
}
```

**Performance optimization:**
```tsx
const env = getRemotionEnvironment();

// Use high quality only during rendering
const quality = env.isRendering ? "high" : "low";
```

**Development helpers:**
```tsx
const env = getRemotionEnvironment();

if (env.isStudio) {
  // Show debug overlays only in studio
  return <DebugOverlay />;
}
```

### getInputProps()

Get the props passed to a composition programmatically (useful in calculateMetadata).

```tsx
import { getInputProps } from "remotion";

const MyComponent = () => {
  const inputProps = getInputProps();

  console.log(inputProps);
  // { title: "My Video", color: "#ff0000" }

  return <div>{inputProps.title}</div>;
};
```

**Returns:** The props object passed to the composition

**Use in calculateMetadata:**
```tsx
import { CalculateMetadataFunction } from "remotion";
import { getInputProps } from "remotion";

const calculateMetadata: CalculateMetadataFunction = async () => {
  const inputProps = getInputProps();

  // Use props to determine duration
  const duration = inputProps.videoDuration || 30;

  return {
    durationInFrames: duration * 30,
  };
};
```

**Use in components:**
```tsx
const MyComponent = () => {
  const props = getInputProps();

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};
```

**When to use:**
- ✅ In `calculateMetadata` to access props before component renders
- ✅ When you need props but don't want to pass them through component tree
- ❌ Regular components (just use component props instead)

### Compositions

Define compositions in `src/Root.tsx`.

```tsx
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={100}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: 'Hello World',
        color: '#ff0000',
      }}
    />
  );
};
```

**Calculate Metadata (dynamic composition properties):**

```tsx
import { Composition, CalculateMetadataFunction } from 'remotion';

const calculateMetadata: CalculateMetadataFunction<MyProps> = async ({
  props,
  abortSignal,
}) => {
  const data = await fetch(`https://api.example.com/data`, { signal: abortSignal })
    .then(res => res.json());

  return {
    durationInFrames: Math.ceil(data.duration * 30),
    props: { ...props, videoUrl: data.url },
  };
};

<Composition
  id="MyComposition"
  component={MyComposition}
  durationInFrames={100}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ id: 'abc' }}
  calculateMetadata={calculateMetadata}
/>
```

---

**Organize compositions with Folder:**

```tsx
import { Composition, Folder } from 'remotion';

export const Root = () => {
  return (
    <>
      {/* Top-level compositions */}
      <Composition id="Main" component={Main} {...config} />

      {/* Organize related compositions in folders */}
      <Folder name="Social Media">
        <Composition id="Instagram" component={Instagram} {...config} />
        <Composition id="TikTok" component={TikTok} {...config} />
        <Composition id="YouTube" component={YouTube} {...config} />
      </Folder>

      <Folder name="Templates">
        <Composition id="Template1" component={Template1} {...config} />
        <Composition id="Template2" component={Template2} {...config} />
      </Folder>

      {/* Nested folders */}
      <Folder name="Archive">
        <Folder name="2023">
          <Composition id="OldVideo" component={OldVideo} {...config} />
        </Folder>
      </Folder>
    </>
  );
};
```

**Folder props:**
```typescript
{
  name: string; // Folder name in Remotion Studio sidebar
  children: React.ReactNode; // Compositions or nested Folders
}
```

**Benefits:**
- ✅ Organize compositions in Remotion Studio sidebar
- ✅ Collapse/expand folders for easier navigation
- ✅ Group related compositions together
- ✅ Support unlimited nesting

**Folder naming best practices:**
- Use clear, descriptive names
- Group by purpose (e.g., "Social Media", "Tests", "Drafts")
- Use folders for projects with 5+ compositions

### Fonts

**Google Fonts:**

```bash
npx remotion add @remotion/google-fonts
```

```tsx
import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

<div style={{ fontFamily }}>Hello World</div>
```

**Local Fonts:**

```bash
npx remotion add @remotion/fonts
```

```tsx
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

await loadFont({
  family: "MyFont",
  url: staticFile("MyFont-Regular.woff2"),
});

<div style={{ fontFamily: "MyFont" }}>Hello World</div>
```

### Tailwind CSS

You can use TailwindCSS in Remotion.

**DO NOT use:**
- `transition-*` classes
- `animate-*` classes

Always animate using `useCurrentFrame()` hook.

### Advanced Packages

**@remotion/shapes - Built-in SVG shapes:**

```bash
npx remotion add @remotion/shapes
```

```tsx
import { Circle, Rect, Polygon } from "@remotion/shapes";

<Circle radius={100} fill="red" stroke="blue" strokeWidth={5} />
<Rect width={200} height={100} fill="green" cornerRadius={10} />
<Polygon points={5} radius={100} fill="purple" edgeRoundness={0.5} />
```

**@remotion/lottie - Lottie animations:**

```bash
npx remotion add @remotion/lottie
npm i lottie-web
```

```tsx
import { Lottie } from "@remotion/lottie";
import { staticFile } from "remotion";
import { useState, useEffect } from "react";

const MyComponent = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(staticFile("animation.json"))
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  if (!animationData) return null;

  return <Lottie animationData={animationData} />;
};
```

**@remotion/skia - High-performance 2D graphics:**

```bash
npx remotion add @remotion/skia
npm i @shopify/react-native-skia
```

```tsx
import { SkiaCanvas } from "@remotion/skia";
import { Circle, Group } from "@shopify/react-native-skia";

const MyComponent = () => {
  const frame = useCurrentFrame();

  return (
    <SkiaCanvas width={1920} height={1080}>
      <Group>
        <Circle cx={frame * 5} cy={100} r={50} color="blue" />
      </Group>
    </SkiaCanvas>
  );
};
```

### Trimming Patterns

**Trim the beginning (negative `from`):**

```tsx
<Sequence from={-0.5 * fps}>
  <MyAnimation />
</Sequence>
```

**Trim the end (`durationInFrames`):**

```tsx
<Sequence durationInFrames={1.5 * fps}>
  <MyAnimation />
</Sequence>
```

### Parameters (Zod Schema)

Make videos parametrizable with Zod schemas.

**Install Zod (must be exactly 3.22.3):**
```bash
npm i zod@3.22.3
```

**Define schema:**
```tsx
import { z } from 'zod';

export const MyCompositionSchema = z.object({
  title: z.string(),
});

const MyComponent: React.FC<z.infer<typeof MyCompositionSchema>> = (props) => {
  return <div><h1>{props.title}</h1></div>;
};
```

**Use in Root.tsx:**
```tsx
<Composition
  id="MyComposition"
  component={MyComponent}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{ title: 'Hello World' }}
  schema={MyCompositionSchema}
/>
```

**Color picker:**
```bash
npx remotion add @remotion/zod-types
```

```tsx
import { zColor } from '@remotion/zod-types';

export const MyCompositionSchema = z.object({
  color: zColor(),
});
```

### Transparent Videos

**Transparent ProRes (for video editing software):**

```bash
npx remotion render --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444 MyComp out.mov
```

**Transparent WebM (for browsers):**

```bash
npx remotion render --image-format=png --pixel-format=yuva420p --codec=vp9 MyComp out.webm
```

### Measuring DOM Nodes

Use `useCurrentScale()` for accurate measurements (Remotion applies scale transform):

```tsx
import { useCurrentScale } from "remotion";
import { useRef, useEffect, useState } from "react";

export const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useCurrentScale();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDimensions({
      width: rect.width / scale,
      height: rect.height / scale,
    });
  }, [scale]);

  return <div ref={ref}>Content</div>;
};
```

### FFmpeg and FFprobe

FFmpeg available via Remotion:

```bash
bunx remotion ffmpeg -i input.mp4 output.mp3
bunx remotion ffprobe input.mp4
```

**Trimming videos:**
```bash
bunx remotion ffmpeg -ss 00:00:05 -i input.mp4 -to 00:00:10 -c:v libx264 -c:a aac output.mp4
```

### AI Voiceover (ElevenLabs)

**MUST ask user for ElevenLabs API key.** Store in `.env`:
```
ELEVENLABS_API_KEY=your_key_here
```

**Generating audio:**

```ts
const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "Welcome to the show.",
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  }
);

const audioBuffer = Buffer.from(await response.arrayBuffer());
writeFileSync(`public/voiceover/scene.mp3`, audioBuffer);
```

### getVideoMetadata()

Get comprehensive metadata from a video file (codec, dimensions, duration, bitrate).

```bash
npx remotion add @remotion/media-parser
```

```tsx
import { getVideoMetadata } from "@remotion/media-parser";
import { staticFile } from "remotion";

const metadata = await getVideoMetadata(staticFile("video.mp4"));

console.log(metadata);
// {
//   width: 1920,
//   height: 1080,
//   durationInSeconds: 30.5,
//   codec: "h264",
//   fps: 30,
//   bitrate: 5000000,
//   hasAudio: true,
//   audioCodec: "aac"
// }
```

**Returns:**
```typescript
{
  width: number;
  height: number;
  durationInSeconds: number;
  codec: string;          // e.g., "h264", "vp9", "av1"
  fps: number;
  bitrate: number;
  hasAudio: boolean;
  audioCodec?: string;    // e.g., "aac", "opus", "mp3"
  audioBitrate?: number;
}
```

**Use cases:**

**Validate video before rendering:**
```tsx
const metadata = await getVideoMetadata(videoUrl);

if (metadata.codec !== "h264") {
  throw new Error("Only H.264 videos supported");
}

if (metadata.durationInSeconds > 60) {
  throw new Error("Video too long (max 60 seconds)");
}
```

**Dynamic composition setup:**
```tsx
const calculateMetadata: CalculateMetadataFunction = async () => {
  const metadata = await getVideoMetadata(staticFile("input.mp4"));

  return {
    durationInFrames: Math.ceil(metadata.durationInSeconds * 30),
    width: metadata.width,
    height: metadata.height,
  };
};
```

### getAudioData()

Get audio waveform data from an audio or video file for visualizations.

```bash
npx remotion add @remotion/media-utils
```

```tsx
import { getAudioData } from "@remotion/media-utils";
import { staticFile } from "remotion";

const audioData = await getAudioData(staticFile("audio.mp3"));

console.log(audioData);
// {
//   channelWaveforms: [Float32Array, Float32Array], // stereo
//   sampleRate: 44100,
//   durationInSeconds: 180.5,
//   numberOfChannels: 2,
//   resultId: "unique-id",
//   isRemote: false
// }
```

**Returns:**
```typescript
{
  channelWaveforms: Float32Array[]; // One array per channel
  sampleRate: number;               // e.g., 44100, 48000
  durationInSeconds: number;
  numberOfChannels: number;         // 1 = mono, 2 = stereo
  resultId: string;
  isRemote: boolean;
}
```

**Use cases:**

**Full audio waveform visualization:**
```tsx
const audioData = await getAudioData(staticFile("song.mp3"));
const waveform = audioData.channelWaveforms[0]; // Left channel

// Downsample for visualization
const samples = 1000;
const step = Math.floor(waveform.length / samples);
const displayData = [];

for (let i = 0; i < samples; i++) {
  displayData.push(waveform[i * step]);
}

return (
  <svg width={1000} height={200}>
    {displayData.map((value, i) => (
      <rect
        key={i}
        x={i}
        y={100 - value * 100}
        width={1}
        height={Math.abs(value) * 200}
        fill="white"
      />
    ))}
  </svg>
);
```

**Detect audio duration:**
```tsx
const audioData = await getAudioData(staticFile("audio.mp3"));
const durationInFrames = Math.ceil(audioData.durationInSeconds * 30);
```

**Difference from useWindowedAudioData():**
- `getAudioData()` - Loads FULL audio file at once (use in calculateMetadata)
- `useWindowedAudioData()` - Loads audio in rolling window (use in components during rendering)

### Mediabunny Utilities

**Getting audio duration:**

```tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getAudioDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  return await input.computeDuration();
};
```

**Getting video dimensions:**

```tsx
export const getVideoDimensions = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  const videoTrack = await input.getPrimaryVideoTrack();
  if (!videoTrack) throw new Error("No video track found");

  return {
    width: videoTrack.displayWidth,
    height: videoTrack.displayHeight,
  };
};
```

**Getting video duration:**

```tsx
export const getVideoDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  return await input.computeDuration();
};
```

**Checking video decode compatibility:**

```tsx
export const canDecode = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  try {
    await input.getFormat();
  } catch {
    return false;
  }

  const videoTrack = await input.getPrimaryVideoTrack();
  if (videoTrack && !(await videoTrack.canDecode())) return false;

  const audioTrack = await input.getPrimaryAudioTrack();
  if (audioTrack && !(await audioTrack.canDecode())) return false;

  return true;
};
```

**Extracting frames from videos:**

```tsx
import {
  ALL_FORMATS,
  Input,
  UrlSource,
  VideoSample,
  VideoSampleSink,
} from "mediabunny";

await extractFrames({
  src: "https://remotion.media/video.mp4",
  timestampsInSeconds: [0, 1, 2, 3, 4],
  onVideoSample: (sample) => {
    const canvas = document.createElement("canvas");
    canvas.width = sample.displayWidth;
    canvas.height = sample.displayHeight;
    const ctx = canvas.getContext("2d");
    sample.draw(ctx!, 0, 0);
  },
});
```

---

## Troubleshooting

### Problem: Video has flickering animations

**Cause:** Using CSS transitions or Tailwind animate classes

**Fix:** Remove all CSS animations and use `useCurrentFrame()` instead
```tsx
// WRONG
<div className="animate-fade-in">Text</div>

// RIGHT
const opacity = spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } });
<div style={{ opacity }}>Text</div>
```

### Problem: Transitions are abrupt cuts

**Cause:** Not using TransitionSeries

**Fix:** Wrap scenes in `<TransitionSeries>` with transitions between them
```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}><SceneA /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
  <TransitionSeries.Sequence durationInFrames={60}><SceneB /></TransitionSeries.Sequence>
</TransitionSeries>
```

### Problem: Text overflows or is too small

**Cause:** Hardcoded font sizes

**Fix:** Use `fitText()` to dynamically size text
```tsx
const { fontSize } = fitText({
  text: "Hello World",
  withinWidth: width * 0.8,
  fontFamily: "Inter",
  fontWeight: "bold",
});
```

### Problem: Audio import error

**Cause:** Importing Audio from 'remotion' instead of '@remotion/media'

**Fix:** Always import from `@remotion/media`
```tsx
// WRONG
import { Audio } from "remotion";

// RIGHT
import { Audio } from "@remotion/media";
```

### Problem: Rendering hangs or fails

**Cause:** `delayRender()` not resolved within 30 seconds

**Fix:** Ensure `continueRender()` is called in all code paths
```tsx
useEffect(() => {
  fetchData()
    .then(() => continueRender(handle))
    .catch((err) => cancelRender(err)); // Don't forget error handling!
}, [handle]);
```

---

## Best Practices

1. **No hardcoded frame numbers** - Use `fps` multiplier: `3 * fps` instead of `90`
2. **All animations frame-based** - Use `useCurrentFrame()` for everything
3. **Premount sequences** - Add `premountFor={1 * fps}` to all `<Sequence>` components
4. **Use TransitionSeries** - For professional scene transitions
5. **Responsive sizing** - Base all sizes on `width` and `height` from `useVideoConfig()`
6. **No hardcoded values** - Use percentages of video dimensions (e.g., `width * 0.05`)
7. **fitText() for dynamic text** - Automatically size text to fit containers
8. **Spring config** - Use `{ damping: 200 }` for smooth animations without bounce
9. **Extrapolation** - Always add `extrapolateRight: 'clamp'` to interpolate
10. **Import Audio from @remotion/media** - Not from 'remotion'
11. **Create unique code for each video** - No templates, analyze content first
12. **Follow the story arc** - Hook → Problem → Solution → Features → CTA
13. **Match brand personality** - Use extracted colors, fonts, and visual style
14. **Beat-sync transitions** - Use `audio.beats` array for impactful moments
15. **Keep features focused** - Highlight 3-5 key benefits, not all features
