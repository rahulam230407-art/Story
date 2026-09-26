import React, { useState, useEffect, useRef } from 'react';
import {
  Wand2,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Share2,
  Bookmark,
  Layers,
  Sliders,
  ChevronRight,
  Headphones,
  Film,
  Compass,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { UserProfile, GeneratedStory } from '../types';
import { PRESET_MOODS } from '../data/mockData';

interface AIStoryGeneratorProps {
  userProfile: UserProfile;
  onOpenSetup: () => void;
  onSaveToLibrary?: (story: GeneratedStory) => void;
}

export const AIStoryGenerator: React.FC<AIStoryGeneratorProps> = ({
  userProfile,
  onOpenSetup,
  onSaveToLibrary,
}) => {
  const [ideaPrompt, setIdeaPrompt] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hindi' | 'Hinglish'>(
    userProfile.preferredLanguage || 'Hindi'
  );
  const [selectedMood, setSelectedMood] = useState('Melancholic Noir');
  const [selectedFormat, setSelectedFormat] = useState('Serialized Novellas');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Audio narration state using browser SpeechSynthesis
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Ambient sound synthesis state (Web Audio API)
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'space' | 'vinyl'>('none');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<any>(null);

  const englishPromptSuggestions = [
    {
      title: 'Monsoon Vinyl Mystery',
      tag: 'Noir Thriller',
      prompt:
        'A disgraced archivist in Mumbai finds a 1974 vinyl pressing of an unreleased ragas performance. When played at 2 AM in the rain, listeners experience vivid, shared memories belonging to a man who died fifty years ago.',
    },
    {
      title: 'The Silent Frequency',
      tag: 'Hard Sci-Fi',
      prompt:
        'On an automated relay satellite drifting past Neptune, the lone human maintenance officer hears an irregular acoustic knock against the outer hull that rhythmically repeats every seventeen minutes.',
    },
    {
      title: 'The Clockmaker of Varanasi',
      tag: 'Historical Intrigue',
      prompt:
        'In 1892, an eccentric artisan builds a lunar water-clock in Varanasi that doesn’t measure seconds—it accurately counts down to the moment each person standing before it will make their life’s greatest mistake.',
    },
    {
      title: 'Neon Synapse Heist',
      tag: 'Cyberpunk',
      prompt:
        'In the subterranean bazaars of Old Delhi in 2089, a sensory smuggler accidentally downloads the uncompressed memories of the city’s last analogue novelist, pursued by algorithmic enforcement drones.',
    },
  ];

  const hindiPromptSuggestions = [
    {
      title: 'वाराणसी का जल-घड़ीसाज़',
      tag: 'दार्शनिक रहस्य (Hindi)',
      prompt:
        'काशी के अस्सी घाट पर १८९२ में एक पुराने घड़ीसाज़ ने पीतल का ऐसा यंत्र बनाया था जो समय नहीं, बल्कि इंसान के भीतर दबे पछतावे और गलतियों की उलटी गिनती करता है।',
    },
    {
      title: 'मरीन ड्राइव की मूसलाधार बारिश',
      tag: 'नोइर थ्रिलर (Hindi)',
      prompt:
        'मुंबई की तूफानी रात में एक गुप्त जासूस को १९७० का एक पुराना मैग्नेटिक टेप मिलता है, जिसे सुनते ही उसे वो घटनाएँ याद आने लगती हैं जो पुलिस रिकॉर्ड से हमेशा के लिए मिटा दी गई थीं।',
    },
    {
      title: 'चाँदनी चौक २०८९: यादों की चोरी',
      tag: 'साइबरपंक (Hindi)',
      prompt:
        '२०८९ की पुरानी दिल्ली की अंधेरी गलियों में जब इंसान अपनी यादें चिप में सुरक्षित रखने लगे, तब एक स्मृति-तस्कर को शहर के आखिरी शायर की अनकंप्रेस्ड यादें मिलती हैं।',
    },
    {
      title: 'हिमालय के एकांत मठ की घंटी',
      tag: 'गॉथिक सस्पेंस (Hindi)',
      prompt:
        'लद्दाख के बर्फीले दर्रे पर एक पुराने बौद्ध मठ में हर मध्यरात्रि को अपने आप एक विशाल कांस्य घंटी बज उठती है, जिसकी गूँज में खोए हुए यात्रियों के नाम सुनाई देते हैं।',
    },
  ];

  const promptSuggestions = selectedLanguage === 'Hindi' ? hindiPromptSuggestions : englishPromptSuggestions;

  // Steps animation during generation
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setGenerationStep(0);
      interval = setInterval(() => {
        setGenerationStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Clean up speech synthesis and web audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleGenerate = async (overridePrompt?: string, context?: string) => {
    const finalPrompt = overridePrompt || ideaPrompt;
    if (!finalPrompt.trim()) {
      setError('Please provide a story idea or premise.');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setSaved(false);

    // Stop current audio if playing
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          persona: `${userProfile.voiceAffinity} persona`,
          ageBracket: `${userProfile.ageBracket} (${userProfile.ageBracketLabel})`,
          format: selectedFormat,
          mood: selectedMood,
          language: selectedLanguage,
          previousStoryContext: context || '',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate story.');
      }

      setGeneratedStory(data.story);

      // Scroll smoothly down to the generated story
      setTimeout(() => {
        document.getElementById('generated-story-viewport')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with StoryVerse AI Engine.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContinueBranch = (branchOption: string) => {
    if (!generatedStory) return;
    const context = `Story Title: ${generatedStory.title}\nSetting: ${generatedStory.setting}\nCharacters: ${JSON.stringify(
      generatedStory.characters
    )}\nPrevious Chapter Summary: ${generatedStory.storyText.slice(0, 300)}...`;

    const nextPrompt = `Continue the story directly exploring this path: "${branchOption}". Continue to Chapter 2 with escalating dramatic stakes.`;
    setIdeaPrompt(nextPrompt);
    handleGenerate(nextPrompt, context);
  };

  const handleCopyStory = () => {
    if (!generatedStory) return;
    const fullContent = `${generatedStory.title.toUpperCase()}\n${generatedStory.tagline}\n\nSetting: ${
      generatedStory.setting
    }\nSoundscape: ${generatedStory.soundscape}\n\n${generatedStory.chapterTitle}\n\n${generatedStory.storyText}`;

    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || !generatedStory) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.pause();
      setIsPlayingAudio(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlayingAudio(true);
      } else {
        window.speechSynthesis.cancel();
        const textToRead = `${generatedStory.title}. ${generatedStory.chapterTitle}. ${generatedStory.storyText}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);

        const isHindiText =
          generatedStory.language === 'Hindi' ||
          /[\u0900-\u097F]/.test(generatedStory.storyText);

        if (isHindiText) {
          utterance.lang = 'hi-IN';
          utterance.rate = 0.9;
        } else {
          utterance.lang = 'en-US';
          utterance.rate = 0.95;
        }

        utterance.pitch = userProfile.voiceAffinity === 'Male' ? 0.9 : 1.05;

        // Try to pick a voice matching the language
        const voices = window.speechSynthesis.getVoices();
        if (isHindiText) {
          const hindiVoice = voices.find(
            (v) =>
              v.lang.startsWith('hi') ||
              v.name.toLowerCase().includes('hindi') ||
              v.name.includes('हिन्दी')
          );
          if (hindiVoice) utterance.voice = hindiVoice;
        } else {
          const englishVoice = voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))
          ) || voices.find((v) => v.lang.startsWith('en'));
          if (englishVoice) utterance.voice = englishVoice;
        }

        utterance.onend = () => {
          setIsPlayingAudio(false);
          setAudioProgress(100);
        };

        utterance.onboundary = (e) => {
          if (e.charIndex && textToRead.length) {
            setAudioProgress(Math.round((e.charIndex / textToRead.length) * 100));
          }
        };

        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  // Toggle synthesized ambient noise using Web Audio API
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
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (ambientNodeRef.current) {
        try {
          ambientNodeRef.current.stop();
        } catch (_) {}
      }

      // Generate soft filtered noise or drone
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.value = 800;
      } else if (type === 'space') {
        filter.type = 'bandpass';
        filter.frequency.value = 180;
      } else {
        filter.type = 'highpass';
        filter.frequency.value = 1200;
      }

      const gain = ctx.createGain();
      gain.gain.value = 0.05; // Quiet, soothing ambient level

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(0);
      ambientNodeRef.current = whiteNoise;
      setAmbientSound(type);
    } catch (e) {
      console.warn('Web Audio ambient sound not available', e);
      setAmbientSound('none');
    }
  };

  const stepsText = [
    'Listening to your premise & emotional cues...',
    `Calibrating narrative tone for ${userProfile.ageBracket} (${userProfile.ageBracketLabel})...`,
    `Tuning vocal affinity (${userProfile.voiceAffinity}) & spatial soundscape...`,
    'Weaving dramatic prose, chapter beats & character souls...',
  ];

  return (
    <div className="relative min-h-screen bg-[#0b0f17] px-4 py-8 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.12)_0%,rgba(11,15,23,0)_70%)]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#d0bcff]">
            <Sparkles className="h-3.5 w-3.5 text-[#ffc174]" />
            StoryVerse Immersion Engine • Generative Studio
          </div>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#ffc174] sm:text-4xl">
            Describe Your Idea &amp; Weave a Living Story
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-[#9ca3af] sm:text-sm">
            Enter any concept, premise, or emotional world. StoryVerse customizes
            the pacing, vocabulary, narrative depth, and soundscape to match your
            personal demographic profile.
          </p>
        </div>

        {/* User Active Profile Tuning Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1f2937] bg-[#161f30]/60 p-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[#dfe2ee]">
              Tuned For: {userProfile.name}
            </span>
            <span className="text-[#6b7280]">•</span>
            <span className="rounded bg-[#1f2937] px-2 py-0.5 text-[11px] text-[#ffc174]">
              {userProfile.ageBracket} ({userProfile.ageBracketLabel})
            </span>
            <span className="text-[#6b7280]">•</span>
            <span className="rounded bg-[#1f2937] px-2 py-0.5 text-[11px] text-[#d0bcff]">
              Voice Affinity: {userProfile.voiceAffinity}
            </span>
          </div>

          <button
            onClick={onOpenSetup}
            className="flex items-center gap-1.5 text-xs font-medium text-[#f59e0b] hover:underline"
          >
            <Sliders className="h-3.5 w-3.5" />
            Adjust Listener Profile
          </button>
        </div>

        {/* Story Input Console */}
        <div className="mt-6 rounded-2xl border border-[#1f2937] bg-[#111827]/90 p-5 shadow-2xl backdrop-blur-md sm:p-7">
          {/* Story Language Selector */}
          <div className="mb-5 rounded-xl border border-[#1f2937] bg-[#0f131c] p-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#dfe2ee]">
                Story Language / भाषा का चयन
              </label>
              <span className="text-[11px] font-medium text-[#f59e0b]">
                {selectedLanguage === 'Hindi'
                  ? 'देवनागरी लिपि में संपूर्ण कहानी'
                  : selectedLanguage === 'Hinglish'
                  ? 'हिंदी-अंग्रेज़ी मिश्रण'
                  : 'Literary English'}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {[
                { id: 'Hindi', label: '🇮🇳 हिंदी (Hindi Story)', hint: 'शुद्ध देवनागरी एवं मार्मिक गद्य' },
                { id: 'English', label: '🇬🇧 English', hint: 'Cinematic literary prose' },
                { id: 'Hinglish', label: '🎬 Hinglish', hint: 'Contemporary urban blend' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSelectedLanguage(lang.id as any);
                    if (lang.id === 'Hindi' && !ideaPrompt.trim()) {
                      setIdeaPrompt('काशी के अस्सी घाट पर १८९२ में एक पुराने घड़ीसाज़ ने पीतल का ऐसा यंत्र बनाया था जो समय नहीं, बल्कि इंसान के भीतर दबे पछतावे की उलटी गिनती करता है।');
                    }
                  }}
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                    selectedLanguage === lang.id
                      ? 'border-[#f59e0b] bg-[#1c2028] text-[#ffc174] shadow-md shadow-[#f59e0b]/20 ring-1 ring-[#f59e0b]'
                      : 'border-[#1f2937] bg-[#111827] text-[#9ca3af] hover:border-[#374151]'
                  }`}
                >
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Idea Input Area */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="idea-input"
                className="flex items-center gap-2 font-serif text-sm font-medium text-[#dfe2ee]"
              >
                <Wand2 className="h-4 w-4 text-[#f59e0b]" />
                {selectedLanguage === 'Hindi'
                  ? 'अपनी कहानी का विचार या कल्पना यहाँ लिखें'
                  : 'Describe Your Story Concept, World, or Premise'}
              </label>
              <span className="text-[11px] text-[#9ca3af]">
                {ideaPrompt.length} characters
              </span>
            </div>

            <textarea
              id="idea-input"
              value={ideaPrompt}
              onChange={(e) => setIdeaPrompt(e.target.value)}
              placeholder={
                selectedLanguage === 'Hindi'
                  ? 'उदाहरण: काशी के अस्सी घाट पर मध्यरात्रि में बहती गंगा से एक प्राचीन पीतल की घड़ी मिलती है, जिसकी सुइयाँ उल्टी दिशा में घूमती हैं और बीते हुए कल की अनकही आवाजें सुनाती हैं...'
                  : 'e.g. A vintage bookstore owner in Edinburgh discovers that annotations inside a first-edition gothic novel are predicting crimes committed forty-eight hours in the future...'
              }
              rows={4}
              className="mt-2.5 w-full rounded-xl border border-[#1f2937] bg-[#0b0f17] p-3.5 text-xs text-[#dfe2ee] placeholder-[#6b7280] transition-all focus:border-[#f59e0b] focus:outline-none focus:ring-1 focus:ring-[#f59e0b] sm:text-sm"
            />
          </div>

          {/* Quick Idea Sparks */}
          <div className="mt-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
              Or Try A Curated Spark:
            </span>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {promptSuggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setIdeaPrompt(item.prompt)}
                  className="group flex flex-col items-start rounded-lg border border-[#1f2937] bg-[#161f30]/40 p-2.5 text-left transition-all hover:border-[#f59e0b]/60 hover:bg-[#161f30]"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs font-semibold text-[#dfe2ee] group-hover:text-[#ffc174]">
                      {item.title}
                    </span>
                    <span className="rounded bg-[#1f2937] px-1.5 py-0.5 text-[9px] font-medium text-[#9ca3af]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#9ca3af]">
                    {item.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Story Format & Mood Selectors */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Format Selection */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#dfe2ee]">
                Story Format
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  'Serialized Novellas',
                  'Spatial Audio Drama',
                  'Cinematic Screenplay',
                  'Illustrated Tale',
                ].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedFormat === fmt
                        ? 'border-[#f59e0b] bg-[#1c2028] text-[#ffc174]'
                        : 'border-[#1f2937] bg-[#0b0f17] text-[#9ca3af] hover:border-[#374151]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Emotional Tone / Mood */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#dfe2ee]">
                Emotional Mood &amp; Atmosphere
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRESET_MOODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.name)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                      selectedMood === m.name
                        ? 'border-[#8b5cf6] bg-[#571bc1]/20 text-[#d0bcff]'
                        : 'border-[#1f2937] bg-[#0b0f17] text-[#9ca3af] hover:border-[#374151]'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Primary Action Button */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[#1f2937] pt-5 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]"></span>
              </span>
              <span>Gemini 3.8 Flash Engine Ready</span>
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !ideaPrompt.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#d97706] px-8 py-3 text-sm font-bold text-[#0b0f17] shadow-xl shadow-[#f59e0b]/20 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                  <span>Weaving Narrative...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 fill-[#0b0f17]" />
                  <span>Weave Story Universe</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Signature Constellation / Celestial Book Loader */}
        {isGenerating && (
          <div className="my-10 flex flex-col items-center justify-center py-10 text-center">
            {/* Celestial open book / orbital stars animation */}
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 animate-ping rounded-full border border-[#8b5cf6]/30 opacity-40 duration-1000" />
              <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-tr from-[#f59e0b]/10 to-[#8b5cf6]/20 blur-md" />

              {/* Orbiting star particles */}
              <div className="absolute h-full w-full animate-spin duration-3000">
                <div className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
              </div>
              <div className="absolute h-full w-full animate-spin duration-5000 [animation-direction:reverse]">
                <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-[#d0bcff] shadow-[0_0_8px_#d0bcff]" />
              </div>

              {/* Glowing Book Center */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f59e0b]/40 bg-[#161f30] text-[#f59e0b] shadow-lg shadow-[#f59e0b]/20">
                <BookOpen className="h-7 w-7 animate-pulse" />
              </div>
            </div>

            <h3 className="mt-5 font-serif text-lg font-medium text-[#ffc174]">
              {stepsText[generationStep]}
            </h3>
            <p className="mt-1 text-xs text-[#9ca3af]">
              Harmonizing acoustic directions and character motives for {userProfile.name}
            </p>
          </div>
        )}

        {/* GENERATED STORY PRESENTATION VIEWPORT */}
        {generatedStory && !isGenerating && (
          <div
            id="generated-story-viewport"
            className="mt-10 overflow-hidden rounded-2xl border border-[#f59e0b]/40 bg-[#111827] shadow-2xl backdrop-blur-md"
          >
            {/* Story Header Hero Banner */}
            <div className="relative border-b border-[#1f2937] bg-gradient-to-b from-[#1c2028] to-[#111827] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#f59e0b] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0b0f17]">
                    {generatedStory.format}
                  </span>
                  <span className="rounded-full bg-[#8b5cf6]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#d0bcff]">
                    {generatedStory.mood}
                  </span>
                  {generatedStory.language && (
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                      {generatedStory.language === 'Hindi' ? '🇮🇳 हिंदी' : generatedStory.language}
                    </span>
                  )}
                </div>

                {/* Story Utility Action Buttons */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={handleCopyStory}
                    className="flex items-center gap-1 rounded-lg border border-[#1f2937] bg-[#161f30] px-3 py-1.5 text-[#dfe2ee] transition-colors hover:border-[#374151] hover:text-[#f59e0b]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Story</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (onSaveToLibrary) {
                        onSaveToLibrary(generatedStory);
                      }
                      setSaved(true);
                      setTimeout(() => setSaved(false), 2500);
                    }}
                    className="flex items-center gap-1 rounded-lg border border-[#1f2937] bg-[#161f30] px-3 py-1.5 text-[#dfe2ee] transition-colors hover:border-[#374151] hover:text-[#f59e0b]"
                  >
                    <Bookmark
                      className={`h-3.5 w-3.5 ${saved ? 'fill-[#f59e0b] text-[#f59e0b]' : ''}`}
                    />
                    <span>{saved ? 'Saved in Sanctuary' : 'Save to Library'}</span>
                  </button>
                </div>
              </div>

              {/* Title and Epigraph */}
              <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#ffc174] sm:text-3xl lg:text-4xl">
                {generatedStory.title}
              </h2>
              <p className="mt-2 font-serif text-sm italic text-[#d8c3ad] sm:text-base">
                “{generatedStory.tagline}”
              </p>

              {/* Demographic Match Insight Box */}
              <div className="mt-4 rounded-xl border border-[#374151] bg-[#0b0f17]/70 p-3 text-xs text-[#9ca3af]">
                <span className="font-semibold text-[#dfe2ee]">
                  Profile Tuning Insight ({userProfile.ageBracket}):{' '}
                </span>
                {generatedStory.demographicMatchReason}
              </div>
            </div>

            {/* Atmosphere & Audio Immersion Bar */}
            <div className="border-b border-[#1f2937] bg-[#161f30]/60 p-4 sm:px-8">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                {/* Audio Narration Playback Engine */}
                <div className="flex flex-1 items-center gap-3">
                  <button
                    onClick={handleToggleSpeech}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0f17] shadow-md shadow-[#f59e0b]/30 transition-transform active:scale-95"
                    title={isPlayingAudio ? 'Pause Narration' : 'Listen to Narration'}
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-5 w-5 fill-[#0b0f17]" />
                    ) : (
                      <Play className="h-5 w-5 fill-[#0b0f17] pl-0.5" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#dfe2ee]">
                        {isPlayingAudio
                          ? 'Streaming Spatial Voice Narration'
                          : 'Listen with AI Voice Actor'}
                      </span>
                      <span className="text-[11px] text-[#9ca3af]">
                        {audioProgress}% read
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#1f2937]">
                      <div
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-[#8b5cf6] transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Ambient Soundscapes Synthesizer */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#9ca3af]">Ambient Sound:</span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'rain', label: '🌧 Monsoon' },
                      { id: 'space', label: '🌌 Deep Space' },
                      { id: 'vinyl', label: '📻 Vinyl Crackle' },
                    ].map((amb) => (
                      <button
                        key={amb.id}
                        onClick={() => toggleAmbientSound(amb.id as any)}
                        className={`rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                          ambientSound === amb.id
                            ? 'bg-[#8b5cf6] text-white shadow-sm'
                            : 'bg-[#1c2028] text-[#9ca3af] hover:text-[#dfe2ee]'
                        }`}
                      >
                        {amb.label}
                      </button>
                    ))}
                    {ambientSound !== 'none' && (
                      <button
                        onClick={() => toggleAmbientSound('none')}
                        className="rounded-md bg-rose-500/20 px-1.5 py-1 text-[10px] text-rose-300"
                      >
                        Mute
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Soundscape & Narrator Direction notes */}
              <div className="mt-3 grid grid-cols-1 gap-2 text-[11px] text-[#9ca3af] sm:grid-cols-2">
                <div className="flex items-start gap-1.5">
                  <Headphones className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f59e0b]" />
                  <span>
                    <strong className="text-[#dfe2ee]">Soundscape:</strong>{' '}
                    {generatedStory.soundscape}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Volume2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8b5cf6]" />
                  <span>
                    <strong className="text-[#dfe2ee]">Vocal Cadence:</strong>{' '}
                    {generatedStory.narratorDirection}
                  </span>
                </div>
              </div>
            </div>

            {/* Dramatis Personae & Setting */}
            <div className="border-b border-[#1f2937] bg-[#0f131c]/90 p-4 sm:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs">
                  <span className="font-semibold text-[#dfe2ee]">Setting: </span>
                  <span className="text-[#9ca3af]">{generatedStory.setting}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#dfe2ee]">
                    Characters:{' '}
                  </span>
                  {generatedStory.characters?.map((char, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-[#1f2937] bg-[#161f30] px-2 py-0.5 text-[11px]"
                    >
                      <span className="font-medium text-[#ffc174]">
                        {char.name}
                      </span>{' '}
                      <span className="text-[#9ca3af]">({char.role})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reading Passage Body */}
            <div className="mx-auto max-w-[760px] px-6 py-10 sm:px-8">
              <h3 className="mb-6 font-serif text-xl font-semibold tracking-tight text-[#ffc174]">
                {generatedStory.chapterTitle}
              </h3>

              {/* Prose with rich typographic formatting */}
              <div className="font-serif text-base leading-[2rem] text-[#dfe2ee] sm:text-lg sm:leading-[2.2rem]">
                {generatedStory.storyText
                  .split('\n\n')
                  .filter((p) => p.trim())
                  .map((paragraph, index) => (
                    <p key={index} className="mb-6 text-justify">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Branch Narrative / Next Chapter Interactive Options */}
            {generatedStory.continuationPrompts &&
              generatedStory.continuationPrompts.length > 0 && (
                <div className="border-t border-[#1f2937] bg-[#161f30]/80 p-6 sm:p-8">
                  <div className="flex items-center gap-2">
                    <Compass className="h-4 w-4 text-[#f59e0b]" />
                    <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#dfe2ee]">
                      Where Does The Universe Turn Next? (Choose Next Chapter Branch)
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-[#9ca3af]">
                    Select a storyline path to prompt the AI to weave Chapter 2 with your
                    established characters and setting:
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {generatedStory.continuationPrompts.map((branch, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleContinueBranch(branch)}
                        className="group flex flex-col justify-between rounded-xl border border-[#1f2937] bg-[#111827] p-3 text-left transition-all hover:border-[#f59e0b] hover:bg-[#1c2028]"
                      >
                        <span className="text-xs font-medium text-[#dfe2ee] group-hover:text-[#ffc174]">
                          {branch}
                        </span>
                        <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#f59e0b]">
                          <span>Weave This Branch</span>
                          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};
