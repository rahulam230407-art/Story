export interface UserProfile {
  name: string;
  email: string;
  isGoogleConnected: boolean;
  voiceAffinity: string; // 'Female' | 'Male' | 'Non-Binary' | 'Family / Kids' | 'Undisclosed'
  ageBracket: string; // '3 - 10 Years' | '10 - 15 Years' | ... | '24 - 30 Years' | ...
  ageBracketLabel: string;
  selectedFormats: string[];
  preferredLanguage?: 'English' | 'Hindi' | 'Hinglish';
  trialActive: boolean;
  onboardingStep: number; // 1, 2, 3
}

export interface VoiceAffinityOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface AgeBracketOption {
  id: string;
  range: string;
  title: string;
  description: string;
  iconName: string;
  colorAccent?: string;
}

export interface StoryFormatOption {
  id: string;
  label: string;
  iconName: string;
}

export interface GeneratedStory {
  id?: string;
  title: string;
  tagline: string;
  format: string;
  mood: string;
  language?: 'English' | 'Hindi' | 'Hinglish';
  demographicMatchReason: string;
  soundscape: string;
  setting: string;
  characters: Array<{
    name: string;
    role: string;
    trait: string;
  }>;
  chapterTitle: string;
  storyText: string;
  narratorDirection: string;
  continuationPrompts: string[];
  createdAt?: string;
}

export interface CuratedStory {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  category: 'Movies' | 'OTT Releases' | 'Original Stories' | 'Audio Books' | 'E-Books' | 'Podcasts';
  ageBracket: string;
  format: string;
  language: 'English' | 'Hindi' | 'Hinglish';
  duration: string;
  author: string;
  voiceActor?: string;
  rating: number;
  moodTags: string[];
  synopsis: string;
  soundscapeSnippet: string;
  contentSample: string;
}
