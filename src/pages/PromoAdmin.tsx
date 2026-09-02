import React from 'react';
import Nav from '../components/Nav';

/**
 * The promo dashboard moved into the tabbed admin page at /admin, with promo as
 * one tab. This is what is left at the old address so a bookmark still lands
 * somewhere useful rather than on a 404.
 */
export default function PromoAdmin() {
  React.useEffect(() => {
    window.location.replace('/admin');
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950">
      <Nav variant="minimal" />
      <div className="mx-auto max-w-sm px-4 py-20 text-center">
        <h1 className="text-xl font-semibold tracking-tight">The dashboard moved</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Promo management is now a tab on the admin page.
        </p>
        <a
          href="/admin"
          className="mt-5 inline-flex rounded-full bg-[#0d2b57] px-5 py-2.5 text-sm font-semibold text-white dark:bg-blue-300 dark:text-neutral-950"
        >
          Go to /admin
        </a>
      </div>
    </div>
  );
}
