export const motion = {
  landscape: '(min-width: 901px)',
  heroMobile: '(max-width: 820px)',
  heroDesktop: '(min-width: 821px)',
  reduced: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
  settle: 'power2.out',
  camera: 'sine.inOut',
  journeyTravel: 1.8,
  lookbookTravel: 0.8,
  lightboxDuration: 370,
} as const;

export function deviceCanAnimate() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const cores = navigator.hardwareConcurrency;
  return !connection?.saveData && !(cores > 0 && cores <= 2);
}
