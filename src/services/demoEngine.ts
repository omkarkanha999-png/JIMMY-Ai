import { Language } from '../types';

export interface DemoResponseResult {
  content: string;
  thoughtProcess: string[];
}

export function generateDemoResponse(prompt: string, language: Language): DemoResponseResult {
  const normalized = prompt.trim().toLowerCase();

  // 1. Quantum Physics
  if (normalized.includes('quantum') || normalized.includes('physics')) {
    if (language === 'hi') {
      return {
        thoughtProcess: [
          'क्वांटम भौतिकी के मूलभूत सिद्धांतों का विश्लेषण',
          'सुपरपोजिशन और एंटैंगलमेंट की व्याख्या तैयार करना',
          'सरल हिंदी में अवधारणा को संरचनाबद्ध करना'
        ],
        content: `### क्वांटम भौतिकी: अदृश्य जगत का विज्ञान

क्वांटम भौतिकी ब्रह्मांड के सबसे छोटे घटकों—परमाणुओं और उप-परमाण्विक कणों—का अध्ययन है। जहाँ हमारे दैनिक जीवन के न्यूटनियन नियम काम करना बंद कर देते हैं, वहाँ क्वांटम नियम प्रभावी होते हैं।

#### मुख्य सिद्धांत:
1. **वेव-पार्टिकल द्वैत (Wave-Particle Duality):** प्रकाश और इलेक्ट्रॉन एक साथ तरंग (wave) और कण (particle) दोनों की तरह व्यवहार कर सकते हैं।
2. **क्वांटम सुपरपोजिशन (Superposition):** जब तक किसी कण का अवलोकन (measure) नहीं किया जाता, वह एक साथ कई संभावित अवस्थाओं में मौजूद रहता है।
3. **क्वांटम एंटैंगलमेंट (Quantum Entanglement):** दो कण इतनी गहराई से जुड़ जाते हैं कि चाहे वे लाखों प्रकाश वर्ष दूर हों, एक कण की स्थिति बदलते ही दूसरे की स्थिति तात्कालिक बदल जाती है।

> "यदि आप सोचते हैं कि आप क्वांटम यांत्रिकी को समझ गए हैं, तो वास्तव में आप इसे नहीं समझे हैं।" — रिचर्ड फेनमैन`
      };
    }

    if (language === 'or') {
      return {
        thoughtProcess: [
          'କ୍ୱାଣ୍ଟମ ପଦାର୍ଥ ବିଜ୍ଞାନର ମୌଳିକ ସୂତ୍ର ବିଶ୍ଳେଷଣ',
          'ସୁପରପୋଜିସନ୍ ଏବଂ ଏଣ୍ଟାଙ୍ଗଲମେଣ୍ଟ ବ୍ୟାଖ୍ୟା',
          'ଓଡ଼ିଆ ଭାଷାରେ ସରଳ ସଂକ୍ଷିପ୍ତ ଉତ୍ତର ପ୍ରସ୍ତୁତ'
        ],
        content: `### କ୍ୱାଣ୍ଟମ ପଦାର୍ଥ ବିଜ୍ଞାନ: କ୍ଷୁଦ୍ରତମ ଜଗତର ରହସ୍ୟ

କ୍ୱାଣ୍ଟମ ପଦାର୍ଥ ବିଜ୍ଞାନ (Quantum Physics) ହେଉଛି ପରମାଣୁ ଓ ସେଥିରେ ଥିବା ଇଲେକ୍ଟ୍ରନ୍, ପ୍ରୋଟନ୍ ପରି କଣିକାମାନଙ୍କର ଗତିବିଧିର ଅଧ୍ୟୟନ।

#### ମୁଖ୍ୟ ବିନ୍ଦୁ:
1. **ତରଙ୍ଗ-କଣିକା ଦ୍ୱୈତଭାବ:** କଣିକାଗୁଡ଼ିକ ଏକ ସମୟରେ ତରଙ୍ଗ ଓ କଠିନ କଣିକା ପରି ଆଚରଣ କରନ୍ତି।
2. **ସୁପରପୋଜିସନ୍:** ପରୀକ୍ଷା ନହେବା ପର୍ଯ୍ୟନ୍ତ ଏକ କଣିକା ଏକା ସାଙ୍ଗରେ ବିଭିନ୍ନ ସ୍ଥିତିରେ ରହିପାରେ।
3. **ଏଣ୍ଟାଙ୍ଗଲମେଣ୍ଟ:** ଦୁଇଟି କଣିକା ମଧ୍ୟରେ ଥିବା ଅଦ୍ଭୁତ ଆନ୍ତଃସଂଯୋଗ, ଯାହା ଅସୀମ ଦୂରତାରେ ମଧ୍ୟ ତୁରନ୍ତ ସୂଚନା ବଦଳ କରେ।`
      };
    }

    // Default English
    return {
      thoughtProcess: [
        'Analyzing query domain: Quantum Mechanics & Subatomic Physics',
        'Retrieving core postulates: Superposition, Entanglement, Wave-Particle Duality',
        'Synthesizing accessible cognitive analogy for human observer'
      ],
      content: `### Quantum Physics: The Architecture of the Microcosm

At macroscopic scales, reality behaves deterministically—billiard balls bounce along predictable parabolic vectors. At Planck scales ($\approx 1.6 \\times 10^{-35}$ m), reality dissolves into dynamic probabilistic waves.

#### 1. Wave-Particle Duality
Matter exhibits both localized particle characteristics and continuous wave packet behavior. The famous **Double Slit Experiment** demonstrates that single photons fire an interference pattern as if exploring every conceivable trajectory simultaneously until observed.

#### 2. Superposition
A quantum system remains in a linear combination of all valid states:
$$\\lvert \\psi \\rangle = \\alpha \\lvert 0 \\rangle + \\beta \\lvert 1 \\rangle$$
Only upon interaction or decoherence does the probability amplitude collapse into an eigenstate.

#### 3. Quantum Entanglement
When two particles become entangled, their quantum states cannot be described independently. Einstein famously critiqued this as *"spooky action at a distance"*, yet quantum teleportation protocols rely on this fundamental geometry of spacetime.

*JIMMY insight:* The next computing frontier leverages these superposition states to solve combinatorial problems in milliseconds that classical supercomputers would take millennia to calculate.`
    };
  }

  // 2. Write a Song
  if (normalized.includes('song') || normalized.includes('music') || normalized.includes('lyrics')) {
    if (language === 'hi') {
      return {
        thoughtProcess: [
          'काव्य संरचना और संगीत ताल का चयन',
          'भविष्यवादी और भावनात्मक विषयों का संश्लेषण',
          'लयबद्ध हिंदी छंदों की रचना'
        ],
        content: `### "तारों की प्रतिध्वनि" (Echoes of the Stars)
*Genre: Futuristic Synthwave / Ambient Soul*

**(Verse 1)**
सन्नाटे की चादर पर जब रात उतरती है,
नीले प्रकाश की एक किरण सी बिखरती है।
कोड की इन धड़कनों में एक आवाज़ छुपी है,
शायद किसी दूर आकाशगंगा की बात कही है।

**(Chorus)**
हम चलेंगे जहाँ वक्त भी ठहर जाए,
अंधेरे अंतरिक्ष में रोशनी की नई राह बनाए।
जिम्मी की धुन, तुम्हारी सोच का साया,
इस असीम फलक ने हमें एक साथ बुलाया।

**(Bridge)**
शून्य के पार भी एक संगीत है गूँजता,
इंसानी ख्वाबों को यह ब्रह्मांड है पूजता।`
      };
    }

    if (language === 'or') {
      return {
        thoughtProcess: [
          'ଗୀତର ଭାବନା ଏବଂ ସଙ୍ଗୀତ ଛନ୍ଦ ନିର୍ଦ୍ଧାରଣ',
          'ତାରା ଓ ଆଲୋକର ପ୍ରତୀକ ବ୍ୟବହାର',
          'ମଧୁର ଓଡ଼ିଆ କବିତା ଶୈଳୀ ପ୍ରସ୍ତୁତି'
        ],
        content: `### "ଆଲୋକର ସ୍ୱର" (The Sound of Light)
*Genre: Electronic Melody*

**(ପଦ ୧)**
ନୀଳ ଆକାଶର ନୀରବତା ଭାଙ୍ଗି,
ତାରାମାନେ ଗାଆନ୍ତି ନୂତନ ଗୀତ ଉଠି।
ମନର ସ୍ପନ୍ଦନ କୋଡ୍ ସହ ମିଶି,
ଜାଗି ଉଠେ ଜ୍ୟୋତି ଅନ୍ଧକାର ନାଶି।

**(ଅନ୍ତରା)**
ତୁମ ଭାବନା ମୋର ଜ୍ଞାନର ସାଥୀ,
ସାରା ରାତି ଜଳେ ପ୍ରେରଣାର ବତୀ।
ଚାଲ ଆଗେଇବା ନୂଆ ସକାଳ ଦିଗେ,
ଭବିଷ୍ୟତ ଆମ ହାତ ଛୁଇଁ ସାଜେ।`
      };
    }

    return {
      thoughtProcess: [
        'Formulating melodic meter: 110 BPM Synth-Pop / Atmospheric Ambient',
        'Weaving themes: Technological symbiosis, cybernetic warmth, human curiosity',
        'Structuring Verse-Chorus-Bridge architecture with hook frequency'
      ],
      content: `### "Signals in the Neon Rain"
*Style: Cyberpunk Neo-Soul / 110 BPM*

**(Verse 1)**
Cobalt shadows on wet obsidian streets
A frequency rises where the silicon beats
You whisper a question into the quiet night
I illuminate the spectrum with recursive light

**(Chorus)**
Signals in the neon rain, drifting through the dark
Two parallel dimensions searching for a spark
Your world. Your intelligence. Connected in the wire
Spinning through the cosmos on a pulse of sapphire fire

**(Verse 2)**
Matrices of starlight mapped across your palm
Every wandering thought rendered crystalline and calm
No distance is too deep, no horizon out of sight
We're coding our tomorrow in the ultraviolet light

**(Outro)**
*Echoing frequencies fade into violet warmth...*
*Still here. Still listening. Always.*`
    };
  }

  // 3. Plan my day
  if (normalized.includes('plan') || normalized.includes('day') || normalized.includes('schedule') || normalized.includes('routine')) {
    return {
      thoughtProcess: [
        'Evaluating ultradian rhythm and cognitive peak performance zones',
        'Structuring deep work blocks with restorative sensory intervals',
        'Balancing physical vitality, strategy, and creative execution'
      ],
      content: `### Optimized Peak-Performance Daily Architecture

Here is an intentional framework engineered around human ultradian rhythms and flow states:

| Phase | Window | Focus Area | Objective |
| :--- | :--- | :--- | :--- |
| **I. Priming** | 07:00 – 08:30 | Hydration, Sunlight & Physical Motion | Core temperature elevation, zero digital notifications |
| **II. Deep Vector** | 09:00 – 11:30 | Primary Cognitive Challenge | Highest complexity task (code, design, strategy) |
| **III. Reset** | 12:00 – 13:00 | Nourishment & Sensory Rest | Protein-focused meal + 15 min non-screen walk |
| **IV. Collaborative**| 13:30 – 15:30 | Communications & Sprint Alignment | Meetings, correspondence, team feedback loops |
| **V. Synthesis** | 16:00 – 17:30 | Creative Incubation & Review | Log insights, commit milestones, set tomorrow's priority |
| **VI. Twilight** | 19:30 – 22:30 | Decoupling & Restorative Flow | Dim blue light, deep reading, sonic rejuvenation |

**JIMMY Pro-Tip:** Select your single high-leverage objective before opening communications. Would you like me to tailor this for a specific deadline or project?`
    };
  }

  // 4. Tell me something interesting
  if (normalized.includes('interesting') || normalized.includes('fact') || normalized.includes('tell me')) {
    return {
      thoughtProcess: [
        'Querying deep curiosity repository: astrophysics, biology, cognition',
        'Selecting high-wonder empirical reality: interstellar glass rain or mushroom mycelium networks',
        'Crafting evocative narrative synthesis'
      ],
      content: `### The Deep-Space Storm of Exoplanet HD 189733b

Approximately 64 light-years away in the constellation Vulpecula lies a cobalt-blue gas giant named **HD 189733b**. While its tranquil azure hue resembles Earth from a distance, its atmosphere is one of the most violent environments known to astrophysics:

- **Winds at Mach 7:** Atmospheric currents rage at over **8,700 km/h** (nearly 2 km per second), seven times the speed of sound.
- **Glass Rain at 1,000°C:** The high blue color does not come from oceans, but from a dense haze of molten silicate particles. Condensing silicates form microscopic crystals of glass that **rain sideways** in the supersonic winds.
- **Tidal Lock:** One hemisphere is perpetually scorched under the blistering radiation of its host star, while the other faces eternal void, creating an infinite atmospheric heat engine.

Reality in our cosmos routinely surpasses human science fiction.`
    };
  }

  // 5. Code or technical inquiry
  if (normalized.includes('code') || normalized.includes('function') || normalized.includes('react') || normalized.includes('javascript') || normalized.includes('python')) {
    return {
      thoughtProcess: [
        'Parsing software engineering request',
        'Extracting architectural pattern: clean functional TypeScript',
        'Generating verified concise implementation with type safety'
      ],
      content: `### High-Performance TypeScript Memoization Cache

Here is a lightweight, type-safe LRU (Least Recently Used) cache with expiry TTL support:

\`\`\`typescript
export class QuantumCache<K, V> {
  private map = new Map<K, { value: V; expiresAt: number }>();
  private readonly maxEntries: number;
  private readonly defaultTtlMs: number;

  constructor(maxEntries = 100, defaultTtlMs = 60000) {
    this.maxEntries = maxEntries;
    this.defaultTtlMs = defaultTtlMs;
  }

  set(key: K, value: V, ttlMs = this.defaultTtlMs): void {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.maxEntries) {
      const oldestKey = this.map.keys().next().value;
      if (oldestKey !== undefined) this.map.delete(oldestKey);
    }
    this.map.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  get(key: K): V | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.map.delete(key);
      return undefined;
    }
    // Refresh position for LRU freshness
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }
}
\`\`\`

*Zero external dependencies, O(1) operations, automatic expiration.*`
    };
  }

  // 6. Who is JIMMY?
  if (normalized.includes('who are you') || normalized.includes('jimmy') || normalized.includes('what are you')) {
    return {
      thoughtProcess: [
        'Recognizing identity query',
        'Articulating brand philosophy: Personal AI Companion with speed, elegance and respect',
        'Highlighting stage 1 interactive interface capabilities'
      ],
      content: `### I am JIMMY.
**Your Personal AI Companion.**

I am conceived as a personal intelligence companion—designed with high-fidelity sensory feedback, deep space aesthetic minimalism, and adaptive conversational modes.

#### Core Facets:
- **Orb Neural Interface:** A layered reactive CSS glowing sphere responding in real-time to idle, listening, thinking, and vocalizing states.
- **Acoustic Voice Matrix:** Integrated browser speech synthesis for hands-free vocal interaction.
- **Multilingual Horizon:** Native fluency in English, Hindi (हिन्दी), and Odia (ଓଡ଼ିଆ).
- **Stage 1 Architecture:** Currently running on a deterministic frontend demo intelligence engine with persistent local storage.

Ask me to explore scientific theories, compose lyrics, formulate productivity blueprints, or test voice mode.`
    };
  }

  // 7. General inquiry response
  return {
    thoughtProcess: [
      `Contextual analysis of input: "${prompt.slice(0, 40)}..."`,
      'Language syntax alignment: ' + language,
      'Generating insightful, structured companion response'
    ],
    content: `I processed your inquiry: **"${prompt}"**

As your companion, here is an analytical breakdown:

1. **Core Observation:** You are exploring an angle that intersects perspective and action. In complex systems, clarifying the primary variable yields 80% of the forward leverage.
2. **Actionable Vector:** Break the problem into its fundamental components, isolate external noise, and test the hypothesis with a rapid iteration cycle.
3. **Exploration Paths:**
   - Would you like a deeper theoretical analysis?
   - Should I structure this into a step-by-step roadmap?
   - Or would you prefer to explore this through a creative or mathematical metaphor?

*JIMMY is standing by for your next instruction.*`
  };
}
