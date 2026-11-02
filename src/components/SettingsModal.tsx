import React, { useState } from 'react';
import {
  X,
  Palette,
  Globe,
  Volume2,
  VolumeX,
  Sparkles,
  Trash2,
  Info,
  Check,
  AlertTriangle,
  Sliders
} from 'lucide-react';
import { UserSettings, Theme, Language } from '../types';
import { soundEffects } from '../services/soundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onClearHistory: () => void;
  conversationCount: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onClearHistory,
  conversationCount,
}) => {
  const [activeTab, setActiveTab] = useState<'preferences' | 'about'>('preferences');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const themes: { id: Theme; name: string; previewClass: string; desc: string }[] = [
    {
      id: 'space',
      name: 'Deep Space',
      previewClass: 'from-[#07080d] via-cyan-950 to-violet-950 border-cyan-500/40',
      desc: 'Obsidian black with neon cyan and cosmic violet accents.',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      previewClass: 'from-[#080512] via-fuchsia-950 to-cyan-950 border-fuchsia-500/40',
      desc: 'High contrast electric magenta and hyper-cyan.',
    },
    {
      id: 'aurora',
      name: 'Aurora Borealis',
      previewClass: 'from-[#040d12] via-emerald-950 to-teal-950 border-teal-500/40',
      desc: 'Deep arctic night with emerald luminescence.',
    },
    {
      id: 'titanium',
      name: 'Titanium Stealth',
      previewClass: 'from-[#0b0c10] via-slate-900 to-zinc-900 border-slate-500/40',
      desc: 'Monochrome precision with subtle platinum specular highlights.',
    },
  ];

  const languages: { id: Language; label: string; native: string }[] = [
    { id: 'en', label: 'English', native: 'Global Standard' },
    { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { id: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  ];

  const handleSoundToggle = () => {
    const next = !settings.soundEnabled;
    onUpdateSettings({ soundEnabled: next });
    if (next) {
      soundEffects.playReceive(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h2 className="font-display font-bold text-lg text-slate-100">
              System Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Control Tabs */}
        <div className="px-6 pt-3 flex gap-2 border-b border-white/[0.06] bg-black/20">
          <button
            onClick={() => {
              setActiveTab('preferences');
              soundEffects.playBlip(settings.soundEnabled);
            }}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'preferences'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => {
              setActiveTab('about');
              soundEffects.playBlip(settings.soundEnabled);
            }}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'about'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            About JIMMY
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {activeTab === 'preferences' ? (
            <>
              {/* Theme Settings */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5 mb-3">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Atmospheric Theme</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {themes.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => {
                        onUpdateSettings({ theme: th.id });
                        soundEffects.playBlip(settings.soundEnabled);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden bg-gradient-to-br ${
                        th.previewClass
                      } ${
                        settings.theme === th.id
                          ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-950/40'
                          : 'opacity-70 hover:opacity-100 border-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-100">{th.name}</span>
                        {settings.theme === th.id && (
                          <Check className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{th.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5 mb-3">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Conversational Language</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        onUpdateSettings({ language: lang.id });
                        soundEffects.playBlip(settings.soundEnabled);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        settings.language === lang.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold shadow-md shadow-cyan-950/30'
                          : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="text-sm font-medium">{lang.label}</div>
                      <div className="text-[11px] text-cyan-400/80 mt-0.5">{lang.native}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                {/* Sound FX Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">Procedural Sound Feedback</div>
                      <div className="text-[11px] text-slate-400">Harmonic Web Audio chimes for transmit and receive</div>
                    </div>
                  </div>
                  <button
                    onClick={handleSoundToggle}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Animation Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">Orb & Fluid Dynamics</div>
                      <div className="text-[11px] text-slate-400">Layered plasma swirl, orbital rings, and ripple waves</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const next = !settings.animationEnabled;
                      onUpdateSettings({ animationEnabled: next });
                      soundEffects.playBlip(settings.soundEnabled);
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings.animationEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        settings.animationEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Data & History Management */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-display flex items-center gap-1.5 mb-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Memory Storage</span>
                </label>

                {confirmClear ? (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-rose-300 font-medium text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Confirm deletion of all {conversationCount} dialogues?</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClearHistory();
                          setConfirmClear(false);
                          soundEffects.playDeactivateVoice(settings.soundEnabled);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
                      >
                        Yes, Erase All
                      </button>
                      <button
                        onClick={() => setConfirmClear(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs hover:bg-white/15"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-medium transition-colors"
                  >
                    <span>Clear Local Chat History ({conversationCount} saved)</span>
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* About Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                <div className="flex items-center gap-2 font-display font-bold text-base text-cyan-300">
                  <Info className="w-4 h-4" />
                  <span>JIMMY — Your Personal AI Companion</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  JIMMY is an original futuristic companion interface designed for high-aesthetic cognitive symbiosis.
                  Departing from standard chatbot layouts, JIMMY is centered around a living multi-layered CSS glowing orb that breathes, listens, synthesizes, and vocalizes in real-time.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-slate-400 text-[10px] uppercase">Engine Status</div>
                  <div className="text-cyan-300 font-semibold mt-1">Stage 1 Frontend Demo</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-slate-400 text-[10px] uppercase">Persistence</div>
                  <div className="text-emerald-300 font-semibold mt-1">Local Browser Vault</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-slate-400 text-[10px] uppercase">Audio Core</div>
                  <div className="text-violet-300 font-semibold mt-1">Procedural Web Audio</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-slate-400 text-[10px] uppercase">Vocal Engine</div>
                  <div className="text-sky-300 font-semibold mt-1">SpeechSynthesis API</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-slate-400 text-[11px] leading-relaxed">
                Notice: In accordance with Stage 1 requirements, no paid third-party APIs or simulated fake internet search are engaged. All responses reflect the calibrated deterministic intelligence model.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-black/30 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-semibold text-xs hover:scale-105 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
