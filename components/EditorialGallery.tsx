'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { creative, type DessertImage } from '../lib/content';
import { deviceCanAnimate, motion } from '../lib/motion';
import { Chevron } from './icons';

export function EditorialGallery({ photos }: { photos: DessertImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const pictureLayer = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const movement = useRef<Animation | null>(null);
  const closing = useRef(false);
  const gesture = useRef<{ x: number; y: number } | null>(null);

  function canAnimate() {
    return deviceCanAnimate() && !window.matchMedia(motion.reduced).matches;
  }

  function thumbnailTransform() {
    const from = opener.current?.getBoundingClientRect();
    const to = visual.current?.getBoundingClientRect();
    if (!from || !to || from.bottom < 0 || from.top > innerHeight || !to.width || !to.height) return;
    const x = from.left + from.width / 2 - (to.left + to.width / 2);
    const y = from.top + from.height / 2 - (to.top + to.height / 2);
    const scale = Math.min(from.width / to.width, from.height / to.height);
    return 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')';
  }

  useLayoutEffect(() => {
    const panel = dialog.current;
    const picture = pictureLayer.current;
    if (selected === null || !panel || !picture) return;
    const opening = !panel.open;
    if (opening) {
      panel.showModal();
      closeButton.current?.focus({ preventScroll: true });
    }
    if (!canAnimate()) return;
    movement.current?.cancel();
    const from = opening ? thumbnailTransform() : undefined;
    movement.current = picture.animate([
      { transform: from ?? 'translateX(12px) scale(.985)', opacity: from ? 0.78 : 0.55 },
      { transform: 'none', opacity: 1 },
    ], { duration: from ? motion.lightboxDuration : 230, easing: 'cubic-bezier(.2,.74,.22,1)' });
    return () => movement.current?.cancel();
  }, [selected]);

  function open(index: number, button: HTMLButtonElement) {
    if (closing.current) return;
    opener.current = button;
    setSelected(index);
  }

  function change(delta: number) {
    if (closing.current) return;
    setSelected((current) => current === null ? current : (current + delta + photos.length) % photos.length);
  }

  function close() {
    if (closing.current) return;
    closing.current = true;
    const finish = () => {
      dialog.current?.close();
      setSelected(null);
      closing.current = false;
      opener.current?.focus({ preventScroll: true });
    };
    const to = canAnimate() ? thumbnailTransform() : undefined;
    const picture = pictureLayer.current;
    if (!to || !picture) {
      finish();
      return;
    }
    const { transform, opacity } = getComputedStyle(picture);
    const origin = { transform, opacity: Number(opacity) };
    movement.current?.cancel();
    const effect = picture.animate([
      origin,
      { transform: to, opacity: 0.62 },
    ], { duration: motion.lightboxDuration * 0.82, easing: 'cubic-bezier(.38,0,.2,1)', fill: 'forwards' });
    movement.current = effect;
    void effect.finished.then(finish, () => {});
  }

  function onKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    change(event.key === 'ArrowLeft' ? -1 : 1);
  }

  function onSwipeEnd(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) < 42 || Math.abs(distance) < Math.abs(event.clientY - start.y) * 1.3) return;
    change(distance < 0 ? 1 : -1);
  }

  const photo = selected === null ? null : photos[selected];

  return (
    <>
      <div className="editorial-grid editorial-grid--full">
        {photos.map((entry, index) => (
          <figure key={entry.src} data-provenance={entry.provenance}>
            <button type="button" className="editorial-image" onClick={(event) => open(index, event.currentTarget)} aria-label={'Open photo: ' + entry.label} aria-haspopup="dialog">
              <Image src={entry.src} alt="" fill
                sizes={`(max-width: 650px) ${index >= 4 ? '90vw' : '46vw'}, ${index === 3 || index === 5 ? '58vw' : '35vw'}`}
                loading={index === 0 ? 'eager' : undefined} fetchPriority={index === 0 ? 'high' : undefined} />
              <span className="gallery-button-mark" aria-hidden="true">+</span>
            </button>
            <figcaption>{entry.label}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Dessert photography viewer"
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onCancel={(event) => { event.preventDefault(); close(); }}
        onKeyDown={onKey}
      >
        {photo && (
          <div className="lightbox-layout">
            <div className="lightbox-top">
              <span>{creative.imageDisclosure}</span>
              <button type="button" ref={closeButton} className="lightbox-close" onClick={close}>Close <span aria-hidden="true">×</span></button>
            </div>
            <div
              className="lightbox-visual"
              ref={visual}
              onPointerDown={(event) => {
                if (event.pointerType === 'mouse') return;
                gesture.current = { x: event.clientX, y: event.clientY };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerUp={onSwipeEnd}
              onPointerCancel={() => { gesture.current = null; }}
            >
              <div className="lightbox-image-layer" ref={pictureLayer}>
                <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 820px) 92vw, 78vw" loading="eager" draggable={false} />
              </div>
            </div>
            <div className="lightbox-controls">
              <button type="button" onClick={() => change(-1)} aria-label="Previous image"><Chevron /> <span>Previous</span></button>
              <p aria-live="polite"><strong>{photo.label}</strong><span>{(selected ?? 0) + 1} / {photos.length}</span></p>
              <button type="button" onClick={() => change(1)} aria-label="Next image"><span>Next</span> <Chevron /></button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

