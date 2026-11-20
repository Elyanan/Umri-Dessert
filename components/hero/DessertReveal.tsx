import Image from 'next/image';
import { gallery } from '../../lib/content';
import { Sparkle } from '../icons';

export function DessertReveal({ staticVersion = false }: { staticVersion?: boolean }) {
  const [chocolate, strawberry, coffee] = gallery;
  return (
    <section className={`dessert-reveal${staticVersion ? ' dessert-reveal--static' : ''}`} data-motion={staticVersion ? undefined : 'reveal'} aria-hidden={staticVersion ? undefined : true}>
      <div className="reveal-heading" data-motion={staticVersion ? undefined : 'reveal-heading'}>
        <Sparkle />
        <p aria-hidden="true">Your next sweet<br /><em>moment starts here.</em></p>
      </div>
      <div className="reveal-gallery" data-provenance="illustrative">
        <div className="reveal-card reveal-card--left" data-motion={staticVersion ? undefined : 'reveal-left'}>
          <Image src={chocolate.src} alt={staticVersion ? chocolate.alt : ''} fill sizes="(max-width: 820px) 26vw, 24vw" />
        </div>
        <div className="reveal-card reveal-card--center" data-motion={staticVersion ? undefined : 'reveal-center'}>
          {staticVersion && <Image src={strawberry.src} alt={strawberry.alt} fill sizes="(max-width: 820px) 38vw, 31vw" />}
        </div>
        <div className="reveal-card reveal-card--right" data-motion={staticVersion ? undefined : 'reveal-right'}>
          <Image src={coffee.src} alt={staticVersion ? coffee.alt : ''} fill sizes="(max-width: 820px) 26vw, 24vw" />
        </div>
      </div>
    </section>
  );
}
