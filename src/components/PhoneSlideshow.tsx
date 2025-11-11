import React from 'react';

// Auto-discover screenshots from public/Screenshots. Vite will HMR when files
// matching the glob are added/removed during dev, and include them at build.
const discoveredScreens: string[] = (() => {
  const modules = import.meta.glob(
    '/public/Screenshots/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
    { eager: true, as: 'url' }
  ) as Record<string, string>;
  const entries = Object.entries(modules);
  entries.sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' }));
  return entries.map(([, url]) => url);
})();

export default function PhoneSlideshow(): JSX.Element {
  const [index, setIndex] = React.useState<number>(0);
  const total = discoveredScreens.length;

  React.useEffect(() => {
    if (total === 0) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3200);
    return () => window.clearInterval(id);
  }, [total]);

  const images = total > 0 ? discoveredScreens : ['/fezer-logo.png'];

  return (
    <div
      className="relative w-[190px] sm:w-[210px] md:w-[230px] lg:w-[260px] aspect-[9/19.5] rounded-[2rem] sm:rounded-[2.5rem] border border-neutral-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden bg-neutral-900"
      aria-label="Fezer app phone preview"
    >
      {/* Inset screen with a subtle bezel */}
      <div
        className="absolute inset-[10px] rounded-[1.6rem] overflow-hidden bg-black"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
      >
        {/* Notch */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 rounded-full bg-black/80 z-10"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
          aria-hidden="true"
        />

        {/* Sliding track */}
        <div
          className="absolute inset-0 flex will-change-transform"
          style={{ transform: `translateX(-${(index % images.length) * 100}%)`, transition: 'transform 500ms ease-out' }}
          aria-live="polite"
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Fezer app screenshot ${i + 1}`}
              className="min-w-full h-full object-cover select-none"
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-white/70" aria-hidden="true" />
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === (index % images.length) ? 'w-3 bg-white' : 'w-1.5 bg-white/60'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}


