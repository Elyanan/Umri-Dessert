import Image from 'next/image';
import type { ReactNode } from 'react';
import { creative, type DessertImage } from '../lib/content';
import { Sparkle } from './icons';

export function PageHero({ eyebrow, title, copy, photo, children }: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  photo: DessertImage;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow"><Sparkle />{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-description">{copy}</p>
        {children}
      </div>
      <figure className="page-hero-art" data-provenance={photo.provenance}>
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 820px) 100vw, 55vw" preload />
        <figcaption className="photo-credit">{creative.imageDisclosure}</figcaption>
      </figure>
    </section>
  );
}
