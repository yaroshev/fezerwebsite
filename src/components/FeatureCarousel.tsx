import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import VideoEmbed from './VideoEmbed';
import { HOME_CAROUSEL } from '../content/features';
import { INTRO_VIDEO } from '../seo/constants';

type Slide = {
  key: string;
  label: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: { href: string; label: string };
  media: React.ReactNode;
};

/**
 * Six features and the walkthrough, in one run.
 *
 * The video is the last slide rather than a section of its own: it says the same
 * thing the six slides say, only faster, so it belongs at the end of them.
 * Click-to-load, not autoplay -- nothing is requested from YouTube until someone
 * reaches that slide and presses play.
 */
const SLIDES: Slide[] = [
  ...HOME_CAROUSEL.map(({ page, image, imageAlt }, position) => ({
    key: page.path,
    label: page.navLabel,
    eyebrow: page.navLabel,
    heading: page.h1,
    body: page.intro,
    cta: { href: page.path, label: 'See how it works' },
    media: (
      <img
        src={image}
        alt={imageAlt}
        width={720}
        height={1558}
        /* The first slide is the one people see, so it is not lazy. */
        loading={position === 0 ? 'eager' : 'lazy'}
        className="mx-auto h-[360px] w-auto rounded-3xl shadow-xl shadow-[#0d2b57]/20 sm:h-[430px] lg:h-[470px]"
      />
    ),
  })),
  {
    key: 'walkthrough',
    label: 'Watch',
    eyebrow: 'Watch',
    heading: `See Fezer in ${INTRO_VIDEO.durationLabel}`,
    body:
      'Plan the day in time blocks, track what actually happens with one tap, and see the two side ' +
      'by side. The whole idea of Fezer fits in one short video.',
    cta: { href: '/guides', label: 'Read the planning guides' },
    media: (
      <div className="mx-auto w-[203px] sm:w-[242px] lg:w-[264px]">
        <VideoEmbed location="home-carousel" />
      </div>
    ),
  },
];

/**
 * The homepage feature carousel: one feature at a time, the pitch on the left
 * and the screen it describes on the right, with a way through to the full page.
 *
 * Built on a scroll-snap track rather than a transform slider. That means swipe,
 * trackpad and keyboard scrolling all work without a line of code, the slides
 * are real content in the prerendered HTML whether or not JavaScript runs, and
 * the arrows are a convenience on top rather than the only way through.
 */
export default function FeatureCarousel() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const slides = SLIDES;

  // Which slide is in view, read back from the scroll position -- so a swipe and
  // an arrow press update the dots the same way.
  const onScroll = React.useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  const goTo = React.useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const target = Math.max(0, Math.min(next, track.children.length - 1));
    const left = target * track.clientWidth;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = track.scrollLeft;

    // Set straight away rather than waiting for the scroll to report back: the
    // dot should answer the click, not the animation.
    setIndex(target);
    track.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });

    // Smooth scrolling is not always honoured -- a backgrounded tab never runs
    // the animation, and some browsers ignore the option outright. If nothing
    // has moved at all shortly after, jump: an arrow that does nothing is worse
    // than one that does not glide.
    if (reduced) return;
    window.setTimeout(() => {
      if (trackRef.current && trackRef.current.scrollLeft === from && from !== left) {
        trackRef.current.scrollLeft = left;
      }
    }, 350);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="What Fezer does"
      onKeyDown={onKeyDown}
      className="mx-auto w-full max-w-6xl"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold tracking-tight">
            One place for your day
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl text-[15px] sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
            Fezer brings your commitments, schedule, and plans together so you always know what to
            work on now.
          </p>
        </div>

        {/* Arrows are hidden on touch-first widths, where swiping is the obvious
            gesture, but the counter stays: it is what says there is more here. */}
        <div className="flex shrink-0 items-center gap-4">
          <span className="text-xs font-medium tabular-nums text-neutral-400 dark:text-neutral-500">
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous feature"
            className="btn-press flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-white disabled:opacity-35 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === slides.length - 1}
            aria-label="Next feature"
            className="btn-press flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:bg-white disabled:opacity-35 disabled:hover:bg-transparent dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        className="hide-scrollbar mt-6 flex snap-x snap-mandatory overflow-x-auto rounded-3xl outline-none ring-[#0d2b57]/25 focus-visible:ring-2 sm:mt-8 dark:ring-blue-300/30"
      >
        {slides.map((slide, position) => (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${position + 1} of ${slides.length}: ${slide.label}`}
            className="w-full shrink-0 snap-center px-0.5"
          >
            <div className="rounded-3xl border border-neutral-200/70 bg-white p-6 sm:p-8 lg:p-10 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="grid items-center justify-center gap-8 md:grid-cols-[auto_minmax(0,34rem)] md:gap-12 lg:gap-16">
              <div className="md:order-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0d2b57] dark:text-blue-300">
                  {slide.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {slide.heading}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
                  {slide.body}
                </p>
                <a
                  href={slide.cta.href}
                  className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d2b57] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-blue-300 dark:text-neutral-950"
                >
                  {slide.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="md:order-1">{slide.media}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((slide, position) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => goTo(position)}
            aria-label={`Go to ${slide.label}`}
            aria-current={position === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              position === index
                ? 'w-7 bg-[#0d2b57] dark:bg-blue-300'
                : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
