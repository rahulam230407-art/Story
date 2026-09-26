import React from 'react';
import {
  Check,
  CheckCircle2,
  Sliders,
  Sparkles,
  Users,
  Smile,
  Compass,
  Flame,
  Send,
  Star,
  Lightbulb,
  BookOpen,
  Feather,
  Clapperboard,
  Headphones,
  BookMarked,
  Radio,
  BookOpenCheck,
  Shield,
  ArrowRight,
  BellRing,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { UserProfile } from '../types';
import { VOICE_AFFINITIES, AGE_BRACKETS, STORY_FORMATS } from '../data/mockData';

interface SetupPortalProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onEnterSanctuary: () => void;
  onOpenAIStudio: () => void;
  onOpenPricing: () => void;
}

export const SetupPortal: React.FC<SetupPortalProps> = ({
  userProfile,
  setUserProfile,
  onEnterSanctuary,
  onOpenAIStudio,
  onOpenPricing,
}) => {
  const toggleFormat = (formatLabel: string) => {
    setUserProfile((prev) => {
      const exists = prev.selectedFormats.includes(formatLabel);
      return {
        ...prev,
        selectedFormats: exists
          ? prev.selectedFormats.filter((f) => f !== formatLabel)
          : [...prev.selectedFormats, formatLabel],
      };
    });
  };

  const selectVoiceAffinity = (label: string) => {
    setUserProfile((prev) => ({
      ...prev,
      voiceAffinity: label,
    }));
  };

  const selectAgeBracket = (bracket: { range: string; title: string }) => {
    setUserProfile((prev) => ({
      ...prev,
      ageBracket: bracket.range,
      ageBracketLabel: bracket.title,
    }));
  };

  // Helper for icons in voice affinity
  const renderVoiceIcon = (name: string) => {
    switch (name) {
      case 'Venus':
        return <span className="text-sm font-bold text-[#ffc174]">♀</span>;
      case 'Mars':
        return <span className="text-sm font-bold text-[#ffc174]">♂</span>;
      case 'Sparkles':
        return <Sparkles className="h-4 w-4 text-[#d0bcff]" />;
      case 'Users':
        return <Users className="h-4 w-4 text-[#ffc174]" />;
      default:
        return <Smile className="h-4 w-4 text-[#9ca3af]" />;
    }
  };

  // Helper for age bracket icon
  const renderAgeIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `h-3.5 w-3.5 ${isSelected ? 'text-[#f59e0b]' : 'text-[#9ca3af]'}`;
    switch (iconName) {
      case 'Smile':
        return <Smile className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Send':
        return <Send className={iconClass} />;
      case 'Star':
        return <Star className={`${iconClass} fill-[#f59e0b] text-[#f59e0b]`} />;
      case 'Lightbulb':
        return <Lightbulb className={iconClass} />;
      case 'BookOpen':
        return <BookOpen className={iconClass} />;
      case 'Feather':
        return <Feather className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  // Helper for format icon
  const renderFormatIcon = (name: string) => {
    switch (name) {
      case 'Clapperboard':
        return <Clapperboard className="h-3.5 w-3.5" />;
      case 'Headphones':
        return <Headphones className="h-3.5 w-3.5" />;
      case 'BookMarked':
        return <BookMarked className="h-3.5 w-3.5" />;
      case 'Radio':
        return <Radio className="h-3.5 w-3.5" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="h-3.5 w-3.5" />;
      default:
        return <BookOpen className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f17] px-4 py-8 sm:px-6 lg:px-8">
      {/* Background ambient lighting vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(88,28,135,0.15)_0%,rgba(11,15,23,0)_70%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Top Centered Brand and Tagline */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-tr from-[#f59e0b] to-[#8b5cf6] p-0.5">
              <div className="h-full w-full rounded-[3px] bg-[#0b0f17]" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-white">
              Story<span className="text-[#f59e0b]">Verse</span>
            </span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold italic tracking-tight text-[#ffc174] sm:text-4xl">
            “Every Mood Has a Story, Every Soul Has a Universe.”
          </h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ca3af]">
            Personalized Immersion Engine • Setup Portal
          </p>
        </div>

        {/* 3-Step Setup Progress Bar */}
        <div className="mt-7 flex items-center justify-center">
          <div className="flex items-center gap-3 text-xs">
            {/* Step 1: Authenticate (Completed) */}
            <div className="flex items-center gap-2 font-medium text-[#f59e0b]">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17]">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <span>1. Authenticate</span>
            </div>

            <div className="h-[1px] w-8 bg-[#f59e0b]/40 sm:w-16" />

            {/* Step 2: Demographics & Mood (Active) */}
            <div className="flex items-center gap-2 font-semibold text-[#dfe2ee]">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#571bc1] text-xs font-bold text-white ring-2 ring-[#8b5cf6]/50">
                2
              </div>
              <span className="text-[#dfe2ee]">2. Demographics & Mood</span>
            </div>

            <div className="h-[1px] w-8 bg-[#1f2937] sm:w-16" />

            {/* Step 3: AI Muse Curation (Upcoming) */}
            <button
              onClick={onOpenAIStudio}
              className="flex items-center gap-2 text-[#6b7280] transition-colors hover:text-[#dfe2ee]"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1c2028] text-xs font-medium text-[#6b7280]">
                3
              </div>
              <span>3. AI Muse Curation</span>
            </button>
          </div>
        </div>

        {/* Outer Setup Container Card matching screenshot */}
        <div className="mt-8 rounded-2xl border border-[#1f2937] bg-[#111827]/80 p-5 shadow-2xl backdrop-blur-md sm:p-8">
          {/* User Profile Info Card (Google connected Arjun Sharma) */}
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[#1f2937] bg-[#161f30]/60 p-3.5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              {/* Google G logo avatar */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e293b] ring-1 ring-[#374151]">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#dfe2ee]">
                    {userProfile.name}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#10b981]/10 px-2 py-0.5 text-[10px] font-medium text-[#34d399] ring-1 ring-[#10b981]/30">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    Google Connected
                  </span>
                </div>
                <p className="text-xs text-[#9ca3af]">{userProfile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end text-xs text-[#9ca3af] sm:self-center">
              <button
                onClick={() =>
                  alert('Switching account will reset session credentials.')
                }
                className="flex items-center gap-1.5 rounded-full border border-[#1f2937] bg-[#111827] px-3 py-1 text-xs text-[#dfe2ee] transition-colors hover:border-[#374151] hover:text-[#f59e0b]"
              >
                <RefreshCw className="h-3 w-3 text-[#9ca3af]" />
                Switch Account
              </button>
              <span>•</span>
              <button
                onClick={() =>
                  alert('Signed out from StoryVerse Sanctuary session.')
                }
                className="text-xs text-[#9ca3af] hover:text-[#dfe2ee]"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Section Heading: Tell Us Who's Listening & Reading */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-[#f59e0b]" />
                <h2 className="font-serif text-xl font-medium text-[#dfe2ee]">
                  Tell Us Who&apos;s Listening &amp; Reading
                </h2>
              </div>
              <span className="rounded-full bg-[#1f2937] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#d8c3ad]">
                Profile Tuning
              </span>
            </div>
            <p className="mt-1 text-xs text-[#9ca3af]">
              StoryVerse tailors narration tones, content safety, ambient soundscapes,
              and AI Mood Muse recommendations to your profile.
            </p>
          </div>

          {/* SECTION A: Narrative Identity & Voice Affinity */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#dfe2ee]">
                • A. Narrative Identity &amp; Voice Affinity
              </span>
              <span className="text-[11px] text-[#9ca3af]">
                Select primary persona
              </span>
            </div>

            {/* 5 Cards Row */}
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {VOICE_AFFINITIES.map((item) => {
                const isSelected = userProfile.voiceAffinity === item.label;
                return (
                  <button
                    key={item.id}
                    onClick={() => selectVoiceAffinity(item.label)}
                    className={`relative flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#f59e0b] bg-[#1c2028] shadow-md shadow-[#f59e0b]/10'
                        : 'border-[#1f2937] bg-[#161f30]/40 hover:border-[#374151] hover:bg-[#161f30]'
                    }`}
                  >
                    {/* Top row with icon & check if selected */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#111827]">
                        {renderVoiceIcon(item.iconName)}
                      </div>
                      {isSelected && (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17]">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-xs font-semibold text-[#dfe2ee]">
                        {item.label}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[10px] text-[#9ca3af]">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION B: Select Age Demographic Bracket */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#dfe2ee]">
                • B. Select Age Demographic Bracket
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#f59e0b]">
                <Feather className="h-3 w-3" />
                Tunes story difficulty &amp; voice maturity
              </span>
            </div>

            {/* 8 Bracket Cards in 4 columns x 2 rows */}
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {AGE_BRACKETS.map((bracket) => {
                const isSelected = userProfile.ageBracket === bracket.range;
                return (
                  <button
                    key={bracket.id}
                    onClick={() => selectAgeBracket(bracket)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#f59e0b] bg-[#1c2028] shadow-lg shadow-[#f59e0b]/15'
                        : 'border-[#1f2937] bg-[#161f30]/40 hover:border-[#374151] hover:bg-[#161f30]'
                    }`}
                  >
                    {/* Top tag & icon */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isSelected
                            ? 'bg-[#f59e0b] text-[#0b0f17]'
                            : 'bg-[#1f2937] text-[#dfe2ee]'
                        }`}
                      >
                        {bracket.range}
                      </span>
                      {renderAgeIcon(bracket.iconName, isSelected)}
                    </div>

                    <div className="mt-3.5">
                      <h3
                        className={`font-serif text-sm font-semibold tracking-tight ${
                          isSelected ? 'text-[#ffc174]' : 'text-[#dfe2ee]'
                        }`}
                      >
                        {bracket.title}
                      </h3>
                      <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-[#9ca3af]">
                        {bracket.description}
                      </p>
                    </div>

                    {/* Bottom active indicator bar */}
                    <div
                      className={`mt-3 h-0.5 w-full rounded-full transition-all ${
                        isSelected
                          ? 'bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]'
                          : 'bg-[#1f2937] group-hover:bg-[#374151]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION C: Favorite Story Formats */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#dfe2ee]">
                • C. Favorite Story Formats
              </span>
              <span className="text-[11px] text-[#9ca3af]">
                Multi-select enabled
              </span>
            </div>

            {/* Formats Pills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {STORY_FORMATS.map((format) => {
                const isSelected = userProfile.selectedFormats.includes(
                  format.label
                );
                return (
                  <button
                    key={format.id}
                    onClick={() => toggleFormat(format.label)}
                    className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-[#f59e0b]/80 bg-[#1c2028] text-[#ffc174] shadow-sm'
                        : 'border-[#1f2937] bg-[#161f30]/40 text-[#dfe2ee] hover:border-[#374151]'
                    }`}
                  >
                    <span
                      className={
                        isSelected ? 'text-[#f59e0b]' : 'text-[#9ca3af]'
                      }
                    >
                      {renderFormatIcon(format.iconName)}
                    </span>
                    <span>{format.label}</span>
                    {isSelected && (
                      <Check className="h-3 w-3 stroke-[2.5] text-[#f59e0b]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION D: Preferred Storytelling Language */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#dfe2ee]">
                • D. Preferred Narrative Language / कहानी की भाषा
              </span>
              <span className="text-[11px] text-[#f59e0b]">
                {userProfile.preferredLanguage === 'Hindi'
                  ? 'हिंदी भाषा चयनित'
                  : 'English Selected'}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {[
                {
                  id: 'Hindi',
                  title: '🇮🇳 हिंदी (Hindi Stories)',
                  desc: 'गंभीर, साहित्यिक देवनागरी गद्य एवं मार्मिक भारतीय आख्यान',
                },
                {
                  id: 'English',
                  title: '🇬🇧 English',
                  desc: 'Atmospheric global literary fiction & speculative cinema',
                },
                {
                  id: 'Hinglish',
                  title: '🎬 Hinglish Fusion',
                  desc: 'Contemporary metropolitan drama & fast-paced dialogue',
                },
              ].map((lang) => {
                const isSelected =
                  (userProfile.preferredLanguage || 'Hindi') === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() =>
                      setUserProfile((prev) => ({
                        ...prev,
                        preferredLanguage: lang.id as any,
                      }))
                    }
                    className={`rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#f59e0b] bg-[#1c2028] shadow-md shadow-[#f59e0b]/10'
                        : 'border-[#1f2937] bg-[#161f30]/40 hover:border-[#374151]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#dfe2ee]">
                        {lang.title}
                      </span>
                      {isSelected && (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17]">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#9ca3af]">
                      {lang.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7-Day Unrestricted Free Trial Included Banner */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-[#f59e0b]/30 bg-gradient-to-r from-[#f59e0b]/10 via-[#8b5cf6]/10 to-[#111827] p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17] shadow-md shadow-[#f59e0b]/30">
                <BellRing className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#dfe2ee]">
                  7-Day Unrestricted Free Trial Included
                </h4>
                <p className="mt-0.5 text-xs text-[#9ca3af]">
                  Zero upfront charges today. Experience the complete library of
                  cinema, audio, and literature. Cancel anytime before ₹99/mo standard
                  plan initiates.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPricing}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#f59e0b]/40 bg-[#111827]/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffc174] transition-colors hover:bg-[#f59e0b]/20"
            >
              <Shield className="h-3.5 w-3.5 text-[#f59e0b]" />
              Risk Free
            </button>
          </div>

          {/* Bottom Actions Row */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1f2937] pt-6 sm:flex-row">
            <button
              onClick={onEnterSanctuary}
              className="text-xs text-[#9ca3af] transition-colors hover:text-[#dfe2ee]"
            >
              Skip for now (Browse as Guest)
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAIStudio}
                className="flex items-center gap-2 rounded-full border border-[#8b5cf6]/50 bg-[#8b5cf6]/10 px-4 py-2.5 text-xs font-semibold text-[#d0bcff] transition-all hover:bg-[#8b5cf6]/20"
              >
                <Sparkles className="h-4 w-4 text-[#ffc174]" />
                Describe Idea &amp; Generate
              </button>

              <button
                onClick={onEnterSanctuary}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] px-6 py-2.5 text-xs font-bold text-[#0b0f17] shadow-lg shadow-[#f59e0b]/25 transition-all hover:brightness-110 active:scale-95"
              >
                <span>Enter StoryVerse Sanctuary</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Fine Print Footer inside Setup Card */}
          <div className="mt-6 text-center text-[10px] leading-relaxed text-[#6b7280]">
            <p>
              By proceeding, you agree to StoryVerse{' '}
              <a href="#terms" className="underline hover:text-[#9ca3af]">
                Terms of Service
              </a>
              ,{' '}
              <a href="#parental" className="underline hover:text-[#9ca3af]">
                Parental Safeguards
              </a>{' '}
              for audiences under 15, and{' '}
              <a href="#privacy" className="underline hover:text-[#9ca3af]">
                Privacy Sanctuary
              </a>
              .
            </p>
            <p className="mt-1 flex items-center justify-center gap-2">
              <Lock className="h-2.5 w-2.5 text-[#f59e0b]" />
              <span>
                End-to-End Encrypted Session • AI Mood Engine v4.2 • Curated by
                Global Storytellers
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
