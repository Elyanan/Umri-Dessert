'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chevron } from '../icons';
import { deviceCanAnimate, motion } from '../../lib/motion';
import { chapters, desktopMotion, headerCues, mobileMotion } from './motion-config';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollSequence({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const chapterLabel = useRef<HTMLSpanElement>(null);
  const chapterNumber = useRef<HTMLSpanElement>(null);
  const progressLine = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Mobile browser chrome changes visual viewport height during native scrolling.
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  useGSAP(() => {
    const container = root.current;
    const frame = stage.current;
    if (!container || !frame) return;
    if (!deviceCanAnimate()) return;
    const view = gsap.matchMedia();

    let preservedProgress: number | null = null;
    let restoreFrame = 0;

    function restoreAfterResize(sequence: ScrollTrigger) {
      const progress = preservedProgress;
      if (progress === null) return;
      preservedProgress = null;
      window.cancelAnimationFrame(restoreFrame);
      restoreFrame = window.requestAnimationFrame(() => {
        if (sequence !== trigger.current) return;
        sequence.scroll(sequence.start + (sequence.end - sequence.start) * progress);
        ScrollTrigger.update();
      });
    }

    view.add({
      desktop: motion.heroDesktop,
      mobile: motion.heroMobile,
      reduced: motion.reduced,
    }, (context) => {
      if (context.conditions?.reduced) return;
      const mobile = Boolean(context.conditions?.mobile);
      const config = mobile ? mobileMotion : desktopMotion;
      const element = (name: string) => frame.querySelector<HTMLElement>(`[data-motion="${name}"]`)!;
      let stageSize = { width: container.clientWidth, height: frame.clientHeight };
      const width = () => stageSize.width;
      const height = () => stageSize.height;
      const camera = element('camera');
      const shadow = element('shadow');
      const wordmark = element('wordmark');
      const ribbon = element('ribbon');
      const berry = element('berry');
      const chocolate = element('chocolate');
      const strawberry = element('strawberry');
      const macroFrame = element('macro-frame');
      const reveal = element('reveal');
      const revealCenter = element('reveal-center');
      let previousChapter = -1;
      let lastProgress = 0;
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;

      // The pinned sequence replaces the in-flow gallery stills when motion is available.
      container.dataset.motionEnabled = 'true';
      gsap.set(ribbon, { yPercent: 104 });
      gsap.set(macroFrame, { clipPath: `ellipse(3% 3% at ${mobile ? 53 : 46}% 52%)` });
      gsap.set(element('craving'), { x: mobile ? -28 : -64, y: 18 });
      gsap.set(element('berry-copy'), { x: mobile ? 28 : 64, y: 18 });
      gsap.set(element('macro-copy'), { y: 32 });
      gsap.set(element('reveal-heading'), { y: 36 });
      gsap.set(element('reveal-left'), { xPercent: -32, yPercent: 23, rotation: -12 });
      gsap.set(element('reveal-right'), { xPercent: 33, yPercent: 30, rotation: 12 });
      gsap.set(revealCenter, { yPercent: 17, scale: 0.86 });

      function updateProgress(progress: number) {
        if (!frame) return;
        lastProgress = progress;
        const index = chapters.findLastIndex((chapter) => progress >= chapter.startsAt);
        const theme = headerCues.findLast((cue) => progress >= cue.startsAt)?.theme ?? 'dark';
        if (theme !== frame.dataset.headerTheme) frame.dataset.headerTheme = theme;
        if (progressLine.current) progressLine.current.style.transform = `scaleX(${Math.max(0.035, progress)})`;
        if (index === previousChapter) return;
        previousChapter = index;
        const chapter = chapters[index];
        frame.dataset.chapter = chapter.id;
        if (chapterLabel.current) chapterLabel.current.textContent = chapter.label;
        if (chapterNumber.current) chapterNumber.current.textContent = `0${index + 1}`;
      }

      // All scene changes share this normalized 0–1 timeline, including hard cuts under the ribbon.
      const film = gsap.timeline({ defaults: { ease: 'none' } });
      chapters.forEach(({ id, startsAt }) => film.addLabel(id, startsAt));

      film
        .fromTo(camera, { y: 0, scale: 1 }, { y: -10, scale: 1.035, duration: 0.2, ease: motion.camera, immediateRender: false }, 'entrance')
        .to(shadow, { scaleX: 0.93, opacity: 0.78, duration: 0.2 }, 'entrance')
        .to([element('intro'), element('location')], { y: -25, autoAlpha: 0, duration: 0.085 }, 0.145)
        .to(element('scroll-link'), { autoAlpha: 0, y: 12, duration: 0.065 }, 0.15)

        .to(camera, { x: () => width() * config.pushX, y: () => height() * (mobile ? 0.025 : 0.02), scale: config.pushScale, rotation: 3, rotationY: mobile ? 0 : -4, rotationX: mobile ? 0 : 2, duration: 0.22, ease: motion.camera }, 'craving')
        .to(wordmark, { x: () => -width() * 0.24, scale: 1.5, autoAlpha: 0, duration: 0.165 }, 'craving')
        .to(element('orbit'), { scale: 1.42, autoAlpha: 0, duration: 0.15 }, 'craving')
        .to(element('light'), { scale: 1.16, xPercent: mobile ? 0 : 4, duration: 0.22, ease: motion.camera }, 'craving')
        .to(shadow, { x: () => width() * config.pushX, y: () => height() * 0.09, scaleX: 1.6, scaleY: 1.5, duration: 0.21, ease: motion.camera }, 'craving')
        .to(berry, { x: () => width() * (mobile ? 0.21 : 0.47), y: () => height() * 0.12, rotation: 38, scale: 1.42, duration: 0.23 }, 0.16)
        .to(element('fragment'), { x: () => width() * 0.15, y: () => -height() * 0.18, rotation: 28, scale: 2.3, autoAlpha: 0, duration: 0.22 }, 0.17)
        .to([element('spark-one'), element('spark-two')], { autoAlpha: 0, scale: 0.7, duration: 0.12 }, 0.19)
        .to(element('craving'), { x: 0, y: 0, autoAlpha: 1, clipPath: 'inset(-8% -10% -12% -10%)', duration: 0.105, ease: 'power2.out' }, 0.215)

        // The ribbon crosses the center at 0.498 and covers both plates at the cut.
        .to(ribbon, { autoAlpha: 1, duration: 0.006 }, 0.391)
        .to(ribbon, { yPercent: -104, duration: 0.21, ease: 'sine.inOut' }, 0.393)
        .to(element('craving'), { y: -35, autoAlpha: 0, duration: 0.048 }, 0.405)
        .to(frame, { backgroundColor: '#f4a6b5', duration: 0.035 }, 0.483)
        .to(element('light'), { autoAlpha: 0, duration: 0.026 }, 0.487)
        .to(element('bloom'), { autoAlpha: 1, duration: 0.03 }, 0.486)
        .set([chocolate, berry], { autoAlpha: 0 }, 0.498)
        .set(strawberry, { autoAlpha: 1 }, 0.498)
        .set(camera, { x: () => -width() * (mobile ? 0.01 : 0.13), y: () => height() * 0.03, rotation: -6, rotationY: mobile ? 0 : 2, rotationX: 0, scale: config.berryScale * 1.18 }, 0.498)
        .set(shadow, { x: () => -width() * (mobile ? 0.01 : 0.13), y: () => height() * 0.015, scaleX: 1.21, autoAlpha: 0.46 }, 0.498)
        .to(camera, { x: () => -width() * (mobile ? 0.015 : 0.13), y: -8, rotation: -2, scale: config.berryScale, duration: 0.143, ease: 'sine.out' }, 0.502)
        .to(element('berry-copy'), { x: 0, y: 0, autoAlpha: 1, clipPath: 'inset(-8% -10% -12% -10%)', duration: 0.085, ease: 'power2.out' }, 0.535)
        .set(ribbon, { autoAlpha: 0 }, 0.605)

        .set(macroFrame, { autoAlpha: 1 }, 0.633)
        .to(macroFrame, { clipPath: `ellipse(105% 105% at ${mobile ? 53 : 46}% 52%)`, duration: 0.112, ease: 'power2.inOut' }, 0.633)
        .fromTo(element('macro-image'), { scale: 1.29, xPercent: 5 }, { scale: 1.04, xPercent: -1.5, duration: 0.22, ease: 'sine.out', immediateRender: false }, 0.635)
        .to(camera, { scale: 1.7, rotation: -5, duration: 0.1 }, 0.637)
        .to(element('berry-copy'), { autoAlpha: 0, y: -24, duration: 0.055 }, 0.655)
        .to(element('macro-copy'), { autoAlpha: 1, y: 0, duration: 0.087, ease: 'power2.out' }, 0.7)
        .to(element('macro-copy'), { autoAlpha: 0, y: -28, duration: 0.06 }, 0.827)
        .to(shadow, { autoAlpha: 0, duration: 0.04 }, 0.83)

        // Pull back through the same aperture. The strawberry plate lands in the middle gallery panel.
        .set(camera, { scale: 1.22, rotation: -5 }, 0.846)
        .to(frame, { backgroundColor: '#fff8ef', duration: 0.05 }, 'reveal')
        .to(element('bloom'), { autoAlpha: 0, duration: 0.022 }, 'reveal')
        .to(macroFrame, { clipPath: `ellipse(0% 0% at 50% ${mobile ? 68 : 65}%)`, duration: 0.113, ease: 'power1.out' }, 0.851)
        .to(reveal, { autoAlpha: 1, duration: 0.045 }, 0.858)
        .to(element('reveal-heading'), { y: 0, autoAlpha: 1, duration: 0.069, ease: motion.settle }, 0.923)
        .to(element('reveal-left'), { xPercent: 0, yPercent: 0, rotation: -5, autoAlpha: 1, duration: 0.112, ease: 'power2.out' }, 0.88)
        .to(element('reveal-right'), { xPercent: 0, yPercent: 0, rotation: 6, autoAlpha: 1, duration: 0.113, ease: 'power2.out' }, 0.887)
        .to(revealCenter, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.092, ease: 'power2.out' }, 0.886)
        .to(camera, { x: 0, y: () => height() * (mobile ? 0.16 : 0.135), scale: config.galleryScale, rotation: 0, rotationY: 0, duration: 0.126, ease: 'power2.inOut' }, 0.855)
        .to(element('hud'), { autoAlpha: 0, duration: 0.05 }, 0.885)
        .set(macroFrame, { autoAlpha: 0 }, 0.97);

      trigger.current = ScrollTrigger.create({
        animation: film,
        trigger: container,
        start: 'top top',
        end: () => {
          stageSize = { width: container.clientWidth, height: frame.clientHeight };
          return `+=${Math.round(height() * config.travel)}`;
        },
        pin: frame,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        refreshPriority: 4,
        onUpdate: (self) => updateProgress(self.progress),
        onRefreshInit: () => {
          if ((viewportWidth !== window.innerWidth || viewportHeight !== window.innerHeight) && lastProgress > 0 && lastProgress < 1) {
            preservedProgress = lastProgress;
          }
          viewportWidth = window.innerWidth;
          viewportHeight = window.innerHeight;
        },
        onRefresh: (self) => {
          updateProgress(self.progress);
          restoreAfterResize(self);
        },
      });

      return () => {
        window.cancelAnimationFrame(restoreFrame);
        if (viewportWidth !== window.innerWidth && lastProgress > 0 && lastProgress < 1) {
          preservedProgress = lastProgress;
        }
        trigger.current = null;
        delete container.dataset.motionEnabled;
        delete frame.dataset.chapter;
        delete frame.dataset.headerTheme;
        if (progressLine.current) progressLine.current.style.removeProperty('transform');
        if (chapterLabel.current) chapterLabel.current.textContent = chapters[0].label;
        if (chapterNumber.current) chapterNumber.current.textContent = '01';
      };
    }, container);

    // A direct hash may have scrolled to the static layout before the pin was installed.
    const initialHash = window.location.hash;
    const anchor = document.getElementById(initialHash.slice(1));
    const anchorFrame = window.requestAnimationFrame(() => {
      if (anchor && trigger.current && window.location.hash === initialHash) anchor.scrollIntoView({ block: 'start' });
    });

    return () => {
      window.cancelAnimationFrame(anchorFrame);
      view.revert();
    };
  }, { scope: root });

  function explore(event: MouseEvent<HTMLAnchorElement>) {
    const sequence = trigger.current;
    if (!sequence || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.scrollTo({ top: sequence.start + (sequence.end - sequence.start) * 0.22, behavior: 'smooth' });
  }

  return (
    <>
      <section className="cinematic-hero" ref={root} aria-label="The Sweet Transformation">
        <div className="hero-stage" ref={stage}>
          {children}
          <a className="hero-scroll" href="#showcase" onClick={explore} data-motion="scroll-link">
            <span className="scroll-icon"><Chevron /></span><span>Scroll to explore</span>
          </a>
          <div className="hero-hud" data-motion="hud" aria-hidden="true">
            <div><span ref={chapterNumber}>01</span><span className="chapter-total"> / 0{chapters.length}</span></div>
            <span ref={chapterLabel} className="chapter-label">{chapters[0].label}</span>
            <span className="chapter-progress"><span ref={progressLine} /></span>
          </div>
        </div>
      </section>
      {fallback}
    </>
  );
}
