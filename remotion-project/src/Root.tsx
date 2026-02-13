import React from 'react';
import { Composition } from 'remotion';
import { TailwindTest } from './compositions/TailwindTest';
import { InlineTest } from './compositions/InlineTest';
import { Generated } from './compositions/Generated';
import './tailwind-output.css'; // Pre-built Tailwind CSS

export interface VideoProps {
  content: {
    title: string;
    description: string;
    features: string[];
    heroImage?: string;
    domain: string; // Display-friendly domain for showing in video
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
    domain: string; // Technical domain for tracking/analytics
    industry: string;
  };
  duration: number;
}

export const Root: React.FC = () => {
  return (
    <>
      {/* Generated Composition - Dynamically created by Claude for each video */}
      <Composition
        id="Generated"
        component={Generated}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          content: {
            title: 'Example Video',
            description: 'A dynamically generated video',
            features: [
              'Feature 1',
              'Feature 2',
              'Feature 3',
            ],
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
            music: { localPath: '' },
            narration: { localPath: '', timecodes: [] },
            beats: [],
          },
          metadata: {
            domain: 'example.com',
            industry: 'general',
          },
          duration: 30,
        }}
      />

      {/* Test Compositions */}
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
