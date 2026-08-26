import React from 'react';
import { Play } from 'lucide-react';
import { INTRO_VIDEO, trackEvent, type SiteVideo } from '../seo/constants';

function embedSrc(
  video: SiteVideo,
  { autoplay, muted, loop }: { autoplay: boolean; muted: boolean; loop: boolean }
) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    controls: '1',
  });
  if (muted) params.set('mute', '1');
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', video.id);
  }
  return `${video.embedUrl}?${params.toString()}`;
}

const SIZE_CLASS = {
  default: 'mx-auto w-full max-w-[260px] sm:max-w-[300px]',
  large: 'mx-auto w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px]',
};

/**
 * YouTube embed. Default is click-to-load: a local poster and play button, with
 * no request to YouTube until the visitor chooses to play. Pass `autoPlay` to
 * load immediately, muted, looping, so browsers will start it. Pass
 * `playWhenVisible` to defer that load until the frame is near the viewport.
 */
export default function VideoEmbed({
  location,
  autoPlay = false,
  playWhenVisible = false,
  video = INTRO_VIDEO,
  eventName = 'video_play',
  size = 'default',
  loop,
}: {
  location: string;
  autoPlay?: boolean;
  playWhenVisible?: boolean;
  video?: SiteVideo;
  eventName?: string;
  size?: 'default' | 'large';
  loop?: boolean;
}) {
  const shouldLoop = loop ?? autoPlay;
  const frameRef = React.useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [playing, setPlaying] = React.useState(autoPlay && !playWhenVisible);
  const [userStarted, setUserStarted] = React.useState(false);
  const tracked = React.useRef(false);

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  React.useEffect(() => {
    if (!autoPlay || reducedMotion) return;

    if (!playWhenVisible) {
      setPlaying(true);
      return;
    }

    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { rootMargin: '1200px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, playWhenVisible, reducedMotion]);

  React.useEffect(() => {
    if (!playing || tracked.current) return;
    tracked.current = true;
    trackEvent(eventName, { video_title: video.title, link_location: location });
  }, [playing, eventName, video.title, location]);

  const play = () => {
    setUserStarted(true);
    setPlaying(true);
  };

  return (
    <div className={SIZE_CLASS[size]}>
      <div
        ref={frameRef}
        className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800"
      >
        {playing ? (
          <iframe
            src={embedSrc(video, {
              autoplay: true,
              muted: autoPlay && !userStarted,
              loop: shouldLoop,
            })}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${video.title}`}
          >
            <img
              src={video.cover}
              alt=""
              width={1080}
              height={1920}
              loading={autoPlay ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0d2b57] shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 text-left">
              <span className="block text-sm font-semibold text-white">{video.title}</span>
              <span className="block text-xs text-white/80">{video.durationLabel} · YouTube</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
