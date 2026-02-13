import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 30,
}) => {
  const frame = useCurrentFrame();
  const delayFrames = delay * 30; // Convert seconds to frames (30fps)

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + duration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div style={{ opacity }}>
      {children}
    </div>
  );
};
