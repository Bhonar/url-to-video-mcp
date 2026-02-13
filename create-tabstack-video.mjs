#!/usr/bin/env node

/**
 * Create TabStack.ai promotional video
 * Complete workflow: Extract → Script → Audio → Remotion Code → Render
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFile } from 'fs/promises';

// Load .env file from mcp-server directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'mcp-server', '.env') });

import { extractUrlContent } from './mcp-server/dist/tools/extract-url.js';
import { generateAudio } from './mcp-server/dist/tools/generate-audio.js';
import { renderVideo } from './mcp-server/dist/tools/render-video.js';

const TARGET_URL = 'https://tabstack.ai';
const VIDEO_DURATION = 30; // seconds

console.log('🎬 Creating TabStack.ai Promotional Video\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

(async () => {
  try {
    // STEP 1: Extract content from URL
    console.log('📍 Step 1: Extracting content from', TARGET_URL);
    const extracted = await extractUrlContent(TARGET_URL);
    console.log('✅ Content extracted!\n');

    console.log('  Title:', extracted.content.title);
    console.log('  Logo:', extracted.branding.logo.url);
    console.log('  Colors:', extracted.branding.colors.primary, '→', extracted.branding.colors.secondary);
    console.log('  Industry:', extracted.metadata.industry);
    console.log();

    // STEP 2: Generate narration script
    console.log('📝 Step 2: Writing narration script...');

    // Analyze content and create story arc
    const narrationScript = `
Struggling to extract data from websites?

Most developers waste hours dealing with complex web scraping, APIs that break, and pages that won't load.

TabStack changes everything. With one simple API call, get any website's content instantly—no headless browsers, no maintenance, no hassle.

Extract text, images, and structured data from any page. Get screenshots and PDFs automatically. And scale to millions of requests without breaking a sweat.

Trusted by thousands of developers who've ditched the old way of web scraping.

Ready to simplify your workflow? Try TabStack today.
    `.trim();

    console.log('✅ Script ready!\n');
    console.log('Script preview:', narrationScript.substring(0, 100) + '...\n');

    // STEP 3: Generate audio
    console.log('🎵 Step 3: Generating audio (music + narration)...');
    const audio = await generateAudio({
      musicStyle: 'lo-fi', // Modern, tech-focused, chill
      narrationScript,
      duration: VIDEO_DURATION,
    });
    console.log('✅ Audio generated!\n');
    console.log('  Music:', audio.music.localPath);
    console.log('  Narration:', audio.narration.localPath);
    console.log('  Beats detected:', audio.beats.length, 'beats');
    console.log();

    // STEP 4: Write custom Remotion code
    console.log('💻 Step 4: Writing custom Remotion composition...');

    const remotionCode = generateRemotionCode(extracted, audio);
    const remotionPath = join(__dirname, 'remotion-project', 'src', 'compositions', 'Generated.tsx');

    await writeFile(remotionPath, remotionCode, 'utf-8');
    console.log('✅ Remotion code written to Generated.tsx\n');

    // STEP 5: Render video
    console.log('🎥 Step 5: Rendering video (this may take a few minutes)...');
    const result = await renderVideo({
      inputProps: {
        content: {
          ...extracted.content,
          domain: extracted.metadata.domain, // Display-friendly domain for video
        },
        branding: extracted.branding,
        audio,
        metadata: extracted.metadata, // Technical metadata for tracking
        duration: VIDEO_DURATION,
      },
      outputFileName: 'tabstack-promo',
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✨ Video rendered successfully!\n');
    console.log('📹 File:', result.videoPath);
    console.log('⏱️  Duration:', result.duration, 'seconds');
    console.log('📦 Size:', (result.fileSize / 1024 / 1024).toFixed(2), 'MB\n');
    console.log('The video features:');
    console.log('  • Custom-designed scenes for TabStack');
    console.log('  • Lo-fi instrumental background music');
    console.log('  • Professional AI voiceover narration');
    console.log('  • Beat-synced transitions');
    console.log('  • 5 unique animated scenes\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();

/**
 * Generate custom Remotion code for TabStack video
 */
function generateRemotionCode(extracted, audio) {
  const { content, branding } = extracted;

  return `import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
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
        background: \`linear-gradient(135deg, \${branding.colors.primary}, \${branding.colors.secondary})\`,
        fontFamily: branding.font || 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Audio */}
      {audio.music.localPath && <Audio src={audio.music.localPath} />}
      {audio.narration.localPath && <Audio src={audio.narration.localPath} />}

      {/* Scene 1: Hook - Dramatic logo reveal (0-3s = 0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <HookScene
          title={content.title}
          logo={branding.logo.url}
          colors={branding.colors}
          frame={frame}
          fps={fps}
        />
      </Sequence>

      {/* Scene 2: Problem statement (3-8s = 90-240 frames) */}
      <Sequence from={90} durationInFrames={150}>
        <ProblemScene
          colors={branding.colors}
          frame={frame - 90}
          fps={fps}
        />
      </Sequence>

      {/* Scene 3: Solution intro (8-15s = 240-450 frames) */}
      <Sequence from={240} durationInFrames={210}>
        <SolutionScene
          title={content.title}
          description={content.description}
          colors={branding.colors}
          frame={frame - 240}
          fps={fps}
        />
      </Sequence>

      {/* Scene 4: Features showcase (15-25s = 450-750 frames) */}
      <Sequence from={450} durationInFrames={300}>
        <FeaturesScene
          features={content.features}
          colors={branding.colors}
          frame={frame - 450}
          fps={fps}
        />
      </Sequence>

      {/* Scene 5: Call to action (25-30s = 750-900 frames) */}
      <Sequence from={750} durationInFrames={150}>
        <CTAScene
          colors={branding.colors}
          frame={frame - 750}
          fps={fps}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// Scene 1: Hook - Logo reveal with particles
const HookScene: React.FC<{
  title: string;
  logo: string;
  colors: any;
  frame: number;
  fps: number;
}> = ({ title, logo, colors, frame, fps }) => {
  const opacity = spring({ frame, fps, from: 0, to: 1 });
  const scale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 10 } });
  const rotation = interpolate(frame, [0, 90], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Rotating background effect */}
      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          background: \`radial-gradient(circle, \${colors.accent}22 0%, transparent 70%)\`,
          transform: \`rotate(\${rotation}deg)\`,
        }}
      />

      {/* Logo */}
      {logo && (
        <Img
          src={logo}
          style={{
            width: 300,
            height: 300,
            objectFit: 'contain',
            transform: \`scale(\${scale})\`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
          }}
        />
      )}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          fontSize: 72,
          fontWeight: 'bold',
          color: colors.background,
          textShadow: '0 4px 8px rgba(0,0,0,0.5)',
          transform: \`scale(\${scale})\`,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Problem - Split screen effect
const ProblemScene: React.FC<{
  colors: any;
  frame: number;
  fps: number;
}> = ({ colors, frame, fps }) => {
  const slideIn = spring({ frame, fps, from: -1000, to: 0 });
  const textOpacity = spring({ frame: frame - 20, fps, from: 0, to: 1 });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
        }}
      />

      {/* Problem text */}
      <div
        style={{
          position: 'relative',
          fontSize: 56,
          fontWeight: 600,
          color: colors.background,
          textAlign: 'center',
          maxWidth: 1200,
          lineHeight: 1.4,
          transform: \`translateX(\${slideIn}px)\`,
          opacity: textOpacity,
        }}
      >
        Struggling to extract data from websites?
      </div>

      {/* Subtext */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          fontSize: 36,
          color: \`\${colors.background}cc\`,
          textAlign: 'center',
          maxWidth: 1000,
          opacity: textOpacity,
        }}
      >
        Complex web scraping • Broken APIs • Slow headless browsers
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Solution - Product showcase
const SolutionScene: React.FC<{
  title: string;
  description: string;
  colors: any;
  frame: number;
  fps: number;
}> = ({ title, description, colors, frame, fps }) => {
  const zoom = spring({ frame, fps, from: 1.5, to: 1, config: { damping: 20 } });
  const opacity = spring({ frame, fps, from: 0, to: 1 });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
        opacity,
      }}
    >
      {/* Glowing background */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          background: \`radial-gradient(circle, \${colors.accent} 0%, transparent 70%)\`,
          opacity: 0.3,
          transform: \`scale(\${zoom})\`,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: 84,
          fontWeight: 'bold',
          color: colors.background,
          marginBottom: 40,
          textShadow: '0 4px 12px rgba(0,0,0,0.4)',
          transform: \`scale(\${zoom})\`,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 42,
          color: \`\${colors.background}ee\`,
          textAlign: 'center',
          maxWidth: 1100,
          lineHeight: 1.5,
        }}
      >
        One simple API call. Any website's content. Instantly.
      </div>

      {/* Highlight bar */}
      <div
        style={{
          marginTop: 60,
          width: interpolate(frame, [30, 80], [0, 600]),
          height: 6,
          background: colors.accent,
          borderRadius: 3,
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 4: Features - Staggered grid
const FeaturesScene: React.FC<{
  features: string[];
  colors: any;
  frame: number;
  fps: number;
}> = ({ features, colors, frame, fps }) => {
  const mainFeatures = [
    { icon: '🔍', text: 'Extract text, images & structured data' },
    { icon: '📸', text: 'Get screenshots & PDFs automatically' },
    { icon: '⚡', text: 'Scale to millions of requests' },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: colors.background,
          marginBottom: 80,
          opacity: spring({ frame, fps, from: 0, to: 1 }),
        }}
      >
        Everything you need
      </div>

      {/* Feature grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
        {mainFeatures.map((feature, i) => {
          const delay = i * 30;
          const featureOpacity = spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 1
          });
          const slideIn = spring({
            frame: frame - delay,
            fps,
            from: -200,
            to: 0
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                opacity: featureOpacity,
                transform: \`translateX(\${slideIn}px)\`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: 72,
                  width: 100,
                  textAlign: 'center',
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div
                style={{
                  fontSize: 48,
                  color: colors.background,
                  fontWeight: 500,
                }}
              >
                {feature.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: CTA - Pulsing button
const CTAScene: React.FC<{
  colors: any;
  frame: number;
  fps: number;
}> = ({ colors, frame, fps }) => {
  const pulse = Math.sin(frame / 10) * 0.05 + 1;
  const opacity = spring({ frame, fps, from: 0, to: 1 });

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
      {/* Main CTA */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: colors.background,
          marginBottom: 60,
          textShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        Ready to simplify your workflow?
      </div>

      {/* Button */}
      <div
        style={{
          padding: '30px 80px',
          background: colors.accent,
          borderRadius: 16,
          fontSize: 56,
          fontWeight: 'bold',
          color: colors.primary,
          transform: \`scale(\${pulse})\`,
          boxShadow: \`0 20px 60px \${colors.accent}66\`,
        }}
      >
        Try TabStack Today
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 40,
          fontSize: 36,
          color: \`\${colors.background}cc\`,
        }}
      >
        tabstack.ai
      </div>
    </AbsoluteFill>
  );
};
`;
}
