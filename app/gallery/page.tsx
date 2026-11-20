import type { Metadata } from 'next';
import Link from 'next/link';
import { EditorialGallery } from '../../components/EditorialGallery';
import { Sparkle } from '../../components/icons';
import { creative, galleryPhotos, siteLinks } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'An editorial gallery of illustrative chocolate, strawberry, and coffee photography for Umri Dessert.',
};

export default function GalleryPage() {
  return (
    <main id="main" className="gallery-page content-shell interior-page" tabIndex={-1}>
      <div className="gallery-page-title">
        <div>
          <p className="eyebrow"><Sparkle /> The Gallery</p>
          <h1>The sweet <em>side.</em></h1>
        </div>
        <p className="image-note">{creative.imageDisclosure}</p>
      </div>
      <EditorialGallery photos={galleryPhotos} />
      <Link href={siteLinks.visit} className="filled-button">Visit Umri</Link>
    </main>
  );
}

