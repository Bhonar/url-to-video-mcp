import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  direction = 'up',
}) => {
  const frame = useCurrentFrame();
  const delayFrames = delay * 30;

  const progress = spring({
    frame: frame - delayFrames,
    fps: 30,
    config: {
      damping: 20,
      mass: 0.5,
    },
  });

  const getTransform = () => {
    const distance = 100;
    const value = (1 - progress) * distance;

    switch (direction) {
      case 'up':
        return `translateY(${value}px)`;
      case 'down':
        return `translateY(-${value}px)`;
      case 'left':
        return `translateX(${value}px)`;
      case 'right':
        return `translateX(-${value}px)`;
      default:
        return 'none';
    }
  };

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 15],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        transform: getTransform(),
        opacity,
      }}
    >
      {children}
    </div>
  );
};
