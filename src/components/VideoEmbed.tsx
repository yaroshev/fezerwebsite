import React from 'react';
import { Play } from 'lucide-react';
import { INTRO_VIDEO, trackEvent } from '../seo/constants';

function embedSrc({ autoplay, muted, loop }: { autoplay: boolean; muted: boolean; loop: boolean }) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    playsinline: '1',
    rel: '0',
  });
  if (muted) params.set('mute', '1');
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', INTRO_VIDEO.id);
  }
  return `${INTRO_VIDEO.embedUrl}?${params.toString()}`;
}

/**
 * YouTube embed for the launch video. Default is click-to-load: a local poster
 * and play button, with no request to YouTube until the visitor chooses to play.
 * Pass `autoPlay` to load immediately, muted, looping, so browsers will start it.
 */
export default function VideoEmbed({
  location,
  autoPlay = false,
}: {
  location: string;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = React.useState(autoPlay);
  const tracked = React.useRef(false);

  React.useEffect(() => {
    if (!playing || tracked.current) return;
    tracked.current = true;
    trackEvent('video_play', { video_title: INTRO_VIDEO.title, link_location: location });
  }, [playing, location]);

  const play = () => setPlaying(true);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800">
        {playing ? (
          <iframe
            src={embedSrc({ autoplay: true, muted: autoPlay, loop: autoPlay })}
            title={INTRO_VIDEO.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${INTRO_VIDEO.title}`}
          >
            <img
              src={INTRO_VIDEO.cover}
              alt="Cover frame of the Introducing Fezer video showing the app on an iPhone"
              width={720}
              height={1280}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0d2b57] shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 text-left">
              <span className="block text-sm font-semibold text-white">{INTRO_VIDEO.title}</span>
              <span className="block text-xs text-white/80">{INTRO_VIDEO.durationLabel} · YouTube</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
