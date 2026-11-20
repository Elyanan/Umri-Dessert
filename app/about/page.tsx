import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHero } from '../../components/PageHero';
import { creative, photography, siteLinks } from '../../lib/content';
import { Sparkle } from '../../components/icons';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Umri Dessert, a dessert shop in Betel, Addis Ababa, Ethiopia.',
};

export default function AboutPage() {
  return (
    <main id="main" className="interior-page about-page" tabIndex={-1}>
      <PageHero eyebrow="About Umri Dessert" title={<>A little <em>sweetness.</em></>} copy="Umri Dessert is in Betel, Addis Ababa. Come by for a change of pace and a moment to share." photo={photography.table}>
        <Link className="text-link" href={siteLinks.visit}>Plan your visit</Link>
      </PageHero>
      <section className="about-note content-shell" data-reveal>
        <p className="eyebrow"><Sparkle />Betel, Addis Ababa</p>
        <h2>Good company.<br /><em>Something sweet.</em></h2>
        <p>Make an afternoon of it with a friend, or take a little time for yourself. Either is a good reason to stop in.</p>
      </section>
      <figure className="about-full-bleed" data-provenance={photography.experience.provenance}>
        <Image src={photography.experience.src} alt={photography.experience.alt} fill sizes="100vw" />
        <figcaption className="photo-credit">{creative.imageDisclosure}</figcaption>
      </figure>
      <section className="interior-callout"><div className="content-shell" data-reveal>
        <h2>See you <em>in Betel.</em></h2>
        <Link className="filled-button" href={siteLinks.visit}>Find Umri Dessert</Link>
      </div></section>
    </main>
  );
}
