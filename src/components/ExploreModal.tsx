import React from 'react';
import {
  X,
  Compass,
  Atom,
  Music,
  Calendar,
  Code2,
  Globe,
  Sparkles,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeaturePrompt: (prompt: string) => void;
  soundEnabled: boolean;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  onSelectFeaturePrompt,
  soundEnabled,
}) => {
  if (!isOpen) return null;

  const features = [
    {
      id: 'quantum',
      title: 'Quantum & Particle Physics',
      category: 'Deep Science',
      desc: 'Explore superposition, wave-particle duality, Schrödinger equations, and spacetime geometry.',
      prompt: 'Explain quantum physics and how entanglement challenges classical mechanics',
      icon: Atom,
      accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20',
    },
    {
      id: 'songwriting',
      title: 'Lyricist & Neo-Soul Composer',
      category: 'Creative Arts',
      desc: 'Compose atmospheric synthwave lyrics, rhythmic poetry, and emotive cybernetic choruses.',
      prompt: 'Write a song for me with cyberpunk neo-soul vibes and atmospheric lyrics',
      icon: Music,
      accent: 'border-violet-500/30 text-violet-400 bg-violet-950/20',
    },
    {
      id: 'daily',
      title: 'Day Architect & Ultradian Flow',
      category: 'Productivity Matrix',
      desc: 'Engineer your 24-hour cycle around biological energy peaks, deep work blocks, and cognitive resets.',
      prompt: 'Help me plan my day using high-leverage ultradian rhythms and deep work blocks',
      icon: Calendar,
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20',
    },
    {
      id: 'code',
      title: 'TypeScript & Algorithmic Design',
      category: 'Engineering',
      desc: 'Architect type-safe data structures, functional reactive pipelines, and zero-dependency algorithms.',
      prompt: 'Write a high-performance TypeScript cache module with LRU eviction and TTL expiry',
      icon: Code2,
      accent: 'border-blue-500/30 text-blue-400 bg-blue-950/20',
    },
    {
      id: 'curiosity',
      title: 'Cosmic Anomalies & Deep Trivia',
      category: 'Astrophysics',
      desc: 'Unearth extreme astrophysics facts, supersonic exoplanet storms, and cognitive wonders.',
      prompt: 'Tell me something interesting about extreme planets and cosmic phenomena',
      icon: Sparkles,
      accent: 'border-amber-500/30 text-amber-400 bg-amber-950/20',
    },
    {
      id: 'polyglot',
      title: 'Multilingual Cultural Matrix',
      category: 'Linguistics',
      desc: 'Seamless conversational intelligence across English, Hindi (हिन्दी), and Odia (ଓଡ଼ିଆ).',
      prompt: 'Translate and explain the cultural philosophy behind "Vasudhaiva Kutumbakam" in Hindi and Odia',
      icon: Globe,
      accent: 'border-teal-500/30 text-teal-400 bg-teal-950/20',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl glass-panel border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/15 text-violet-400 border border-violet-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-100">
                Explore JIMMY Capabilities
              </h2>
              <p className="text-xs text-slate-400">Curated intelligent intelligence vectors designed for rapid deployment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of features */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  soundEffects.playSend(soundEnabled);
                  onSelectFeaturePrompt(feat.prompt);
                  onClose();
                }}
                className={`p-4 rounded-xl border text-left transition-all group hover:scale-[1.01] glass-panel-interactive flex flex-col justify-between ${feat.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300">
                      {feat.category}
                    </span>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-slate-100 group-hover:text-cyan-200 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span>Activate capability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            <span>Select any node to launch a live dialogue session.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] text-slate-200 text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
