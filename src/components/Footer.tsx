import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onOpenPricing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenPricing }) => {
  return (
    <footer className="border-t border-[#1f2937] bg-[#080b12] text-[#dfe2ee]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-tr from-[#f59e0b] to-[#8b5cf6] p-0.5">
                <div className="h-full w-full rounded-[3px] bg-[#0b0f17]" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white">
                Story<span className="text-[#f59e0b]">Verse</span>
              </span>
            </div>

            <h3 className="mt-4 font-serif text-xl italic font-semibold text-[#ffc174]">
              Where tales meet emotion and imagination.
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#9ca3af]">
              An ethereal haven weaving cinematic blockbusters, serialized literary epics,
              acoustic voice journeys, and sentient AI mood navigation.
            </p>

            <button
              onClick={onOpenPricing}
              className="mt-5 flex items-center gap-1.5 rounded-full border border-[#f59e0b]/30 bg-[#161f30] px-3.5 py-1.5 text-[11px] text-[#ffc174] transition-colors hover:border-[#f59e0b]"
            >
              <Check className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span>
                7-Day Free Trial • Starting ₹99/mo • ₹249 (3 mos) • ₹449 (6 mos) • ₹799 (1 yr)
              </span>
            </button>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffc174]">
              Categories
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-[#9ca3af]">
              {[
                'Movies',
                'OTT Releases',
                'Original Stories',
                'Audio Books',
                'E-Books',
                'Podcasts',
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className="transition-colors hover:text-[#ffc174]"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Age Demographic Brackets Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffc174]">
              Age Demographic Brackets
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#9ca3af]">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>3–10 (Kids Corner)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>10–15 (Young Readers)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>15–18 (Teens &amp; YA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>18–24 (New Adult)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                <span className="text-[#dfe2ee]">24–30 (Prime Fiction)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>30–45 (Contemporary)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>45–60 (Classics &amp; Epics)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
                <span>60+ (Heritage &amp; Wisdom)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1f2937] pt-6 text-[11px] text-[#6b7280] sm:flex-row">
          <p>© 2024 StoryVerse Multimedia Inc. All narratives, rights, and cinematics reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#9ca3af]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#9ca3af]">Terms of Stream</a>
            <a href="#copyright" className="hover:text-[#9ca3af]">Content Copyright</a>
            <a href="#admin" className="hover:text-[#9ca3af]">Studio Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
