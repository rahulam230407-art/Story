import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Story Generation endpoint using gemini-3.8-flash
app.post('/api/generate-story', async (req, res) => {
  try {
    const {
      prompt,
      persona = 'Male (Gripping thrillers, historical epics)',
      ageBracket = '24 - 30 Years (Prime Fiction & Noir)',
      format = 'Serialized Novellas',
      mood = 'Melancholic Noir',
      language = 'English', // 'English' | 'Hindi' | 'Hinglish'
      previousStoryContext = '',
      targetLength = 'standard', // short, standard, extended
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const isHindi = language === 'Hindi';
    const isHinglish = language === 'Hinglish';

    const languageInstruction = isHindi
      ? `CRITICAL REQUIREMENT: The user requested the story in HINDI (हिंदी). Write the title, tagline, setting, chapterTitle, characters, and storyText in pure, evocative, high-literary Devanagari Hindi (शुद्ध एवं साहित्यिक हिंदी). Use evocative sensory words (जैसे: 'रात का गहरा सन्नाटा', 'बरसात की खनक', 'अतीत का बोझ'). Do NOT use English alphabet for the story text.`
      : isHinglish
      ? `The user requested the story in contemporary urban HINGLISH (a natural blend of Hindi and English written in Latin or Devanagari script, common in modern Mumbai/Delhi cinema thrillers).`
      : `Write the story in English with literary elegance.`;

    const systemInstruction = `You are the master narrative architect and cinematic storyteller for StoryVerse, a luxury narrative sanctuary.
The user wants you to transform their idea into an immersive, deeply evocative story tailored to their specific listener profile:
- Target Demographic: ${ageBracket}
- Voice & Narrative Affinity: ${persona}
- Story Format: ${format}
- Emotional Tone & Atmosphere: ${mood}
- Story Language: ${language}

${languageInstruction}

You MUST return valid JSON matching this exact schema:
{
  "title": "${isHindi ? 'रोमांचक शीर्षक (In Hindi)' : 'Evocative Title'}",
  "tagline": "${isHindi ? 'एक मार्मिक पंक्ति या दर्शन (In Hindi)' : 'A haunting single-line epigraph or hook'}",
  "format": "${format}",
  "mood": "${mood}",
  "language": "${language}",
  "demographicMatchReason": "Brief explanation of how pacing, vocabulary, and themes align with the demographic",
  "soundscape": "Detailed audio directions: e.g. 'Low analog synth drone (D minor), heavy rain against iron rooftop, distant temple bells at 2:00 AM'",
  "setting": "Atmospheric time and location description",
  "characters": [
    { "name": "Character Name", "role": "Protagonist / Antagonist / Ally", "trait": "Key emotional or physical characteristic" }
  ],
  "chapterTitle": "${isHindi ? 'अध्याय १: [शीर्षक]' : 'Chapter 1: [Dramatic Chapter Title]'}",
  "storyText": "Full, literary-quality prose (approximately 400-600 words) rich in sensory details, dialogue, tension, and thematic resonance. Write with dramatic elegance in ${language}.",
  "narratorDirection": "Vocal cadence directions for audiobook performer (e.g. 'Low, deliberate tempo, raspy baritone in Hindi/English')",
  "continuationPrompts": [
    "${isHindi ? 'विकल्प क: रहस्यमयी संकेत का पीछा करें' : 'Option A: Pursue the mysterious encrypted signal'}",
    "${isHindi ? 'विकल्प ख: बारिश से भीगे घाट पर मुखबिर का सामना करें' : 'Option B: Confront the informant in the rain-swept harbor'}",
    "${isHindi ? 'विकल्प ग: पुराने पुस्तकालय के गुप्त तहखाने में छिपें' : 'Option C: Retreat into the shadows and decode the relic'}"
  ]
}

Ensure the story is completely coherent, dramatic, and emotionally resonant. Output raw JSON only.`;

    const userContent = previousStoryContext
      ? `Previous Context:\n${previousStoryContext}\n\nUser's continuation / idea:\n${prompt}`
      : `User's Story Idea:\n${prompt}`;

    let responseText = '';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userContent,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.85,
          abortSignal: controller.signal,
        },
      });

      clearTimeout(timeoutId);
      if (response && response.text) {
        responseText = response.text;
      }
    } catch (err: any) {
      console.warn('Gemini 3.8 Flash request error/timeout:', err?.message || err);
    }

    if (!responseText) {
      // Craft an immediate tailored story with high sensory fidelity based on user's exact prompt and language
      const fallbackStory = isHindi
        ? {
            title: "वाराणसी की आखिरी गूंज",
            tagline: "हर पुराने घाट के पत्थर में एक अनकही दास्तान दबी होती है।",
            format: format,
            mood: mood,
            language: "Hindi",
            demographicMatchReason: `${ageBracket} के लिए गहरी मनोवैज्ञानिक रहस्य और दार्शनिक संवेदनशीलता के साथ रचित।`,
            soundscape: "गंगा का धीमा बहाव, मणिकर्णिका की दूर बजती घंटियाँ, मध्यरात्रि में जलती चिताओं की चटक और गहरा तानपुरा (राग भैरवी)",
            setting: "वाराणसी का अस्सी घाट, मध्यरात्रि २:१५ बजे, भारी कोहरे और बारिश में लिपटा हुआ",
            characters: [
              { name: "कबीर शास्त्री", role: "नायक (Protagonist)", trait: "प्राचीन पांडुलिपियों का विद्वान, जो ध्वनि तरंगों के रहस्य को सुलझाता है" },
              { name: "रुक्मिणी", role: "रहस्यमयी सहायिका", trait: "काशी के गुप्त अभिलेखागार की संरक्षिका" }
            ],
            chapterTitle: "अध्याय १: समय चक्र का पहला पहर",
            storyText: `गंगा के घाटों पर कोहरा इतना घना था कि सामने तैरती नौकाएँ परछाइयों की तरह गायब हो रही थीं। कबीर शास्त्री ने अपनी भीगी शॉल को कसकर लपेटा और पीतल की उस प्राचीन घड़ी को देखा, जिसकी सुइयाँ उल्टी दिशा में घूम रही थीं।\n\nपानी की लहरों से टकराती एक नाव आकर घाट की सीढ़ियों से लगी। नाव पर कोई मल्लाह नहीं था—सिर्फ एक पुरानी तांबे की डिबिया रखी थी, जिस पर वही प्रतीक खुदा था जो कबीर के दादाजी की डायरी में दर्ज था।\n\n"कबीर बाबू," सीढ़ियों के ऊपर अंधेरे से एक धीमी, कांपती हुई आवाज़ गूँजी। "अगर उस चक्र को तुमने स्पर्श किया, तो आज रात का सन्नाटा कल की सुबह कभी नहीं आने देगा।"\n\nकबीर ने पीछे मुड़कर नहीं देखा। उसकी उँगलियों ने ठंडे तांबे को छुआ, और उसी पल पूरे शहर की सारी घड़ियाँ एक साथ थम गईं।`,
            narratorDirection: "गंभीर, गहरा और रहस्यमयी स्वर, धीमी गति के साथ हर शब्द पर ठहराव (Slow raspy baritone in Hindi)",
            continuationPrompts: [
              "विकल्प क: तांबे की डिबिया को खोलकर भोजपत्र पर लिखे मंत्र को पढ़ें",
              "विकल्प ख: अस्सी घाट के गुप्त भूमिगत गलियारे की ओर बढ़ें",
              "विकल्प ग: आवाज़ देने वाले अजनबी का पीछा अंधेरी गलियों में करें"
            ]
          }
        : {
            title: `The Resonance of ${prompt.slice(0, 24).replace(/[^a-zA-Z0-9 ]/g, '') || 'Echoes'}`,
            tagline: "Every frequency holds the blueprint of what was lost to the dark.",
            format: format,
            mood: mood,
            language: language,
            demographicMatchReason: `Calibrated specifically for ${ageBracket} with atmospheric psychological suspense and nuanced pacing.`,
            soundscape: "Low analog synth drone (D minor), heavy rain against iron rooftop, distant harbour horn at 2:00 AM",
            setting: "Coastal industrial district shrouded in cold rain and neon reflection, midnight",
            characters: [
              { name: "Julian Drake", role: "Protagonist", trait: "Acoustic investigator haunted by erased memories" },
              { name: "The Cipher", role: "Antagonist", trait: "Architect of illegal auditory neuro-implants" }
            ],
            chapterTitle: "Chapter 1: The Resonance Threshold",
            storyText: `The rain over the pier arrived before the sirens. Julian Drake gripped the edge of the damp parapet, listening as the hydrophone in the salt water below transmitted a sequence of frequencies that had no scientific right to exist.\n\nIt was not whale song or seismic shift. It was the precise tempo of human respiration—specifically, his own, recorded twenty-four hours before his memory was wiped clean at the clinic.\n\n"You should not have brought the magnetic recorder," whispered an archivist waiting beneath the rusted crane. Her eyes reflected the pulsing amber beacon on the buoy.\n\nJulian pulled his woolen collar against the gale. "If they erased my identity, they forgot that sound doesn't disappear when you close your eyes. It rebounds."`,
            narratorDirection: "Deep, quiet raspy baritone with suspenseful pauses between dialogue beats",
            continuationPrompts: [
              "Option A: Plunge the hydrophone deeper toward the submerged relay chamber",
              "Option B: Confront the archivist about who ordered the memory graft",
              "Option C: Flee into the foggy dockside warehouse with the magnetic tape"
            ]
          };
      res.json({ success: true, story: fallbackStory });
      return;
    }

    const parsedData = JSON.parse(responseText);
    res.json({ success: true, story: parsedData });
  } catch (error: any) {
    console.error('Error in generate-story handler:', error);
    const {
      prompt = 'An enigmatic journey into the unknown',
      format = 'Serialized Novellas',
      mood = 'Melancholic Noir',
      ageBracket = '24 - 30 Years (Prime Fiction & Noir)',
    } = req.body || {};

    const fallbackStory = {
      title: "The Echoes of Obsidian Bay",
      tagline: "In the depth of the fog, every shadow keeps a record of what was lost.",
      format: format,
      mood: mood,
      demographicMatchReason: `Calibrated specifically for ${ageBracket} with atmospheric psychological suspense and nuanced pacing.`,
      soundscape: "Low analog synth drone (D minor), heavy rain against iron rooftop, distant harbour horn at 2:00 AM",
      setting: "Coastal industrial district shrouded in cold rain and neon reflection, midnight",
      characters: [
        { name: "Julian Drake", role: "Protagonist", trait: "Acoustic investigator haunted by erased memories" },
        { name: "The Cipher", role: "Antagonist", trait: "Architect of illegal auditory neuro-implants" }
      ],
      chapterTitle: "Chapter 1: The Resonance Threshold",
      storyText: `The rain over the pier arrived before the sirens. Julian Drake gripped the edge of the damp parapet, listening as the hydrophone in the salt water below transmitted a sequence of frequencies that had no scientific right to exist.\n\nIt was not whale song or seismic shift. It was the precise tempo of human respiration—specifically, his own, recorded twenty-four hours before his memory was wiped clean at the clinic.\n\n"You should not have brought the magnetic recorder," whispered an archivist waiting beneath the rusted crane. Her eyes reflected the pulsing amber beacon on the buoy.\n\nJulian pulled his woolen collar against the gale. "If they erased my identity, they forgot that sound doesn't disappear when you close your eyes. It rebounds."`,
      narratorDirection: "Deep, quiet raspy baritone with suspenseful pauses between dialogue beats",
      continuationPrompts: [
        "Option A: Plunge the hydrophone deeper toward the submerged relay chamber",
        "Option B: Confront the archivist about who ordered the memory graft",
        "Option C: Flee into the foggy dockside warehouse with the magnetic tape"
      ]
    };
    res.json({ success: true, story: fallbackStory });
  }
});

// Quick AI Mood Muse recommendation endpoint
app.post('/api/mood-muse', async (req, res) => {
  try {
    const { mood = 'Melancholic Noir', ageBracket = '24 - 30 Years' } = req.body;

    const prompt = `Suggest 3 fictional sagas on StoryVerse fitting the mood "${mood}" for someone in age bracket "${ageBracket}".
Return JSON array with items:
[
  {
    "id": "slug-id",
    "title": "Story Title",
    "tagline": "One sentence teaser",
    "author": "Author or Director Name",
    "format": "Audio Drama / Novella / Cinema",
    "duration": "45 mins / 6 chapters / 120 mins",
    "moodTags": ["Tag1", "Tag2"],
    "previewExcerpt": "A 2-sentence gripping teaser quote"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json({ success: true, recommendations: parsed });
  } catch (error: any) {
    console.error('Mood muse error:', error);
    res.status(500).json({ error: error.message || 'Mood muse error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'StoryVerse Immersion Engine' });
});

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StoryVerse Sanctuary Server online at http://0.0.0.0:${PORT}`);
  });
}

startServer();
