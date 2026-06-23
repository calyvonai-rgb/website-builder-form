export type QuestionType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'file' | 'social';

export interface Question {
  id: string;
  section: string;
  sectionNumber: number;
  type: QuestionType;
  label: string;
  hint: string;
  placeholder?: string;
  required: boolean;
  optional?: boolean;
  accept?: string;
  multiple?: boolean;
}

export const questions: Question[] = [
  // ── Section 1: Contact Information ──────────────────────────────────
  {
    id: 'fullName',
    section: 'Contact Information',
    sectionNumber: 1,
    type: 'text',
    label: "What's your full name?",
    hint: 'What should we call you?',
    placeholder: 'Jane Smith',
    required: true,
  },
  {
    id: 'email',
    section: 'Contact Information',
    sectionNumber: 1,
    type: 'email',
    label: "What's your email address?",
    hint: "We'll use this to send updates, files, and keep you in the loop.",
    placeholder: 'jane@yourbusiness.com',
    required: true,
  },
  {
    id: 'phone',
    section: 'Contact Information',
    sectionNumber: 1,
    type: 'tel',
    label: "Best phone number to reach you?",
    hint: 'In case we need to hop on a quick call.',
    placeholder: '+1 (555) 000-0000',
    required: true,
  },
  {
    id: 'businessName',
    section: 'Contact Information',
    sectionNumber: 1,
    type: 'text',
    label: "What's your business name?",
    hint: "The name we'll use across your site.",
    placeholder: 'Acme Studio',
    required: true,
  },
  {
    id: 'currentWebsite',
    section: 'Contact Information',
    sectionNumber: 1,
    type: 'url',
    label: 'Do you have a current website?',
    hint: "No website yet? No problem — that's why you're here.",
    placeholder: 'https://yoursite.com',
    required: false,
    optional: true,
  },

  // ── Section 2: Business Details ──────────────────────────────────────
  {
    id: 'industry',
    section: 'Business Details',
    sectionNumber: 2,
    type: 'text',
    label: "What industry is your business in?",
    hint: 'E.g. health & wellness, real estate, creative services, e-commerce...',
    placeholder: 'Health & Wellness',
    required: true,
  },
  {
    id: 'businessDescription',
    section: 'Business Details',
    sectionNumber: 2,
    type: 'textarea',
    label: "Tell us about your business and what makes you different.",
    hint: "Describe it like you'd tell a friend — no jargon needed.",
    placeholder: 'We help busy professionals reclaim their energy through...',
    required: true,
  },
  {
    id: 'primaryGoal',
    section: 'Business Details',
    sectionNumber: 2,
    type: 'text',
    label: "What's the #1 goal for your new website?",
    hint: 'More leads? Online bookings? Brand credibility? Be specific — it shapes everything.',
    placeholder: 'Generate qualified leads',
    required: true,
  },
  {
    id: 'targetAudience',
    section: 'Business Details',
    sectionNumber: 2,
    type: 'textarea',
    label: "Who is your primary target audience?",
    hint: 'Age, lifestyle, needs — paint us a picture of your ideal customer.',
    placeholder: 'Women aged 30–50, health-conscious, time-poor...',
    required: true,
  },
  {
    id: 'services',
    section: 'Business Details',
    sectionNumber: 2,
    type: 'textarea',
    label: "What are your key services or products?",
    hint: "Don't overthink it — even a rough list helps us structure your site.",
    placeholder: '1:1 coaching, online courses, group programmes...',
    required: true,
  },
  {
    id: 'launchTimeline',
    section: 'Business Details',
    sectionNumber: 2,
    type: 'text',
    label: "What's your preferred launch timeline?",
    hint: 'ASAP, within 4 weeks, flexible — whatever works for you.',
    placeholder: 'Within 4–6 weeks',
    required: true,
  },

  // ── Section 3: Design Preferences ───────────────────────────────────
  {
    id: 'visualStyle',
    section: 'Design Preferences',
    sectionNumber: 3,
    type: 'text',
    label: "How would you describe your preferred visual style?",
    hint: 'E.g. clean & minimal, bold & colourful, elegant & editorial, warm & earthy.',
    placeholder: 'Clean, minimal, warm',
    required: true,
  },
  {
    id: 'brandPersonality',
    section: 'Design Preferences',
    sectionNumber: 3,
    type: 'text',
    label: "How would you define your brand personality?",
    hint: 'E.g. professional but approachable, fun and playful, premium and refined.',
    placeholder: 'Warm, trustworthy, expert',
    required: true,
  },
  {
    id: 'inspirationSites',
    section: 'Design Preferences',
    sectionNumber: 3,
    type: 'textarea',
    label: "Any websites you love or want us to use as inspiration?",
    hint: 'Even a big brand is fine — it just helps us understand your taste.',
    placeholder: 'Apple.com for the clean layout, Glossier for the warmth...',
    required: false,
    optional: true,
  },
  {
    id: 'colors',
    section: 'Design Preferences',
    sectionNumber: 3,
    type: 'text',
    label: "Any colours you want to include or avoid?",
    hint: 'Sometimes knowing what you hate is just as useful.',
    placeholder: 'Love: sage green, cream. Avoid: bright red, black',
    required: false,
    optional: true,
  },
  {
    id: 'mustHavePages',
    section: 'Design Preferences',
    sectionNumber: 3,
    type: 'textarea',
    label: "What pages or features are must-haves for your site?",
    hint: 'E.g. contact form, booking system, portfolio gallery, blog, shop...',
    placeholder: 'Home, About, Services, Contact, maybe a Blog',
    required: true,
  },
  {
    id: 'socialLinks',
    section: 'Design Preferences',
    sectionNumber: 3,
    type: 'social',
    label: "Do you have any social media pages?",
    hint: 'Drop the links so we can connect them on your site.',
    required: false,
    optional: true,
  },

  // ── Section 4: Logo ──────────────────────────────────────────────────
  {
    id: 'logoFiles',
    section: 'Logo',
    sectionNumber: 4,
    type: 'file',
    label: 'Upload your logo files',
    hint: "No logo yet? No worries, we'll work around it.",
    required: false,
    optional: true,
    accept: 'image/*,.svg,.pdf,.ai,.eps,.zip',
    multiple: true,
  },

  // ── Section 5: Brand Assets ──────────────────────────────────────────
  {
    id: 'brandAssets',
    section: 'Brand Assets',
    sectionNumber: 5,
    type: 'file',
    label: 'Upload any brand assets or style guides',
    hint: 'Fonts, colour palettes, brand guidelines — anything that defines your look.',
    required: false,
    optional: true,
    accept: 'image/*,.pdf,.ai,.eps,.zip,.sketch,.fig',
    multiple: true,
  },

  // ── Section 6: Photos ────────────────────────────────────────────────
  {
    id: 'photos',
    section: 'Photos & Images',
    sectionNumber: 6,
    type: 'file',
    label: "Upload photos or images you'd like us to include on your site",
    hint: 'Lifestyle shots, product photos, team pics — the more the merrier.',
    required: false,
    optional: true,
    accept: 'image/*',
    multiple: true,
  },

  // ── Section 7: Final Notes ───────────────────────────────────────────
  {
    id: 'specialRequests',
    section: 'Final Notes',
    sectionNumber: 7,
    type: 'textarea',
    label: "Any special requests, notes, or anything else we should know?",
    hint: 'Last chance — anything on your mind, drop it here.',
    placeholder: 'Feel free to share anything at all...',
    required: false,
    optional: true,
  },
];
