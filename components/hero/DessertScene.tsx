import Image from 'next/image';
import { FloatingIngredient } from './FloatingIngredient';
import { SceneTypography } from './SceneTypography';
import { Sparkle } from '../icons';

export function DessertScene() {
  return (
    <>
      <div className="scene-light" data-motion="light" aria-hidden="true" />
      <div className="scene-bloom" data-motion="bloom" aria-hidden="true" />
      <div className="scene-orbit" data-motion="orbit" aria-hidden="true" />
      <SceneTypography />
      <div className="cake-shadow" data-motion="shadow" aria-hidden="true" />
      <div className="camera" data-motion="camera" data-provenance="illustrative" aria-hidden="true">
        <div className="cake-layer cake-layer--chocolate" data-motion="chocolate">
          <Image src="/images/hero/chocolate.webp" alt="" fill sizes="(max-width: 820px) 105vw, 69vw" loading="eager" fetchPriority="high" />
        </div>
        <div className="cake-layer cake-layer--strawberry" data-motion="strawberry">
          <Image src="/images/hero/strawberry.webp" alt="" fill sizes="(max-width: 820px) 105vw, 69vw" loading="eager" fetchPriority="low" />
        </div>
      </div>
      <FloatingIngredient kind="berry" />
      <FloatingIngredient kind="fragment" />
      <Sparkle className="hero-spark hero-spark--one" data-motion="spark-one" />
      <Sparkle className="hero-spark hero-spark--two" data-motion="spark-two" />

      <div className="macro-frame" data-motion="macro-frame" data-provenance="illustrative" aria-hidden="true">
        <div className="macro-image" data-motion="macro-image">
          <Image src="/images/hero/macro.webp" alt="" fill sizes="100vw" loading="eager" fetchPriority="low" />
        </div>
      </div>

      <div className="chocolate-ribbon" data-motion="ribbon" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chocolate-ribbon-fill" x1="0" x2=".19" y1="0" y2="1" gradientUnits="objectBoundingBox">
              <stop stopColor="#230e0d" /><stop offset=".24" stopColor="#6d3025" />
              <stop offset=".43" stopColor="#3c1a14" /><stop offset=".8" stopColor="#29130e" />
              <stop offset="1" stopColor="#a04b37" />
            </linearGradient>
            <linearGradient id="ribbon-glint" x1="0%" y1="60%" x2="100%" y2="30%">
              <stop stopColor="#e19565" stopOpacity="0" /><stop offset=".46" stopColor="#f9ba91" stopOpacity=".6" /><stop offset="1" stopColor="#fee1bd" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="ribbon-fill" fill="url(#chocolate-ribbon-fill)" d="M-12 154C225 5 370 220 670 172c307-49 482-170 782-142v705c-284-27-494 130-781 116C370 837 224 687-12 831Z" />
          <path fill="none" stroke="url(#ribbon-glint)" strokeWidth="4" d="M-15 161C225 12 375 225 671 178 974 130 1149 10 1455 35" />
          <path fill="none" stroke="url(#ribbon-glint)" strokeWidth="13" opacity=".23" d="M-15 184C223 41 372 248 673 199 978 149 1150 32 1455 59" />
          <path fill="none" stroke="url(#ribbon-glint)" strokeWidth="7" d="M-13 820c245-146 384 9 684 21 296 12 487-142 784-116" />
          <path fill="none" stroke="url(#ribbon-glint)" strokeWidth="18" opacity=".14" d="M-15 252c278-156 370 78 684 11 295-63 447-175 786-132" />
          <path fill="none" stroke="url(#ribbon-glint)" strokeWidth="3" opacity=".55" d="M-15 281c266-131 383 62 683-1 310-65 438-180 788-129" />
        </svg>
      </div>
    </>
  );
}
