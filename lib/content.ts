export const business = {
  name: 'Umri Dessert',
  neighborhood: 'Betel',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  phone: { display: '+251 99 223 2063', href: 'tel:+251992232063', source: 'brief-supplied-listing' },
  hours: { display: 'Daily, 7 AM–9 PM', status: 'pending-owner-confirmation' },
  maps: 'https://www.google.com/maps/search/?api=1&query=umridessert%20Betel%20Addis%20Ababa',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Umri%20Dessert%2C%20Betel%2C%20Addis%20Ababa%2C%20Ethiopia',
} as const;

export const creative = {
  slogan: 'Enter the sweet side.',
  status: 'proposed',
  imageDisclosure: 'Illustrative dessert imagery',
} as const;

export type DessertImage = {
  src: string;
  alt: string;
  label: string;
  provenance: 'illustrative';
};

export const gallery: DessertImage[] = [
  {
    src: '/images/gallery/chocolate.webp',
    alt: 'Chocolate layer cake topped with curls of dark chocolate',
    label: 'Dark chocolate',
    provenance: 'illustrative',
  },
  {
    src: '/images/gallery/strawberry.webp',
    alt: 'Strawberry shortcake with layers of sponge and whipped cream',
    label: 'Strawberry & cream',
    provenance: 'illustrative',
  },
  {
    src: '/images/gallery/coffee.webp',
    alt: 'A cappuccino and pastry in warm window light',
    label: 'The coffee break',
    provenance: 'illustrative',
  },
];

export const photography = {
  cocoa: {
    src: '/images/gallery/cocoa.webp',
    alt: 'Chocolate mousse cake with ganache and curls on a dark plate',
    label: 'Cocoa layers',
    provenance: 'illustrative',
  },
  caramel: {
    src: '/images/gallery/caramel.webp',
    alt: 'Caramel custard with amber sauce on an ivory plate',
    label: 'Caramel light',
    provenance: 'illustrative',
  },
  table: {
    src: '/images/gallery/table.webp',
    alt: 'Dessert plates and espresso in late afternoon light',
    label: 'An afternoon table',
    provenance: 'illustrative',
  },
  berryDetail: {
    src: '/images/gallery/berry-detail.webp',
    alt: 'Flaky pastry filled with strawberries and vanilla cream',
    label: 'Pastry and cream',
    provenance: 'illustrative',
  },
  experience: {
    src: '/images/gallery/experience.webp',
    alt: 'A plated slice of strawberry cream cake',
    label: 'Strawberry layers',
    provenance: 'illustrative',
  },
} as const satisfies Record<string, DessertImage>;

export const galleryPhotos = [...gallery, photography.caramel, photography.table, photography.berryDetail];

export type MenuProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  priceBirr: number | null;
  images: { src: string; alt: string }[];
  availability: 'available' | 'seasonal' | 'unavailable' | 'unknown';
  verification: 'owner-verified' | 'pending';
};

export const menuEntries: readonly MenuProduct[] = [];

export const siteLinks = {
  home: '/#top',
  explore: '/explore',
  gallery: '/gallery',
  about: '/about',
  visit: '/visit',
} as const;

export const siteNavigation = [
  { href: siteLinks.explore, label: 'Explore' },
  { href: siteLinks.gallery, label: 'Gallery' },
  { href: siteLinks.about, label: 'About' },
  { href: siteLinks.visit, label: 'Visit' },
] as const;
