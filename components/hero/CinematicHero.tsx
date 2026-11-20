import { DessertReveal } from './DessertReveal';
import { DessertScene } from './DessertScene';
import { ScrollSequence } from './ScrollSequence';

export function CinematicHero() {
  return (
    <ScrollSequence fallback={<DessertReveal staticVersion />}>
      <DessertScene />
      <DessertReveal />
    </ScrollSequence>
  );
}
