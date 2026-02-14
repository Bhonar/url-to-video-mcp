import React from 'react';
import { Composition, staticFile, CalculateMetadataFunction } from 'remotion';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { TailwindTest } from './compositions/TailwindTest';
import { InlineTest } from './compositions/InlineTest';
import { Generated } from './compositions/Generated';
import './tailwind-output.css';

export type VideoProps = {
  content: {
    title: string;
    description: string;
    features: string[];
    heroImage?: string;
    domain: string;
  };
  branding: {
    logo: { url: string; staticPath?: string };
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
    music: { staticPath: string };
    narration: { staticPath: string; timecodes: any[] };
    beats: number[];
  };
  metadata: {
    domain: string;
    industry: string;
  };
  duration: number;
};

const FPS = 30;
const DEFAULT_DURATION_FRAMES = 900; // 30s fallback

const calculateVideoMetadata: CalculateMetadataFunction<VideoProps> = async ({
  props,
}) => {
  let durationInFrames = DEFAULT_DURATION_FRAMES;

  if (props.audio?.music?.staticPath) {
    try {
      const musicDuration = await getAudioDurationInSeconds(
        staticFile(props.audio.music.staticPath),
      );
      durationInFrames = Math.ceil(musicDuration * FPS);
    } catch {
      if (props.audio?.narration?.staticPath) {
        try {
          const narrationDuration = await getAudioDurationInSeconds(
            staticFile(props.audio.narration.staticPath),
          );
          durationInFrames = Math.ceil(narrationDuration * FPS);
        } catch {
          durationInFrames = Math.ceil((props.duration || 30) * FPS);
        }
      }
    }
  } else if (props.duration) {
    durationInFrames = Math.ceil(props.duration * FPS);
  }

  return { durationInFrames, props };
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Generated"
        component={Generated}
        durationInFrames={DEFAULT_DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          content: {
            title: 'Example Video',
            description: 'A dynamically generated video',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            domain: 'example.com',
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
            music: { staticPath: '' },
            narration: { staticPath: '', timecodes: [] },
            beats: [],
          },
          metadata: {
            domain: 'example.com',
            industry: 'general',
          },
          duration: 30,
        }}
        calculateMetadata={calculateVideoMetadata}
      />

      <Composition
        id="TailwindTest"
        component={TailwindTest}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="InlineTest"
        component={InlineTest}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
