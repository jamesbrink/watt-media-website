export type PriceValue =
  | { kind: 'fixed'; amount: number }
  | { kind: 'range'; min: number; max: number };

export interface ServiceSummary {
  id: string;
  name: string;
  route: string;
  description: string;
  image: string;
  alt: string;
  startingPrice: PriceValue;
}

export interface OfferItem {
  id: string;
  label: string;
  price: PriceValue;
  notes?: string;
}

export interface OfferGroup {
  id: string;
  serviceName: string;
  blurb: string;
  items: OfferItem[];
}

export const formatCurrency = (value: number): string =>
  `$${value.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} AUD`;

export const formatPriceValue = (price: PriceValue): string =>
  price.kind === 'fixed'
    ? formatCurrency(price.amount)
    : `${formatCurrency(price.min)} - ${formatCurrency(price.max)}`;

export const serviceSummaries: ServiceSummary[] = [
  {
    id: 'branding-identity',
    name: 'Branding & Identity Design',
    route: '/branding-identity',
    description:
      'Complete brand identity packages including logos, business cards, letterheads, and brand guidelines.',
    image: '/images/branding-identity-website-image.svg',
    alt: 'Branding & Identity',
    startingPrice: { kind: 'fixed', amount: 220 }
  },
  {
    id: 'print-marketing-design',
    name: 'Print & Marketing Design',
    route: '/print-marketing-design',
    description:
      'Professional brochures, flyers, posters, and marketing materials that capture attention.',
    image: '/images/print-marketing-design-website-image.svg',
    alt: 'Print & Marketing Design',
    startingPrice: { kind: 'fixed', amount: 165 }
  },
  {
    id: 'social-media-design',
    name: 'Social Media Design',
    route: '/social-media-design',
    description: 'Eye-catching social media graphics and content packages for all platforms.',
    image: '/images/social-media-design.svg',
    alt: 'Social Media Design',
    startingPrice: { kind: 'fixed', amount: 55 }
  },
  {
    id: 'visual-content-creation',
    name: 'Visual Content Creation',
    route: '/visual-content-creation',
    description: 'Photography, photo editing, video production, and visual storytelling.',
    image: '/images/visual-content-creation.svg',
    alt: 'Visual Content Creation',
    startingPrice: { kind: 'fixed', amount: 110 }
  },
  {
    id: 'audio-services',
    name: 'Audio Production',
    route: '/audio-services',
    description: 'Podcast editing, music production, voiceovers, and audio branding.',
    image: '/images/audio-production-website-image.svg',
    alt: 'Audio Production',
    startingPrice: { kind: 'fixed', amount: 110 }
  }
];

export const offerGroups: OfferGroup[] = [
  {
    id: 'branding',
    serviceName: 'Branding & Identity',
    blurb:
      'Logo design, full identity packages, and bespoke business card options tailored to your brand.',
    items: [
      { id: 'logo-design', label: 'Logo Design', price: { kind: 'fixed', amount: 220 } },
      {
        id: 'brand-identity-package',
        label: 'Brand Identity Package',
        price: { kind: 'range', min: 660, max: 880 }
      },
      {
        id: 'business-card-basic',
        label: 'Business Card Design (Basic)',
        price: { kind: 'fixed', amount: 110 }
      },
      {
        id: 'business-card-with-logo',
        label: 'Business Card Design (with Logo)',
        price: { kind: 'fixed', amount: 275 }
      }
    ]
  },
  {
    id: 'print',
    serviceName: 'Print & Marketing Design',
    blurb:
      'From flyers and brochures to menus and signage, print collateral that keeps your brand consistent.',
    items: [
      { id: 'basic-flyer', label: 'Basic Flyer (1 page)', price: { kind: 'fixed', amount: 165 } },
      {
        id: 'basic-brochure',
        label: 'Basic Brochure (2-4 pages)',
        price: { kind: 'fixed', amount: 330 }
      },
      {
        id: 'advanced-flyer',
        label: 'Advanced Flyer',
        price: { kind: 'fixed', amount: 385 }
      },
      {
        id: 'advanced-brochure',
        label: 'Advanced Brochure (5+ pages)',
        price: { kind: 'fixed', amount: 660 }
      },
      {
        id: 'poster',
        label: 'Flyer / Poster (Single-sided)',
        price: { kind: 'fixed', amount: 165 }
      },
      {
        id: 'brochure-bifold-trifold',
        label: 'Brochure (Bi-fold or Tri-fold)',
        price: { kind: 'range', min: 220, max: 330 }
      },
      {
        id: 'menu-price-list',
        label: 'Menu / Price List Design',
        price: { kind: 'range', min: 165, max: 275 }
      }
    ]
  },
  {
    id: 'social',
    serviceName: 'Social Media Design',
    blurb:
      'Templates, animations, and post-ready assets designed to keep your social channels on-brand.',
    items: [
      {
        id: 'social-basic-post',
        label: 'Basic Static Post',
        price: { kind: 'fixed', amount: 55 },
        notes: 'Quote graphics, announcements'
      },
      {
        id: 'social-detailed-post',
        label: 'Detailed Static Post',
        price: { kind: 'range', min: 88, max: 110 },
        notes: 'Infographics, multi-layered design'
      },
      {
        id: 'social-template-pack',
        label: 'Template Pack',
        price: { kind: 'range', min: 330, max: 550 }
      },
      {
        id: 'social-animations',
        label: 'Branded Animations',
        price: { kind: 'range', min: 220, max: 440 }
      },
      {
        id: 'social-profile-covers',
        label: 'Profile & Cover Photos',
        price: { kind: 'range', min: 110, max: 220 }
      },
      {
        id: 'social-highlight-covers',
        label: 'Highlight Covers (Set of 5)',
        price: { kind: 'range', min: 110, max: 165 }
      }
    ]
  },
  {
    id: 'visual',
    serviceName: 'Visual Content Creation',
    blurb:
      'Photography, editing, and video support - ideal for campaigns, events, and ongoing content needs.',
    items: [
      {
        id: 'visual-session',
        label: 'Photography Session (per hour)',
        price: { kind: 'fixed', amount: 110 },
        notes: 'Includes editing and color correction'
      },
      {
        id: 'visual-editing',
        label: 'Advanced Photo Retouching',
        price: { kind: 'range', min: 88, max: 165 }
      },
      {
        id: 'visual-video-support',
        label: 'Video Production Support',
        price: { kind: 'range', min: 220, max: 550 }
      }
    ]
  },
  {
    id: 'audio',
    serviceName: 'Audio Production',
    blurb:
      'Polished audio for podcasts, voiceovers, and branded content with fast, broadcast-ready turnaround.',
    items: [
      {
        id: 'audio-podcast-edit',
        label: 'Podcast Editing (per episode)',
        price: { kind: 'range', min: 165, max: 275 }
      },
      {
        id: 'audio-voiceover',
        label: 'Voiceover Recording',
        price: { kind: 'fixed', amount: 165 }
      },
      {
        id: 'audio-mix-master',
        label: 'Audio Mixing & Mastering',
        price: { kind: 'range', min: 220, max: 330 }
      },
      {
        id: 'audio-custom',
        label: 'Custom Music or Jingle',
        price: { kind: 'range', min: 440, max: 660 }
      }
    ]
  }
];
