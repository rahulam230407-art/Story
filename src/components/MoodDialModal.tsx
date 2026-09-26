import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Compass,
  ArrowRight,
  RefreshCw,
  Wand2,
} from 'lucide-react';
import { PRESET_MOODS } from '../data/mockData';
import { UserProfile } from '../types';

interface MoodDialModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSelectMoodForGeneration: (moodName: string) => void;
}

export const MoodDialModal: React.FC<MoodDialModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSelectMoodForGeneration,
}) => {
  const [selectedMood, setSelectedMood] = useState(PRESET_MOODS[0]);
  const [dialRotation, setDialRotation] = useState(0);

  if (!isOpen) return null;

  const handleDialClick = (mood: typeof PRESET_MOODS[0], index: number) => {
    setSelectedMood(mood);
    setDialRotation(index * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#8b5cf6]/40 bg-[#0f131c] p-6 shadow-2xl sm:p-8">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#8b5cf6]/20 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2028] text-[#9ca3af] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#d0bcff]">
            <Sparkles className="h-3.5 w-3.5 text-[#ffc174]" />
            AI Mood Muse Engine v4.2
          </div>
          <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#ffc174]">
            Celestial Mood Dial
          </h2>
          <p className="mt-1 text-xs text-[#9ca3af]">
            Tune your emotional frequency. Calibrated for {userProfile.name}&apos;s profile (
            {userProfile.ageBracket}).
          </p>
        </div>

        {/* Constellation Dial Circle */}
        <div className="relative mx-auto my-8 flex h-56 w-56 items-center justify-center">
          {/* Rotating Outer Ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#8b5cf6]/40 transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${dialRotation}deg)` }}
          />

          {/* Central Active Mood Node */}
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#f59e0b]/50 bg-[#161f30] text-center shadow-lg shadow-[#8b5cf6]/20">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: selectedMood.color }}
            />
            <span className="mt-1 px-2 text-[11px] font-bold text-[#dfe2ee]">
              {selectedMood.name.split(' ')[0]}
            </span>
          </div>

          {/* Orbiting Mood Points */}
          {PRESET_MOODS.map((mood, i) => {
            const angle = (i * 360) / PRESET_MOODS.length - 90;
            const radius = 95; // px from center
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const isCurrent = selectedMood.id === mood.id;

            return (
              <button
                key={mood.id}
                onClick={() => handleDialClick(mood, i)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`group absolute flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                  isCurrent
                    ? 'scale-125 bg-gradient-to-tr from-[#f59e0b] to-[#8b5cf6] text-[#0b0f17] shadow-md shadow-[#f59e0b]/40 ring-2 ring-white'
                    : 'bg-[#1c2028] hover:scale-110 hover:border-[#8b5cf6]'
                }`}
                title={mood.name}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: isCurrent ? '#0b0f17' : mood.color }}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Mood Card details */}
        <div className="rounded-2xl border border-[#1f2937] bg-[#111827] p-4 text-center">
          <h4 className="font-serif text-base font-bold text-[#ffc174]">
            {selectedMood.name}
          </h4>
          <p className="mt-1 text-xs text-[#9ca3af]">{selectedMood.tone}</p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                onSelectMoodForGeneration(selectedMood.name);
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] px-5 py-2 text-xs font-bold text-[#0b0f17] shadow-md shadow-[#f59e0b]/20 hover:brightness-110"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>Weave Story in this Mood</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
