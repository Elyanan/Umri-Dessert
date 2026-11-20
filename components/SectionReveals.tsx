'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SectionReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });
    const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.classList.add('will-reveal');
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('will-reveal', 'in-view'));
    };
  }, [pathname]);
  return null;
}
