import Image from 'next/image';
import Link from 'next/link';
import { creative, gallery, photography, siteLinks } from '../../lib/content';
import { VisitDetails } from '../VisitDetails';
import { Pin, Sparkle } from '../icons';

const journey = [
  { first: 'The', second: 'indulgence.', copy: 'A moment for dark chocolate and the curl of shaved cocoa.', photo: photography.cocoa, tone: '#2d1713' },
  { first: 'The little', second: 'moments.', copy: 'Soft cream, bright berries and the pleasure of taking your time.', photo: photography.berryDetail, tone: '#f5c2c8' },
  { first: 'The sweet', second: 'escape.', copy: 'Golden caramel and warm light. Stay a little longer.', photo: photography.caramel, tone: '#edb88e' },
] as const;

const lookbook = [
  { title: 'Dark &', accent: 'delicate.', copy: 'A study in cocoa, shadow and texture.', photo: photography.cocoa },
  { title: 'Soft &', accent: 'bright.', copy: 'Layers of cream and the blush of ripe fruit.', photo: gallery[1] },
  { title: 'Slow &', accent: 'golden.', copy: 'Something sweet in the afternoon light.', photo: photography.caramel },
] as const;

export function HomeCollection() {
  return (
    <section className="home-collection content-shell" id="showcase" aria-labelledby="collection-title">
      <div className="collection-heading" data-reveal>
        <p className="eyebrow"><Sparkle />The dessert collection</p>
        <h2 id="collection-title">A closer <em>look.</em></h2>
        <Link className="text-link" href={siteLinks.explore}>Explore the collection</Link>
      </div>
      <div className="collection-layout">
        {[photography.caramel, photography.experience].map((photo, index) => (
          <figure key={photo.src} data-collection-shot={index ? 'right' : 'left'} data-provenance={photo.provenance}>
            <div className="collection-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 88vw, 58vw" /></div>
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="image-note">{creative.imageDisclosure}</p>
    </section>
  );
}

export function SweetJourney() {
  return (
    <section className="sweet-journey" id="experience" data-journey aria-labelledby="journey-title">
      <h2 id="journey-title" className="visually-hidden">The Sweet Journey</h2>
      <div className="journey-stage">
        {journey.map(({ first, second, copy, photo, tone }, index) => (
          <article className={`journey-panel journey-panel--${index + 1}`} key={photo.src} data-tone={tone}>
            <div className="journey-type">
              {index === 0 && <p className="eyebrow"><Sparkle />The sweet journey</p>}
              <h3>{first}<br /><em>{second}</em></h3>
              <p>{copy}</p>
            </div>
            <figure className="journey-art" data-provenance={photo.provenance}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 90vw, 61vw" />
            </figure>
          </article>
        ))}
        <div className="journey-accent" aria-hidden="true"><Image src="/images/ingredients/strawberry.webp" alt="" fill sizes="9vw" /></div>
        <p className="journey-note image-note">{creative.imageDisclosure}</p>
      </div>
    </section>
  );
}

export function Lookbook() {
  return (
    <section className="lookbook" data-lookbook aria-labelledby="lookbook-title">
      <div className="lookbook-intro content-shell" data-reveal>
        <p className="eyebrow"><Sparkle />Dessert lookbook</p>
        <h2 id="lookbook-title">A few favorite <em>textures.</em></h2>
        <Link href={siteLinks.gallery} className="text-link">View the photo gallery</Link>
      </div>
      <div className="lookbook-pin">
        <div className="lookbook-stage">
          <div className="lookbook-track">
            {lookbook.map(({ title, accent, copy, photo }, index) => (
              <article className={`lookbook-panel lookbook-panel--${index + 1}`} key={photo.src}>
                <figure data-provenance={photo.provenance}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 84vw, 50vw" /></figure>
                <div className="lookbook-type"><h3>{title}<br /><em>{accent}</em></h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
          <p className="lookbook-note image-note">{creative.imageDisclosure}</p>
          <div className="lookbook-progress" aria-hidden="true"><i /></div>
        </div>
      </div>
    </section>
  );
}

export function VisualExperience() {
  return (
    <section className="visual-experience" data-visual aria-labelledby="visual-title">
      <div className="visual-image" data-provenance={photography.table.provenance}>
        <Image src={photography.table.src} alt={photography.table.alt} fill sizes="100vw" />
      </div>
      <div className="visual-type">
        <p className="eyebrow"><Sparkle />The sweet experience</p>
        <h2 id="visual-title">Take a<br /><em>sweet break.</em></h2>
      </div>
      <p className="photo-credit">{creative.imageDisclosure}</p>
    </section>
  );
}

export function HomeVisit() {
  return (
    <section className="visit-section" id="visit">
      <div className="visit-inner content-shell" data-reveal>
        <div>
          <p className="eyebrow"><Pin />Visit Umri</p>
          <h2>See you<br /> in <em>Betel.</em></h2>
          <Link className="text-link" href={siteLinks.visit}>Visit details</Link>
        </div>
        <VisitDetails compact />
      </div>
    </section>
  );
}
