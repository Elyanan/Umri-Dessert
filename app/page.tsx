import { CinematicHero } from '../components/hero/CinematicHero';
import { HomeMotion } from '../components/home/HomeMotion';
import { HomeCollection, HomeVisit, Lookbook, SweetJourney, VisualExperience } from '../components/home/HomeSections';

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <CinematicHero />
      <HomeMotion>
        <HomeCollection />
        <SweetJourney />
        <Lookbook />
        <VisualExperience />
        <HomeVisit />
      </HomeMotion>
    </main>
  );
}
