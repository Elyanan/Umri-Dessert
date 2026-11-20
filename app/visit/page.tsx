import Image from 'next/image';
import type { Metadata } from 'next';
import { VisitDetails } from '../../components/VisitDetails';
import { Pin } from '../../components/icons';
import { creative, photography } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Visit',
  description: 'Find Umri Dessert in Betel, Addis Ababa. Get directions, call the shop, or check listed hours.',
};

export default function VisitPage() {
  return (
    <main id="main" className="interior-page visit-page" tabIndex={-1}>
      <section className="page-hero visit-page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow"><Pin />Visit Umri</p>
          <h1>See you <em>in Betel.</em></h1>
          <VisitDetails />
        </div>
        <figure className="page-hero-art" data-provenance={photography.table.provenance}>
          <Image src={photography.table.src} alt={photography.table.alt} fill sizes="(max-width: 820px) 100vw, 53vw" preload />
          <figcaption className="photo-credit">{creative.imageDisclosure}</figcaption>
        </figure>
      </section>
    </main>
  );
}
