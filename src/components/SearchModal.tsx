import React, { useState, useEffect } from 'react';
import { Search, X, Star, BookOpen, ChevronRight } from 'lucide-react';
import { CURATED_STORIES } from '../data/mockData';
import { CuratedStory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: CuratedStory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStory,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = CURATED_STORIES.filter((story) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      story.title.toLowerCase().includes(q) ||
      story.author.toLowerCase().includes(q) ||
      story.synopsis.toLowerCase().includes(q) ||
      story.moodTags.some((m) => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-20 backdrop-blur-xl">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#1f2937] bg-[#111827] shadow-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-[#1f2937] px-4 py-3.5">
          <Search className="h-4 w-4 text-[#9ca3af]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sagas, authors, mood, or format..."
            autoFocus
            className="flex-1 bg-transparent px-3 text-sm text-[#dfe2ee] placeholder-[#6b7280] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded bg-[#1c2028] text-xs text-[#9ca3af] hover:text-[#dfe2ee]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.map((story) => (
            <button
              key={story.id}
              onClick={() => {
                onSelectStory(story);
                onClose();
              }}
              className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-[#1c2028]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={story.cover}
                  alt={story.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#dfe2ee]">
                    {story.title}
                  </h4>
                  <p className="text-[11px] text-[#9ca3af]">
                    {story.author} • {story.category} • {story.ageBracket}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[11px] text-[#f59e0b]">
                  <Star className="h-3 w-3 fill-[#f59e0b]" />
                  <span>{story.rating}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#6b7280]" />
              </div>
            </button>
          ))}

          {results.length === 0 && (
            <div className="py-8 text-center text-xs text-[#9ca3af]">
              No sagas found matching &quot;{query}&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
