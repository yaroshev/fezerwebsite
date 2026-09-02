import React from 'react';
import PromoToast from './PromoToast';
import ArenaToast from './ArenaToast';
import { promoSilenced } from '../content/promo';

/**
 * One toast slot, two campaigns.
 *
 * Two banners stacked on a page is worse than none, so this picks. The promo
 * goes first because a free month is the stronger first impression; once a
 * visitor has claimed it or waved it away, the slot belongs to the Feature
 * Arena. Nothing renders until the choice is made on the client -- localStorage
 * does not exist during the prerender.
 */
export default function SiteToast({ path }: { path: string }) {
  const [choice, setChoice] = React.useState<'pending' | 'promo' | 'arena'>('pending');

  React.useEffect(() => {
    setChoice(promoSilenced() ? 'arena' : 'promo');
  }, []);

  if (choice === 'promo') return <PromoToast />;
  // The homepage already carries the battle in full, a screen down. A toast
  // saying the same thing is the same message twice.
  if (choice === 'arena' && path !== '/') return <ArenaToast />;
  return null;
}
