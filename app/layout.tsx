import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/wght-italic.css';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import './globals.css';
import './directors-cut.css';

export const metadata: Metadata = {
  title: { default: 'Umri Dessert | Betel, Addis Ababa', template: '%s | Umri Dessert' },
  description: 'Enter the sweet side. Explore a cinematic dessert gallery and find Umri Dessert in Betel, Addis Ababa.',
  applicationName: 'Umri Dessert',
  openGraph: {
    type: 'website',
    siteName: 'Umri Dessert',
    title: 'Umri Dessert | Betel, Addis Ababa',
    description: 'Enter the sweet side in Betel, Addis Ababa.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="top">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
