import { business, creative } from '../../lib/content';
import { Sparkle } from '../icons';

export function SceneTypography() {
  return (
    <>
      <div className="scene-location" data-motion="location"><span />{business.neighborhood}, {business.city}<span /></div>
      <div className="hero-wordmark" data-motion="wordmark" aria-hidden="true">UMRI</div>
      <h1 className="visually-hidden">{creative.slogan}</h1>
      <div className="scene-copy scene-copy--entrance" data-motion="intro" aria-hidden="true">
        <p className="entrance-title">Enter the<br /><em>sweet side.</em></p>
        <p>Something delicious is about to happen.</p>
      </div>
      <div className="scene-copy scene-copy--craving" data-motion="craving" aria-hidden="true">
        <p className="eyebrow"><Sparkle /> Dark chocolate</p>
        <p className="scene-headline">Follow the<br /><em>craving.</em></p>
      </div>
      <div className="scene-copy scene-copy--berry" data-motion="berry-copy" aria-hidden="true">
        <p className="eyebrow"><Sparkle /> Strawberry &amp; cream</p>
        <p className="scene-headline">One more<br /><em>bite.</em></p>
      </div>
      <div className="scene-copy scene-copy--macro" data-motion="macro-copy" aria-hidden="true">
        <p className="scene-headline">Made for<br /><em>sweet moments.</em></p>
      </div>
      <p className="hero-image-note">{creative.imageDisclosure}</p>
    </>
  );
}
