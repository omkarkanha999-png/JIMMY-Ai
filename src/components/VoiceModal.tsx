import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Square,
  X,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Info,
  Waves,
  Zap
} from 'lucide-react';
import { JimmyState, Language } from '../types';
import { Orb } from './Orb';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  jimmyState: JimmyState;
  onSimulateVoiceQuery: (query: string) => void;
  onStopSpeech: () => void;
  isSpeaking: boolean;
  language: Language;
  transcript: string;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  jimmyState,
  onSimulateVoiceQuery,
  onStopSpeech,
  isSpeaking,
  language,
  transcript,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [vocalVolumeLevels, setVocalVolumeLevels] = useState<number[]>([
    15, 35, 60, 90, 75, 45, 65, 80, 50, 30, 70, 85, 40, 55, 30, 20
  ]);

  // Frequency visualizer oscillation effect
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setVocalVolumeLevels((prev) =>
        prev.map(() => {
          if (jimmyState === 'speaking') {
            return Math.floor(Math.random() * 80) + 20;
          }
          if (jimmyState === 'listening') {
            return Math.floor(Math.random() * 50) + 15;
          }
          return Math.floor(Math.random() * 15) + 6;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, jimmyState]);

  if (!isOpen) return null;

  const testVoiceQueries = [
    { label: 'Explain Quantum Physics', query: 'Explain quantum physics' },
    { label: 'Compose a Song for Me', query: 'Write a song for me' },
    { label: 'Architect My Day', query: 'Help me plan my day' },
    { label: 'Cosmic Anomaly', query: 'Tell me something interesting' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#030408]/96 backdrop-blur-3xl animate-fade-in overflow-hidden select-none">
      {/* Background Volumetric Neon Light Halos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/12 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/18 rounded-full blur-[120px]" />
        {/* Subtle grid lines giving space OS depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 240, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Top Header OS Bar */}
      <header className="relative z-10 px-6 py-5 flex items-center justify-between border-b border-white/[0.08] glass-panel">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00f0ff]" />
          <div>
            <div className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-violet-400">
                JIMMY Vocal Matrix
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                Stage 1 Acoustic Core
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Real browser speech synthesis · Dynamic visualizer</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          title="Exit voice mode"
          aria-label="Exit voice mode"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Center Stage: Massive Glowing AI Orb */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 max-w-3xl mx-auto w-full text-center">
        {/* State Badge with Neon Horizon */}
        <div className="mb-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border border-cyan-400/50 text-xs font-mono uppercase tracking-widest text-cyan-200 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>
            {jimmyState === 'listening' && 'Listening to vocal frequency...'}
            {jimmyState === 'thinking' && 'Processing cognitive vector...'}
            {jimmyState === 'speaking' && 'JIMMY vocalizing answer...'}
            {jimmyState === 'idle' && 'Acoustic Substrate Ready'}
          </span>
        </div>

        {/* The Central Grand Voice Orb */}
        <div className="my-3 relative">
          <Orb state={jimmyState} size="voice" />
        </div>

        {/* Dynamic Acoustic Spectrum Frequency Bars */}
        <div className="mt-8 flex items-end justify-center gap-1.5 h-14 w-80 max-w-full px-2">
          {vocalVolumeLevels.map((vol, idx) => (
            <div
              key={idx}
              className={`w-1.5 rounded-full transition-all duration-100 ${
                jimmyState === 'speaking'
                  ? 'bg-gradient-to-t from-cyan-400 via-sky-400 to-violet-400 shadow-[0_0_10px_#00f0ff]'
                  : jimmyState === 'listening'
                  ? 'bg-gradient-to-t from-sky-400 to-cyan-300 shadow-[0_0_8px_#38bdf8]'
                  : 'bg-white/20'
              }`}
              style={{ height: `${vol}%` }}
            />
          ))}
        </div>

        {/* Vocal Transcription / Active Feedback */}
        <div className="mt-6 min-h-[50px] max-w-xl text-center px-4">
          {transcript ? (
            <p className="text-sm sm:text-base text-cyan-200 font-medium italic drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              "{transcript}"
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              {jimmyState === 'speaking'
                ? 'Synthesized speech active...'
                : 'Select an inquiry below or speak to test vocal transmission.'}
            </p>
          )}
        </div>

        {/* Stage 1 Vocal Test Presets */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-lg">
          {testVoiceQueries.map((item) => (
            <button
              key={item.label}
              onClick={() => onSimulateVoiceQuery(item.query)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 border border-white/[0.09] hover:border-cyan-400/50 text-xs text-slate-200 hover:text-cyan-200 transition-all font-medium flex items-center gap-2 shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Stage 1 Disclaimer */}
        <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400 max-w-md bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/[0.06] font-mono">
          <Info className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
          <span>
            Stage 1 uses browser speech synthesis. Voice recognition is visual & simulated for verification.
          </span>
        </div>
      </main>

      {/* Bottom Floating Vocal Control Deck */}
      <footer className="relative z-10 pb-8 pt-4 px-6 flex items-center justify-center gap-4">
        {/* Mute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3.5 rounded-2xl border transition-all ${
            isMuted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-400/40'
          }`}
          title={isMuted ? 'Unmute voice' : 'Mute voice'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Halt Speech Button */}
        <button
          onClick={onStopSpeech}
          className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(244,63,94,0.25)]"
          title="Halt current speech"
        >
          <Square className="w-4 h-4 fill-current" />
          <span>Halt Speech</span>
        </button>

        {/* Exit Voice Mode Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-black font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
        >
          <span>Return to Chat</span>
        </button>
      </footer>
    </div>
  );
};
