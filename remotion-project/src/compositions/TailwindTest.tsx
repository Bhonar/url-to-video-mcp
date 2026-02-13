import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const TailwindTest: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-8">
          Tailwind Test
        </h1>
        <p className="text-4xl text-white/80">
          Frame: {frame}
        </p>
        <div className="mt-12 flex gap-4 justify-center">
          <div className="w-32 h-32 bg-red-500 rounded-lg"></div>
          <div className="w-32 h-32 bg-green-500 rounded-lg"></div>
          <div className="w-32 h-32 bg-yellow-500 rounded-lg"></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
