/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Menu,
  Sparkles,
  Mic,
  Sliders,
  Volume2,
  VolumeX,
  Plus,
  Compass,
  Globe,
  Radio,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Conversation, Message, JimmyState, UserSettings, Language, Theme } from './types';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { MessageInput } from './components/MessageInput';
import { VoiceModal } from './components/VoiceModal';
import { SettingsModal } from './components/SettingsModal';
import { ExploreModal } from './components/ExploreModal';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Orb } from './components/Orb';
import { generateDemoResponse } from './services/demoEngine';
import { soundEffects } from './services/soundEffects';
import { voiceAssistant } from './services/speechSynthesis';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'space',
  language: 'en',
  soundEnabled: true,
  animationEnabled: true,
  autoSpeakResponse: false,
  voicePitch: 1.0,
  voiceRate: 1.0,
};

const INITIAL_CONVERSATION: Conversation = {
  id: 'conv-welcome-init',
  title: 'Welcome to JIMMY Neural Core',
  createdAt: Date.now() - 3600000,
  updatedAt: Date.now() - 3600000,
  messages: [
    {
      id: 'msg-init-1',
      role: 'assistant',
      content: `### Welcome to JIMMY — Your Personal AI Companion

I am your next-generation neural companion operating system, engineered with an original reactive glowing orb, multilingual communication, and structured reasoning.

Try exploring:
- **"Explain quantum physics"** to explore wave-particle duality, superposition and entanglement.
- **"Write a song for me"** for atmospheric neo-soul synthwave lyrics.
- **"Help me plan my day"** for an ultradian deep-work architecture.
- Or click the **Microphone** to step inside the interactive **Voice Matrix**.`,
      timestamp: Date.now() - 3600000,
      thoughtProcess: [
        'Bootstrapping JIMMY neural companion substrate',
        'Calibrating atmospheric deep-space UI harmonics',
        'Activating multilingual matrix (English, Hindi, Odia)',
        'Synchronizing local memory vaults'
      ],
      isDemo: true,
    },
  ],
};

export default function App() {
  // Persistence state
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('jimmy_conversations');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [INITIAL_CONVERSATION];
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('jimmy_settings');
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  // UI state
  const [jimmyState, setJimmyState] = useState<JimmyState>('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Live HUD System Clock
  const [sysTime, setSysTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Audio / Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpokenText, setCurrentlySpokenText] = useState<string | undefined>(undefined);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Save conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jimmy_conversations', JSON.stringify(conversations));
    } catch {
      // Fallback
    }
  }, [conversations]);

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jimmy_settings', JSON.stringify(settings));
    } catch {
      // Fallback
    }
  }, [settings]);

  // Keyboard shortcut: Cmd/Ctrl + N for new chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Active conversation object
  const activeConversation = useMemo(() => {
    if (!activeConversationId) return null;
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [activeConversationId, conversations]);

  // Start new chat
  const handleNewChat = useCallback(() => {
    voiceAssistant.stop();
    setIsSpeaking(false);
    setCurrentlySpokenText(undefined);
    setActiveConversationId(null);
    setJimmyState('idle');
    setIsMobileSidebarOpen(false);
    soundEffects.playBlip(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Select existing conversation
  const handleSelectConversation = useCallback((id: string) => {
    voiceAssistant.stop();
    setIsSpeaking(false);
    setCurrentlySpokenText(undefined);
    setActiveConversationId(id);
    setJimmyState('idle');
    setIsMobileSidebarOpen(false);
    soundEffects.playBlip(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Delete conversation
  const handleDeleteConversation = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
      soundEffects.playBlip(settings.soundEnabled);
    },
    [activeConversationId, settings.soundEnabled]
  );

  // Clear all history
  const handleClearHistory = useCallback(() => {
    setConversations([]);
    setActiveConversationId(null);
    localStorage.removeItem('jimmy_conversations');
  }, []);

  // Update settings
  const handleUpdateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  // Speak response text via SpeechSynthesis
  const handleSpeak = useCallback(
    (text: string) => {
      soundEffects.playBlip(settings.soundEnabled);
      setCurrentlySpokenText(text);
      setJimmyState('speaking');
      setIsSpeaking(true);

      voiceAssistant.speak(
        text,
        settings.language,
        settings.voicePitch,
        settings.voiceRate,
        () => {
          setIsSpeaking(true);
          setJimmyState('speaking');
        },
        () => {
          setIsSpeaking(false);
          setJimmyState('idle');
          setCurrentlySpokenText(undefined);
        },
        () => {
          setIsSpeaking(false);
          setJimmyState('idle');
          setCurrentlySpokenText(undefined);
        }
      );
    },
    [settings]
  );

  // Stop vocal speech
  const handleStopSpeech = useCallback(() => {
    voiceAssistant.stop();
    setIsSpeaking(false);
    setJimmyState('idle');
    setCurrentlySpokenText(undefined);
    soundEffects.playBlip(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Send message handler
  const handleSendMessage = useCallback(
    (text: string, attachedFile?: { name: string; size: string; type: string }) => {
      if (!text.trim() && !attachedFile) return;

      soundEffects.playSend(settings.soundEnabled);
      setJimmyState('thinking');

      const userMsg: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: 'user',
        content: text,
        timestamp: Date.now(),
        attachedFile,
      };

      let targetConvId = activeConversationId;
      let newConversations = [...conversations];

      // If in welcome mode or no active chat, create a fresh conversation
      if (!targetConvId) {
        targetConvId = `conv-${Date.now()}`;
        const newTitle = text.slice(0, 36) || (attachedFile ? attachedFile.name : 'New Dialogue');
        const newConv: Conversation = {
          id: targetConvId,
          title: newTitle,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [userMsg],
        };
        newConversations = [newConv, ...newConversations];
        setConversations(newConversations);
        setActiveConversationId(targetConvId);
      } else {
        newConversations = newConversations.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              updatedAt: Date.now(),
              messages: [...c.messages, userMsg],
            };
          }
          return c;
        });
        setConversations(newConversations);
      }

      // Simulate neural cognitive processing
      setTimeout(() => {
        const demoResult = generateDemoResponse(text, settings.language);
        const assistantMsg: Message = {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          role: 'assistant',
          content: demoResult.content,
          timestamp: Date.now(),
          thoughtProcess: demoResult.thoughtProcess,
          isDemo: true,
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === targetConvId) {
              return {
                ...c,
                updatedAt: Date.now(),
                messages: [...c.messages, assistantMsg],
              };
            }
            return c;
          })
        );

        soundEffects.playReceive(settings.soundEnabled);
        setJimmyState('idle');

        // If in voice modal or auto-speak is enabled, vocalize response
        if (isVoiceModalOpen || settings.autoSpeakResponse) {
          setVoiceTranscript(assistantMsg.content.slice(0, 160) + '...');
          handleSpeak(assistantMsg.content);
        }
      }, 750);
    },
    [activeConversationId, conversations, settings, isVoiceModalOpen, handleSpeak]
  );

  // Regenerate response
  const handleRegenerate = useCallback(
    (messageId: string) => {
      if (!activeConversation) return;

      const msgIndex = activeConversation.messages.findIndex((m) => m.id === messageId);
      if (msgIndex <= 0) return;

      const userPromptMsg = activeConversation.messages[msgIndex - 1];
      if (userPromptMsg.role !== 'user') return;

      soundEffects.playBlip(settings.soundEnabled);
      setJimmyState('thinking');

      setTimeout(() => {
        const newDemo = generateDemoResponse(userPromptMsg.content, settings.language);
        const updatedMsg: Message = {
          ...activeConversation.messages[msgIndex],
          content: newDemo.content,
          thoughtProcess: newDemo.thoughtProcess,
          timestamp: Date.now(),
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === activeConversation.id) {
              const updatedMessages = [...c.messages];
              updatedMessages[msgIndex] = updatedMsg;
              return { ...c, updatedAt: Date.now(), messages: updatedMessages };
            }
            return c;
          })
        );

        soundEffects.playReceive(settings.soundEnabled);
        setJimmyState('idle');
      }, 700);
    },
    [activeConversation, settings]
  );

  // Open voice mode
  const handleOpenVoice = useCallback(() => {
    soundEffects.playActivateVoice(settings.soundEnabled);
    setIsVoiceModalOpen(true);
    setJimmyState('listening');
    setVoiceTranscript('Listening... Speak a query or select a vocal simulation preset.');
  }, [settings.soundEnabled]);

  // Simulate voice query inside voice modal
  const handleSimulateVoiceQuery = useCallback(
    (query: string) => {
      setVoiceTranscript(`"${query}"`);
      handleSendMessage(query);
    },
    [handleSendMessage]
  );

  // Theme styling classes
  const themeClasses = useMemo(() => {
    switch (settings.theme) {
      case 'cyberpunk':
        return 'bg-[#080512] text-slate-100 selection:bg-fuchsia-500/30';
      case 'aurora':
        return 'bg-[#040d12] text-slate-100 selection:bg-emerald-500/30';
      case 'titanium':
        return 'bg-[#08090d] text-slate-100 selection:bg-slate-500/30';
      case 'space':
      default:
        return 'bg-[#040508] text-slate-100 selection:bg-cyan-500/30';
    }
  }, [settings.theme]);

  const activeMessages = activeConversation ? activeConversation.messages : [];

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${themeClasses} relative`}>
      {/* 0. Ambient Next-Gen Stardust Particle Field */}
      <ParticleCanvas
        jimmyState={jimmyState}
        enabled={settings.animationEnabled}
      />

      {/* 1. Left Sidebar OS Dock */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSettings={() => {
          soundEffects.playBlip(settings.soundEnabled);
          setIsSettingsModalOpen(true);
        }}
        onOpenExplore={() => {
          soundEffects.playBlip(settings.soundEnabled);
          setIsExploreModalOpen(true);
        }}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        jimmyState={jimmyState}
      />

      {/* 2. Main Dashboard & Chat Screen */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Top OS Navigation & HUD Bar */}
        <header className="h-14 sm:h-16 px-4 sm:px-6 border-b border-white/[0.08] flex items-center justify-between glass-panel z-20 flex-shrink-0 relative overflow-hidden">
          {/* Subtle top neon ambient glow strip */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Conversation Title & State Monitor */}
            <div className="flex items-center gap-3">
              <Orb
                size="compact"
                state={jimmyState}
                onClick={() => soundEffects.playBlip(settings.soundEnabled)}
              />
              <div>
                <h1 className="font-display font-semibold text-xs sm:text-sm text-slate-100 truncate max-w-[160px] sm:max-w-md">
                  {activeConversation ? activeConversation.title : 'JIMMY Neural Operating System'}
                </h1>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span className="text-cyan-400 font-semibold uppercase tracking-wider">{jimmyState}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-violet-300 uppercase">{settings.language}</span>
                  <span aria-hidden="true">·</span>
                  <span className="hidden sm:inline text-slate-400">{sysTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Header HUD Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Live System Time pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-slate-400">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{sysTime}</span>
            </div>

            {/* Explore Trigger */}
            <button
              onClick={() => {
                soundEffects.playBlip(settings.soundEnabled);
                setIsExploreModalOpen(true);
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-white/[0.08] hover:border-violet-500/40 text-slate-300 hover:text-white hover:bg-violet-950/20 transition-all hidden sm:flex items-center gap-1.5 text-xs font-medium"
              title="Explore Capabilities"
            >
              <Compass className="w-3.5 h-3.5 text-violet-400" />
              <span>Capabilities</span>
            </button>

            {/* Language Quick Switcher */}
            <button
              onClick={() => {
                const nextLang: Language =
                  settings.language === 'en' ? 'hi' : settings.language === 'hi' ? 'or' : 'en';
                handleUpdateSettings({ language: nextLang });
                soundEffects.playBlip(settings.soundEnabled);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-white/[0.08] hover:border-cyan-400/50 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Switch Language: English / Hindi / Odia"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="uppercase font-semibold">{settings.language}</span>
            </button>

            {/* Voice Matrix Button with Neon Bloom */}
            <button
              onClick={handleOpenVoice}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-violet-600/20 hover:from-cyan-500/30 hover:to-violet-600/30 border border-cyan-400/50 text-cyan-200 text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:scale-105 active:scale-95"
              title="Open Voice Interface"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Voice Matrix</span>
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => {
                soundEffects.playBlip(settings.soundEnabled);
                setIsSettingsModalOpen(true);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="System Configuration"
              aria-label="Settings"
            >
              <Sliders className="w-4 h-4 hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </header>

        {/* Chat Stream & Welcome State */}
        <ChatArea
          messages={activeMessages}
          jimmyState={jimmyState}
          onSelectPrompt={handleSendMessage}
          onRegenerate={handleRegenerate}
          onSpeak={handleSpeak}
          isSpeaking={isSpeaking}
          currentlySpokenText={currentlySpokenText}
          onStopSpeech={handleStopSpeech}
          onOrbClick={() => soundEffects.playReceive(settings.soundEnabled)}
        />

        {/* Message Input Deck */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onOpenVoice={handleOpenVoice}
          disabled={jimmyState === 'thinking'}
        />
      </div>

      {/* 3. Voice Interface Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => {
          setIsVoiceModalOpen(false);
          handleStopSpeech();
          soundEffects.playDeactivateVoice(settings.soundEnabled);
        }}
        jimmyState={jimmyState}
        onSimulateVoiceQuery={handleSimulateVoiceQuery}
        onStopSpeech={handleStopSpeech}
        isSpeaking={isSpeaking}
        language={settings.language}
        transcript={voiceTranscript}
      />

      {/* 4. Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onClearHistory={handleClearHistory}
        conversationCount={conversations.length}
      />

      {/* 5. Explore Features Modal */}
      <ExploreModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
        onSelectFeaturePrompt={handleSendMessage}
        soundEnabled={settings.soundEnabled}
      />
    </div>
  );
}
