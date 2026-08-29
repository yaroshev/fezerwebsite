import React from 'react';
import { APP_STORE_URL, trackEvent, withCampaignUrl } from '../seo/constants';
import { AppleLogoIcon } from './StoreIcons';

export default function AppStoreButton({
  location,
  className = '',
  eventName = 'app_store_click',
}: {
  /** Where on the site this button lives, for the analytics event. */
  location: string;
  className?: string;
  eventName?: string;
}) {
  const [href, setHref] = React.useState(APP_STORE_URL);

  React.useEffect(() => {
    setHref(withCampaignUrl(APP_STORE_URL));
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(eventName, { link_location: location })}
      className={`btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#0d2b57] text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity ${className}`}
      aria-label="Download Fezer on the App Store"
    >
      <AppleLogoIcon />
      Download on the App Store
    </a>
  );
}
