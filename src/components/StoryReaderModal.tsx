import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  Headphones,
  BookOpen,
  Share2,
  Bookmark,
  Sparkles,
  Sliders,
  Check,
  Minimize2,
} from 'lucide-react';
import { CuratedStory, UserProfile } from '../types';

interface StoryReaderModalProps {
  story: CuratedStory | null;
  onClose: () => void;
  userProfile: UserProfile;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  story,
  onClose,
  userProfile,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'space' | 'vinyl'>('none');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (ambientNodeRef.current) {
        try {
          ambientNodeRef.current.stop();
        } catch (_) {}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!story) return null;

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported on this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const textToRead = `${story.title}. By ${story.author}. ${story.contentSample}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);

        const isHindi =
          story.language === 'Hindi' || /[\u0900-\u097F]/.test(story.contentSample);

        const voices = window.speechSynthesis.getVoices();
        if (isHindi) {
          utterance.lang = 'hi-IN';
          utterance.rate = 0.9;
          const hindiVoice = voices.find(
            (v) =>
              v.lang.startsWith('hi') ||
              v.name.toLowerCase().includes('hindi') ||
              v.name.includes('हिन्दी')
          );
          if (hindiVoice) utterance.voice = hindiVoice;
        } else {
          utterance.lang = 'en-US';
          utterance.rate = 0.95;
          const englishVoice = voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
          ) || voices.find((v) => v.lang.startsWith('en'));
          if (englishVoice) utterance.voice = englishVoice;
        }

        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(100);
        };

        utterance.onboundary = (e) => {
          if (e.charIndex && textToRead.length) {
            setAudioProgress(Math.round((e.charIndex / textToRead.length) * 100));
          }
        };

        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const toggleAmbientSound = (type: 'none' | 'rain' | 'space' | 'vinyl') => {
    if (ambientSound === type || type === 'none') {
      if (ambientNodeRef.current) {
        try {
          ambientNodeRef.current.stop();
        } catch (_) {}
      }
      setAmbientSound('none');
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      if (ambientNodeRef.current) {
        try {
          ambientNodeRef.current.stop();
        } catch (_) {}
      }

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : type === 'space' ? 'bandpass' : 'highpass';
      filter.frequency.value = type === 'rain' ? 800 : type === 'space' ? 180 : 1200;

      const gain = ctx.createGain();
      gain.gain.value = 0.04;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(0);
      ambientNodeRef.current = noise;
      setAmbientSound(type);
    } catch (_) {
      setAmbientSound('none');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-xl">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#1f2937] bg-[#111827] shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#1f2937] bg-[#0b0f17] px-6 py-3.5">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold text-[#0b0f17]">
              {story.format}
            </span>
            {story.language && (
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                {story.language === 'Hindi' ? '🇮🇳 हिंदी' : story.language}
              </span>
            )}
            <span className="text-xs text-[#9ca3af]">{story.duration}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="text-xs font-semibold text-[#9ca3af] hover:text-[#dfe2ee]"
              title="Toggle reading font size"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2028] text-[#dfe2ee] hover:bg-[#374151]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12">
          {/* Header Banner */}
          <div className="mb-8 border-b border-[#1f2937] pb-6">
            <div className="flex flex-wrap gap-1.5 text-xs text-[#8b5cf6]">
              {story.moodTags.map((m, i) => (
                <span key={i}>#{m}</span>
              ))}
            </div>

            <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#ffc174] sm:text-4xl">
              {story.title}
            </h1>
            <p className="mt-1 font-serif text-sm italic text-[#d8c3ad]">
              {story.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#9ca3af]">
              <span>Author: <strong className="text-[#dfe2ee]">{story.author}</strong></span>
              {story.voiceActor && (
                <span>Voice Actor: <strong className="text-[#dfe2ee]">{story.voiceActor}</strong></span>
              )}
              <span>Tuned for: <strong className="text-[#ffc174]">{story.ageBracket}</strong></span>
            </div>

            {/* Soundscape direction */}
            <div className="mt-3 rounded-lg border border-[#1f2937] bg-[#0b0f17]/60 p-2.5 text-xs text-[#9ca3af]">
              <span className="font-semibold text-[#dfe2ee]">Soundscape Direction: </span>
              {story.soundscapeSnippet}
            </div>
          </div>

          {/* Reading text */}
          <div
            className={`leading-[2.2rem] text-[#dfe2ee] sm:leading-[2.4rem] ${
              story.language === 'Hindi'
                ? 'font-[\'Noto_Serif_Devanagari\',serif]'
                : 'font-serif'
            } ${
              fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}
          >
            {story.contentSample.split('\n\n').map((para, i) => (
              <p key={i} className="mb-6 text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Floating Bottom Audio Dock */}
        <div className="border-t border-[#1f2937] bg-[#0b0f17] p-4 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Play Button & Progress */}
            <div className="flex flex-1 items-center gap-3">
              <button
                onClick={handleToggleSpeech}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17] shadow-md shadow-[#f59e0b]/30"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-[#0b0f17]" />
                ) : (
                  <Play className="h-4 w-4 fill-[#0b0f17] pl-0.5" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex justify-between text-xs text-[#dfe2ee]">
                  <span>{isPlaying ? 'Streaming Audio Narration' : 'Play Spatial Audio'}</span>
                  <span className="text-[11px] text-[#9ca3af]">{audioProgress}%</span>
                </div>
                <div className="mt-1 h-1 w-full rounded-full bg-[#1f2937]">
                  <div
                    className="h-full bg-[#f59e0b] transition-all"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Ambient Soundscape selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#9ca3af]">Ambient:</span>
              <button
                onClick={() => toggleAmbientSound('rain')}
                className={`rounded px-2 py-0.5 text-[11px] ${
                  ambientSound === 'rain' ? 'bg-[#8b5cf6] text-white' : 'bg-[#1c2028] text-[#9ca3af]'
                }`}
              >
                🌧 Rain
              </button>
              <button
                onClick={() => toggleAmbientSound('space')}
                className={`rounded px-2 py-0.5 text-[11px] ${
                  ambientSound === 'space' ? 'bg-[#8b5cf6] text-white' : 'bg-[#1c2028] text-[#9ca3af]'
                }`}
              >
                🌌 Space
              </button>
              <button
                onClick={() => toggleAmbientSound('vinyl')}
                className={`rounded px-2 py-0.5 text-[11px] ${
                  ambientSound === 'vinyl' ? 'bg-[#8b5cf6] text-white' : 'bg-[#1c2028] text-[#9ca3af]'
                }`}
              >
                📻 Vinyl
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
