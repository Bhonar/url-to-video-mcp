import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
  Sequence,
  interpolate,
  spring,
} from 'remotion';
import { Audio } from '@remotion/media';
import { VideoProps } from '../Root';

// This file is dynamically overwritten by the agent during video generation.
// Do not add permanent content here — it will be replaced each run.

export const Generated: React.FC<VideoProps> = ({
  content,
  branding,
  audio,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: branding.colors.primary,
        fontFamily: branding.font || 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Audio — use staticFile() for local assets */}
      {audio.music?.staticPath && (
        <Audio src={staticFile(audio.music.staticPath)} volume={0.3} />
      )}
      {audio.narration?.staticPath && (
        <Audio src={staticFile(audio.narration.staticPath)} volume={1} />
      )}
    </AbsoluteFill>
  );
};
