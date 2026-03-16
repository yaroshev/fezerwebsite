import React from 'react';

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
  const isActive = (item: NavItem) =>
    activePath ? item.href === activePath : activeId && item.id === activeId;

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10">
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src="/fezer-logo-transparent-blue.png" alt="Fezer" className="h-7 w-7" />
          <span className="text-base font-semibold tracking-tight text-neutral-900">Fezer</span>
        </a>
        <div className="flex flex-wrap items-center justify-end gap-4 sm:gap-6 md:gap-8">
          {HOME_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link relative py-1 text-sm font-medium transition-colors duration-200 ${
                  active ? 'nav-link-active text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
