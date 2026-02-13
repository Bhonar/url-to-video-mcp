import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const InlineTest: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ opacity }}>
        <h1
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          Inline Styles Test
        </h1>

        <p
          style={{
            fontSize: '48px',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          Frame: {frame}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#ef4444',
              borderRadius: '12px',
            }}
          />
          <div
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#22c55e',
              borderRadius: '12px',
            }}
          />
          <div
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#eab308',
              borderRadius: '12px',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
