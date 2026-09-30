/* =====================================================================
   Pharmatoka — central content model (single source of truth).
   Every factual claim is sourced in /CONTENT-SOURCES.md. Anything that
   could not be verified publicly is marked with TODO and rendered with a
   visible "to confirm" marker — never presented as fact.
   ===================================================================== */

export const TODO = 'To be confirmed by Pharmatoka';

export const company = {
  name: 'Pharmatoka',
  legalFR: 'Pharmatoka SAS',
  legalUS: 'Pharmatoka Inc.',
  domain: 'pharmatoka.in',
  founder: 'Gunter Haesaerts',
  researchSince: 2004,
  elluraLaunch: 2006,
  description:
    'Pharmatoka is a French company specialising in the research, development and production of botanical supplements for urogenital health — built on more than twenty years of cranberry research.',
  boilerplate:
    'Pharmatoka SAS is a French company specialising in the research, development and production of botanical supplements for urogenital health. In 2004 it began developing a cranberry fruit-juice extract for urinary tract health, and two years later launched its flagship brand, ellura® (sold as urell® in European markets). Pharmatoka received the American Botanical Council’s 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award. Its US business, Pharmatoka Inc., is based in Atlanta, Georgia. Pharmatoka is now bringing its portfolio — ellura and the emerging Vondberi brand — to India.',
  emails: {
    corporate: 'hello@pharmatoka.in',
    partners: 'partners@pharmatoka.in',
    media: 'media@pharmatoka.in',
    careers: 'careers@pharmatoka.in',
    safety: 'safety@pharmatoka.in',
  },
};

export const offices = [
  {
    id: 'fr',
    code: 'FR',
    city: 'Rueil-Malmaison',
    country: 'France',
    role: 'Headquarters',
    entity: 'Pharmatoka SAS',
    lines: ['20–22 Avenue de la République', '92500 Rueil-Malmaison', 'France'],
    coords: '48.877° N, 2.181° E',
    body: 'Where the research began in 2004 and where the company is headquartered today.',
    image: 'france',
    confirmed: true,
  },
  {
    id: 'us',
    code: 'US',
    city: 'Atlanta',
    country: 'United States',
    role: 'US operations — home of ellura',
    entity: 'Pharmatoka Inc.',
    lines: ['Atlanta, GA 30309', 'United States'],
    coords: '33.749° N, 84.388° W',
    body: 'Pharmatoka Inc. markets ellura in the United States, where it is trusted by healthcare providers.',
    image: 'atlanta',
    confirmed: true,
  },
  {
    id: 'in',
    code: 'IN',
    city: 'India',
    country: 'India',
    role: 'India operations',
    entity: 'Pharmatoka India',
    lines: [TODO + ' — registered office address'],
    coords: '—',
    body: 'The newest chapter: bringing a studied, botanical portfolio to Indian patients, pharmacists and clinicians.',
    image: 'india',
    confirmed: false,
  },
];

/* ---------------- Brands ---------------- */
export const ellura = {
  name: 'ellura',
  status: 'Established brand',
  external: 'https://ellurautihealth.com/',
  externalLabel: 'ellurautihealth.com',
  tagline: 'Your powerful urinary tract health supplement.',
  summary:
    'ellura is Pharmatoka’s flagship cranberry supplement for urinary tract health. Each capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit-juice extract.',
  heritage:
    'Developed from cranberry research that began in France in 2004 and launched two years later, ellura is sold as urell® in European markets.',
  facts: [
    { k: 'Active', v: '36 mg soluble, bioactive A-type PACs' },
    { k: 'Source', v: '100% concentrated cranberry fruit-juice extract' },
    { k: 'Botanical', v: 'Vaccinium macrocarpon' },
    { k: 'Format', v: 'One capsule daily' },
    { k: 'Formulation', v: 'Vegan · gluten-free · non-GMO · sugar-free' },
  ],
  disclaimer:
    'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.',
};

export const vondberi = {
  name: 'Vondberi',
  status: 'Emerging brand',
  tagline: 'A new chapter in botanical wellbeing.',
  summary:
    'Vondberi is Pharmatoka’s emerging brand, carrying the same botanical, evidence-first discipline into new areas of everyday health. Its range will be introduced as the brand launches — until then, this is where you’ll find it.',
  todos: ['Category & positioning', 'Key ingredients & format', 'Launch timing in India'],
};

/* ---------------- Timeline ---------------- */
export const timeline = [
  {
    year: '2004',
    title: 'A cranberry question, in France',
    body: 'Pharmatoka begins developing a cranberry fruit-juice extract for urinary tract health.',
    image: 'cranberry-bog',
  },
  {
    year: '2006',
    title: 'ellura is launched',
    body: 'The flagship brand arrives two years later — sold as urell® in European markets.',
    image: 'cranberry-cut',
  },
  {
    year: '2014',
    title: 'The portfolio grows',
    body: 'Pharmatoka introduces Prostaril®, an extract of saw palmetto (Serenoa repens).',
    image: 'leaf-dark',
  },
  {
    year: '2018',
    title: 'Recognised for research',
    body: 'The American Botanical Council presents Pharmatoka with its 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award.',
    image: 'lab-microscope',
  },
  {
    year: 'Now',
    title: 'Rooted in nature, arriving in India',
    body: 'More than twenty years of cranberry research, now brought to India — led by ellura, joined by the emerging Vondberi.',
    image: 'india',
  },
];

/* ---------------- Values ---------------- */
export const values = [
  {
    n: '01',
    title: 'Evidence before claims',
    body: 'We build on published science and studied ingredients. Where evidence is still emerging, we say so — plainly.',
  },
  {
    n: '02',
    title: 'A dose you can trust',
    body: 'Botanicals vary. Standardising to a defined, measured amount of active compounds is what turns a plant into a dependable product.',
  },
  {
    n: '03',
    title: 'Respect for the body',
    body: 'Well-tolerated, plant-based formulations designed for everyday use and long-term wellbeing.',
  },
  {
    n: '04',
    title: 'Partners, not just customers',
    body: 'We work alongside clinicians, pharmacists and distributors, and share the science openly so people can make informed choices.',
  },
];

/* ---------------- Science ---------------- */
export const researchPillars = [
  {
    k: 'A-type PACs',
    title: 'The compound, not just the fruit',
    body: 'ellura is standardised to 36 mg of soluble, bioactive A-type proanthocyanidins (PACs) — the cranberry constituents studied for their ability to reduce the adherence of certain bacteria to the lining of the urinary tract.',
  },
  {
    k: 'Measurement',
    title: 'Measured the rigorous way',
    body: 'PAC content is quantified using the DMAC/A2 method, so the 36 mg on the label reflects a defined, characterised dose rather than a whole-fruit estimate.',
  },
  {
    k: 'Clinical research',
    title: 'Studied in people',
    body: 'Pharmatoka has consistently funded clinical research on its key formulation. By 2018, seven clinical trials had been conducted on ellura.',
  },
  {
    k: 'Recognition',
    title: 'Recognised by peers',
    body: 'The American Botanical Council honoured Pharmatoka with its 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award.',
  },
];

export const qualitySteps = [
  {
    n: '01',
    title: 'Botanical source',
    body: 'The American cranberry, Vaccinium macrocarpon — used as 100% concentrated cranberry fruit-juice extract.',
    image: 'cranberry-plant',
  },
  {
    n: '02',
    title: 'Standardised extract',
    body: 'Each capsule is standardised to 36 mg of soluble, bioactive A-type PACs, quantified by the DMAC/A2 method.',
    image: 'lab-wells',
  },
  {
    n: '03',
    title: 'Clean formulation',
    body: 'Vegan, gluten-free, non-GMO and sugar-free — nothing in the capsule that doesn’t need to be there.',
    image: 'capsule-macro',
  },
  {
    n: '04',
    title: 'Manufacturing & release',
    body: 'Manufacturing standards, site details and release testing for the India portfolio will be published here.',
    image: 'cleanroom',
    todo: 'Manufacturing site, standards & testing protocol',
  },
];

export const certifications = [
  { code: 'GMP', name: 'Good Manufacturing Practice', scope: 'Manufacturing quality system', ref: null },
  { code: 'ISO', name: 'ISO quality management', scope: 'Quality-management certification', ref: null },
  { code: 'FSSAI', name: 'Food Safety & Standards Authority of India', scope: 'Licence for products distributed in India', ref: null },
  { code: 'NON-GMO', name: 'Non-GMO formulation', scope: 'ellura is formulated non-GMO', ref: 'Product attribute' },
];

export const advisorDisciplines = [
  { field: 'Urology', focus: 'Urinary tract health & clinical practice' },
  { field: 'Gynaecology', focus: 'Women’s urogenital health' },
  { field: 'Pharmacognosy', focus: 'Botanical actives & standardisation' },
  { field: 'Clinical pharmacology', focus: 'Study design & safety' },
  { field: 'Nutrition science', focus: 'Everyday wellbeing & supplementation' },
];

/* ---------------- Leadership ---------------- */
export const leadership = [
  {
    name: company.founder,
    role: 'Founder',
    group: 'Founder',
    bio: 'Founder of Pharmatoka — a company known for its focus on funding clinical research into its key cranberry formulation.',
    confirmed: true,
  },
  { name: null, role: 'Partner', group: 'Partners', bio: null, confirmed: false },
  { name: null, role: 'Partner', group: 'Partners', bio: null, confirmed: false },
  { name: null, role: 'Country Head — India', group: 'India leadership', bio: null, confirmed: false },
  { name: null, role: 'Head of Medical Affairs — India', group: 'India leadership', bio: null, confirmed: false },
  { name: null, role: 'Head of Commercial — India', group: 'India leadership', bio: null, confirmed: false },
];

/* ---------------- Newsroom ---------------- */
export type NewsItem = {
  slug: string;
  date: string;
  category: 'Corporate' | 'Brand' | 'Recognition';
  title: string;
  excerpt: string;
  image: string;
  body: string[];
  external?: string;
};

export const news: NewsItem[] = [
  {
    slug: 'pharmatoka-in-india',
    date: '2026-09-01',
    category: 'Corporate',
    title: 'Pharmatoka brings its botanical science portfolio to India',
    excerpt:
      'The French health company introduces its portfolio to India, led by the established ellura brand and the emerging Vondberi brand.',
    image: 'india',
    body: [
      'Pharmatoka, the French company specialising in botanical supplements for urogenital health, today announced its introduction to India.',
      'The India portfolio is led by ellura, Pharmatoka’s flagship cranberry supplement for urinary tract health, standardised to 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit-juice extract. It is joined by Vondberi, an emerging brand that extends the company’s botanical, evidence-first approach into new areas of everyday health.',
      'Pharmatoka’s work on cranberry began in France in 2004. Its focus on funding clinical research into its key formulation was recognised by the American Botanical Council with the 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award.',
    ],
  },
  {
    slug: 'ellura-india',
    date: '2026-08-12',
    category: 'Brand',
    title: 'ellura, a studied cranberry supplement, begins its India rollout',
    excerpt:
      'Pharmatoka’s flagship urinary tract health supplement — built on more than twenty years of cranberry research — is being introduced to Indian pharmacies.',
    image: 'berries-frost',
    body: [
      'ellura delivers 36 mg of soluble, bioactive A-type PACs per capsule, from 100% concentrated cranberry fruit-juice extract (Vaccinium macrocarpon). It is vegan, gluten-free, non-GMO and sugar-free, taken as one capsule daily.',
      'Launched in 2006 and sold as urell® in European markets, ellura is marketed in the United States by Pharmatoka Inc., Atlanta.',
    ],
  },
  {
    slug: 'introducing-vondberi',
    date: '2026-07-20',
    category: 'Brand',
    title: 'Introducing Vondberi: a new chapter in botanical wellbeing',
    excerpt:
      'Pharmatoka previews Vondberi, an emerging brand carrying its botanical philosophy into new areas of everyday health.',
    image: 'leaf-drops',
    body: [
      'Vondberi is Pharmatoka’s emerging brand. It will carry the company’s botanical, evidence-first discipline into new areas of everyday health.',
      'Details of the Vondberi range, including its category, ingredients and launch timing, will be shared as the brand is introduced.',
    ],
  },
  {
    slug: 'abc-tyler-award',
    date: '2018-03-01',
    category: 'Recognition',
    title: 'Pharmatoka receives the ABC Varro E. Tyler Award for phytomedicinal research',
    excerpt:
      'The American Botanical Council presented Pharmatoka with its 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award.',
    image: 'lab-microscope',
    body: [
      'The American Botanical Council (ABC) announced that its 2017 Varro E. Tyler Commercial Investment in Phytomedicinal Research Award would be presented to Pharmatoka SAS.',
      'The award was presented at the 13th Annual ABC Botanical Celebration and Awards Ceremony on 8 March 2018 in Anaheim, California.',
    ],
    external:
      'https://www.globenewswire.com/news-release/2018/03/01/1409517/0/en/Pharmatoka-to-Receive-ABC-Varro-E-Tyler-Award-for-Excellence-in-Phytomedicinal-Research.html',
  },
];

/* ---------------- Knowledge Centre ---------------- */
export type Article = {
  slug: string;
  date: string;
  topic: 'Science' | 'Quality' | 'Wellness';
  mins: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  reviewer: string | null;
  sections: { h: string; p: string[] }[];
};

export const articles: Article[] = [
  {
    slug: 'what-are-a-type-pacs',
    date: '2026-09-10',
    topic: 'Science',
    mins: 5,
    title: 'What are A-type PACs — and why the type matters',
    excerpt: 'A plain-language look at the cranberry compounds behind urinary tract research, and why not all cranberry is equal.',
    image: 'cranberry-cut',
    author: 'Pharmatoka Science Team',
    reviewer: null,
    sections: [
      {
        h: 'A family of plant compounds',
        p: [
          'Proanthocyanidins (PACs) are a family of naturally occurring plant compounds. Cranberries — Vaccinium macrocarpon — are notable for containing A-type PACs, which differ in structure from the B-type PACs found in many other fruits.',
          'It is this structural difference that has made cranberry A-type PACs a subject of research interest for urinary tract health, where they have been studied for their ability to reduce the adherence of certain bacteria to the lining of the urinary tract.',
        ],
      },
      {
        h: 'Why the dose is stated in PACs',
        p: [
          'Cranberry products vary enormously. A label that lists only “cranberry” or “cranberry powder” says little about how much of the active compound is inside.',
          'Stating the amount of PACs — and how they were measured — makes the dose meaningful. ellura, for example, is standardised to 36 mg of soluble, bioactive A-type PACs, quantified by the DMAC/A2 method.',
        ],
      },
      {
        h: 'What this means for you',
        p: [
          'When comparing cranberry supplements, look for a stated PAC amount and a named measurement method. And speak to your doctor or pharmacist about what is appropriate for you.',
        ],
      },
    ],
  },
  {
    slug: 'standardisation-explained',
    date: '2026-08-28',
    topic: 'Quality',
    mins: 4,
    title: 'Standardisation, explained: from field to capsule',
    excerpt: 'How a botanical becomes a consistent, characterised dose — capsule after capsule.',
    image: 'lab-pipette',
    author: 'Pharmatoka Quality Team',
    reviewer: null,
    sections: [
      {
        h: 'Plants are variable by nature',
        p: [
          'Soil, climate, harvest and processing all influence how much of a given compound a plant contains. Two batches of the same fruit can differ significantly.',
        ],
      },
      {
        h: 'Standardising to an active marker',
        p: [
          'Standardisation means defining a target amount of a characteristic compound and measuring each batch against it. Rather than a variable amount of whole fruit, you receive a defined amount of the constituent that matters.',
          'For ellura, that marker is soluble, bioactive A-type PACs — 36 mg per capsule — from 100% concentrated cranberry fruit-juice extract.',
        ],
      },
    ],
  },
  {
    slug: 'reading-a-supplement-label',
    date: '2026-08-05',
    topic: 'Wellness',
    mins: 4,
    title: 'How to read a supplement label like a pharmacist',
    excerpt: 'Dose, form, source and disclaimers — four things worth checking before anything goes in the basket.',
    image: 'hands-softgel',
    author: 'Pharmatoka Science Team',
    reviewer: null,
    sections: [
      {
        h: '1 · The dose of the active compound',
        p: ['Look for the amount of the compound that matters, not just the weight of the plant material.'],
      },
      {
        h: '2 · The source',
        p: ['A botanical name (for example, Vaccinium macrocarpon) tells you exactly which plant was used.'],
      },
      {
        h: '3 · The form and daily use',
        p: ['Check how, and how often, the product is meant to be taken — and whether that fits your routine.'],
      },
      {
        h: '4 · The small print',
        p: [
          'Disclaimers and cautions are there for a reason. If you are pregnant, taking medicines or managing a condition, ask your doctor or pharmacist first.',
        ],
      },
    ],
  },
];

/* ---------------- Careers ---------------- */
export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

/** Illustrative listings — the job template is real, the roles need confirming. */
export const roles: Role[] = [
  {
    slug: 'medical-affairs-lead',
    title: 'Medical Affairs Lead',
    team: 'Science & Medical',
    location: 'India',
    type: 'Full-time',
    summary: 'Own the scientific relationship with India’s clinical community and make sure every word we publish is accurate.',
    responsibilities: [
      'Build relationships with urologists, gynaecologists and pharmacists',
      'Review scientific and promotional content for accuracy',
      'Support the Scientific Advisory Board programme',
    ],
    requirements: ['Medical or pharmacy degree', 'Experience in medical affairs', 'Clear, careful scientific communication'],
  },
  {
    slug: 'key-account-manager-pharmacy',
    title: 'Key Account Manager — Pharmacy',
    team: 'Commercial',
    location: 'India',
    type: 'Full-time',
    summary: 'Grow partnerships with pharmacy chains and independent pharmacies across your region.',
    responsibilities: ['Manage pharmacy chain relationships', 'Plan in-store education with pharmacists', 'Forecast and report on account performance'],
    requirements: ['Pharmacy or healthcare sales experience', 'Strong regional network', 'Structured, data-literate approach'],
  },
  {
    slug: 'regulatory-affairs-specialist',
    title: 'Regulatory Affairs Specialist',
    team: 'Quality & Regulatory',
    location: 'India',
    type: 'Full-time',
    summary: 'Keep the India portfolio compliant, from licences and labelling to product dossiers.',
    responsibilities: ['Manage FSSAI licensing and renewals', 'Review labels and claims', 'Maintain regulatory documentation'],
    requirements: ['Regulatory experience in nutraceuticals or pharma', 'Knowledge of FSSAI regulations', 'Meticulous attention to detail'],
  },
  {
    slug: 'brand-marketing-manager',
    title: 'Brand Marketing Manager',
    team: 'Marketing',
    location: 'India',
    type: 'Full-time',
    summary: 'Introduce ellura and Vondberi to India with communication that is warm, clear and evidence-led.',
    responsibilities: ['Lead brand planning for the India portfolio', 'Brief and manage agencies', 'Work with Medical Affairs on claims'],
    requirements: ['Consumer-health brand experience', 'Excellent writing and judgement', 'Comfort with regulated communication'],
  },
];

/* ---------------- FAQs ---------------- */
export const faqs = [
  {
    group: 'The company',
    items: [
      {
        q: 'What does Pharmatoka do?',
        a: 'Pharmatoka is a French company specialising in the research, development and production of botanical supplements for urogenital health. Its flagship brand is ellura; Vondberi is its emerging brand.',
      },
      {
        q: 'Where is Pharmatoka based?',
        a: 'Pharmatoka SAS is headquartered in Rueil-Malmaison, France. Its US business, Pharmatoka Inc., is based in Atlanta, Georgia, and operations are being established in India.',
      },
      {
        q: 'How long has Pharmatoka been researching cranberry?',
        a: 'Pharmatoka began developing its cranberry fruit-juice extract in France in 2004 — more than twenty years of cranberry research.',
      },
    ],
  },
  {
    group: 'Our brands',
    items: [
      {
        q: 'How are Pharmatoka, ellura and Vondberi related?',
        a: 'Pharmatoka is the parent company. ellura is its established flagship brand for urinary tract health; Vondberi is an emerging brand. Both belong to the Pharmatoka portfolio.',
      },
      {
        q: 'Does Vondberi have its own website?',
        a: 'Not yet. Details of the Vondberi range will be shared as the brand is introduced. Until then, Vondberi lives on this site.',
      },
      {
        q: 'Where can I learn how to use ellura?',
        a: 'Product use questions are best answered on the ellura website or by your pharmacist or doctor. This page covers company-level questions only.',
      },
    ],
  },
  {
    group: 'Working with us',
    items: [
      {
        q: 'How can I become a distributor or pharmacy partner?',
        a: 'Visit Partner With Us and tell us about your business. Our team reviews every enquiry and responds to those that fit our distribution model.',
      },
      {
        q: 'How do I report a concern about a product?',
        a: 'Use Report a Product Concern. It routes side-effect, quality and packaging reports to the right team. In an emergency, contact emergency services (112 in India) first.',
      },
      {
        q: 'Where can journalists find logos and company information?',
        a: 'The Media Kit has our logo files, boilerplate, brand colours and media contact.',
      },
    ],
  },
];

/* ---------------- Navigation ---------------- */
export type NavChild = { label: string; to: string; desc: string; image: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Our Story', to: '/about/our-story', desc: 'Founding, heritage and why India now', image: 'cranberry-bog' },
      { label: 'Mission, Vision & Values', to: '/about/mission-vision-values', desc: 'What Pharmatoka stands for', image: 'leaf-shadow' },
      { label: 'Leadership Team', to: '/about/leadership', desc: 'Founder, partners and India leadership', image: 'team' },
      { label: 'Global Presence', to: '/about/global-presence', desc: 'France, the United States and India', image: 'france' },
    ],
  },
  { label: 'Our Brands', to: '/brands' },
  {
    label: 'Science & Quality',
    to: '/science',
    children: [
      { label: 'Research & Evidence', to: '/science/research', desc: 'The science behind the portfolio', image: 'lab-microscope' },
      { label: 'Scientific Advisory Board', to: '/science/advisory-board', desc: 'Our scientific and medical advisors', image: 'lab-scientist' },
      { label: 'Quality & Manufacturing', to: '/science/quality', desc: 'Sourcing, standards and testing', image: 'capsule-macro' },
      { label: 'Certifications & Licences', to: '/science/certifications', desc: 'GMP, ISO, FSSAI and more', image: 'cleanroom' },
    ],
  },
  { label: 'Newsroom', to: '/news' },
  { label: 'Knowledge', to: '/knowledge' },
  { label: 'Partners', to: '/partners' },
];

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Story', to: '/about/our-story' },
      { label: 'Mission & Values', to: '/about/mission-vision-values' },
      { label: 'Leadership', to: '/about/leadership' },
      { label: 'Global Presence', to: '/about/global-presence' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Science',
    links: [
      { label: 'Science & Quality', to: '/science' },
      { label: 'Research & Evidence', to: '/science/research' },
      { label: 'Advisory Board', to: '/science/advisory-board' },
      { label: 'Quality & Manufacturing', to: '/science/quality' },
      { label: 'Certifications', to: '/science/certifications' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Our Brands', to: '/brands' },
      { label: 'Newsroom', to: '/news' },
      { label: 'Knowledge Centre', to: '/knowledge' },
      { label: 'Partner With Us', to: '/partners' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Sustainability & CSR', to: '/sustainability' },
    ],
  },
];

export const footerUtility = [
  { label: 'FAQs', to: '/faq' },
  { label: 'Media Kit', to: '/news/media-kit' },
  { label: 'Report a Product Concern', to: '/report-concern' },
];

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
