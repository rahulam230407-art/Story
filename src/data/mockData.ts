import { VoiceAffinityOption, AgeBracketOption, StoryFormatOption, CuratedStory } from '../types';

export const VOICE_AFFINITIES: VoiceAffinityOption[] = [
  {
    id: 'female',
    label: 'Female',
    description: 'Heroines, feminist epics & distinct narrative warmth.',
    iconName: 'Venus',
  },
  {
    id: 'male',
    label: 'Male',
    description: 'Gripping thrillers, historical epics & resonant low timbres.',
    iconName: 'Mars',
  },
  {
    id: 'non-binary',
    label: 'Non-Binary',
    description: 'Expansive, queer tales & genre-bending vocal fluidity.',
    iconName: 'Sparkles',
  },
  {
    id: 'family',
    label: 'Family / Kids',
    description: 'Child-safe locks, wonder-filled bedtime & playful voices.',
    iconName: 'Users',
  },
  {
    id: 'undisclosed',
    label: 'Undisclosed',
    description: 'Pure genre & algorithmic mood calibration without bias.',
    iconName: 'Smile',
  },
];

export const AGE_BRACKETS: AgeBracketOption[] = [
  {
    id: '3-10',
    range: '3 – 10 Years',
    title: 'Little Voyagers',
    description: 'Bedtime tales, wonder, rhymes & magic. Kids safe mode auto-on.',
    iconName: 'Smile',
  },
  {
    id: '10-15',
    range: '10 – 15 Years',
    title: 'Young Adventurers',
    description: 'Mythological epics, space quests & young fantasy champions.',
    iconName: 'Compass',
  },
  {
    id: '15-18',
    range: '15 – 18 Years',
    title: 'Teens & YA Fiction',
    description: 'High school sagas, dystopian sci-fi & coming-of-age mysteries.',
    iconName: 'Flame',
  },
  {
    id: '18-24',
    range: '18 – 24 Years',
    title: 'New Adult Horizons',
    description: 'Modern romance, cyber novellas & fast-paced dramatic arcs.',
    iconName: 'Send',
  },
  {
    id: '24-30',
    range: '24 – 30 Years',
    title: 'Prime Fiction & Noir',
    description: 'Speculative thrillers, psychological cinema & contemporary prose.',
    iconName: 'Star',
    colorAccent: 'amber',
  },
  {
    id: '30-45',
    range: '30 – 45 Years',
    title: 'Deep Narrative Arc',
    description: 'Hard sci-fi, philosophical thrillers, rich investigative stories.',
    iconName: 'Lightbulb',
  },
  {
    id: '45-60',
    range: '45 – 60 Years',
    title: 'Classics & Epics',
    description: 'Literary classics, biographical sagas, historical audio theatre.',
    iconName: 'BookOpen',
  },
  {
    id: '60+',
    range: '60+ Years',
    title: 'Heritage & Wisdom',
    description: 'Spiritual treatises, ancient folklore, soothing reflective audio.',
    iconName: 'Feather',
  },
];

export const STORY_FORMATS: StoryFormatOption[] = [
  {
    id: 'cinematic',
    label: 'Cinematic & OTT Premieres',
    iconName: 'Clapperboard',
  },
  {
    id: 'spatial-audio',
    label: 'Spatial Audiobooks',
    iconName: 'Headphones',
  },
  {
    id: 'novellas',
    label: 'Serialized Novellas',
    iconName: 'BookMarked',
  },
  {
    id: 'podcasts',
    label: 'Immersive Audio Podcasts',
    iconName: 'Radio',
  },
  {
    id: 'ebooks',
    label: 'Illustrated E-Books',
    iconName: 'BookOpenCheck',
  },
];

export const CURATED_STORIES: CuratedStory[] = [
  {
    id: 'varanasi-samaychakra',
    title: 'वाराणसी का रहस्यमयी समयचक्र',
    subtitle: 'अस्सी घाट की धुंध में छिपा एक प्राचीन यंत्र, जो बीते हुए कल की आवाज़ें सुनाता है।',
    cover: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80',
    category: 'Original Stories',
    ageBracket: '24 – 30 Years',
    format: 'Serialized Novellas',
    language: 'Hindi',
    duration: '६ अध्याय • ४२ मिनट',
    author: 'आलोक धर त्रिपाठी',
    voiceActor: 'पंकज भारद्वाज (गंभीर बैरिटोन स्वर)',
    rating: 4.96,
    moodTags: ['दार्शनिक रहस्य', 'Melancholic Noir', 'काशी की रात'],
    soundscapeSnippet: 'गंगा की लहरों की थपक, मणिकर्णिका की दूर बजती घंटियाँ, मध्यरात्रि में धीमी शहनाई',
    synopsis: '१८९२ में एक घड़ीसाज़ ने पीतल का ऐसा यंत्र बनाया था जो समय नहीं नापता था, बल्कि मनुष्य के भीतर दबे पछतावे की गूँज पकड़ता था।',
    contentSample: `गंगा के घाटों पर रात के दो बजे कोहरा इतना गाढ़ा हो चुका था कि अस्सी घाट की बत्तियाँ बुझती हुई मशालों जैसी लग रही थीं।

कबीर शास्त्री ने अपने हाथ में पकड़ी पीतल की पुरानी घड़ी को देखा। सुइयाँ बारह पर आकर ठिठक गई थीं, लेकिन उसके भीतर के दांते अब भी टिक-टिक कर रहे थे। एक ऐसी टिक-टिक जो कानों में नहीं, सीधे सीने की पसलियों में धड़कती थी।

"शास्त्री जी," सीढ़ियों के ऊपर नीम के पेड़ की छांव से एक आवाज़ आई। आवाज़ में बनारस की पुरानी हवेलियों का सीलन भरा सन्नाटा था। "जिस पहिए को आपने छेड़ा है, वह आज की तारीख नहीं दिखाता। वह उस तारीख पर ले जाता है जब आपके पुरखों ने इस शहर को अपनी रूह बेची थी।"

कबीर ने मुड़कर देखा। वहाँ कोई इंसान नहीं था, सिर्फ गीले पत्थरों पर किसी के पाँव के भीगे निशान थे, जो सीधे नदी के पानी की ओर जा रहे थे।`,
  },
  {
    id: 'marine-drive-hindi',
    title: 'मरीन ड्राइव की वो बारिशी रात',
    subtitle: 'मुंबई की मूसलाधार बारिश, एनालॉग रिकॉर्ड्स और मिटाई गई यादों का मनोवैज्ञानिक थ्रिलर।',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    category: 'Audio Books',
    ageBracket: '24 – 30 Years',
    format: 'Spatial Audiobooks',
    language: 'Hindi',
    duration: '५ एपिसोड • ५५ मिनट',
    author: 'विक्रमादित्य सेनगुप्ता',
    voiceActor: 'कबीर ओबेरॉय (Dolby Atmos Binaural)',
    rating: 4.92,
    moodTags: ['साइकॉलॉजिकल थ्रिलर', 'Monsoon Gloom', 'मुंबई नोइर'],
    soundscapeSnippet: 'समंदर की तेज़ लहरें, पैरापेट पर गिरती बारिश, दूर टैक्सी का हॉर्न और पुराना वायलिन',
    synopsis: 'एक पुराने फ्लैट के तहखाने में मिले १९७४ के टेप को सुनते ही आर्यन को वो बातें याद आने लगती हैं जो उसने कभी जी ही नहीं थीं।',
    contentSample: `जुलाई की वो रात समंदर के पानी से नहीं, डर की नमी से भीगी हुई थी।

आर्यन जोशी ने मरीन ड्राइव की रेलिंग पर दोनों हाथ टिकाए। सामने फैला अरब सागर काले शीशे की तरह चमक रहा था। जेब में रखा उसका पुराना वॉकमैन अपने आप चालू हो गया था। हेडफोन में एक जानी-पहचानी आवाज़ सरगोशी कर रही थी।

"आर्यन... अगर तुम यह सुन रहे हो, तो इसका मतलब है कि उन्होंने तुम्हारे दिमाग से मेरा नाम मिटा दिया है। लेकिन टेप की मैग्नेटिक स्ट्रिप झूठ नहीं बोलती।"

बिजली चमकी, और कुछ पलों के लिए पानी की सतह पर उसे अपनी नहीं, किसी और की परछाईं दिखाई दी।`,
  },
  {
    id: 'chandni-chowk-2089',
    title: 'चाँदनी चौक २०८९: नीयॉन की परछाइयाँ',
    subtitle: 'भविष्य के साइबर-दहलीज पर पुरानी दिल्ली की तंग गलियों में मेमोरी स्मगलिंग का महायुद्ध।',
    cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=900&q=80',
    category: 'Movies',
    ageBracket: '18 – 24 Years',
    format: 'Cinematic & OTT Premieres',
    language: 'Hindi',
    duration: 'ओरिजिनल सीरीज़ • ८ एपिसोड',
    author: 'ऋषि के. मेहता',
    voiceActor: 'साइबरपंक हिंदी कास्ट (3D Audio)',
    rating: 4.89,
    moodTags: ['हाई-एड्रेनालाईन', 'Cyberpunk', 'भविष्य की दिल्ली'],
    soundscapeSnippet: 'मैग्नेटिक ट्रेन की घरघराहट, नीयॉन साइनबोर्ड की भिनभिनाहट, एसिड रेन की बूंदें',
    synopsis: '२०८९ में जब दिल्ली का आकाश कृत्रिम बादलों से ढक गया, तब ज़ोया ने जामा मस्जिद के भूमिगत बाज़ार से एक ऐसी चिप चुराई जिसमें भारत का आखिरी सच्चा इतिहास कैद था।',
    contentSample: `पुरानी दिल्ली के स्काईवे पर चलने वाली मैग्नेटिक ट्रेन ने हवा को चीरते हुए सायरन बजाया।

ज़ोया ने अपने चश्मे का इंफ्रारेड फिल्टर चालू किया। बल्लीमारान की तंग गलियों में नीयॉन की हरी और लाल रोशनी कीचड़ भरे पानी में तैर रही थी। उसकी गर्दन के पीछे लगा न्यूरल पोर्ट गरम हो चुका था। डेटा ट्रांसफर ९८% पर रुका हुआ था।

"ज़ोया, भागो!" उसके कान में इंप्लांट किया हुआ ट्रांसमीटर चीखा। "कॉर्पोरेट कमांडो लाल किले की छत से नीचे उतर चुके हैं।"

उसने अपनी लेदर जैकेट की ज़िप खींची और छतों के उस पार छलांग लगा दी, जहाँ दिल्ली का अंधेरा बादलों से बात कर रहा था।`,
  },
  {
    id: 'shadows-of-mumbai',
    title: 'The Rain Over Marine Drive',
    subtitle: 'A neo-noir psychological thriller beneath neon-drenched monsoon skies.',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    category: 'Original Stories',
    ageBracket: '24 – 30 Years',
    format: 'Serialized Novellas',
    language: 'English',
    duration: '6 Chapters • 48 mins',
    author: 'Vikramaditya Sengupta',
    voiceActor: 'Kabir Oberoi (Raspy Baritone)',
    rating: 4.9,
    moodTags: ['Melancholic Noir', 'Psychological', 'Monsoon Gloom'],
    soundscapeSnippet: 'Heavy coastal rain, distant car horns muffled by fog, 2:00 AM jazz piano reverb',
    synopsis: 'When a cryptographic ledger surfaces in an abandoned Art Deco apartment off Marine Drive, disgraced archivist Aryan Joshi finds himself stalked by memories he was paid to erase.',
    contentSample: `The monsoon had washed the salt off the parapet, but it couldn't cleanse the rust inside Aryan's chest.

He lit a clove cigarette beneath the rusted overhang of the sea-facing balcony. Across the curved bay, the Queen's Necklace blinked through sheets of gray spray—not like diamonds tonight, but like dying fluorescent tubes in an autopsy chamber.

His phone buzzed. A burner with no SIM registration. Just six digits: 04:19:88.

"I told you," a voice rasped through the receiver, thin and frayed like wet silk. "The tape wasn't incinerated. It's inside the water tank on the eighth floor."

Aryan didn't exhale. The rain hammered against the corrugated tin above, a relentless polyrhythm of brass and tin. "Whose name is on the label?"

A dry, bitter laugh swallowed the sound of the surf. "Yours, Aryan. Before the memory graft."`,
  },
  {
    id: 'chronicles-of-elysium',
    title: 'The Silent Frequency of Ophiuchus',
    subtitle: 'An acoustic deep-space odyssey at the edge of the Kuiper belt.',
    cover: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=900&q=80',
    category: 'Audio Books',
    ageBracket: '24 – 30 Years',
    format: 'Spatial Audiobooks',
    language: 'English',
    duration: '8 Episodes • 3 hrs 20 mins',
    author: 'Dr. Elena Rostova & K. M. Nair',
    voiceActor: 'Tara Deshmukh (Dolby Atmos Binaural)',
    rating: 4.95,
    moodTags: ['Cosmic Solitude', 'Hard Sci-Fi', 'Existential Mystery'],
    soundscapeSnippet: 'Low cabin ventilation rumble, ion engine pulse, distant radio static, heartbeat sensor',
    synopsis: 'Stationary probe relay 11-Omicron detects a harmonic sequence repeating every seventeen minutes inside a dead asteroid.',
    contentSample: `Space does not possess silence; it possesses an unbearable vibration.

Onboard Relay 11, the hull expands and contracts with the thermal gradient of a dying star sixty AU distant. Inside Commander Maya Thorne's helmet, the only sound was her own respiration—a shallow, rhythmic reminder of finite atmospheric reserves.

Then, the sensor array spike appeared. Not an irregular gamma burst or solar flare interference.

A pure, mathematical C-minor triad, broadcast from an asteroid core that should have cooled four billion years ago.`,
  },
  {
    id: 'the-gilded-cage',
    title: 'The Clockmaker of Varanasi',
    subtitle: 'A historical mystery weaving Vedic geometry, lost clockwork, and forbidden dynasties.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
    category: 'OTT Releases',
    ageBracket: '30 – 45 Years',
    format: 'Cinematic & OTT Premieres',
    language: 'English',
    duration: 'Feature Film • 134 mins',
    author: 'Ananya Raghavan',
    voiceActor: 'Full Cast Cinematic Theatre',
    rating: 4.88,
    moodTags: ['Historical Intrigue', 'Philosophical', 'Esoteric'],
    soundscapeSnippet: 'Ganges river ripples, brass gear escapements ticking in unison, distant temple chimes',
    synopsis: 'In 1892, an eccentric artisan constructs a water-clock that predicts the exact moment the river ghats will swallow their own reflections.',
    contentSample: `Water possesses memory, but brass remembers intent.

Master Govind stood over the dissected ribcage of the pendulum clock. His fingers, stained black with whale oil and sandalwood paste, hovered above the escapement wheel. For three generations, the British residency had demanded he build timepieces that kept London time.

Instead, Govind had tuned each brass tooth to the waxing cycles of the lunar asterisms.

"If they listen closely tomorrow," he whispered to his apprentice, "they will not hear seconds passing. They will hear their empire unspooling."`,
  },
  {
    id: 'velvet-whispers',
    title: 'Ghost In The High Alpine',
    subtitle: 'A gothic psychological chamber piece set in a snowed-in sanatorium.',
    cover: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=900&q=80',
    category: 'Podcasts',
    ageBracket: '18 – 24 Years',
    format: 'Immersive Audio Podcasts',
    language: 'English',
    duration: '10 Episodes • 22 mins each',
    author: 'Julian Mercer',
    voiceActor: 'Binaural 3D Cast',
    rating: 4.82,
    moodTags: ['Gothic Suspense', 'Chilling', 'Atmospheric Dread'],
    soundscapeSnippet: 'Blizzard winds howling against antique window panes, fireplace embers crackling, floorboard squeak',
    synopsis: 'A winter research scholar discovers diary entries hidden inside the wall cavity of an abandoned Alpine library.',
    contentSample: `The snow started before noon, erasing the road back down to Innsbruck in less than forty minutes.

By midnight, the sanatorium was an island cut adrift in white static. Doctor Clara Vance counted nine guests in the dining hall, though the ledger had only recorded eight arrivals.

The ninth guest sat by the hearth, sipping tea that never cooled.`,
  },
  {
    id: 'cyber-delhi-2089',
    title: 'Neon Synapse: Old Delhi 2089',
    subtitle: 'Cyberpunk adrenaline beneath hyper-dense skyways and neural black markets.',
    cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=900&q=80',
    category: 'Movies',
    ageBracket: '18 – 24 Years',
    format: 'Cinematic & OTT Premieres',
    language: 'English',
    duration: 'Full Series • Season 1',
    author: 'Rishi K. Mehta',
    voiceActor: 'Bilingual Hindi/English Cyberpunk Cast',
    rating: 4.91,
    moodTags: ['High-Adrenaline', 'Cyberpunk', 'Gritty'],
    soundscapeSnippet: 'Overhead magnetic train screech, synthetic rain, neon inverter buzz, sub-bass pulse',
    synopsis: 'In the submerged bazaar beneath Chandni Chowk, memory smuggler Zoya discovers an uncorrupted pre-digital AI consciousness.',
    contentSample: `The monsoon downpour in Old Delhi was thirty percent acid, seventy percent recycled vapor from the upper atmospheric shields.

Zoya adjusted her optical filter. The alleyway flared in neon magenta and toxic amber. Her wetware port at the base of her skull pulsed with a searing migraine.

"Target has breached the Spice Market skybridge," her handler muttered in her auditory canal. "Do not let him purge the drive."`,
  },
  {
    id: 'little-voyagers-tale',
    title: 'The Starlight Baker of Cloud Mountain',
    subtitle: 'A cozy, whimsical bedtime adventure for little voyagers and dreaming minds.',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    category: 'E-Books',
    ageBracket: '3 – 10 Years',
    format: 'Illustrated E-Books',
    language: 'English',
    duration: '15 mins Bedtime Listen',
    author: 'Meera Chawla',
    voiceActor: 'Gentle Storybook Narrator with harp accompaniment',
    rating: 4.97,
    moodTags: ['Cozy Whimsical', 'Bedtime Magic', 'Gentle'],
    soundscapeSnippet: 'Gentle harp plucking, warm wind chime breeze, night cricket chorus, soft acoustic warmth',
    synopsis: 'Every evening when the sun tucks into bed, Pippin the squirrel rolls dough made of moonbeams and powdered cinnamon.',
    contentSample: `High above the tallest pine tree, where the clouds are fluffy as warm bread, lived Pippin.

Pippin had a tiny wooden spoon and a silver apron. Every night, while children brushed their teeth and put on their softest pajamas, Pippin climbed his winding staircase to check the oven.

"One pinch of twilight," Pippin hummed, "two drops of honey-dew, and three twinkling sparks from the North Star."`,
  },
];

export const PRESET_MOODS = [
  { id: 'noir', name: 'Melancholic Noir', color: '#ffb95f', tone: 'Shadowy, introspective, rainy, moral dilemmas' },
  { id: 'adrenaline', name: 'High-Adrenaline Thrill', color: '#ef4444', tone: 'Fast-paced, high stakes, relentless velocity' },
  { id: 'cosmic', name: 'Cosmic Solitude & Wonder', color: '#8b5cf6', tone: 'Vast, philosophical, existential awe' },
  { id: 'whimsical', name: 'Cozy Whimsical Folklore', color: '#10b981', tone: 'Warm hearth, enchanted wonder, gentle comfort' },
  { id: 'gothic', name: 'Gothic Suspense & Dread', color: '#6366f1', tone: 'Haunted corridors, psychological tension, secrets' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon Pulse', color: '#ec4899', tone: 'Synthesizers, rain-slicked concrete, neural intrigue' },
];
