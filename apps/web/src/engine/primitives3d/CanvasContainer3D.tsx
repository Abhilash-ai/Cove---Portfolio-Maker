import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ThemeTokens } from '@cove/shared';
import { LightingRig } from './MaterialPresets.js';
import { MaterialPreset3D } from '../templates/templateTypes.js';

interface CanvasProps {
  children: React.ReactNode;
  tokens: ThemeTokens;
  materialPreset: MaterialPreset3D;
  cameraDistance?: number;
  className?: string;
}

export function CanvasContainer3D({
  children,
  tokens,
  materialPreset,
  cameraDistance = 6.0,
  className = 'w-full h-full'
}: CanvasProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: tokens.colors.background }}
    >
      <Canvas
        camera={{ position: [0, 0, cameraDistance], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[tokens.colors.background]} />
        <fog attach="fog" args={[tokens.colors.background, 12, 35]} />
        <Suspense fallback={null}>
          <LightingRig preset={materialPreset} tokens={tokens} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
