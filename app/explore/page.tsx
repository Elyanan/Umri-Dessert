import Image from 'next/image';
import type { Metadata } from 'next';
import { PageHero } from '../../components/PageHero';
import { VerifiedMenu } from '../../components/VerifiedMenu';
import { business, creative, gallery, menuEntries, photography } from '../../lib/content';
import { Sparkle } from '../../components/icons';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore an illustrative dessert collection and contact Umri Dessert for current offerings in Betel.',
};

const studies = [
  { photo: gallery[0], title: 'A taste for the dark', copy: 'Deep cocoa tones, glossy ganache and delicate chocolate curls.' },
  { photo: photography.berryDetail, title: 'The lighter side', copy: 'Ripe berries, soft cream and the delicate crunch of pastry.' },
  { photo: photography.caramel, title: 'A softer finish', copy: 'Golden caramel, a little warmth and a spoonful of something sweet.' },
];

export default function ExplorePage() {
  return (
    <main id="main" className="interior-page explore-page" tabIndex={-1}>
      <PageHero eyebrow="Explore" title={<>Find your <em>sweet side.</em></>} copy="An editorial collection of textures and flavors, from dark chocolate to strawberry and cream." photo={photography.berryDetail}>
        <a className="text-link" href="#dessert-studies">Browse the collection</a>
      </PageHero>
      <VerifiedMenu entries={menuEntries} />
      <section className="content-shell studies" id="dessert-studies" aria-labelledby="studies-heading">
        <div className="interior-section-heading" data-reveal>
          <p className="eyebrow"><Sparkle />Dessert studies</p>
          <h2 id="studies-heading">Something to <em>crave.</em></h2>
          <p className="image-note">{creative.imageDisclosure}. Call Umri for current offerings.</p>
        </div>
        <div className="studies-grid">
          {studies.map(({ photo, title, copy }) => (
            <article key={photo.src} data-provenance={photo.provenance} data-reveal>
              <div className="study-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 650px) 89vw, 33vw" /></div>
              <h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="interior-callout">
        <div className="content-shell" data-reveal>
          <h2>What’s sweet <em>today?</em></h2>
          <p>Call Umri Dessert to ask what’s currently available.</p>
          <a className="filled-button" href={business.phone.href}>Call {business.phone.display}</a>
        </div>
      </section>
    </main>
  );
}
