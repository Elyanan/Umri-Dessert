'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { siteNavigation } from '../lib/content';

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    navigation.current?.querySelector('a')?.focus();
    function onEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    }
    const desktop = window.matchMedia('(min-width: 821px)');
    const onResize = () => setOpen(false);
    document.addEventListener('keydown', onEscape);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onEscape);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Menu'} <span aria-hidden="true" />
      </button>
      <nav ref={navigation} id="mobile-links" className="mobile-links" aria-label="Mobile navigation" hidden={!open}>
        {siteNavigation.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
    </div>
  );
}
