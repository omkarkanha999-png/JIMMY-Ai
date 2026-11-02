import React, { useRef, useEffect, useState } from 'react';
import { Send, Mic, Paperclip, X, FileText, ArrowUp, Sparkles, Terminal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, attachedFile?: { name: string; size: string; type: string }) => void;
  onOpenVoice: () => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onOpenVoice,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if ((!text.trim() && !attachedFile) || disabled) return;
    onSendMessage(text.trim(), attachedFile || undefined);
    setText('');
    setAttachedFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const sizeStr = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;
      setAttachedFile({
        name: file.name,
        size: sizeStr,
        type: file.type || 'document',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 sm:pb-6 relative z-20">
      {/* File Attachment Chip */}
      {attachedFile && (
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-xs text-cyan-200 backdrop-blur-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] animate-fade-in">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-medium truncate max-w-[200px]">{attachedFile.name}</span>
          <span className="text-[10px] text-cyan-400/70 font-mono">({attachedFile.size})</span>
          <button
            onClick={() => setAttachedFile(null)}
            className="p-1 hover:text-white hover:bg-white/10 rounded-md transition-colors ml-1"
            title="Remove attachment"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Glass Command Capsule with Neon Border Horizon */}
      <div className="relative rounded-2xl glass-panel p-2 sm:p-2.5 transition-all duration-300 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_35px_rgba(0,240,255,0.22)] focus-within:bg-[#0a0e1a]/95">
        {/* Subtle top edge specular hairline */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        <div className="flex items-end gap-2">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Attachment Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors flex-shrink-0 disabled:opacity-40"
            title="Attach file or context"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dynamic Auto-Growing Textarea */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder="Direct your inquiry to JIMMY..."
            className="flex-1 bg-transparent border-0 text-slate-100 placeholder:text-slate-400 text-sm sm:text-base resize-none focus:outline-none py-1.5 px-1 max-h-44 leading-relaxed font-normal"
          />

          {/* Vocal Mode Trigger */}
          <button
            type="button"
            onClick={onOpenVoice}
            disabled={disabled}
            className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors flex-shrink-0 relative group disabled:opacity-40"
            title="Open Vocal Matrix"
            aria-label="Open voice mode"
          >
            <Mic className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:text-cyan-300 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
          </button>

          {/* Send Command Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || (!text.trim() && !attachedFile)}
            className={`p-2 sm:p-2.5 rounded-xl flex-shrink-0 transition-all duration-200 ${
              text.trim() || attachedFile
                ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-black font-semibold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95'
                : 'bg-white/[0.04] text-slate-500 cursor-not-allowed'
            }`}
            title="Transmit message (Enter)"
            aria-label="Send message"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Capsule Footer Status */}
        <div className="mt-2 pt-1.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-400 px-1 font-mono">
          <div className="flex items-center gap-2">
            <span>Transmit <kbd className="px-1 py-0.2 bg-white/5 rounded border border-white/10 text-slate-300">Enter ↵</kbd></span>
            <span aria-hidden="true">·</span>
            <span className="hidden sm:inline">Newline <kbd className="px-1 py-0.2 bg-white/5 rounded border border-white/10 text-slate-300">Shift + Enter</kbd></span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Neural Link Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
};
