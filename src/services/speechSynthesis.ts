/**
 * Browser Speech Synthesis service for JIMMY.
 * Reads out responses with futuristic cadence and tracks speaking state.
 */

import { Language } from '../types';

export class VoiceAssistant {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  isSupported(): boolean {
    return this.synth !== null;
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  speak(
    text: string,
    language: Language,
    pitch: number = 1.0,
    rate: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ) {
    if (!this.synth) {
      onEnd?.();
      return;
    }

    // Cancel any previous speech
    this.synth.cancel();

    // Clean markdown asterisks and symbols for cleaner vocalization
    const cleanedText = text
      .replace(/[*#`_~]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .slice(0, 1000); // limit spoken chunk for crisp delivery

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    this.currentUtterance = utterance;

    // Language localization
    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (language === 'or') {
      utterance.lang = 'or-IN';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.pitch = Math.max(0.5, Math.min(2, pitch));
    utterance.rate = Math.max(0.5, Math.min(2, rate));

    // Choose preferred voice if available
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => {
      if (language === 'hi') return v.lang.startsWith('hi');
      if (language === 'or') return v.lang.startsWith('or') || v.lang.includes('IN');
      return v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'));
    });

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      onError?.();
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  isSpeaking(): boolean {
    return this.synth?.speaking ?? false;
  }
}

export const voiceAssistant = new VoiceAssistant();
