import React from 'react';
import { Menu, X } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  id?: string;
};

const HOME_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#top', id: 'top' },
  { label: 'Features', href: '/#features', id: 'features' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
  { label: 'Privacy', href: '/privacypolicy' },
];

export default function Nav({
  activeId,
  activePath,
}: {
  activeId?: string;
  activePath?: string;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
              active ? 'nav-link-active text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/98 backdrop-blur-xl safe-area-top">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:py-4 sm:px-6 md:px-10">
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-70">
          <img src="/fezer-logo-transparent-blue.png" alt="Fezer" className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="text-base font-semibold tracking-tight text-neutral-900">Fezer</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-end gap-6 lg:gap-8">
          {navLinks}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-3 -mr-2 -my-1 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors touch-manipulation"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu: simple dropdown under header, pushes page content down */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
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
                      active ? 'bg-[#0d2b57] text-white' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {item.label}
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
