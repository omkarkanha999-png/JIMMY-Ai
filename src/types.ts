export type Role = 'user' | 'assistant';

export type JimmyState = 'idle' | 'listening' | 'thinking' | 'speaking';

export type Language = 'en' | 'hi' | 'or';

export type Theme = 'space' | 'cyberpunk' | 'aurora' | 'titanium';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  attachedFile?: {
    name: string;
    size: string;
    type: string;
  };
  thoughtProcess?: string[];
  isDemo?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  isPinned?: boolean;
  messages: Message[];
}

export interface UserSettings {
  theme: Theme;
  language: Language;
  soundEnabled: boolean;
  animationEnabled: boolean;
  autoSpeakResponse: boolean;
  voicePitch: number;
  voiceRate: number;
}

export interface ExploreFeature {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
  badge: string;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  preview: string;
}
