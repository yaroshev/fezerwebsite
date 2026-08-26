import React from 'react';
import { HERO_VIDEO } from '../seo/constants';

/**
 * The looping hero backdrop.
 *
 * Decorative only: muted, silent, aria-hidden, and never carrying information
 * that isn't also in the text on top of it. The poster frame renders first and
 * stays put for anyone who has asked their system for reduced motion, so the
 * section always has the same composition whether or not the video plays.
 *
 * A soft blur and a scrim sit between the footage and the copy. The source is a
 * pale studio render with two phones tumbling through frame, and without them
 * the headline loses contrast every time a phone passes behind it.
 */
export default function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReducedMotion(query.matches);
      const el = videoRef.current;
      if (!el) return;
      if (query.matches) {
        el.pause();
      } else {
        // Autoplay can still be refused (low power mode, data saver). The poster
        // stays visible underneath if it is, which is the correct fallback.
        void el.play().catch(() => undefined);
      }
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 blur-[4px] motion-reduce:hidden dark:opacity-55 dark:blur-[3px]"
        poster={HERO_VIDEO.poster}
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        disablePictureInPicture
      >
        {HERO_VIDEO.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} media={source.media} />
        ))}
      </video>

      {/* Poster stand-in for reduced motion, so the section never renders empty. */}
      <img
        src={HERO_VIDEO.poster}
        alt=""
        className="absolute inset-0 hidden h-full w-full scale-105 object-cover opacity-40 blur-[4px] motion-reduce:block dark:opacity-55 dark:blur-[3px]"
      />

      {/* Scrim: holds text contrast in both themes and fades the section into the page. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa]/88 via-[#fafafa]/82 to-[#fafafa] dark:from-neutral-950/90 dark:via-neutral-950/86 dark:to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(250,250,250,0.72)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(10,10,10,0.82)_100%)]" />
    </div>
  );
}
