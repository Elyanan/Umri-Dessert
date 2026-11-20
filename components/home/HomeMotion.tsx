'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { deviceCanAnimate, motion } from '../../lib/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root || !deviceCanAnimate()) return;
    const media = gsap.matchMedia();

    media.add({ wide: motion.landscape, reduced: motion.reduced }, (context) => {
      if (!context.conditions?.wide || context.conditions.reduced) return;
      const collection = root.querySelectorAll<HTMLElement>('[data-collection-shot]');
      const visual = root.querySelector<HTMLElement>('[data-visual]');

      collection.forEach((item) => {
        const image = item.querySelector('.collection-image');
        const picture = item.querySelector('img');
        const left = item.dataset.collectionShot === 'left';
        const film = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: item, start: 'top 96%', end: 'top 49%', scrub: true, invalidateOnRefresh: true },
        });
        film.fromTo(image, { clipPath: `inset(${left ? '12% 14% 25% 0' : '15% 0 26% 15%'})` }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
          .fromTo(picture, { scale: 1.16, xPercent: left ? -3 : 3, yPercent: 5 }, { scale: 1, xPercent: 0, yPercent: 0 }, 0);
      });

      if (visual) {
        const film = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom 20%', scrub: true },
        });
        film.fromTo(visual.querySelector('.visual-image'), { yPercent: -5, scale: 1.14 }, { yPercent: 2, scale: 1.06, duration: 1 }, 0)
          .fromTo(visual.querySelector('.visual-type'), { clipPath: 'inset(0 100% 0 0)', x: -34 }, { clipPath: 'inset(-12% -5% -13% -5%)', x: 0, duration: 0.37 }, 0.105);
      }

      const journey = root.querySelector<HTMLElement>('[data-journey]');
      const journeyFrame = journey?.querySelector<HTMLElement>('.journey-stage');
      const lookbook = root.querySelector<HTMLElement>('[data-lookbook]');
      const lookbookPin = lookbook?.querySelector<HTMLElement>('.lookbook-pin');
      const lookbookFrame = lookbook?.querySelector<HTMLElement>('.lookbook-stage');
      const track = lookbook?.querySelector<HTMLElement>('.lookbook-track');
      if (!journey || !journeyFrame || !lookbook || !lookbookPin || !lookbookFrame || !track) return;

      journey.dataset.motionReady = 'true';
      lookbook.dataset.motionReady = 'true';

      const panels = [...journey.querySelectorAll<HTMLElement>('.journey-panel')];
      const frames = panels.map((panel) => panel.querySelector('.journey-art'));
      const pictures = panels.map((panel) => panel.querySelector('img'));
      const type = panels.map((panel) => panel.querySelector('.journey-type'));

      gsap.set(frames.slice(1), { clipPath: 'polygon(106% 0%, 106% 0%, 100% 100%, 100% 100%)' });
      gsap.set(type.slice(1), { clipPath: 'inset(0 100% 0 0)', x: -27 });

      const journeyFilm = gsap.timeline({ defaults: { ease: motion.camera } });
      journeyFilm.fromTo(pictures[0], { scale: 1.15, xPercent: 0 }, { scale: 1.3, xPercent: 7, duration: 0.46 }, 0);
      for (const [index, startAt] of [0.22, 0.57].entries()) {
        const next = index + 1;
        journeyFilm
          .to(type[index], { clipPath: 'inset(0 0 0 100%)', x: -24, duration: 0.13 }, startAt)
          .to(frames[next], { clipPath: 'polygon(-7% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.26 }, startAt)
          .to(journeyFrame, { backgroundColor: panels[next].dataset.tone, duration: 0.22 }, startAt + 0.035)
          .to(type[next], { clipPath: 'inset(-8% -7% -10% -7%)', x: 0, duration: 0.22, ease: motion.settle }, startAt + 0.09)
          .fromTo(pictures[next], { scale: 1.22, xPercent: 6 }, { scale: 1.02, xPercent: 0, duration: 0.39, immediateRender: false }, startAt + 0.04);
      }
      const accent = journey.querySelector('.journey-accent');
      journeyFilm.fromTo(accent, { x: 0, y: 0, rotate: -18 }, { x: 36, y: -42, rotate: 8, duration: 1 }, 0)
        .to(accent, { opacity: 0, duration: 0.18 }, 0.57);

      const lookFilm = gsap.timeline({ defaults: { ease: 'none' } });
      lookFilm.to(track, { x: () => -(track.scrollWidth - lookbookFrame.clientWidth), duration: 1 }, 0);
      lookFilm.fromTo(lookbook.querySelector('.lookbook-progress i'), { scaleX: 0.04 }, { scaleX: 1, duration: 1 }, 0);

      const restoreFrames = new Set<number>();

      function pinScene(section: HTMLElement, frame: HTMLElement, film: gsap.core.Timeline, travel: () => number, priority: number) {
        let viewport = `${window.innerWidth}:${window.innerHeight}`;
        let progress: number | null = null;
        ScrollTrigger.create({
          trigger: section,
          animation: film,
          pin: frame,
          start: 'top top',
          end: () => `+=${Math.round(travel())}`,
          scrub: true,
          refreshPriority: priority,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: (self) => {
            const next = `${window.innerWidth}:${window.innerHeight}`;
            if (next !== viewport && self.isActive) progress = self.progress;
            viewport = next;
          },
          onRefresh: (self) => {
            const position = progress;
            progress = null;
            if (position === null) return;
            const request = window.requestAnimationFrame(() => {
              restoreFrames.delete(request);
              self.scroll(self.start + (self.end - self.start) * position);
              ScrollTrigger.update();
            });
            restoreFrames.add(request);
          },
        });
      }

      pinScene(journey, journeyFrame, journeyFilm, () => journeyFrame.clientHeight * motion.journeyTravel, 3);
      pinScene(lookbookPin, lookbookFrame, lookFilm, () => (track.scrollWidth - lookbookFrame.clientWidth) * motion.lookbookTravel, 2);
      ScrollTrigger.sort();

      return () => {
        restoreFrames.forEach((frame) => window.cancelAnimationFrame(frame));
        delete journey.dataset.motionReady;
        delete lookbook.dataset.motionReady;
      };
    }, root);

    return () => media.revert();
  }, { scope });

  return <div ref={scope}>{children}</div>;
}
