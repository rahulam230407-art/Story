import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Layers,
  Search,
  CheckCircle2,
  ChevronDown,
  Wand2,
  Sliders,
  LogOut,
  RefreshCw,
  User,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  userProfile: UserProfile;
  activeView: 'setup' | 'generator' | 'explore';
  setActiveView: (view: 'setup' | 'generator' | 'explore') => void;
  onOpenMoodDial: () => void;
  onOpenPricing: () => void;
  onSelectCategory?: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  activeView,
  setActiveView,
  onOpenMoodDial,
  onOpenPricing,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onOpenSearchModal,
}) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const categories = [
    'Movies',
    'OTT Releases',
    'Original Stories',
    'Audio Books',
    'E-Books',
    'Podcasts',
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f2937] bg-[#0b0f17]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveView('setup')}
            className="group flex items-center gap-3 text-left transition-opacity hover:opacity-90"
          >
            {/* StoryVerse icon */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#8b5cf6] p-[1.5px] shadow-sm shadow-[#f59e0b]/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0f131c]">
                <div className="flex items-center gap-0.5">
                  <div className="h-4 w-1.5 rounded-full bg-[#f59e0b]" />
                  <div className="h-5 w-1.5 rounded-full bg-[#ffc174]" />
                  <div className="h-3.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  Story<span className="text-[#f59e0b]">Verse</span>
                </span>
              </div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9ca3af]">
                Sanctuary • Cinema • Audio • Tales
              </p>
            </div>
          </button>

          {/* Navigation items */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Setup / Tuning */}
            <button
              onClick={() => setActiveView('setup')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeView === 'setup'
                  ? 'bg-[#1c2028] text-[#ffc174] shadow-sm'
                  : 'text-[#9ca3af] hover:text-[#dfe2ee]'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              Setup Portal
            </button>

            {/* AI Story Studio (Generate story according to user prompt) */}
            <button
              onClick={() => setActiveView('generator')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'generator'
                  ? 'bg-gradient-to-r from-[#8b5cf6]/30 to-[#f59e0b]/20 text-[#ffc174] ring-1 ring-[#f59e0b]/50 shadow-sm shadow-[#f59e0b]/10'
                  : 'text-[#dfe2ee] hover:bg-[#181c24] hover:text-white'
              }`}
            >
              <Wand2 className="h-3.5 w-3.5 text-[#ffc174]" />
              AI Story Studio
              <span className="rounded bg-[#8b5cf6]/30 px-1 py-0.2 text-[9px] text-[#d0bcff]">AI</span>
            </button>

            {/* Explore */}
            <button
              onClick={() => setActiveView('explore')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeView === 'explore'
                  ? 'bg-[#1c2028] text-[#ffc174]'
                  : 'text-[#9ca3af] hover:text-[#dfe2ee]'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              Explore
            </button>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#9ca3af] transition-colors hover:text-[#dfe2ee]"
              >
                <Layers className="h-3.5 w-3.5" />
                Categories
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>

              {showCategoryMenu && (
                <div
                  onMouseLeave={() => setShowCategoryMenu(false)}
                  className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-[#1f2937] bg-[#111827] py-2 shadow-2xl shadow-black/80 backdrop-blur-md"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        if (onSelectCategory) onSelectCategory(cat);
                        setActiveView('explore');
                        setShowCategoryMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#dfe2ee] transition-colors hover:bg-[#1c2028] hover:text-[#f59e0b]"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Mood Muse */}
            <button
              onClick={onOpenMoodDial}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#9ca3af] transition-colors hover:text-[#dfe2ee]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8b5cf6] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8b5cf6]"></span>
              </span>
              AI Mood Muse
            </button>

            {/* 7-DAY FREE TRIAL pill */}
            <button
              onClick={onOpenPricing}
              className="rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0b0f17] shadow-sm shadow-[#f59e0b]/20 hover:brightness-110"
            >
              7-Day Free Trial
            </button>

            {/* Pricing */}
            <button
              onClick={onOpenPricing}
              className="px-2 py-1 text-xs font-medium text-[#9ca3af] hover:text-[#ffc174]"
            >
              Pricing (₹99/mo)
            </button>
          </nav>
        </div>

        {/* Right side: Search, Mood Dial, Profile, Admin */}
        <div className="flex items-center gap-3">
          {/* Quick Search trigger */}
          <button
            onClick={onOpenSearchModal}
            className="flex items-center gap-2 rounded-full border border-[#1f2937] bg-[#111827] px-3 py-1.5 text-xs text-[#9ca3af] transition-all hover:border-[#374151] hover:text-[#dfe2ee]"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search sagas, authors, mood...</span>
            <span className="rounded bg-[#1f2937] px-1.5 py-0.5 text-[10px] font-mono text-[#9ca3af]">
              ⌘K
            </span>
          </button>

          {/* Mood Dial CTA */}
          <button
            onClick={onOpenMoodDial}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#571bc1] to-[#8b5cf6] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-[#8b5cf6]/30 transition-all hover:brightness-110 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#ffc174]" />
            <span className="hidden sm:inline">Mood Dial</span>
          </button>

          {/* User profile capsule (Matching screenshot's Arjun Sharma G-profile) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-full border border-[#1f2937] bg-[#111827] py-1 pl-1 pr-3 text-xs transition-colors hover:border-[#374151]"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e293b] font-bold text-[#f59e0b] shadow-inner">
                {userProfile.isGoogleConnected ? (
                  <span className="font-sans text-[11px] font-black text-amber-400">G</span>
                ) : (
                  <User className="h-3.5 w-3.5 text-[#9ca3af]" />
                )}
              </div>
              <span className="hidden text-xs font-medium text-[#dfe2ee] lg:inline">
                {userProfile.name}
              </span>
              <ChevronDown className="h-3 w-3 text-[#9ca3af]" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                onMouseLeave={() => setShowProfileMenu(false)}
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-[#1f2937] bg-[#111827] p-3 shadow-2xl shadow-black/80 backdrop-blur-md"
              >
                <div className="border-b border-[#1f2937] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e293b] font-bold text-amber-400">
                      G
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#dfe2ee]">{userProfile.name}</p>
                      <p className="text-[11px] text-[#9ca3af]">{userProfile.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Google Connected Sanctuary</span>
                  </div>
                </div>

                <div className="py-2 text-[11px] text-[#9ca3af]">
                  <p>
                    Affinity: <span className="text-[#dfe2ee]">{userProfile.voiceAffinity}</span>
                  </p>
                  <p>
                    Age Bracket: <span className="text-[#dfe2ee]">{userProfile.ageBracket}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-1 border-t border-[#1f2937] pt-2">
                  <button
                    onClick={() => {
                      setActiveView('setup');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-[#dfe2ee] hover:bg-[#1c2028]"
                  >
                    <Sliders className="h-3.5 w-3.5 text-[#f59e0b]" />
                    Edit Profile & Demographics
                  </button>
                  <button
                    onClick={() => {
                      alert('Account switch simulation: You can edit credentials in Profile Tuning.');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-[#dfe2ee] hover:bg-[#1c2028]"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-[#9ca3af]" />
                    Switch Account
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Portal link */}
          <button
            onClick={() => alert('StoryVerse Admin Portal: System operational. AI Mood Engine v4.2 online.')}
            className="hidden text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] transition-colors hover:text-[#dfe2ee] xl:inline"
          >
            Admin Portal
          </button>
        </div>
      </div>
    </header>
  );
};
