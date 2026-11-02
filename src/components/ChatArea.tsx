import React, { useState, useRef, useEffect } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Atom,
  Music,
  Calendar,
  Compass,
  FileText,
  Clock,
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';
import { Message, JimmyState } from '../types';
import { Orb } from './Orb';

interface ChatAreaProps {
  messages: Message[];
  jimmyState: JimmyState;
  onSelectPrompt: (promptText: string) => void;
  onRegenerate: (messageId: string) => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  currentlySpokenText?: string;
  onStopSpeech: () => void;
  onOrbClick?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  jimmyState,
  onSelectPrompt,
  onRegenerate,
  onSpeak,
  isSpeaking,
  currentlySpokenText,
  onStopSpeech,
  onOrbClick,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages or state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, jimmyState]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleThought = (id: string) => {
    setExpandedThoughts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const suggestedPrompts = [
    {
      title: 'Explain Quantum Physics',
      prompt: 'Explain quantum physics',
      desc: 'Superposition, wave-particle duality & cosmic entanglement.',
      icon: Atom,
      glow: 'hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]',
      accentColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    },
    {
      title: 'Compose a Song for Me',
      prompt: 'Write a song for me',
      desc: 'Atmospheric neo-soul lyrics and cybernetic melodic meter.',
      icon: Music,
      glow: 'hover:border-violet-400/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]',
      accentColor: 'text-violet-400 bg-violet-950/40 border-violet-500/30',
    },
    {
      title: 'Help Me Plan My Day',
      prompt: 'Help me plan my day',
      desc: 'Ultradian circadian rhythm & peak cognitive focus architecture.',
      icon: Calendar,
      glow: 'hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
      accentColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
    {
      title: 'Tell Me Something Interesting',
      prompt: 'Tell me something interesting',
      desc: 'Deep astrophysics anomalies, supersonic storms & extreme realities.',
      icon: Compass,
      glow: 'hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
      accentColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
      {/* 1. Welcome State: Orb as Central Visual Anchor */}
      {messages.length === 0 ? (
        <div className="min-h-[75vh] flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-4 relative">
          {/* Ambient Radial Backlight behind the Orb */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-violet-600/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Central AI Orb Display with Reticle Frame */}
          <div className="relative mb-8 sm:mb-10 animate-float-subtle group">
            {/* Outer Subtle HUD Reticle */}
            <div className="absolute -inset-6 rounded-full border border-white/[0.06] pointer-events-none" />
            <div className="absolute -inset-10 rounded-full border border-dashed border-cyan-500/15 pointer-events-none animate-orbit-1" />

            {/* The Main Glowing AI Orb */}
            <Orb
              state={jimmyState}
              size="large"
              onClick={onOrbClick}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            {/* Interactive Status Pill beneath Orb */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-mono uppercase tracking-widest text-cyan-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>JIMMY Core Online</span>
            </div>
          </div>

          {/* Futuristic Hero Typography */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 mb-3 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            Hello, I'm JIMMY.
          </h1>
          <p className="text-base sm:text-xl text-slate-400 font-normal tracking-wide max-w-xl mb-10 sm:mb-12">
            Your world. Your intelligence.
          </p>

          {/* Suggested Prompts Holographic Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-2xl text-left">
            {suggestedPrompts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => onSelectPrompt(item.prompt)}
                  className={`p-4 sm:p-4.5 rounded-2xl glass-panel-interactive border group flex flex-col justify-between ${item.glow}`}
                >
                  <div className="flex items-start justify-between w-full mb-3">
                    <span className={`p-2.5 rounded-xl border ${item.accentColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </span>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* 2. Active Conversation Dialogue Stream */
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 pb-6">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isThoughtsOpen = !!expandedThoughts[message.id];

            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}
              >
                {/* User Message Bubble */}
                {isUser ? (
                  <div className="max-w-[88%] sm:max-w-2xl rounded-2xl rounded-br-sm px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-600/25 via-sky-600/30 to-violet-600/25 border border-cyan-400/35 text-slate-100 shadow-xl shadow-black/50 backdrop-blur-xl">
                    {/* Attached file chip */}
                    {message.attachedFile && (
                      <div className="mb-2.5 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-cyan-400/30 text-xs text-cyan-300">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="truncate max-w-[200px] font-medium">{message.attachedFile.name}</span>
                        <span className="text-[10px] text-cyan-400/70 font-mono">({message.attachedFile.size})</span>
                      </div>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
                      {message.content}
                    </p>
                    <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-cyan-300/70 font-mono">
                      <Clock className="w-2.5 h-2.5" />
                      <span>
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Assistant JIMMY Message Card */
                  <div className="w-full max-w-3xl rounded-2xl glass-panel p-5 sm:p-6 border border-white/[0.09] shadow-2xl relative group overflow-hidden">
                    {/* Subtle top neon specular hairline highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                    {/* Card Header with Glowing Mini-Orb */}
                    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <Orb
                          size="compact"
                          state={isSpeaking && currentlySpokenText === message.content ? 'speaking' : 'idle'}
                          interactive={false}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-400">
                              JIMMY
                            </span>
                            <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-mono">
                              Neural Core
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Top Quick Copy Button */}
                      <button
                        onClick={() => handleCopy(message.id, message.content)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors"
                        title="Copy entire response"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Collapsible Reasoning Trace */}
                    {message.thoughtProcess && message.thoughtProcess.length > 0 && (
                      <div className="mb-4 rounded-xl bg-black/40 border border-violet-500/25 overflow-hidden">
                        <button
                          onClick={() => toggleThought(message.id)}
                          className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs text-violet-300 hover:text-violet-200 hover:bg-violet-950/20 transition-colors font-mono"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                            <span>Reasoning Matrix ({message.thoughtProcess.length} cognitive vectors)</span>
                          </span>
                          {isThoughtsOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {isThoughtsOpen && (
                          <div className="px-4 py-3 pt-0 border-t border-violet-500/15 space-y-2 text-xs text-slate-400 font-mono">
                            {message.thoughtProcess.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <span className="text-violet-400 select-none">›</span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Formatted Content */}
                    <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                      {renderFormattedMessage(message.content, handleCopy)}
                    </div>

                    {/* Bottom Action Deck */}
                    <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        {/* Text to Speech Button */}
                        <button
                          onClick={() => {
                            if (isSpeaking && currentlySpokenText === message.content) {
                              onStopSpeech();
                            } else {
                              onSpeak(message.content);
                            }
                          }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                            isSpeaking && currentlySpokenText === message.content
                              ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                              : 'border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-200'
                          }`}
                          title="Read aloud with voice synthesis"
                        >
                          {isSpeaking && currentlySpokenText === message.content ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Mute Speech</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Vocalize</span>
                            </>
                          )}
                        </button>

                        {/* Regenerate Button */}
                        <button
                          onClick={() => onRegenerate(message.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-200 transition-colors"
                          title="Recompute response"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Regenerate</span>
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(message.id, message.content)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] hover:text-slate-200 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-cyan-400/80">
                        <Cpu className="w-3 h-3" />
                        <span>Stage 1 Verified</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking / Neural Pulse Indicator */}
          {jimmyState === 'thinking' && (
            <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl glass-panel max-w-md border border-violet-500/40 shadow-[0_0_30px_rgba(139,92,246,0.25)] animate-pulse">
              <Orb size="compact" state="thinking" interactive={false} />
              <div>
                <div className="text-xs font-semibold text-violet-300 font-display flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-violet-400 animate-spin" />
                  <span>Synthesizing Cognitive Model...</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Analyzing dimensional parameters & formulating response
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

/**
 * Format markdown elements with syntax highlighting styling and clean blocks
 */
function renderFormattedMessage(
  content: string,
  onCopy: (id: string, text: string) => void
): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        const fullCode = codeBuffer.join('\n');
        const codeId = `code-block-${i}`;
        elements.push(
          <div
            key={codeId}
            className="my-3.5 rounded-xl bg-[#03050a] border border-cyan-500/30 p-4 font-mono text-xs text-cyan-200 shadow-inner relative group/code overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-[10px] text-slate-400">
              <span className="uppercase font-semibold tracking-wider text-cyan-400">TypeScript / Neural Code</span>
              <button
                onClick={() => onCopy(codeId, fullCode)}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </button>
            </div>
            <pre className="overflow-x-auto leading-relaxed">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={i}
          className="font-display font-bold text-base sm:text-lg text-cyan-300 pt-3 pb-1 border-b border-cyan-500/15"
        >
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4
          key={i}
          className="font-display font-semibold text-sm sm:text-base text-violet-300 pt-1.5"
        >
          {line.replace('#### ', '')}
        </h4>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-cyan-400 pl-3.5 py-1.5 my-2.5 text-slate-300 italic bg-white/[0.02] rounded-r-lg"
        >
          {line.replace('> ', '')}
        </blockquote>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <div key={i} className="flex items-start gap-2.5 ml-1 text-slate-300">
          <span className="text-cyan-400 mt-1 select-none text-xs">●</span>
          <span>{line.replace(/^[-*]\s+/, '')}</span>
        </div>
      );
    } else if (line.startsWith('|') && line.endsWith('|')) {
      elements.push(
        <div key={i} className="font-mono text-xs overflow-x-auto py-0.5 text-slate-300">
          {line}
        </div>
      );
    } else if (line.trim().length > 0) {
      elements.push(
        <p key={i} className="text-slate-200">
          {line}
        </p>
      );
    }
  }

  return elements;
}
