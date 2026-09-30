/* Photography library. All images are from Unsplash (free Unsplash License);
   credits in /CONTENT-SOURCES.md. Each image ships as 800w + 1600w WebP. */

type Img = { alt: string; w: number; h: number };

export const images = {
  'berries-dark': { alt: 'Deep red cranberries in soft focus', w: 1800, h: 1202 },
  'berries-frost': { alt: 'Frosted cranberries, close up', w: 1800, h: 2700 },
  'berry-branch': { alt: 'A sprig of red berries against a dark background', w: 1800, h: 2699 },
  'cranberry-cut': { alt: 'Fresh cranberries, one cut open to show its chambers', w: 1800, h: 1200 },
  'cranberry-bog': { alt: 'Harvesters wading through a flooded cranberry bog', w: 1800, h: 1350 },
  'cranberry-plant': { alt: 'Low cranberry shrubs with red berries', w: 1800, h: 1200 },
  'lab-pipette': { alt: 'A scientist pipetting samples in a laboratory', w: 1800, h: 1129 },
  'lab-microscope': { alt: 'A researcher at a microscope, silhouetted in violet light', w: 1800, h: 2700 },
  'lab-scientist': { alt: 'A scientist examining a sample under a microscope', w: 1800, h: 1202 },
  'lab-wells': { alt: 'A pipette dispensing a pink solution into sample wells', w: 1800, h: 1200 },
  'capsule-macro': { alt: 'Macro view of a botanical capsule', w: 1800, h: 2400 },
  'capsules-sprig': { alt: 'Capsules beside a sprig of greenery', w: 1800, h: 1200 },
  cleanroom: { alt: 'Technicians working in a clean manufacturing room', w: 1800, h: 1192 },
  'capsule-line': { alt: 'Automated capsule filling line', w: 1800, h: 1200 },
  'leaf-shadow': { alt: 'Shadow of a fern leaf on a pale wall', w: 1800, h: 2400 },
  'leaf-shadow-2': { alt: 'Shadows of leaves on a textured wall', w: 1800, h: 1200 },
  'leaf-dark': { alt: 'Dark green leaves in low light', w: 1800, h: 1200 },
  'leaf-drops': { alt: 'Water droplets on a dark leaf', w: 1800, h: 2700 },
  france: { alt: 'Haussmann-style architecture in the Paris region, France', w: 1800, h: 2348 },
  atlanta: { alt: 'The Atlanta skyline at dusk', w: 1800, h: 1200 },
  india: { alt: 'A city skyline across the water at sunset, India', w: 1800, h: 1350 },
  pharmacist: { alt: 'A pharmacist reaching for a product on pharmacy shelves', w: 1800, h: 1200 },
  team: { alt: 'Colleagues collaborating around a laptop', w: 1800, h: 1013 },
  'team-2': { alt: 'A team working together in a bright office', w: 1800, h: 1200 },
  'hands-softgel': { alt: 'Open hands holding two softgel capsules', w: 1800, h: 2689 },
} satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;

export const src = (key: string, size: 800 | 1600 = 1600) => `/images/${key}-${size}.webp`;
export const srcSet = (key: string) => `/images/${key}-800.webp 800w, /images/${key}-1600.webp 1600w`;
