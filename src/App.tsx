import React, { useState } from 'react';
import { UserProfile, CuratedStory, GeneratedStory } from './types';
import { Navbar } from './components/Navbar';
import { SetupPortal } from './components/SetupPortal';
import { AIStoryGenerator } from './components/AIStoryGenerator';
import { SanctuaryExplore } from './components/SanctuaryExplore';
import { StoryReaderModal } from './components/StoryReaderModal';
import { MoodDialModal } from './components/MoodDialModal';
import { PricingModal } from './components/PricingModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

export default function App() {
  // User profile initialized matching the screenshot's exact state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Arjun Sharma',
    email: 'arjun.sharma@gmail.com',
    isGoogleConnected: true,
    voiceAffinity: 'Male',
    ageBracket: '24 – 30 Years',
    ageBracketLabel: 'Prime Fiction & Noir',
    selectedFormats: [
      'Cinematic & OTT Premieres',
      'Spatial Audiobooks',
      'Serialized Novellas',
    ],
    preferredLanguage: 'Hindi',
    trialActive: true,
    onboardingStep: 2,
  });

  const [activeView, setActiveView] = useState<'setup' | 'generator' | 'explore'>('setup');
  const [isMoodDialOpen, setIsMoodDialOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReaderStory, setSelectedReaderStory] = useState<CuratedStory | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const handleSelectMoodForGeneration = (moodName: string) => {
    setActiveView('generator');
  };

  const handleSelectStory = (story: CuratedStory) => {
    setSelectedReaderStory(story);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategoryFilter(category);
    setActiveView('explore');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0f17] text-[#dfe2ee]">
      {/* Top Navigation */}
      <Navbar
        userProfile={userProfile}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenMoodDial={() => setIsMoodDialOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'setup' && (
          <SetupPortal
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onEnterSanctuary={() => setActiveView('explore')}
            onOpenAIStudio={() => setActiveView('generator')}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeView === 'generator' && (
          <AIStoryGenerator
            userProfile={userProfile}
            onOpenSetup={() => setActiveView('setup')}
            onSaveToLibrary={(story: GeneratedStory) => {
              // Could also append to local library
              console.log('Saved story:', story.title);
            }}
          />
        )}

        {activeView === 'explore' && (
          <SanctuaryExplore
            userProfile={userProfile}
            onSelectStory={handleSelectStory}
            onOpenAIStudio={() => setActiveView('generator')}
            selectedCategoryFilter={selectedCategoryFilter}
            onClearCategoryFilter={() => setSelectedCategoryFilter('All')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategorySelect}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* Interactive Modals */}
      <MoodDialModal
        isOpen={isMoodDialOpen}
        onClose={() => setIsMoodDialOpen(false)}
        userProfile={userProfile}
        onSelectMoodForGeneration={handleSelectMoodForGeneration}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStory={handleSelectStory}
      />

      <StoryReaderModal
        story={selectedReaderStory}
        onClose={() => setSelectedReaderStory(null)}
        userProfile={userProfile}
      />
    </div>
  );
}
