import React from 'react';
import { PLAY_STORE_URL, trackEvent, withCampaignUrl } from '../seo/constants';
import { AndroidLogoIcon } from './StoreIcons';

export default function BetaAccessButton({
  location,
  className = '',
  eventName = 'play_store_click',
}: {
  /** Where on the site this button lives, for the analytics event. */
  location: string;
  className?: string;
  eventName?: string;
}) {
  const [href, setHref] = React.useState(PLAY_STORE_URL);

  React.useEffect(() => {
    setHref(withCampaignUrl(PLAY_STORE_URL));
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(eventName, { link_location: location })}
      className={`btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#0d4a32] text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity ${className}`}
      aria-label="Download Fezer on Google Play"
    >
      <AndroidLogoIcon />
      Download on Google Play
    </a>
  );
}
