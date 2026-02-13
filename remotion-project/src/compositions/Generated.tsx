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

  // Scene durations in seconds (configurable based on content)
  const hookDuration = 3 * fps;
  const problemDuration = 5 * fps;
  const solutionDuration = 7 * fps;
  const featuresDuration = 10 * fps;
  const ctaDuration = 5 * fps;

  // Transition duration
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
        {/* Scene 1: Hook */}
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

        {/* Scene 2: Problem */}
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

        {/* Scene 3: Solution */}
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

        {/* Scene 4: Features */}
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

        {/* Scene 5: CTA */}
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

// Scene 1: Hook - Logo reveal with animated particles
const HookScene: React.FC<{
  title: string;
  logo: string;
  colors: any;
  width: number;
  height: number;
}> = ({ title, logo, colors, width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate responsive sizes
  const logoSize = Math.min(width, height) * 0.35;
  const titleMaxWidth = width * 0.8;

  // Fit title to container
  const { fontSize: titleFontSize } = fitText({
    text: title,
    withinWidth: titleMaxWidth,
    fontFamily: 'system-ui',
    fontWeight: 'bold',
  });

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
        <div
          style={{
            position: 'relative',
            transform: `scale(${scale})`,
          }}
        >
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

// Scene 2: Problem - Kinetic typography
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

// Scene 3: Solution - Product showcase with animated elements
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
              {/* Bullet point */}
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
