# SKILL.md Restructuring Plan

**Date:** 2026-02-13
**Purpose:** Transform SKILL.md from template-driven to quality-driven design approach
**Goal:** Force agents to create unique, high-quality videos using all Remotion best practices

---

## Executive Summary

### Current Problems
1. ❌ 400-line Generated.tsx example becomes a template (agents copy it)
2. ❌ Core Features section comes AFTER workflow (agents skip it)
3. ❌ Advanced Features ignored (agents don't know when to use them)
4. ❌ No design phase (agents go straight to coding)
5. ❌ No validation checklist (agents skip quality checks)
6. ❌ API Reference buried at bottom (agents never see it)

### Solution
1. ✅ Remove ALL complete code examples
2. ✅ Add mandatory design phases (Steps 2, 3, 4, 5, 8, 9)
3. ✅ Add decision trees (when to use which features)
4. ✅ Add 30-item quality checklist (mandatory before render)
5. ✅ Reorganize: Workflow → Reference (workflow-first)
6. ✅ Enforce brand-driven design (colors, fonts, personality)

---

## File Structure Comparison

### OLD Structure (Current - 2,489 lines)
```
1. Table of Contents
2. Quick Start (with minimal example)
3. Complete Workflow (with 400-line Generated.tsx example) ← PROBLEM
4. Core Features (essential patterns) ← Too late, agents already coded
5. Advanced Features (use when needed) ← Agents ignore this
6. API Reference (1000+ lines) ← Agents never reach this
7. Troubleshooting
8. Best Practices (buried at end)
```

**Problems:**
- Example code appears at line 266 (too early)
- Design guidance appears at line 242 but is weak
- Validation appears nowhere (missing)
- API Reference at line 1433 (too far down)

### NEW Structure (Planned)
```
PART 1: UNDERSTANDING
1. Introduction & Philosophy
2. Process Overview (8 steps, no code)

PART 2: EXECUTION WORKFLOW (Follow in Order)
Step 1: Extract Content (MCP tool)
Step 2: Brand Analysis ⚠️ MANDATORY DESIGN PHASE
Step 3: Scene Design ⚠️ MANDATORY DESIGN PHASE
Step 4: Animation Planning ⚠️ MANDATORY DESIGN PHASE
Step 5: Transition Planning ⚠️ MANDATORY DESIGN PHASE
Step 6: Write Script
Step 7: Generate Audio (MCP tool)
Step 8: Advanced Features Decision ⚠️ MANDATORY EVALUATION
Step 9: Code Structure Planning ⚠️ MANDATORY DESIGN PHASE
Step 10: Write Remotion Code (structure only, NO examples)
Step 11: Quality Validation ⚠️ MANDATORY 30-ITEM CHECKLIST
Step 12: Render Video (MCP tool)

PART 3: REFERENCE (Quick Lookup)
- Remotion API Quick Reference (organized by category)
- Common Animation Patterns (small snippets only)
- Anti-Patterns (what NOT to do)
- Troubleshooting
```

**Benefits:**
- No complete examples to copy
- Design phases before coding (Steps 2-5, 9)
- Validation checklist before render (Step 11)
- Advanced features evaluated (Step 8)
- API Reference accessible (Part 3)

---

## Detailed Changes by Section

### SECTION 1: Introduction & Philosophy
**Status:** NEW (doesn't exist in current file)

**Add:**
```markdown
# URL to Video - Remotion Skill

## Philosophy: Quality Over Speed

This skill creates **unique, high-quality promotional videos** from landing page URLs. Every video is custom-designed based on the brand's personality, colors, and content.

**Core Principles:**
- 🎨 **No Templates** - Every video is designed from scratch
- 🧠 **Design Before Code** - Plan scenes, animations, transitions first
- 🎯 **Brand-Driven** - Colors, fonts, style reflect the brand
- ✨ **Advanced Features** - Evaluate and use when appropriate
- ✅ **Quality Validation** - 30-item checklist before rendering

**What This Produces:**
- 30-90 second promotional videos
- Custom animations and transitions
- AI-generated music (instrumental)
- AI-generated narration
- Beat-synced scene transitions
- Professional typography and layout
```

**Lines:** ~30 lines

---

### SECTION 2: Process Overview
**Status:** NEW (current "Quick Start" is removed)

**Current Quick Start (REMOVE):**
- Lines 37-112 (75 lines)
- Contains minimal example code ❌
- Contains common mistakes section ✅ (move to Anti-Patterns)

**New Process Overview (ADD):**
```markdown
## The Complete Process

Every video follows these 12 steps:

### Phase 1: Content & Analysis
1. **Extract** - Get content, branding, metadata from URL
2. **Analyze** - Determine brand personality, visual style, animation tempo
3. **Design Scenes** - Plan scene count, purpose, duration, layout
4. **Plan Animations** - Choose animation types for each scene
5. **Plan Transitions** - Select transition styles between scenes

### Phase 2: Audio Production
6. **Write Script** - Create narration following story arc
7. **Generate Audio** - Create music and narration with AI

### Phase 3: Video Production
8. **Evaluate Advanced Features** - Decide which advanced features to use
9. **Plan Code Structure** - Design components, imports, props
10. **Write Remotion Code** - Implement the design in TypeScript/React
11. **Validate Quality** - Verify all 30 quality checklist items
12. **Render Video** - Generate final MP4 file

**Critical:** Steps 2-5 and 8-11 are MANDATORY design and validation phases. You cannot skip them.
```

**Lines:** ~40 lines

---

### SECTION 3: Step 1 - Extract Content
**Status:** EXISTS (currently at line 118-157)

**Current Content:**
- MCP tool call ✅
- Return structure ✅
- What it does ✅

**Changes Required:**
- Add "What to save" section
- Add "Next steps" section

**Add After Return Structure:**
```markdown
**Save These Values (You'll Need Them):**
- `branding.colors.primary` - Main brand color
- `branding.colors.secondary` - Supporting color
- `branding.colors.accent` - Highlight color
- `branding.colors.background` - Base color
- `branding.font` - Typography
- `branding.theme` - "light" or "dark"
- `branding.logo.url` - Logo image
- `metadata.industry` - Industry classification
- `content.features.length` - Number of features (determines scene count)

**Next Step:** Proceed to Step 2 (Brand Analysis)
```

**Lines:** Keep ~50 lines, add ~15 lines = 65 lines total

---

### SECTION 4: Step 2 - Brand Analysis (NEW)
**Status:** NEW (doesn't exist)

**Add Complete Section:**
```markdown
## Step 2: Brand & Content Analysis ⚠️ MANDATORY

**Before writing any code, analyze the brand to inform all design decisions.**

### Analysis Framework

#### 1. Determine Brand Personality

**Analyze:** title + description + colors + industry

**Decision Tree:**
```
IF colors are vibrant AND industry is tech
  → Personality: Modern, Bold, Innovative, Energetic

IF colors are muted AND industry is corporate/finance
  → Personality: Professional, Trustworthy, Stable

IF colors are dark with high contrast
  → Personality: Dramatic, Cinematic, Premium

IF colors are playful AND bright
  → Personality: Fun, Approachable, Friendly

IF colors are minimal (grayscale/pastels)
  → Personality: Clean, Minimal, Sophisticated
```

**Document Your Decision:**
- [ ] Brand Personality: _______________

---

#### 2. Determine Visual Style

**Based on personality, choose visual approach:**

| Personality | Visual Style | Characteristics |
|------------|--------------|-----------------|
| Modern/Tech | Bold & Dynamic | Large typography, geometric shapes, motion |
| Professional | Clean & Structured | Grid layouts, subtle animations, balanced |
| Dramatic | Cinematic | Dark backgrounds, dramatic lighting, slow motion |
| Playful | Fun & Energetic | Bouncy animations, bright colors, organic shapes |
| Minimal | Simple & Elegant | Generous whitespace, subtle motion, typography-focused |

**Document Your Decision:**
- [ ] Visual Style: _______________

---

#### 3. Determine Animation Tempo

**Based on personality + industry:**

```
IF personality is Energetic OR industry is tech/gaming
  → Tempo: Fast (animations < 1s, quick transitions)

IF personality is Professional OR industry is corporate/finance
  → Tempo: Medium (animations 1-2s, smooth transitions)

IF personality is Dramatic OR Minimal
  → Tempo: Slow (animations 2-3s, lingering shots)
```

**Document Your Decision:**
- [ ] Animation Tempo: _______________

---

#### 4. Determine Typography Hierarchy

**Based on visual style:**

```
Bold & Dynamic → Large headlines (height * 0.12), heavy weight (900)
Clean & Structured → Medium headlines (height * 0.09), regular weight (600)
Cinematic → Extra large (height * 0.14), bold weight (700)
Fun & Energetic → Large rounded (height * 0.11), varied weights
Simple & Elegant → Clean sizes (height * 0.08), light weight (300)
```

**Document Your Decision:**
- [ ] Typography: Headlines ___px, Body ___px, Weight ___

---

#### 5. Determine Layout Preference

**Based on visual style + content:**

```
IF visual style is Bold
  → Layout: Full-bleed (edge-to-edge content)

IF visual style is Clean
  → Layout: Centered with padding (80% width)

IF visual style is Cinematic
  → Layout: Letterbox (16:9 aspect with bars)

IF content has comparisons
  → Layout: Split-screen (50/50)

IF content is feature-heavy
  → Layout: Grid (2x2 or 3x3)
```

**Document Your Decision:**
- [ ] Layout Preference: _______________

---

### Validation Checkpoint

**You MUST complete this checklist before proceeding:**

- [ ] Brand Personality determined
- [ ] Visual Style chosen
- [ ] Animation Tempo decided
- [ ] Typography Hierarchy planned
- [ ] Layout Preference selected
- [ ] All decisions documented

**Cannot proceed to Step 3 without completing this analysis.**

---
```

**Lines:** ~150 lines

---

### SECTION 5: Step 3 - Scene Design (NEW)
**Status:** NEW (doesn't exist)

**Add Complete Section:**
```markdown
## Step 3: Scene Structure Design ⚠️ MANDATORY

**Design your complete scene structure before writing any code.**

### Scene Count Guidelines

**Based on number of features:**
```
1-3 features → 3-4 scenes
4-5 features → 4-5 scenes
6+ features → 5-6 scenes
```

### Required Scene Types

**Every video MUST include:**
- ✅ **Hook Scene** (always first) - 3-5 seconds
- ✅ **Solution Scene** (always) - 10-15 seconds
- ✅ **CTA Scene** (always last) - 3-5 seconds

**Include if applicable:**
- ⚠️ **Problem Scene** (if pain point exists) - 5-10 seconds
- ⚠️ **Features Scene** (if 3+ features) - 15-25 seconds
- ⚠️ **Social Proof Scene** (if stats/testimonials) - 5-10 seconds

### Scene Planning Template

**For EACH scene, document:**

```
Scene [X]: [Scene Purpose]
  Duration: [X] seconds ([X * fps] frames)

  Visual Concept:
    - Primary element: [Logo/Text/Image/Chart/etc.]
    - Secondary elements: [Supporting visuals]
    - Background: [Gradient/Solid/Image/Video]

  Layout:
    - Type: [Centered/Split-screen/Grid/Full-bleed/Letterbox]
    - Content position: [Center/Left/Right/Top/Bottom]
    - Padding: [X% of width/height]

  Colors Used:
    - Primary role: [Background/Text/Accent/etc.]
    - Secondary role: [Background/Text/Accent/etc.]
    - Accent role: [Highlights/CTA/etc.]

  Typography:
    - Main text: [content.title/description/features[X]]
    - Size: [height * X.XX]
    - Weight: [300/400/600/700/900]

  Animation Preview:
    - Entrance: [Fade in/Slide in/Scale up/etc.]
    - Emphasis: [Pulse/Glow/Rotate/etc.]
    - Exit: [Fade out/Slide out/etc.]
```

### Example Scene Plan (DO NOT COPY - Template Only)

```
Scene 1: Hook - Logo Reveal
  Duration: 3 seconds (90 frames at 30fps)

  Visual Concept:
    - Primary: Logo centered with glow effect
    - Secondary: Title text below logo
    - Background: Gradient (primary → secondary)

  Layout:
    - Centered, full-screen
    - Logo at 35% of screen height
    - Title at 15% from bottom

  Colors Used:
    - Primary: Gradient start
    - Secondary: Gradient end
    - Accent: Logo glow color
    - Background: White text color

  Typography:
    - Main: content.title
    - Size: height * 0.12
    - Weight: 700 (bold)

  Animation Preview:
    - Entrance: Scale from 0.5 to 1.0 with spring
    - Emphasis: Pulsing glow (opacity 0 → 1 → 0.7)
    - Exit: None (transitions to next scene)

[Continue for ALL scenes...]
```

### Validation Checkpoint

**You MUST complete this checklist before proceeding:**

- [ ] Total scene count determined ([X] scenes)
- [ ] Each scene has defined purpose
- [ ] Each scene has planned duration (totals to video duration)
- [ ] Each scene has visual concept
- [ ] Each scene has layout plan
- [ ] Each scene has color usage plan
- [ ] Each scene has typography plan
- [ ] Each scene has animation preview
- [ ] All scene plans documented

**Cannot proceed to Step 4 without completing scene design.**

---
```

**Lines:** ~120 lines

---

### SECTION 6: Step 4 - Animation Planning (NEW)
**Status:** NEW (doesn't exist)

**Add Complete Section:**
```markdown
## Step 4: Animation Strategy ⚠️ MANDATORY

**Plan specific animations for EACH scene before coding.**

### Animation Planning Framework

**For EACH scene from Step 3, answer these questions:**

#### Question 1: What's the entrance animation?

**Options:**
```
Spring fade in (organic)
  → spring({ frame, fps, from: 0, to: 1, config: { damping: 200 } })
  → Use when: Professional, smooth entrance

Bounce in (playful)
  → spring({ frame, fps, from: 0, to: 1, config: { damping: 8 } })
  → Use when: Fun, energetic brand

Slide in (directional)
  → spring({ frame, fps, from: -width, to: 0, config: { damping: 200 } })
  → Use when: Sequential content, narrative flow

Zoom in (dramatic)
  → spring({ frame, fps, from: 1.5, to: 1, config: { damping: 200 } })
  → Use when: Cinematic, impactful reveal

Eased fade in (precise)
  → interpolate(frame, [0, 1*fps], [0, 1], { easing: Easing.inOut(Easing.cubic) })
  → Use when: Exact timing needed, controlled pace
```

**Document for each scene:**
- [ ] Scene 1 entrance: _______________
- [ ] Scene 2 entrance: _______________
- [ ] Scene 3 entrance: _______________
- [ ] [etc.]

---

#### Question 2: What's the emphasis animation?

**Options:**
```
Pulsing glow (attention-grabbing)
  → Math.sin(frame / 10) * 0.3 + 0.7 for opacity
  → Use when: Highlighting CTA, important elements

Color shift (dynamic)
  → interpolateColors(frame, [0, 2*fps], [color1, color2])
  → Use when: Brand has multiple colors, modern style

Rotating element (kinetic)
  → frame * 2 for rotation degrees
  → Use when: Tech brand, showing motion/progress

Scale on beat (music-reactive)
  → Check audio.beats array, scale to 1.1 when near beat
  → Use when: Music-driven video, energetic brand

Morphing shape (creative)
  → interpolate between different paths/sizes
  → Use when: Abstract brand, creative industry
```

**Document for each scene:**
- [ ] Scene 1 emphasis: _______________
- [ ] Scene 2 emphasis: _______________
- [ ] Scene 3 emphasis: _______________
- [ ] [etc.]

---

#### Question 3: Spring or Easing?

**Decision Tree:**
```
IF you want organic, physics-based motion
  → Use spring
  → Examples: Logo bounce, natural movement, UI elements

IF you need precise timing and control
  → Use interpolate with easing
  → Examples: Syncing to narration, exact durations, coordinated sequences

IF you want dramatic, stylized motion
  → Use easing with specific curves
  → Easing.out(Easing.bounce) - Bouncy landing
  → Easing.out(Easing.back(1.5)) - Overshoot effect
  → Easing.inOut(Easing.cubic) - Smooth acceleration/deceleration
```

**Document for each scene:**
- [ ] Scene 1 motion: Spring / Easing: _______________
- [ ] Scene 2 motion: Spring / Easing: _______________
- [ ] Scene 3 motion: Spring / Easing: _______________
- [ ] [etc.]

---

#### Question 4: What's the timing?

**Based on Animation Tempo from Step 2:**

```
Fast Tempo:
  - Entrance animations: 0.5-1 second
  - Emphasis animations: 0.3-0.5 second loops
  - Exit animations: 0.3-0.5 seconds

Medium Tempo:
  - Entrance animations: 1-2 seconds
  - Emphasis animations: 0.5-1 second loops
  - Exit animations: 0.5-1 seconds

Slow Tempo:
  - Entrance animations: 2-3 seconds
  - Emphasis animations: 1-2 second loops
  - Exit animations: 1-2 seconds
```

**Document for each scene:**
- [ ] Scene 1 timing: Entrance ___s, Emphasis ___s
- [ ] Scene 2 timing: Entrance ___s, Emphasis ___s
- [ ] Scene 3 timing: Entrance ___s, Emphasis ___s
- [ ] [etc.]

---

### Validation Checkpoint

**You MUST complete this checklist before proceeding:**

- [ ] Entrance animation planned for EVERY scene
- [ ] Emphasis animation planned for EVERY scene
- [ ] Motion type chosen (spring/easing) for EVERY scene
- [ ] Timing planned for EVERY scene
- [ ] Animations match brand personality
- [ ] Animations match animation tempo from Step 2
- [ ] All animation decisions documented

**Cannot proceed to Step 5 without completing animation planning.**

---
```

**Lines:** ~140 lines

---

### SECTION 7: Step 5 - Transition Planning (NEW)
**Status:** NEW (doesn't exist)

**Add Complete Section:**
```markdown
## Step 5: Transition Strategy ⚠️ MANDATORY

**Plan transitions BETWEEN every scene.**

### Transition Selection

**Match transition to Brand Personality (from Step 2):**

| Brand Personality | Recommended Transition | Why |
|------------------|------------------------|-----|
| Modern/Tech | `slide({ direction })` | Directional, purposeful |
| Professional | `fade()` | Subtle, smooth |
| Dramatic | `wipe()` or `clockWipe()` | Bold, cinematic |
| Playful | `flip()` | Fun, unexpected |
| Minimal | `fade()` | Unobtrusive, clean |

### Transition Timing

**Standard:** 0.5 seconds (15 frames at 30fps)

**Adjust based on tempo:**
```
Fast Tempo → 0.3s (9 frames)
Medium Tempo → 0.5s (15 frames)
Slow Tempo → 0.8s (24 frames)
```

### Beat Synchronization

**If `audio.beats` is available:**

```typescript
// For major scene transitions, sync to nearest beat
Scene 1 ends at frame X
Nearest beat: audio.beats.find(b => Math.abs(b - (X / fps)) < 0.1)
Adjust scene duration to hit beat exactly
```

**When to sync:**
- ✅ Hook → Problem transition
- ✅ Problem → Solution transition
- ✅ Features → CTA transition
- ⚠️ Within-scene transitions (optional)

### Transition Planning Template

```
Transition 1: Scene 1 (Hook) → Scene 2 (Problem)
  Type: [fade/slide/wipe/flip/clockWipe]
  Duration: [X] seconds ([X * fps] frames)
  Timing: [linearTiming / springTiming]
  Beat-synced: [Yes/No]

  If slide:
    - Direction: [from-left/from-right/from-top/from-bottom]

  If wipe:
    - Direction: [left-to-right/right-to-left/top-to-bottom/bottom-to-top]

[Continue for all transitions...]
```

### Example Transition Plan (DO NOT COPY)

```
Transition 1: Hook → Problem
  Type: fade()
  Duration: 0.5 seconds (15 frames)
  Timing: linearTiming
  Beat-synced: Yes (sync to beat at 3.2s)

Transition 2: Problem → Solution
  Type: slide({ direction: 'from-bottom' })
  Duration: 0.5 seconds (15 frames)
  Timing: springTiming({ config: { damping: 200 } })
  Beat-synced: Yes (sync to beat at 8.5s)

Transition 3: Solution → Features
  Type: fade()
  Duration: 0.5 seconds (15 frames)
  Timing: linearTiming
  Beat-synced: No

[etc.]
```

### Validation Checkpoint

**You MUST complete this checklist before proceeding:**

- [ ] Transition planned for EVERY scene change
- [ ] Transition type matches brand personality
- [ ] Transition duration matches animation tempo
- [ ] Beat synchronization evaluated
- [ ] Major transitions synced to beats (if audio.beats available)
- [ ] All transition decisions documented

**Cannot proceed to Step 6 without completing transition planning.**

---
```

**Lines:** ~110 lines

---

### SECTION 8: Step 6 - Write Script
**Status:** EXISTS (currently at lines 159-210)

**Current Content:**
- Story arc structure ✅
- Script writing guidelines ✅
- Example script ❌ (remove this)

**Changes Required:**
- Remove example script (lines 195-209)
- Add script planning template
- Add validation checklist

**Replace Example Script Section With:**
```markdown
### Script Planning Template

**Use this structure (do NOT copy verbatim):**

```
[Hook - 3-5 seconds]
[Attention-grabbing question or statement related to content]

[Problem - 5-10 seconds] (if applicable)
[Describe the pain point that content.features solve]
[Elaborate with specific details from content.description]

[Solution - 10-15 seconds]
[Introduce content.title as the solution]
[Explain how it works using content.description]

[Features - 15-25 seconds]
[For each of content.features[0-2]:]
  [State feature and its benefit]

[Social Proof - 5-10 seconds] (if applicable)
[If stats or testimonials available in content.sections]

[CTA - 3-5 seconds]
[Drive action using content.title]
[End with metadata.domain]
```

### Script Validation

**Before proceeding, verify:**

- [ ] Script follows story arc structure
- [ ] Tone matches brand personality (from Step 2)
- [ ] Pacing is ~150 words/minute
- [ ] Length matches video duration
- [ ] Uses content.features (not invented features)
- [ ] Uses content.description (not generic copy)
- [ ] Ends with metadata.domain
- [ ] Matches brand voice (formal/casual based on personality)

**Next Step:** Proceed to Step 7 (Generate Audio)
```

**Lines:** Remove 15 lines (example), add 40 lines = +25 lines net = ~75 lines total

---

### SECTION 9: Step 7 - Generate Audio
**Status:** EXISTS (currently at lines 212-240)

**Current Content:**
- MCP tool call ✅
- Music style options ✅
- Music selection logic ✅
- Returns structure ✅

**Changes Required:**
- Expand music selection logic (tie to Step 2 brand personality)
- Add "Save beats array" reminder
- Add validation

**Add Before MCP Tool Call:**
```markdown
### Music Style Selection (Based on Step 2)

**Use brand personality to choose music style:**

| Brand Personality | Music Style | Why |
|------------------|-------------|-----|
| Modern/Tech | "lo-fi" or "hip-hop" | Contemporary, urban vibe |
| Professional | "jazz" or "ambient" | Sophisticated, non-distracting |
| Dramatic | "cinematic" | Orchestral, epic feel |
| Playful | "pop" | Upbeat, catchy |
| Minimal | "ambient" | Subtle, atmospheric |

**Available styles:** pop, hip-hop, rap, jazz, lo-fi, ambient, cinematic, rock

**Selected style:** _______________ (based on personality: _______________)
```

**Add After Returns Structure:**
```markdown
**IMPORTANT - Save This:**
- Store `audio.beats` array - You'll use this in Step 5 for beat-synced transitions
- Store `audio.music.localPath` - Required for Audio component
- Store `audio.narration.localPath` - Required for Audio component

### Validation

- [ ] Music style matches brand personality
- [ ] Duration matches video duration
- [ ] audio.beats array received and saved
- [ ] audio.music.localPath exists
- [ ] audio.narration.localPath exists

**Next Step:** Proceed to Step 8 (Advanced Features Decision)
```

**Lines:** Add 35 lines = ~75 lines total

---

### SECTION 10: Step 8 - Advanced Features Decision (NEW)
**Status:** NEW (doesn't exist, currently "Advanced Features" at lines 1019-1429)

**Current Advanced Features Section:**
- Audio Visualization (lines 1023-1094)
- Text Animations (lines 1096-1119)
- Charts (lines 1121-1180)
- Maps (lines 1182-1238)
- Captions (lines 1240-1322)
- 3D Graphics (lines 1324-1365)
- Visual Effects (lines 1367-1429)

**Changes Required:**
- Convert from "how to use" to "when to use + decision tree"
- Make evaluation mandatory
- Add decision checklist

**Add New Section:**
```markdown
## Step 8: Advanced Features Decision ⚠️ MANDATORY

**Evaluate EVERY advanced feature. Decide whether to include it.**

**Rule:** Features must serve the brand/content. Don't add features just because they're cool.

---

### 1. Audio Visualization

**Evaluate:**
- [ ] Is brand music/audio-related? → YES = Strong candidate
- [ ] Is brand energetic/tech? → YES = Moderate candidate
- [ ] Does video need dynamic elements? → YES = Weak candidate
- [ ] None of above → SKIP

**If YES to any:**

**Options:**
- **Spectrum bars** - Frequency bars that react to music
  - Use when: Modern, tech, music-focused brands
  - Implementation: `useWindowedAudioData` + `visualizeAudio`

- **Bass-reactive scaling** - Elements scale with bass
  - Use when: Energetic brands, logo emphasis
  - Implementation: Extract low frequencies, map to scale

**Decision:**
- [ ] Include audio visualization: YES / NO
- [ ] If YES, which type: _______________
- [ ] Which scene: _______________

---

### 2. Text Effects

**Evaluate:**
- [ ] Is there a tagline or key phrase? → YES = Strong candidate
- [ ] Does text need dramatic reveal? → YES = Moderate candidate
- [ ] Is brand playful/creative? → YES = Weak candidate
- [ ] None of above → SKIP

**If YES to any:**

**Options:**
- **Typewriter effect** - Characters appear one-by-one
  - Use when: Building suspense, tech brands, storytelling
  - Implementation: String slicing with interpolate

- **Word-by-word reveal** - Words fade in sequentially
  - Use when: Emphasis on each word, poetry, manifesto
  - Implementation: Split by words, stagger opacity

**Decision:**
- [ ] Include text effects: YES / NO
- [ ] If YES, which type: _______________
- [ ] Which text: _______________
- [ ] Which scene: _______________

---

### 3. Charts & Data Visualization

**Evaluate:**
- [ ] Does content include numbers/stats? → YES = Strong candidate
- [ ] Does content show growth/trends? → YES = Strong candidate
- [ ] Is brand data/analytics-focused? → YES = Moderate candidate
- [ ] None of above → SKIP

**If YES to any:**

**Options:**
- **Animated bar chart** - Bars grow from 0 to value
  - Use when: Comparing metrics, showing progress
  - Implementation: Spring animation per bar with stagger

- **Animated line chart** - Path draws over time
  - Use when: Showing trends, time-series data
  - Implementation: `evolvePath` from @remotion/paths

**Decision:**
- [ ] Include charts: YES / NO
- [ ] If YES, which type: _______________
- [ ] Data source: _______________
- [ ] Which scene: _______________

---

### 4. 3D Graphics

**Evaluate:**
- [ ] Is product physical/3D (hardware)? → YES = Strong candidate
- [ ] Does brand want premium/high-tech feel? → YES = Moderate candidate
- [ ] Is brand in gaming/design industry? → YES = Moderate candidate
- [ ] None of above → SKIP

**If YES to any:**

**Options:**
- **3D model display** - Show product in 3D
  - Use when: Physical products, industrial design
  - Implementation: @remotion/three + useGLTF

- **3D text/logo** - Rotating 3D typography
  - Use when: Premium brands, tech aesthetic
  - Implementation: @remotion/three + custom meshes

**Decision:**
- [ ] Include 3D graphics: YES / NO
- [ ] If YES, which type: _______________
- [ ] Asset needed: _______________
- [ ] Which scene: _______________

---

### 5. Visual Effects

**Evaluate:**

**Light Leaks:**
- [ ] Is brand cinematic/dramatic? → YES = Use light leaks
- [ ] Is brand minimal/clean? → NO = Skip

**Noise/Texture:**
- [ ] Does brand want organic/gritty feel? → YES = Use noise
- [ ] Is brand corporate/clean? → NO = Skip

**GIFs/Animated Images:**
- [ ] Does content include animated elements? → YES = Use AnimatedImage
- [ ] Is brand playful with animations? → YES = Consider

**Decision:**
- [ ] Include light leaks: YES / NO
- [ ] Include noise effects: YES / NO
- [ ] Include animated images: YES / NO
- [ ] If animated images, source: _______________

---

### 6. Maps (Mapbox)

**Evaluate:**
- [ ] Is product location-based? → YES = Strong candidate
- [ ] Does content mention geography/locations? → YES = Strong candidate
- [ ] Is brand travel/real-estate/logistics? → YES = Moderate candidate
- [ ] None of above → SKIP

**If YES to any:**

**Implementation:** Mapbox integration with @remotion/three

**Decision:**
- [ ] Include maps: YES / NO
- [ ] If YES, location: _______________
- [ ] Which scene: _______________

---

### 7. Captions/Subtitles

**Evaluate:**
- [ ] Is video for social media (sound-off viewing)? → YES = Strong candidate
- [ ] Is content complex/technical? → YES = Moderate candidate
- [ ] Is accessibility important? → YES = Moderate candidate
- [ ] None of above → SKIP

**If YES to any:**

**Options:**
- **TikTok-style captions** - Animated word highlights
- **Standard subtitles** - Bottom-aligned text

**Decision:**
- [ ] Include captions: YES / NO
- [ ] If YES, which style: _______________

---

### Validation Checkpoint

**You MUST complete this checklist before proceeding:**

- [ ] Audio visualization evaluated (YES/NO decision made)
- [ ] Text effects evaluated (YES/NO decision made)
- [ ] Charts evaluated (YES/NO decision made)
- [ ] 3D graphics evaluated (YES/NO decision made)
- [ ] Visual effects evaluated (YES/NO decision made)
- [ ] Maps evaluated (YES/NO decision made)
- [ ] Captions evaluated (YES/NO decision made)
- [ ] All decisions documented
- [ ] Features align with brand personality

**Cannot proceed to Step 9 without completing advanced features evaluation.**

---
```

**Lines:** ~200 lines

---

## Summary of Changes (Part 1)

### Sections Removed:
1. Quick Start (lines 37-112) - 75 lines removed
2. Complete Workflow Generated.tsx example (lines 266-774) - 508 lines removed
3. Advanced Features "how to" sections moved to Step 8 decision tree

**Total Removed:** ~580 lines

### Sections Added:
1. Introduction & Philosophy - 30 lines
2. Process Overview - 40 lines
3. Step 2: Brand Analysis - 150 lines
4. Step 3: Scene Design - 120 lines
5. Step 4: Animation Planning - 140 lines
6. Step 5: Transition Planning - 110 lines
7. Step 8: Advanced Features Decision - 200 lines

**Total Added:** ~790 lines

**Net Change:** +210 lines (but much higher quality, no template code)

---

## Next Steps

**Remaining sections to document:**
- Step 9: Code Structure Planning (NEW)
- Step 10: Write Remotion Code (restructure existing, remove examples)
- Step 11: Quality Validation (NEW - 30-item checklist)
- Step 12: Render Video (existing, minor updates)
- Part 3: API Reference (reorganize existing)
- Common Patterns (new, small snippets only)
- Anti-Patterns (new, based on existing "Common Mistakes")

---

# Part 2: Remaining Workflow Steps

## Section 11: Step 9 - Code Structure Planning

**Location in new structure:** After Step 8 (Advanced Features Decision)

**Type:** NEW section (mandatory planning phase before coding)

**Purpose:** Force agents to plan the code structure, imports, and component organization before writing a single line of code. Prevents copying templates.

**Content:**

```markdown
---

## Step 9: Code Structure Planning

**CRITICAL:** You MUST complete this planning phase before writing any code.

This step forces you to think about code organization, not just copy a template.

### 9.1: Plan Imports

Based on your decisions from Steps 3-8, determine which Remotion APIs and packages you'll need.

**Core Remotion (always needed):**
```typescript
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
```

**Animation APIs (based on Step 4 decisions):**
- Spring animations → `import { spring } from 'remotion';`
- Value interpolation → `import { interpolate } from 'remotion';`
- Color interpolation → `import { interpolateColors } from 'remotion';`
- Easing functions → `import { Easing } from 'remotion';`

**Sequencing (based on Step 3 decisions):**
- Sequential scenes → `import { Sequence } from 'remotion';`
- Parallel timing → `import { Series } from 'remotion';`
- Looping elements → `import { Loop } from 'remotion';`
- Freeze frames → `import { Freeze } from 'remotion';`

**Transitions (based on Step 5 decisions):**
```typescript
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
// Add others based on Step 5 plan
```

**Media (always needed for audio):**
```typescript
import { Audio } from '@remotion/media';
```

**Images (if using logo or screenshots):**
```typescript
import { Img } from 'remotion';
```

**Text utilities (if text-heavy design):**
```typescript
import { fitText } from '@remotion/layout-utils';
```

**Advanced Features (based on Step 8 decisions):**
- Audio visualization → `import { useAudioData, visualizeAudio } from '@remotion/media';`
- Text effects → `import { SlideWords, FadeWords } from '@remotion/animated-text';`
- Charts → `import { Bar, Pie, Line } from '@remotion/charts';` (hypothetical - use actual library)
- 3D graphics → `import { ThreeCanvas } from '@remotion/three';`
- Skia effects → `import { SkiaCanvas } from '@remotion/skia';`
- Lottie animations → `import { Lottie } from '@remotion/lottie';`
- Noise textures → `import { noise2D } from '@remotion/noise';`
- Shapes → `import { Circle, Rect, Triangle } from '@remotion/shapes';`
- Paths → `import { evolvePath } from '@remotion/paths';`

**Performance (for heavy videos):**
```typescript
import { OffthreadVideo } from 'remotion';
import { prefetch } from 'remotion';
```

**Checklist:**
- [ ] Listed all animation imports based on Step 4 plan
- [ ] Listed transition imports based on Step 5 plan
- [ ] Listed advanced feature imports based on Step 8 decisions
- [ ] No unused imports planned
- [ ] All imports match actual Remotion API (verified against API reference)

---

### 9.2: Plan Component Structure

Determine how to break down the video into components.

**Main Component:**
```typescript
export const Generated: React.FC<VideoProps> = ({
  content,
  branding,
  audio,
  metadata,
  duration,
}) => {
  // Main composition wrapper
  // Contains TransitionSeries or Sequence
  // Includes Audio components
  // Renders scene components
};
```

**Scene Components:**

Based on Step 3 (Scene Design), plan one component per scene:

```
Example plan (yours will be different):
- HookScene (0-3s) - Logo reveal
- ProblemScene (3-8s) - Pain point presentation
- SolutionScene (8-15s) - Product introduction
- FeaturesScene (15-25s) - Benefits showcase
- CTAScene (25-30s) - Call to action
```

**Each scene component signature:**
```typescript
const SceneName: React.FC<{
  // Props from VideoProps (destructured)
  title?: string;
  description?: string;
  logo?: string;
  colors: VideoProps['branding']['colors'];
  // Scene-specific props
  width: number;
  height: number;
}> = ({ props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene-specific animations using frame and fps

  return <AbsoluteFill>...</AbsoluteFill>;
};
```

**Subcomponents (if needed):**

For complex scenes, plan subcomponents:
```
Example:
- FeaturesScene
  └── FeatureItem (reusable for each feature)
- CTAScene
  └── PulsingButton (isolated animation)
```

**Checklist:**
- [ ] One component planned per scene from Step 3
- [ ] Component names are descriptive (not Scene1, Scene2)
- [ ] Props needed for each component listed
- [ ] Subcomponents identified if scenes are complex
- [ ] All components use React.FC with typed props

---

### 9.3: Plan Props and Data Flow

Determine how data flows from `VideoProps` to scene components.

**VideoProps Interface (from Root.tsx):**
```typescript
export interface VideoProps {
  content: {
    title: string;
    description: string;
    features: string[];
    heroImage?: string;
    domain: string;
  };
  branding: {
    logo: { url: string };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    font: string;
    theme: 'light' | 'dark';
  };
  audio: {
    music: { localPath: string };
    narration: { localPath: string; timecodes: any[] };
    beats: number[];
  };
  metadata: {
    domain: string;
    industry: string;
  };
  duration: number;
}
```

**Plan what each scene needs:**

Example plan:
```
HookScene:
- branding.logo.url (for logo display)
- branding.colors (for gradient background)
- content.title (for title reveal)
- width, height (responsive sizing)

ProblemScene:
- content.description (for problem statement)
- branding.colors (for styling)
- width, height

SolutionScene:
- content.title (product name)
- content.description (value proposition)
- branding.colors
- width, height

FeaturesScene:
- content.features (array to map over)
- branding.colors
- width, height

CTAScene:
- content.title or custom CTA text
- content.domain (website URL)
- branding.colors
- width, height
```

**Audio Props:**
```
Main component (Generated):
- audio.music.localPath → <Audio src={...} />
- audio.narration.localPath → <Audio src={...} />
- audio.beats → For beat-synced animations (pass to scenes if needed)
```

**Checklist:**
- [ ] Identified which VideoProps each scene needs
- [ ] Avoided passing entire VideoProps to scenes (destructure)
- [ ] Planned how to pass width/height from useVideoConfig
- [ ] Planned audio integration in main component
- [ ] Considered beat-sync (if Step 5 included beat-reactive transitions)

---

### 9.4: Plan Timing and Frame Calculations

Calculate exact frame ranges for each scene.

**Formula:**
```
durationInFrames = seconds * fps
```

**Default FPS:** 30 (verify with `const { fps } = useVideoConfig()`)

**Example calculation (30s video at 30fps = 900 frames):**

Based on Step 3 scene durations:
```
Scene 1 (Hook): 3s = 90 frames → from: 0, duration: 90
Scene 2 (Problem): 5s = 150 frames → from: 90, duration: 150
Scene 3 (Solution): 7s = 210 frames → from: 240, duration: 210
Scene 4 (Features): 10s = 300 frames → from: 450, duration: 300
Scene 5 (CTA): 5s = 150 frames → from: 750, duration: 150

Total: 900 frames (30s)
```

**With transitions (Step 5):**

If using TransitionSeries with 0.5s transitions (15 frames):
```
Scene 1: 90 frames
Transition: 15 frames
Scene 2: 150 frames
Transition: 15 frames
Scene 3: 210 frames
Transition: 15 frames
Scene 4: 300 frames
Transition: 15 frames
Scene 5: 150 frames

Total scenes: 900 frames
Total transitions: 60 frames (4 transitions × 15 frames)
Adjust scene durations to fit: 900 - 60 = 840 frames for scenes
```

**Checklist:**
- [ ] Calculated exact frame ranges for each scene
- [ ] Accounted for transition durations (if using TransitionSeries)
- [ ] Total frames match video duration (duration * fps)
- [ ] `from` values are cumulative (scene 2 starts where scene 1 ends)
- [ ] No frame gaps or overlaps

---

### 9.5: Plan Responsive Sizing

Determine how to make animations responsive to video dimensions.

**Video dimensions (from useVideoConfig):**
```typescript
const { width, height } = useVideoConfig();
// Default: 1920x1080 (Full HD)
```

**Responsive sizing strategy:**

**Font sizes (relative to height):**
```
Hero title: height * 0.12 (129px at 1080p)
Section heading: height * 0.09 (97px at 1080p)
Body text: height * 0.06 (65px at 1080p)
Caption: height * 0.04 (43px at 1080p)
```

**Spacing (relative to dimensions):**
```
Top/bottom padding: height * 0.1 (108px at 1080p)
Left/right padding: width * 0.05 (96px at 1920px)
Element gap: height * 0.06 (65px at 1080p)
```

**Logo size (relative to smaller dimension):**
```
logoSize = Math.min(width, height) * 0.35 (378px at 1080p)
```

**Dynamic text sizing (using fitText):**
```typescript
import { fitText } from '@remotion/layout-utils';

const maxWidth = width * 0.8; // 80% of video width

const { fontSize } = fitText({
  text: content.title,
  withinWidth: maxWidth,
  fontFamily: branding.font,
  fontWeight: 'bold',
});

// Use fontSize in style
```

**Checklist:**
- [ ] All font sizes use height-relative values
- [ ] All spacing uses dimension-relative values
- [ ] Logo and images use responsive sizing
- [ ] Long text uses fitText for dynamic sizing
- [ ] Tested that layout works at 1920x1080 (default)

---

### 9.6: Plan Animation Frame Logic

For each animation from Step 4, plan the frame-based logic.

**Animation Planning Template:**

For each animation:
1. **What animates?** (opacity, position, scale, rotation, color)
2. **Start/end values?** (from X to Y)
3. **Frame range?** (when does it happen)
4. **Timing function?** (spring, interpolate, easing)

**Example: Hook Scene Logo Reveal**

```
Animation: Logo fade in and scale up
- What: opacity (0→1), scale (0.5→1)
- Frame range: frame 0-60 (first 2 seconds)
- Timing: spring (physics-based, natural motion)

Code plan:
const opacity = spring({ frame, fps, from: 0, to: 1 });
const scale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 200 } });

style={{
  opacity,
  transform: `scale(${scale})`
}}
```

**Example: Features Scene Staggered Reveal**

```
Animation: Each feature slides in with delay
- What: opacity (0→1), translateX (-300→0)
- Frame range: Staggered by 40 frames (i * 40)
- Timing: spring

Code plan:
{features.map((feature, i) => {
  const delay = i * 40; // 1.33s stagger at 30fps

  const opacity = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1
  });

  const slideIn = spring({
    frame: frame - delay,
    fps,
    from: -300,
    to: 0
  });

  return (
    <div style={{
      opacity,
      transform: `translateX(${slideIn}px)`
    }}>
      {feature}
    </div>
  );
})}
```

**Example: CTA Scene Pulsing Button**

```
Animation: Button scales up/down continuously
- What: scale (1.0→1.1→1.0)
- Frame range: Entire scene duration
- Timing: Math.sin (smooth oscillation)

Code plan:
const pulse = 1 + Math.sin(frame / (fps * 0.5)) * 0.08;

style={{
  transform: `scale(${pulse})`
}}
```

**Checklist:**
- [ ] Planned frame logic for each animation from Step 4
- [ ] Chose appropriate timing function (spring vs interpolate vs Math)
- [ ] Calculated stagger delays (for sequential reveals)
- [ ] Considered scene-relative frames (frame - sceneStartFrame)
- [ ] All animations use `useCurrentFrame()` and `useVideoConfig()` (no hardcoded time)

---

### Validation Checkpoint

**You MUST complete this checklist before proceeding to Step 10:**

- [ ] All necessary imports planned (Step 9.1)
- [ ] Component structure designed (Step 9.2)
- [ ] Props and data flow mapped (Step 9.3)
- [ ] Frame timing calculated for all scenes (Step 9.4)
- [ ] Responsive sizing strategy defined (Step 9.5)
- [ ] Animation frame logic planned (Step 9.6)
- [ ] No template code referenced
- [ ] All decisions based on Steps 2-8 (brand-driven, not generic)

**Cannot proceed to Step 10 (Write Code) without completing code structure planning.**

---
```

**Lines:** ~280 lines

---

## Section 12: Step 10 - Write Remotion Code

**Location in new structure:** After Step 9 (Code Structure Planning)

**Type:** RESTRUCTURED section (remove complete example, add structure-only guidance)

**Changes:**
- Remove: 400-line Generated.tsx example (lines 266-774 in old SKILL.md)
- Add: Code structure guidelines with NO complete examples
- Add: References to Steps 2-9 (all decisions should be made already)
- Add: Small code patterns (10-15 lines max, isolated snippets)

**Content:**

```markdown
---

## Step 10: Write Remotion Code

**File:** `/Users/bella/Cooking/remotion/url-to-video-mcp/remotion-project/src/compositions/Generated.tsx`

**CRITICAL:** You are now writing the actual Remotion code based on ALL your planning from Steps 2-9.

- This is NOT a template to copy
- Every line must be intentional based on your design decisions
- If you find yourself writing generic code, STOP and revisit your planning

---

### 10.1: File Structure

**Required structure:**

```typescript
import React from 'remotion';
// Your planned imports from Step 9.1

import { VideoProps } from '../Root';

export const Generated: React.FC<VideoProps> = ({
  content,
  branding,
  audio,
  metadata,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Main composition return
  return (
    <AbsoluteFill style={{
      background: /* Your brand-specific background from Step 2 */,
      fontFamily: branding.font,
    }}>
      {/* Audio components */}
      {/* Scene components */}
    </AbsoluteFill>
  );
};

// Scene components below (from Step 9.2)
```

**Checklist:**
- [ ] File exports `Generated` component
- [ ] Imports match Step 9.1 plan
- [ ] Uses `VideoProps` interface
- [ ] Destructures props in function signature
- [ ] Calls `useCurrentFrame()` and `useVideoConfig()` in main component

---

### 10.2: Audio Integration

**Add audio components in main composition:**

```typescript
{/* Music */}
{audio.music?.localPath && <Audio src={audio.music.localPath} />}

{/* Narration */}
{audio.narration?.localPath && <Audio src={audio.narration.localPath} />}
```

**Optional - beat-reactive logic:**

If Step 5 included beat-synced transitions:

```typescript
const currentTime = frame / fps;

// Find if we're near a beat
const nearestBeat = audio.beats.find(beat =>
  Math.abs(beat - currentTime) < 0.033 // Within 1 frame
);

const onBeat = nearestBeat !== undefined;

// Pass onBeat to scenes or use for transitions
```

**Checklist:**
- [ ] Audio components added with conditional rendering
- [ ] Beat detection logic added (if Step 5 requires it)
- [ ] Audio files use `localPath` property

---

### 10.3: Scene Sequencing

**Choose sequencing approach based on Step 5 (Transition Planning):**

**Option A: TransitionSeries (if using @remotion/transitions):**

```typescript
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
// Other transition imports from Step 9.1

<TransitionSeries>
  {/* Scene 1 */}
  <TransitionSeries.Sequence durationInFrames={/* from Step 9.4 */}>
    <YourScene1Component />
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    presentation={fade()} // Or your planned transition from Step 5
    timing={linearTiming({ durationInFrames: 15 })}
  />

  {/* Scene 2 */}
  <TransitionSeries.Sequence durationInFrames={/* from Step 9.4 */}>
    <YourScene2Component />
  </TransitionSeries.Sequence>

  {/* Repeat for all scenes */}
</TransitionSeries>
```

**Option B: Sequence (if using manual transitions):**

```typescript
<Sequence from={0} durationInFrames={90}>
  <YourScene1Component />
</Sequence>

<Sequence from={90} durationInFrames={150}>
  <YourScene2Component />
</Sequence>

{/* Repeat for all scenes with calculated frame ranges from Step 9.4 */}
```

**Checklist:**
- [ ] Used TransitionSeries or Sequence (based on Step 5 decision)
- [ ] Frame ranges match Step 9.4 calculations
- [ ] Transitions match Step 5 plan
- [ ] All scenes accounted for

---

### 10.4: Implement Scene Components

**For each scene component from Step 9.2:**

**Structure:**

```typescript
const YourSceneName: React.FC<{
  // Props from Step 9.3
}> = ({ /* destructure props */ }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation logic from Step 9.6

  return (
    <AbsoluteFill style={{
      // Your brand-specific styles from Step 2
    }}>
      {/* Your scene content */}
    </AbsoluteFill>
  );
};
```

**Implement animations using planned logic from Step 9.6:**

- Use `spring()` for physics-based animations
- Use `interpolate()` for value mapping
- Use `Easing` for custom timing curves
- Apply responsive sizing from Step 9.5

**Example of implementing a planned animation:**

```typescript
// From Step 9.6: Logo fade in and scale up
const opacity = spring({ frame, fps, from: 0, to: 1 });
const scale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 200 } });

<div style={{
  opacity,
  transform: `scale(${scale})`
}}>
  <Img src={logo} />
</div>
```

**Use brand colors from Step 2:**

```typescript
// Correct - using extracted brand colors
<div style={{
  color: colors.accent,
  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
}}>
```

**NOT this:**
```typescript
// Wrong - hardcoded generic colors
<div style={{
  color: '#ffffff',
  background: 'linear-gradient(135deg, #0066FF, #003D99)',
}}>
```

**Checklist for each scene:**
- [ ] Component signature matches Step 9.2 plan
- [ ] Animations match Step 9.6 frame logic
- [ ] Uses brand colors from `colors` prop (Step 2)
- [ ] Uses responsive sizing from Step 9.5
- [ ] Returns AbsoluteFill wrapper
- [ ] No hardcoded values (all from props or calculations)

---

### 10.5: Implement Advanced Features

**If Step 8 decided to include advanced features, implement them now.**

**Refer to API Reference (Part 3) for each feature:**

- Audio visualization → See "Audio Visualization API"
- Text effects → See "Text Animation API"
- Charts → See "Charts and Data Visualization API"
- 3D graphics → See "3D Graphics with Three.js"
- Skia effects → See "Skia for Advanced Effects"
- Lottie → See "Lottie Animations"
- Maps → See "Mapbox Integration"
- Captions → See "Captions and Subtitles"

**DO NOT guess implementation - follow API Reference exactly.**

**Checklist:**
- [ ] All Step 8 decided features implemented
- [ ] Used correct imports from API Reference
- [ ] Followed API Reference code patterns
- [ ] Features integrate smoothly with scenes
- [ ] Advanced features enhance (not distract from) content

---

### 10.6: Styling with Tailwind

**Use Tailwind classes for layout and basic styling:**

```typescript
<div className="flex flex-col items-center justify-center p-24">
  {/* Content */}
</div>
```

**Combine with inline styles for animations:**

```typescript
<div
  className="text-center font-bold"
  style={{
    fontSize: height * 0.09, // Responsive from Step 9.5
    opacity, // Animation from Step 9.6
    color: colors.accent, // Brand color from Step 2
  }}
>
  {content.title}
</div>
```

**Tailwind is available (imported in Root.tsx):**
- Use for: layout (flex, grid), spacing (p-, m-), alignment, basic colors
- Don't use for: animations (use Remotion APIs), responsive sizing (use inline calculations)

**Checklist:**
- [ ] Used Tailwind for layout structure
- [ ] Used inline styles for dynamic values (sizes, colors, animations)
- [ ] No Tailwind animate classes (use Remotion animations instead)

---

### 10.7: Final Code Review

**Before saving the file, review:**

**Brand Alignment:**
- [ ] Uses extracted colors (not hardcoded generic colors)
- [ ] Uses extracted font (branding.font)
- [ ] Visual style matches brand personality (Step 2)

**Content-Driven:**
- [ ] Displays actual content from VideoProps
- [ ] Scene structure matches content needs (Step 3)
- [ ] No placeholder text or dummy content

**Animation Quality:**
- [ ] Animations match Step 4 plan
- [ ] Frame logic implemented correctly (Step 9.6)
- [ ] Smooth, natural motion (spring used where appropriate)
- [ ] No abrupt cuts (transitions planned in Step 5)

**Technical Correctness:**
- [ ] All imports exist and are correct
- [ ] No TypeScript errors (VideoProps used correctly)
- [ ] Frame calculations match Step 9.4
- [ ] Responsive sizing implemented (Step 9.5)

**Code Quality:**
- [ ] No repetitive code (use .map() for lists)
- [ ] Component names are descriptive
- [ ] Code is readable and well-organized
- [ ] No commented-out code or TODOs

**Checklist:**
- [ ] All of above reviews completed
- [ ] Code is unique to this brand/content (not generic template)
- [ ] Ready for Step 11 (Quality Validation)

---
```

**Lines:** ~260 lines (replaces 508-line example, net -248 lines)

---

## Section 13: Step 11 - Quality Validation

**Location in new structure:** After Step 10 (Write Remotion Code)

**Type:** NEW section (30-item mandatory quality checklist)

**Purpose:** Force agents to validate their work before rendering. Catches common mistakes and ensures brand alignment.

**Content:**

```markdown
---

## Step 11: Quality Validation

**MANDATORY:** You MUST complete this entire validation checklist before proceeding to Step 12 (Render).

This is the most important step - it prevents low-quality, generic videos.

---

### Validation Checklist

#### Part A: Brand Alignment (10 items)

- [ ] **1. Logo displayed correctly**
  - Logo from `branding.logo.url` is visible
  - Logo is not stretched or distorted
  - Logo appears in appropriate scene (usually hook or CTA)

- [ ] **2. Primary color used**
  - `branding.colors.primary` is the dominant color
  - Used in backgrounds, headings, or major elements
  - NOT replaced with hardcoded generic color

- [ ] **3. Secondary color used**
  - `branding.colors.secondary` is used for gradients or accents
  - Complements primary color
  - NOT replaced with hardcoded generic color

- [ ] **4. Accent color used**
  - `branding.colors.accent` is used for emphasis (CTAs, highlights)
  - Provides visual contrast
  - NOT replaced with hardcoded generic color

- [ ] **5. Background color correct**
  - `branding.colors.background` is used appropriately
  - Provides good contrast with text
  - Matches light/dark theme

- [ ] **6. Font family applied**
  - `branding.font` is set in root AbsoluteFill
  - All text inherits the correct font
  - Font is readable and matches brand

- [ ] **7. Color contrast sufficient**
  - Text is readable against backgrounds
  - Light theme: dark text on light backgrounds
  - Dark theme: light text on dark backgrounds
  - Accent colors provide enough contrast

- [ ] **8. Visual style matches brand personality**
  - Professional brand → clean, minimal animations
  - Playful brand → bouncy, dynamic animations
  - Bold brand → dramatic, high-energy effects
  - (Verify against Step 2 brand analysis)

- [ ] **9. No hardcoded colors**
  - Search code for '#' (hex colors)
  - All colors come from `colors` prop
  - Exception: rgba() for opacity variants is OK

- [ ] **10. No generic placeholder branding**
  - No "Example Company" or "Product Name" text
  - No generic blue gradients (#0066FF)
  - Everything is specific to this URL/brand

---

#### Part B: Content Accuracy (5 items)

- [ ] **11. Title displayed correctly**
  - `content.title` appears in video
  - Spelling and capitalization match extracted content
  - Positioned prominently

- [ ] **12. Description used**
  - `content.description` or adapted version appears
  - Accurately represents the product/service
  - Not replaced with generic marketing copy

- [ ] **13. Features shown**
  - Displays actual features from `content.features[]`
  - Limited to 3-5 most important features (not all)
  - Features are benefits-focused, not just specs

- [ ] **14. Domain/URL shown**
  - `content.domain` appears in CTA scene
  - Correct domain (not "example.com")
  - Readable font size

- [ ] **15. Content matches narration**
  - Visual content aligns with script timing
  - Key words appear on screen when spoken
  - No content-narration mismatch

---

#### Part C: Animation Quality (5 items)

- [ ] **16. Smooth animations**
  - All animations use spring() or interpolate()
  - No abrupt jumps or cuts within scenes
  - Natural, physics-based motion

- [ ] **17. Varied animations**
  - Each scene uses different animation types
  - Not repetitive (e.g., all scenes fade in)
  - Creative and unique to this content

- [ ] **18. Correct frame timing**
  - Animations start/end at planned frames (Step 9.4)
  - Scene durations match calculations
  - Total video length matches requested duration

- [ ] **19. Responsive animations**
  - Animations work at 1920x1080 resolution
  - Elements don't overflow or get cut off
  - Text is readable (uses responsive sizing from Step 9.5)

- [ ] **20. Beat synchronization (if applicable)**
  - Transitions occur on music beats (if Step 5 planned this)
  - Visual emphasis matches narration emphasis
  - Audio-visual sync is tight

---

#### Part D: Technical Correctness (5 items)

- [ ] **21. No TypeScript errors**
  - All props typed correctly
  - VideoProps interface used
  - No `any` types (unless unavoidable)

- [ ] **22. All imports valid**
  - Imports match Step 9.1 plan
  - No unused imports
  - Imports are from correct packages (@remotion/...)

- [ ] **23. Audio files referenced**
  - `audio.music.localPath` used in <Audio />
  - `audio.narration.localPath` used in <Audio />
  - Conditional rendering (&&) for missing files

- [ ] **24. Composition registered**
  - Generated.tsx is imported in Root.tsx
  - <Composition id=\"Generated\" /> exists in Root.tsx
  - Default props match VideoProps interface

- [ ] **25. No console errors expected**
  - No obvious runtime errors (missing props, undefined values)
  - Conditional rendering for optional props (logo, heroImage)
  - Frame calculations won't cause NaN or Infinity

---

#### Part E: Production Quality (5 items)

- [ ] **26. Eye-catching hook**
  - First 3 seconds grab attention
  - Dramatic reveal or bold statement
  - Logo/title is impactful

- [ ] **27. Clear visual hierarchy**
  - Important elements are larger/brighter
  - Text hierarchy: title > heading > body > caption
  - Eye is guided through the composition

- [ ] **28. Professional polish**
  - No rough edges or unfinished elements
  - Consistent styling throughout
  - Looks like a high-quality production

- [ ] **29. Clear call to action**
  - CTA scene is persuasive
  - Button/text is prominent
  - URL is displayed clearly

- [ ] **30. Aligns with video goal**
  - Product launch → exciting, aspirational
  - Explainer → clear, informative
  - Social promo → bold, shareable
  - (Verify against user's original request)

---

### Validation Result

**Count your checkmarks:**

- **30/30:** Excellent - proceed to Step 12 (Render)
- **25-29:** Good - fix remaining issues before rendering
- **20-24:** Needs work - revisit planning steps (especially Steps 2-5)
- **<20:** STOP - major issues detected, restart from Step 2

**You MUST have at least 25/30 checked to proceed to rendering.**

If you have unchecked items:
1. Identify which step caused the issue (Step 2-10)
2. Go back and fix the root cause
3. Update the code in Generated.tsx
4. Re-run this validation

**Do not skip validation to "save time" - rendering a low-quality video wastes more time than fixing issues now.**

---
```

**Lines:** ~220 lines

---

## Section 14: Step 12 - Render Video

**Location in new structure:** After Step 11 (Quality Validation)

**Type:** EXISTING section (minor updates)

**Changes:**
- Add reference to Step 11 validation
- Clarify output path
- Update expected result format

**Content:**

```markdown
---

## Step 12: Render Video

**Prerequisites:**
- ✅ Step 11 validation completed (minimum 25/30 items)
- ✅ Generated.tsx written and saved
- ✅ Composition registered in Root.tsx

---

### 12.1: Call render_video MCP Tool

```typescript
render_video({
  inputProps: {
    content: {
      title: extracted.content.title,
      description: extracted.content.description,
      features: extracted.content.features,
      heroImage: extracted.content.heroImage,
      domain: extracted.metadata.domain,
    },
    branding: {
      logo: extracted.branding.logo,
      colors: extracted.branding.colors,
      font: extracted.branding.font,
      theme: extracted.branding.theme,
    },
    audio: {
      music: audio.music,
      narration: audio.narration,
      beats: audio.beats,
    },
    metadata: {
      domain: extracted.metadata.domain,
      industry: extracted.metadata.industry,
    },
    duration: 30, // or user-requested duration
  },
  outputFileName: \"product-name-promo\" // descriptive filename
})
```

**The tool will:**
1. Bundle the Remotion project
2. Render the Generated composition
3. Save the video to `~/Videos/url-to-video/[outputFileName].mp4`

**Typical render time:** 2-5 minutes for a 30-second video

---

### 12.2: Return Result to User

**After rendering succeeds, provide this summary:**

```
✨ Video rendered successfully!

📹 File: [full path to video]
⏱️ Duration: [duration] seconds
📦 Size: [fileSize in MB]

The video features:
• Custom-designed scenes tailored to [brand name]
• Music: [style] instrumental background
• Narration: Professional AI voiceover
• Beat-synced transitions [if applicable]
• [Number] unique animated scenes
• [List any advanced features used from Step 8]

You can find the video at: [full path]
```

**Example:**

```
✨ Video rendered successfully!

📹 File: ~/Videos/url-to-video/tabstack-promo.mp4
⏱️ Duration: 30 seconds
📦 Size: 12.5 MB

The video features:
• Custom-designed scenes tailored to TabStack
• Music: Lo-fi instrumental background
• Narration: Professional AI voiceover
• Beat-synced transitions
• 5 unique animated scenes
• Audio visualization on features scene
• TikTok-style captions for social media

You can find the video at: /Users/username/Videos/url-to-video/tabstack-promo.mp4
```

---

### 12.3: Troubleshooting Render Errors

**Common errors:**

**"Composition 'Generated' not found"**
- Fix: Verify Generated composition is registered in Root.tsx
- Check: Import statement and <Composition> block exist

**"Cannot find module '@remotion/transitions'"**
- Fix: Missing package - run `npm install @remotion/transitions` in remotion-project/
- Check: All advanced feature packages installed (Step 8 features)

**"Invalid props"**
- Fix: Ensure inputProps match VideoProps interface exactly
- Check: All required fields present (content, branding, audio, metadata, duration)

**"Audio file not found"**
- Fix: Verify audio.music.localPath and audio.narration.localPath are correct
- Check: Files exist at specified paths

**"Render timeout"**
- Fix: Video may be too complex (too many effects)
- Check: Remove heavy Skia/Three.js effects or reduce duration

---
```

**Lines:** ~110 lines (minor additions to existing ~95 lines, net +15 lines)

---

# Part 3: API Reference & Patterns

## Section 15: API Reference Reorganization

**Location in new structure:** After Step 12 (becomes Part 3)

**Type:** REORGANIZED (existing content from lines 1433-2400, restructured by category)

**Purpose:** Make API Reference easier to navigate and search. Agents can reference specific APIs when implementing features from Steps 8-10.

**Changes:**
- Group by category (not alphabetical)
- Add "When to use" for each API
- Keep existing code examples (these are OK - they're API docs, not templates)
- Add cross-references to workflow steps

**Content structure:**

```markdown
---

# Part 3: API Reference

**Purpose:** Detailed API documentation for implementing features planned in Steps 8-10.

**How to use:**
- Reference specific APIs when writing code in Step 10
- Consult when evaluating advanced features in Step 8
- Do NOT copy-paste entire sections - use relevant parts only

---

## Core Remotion APIs

### useCurrentFrame()

**When to use:** In every scene component to get current frame number

**Returns:** `number` - Current frame (0-based)

**Example:**
```typescript
const frame = useCurrentFrame();
const opacity = frame < 30 ? frame / 30 : 1; // Fade in over first 30 frames
```

---

### useVideoConfig()

**When to use:** To get video dimensions, FPS, and duration

**Returns:** `{ fps: number; width: number; height: number; durationInFrames: number }`

**Example:**
```typescript
const { fps, width, height } = useVideoConfig();
const logoSize = Math.min(width, height) * 0.3; // Responsive sizing
```

---

### spring()

**When to use:** For natural, physics-based animations (preferred for most animations)

**Parameters:**
- `frame` - Current frame
- `fps` - Frames per second
- `from` - Start value (default: 0)
- `to` - End value (default: 1)
- `config` - Spring configuration (damping, mass, stiffness, overshootClamping)

**Example:**
```typescript
const scale = spring({
  frame,
  fps,
  from: 0.5,
  to: 1,
  config: {
    damping: 200, // Higher = less bounce
    mass: 1,
    stiffness: 100,
  },
});
```

**Common damping values:**
- `damping: 200` - Very stiff, minimal bounce (professional)
- `damping: 100` - Moderate bounce (balanced)
- `damping: 50` - High bounce (playful)

---

### interpolate()

**When to use:** For linear value mapping, custom timing curves, or non-physics animations

**Parameters:**
- `input` - Input value (usually `frame`)
- `inputRange` - Array of input milestones `[start, end]`
- `outputRange` - Array of output values `[startValue, endValue]`
- `options` - Extrapolation and easing

**Example:**
```typescript
const opacity = interpolate(
  frame,
  [0, 30, 90, 120], // Frame milestones
  [0, 1, 1, 0], // Fade in, hold, fade out
  {
    extrapolateLeft: 'clamp', // Don't go below 0
    extrapolateRight: 'clamp', // Don't go above 1
  }
);
```

**With easing:**
```typescript
import { Easing } from 'remotion';

const position = interpolate(
  frame,
  [0, 60],
  [0, 500],
  {
    easing: Easing.bezier(0.42, 0, 0.58, 1), // Ease in-out
  }
);
```

---

[Continue with all other core APIs: interpolateColors, Easing, AbsoluteFill, Sequence, Series, Loop, Freeze, Still, etc.]

[Keep existing explanations and examples from old SKILL.md lines 1433+]

---

## Media APIs

### Audio (from @remotion/media)

**When to use:** For music, narration, or sound effects

**Example:**
```typescript
import { Audio } from '@remotion/media';

<Audio src={audio.music.localPath} volume={0.8} />
```

**Props:**
- `src` - Audio file path
- `volume` - 0.0 to 1.0 (default: 1.0)
- `startFrom` - Frame to start playback
- `endAt` - Frame to end playback

---

### Img

**When to use:** For logos, screenshots, or images

**Example:**
```typescript
import { Img } from 'remotion';

<Img
  src={branding.logo.url}
  style={{
    width: 300,
    height: 300,
    objectFit: 'contain',
  }}
/>
```

**IMPORTANT:** Use `Img` instead of `<img>` for better rendering performance.

---

### OffthreadVideo

**When to use:** For embedding video clips (better performance than `<Video>`)

[Include existing documentation]

---

[Continue with all media APIs]

---

## Layout & Text APIs

### fitText() (from @remotion/layout-utils)

**When to use:** When text length is variable and must fit within a fixed width

**Example:**
```typescript
import { fitText } from '@remotion/layout-utils';

const { fontSize } = fitText({
  text: content.title,
  withinWidth: width * 0.8,
  fontFamily: branding.font,
  fontWeight: 'bold',
});

<div style={{ fontSize }}>{content.title}</div>
```

---

[Continue with layout APIs]

---

## Transition APIs (from @remotion/transitions)

### TransitionSeries

**When to use:** For smooth scene transitions (Step 5 decision)

**Example:**
```typescript
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <Scene1 />
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />

  <TransitionSeries.Sequence durationInFrames={150}>
    <Scene2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

---

### Available Transitions

**fade()** - Cross-fade between scenes

**slide({ direction })** - Slide in from direction
- Directions: `'from-left'`, `'from-right'`, `'from-top'`, `'from-bottom'`

**wipe({ direction })** - Wipe transition
- Directions: `'from-left'`, `'from-right'`, `'from-top'`, `'from-bottom'`

**clockWipe()** - Circular wipe (clock hand motion)

**flip({ direction })** - 3D flip
- Directions: `'horizontal'`, `'vertical'`

[Include all transition types with examples]

---

## Advanced Feature APIs

### Audio Visualization (from @remotion/media)

**When to use:** Decided in Step 8 (music videos, audio-heavy content)

**APIs:**
- `useAudioData()` - Get audio frequency data
- `visualizeAudio()` - Process audio data for visualization

**Referenced from:** remotion-best-practices/rules/audio-visualization.md

[Include existing documentation with reference to where it's used in workflow]

---

### 3D Graphics (from @remotion/three)

**When to use:** Decided in Step 8 (product showcases, tech demos)

**APIs:**
- `ThreeCanvas` - Canvas for Three.js content
- Integration with React Three Fiber

**Referenced from:** remotion-best-practices/rules/3d.md

[Include existing documentation]

---

### Skia Effects (from @remotion/skia)

**When to use:** Decided in Step 8 (custom graphics, blur, gradients)

**Referenced from:** remotion-best-practices/rules/ (Skia-related)

[Include existing documentation]

---

### Lottie Animations (from @remotion/lottie)

**When to use:** Decided in Step 8 (existing animations, character animations)

**Referenced from:** remotion-best-practices/rules/lottie.md

[Include existing documentation]

---

### Charts (hypothetical - use actual charting library)

**When to use:** Decided in Step 8 (data-heavy content, statistics)

[Include chart examples]

---

### Captions/Subtitles

**When to use:** Decided in Step 8 (social media videos, accessibility)

**Referenced from:** remotion-best-practices/rules/subtitles.md

[Include existing documentation]

---

### Mapbox Integration

**When to use:** Decided in Step 8 (location-based content)

**Referenced from:** remotion-best-practices/rules/maps.md

[Include existing documentation]

---

## Performance APIs

### Prefetch

**When to use:** For preloading large assets (images, videos)

[Include existing documentation]

---

### getRemotionEnvironment()

**When to use:** Detect rendering vs preview mode

[Include existing documentation]

---

## Utility APIs

### getInputProps()

**When to use:** Access composition props from CLI

[Include existing documentation]

---

### getVideoMetadata()

**When to use:** Get video file dimensions and duration

**Referenced from:** remotion-best-practices/rules/get-video-duration.md, get-video-dimensions.md

[Include existing documentation]

---

### getAudioData()

**When to use:** Get audio file duration

**Referenced from:** remotion-best-practices/rules/get-audio-duration.md

[Include existing documentation]

---
```

**Lines:** ~400 lines (reorganized from existing ~1000 lines, condensed with cross-references)

**Changes:**
- Grouped by category (Core, Media, Layout, Transitions, Advanced, Performance, Utility)
- Added "When to use" for each API
- Added cross-references to remotion-best-practices rules
- Kept essential examples, removed redundant ones
- Added references to workflow steps (Step 8, Step 10, etc.)

---

## Section 16: Common Patterns

**Location in new structure:** After API Reference

**Type:** NEW section (replaces scattered examples throughout old SKILL.md)

**Purpose:** Provide small, isolated code snippets for common animation patterns. NOT full scenes.

**Content:**

```markdown
---

## Common Patterns

**Purpose:** Small code snippets (10-20 lines max) for common animation patterns.

**IMPORTANT:** These are NOT templates to copy. Use as reference for specific techniques only.

---

### Pattern: Fade In

```typescript
const opacity = spring({ frame, fps, from: 0, to: 1 });

<div style={{ opacity }}>
  {content}
</div>
```

---

### Pattern: Slide In from Left

```typescript
const translateX = spring({ frame, fps, from: -500, to: 0 });

<div style={{ transform: `translateX(${translateX}px)` }}>
  {content}
</div>
```

---

### Pattern: Scale and Fade Combined

```typescript
const opacity = spring({ frame, fps, from: 0, to: 1 });
const scale = spring({ frame, fps, from: 0.8, to: 1 });

<div style={{
  opacity,
  transform: `scale(${scale})`,
}}>
  {content}
</div>
```

---

### Pattern: Staggered List Reveal

```typescript
{items.map((item, i) => {
  const delay = i * 20; // Frames between each item

  const opacity = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
  });

  return (
    <div key={i} style={{ opacity }}>
      {item}
    </div>
  );
})}
```

---

### Pattern: Typewriter Text Effect

```typescript
const charsRevealed = Math.floor(
  interpolate(frame, [0, 60], [0, text.length], {
    extrapolateRight: 'clamp',
  })
);

<div>
  {text.substring(0, charsRevealed)}
</div>
```

---

### Pattern: Pulsing Element

```typescript
const pulse = 1 + Math.sin(frame / 15) * 0.1; // Oscillate between 0.9 and 1.1

<div style={{ transform: `scale(${pulse})` }}>
  {content}
</div>
```

---

### Pattern: Gradient Background with Animation

```typescript
const angle = interpolate(frame, [0, 150], [0, 360]);

<div style={{
  background: `linear-gradient(${angle}deg, ${colors.primary}, ${colors.secondary})`,
}}>
  {content}
</div>
```

---

### Pattern: Beat-Reactive Animation

```typescript
const currentTime = frame / fps;

const nearestBeat = audio.beats.find(beat =>
  Math.abs(beat - currentTime) < 0.033
);

const scale = nearestBeat ? 1.2 : 1;

<div style={{ transform: `scale(${scale})` }}>
  {content}
</div>
```

---

### Pattern: Responsive Text Sizing

```typescript
const { fontSize } = fitText({
  text: content.title,
  withinWidth: width * 0.8,
  fontFamily: branding.font,
  fontWeight: 'bold',
});

<div style={{ fontSize }}>
  {content.title}
</div>
```

---

### Pattern: Conditional Animation (appears mid-scene)

```typescript
// Scene is 150 frames, text appears at frame 50

const relativeFrame = frame - 50; // Starts at -50, becomes 0 at frame 50

const opacity = relativeFrame < 0
  ? 0
  : spring({ frame: relativeFrame, fps, from: 0, to: 1 });

<div style={{ opacity }}>
  {content}
</div>
```

---

**Remember:** These are individual techniques. Combine them creatively based on your Step 4 (Animation Planning) decisions.

---
```

**Lines:** ~130 lines

---

## Section 17: Anti-Patterns

**Location in new structure:** After Common Patterns

**Type:** NEW section (based on existing "Common Mistakes to Avoid")

**Purpose:** Explicitly show what NOT to do. Helps agents avoid common pitfalls.

**Content:**

```markdown
---

## Anti-Patterns (What NOT to Do)

**Purpose:** Common mistakes that result in low-quality videos or broken renders.

---

### ❌ Anti-Pattern 1: Using Hardcoded Colors

**Problem:** Ignores extracted brand colors, creates generic-looking videos

**Wrong:**
```typescript
<div style={{
  background: 'linear-gradient(135deg, #0066FF, #003D99)',
  color: '#FFFFFF',
}}>
```

**Correct:**
```typescript
<div style={{
  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
  color: colors.background,
}}>
```

---

### ❌ Anti-Pattern 2: Copying Template Code

**Problem:** Results in generic videos that look identical for different brands

**Wrong:**
- Copying the entire Generated.tsx example
- Using hardcoded scene structure (5 scenes, specific durations)
- Generic animations that don't match brand personality

**Correct:**
- Design scenes based on Step 3 (Scene Design)
- Plan animations based on Step 4 (Animation Planning)
- Create unique code for each brand/content

---

### ❌ Anti-Pattern 3: Using CSS Animations

**Problem:** CSS animations auto-play and cause flickering/timing issues in Remotion

**Wrong:**
```typescript
<div className="animate-bounce"> {/* Tailwind animate class */}
```

```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide { animation: slideIn 1s; } /* Auto-playing CSS */
```

**Correct:**
```typescript
const translateX = spring({ frame, fps, from: -500, to: 0 });

<div style={{ transform: `translateX(${translateX}px)` }}>
```

---

### ❌ Anti-Pattern 4: Not Using useCurrentFrame()

**Problem:** Animations won't be tied to video timeline, causes render issues

**Wrong:**
```typescript
const [opacity, setOpacity] = useState(0);

useEffect(() => {
  setTimeout(() => setOpacity(1), 1000); // Time-based, not frame-based
}, []);
```

**Correct:**
```typescript
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const opacity = spring({ frame, fps, from: 0, to: 1 });
```

---

### ❌ Anti-Pattern 5: Ignoring Responsive Sizing

**Problem:** Text overflows or is too small, elements get cut off

**Wrong:**
```typescript
<div style={{ fontSize: 72 }}> {/* Fixed pixel size */}
  {content.title}
</div>
```

**Correct:**
```typescript
const { width, height } = useVideoConfig();

const { fontSize } = fitText({
  text: content.title,
  withinWidth: width * 0.8,
  fontFamily: branding.font,
  fontWeight: 'bold',
});

<div style={{ fontSize }}>
  {content.title}
</div>
```

---

### ❌ Anti-Pattern 6: Skipping Planning Steps

**Problem:** Results in poor design decisions, requires rework

**Wrong:**
- Going straight from Step 1 (Extract) to Step 10 (Write Code)
- Skipping Step 2 (Brand Analysis)
- Skipping Steps 3-5 (Scene/Animation/Transition Planning)
- Skipping Step 8 (Advanced Features Evaluation)

**Correct:**
- Follow all 12 steps in order
- Complete validation checkpoints
- Make design decisions before coding

---

### ❌ Anti-Pattern 7: Using Framer Motion or react-spring

**Problem:** These libraries are not compatible with Remotion's rendering

**Wrong:**
```typescript
import { motion } from 'framer-motion';

<motion.div animate={{ opacity: 1 }}> {/* Won't render correctly */}
```

**Correct:**
```typescript
import { spring } from 'remotion';

const opacity = spring({ frame, fps, from: 0, to: 1 });

<div style={{ opacity }}>
```

---

### ❌ Anti-Pattern 8: Not Checking Advanced Features

**Problem:** Missing opportunities for high-quality visuals

**Wrong:**
- Skipping Step 8 (Advanced Features Decision)
- Assuming advanced features are "too complex"
- Using basic animations when content calls for more

**Correct:**
- Evaluate all 7 advanced feature categories in Step 8
- Use features when they enhance the content
- Reference API documentation for implementation

---

### ❌ Anti-Pattern 9: Hardcoding Frame Numbers

**Problem:** Breaks when video duration changes

**Wrong:**
```typescript
<Sequence from={0} durationInFrames={90}> {/* Hardcoded */}
<Sequence from={90} durationInFrames={150}> {/* Hardcoded */}
```

**Correct:**
```typescript
const hookDuration = 3 * fps; // Duration from Step 3
const problemDuration = 5 * fps;

<Sequence from={0} durationInFrames={hookDuration}>
<Sequence from={hookDuration} durationInFrames={problemDuration}>
```

---

### ❌ Anti-Pattern 10: Skipping Quality Validation

**Problem:** Renders low-quality video, wastes time re-rendering

**Wrong:**
- Going straight from Step 10 (Write Code) to Step 12 (Render)
- Skipping Step 11 (Quality Validation)
- Not checking brand alignment, content accuracy, or animation quality

**Correct:**
- Complete all 30 validation checklist items (Step 11)
- Fix issues before rendering
- Achieve minimum 25/30 score

---

### ❌ Anti-Pattern 11: Missing Audio Files

**Problem:** Render fails or produces silent video

**Wrong:**
```typescript
<Audio src={audio.music.localPath} /> {/* No conditional check */}
```

**Correct:**
```typescript
{audio.music?.localPath && <Audio src={audio.music.localPath} />}
{audio.narration?.localPath && <Audio src={audio.narration.localPath} />}
```

---

### ❌ Anti-Pattern 12: Not Registering Composition

**Problem:** "Composition not found" error when rendering

**Wrong:**
- Writing Generated.tsx but forgetting to update Root.tsx

**Correct:**
- Always register composition in Root.tsx:
```typescript
import { Generated } from './compositions/Generated';

<Composition
  id="Generated"
  component={Generated}
  durationInFrames={900}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ /* ... */ }}
/>
```

---
```

**Lines:** ~200 lines

---

# Final Summary

## Complete Line Count Changes

### Sections Removed (Total: ~580 lines)
1. **Quick Start** (lines 37-112) - 75 lines
   - Removed: Generic quick start that encourages skipping planning
2. **Complete Workflow Example** (lines 266-774) - 508 lines
   - Removed: Full Generated.tsx example that agents copy as template

### Sections Added (Total: ~1,310 lines)
1. **Introduction & Philosophy** - 30 lines NEW
2. **Process Overview** - 40 lines NEW
3. **Step 2: Brand Analysis** - 150 lines NEW (mandatory design phase)
4. **Step 3: Scene Design** - 120 lines NEW (mandatory design phase)
5. **Step 4: Animation Planning** - 140 lines NEW (mandatory design phase)
6. **Step 5: Transition Planning** - 110 lines NEW (mandatory design phase)
7. **Step 6: Write Script** - +25 lines (existing + improvements)
8. **Step 7: Generate Audio** - +35 lines (existing + improvements)
9. **Step 8: Advanced Features Decision** - 200 lines NEW (mandatory evaluation)
10. **Step 9: Code Structure Planning** - 280 lines NEW (mandatory before coding)
11. **Step 10: Write Remotion Code** - 260 lines (replaces 508-line example, -248 net)
12. **Step 11: Quality Validation** - 220 lines NEW (30-item checklist)
13. **Step 12: Render Video** - +15 lines (existing + improvements)
14. **API Reference** - -600 lines (reorganized, condensed, cross-referenced)
15. **Common Patterns** - 130 lines NEW (isolated snippets)
16. **Anti-Patterns** - 200 lines NEW (what NOT to do)

### Net Change
- **Total removed:** 580 lines
- **Total added:** 1,310 lines
- **Net change:** +730 lines

### Quality Improvements
- **Mandatory design phases:** 5 (Steps 2-5, Step 8) - 720 lines
- **Mandatory planning phase:** 1 (Step 9) - 280 lines
- **Mandatory validation:** 1 (Step 11) - 220 lines
- **Total quality enforcement:** 1,220 lines of mandatory steps
- **Template code removed:** 508 lines (Generated.tsx example)
- **Small patterns added:** 130 lines (isolated snippets only)

---

## File Structure Comparison

### Old Structure (2,489 lines)
```
1. Introduction & Overview (1-36)
2. Quick Start (37-112) ❌ REMOVED
3. When to Use (113-157)
4. Video Capabilities (158-192)
5. Complete Workflow (193-265)
   - Step 1: Extract (266-299)
   - Step 2: Generate Script (300-485) [includes long example]
   - Step 3: Analyze & Design (486-545) [minimal guidance]
   - Step 4: Design Scenes (546-600) [minimal guidance]
   - Step 5: Generate Audio (601-660)
   - Step 6: Write Remotion Code (661-774) ❌ FULL EXAMPLE TO COPY
   - Step 7: Register Composition (775-828)
   - Step 8: Render (829-878)
6. Core Features (879-1018) [comes AFTER workflow, often skipped]
7. Advanced Techniques (1019-1429) [buried at end, ignored]
8. API Reference (1433-2400) [huge, unorganized]
9. Tips for Success (2401-2450)
10. Common Mistakes (2451-2489)
```

**Problems:**
- Quick Start encourages skipping planning (line 37)
- Template example invites copying (line 266-774, 508 lines)
- No brand analysis phase
- No scene/animation planning phases
- Core features come AFTER workflow (agents skip)
- Advanced features buried at end (agents ignore)
- No validation checklist
- API Reference is massive and unorganized

---

### New Structure (~3,220 lines)
```
# Part 1: Introduction & Overview

1. Introduction & Philosophy (NEW - 30 lines)
   - Quality-first approach
   - No template copying
   - Brand-driven design

2. Process Overview (NEW - 40 lines)
   - 12-step workflow summary
   - Mandatory design phases highlighted
   - Time investment expectations

3. When to Use (existing ~50 lines)

4. Video Capabilities (existing ~40 lines)

---

# Part 2: Complete Workflow (12 Steps)

## Planning Phase (Steps 1-5)

5. Step 1: Extract Content (existing ~70 lines)
   - No changes (works well)

6. Step 2: Brand Analysis (NEW - 150 lines) ✅ MANDATORY DESIGN
   - Analyze personality, style, tone
   - Document visual direction
   - Validation checkpoint

7. Step 3: Scene Design (NEW - 120 lines) ✅ MANDATORY DESIGN
   - Determine scene count & structure
   - Define scene purposes
   - Calculate durations
   - Validation checkpoint

8. Step 4: Animation Planning (NEW - 140 lines) ✅ MANDATORY DESIGN
   - Choose animation types for each scene
   - Match animations to brand personality
   - Avoid repetition
   - Validation checkpoint

9. Step 5: Transition Planning (NEW - 110 lines) ✅ MANDATORY DESIGN
   - Select transition types
   - Plan timing
   - Consider beat sync
   - Validation checkpoint

## Content Creation Phase (Steps 6-7)

10. Step 6: Write Script (existing + 25 lines)
    - Story arc structure
    - Remove complete script examples
    - Add script templates instead

11. Step 7: Generate Audio (existing + 35 lines)
    - Music style selection logic
    - Beat detection explanation
    - Audio sync tips

## Advanced Features Phase (Step 8)

12. Step 8: Advanced Features Decision (NEW - 200 lines) ✅ MANDATORY EVALUATION
    - 7 feature categories with decision trees
    - When to use each feature
    - Validation checkpoint
    - Prevents ignoring advanced features

## Implementation Phase (Steps 9-12)

13. Step 9: Code Structure Planning (NEW - 280 lines) ✅ MANDATORY BEFORE CODING
    - Plan imports
    - Plan component structure
    - Plan props & data flow
    - Plan frame timing
    - Plan responsive sizing
    - Plan animation logic
    - Validation checkpoint
    - Prevents jumping straight to code

14. Step 10: Write Remotion Code (260 lines, -248 net)
    - ❌ REMOVED: 508-line Generated.tsx example
    - ✅ ADDED: Code structure guidelines
    - ✅ ADDED: Implementation checklist
    - ✅ ADDED: References to Steps 2-9
    - Small patterns only (10-20 lines max)

15. Step 11: Quality Validation (NEW - 220 lines) ✅ MANDATORY BEFORE RENDER
    - 30-item validation checklist
    - Brand alignment (10 items)
    - Content accuracy (5 items)
    - Animation quality (5 items)
    - Technical correctness (5 items)
    - Production quality (5 items)
    - Minimum 25/30 required to render
    - Prevents low-quality renders

16. Step 12: Render Video (existing + 15 lines)
    - Reference to Step 11 validation
    - Updated result format
    - Troubleshooting guide

---

# Part 3: API Reference & Patterns

17. API Reference (reorganized, -600 net)
    - Grouped by category (Core, Media, Layout, Transitions, Advanced, Performance, Utility)
    - Added "When to use" for each API
    - Cross-references to workflow steps
    - Cross-references to remotion-best-practices rules
    - Condensed redundant examples

18. Common Patterns (NEW - 130 lines)
    - ✅ SMALL snippets only (10-20 lines max)
    - Fade in, slide, scale, stagger, typewriter, pulse, etc.
    - NOT full scenes or templates
    - Reference techniques only

19. Anti-Patterns (NEW - 200 lines)
    - ❌ What NOT to do
    - 12 common mistakes with explanations
    - Shows wrong vs correct code
    - Prevents common pitfalls

---

**Total:** ~3,220 lines
```

**Improvements:**
- ✅ 5 mandatory design phases (Steps 2-5, 8) - 720 lines
- ✅ 1 mandatory planning phase (Step 9) - 280 lines
- ✅ 1 mandatory validation (Step 11) - 220 lines
- ✅ Template code removed - 508 lines
- ✅ API Reference organized and condensed
- ✅ Small patterns provided (not full examples)
- ✅ Anti-patterns explicitly listed

---

## Implementation Checklist

**To apply these changes to SKILL.md:**

- [ ] Create backup of current SKILL.md
- [ ] Remove Quick Start section (lines 37-112)
- [ ] Remove Generated.tsx example (lines 266-774)
- [ ] Add Introduction & Philosophy (Section 1)
- [ ] Add Process Overview (Section 2)
- [ ] Add Step 2: Brand Analysis (Section 6)
- [ ] Add Step 3: Scene Design (Section 7)
- [ ] Add Step 4: Animation Planning (Section 8)
- [ ] Add Step 5: Transition Planning (Section 9)
- [ ] Update Step 6: Write Script (remove examples, add templates)
- [ ] Update Step 7: Generate Audio (add selection logic)
- [ ] Add Step 8: Advanced Features Decision (Section 12)
- [ ] Add Step 9: Code Structure Planning (Section 13)
- [ ] Rewrite Step 10: Write Remotion Code (remove example, add guidelines)
- [ ] Add Step 11: Quality Validation (Section 15)
- [ ] Update Step 12: Render Video (add validation reference)
- [ ] Reorganize API Reference by category (Section 17)
- [ ] Add Common Patterns section (Section 18)
- [ ] Add Anti-Patterns section (Section 19)
- [ ] Verify all cross-references work
- [ ] Test that workflow is linear and clear
- [ ] Commit and push to GitHub

---

## Expected Outcomes

**After applying these changes:**

1. **Agents will be forced to plan before coding**
   - 5 design phases with validation checkpoints
   - Cannot skip to coding (Step 10 requires Steps 2-9)

2. **No more template copying**
   - 508-line example removed
   - Only small isolated patterns provided
   - Each video will be unique

3. **Advanced features will be evaluated**
   - Step 8 is mandatory
   - Decision trees for 7 feature categories
   - Features integrated into design (not afterthought)

4. **Quality will be enforced**
   - 30-item validation checklist (Step 11)
   - Minimum 25/30 required to render
   - Catches brand misalignment, broken animations, technical errors

5. **API Reference will be usable**
   - Organized by category
   - "When to use" guidance
   - Cross-references to workflow steps

6. **Common mistakes will be avoided**
   - 12 anti-patterns explicitly listed
   - Shows wrong vs correct code
   - Prevents CSS animations, hardcoded colors, etc.

---

## Next Step

**Apply all documented changes to `/Users/bella/Cooking/remotion/url-to-video-mcp/skill/SKILL.md`**

This will be a major restructuring (3,220 lines total, +730 net change). The file will be significantly better organized and will enforce quality through mandatory design and validation phases.

---

**END OF RESTRUCTURING PLAN**
