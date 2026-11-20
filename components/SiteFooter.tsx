import Link from 'next/link';
import { business, siteLinks, siteNavigation } from '../lib/content';
import { SectionReveals } from './SectionReveals';
import { Sparkle } from './icons';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <p>{business.neighborhood}, {business.city}<br />{business.country}</p>
        <nav aria-label="Footer navigation">
          {siteNavigation.map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <p><a href={business.phone.href}>{business.phone.display}</a></p>
      </div>
      <div data-reveal><a href={siteLinks.home} className="footer-mark" aria-label="Umri Dessert home">UMRI<Sparkle /></a></div>
      <div className="footer-end"><span>Umri Dessert</span><a href="#top">Back to top</a></div>
      <SectionReveals />
    </footer>
  );
}
