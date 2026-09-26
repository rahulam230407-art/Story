import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Play,
  BookOpen,
  Headphones,
  Clapperboard,
  Sparkles,
  Sliders,
  ChevronRight,
  Clock,
  User,
} from 'lucide-react';
import { CuratedStory, UserProfile } from '../types';
import { CURATED_STORIES, AGE_BRACKETS, PRESET_MOODS } from '../data/mockData';

interface SanctuaryExploreProps {
  userProfile: UserProfile;
  onSelectStory: (story: CuratedStory) => void;
  onOpenAIStudio: () => void;
  selectedCategoryFilter?: string;
  onClearCategoryFilter?: () => void;
}

export const SanctuaryExplore: React.FC<SanctuaryExploreProps> = ({
  userProfile,
  onSelectStory,
  onOpenAIStudio,
  selectedCategoryFilter,
  onClearCategoryFilter,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategoryFilter || 'All'
  );
  const [activeBracket, setActiveBracket] = useState<string>('All');
  const [activeMood, setActiveMood] = useState<string>('All');
  const [activeLanguage, setActiveLanguage] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');

  const categories = [
    'All',
    'Original Stories',
    'Audio Books',
    'Movies',
    'OTT Releases',
    'Podcasts',
    'E-Books',
  ];

  const filteredStories = CURATED_STORIES.filter((story) => {
    if (activeCategory !== 'All' && story.category !== activeCategory) {
      return false;
    }
    if (activeBracket !== 'All' && !story.ageBracket.includes(activeBracket)) {
      return false;
    }
    if (activeMood !== 'All' && !story.moodTags.some((m) => m.includes(activeMood))) {
      return false;
    }
    if (activeLanguage !== 'All' && story.language !== activeLanguage) {
      return false;
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      const match =
        story.title.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q) ||
        story.synopsis.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0f17] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Explore Hero Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#1f2937] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#f59e0b]">
              <Sparkles className="h-4 w-4" />
              <span>The Sanctuary Library</span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#ffc174] sm:text-4xl">
              Curated Universes &amp; Acoustic Epics
            </h1>
            <p className="mt-1 text-xs text-[#9ca3af] sm:text-sm">
              Discover stories tuned to your emotional frequency. Recommended for{' '}
              <strong className="text-[#dfe2ee]">{userProfile.name}</strong> (
              {userProfile.ageBracket} • {userProfile.voiceAffinity}).
            </p>
          </div>

          {/* Quick AI Creator CTA */}
          <button
            onClick={onOpenAIStudio}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#8b5cf6]/20 transition-all hover:brightness-110 active:scale-95"
          >
            <Sparkles className="h-4 w-4 text-[#ffc174]" />
            <span>Generate Custom Story with AI</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (onClearCategoryFilter && cat === 'All') onClearCategoryFilter();
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#f59e0b] text-[#0b0f17] font-bold shadow-md shadow-[#f59e0b]/20'
                    : 'bg-[#161f30] text-[#9ca3af] hover:text-[#dfe2ee]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Filter title, author, keyword..."
              className="w-full rounded-full border border-[#1f2937] bg-[#111827] py-1.5 pl-9 pr-4 text-xs text-[#dfe2ee] placeholder-[#6b7280] focus:border-[#f59e0b] focus:outline-none"
            />
          </div>
        </div>

        {/* Secondary Filters: Age Demographic & Mood */}
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#1f2937] bg-[#111827]/60 p-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#9ca3af]">Demographic:</span>
            <select
              value={activeBracket}
              onChange={(e) => setActiveBracket(e.target.value)}
              className="rounded-lg border border-[#1f2937] bg-[#1c2028] px-2 py-1 text-xs text-[#dfe2ee] focus:outline-none"
            >
              <option value="All">All Age Brackets</option>
              {AGE_BRACKETS.map((b) => (
                <option key={b.id} value={b.range}>
                  {b.range} ({b.title})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9ca3af]">Mood Tone:</span>
            <select
              value={activeMood}
              onChange={(e) => setActiveMood(e.target.value)}
              className="rounded-lg border border-[#1f2937] bg-[#1c2028] px-2 py-1 text-xs text-[#dfe2ee] focus:outline-none"
            >
              <option value="All">All Moods</option>
              {PRESET_MOODS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9ca3af]">Language / भाषा:</span>
            <select
              value={activeLanguage}
              onChange={(e) => setActiveLanguage(e.target.value)}
              className="rounded-lg border border-[#1f2937] bg-[#1c2028] px-2 py-1 text-xs text-[#dfe2ee] focus:outline-none"
            >
              <option value="All">All Languages (सभी भाषाएँ)</option>
              <option value="Hindi">🇮🇳 हिंदी (Hindi Stories)</option>
              <option value="English">🇬🇧 English</option>
            </select>
          </div>

          {(activeCategory !== 'All' || activeBracket !== 'All' || activeMood !== 'All' || activeLanguage !== 'All' || localSearch) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveBracket('All');
                setActiveMood('All');
                setActiveLanguage('All');
                setLocalSearch('');
                if (onClearCategoryFilter) onClearCategoryFilter();
              }}
              className="ml-auto text-xs text-[#f59e0b] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Story Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1f2937] bg-[#111827] transition-all hover:border-[#f59e0b]/50 hover:shadow-xl hover:shadow-[#f59e0b]/5"
            >
              {/* Cover Image with Vignette Gradient */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0f131c]">
                <img
                  src={story.cover}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark bottom gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />

                {/* Category & Format Pill on Top */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span className="rounded-md bg-[#0b0f17]/80 px-2 py-0.5 text-[10px] font-semibold text-[#ffc174] backdrop-blur-md">
                    {story.category}
                  </span>
                  <span className="rounded-md bg-[#0b0f17]/80 px-2 py-0.5 text-[10px] text-[#dfe2ee] backdrop-blur-md">
                    {story.duration}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md ${
                      story.language === 'Hindi'
                        ? 'bg-emerald-950/90 text-emerald-300 ring-1 ring-emerald-500/40'
                        : 'bg-[#0b0f17]/80 text-[#9ca3af]'
                    }`}
                  >
                    {story.language === 'Hindi' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-[#0b0f17]/80 px-2 py-0.5 text-[10px] font-bold text-[#f59e0b] backdrop-blur-md">
                  <Star className="h-3 w-3 fill-[#f59e0b]" />
                  <span>{story.rating}</span>
                </div>

                {/* Quick Play Trigger button over cover */}
                <button
                  onClick={() => onSelectStory(story)}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17] shadow-lg shadow-[#f59e0b]/30 transition-transform hover:scale-110 active:scale-95"
                  title="Play and Read"
                >
                  <Play className="h-4 w-4 fill-[#0b0f17] pl-0.5" />
                </button>
              </div>

              {/* Story Details Card Content */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  {/* Mood Tags */}
                  <div className="flex flex-wrap items-center gap-1">
                    {story.moodTags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-[#8b5cf6]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-2 font-serif text-lg font-bold tracking-tight text-[#dfe2ee] group-hover:text-[#ffc174]">
                    {story.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#9ca3af]">
                    {story.synopsis}
                  </p>
                </div>

                {/* Author & Reader Button */}
                <div className="mt-5 border-t border-[#1f2937] pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">By {story.author}</span>
                    <button
                      onClick={() => onSelectStory(story)}
                      className="flex items-center gap-1 font-semibold text-[#f59e0b] hover:underline"
                    >
                      <span>Immerse</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="my-16 text-center text-sm text-[#9ca3af]">
            <p>No stories found matching the selected filters.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setActiveBracket('All');
                setActiveMood('All');
                setLocalSearch('');
              }}
              className="mt-3 text-xs text-[#f59e0b] underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
