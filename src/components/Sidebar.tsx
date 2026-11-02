import React from 'react';
import {
  Plus,
  Search,
  MessageSquare,
  Sparkles,
  Settings as SettingsIcon,
  Trash2,
  X,
  Compass,
  Pin,
  Command,
  Activity
} from 'lucide-react';
import { Conversation, JimmyState } from '../types';
import { Orb } from './Orb';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string, e: React.MouseEvent) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenSettings: () => void;
  onOpenExplore: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  jimmyState: JimmyState;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  searchQuery,
  onSearchChange,
  onOpenSettings,
  onOpenExplore,
  isOpen,
  onCloseMobile,
  jimmyState,
}) => {
  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden animate-fade-in"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 sm:w-80 flex flex-col bg-[#06080f]/95 lg:bg-[#05070d]/90 backdrop-blur-3xl border-r border-white/[0.08] transition-transform duration-300 ease-in-out select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Brand OS Signature */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.06] relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Orb size="compact" state={jimmyState} interactive={false} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                  JIMMY
                </span>
                <span className="text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded border border-cyan-500/40 text-cyan-300 font-mono bg-cyan-950/40">
                  OS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight font-mono">Personal AI Companion</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action: New Chat Button */}
        <div className="p-3 sm:p-4 space-y-2.5">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-violet-600/25 hover:from-cyan-500/30 hover:to-violet-600/35 border border-cyan-500/40 hover:border-cyan-400/60 text-cyan-200 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 group shadow-[0_0_20px_rgba(0,240,255,0.15)]"
          >
            <span className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform duration-200" />
              <span>New Dialogue</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-black/50 rounded border border-white/10">
              <Command className="w-2.5 h-2.5" />N
            </kbd>
          </button>

          {/* Quick Search with Neon Border Focus */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter memory index..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/[0.03] border border-white/[0.07] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all font-mono"
            />
          </div>
        </div>

        {/* Conversation Memories List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-2 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-display">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Active Threads</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">{filteredConversations.length}</span>
          </div>

          {filteredConversations.length === 0 ? (
            <div className="py-10 px-4 text-center">
              <p className="text-xs text-slate-400 font-mono">
                {searchQuery ? 'No matching dialogue.' : 'Memory vault empty.'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Direct a question to start.</p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  role="button"
                  tabIndex={0}
                  className={`group relative flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-violet-500/10 border border-cyan-400/50 text-cyan-100 font-medium shadow-[0_0_15px_rgba(0,240,255,0.18)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <MessageSquare
                      className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                        isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_#00f0ff]' : 'text-slate-500 group-hover:text-slate-400'
                      }`}
                    />
                    <span className="truncate">{conv.title}</span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => onDeleteConversation(conv.id, e)}
                      title="Erase memory thread"
                      className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Explore Capabilities Portal */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={onOpenExplore}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gradient-to-r from-violet-950/30 to-indigo-950/20 border border-violet-500/30 hover:border-violet-400/60 text-xs text-violet-200 hover:text-white transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            <Compass className="w-4 h-4 text-violet-400 group-hover:rotate-45 transition-transform" />
            <div className="text-left flex-1 min-w-0">
              <div className="font-semibold truncate">Explore Capabilities</div>
              <div className="text-[10px] text-violet-300/70 font-mono">Quantum, lyrics, planning & code</div>
            </div>
          </button>
        </div>

        {/* Footer: User Profile & Settings Dock */}
        <div className="p-3.5 sm:p-4 border-t border-white/[0.06] bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-violet-600 flex items-center justify-center text-black text-xs font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              LR
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">Laxmipriya Rout</div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                <span>Synchronized</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors"
            title="System Settings"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-4 h-4 hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </aside>
    </>
  );
};
