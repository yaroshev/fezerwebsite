import { useEffect, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import {
  ABOUT_SECTIONS,
  OBJECTIVES,
  OBJECTIVES_INTRO,
  PRINCIPLES,
  THESIS_AFTER_SCALE,
  THESIS_BEFORE_SCALE,
  THESIS_BELIEF,
  THESIS_CLOSING,
  THESIS_LEAD,
  THESIS_SCALE,
  THESIS_SCALE_INTRO,
  VISION_INTRO,
  VISION_POINTS,
  VISION_TAGLINES,
} from '../content/about';

function padIndex(index: number) {
  return String(index).padStart(2, '0');
}

function NumberedItem({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[2.75rem_1px_minmax(0,1fr)] gap-x-5 sm:grid-cols-[3.25rem_1px_minmax(0,1fr)] sm:gap-x-8">
      <span
        aria-hidden="true"
        className="pt-0.5 text-right text-xl font-bold tabular-nums leading-none tracking-tight text-[#0d2b57] sm:text-2xl dark:text-[#9ec7ff]"
      >
        {padIndex(index)}
      </span>
      <span className="bg-[#0d2b57]/15 dark:bg-[#9ec7ff]/25" aria-hidden="true" />
      <div className="min-w-0 text-[17px] leading-[1.7] text-[#1a2744] sm:text-lg sm:leading-[1.75] dark:text-neutral-200">
        {children}
      </div>
    </li>
  );
}

function DocumentFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden border border-[#0d2b57]/30 p-1.5 sm:p-2 dark:border-[#9ec7ff]/25">
      <div className="relative border border-[#0d2b57]/70 bg-[#faf8f3] px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20 dark:border-[#9ec7ff]/40 dark:bg-[#0e1218]">
        {children}
      </div>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-[#0d2b57] dark:text-[#dce7f8]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function SectionNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="On this page">
      <p className="mb-2 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 lg:mb-3 lg:block dark:text-neutral-500">
        On this page
      </p>
      <ol className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
        {ABOUT_SECTIONS.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? 'location' : undefined}
                onClick={() => onSelect(section.id)}
                className={`block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors lg:rounded-none lg:border-l-2 lg:px-3 lg:py-1.5 lg:rounded-r-md ${
                  active
                    ? 'bg-[#0d2b57] text-white lg:border-[#0d2b57] lg:bg-[#0d2b57]/5 lg:text-[#0d2b57] dark:bg-[#0d2b57] dark:lg:border-[#9ec7ff] dark:lg:bg-[#9ec7ff]/10 dark:lg:text-[#9ec7ff]'
                    : 'text-neutral-500 hover:text-neutral-900 lg:border-transparent dark:text-neutral-400 dark:hover:text-neutral-100'
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function CollapsibleSection({
  id,
  title,
  open,
  onOpenChange,
  className = '',
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-44 font-vision lg:scroll-mt-28 ${className}`}>
      <details
        className="group"
        open={open}
        onToggle={(event) => {
          const next = event.currentTarget.open;
          if (next !== open) onOpenChange(next);
        }}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-2 -mx-2 px-2 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2b57] dark:hover:bg-neutral-900 [&::-webkit-details-marker]:hidden">
          <h2 className="text-3xl font-bold tracking-tight text-[#0d2b57] sm:text-4xl dark:text-[#dce7f8]">
            {title}
          </h2>
          <ChevronDown
            className="h-6 w-6 shrink-0 text-[#0d2b57]/50 transition-transform duration-200 group-open:rotate-180 dark:text-[#9ec7ff]/70"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-6">
          <DocumentFrame>{children}</DocumentFrame>
        </div>
      </details>
    </section>
  );
}

export default function AboutPage() {
  const [activeId, setActiveId] = useState<string>(ABOUT_SECTIONS[0].id);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([ABOUT_SECTIONS[0].id]));

  const openSection = (id: string) => {
    setActiveId(id);
    setOpenIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const setSectionOpen = (id: string, open: boolean) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  useEffect(() => {
    const elements = ABOUT_SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const next = visible[0]?.target.id;
        if (next) setActiveId(next);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (ABOUT_SECTIONS.some((section) => section.id === hash)) {
      setActiveId(hash);
      setOpenIds(new Set([hash]));
    }

    const onHashChange = () => {
      const next = window.location.hash.replace('#', '');
      if (ABOUT_SECTIONS.some((section) => section.id === next)) {
        openSection(next);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#fafafa] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/about" />

      <main className="flex-1">
        <header className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 md:px-10 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0d2b57] dark:text-blue-300">
              About
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight leading-tight sm:text-4xl md:text-5xl">
              Vision, thesis, objectives, and principles
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-500 sm:text-xl dark:text-neutral-400">
              The long-term vision guiding Fezer, the product thesis, the work that moves it
              forward, and the principles it is built on.
            </p>
          </div>
        </header>

        <div className="border-y border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
            <aside className="sticky top-[57px] z-40 -mx-4 self-start border-b border-neutral-200/80 bg-white/95 px-4 py-3 backdrop-blur sm:top-[65px] lg:top-24 lg:z-auto lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none dark:border-neutral-800 dark:bg-neutral-950/95 lg:dark:bg-transparent">
              <SectionNav activeId={activeId} onSelect={openSection} />
            </aside>

            <div className="min-w-0 max-w-3xl divide-y divide-neutral-200 dark:divide-neutral-800">
              <CollapsibleSection
                id="vision"
                title="Vision Statement"
                open={openIds.has('vision')}
                onOpenChange={(open) => setSectionOpen('vision', open)}
                className="pb-10"
              >
                <p className="text-base text-[#1a2744] sm:text-lg dark:text-neutral-300">
                  {VISION_INTRO}
                </p>

                <ol className="mt-10 list-none space-y-8 sm:mt-12 sm:space-y-10">
                  {VISION_POINTS.map((point, i) => (
                    <NumberedItem key={point} index={i + 1}>
                      {point}
                    </NumberedItem>
                  ))}
                </ol>

                <div className="mt-12 border-t border-[#0d2b57]/15 pt-8 dark:border-[#9ec7ff]/20">
                  {VISION_TAGLINES.map((line) => (
                    <p
                      key={line.text}
                      className={`text-xl font-semibold leading-snug tracking-tight text-[#0d2b57] sm:text-2xl dark:text-[#dce7f8] ${
                        line.emphasis === 'italic' ? 'mt-1 font-normal italic' : ''
                      }`}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="thesis"
                title="Product Thesis"
                open={openIds.has('thesis')}
                onOpenChange={(open) => setSectionOpen('thesis', open)}
                className="py-10"
              >
                <p className="text-base text-[#1a2744] sm:text-lg dark:text-neutral-300">
                  {THESIS_LEAD}
                </p>

                <blockquote className="mt-8 border-l-[1.5px] border-[#0d2b57]/30 pl-5 sm:pl-6 dark:border-[#9ec7ff]/30">
                  <p className="text-xl font-semibold leading-snug tracking-tight text-[#0d2b57] sm:text-2xl sm:leading-snug dark:text-[#dce7f8]">
                    {THESIS_BELIEF}
                  </p>
                </blockquote>

                <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-[#1a2744] sm:text-lg sm:leading-[1.8] dark:text-neutral-200">
                  {THESIS_BEFORE_SCALE.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>
                      <RichText text={paragraph} />
                    </p>
                  ))}

                  <p>{THESIS_SCALE_INTRO}</p>
                </div>

                <ol className="mt-8 flex list-none flex-wrap items-center gap-x-2 gap-y-2">
                  {THESIS_SCALE.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="border border-[#0d2b57]/20 bg-white px-3 py-1.5 text-sm font-semibold tracking-tight text-[#0d2b57] dark:border-[#9ec7ff]/20 dark:bg-[#0e1218] dark:text-[#dce7f8]">
                        {step}
                      </span>
                      {i < THESIS_SCALE.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="text-[#0d2b57]/40 dark:text-[#9ec7ff]/50"
                        >
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>

                <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-[#1a2744] sm:text-lg sm:leading-[1.8] dark:text-neutral-200">
                  {THESIS_AFTER_SCALE.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-12 border-t border-[#0d2b57]/15 pt-8 dark:border-[#9ec7ff]/20">
                  {THESIS_CLOSING.map((line) => (
                    <p
                      key={line}
                      className="text-xl font-semibold leading-snug tracking-tight text-[#0d2b57] sm:text-2xl dark:text-[#dce7f8]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                id="objectives"
                title="Objectives"
                open={openIds.has('objectives')}
                onOpenChange={(open) => setSectionOpen('objectives', open)}
                className="py-10"
              >
                <p className="text-base text-[#1a2744] sm:text-lg dark:text-neutral-300">
                  {OBJECTIVES_INTRO}
                </p>

                <ol className="mt-12 list-none space-y-10 sm:mt-14 sm:space-y-12">
                  {OBJECTIVES.map((objective, i) => (
                    <NumberedItem key={objective.title} index={i + 1}>
                      <h3 className="font-bold tracking-tight text-[#0d2b57] dark:text-[#dce7f8]">
                        {objective.title}
                      </h3>
                      <p className="mt-2 text-[16px] leading-[1.7] text-[#1a2744]/90 sm:text-[17px] dark:text-neutral-300">
                        {objective.body}
                      </p>
                    </NumberedItem>
                  ))}
                </ol>
              </CollapsibleSection>

              <CollapsibleSection
                id="principles"
                title="Principles"
                open={openIds.has('principles')}
                onOpenChange={(open) => setSectionOpen('principles', open)}
                className="pt-10"
              >
                <ol className="list-none space-y-10 sm:space-y-12">
                  {PRINCIPLES.map((principle, i) => (
                    <NumberedItem key={principle.title} index={i + 1}>
                      <h3 className="font-bold tracking-tight text-[#0d2b57] dark:text-[#dce7f8]">
                        {principle.title}
                      </h3>
                      <div className="mt-2 space-y-3 text-[16px] leading-[1.7] text-[#1a2744]/90 sm:text-[17px] dark:text-neutral-300">
                        {principle.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>
                            <RichText text={paragraph} />
                          </p>
                        ))}
                      </div>
                    </NumberedItem>
                  ))}
                </ol>
              </CollapsibleSection>
            </div>
          </div>
        </div>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-10">
          <div className="rounded-3xl bg-[#0d2b57] p-8 text-center text-white sm:p-12">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Own your day</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-blue-100 sm:text-base">
              Fezer is a private day planner, time tracker and goal planner for iPhone, iPad and
              Android. Free to plan and track, with no account required.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5 sm:gap-4">
              <AppStoreButton location="about-cta" className="!bg-white !text-[#0d2b57]" />
              <BetaAccessButton location="about-cta" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
