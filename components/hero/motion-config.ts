export const chapters = [
  { id: 'entrance', startsAt: 0, label: 'The grand entrance' },
  { id: 'craving', startsAt: 0.2, label: 'Follow the craving' },
  { id: 'flavor', startsAt: 0.4, label: 'One more bite' },
  { id: 'macro', startsAt: 0.65, label: 'Sweet moments' },
  { id: 'reveal', startsAt: 0.85, label: 'The grand reveal' },
] as const;

// Switch the header ink as the new backdrop becomes visible through the masks.
export const headerCues = [
  { startsAt: 0, theme: 'dark' },
  { startsAt: 0.521, theme: 'pink' },
  { startsAt: 0.687, theme: 'dark' },
  { startsAt: 0.9, theme: 'light' },
] as const;

export const desktopMotion = { travel: 4, pushScale: 1.48, pushX: 0.16, berryScale: 1.12, galleryScale: 0.47 };
export const mobileMotion = { travel: 2.55, pushScale: 1.31, pushX: 0.075, berryScale: 1.07, galleryScale: 0.42 };
