import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLiveBattle } from './arenaStore';
import { ARENA_PATH } from '../content/arena';

type NavItem = {
  label: string;
  href: string;
  id?: string;
};

const HOME_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#top', id: 'top' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/#features', id: 'features' },
  { label: 'Arena', href: ARENA_PATH },
  { label: 'Guides', href: '/guides' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy', href: '/privacypolicy' },
];

export default function Nav({
  activeId,
  activePath,
  variant = 'full',
}: {
  activeId?: string;
  activePath?: string;
  /** Conversion pages can drop the multi-link bar. */
  variant?: 'full' | 'minimal';
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // A quiet dot beside "Arena" while a vote is open and this visitor has not
  // cast one. It is the only thing on the site that changes week to week, so it
  // is worth one pixel of attention on every page.
  const { battle } = useLiveBattle();
  const voteOpen = Boolean(battle && !battle.myVote);

  const isActive = (item: NavItem) =>
    activePath ? item.href === activePath : activeId && item.id === activeId;

  const closeMenu = () => setMobileOpen(false);

  const navLinks = (
    <>
      {HOME_ITEMS.map((item) => {
        const active = isActive(item);
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className={`nav-link relative py-1 text-sm font-medium transition-colors duration-200 ${
              active
                ? 'nav-link-active text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            }`}
          >
            {item.label}
            {item.href === ARENA_PATH && voteOpen && (
              <span
                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#0d2b57] align-middle dark:bg-blue-300"
                aria-hidden="true"
              />
            )}
          </a>
        );
      })}
    </>
  );

  if (variant === 'minimal') {
    return (
      <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/98 backdrop-blur-xl safe-area-top dark:border-neutral-800 dark:bg-neutral-950/95">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:py-4 sm:px-6 md:px-10">
          <a
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-70"
          >
            <img
              src="/fezer-app-icon.png"
              alt="Fezer"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg"
            />
            <span className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Fezer
            </span>
          </a>
          <a
            href="/"
            className="py-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Home
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/98 backdrop-blur-xl safe-area-top dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:py-4 sm:px-6 md:px-10">
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-70">
          <img src="/fezer-app-icon.png" alt="Fezer" className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg" />
          <span className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Fezer</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-end gap-6 lg:gap-8">
          {navLinks}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-3 -mr-2 -my-1 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors touch-manipulation dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu: simple dropdown under header, pushes page content down */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <nav className="mx-auto w-full max-w-7xl px-4 py-2">
            <div className="flex flex-col gap-1">
              {HOME_ITEMS.map((item) => {
                const active = isActive(item);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`block rounded-xl px-3 py-2.5 text-base font-semibold transition-colors ${
                      active
                        ? 'bg-[#0d2b57] text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {item.label}
                    {item.href === ARENA_PATH && voteOpen && (
                      <span
                        className={`ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                          active ? 'bg-white' : 'bg-[#0d2b57] dark:bg-blue-300'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
