import React, { useMemo, useState, useRef } from 'react';
import { JimmyState } from '../types';

interface OrbProps {
  state?: JimmyState;
  size?: 'compact' | 'medium' | 'large' | 'voice';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const Orb: React.FC<OrbProps> = ({
  state = 'idle',
  size = 'large',
  className = '',
  onClick,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Handle gentle 3D parallax tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || size === 'compact' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Size metrics
  const dimensions = useMemo(() => {
    switch (size) {
      case 'compact':
        return {
          container: 'w-10 h-10',
          sphere: 'w-7 h-7',
          glowSize: 'w-14 h-14',
          orbit1: 'w-11 h-11',
          orbit2: 'w-9 h-9',
          blur: 'blur-md',
        };
      case 'medium':
        return {
          container: 'w-28 h-28',
          sphere: 'w-20 h-20',
          glowSize: 'w-36 h-36',
          orbit1: 'w-28 h-28',
          orbit2: 'w-24 h-24',
          blur: 'blur-xl',
        };
      case 'voice':
        return {
          container: 'w-80 h-80 sm:w-96 sm:h-96',
          sphere: 'w-60 h-60 sm:w-72 sm:h-72',
          glowSize: 'w-[450px] h-[450px]',
          orbit1: 'w-80 h-80 sm:w-96 sm:h-96',
          orbit2: 'w-72 h-72 sm:w-84 sm:h-84',
          blur: 'blur-3xl',
        };
      case 'large':
      default:
        return {
          container: 'w-64 h-64 sm:w-76 sm:h-76',
          sphere: 'w-48 h-48 sm:w-56 sm:h-56',
          glowSize: 'w-[360px] h-[360px]',
          orbit1: 'w-64 h-64 sm:w-76 sm:h-76',
          orbit2: 'w-56 h-56 sm:w-68 sm:h-68',
          blur: 'blur-2xl',
        };
    }
  }, [size]);

  // State visuals configuration
  const stateConfig = useMemo(() => {
    switch (state) {
      case 'listening':
        return {
          sphereBg:
            'radial-gradient(circle at 30% 25%, #ffffff 0%, #38bdf8 20%, #00f0ff 45%, #0284c7 65%, #031024 100%)',
          coronaGlow: 'bg-cyan-400/40',
          ambientGlow: 'bg-cyan-500/30',
          orbitBorder: 'border-cyan-400/50',
          orbitDot: 'bg-cyan-300 shadow-[0_0_12px_#00f0ff]',
          animationClass: 'animate-sonic-ripple',
          flareColor: 'from-cyan-400/30 to-transparent',
          label: 'Acoustic Receptor Active',
        };
      case 'thinking':
        return {
          sphereBg:
            'radial-gradient(circle at 30% 25%, #ffffff 0%, #f472b6 20%, #a855f7 45%, #6366f1 70%, #0f051d 100%)',
          coronaGlow: 'bg-fuchsia-500/40',
          ambientGlow: 'bg-violet-600/35',
          orbitBorder: 'border-fuchsia-400/50',
          orbitDot: 'bg-fuchsia-300 shadow-[0_0_12px_#ec4899]',
          animationClass: 'animate-thinking-flux',
          flareColor: 'from-violet-500/30 to-transparent',
          label: 'Neural Synthesis',
        };
      case 'speaking':
        return {
          sphereBg:
            'radial-gradient(circle at 30% 25%, #ffffff 0%, #67e8f9 20%, #0284c7 45%, #8b5cf6 70%, #060b18 100%)',
          coronaGlow: 'bg-sky-400/45',
          ambientGlow: 'bg-indigo-600/35',
          orbitBorder: 'border-sky-300/60',
          orbitDot: 'bg-sky-200 shadow-[0_0_12px_#38bdf8]',
          animationClass: 'animate-orb-breathe',
          flareColor: 'from-sky-400/30 to-transparent',
          label: 'Vocal Harmonic Transmission',
        };
      case 'idle':
      default:
        return {
          sphereBg:
            'radial-gradient(circle at 32% 28%, #ffffff 0%, #22d3ee 22%, #6366f1 50%, #1e1b4b 75%, #05070f 100%)',
          coronaGlow: 'bg-cyan-500/30',
          ambientGlow: 'bg-violet-600/25',
          orbitBorder: 'border-cyan-500/30',
          orbitDot: 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]',
          animationClass: 'animate-orb-breathe',
          flareColor: 'from-cyan-400/20 to-transparent',
          label: 'Neural Substrate Calibrated',
        };
    }
  }, [state]);

  const isCompact = size === 'compact';

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`relative flex items-center justify-center select-none ${dimensions.container} ${className} ${
        interactive ? 'cursor-pointer group' : ''
      }`}
      aria-label={`JIMMY Neural Orb (${state})`}
      style={{
        perspective: '1000px',
      }}
    >
      {/* 1. Deep Space Ambient Aura Halo (Diffuse Radiance) */}
      <div
        className={`absolute rounded-full transition-all duration-700 ease-out pointer-events-none ${dimensions.glowSize} ${dimensions.blur} ${stateConfig.ambientGlow} group-hover:scale-115`}
        style={{
          transform: `translate(${tilt.x * 0.8}px, ${tilt.y * 0.8}px)`,
        }}
      />

      {/* 2. Secondary Intense Corona (Mid Glow) */}
      <div
        className={`absolute rounded-full transition-all duration-500 ease-out pointer-events-none ${dimensions.sphere} blur-xl ${stateConfig.coronaGlow} opacity-80 group-hover:opacity-100`}
      />

      {/* 3. Expanding Sonic / Acoustic Pressure Shockwaves */}
      {(state === 'listening' || state === 'speaking') && !isCompact && (
        <>
          <div
            className="absolute rounded-full border border-cyan-400/60 animate-sonic-ripple pointer-events-none w-full h-full"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute rounded-full border border-violet-400/40 animate-sonic-ripple pointer-events-none w-full h-full"
            style={{ animationDelay: '0.8s' }}
          />
          <div
            className="absolute rounded-full border border-sky-300/30 animate-sonic-ripple pointer-events-none w-full h-full"
            style={{ animationDelay: '1.6s' }}
          />
        </>
      )}

      {/* 4. Tilted 3D Orbital Trajectory Ring 1 */}
      {!isCompact && (
        <div
          className={`absolute rounded-full pointer-events-none border border-dashed ${dimensions.orbit1} ${stateConfig.orbitBorder} animate-orbit-1`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Orbital Satellite Node */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${stateConfig.orbitDot}`}
          />
        </div>
      )}

      {/* 5. Counter-Tilted 3D Orbital Trajectory Ring 2 */}
      {!isCompact && (
        <div
          className={`absolute rounded-full pointer-events-none border border-dotted ${dimensions.orbit2} ${stateConfig.orbitBorder} opacity-75 animate-orbit-2`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Secondary Counter Satellite Node */}
          <div
            className={`absolute bottom-0 right-1/4 w-1.5 h-1.5 rounded-full ${stateConfig.orbitDot}`}
          />
        </div>
      )}

      {/* 6. Main Volumetric Plasma Sphere */}
      <div
        className={`relative rounded-full shadow-2xl overflow-hidden transition-transform duration-300 ease-out ${dimensions.sphere} ${stateConfig.animationClass} group-hover:scale-108`}
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          background: stateConfig.sphereBg,
          boxShadow:
            state === 'thinking'
              ? 'inset 0 0 35px rgba(236, 72, 153, 0.7), inset 0 0 70px rgba(139, 92, 246, 0.9), 0 0 50px rgba(168, 85, 247, 0.8)'
              : state === 'listening'
              ? 'inset 0 0 35px rgba(0, 240, 255, 0.8), inset 0 0 70px rgba(14, 165, 233, 0.9), 0 0 60px rgba(0, 240, 255, 0.9)'
              : 'inset 0 0 30px rgba(0, 240, 255, 0.6), inset 0 0 65px rgba(139, 92, 246, 0.7), 0 0 45px rgba(0, 240, 255, 0.6)',
        }}
      >
        {/* Layer A: Swirling Dynamic Chromatic Plasma */}
        <div
          className="absolute inset-0 rounded-full opacity-75 mix-blend-overlay animate-plasma-shift"
          style={{
            background:
              'conic-gradient(from 0deg, #00f0ff, #8b5cf6, #ec4899, #3b82f6, #06b6d4, #00f0ff)',
          }}
        />

        {/* Layer B: Reverse Neural Vortex Wave */}
        <div
          className="absolute inset-1 rounded-full opacity-60 mix-blend-color-dodge animate-orbit-2"
          style={{
            background:
              'radial-gradient(circle at 65% 65%, rgba(0, 240, 255, 0.9) 0%, rgba(139, 92, 246, 0.5) 40%, transparent 75%)',
          }}
        />

        {/* Layer C: Micro Ray Flares & Internal Caustics */}
        <div
          className="absolute inset-0 rounded-full opacity-40 mix-blend-screen pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />

        {/* Layer D: 3D Specular Fresnel Arc (Upper Glint) */}
        <div
          className="absolute top-1.5 left-2 sm:top-3 sm:left-4 rounded-full bg-gradient-to-br from-white/90 via-white/40 to-transparent blur-[0.5px] pointer-events-none"
          style={{
            width: isCompact ? '6px' : '28%',
            height: isCompact ? '4px' : '16%',
            transform: 'rotate(-32deg)',
          }}
        />

        {/* Layer E: Secondary Ambient Rim Light (Lower Bounce) */}
        <div
          className="absolute bottom-1 right-2 sm:bottom-2 sm:right-4 rounded-full bg-gradient-to-tl from-cyan-300/40 via-violet-400/20 to-transparent blur-[1px] pointer-events-none"
          style={{
            width: isCompact ? '4px' : '22%',
            height: isCompact ? '3px' : '12%',
            transform: 'rotate(-25deg)',
          }}
        />

        {/* Layer F: Central Singularity Core Pulsar */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`rounded-full bg-white transition-all duration-300 blur-[1px] ${
              state === 'thinking'
                ? 'w-7 h-7 animate-ping opacity-90 shadow-[0_0_20px_#ec4899]'
                : state === 'listening'
                ? 'w-6 h-6 animate-pulse opacity-95 shadow-[0_0_20px_#00f0ff]'
                : 'w-4 h-4 opacity-75 shadow-[0_0_15px_#ffffff]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
