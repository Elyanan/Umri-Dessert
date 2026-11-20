'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PointerEvent } from 'react';
import { siteLinks, siteNavigation } from '../lib/content';
import { motion } from '../lib/motion';
import { MobileNavigation } from './MobileNavigation';
import { Pin } from './icons';

export function SiteHeader() {
  const pathname = usePathname();

  function followPointer(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== 'mouse' || !window.matchMedia(motion.finePointer).matches || window.matchMedia(motion.reduced).matches) return;
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    button.style.setProperty('--drag-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.16}px`);
    button.style.setProperty('--drag-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.19}px`);
  }

  return (
    <header className="site-header">
      <a href={siteLinks.home} className="brand" aria-label="Umri Dessert home">
        <span>UMRI<span className="brand-dot">.</span></span><small>DESSERT</small>
      </a>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {siteNavigation.slice(0, -1).map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
        ))}
      </nav>
      <Link className="visit-link" href={siteLinks.visit} aria-current={pathname === siteLinks.visit ? 'page' : undefined} onPointerMove={followPointer} onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty('--drag-x');
        event.currentTarget.style.removeProperty('--drag-y');
      }}><span className="visit-link-content"><Pin />Visit Us</span></Link>
      <MobileNavigation key={pathname} pathname={pathname} />
    </header>
  );
}
