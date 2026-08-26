import type { ReactNode } from 'react';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import {
  OBJECTIVES,
  OBJECTIVES_INTRO,
  VISION_INTRO,
  VISION_POINTS,
  VISION_TAGLINES,
} from '../content/vision';

export const VISION_STATEMENT_SRC = '/fezer-vision-statement.png';

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

export default function VisionPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f3f1eb] text-[#0d2b57] dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/vision" />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16">
          <section id="vision">
            <h1 className="sr-only">Vision Statement</h1>
            <figure>
              <img
                src={VISION_STATEMENT_SRC}
                alt="Fezer Vision Statement dated August 26, 2026, signed by Yaroslav Shevchenko, Founder"
                width={1103}
                height={1426}
                className="h-auto w-full bg-white shadow-[0_8px_40px_-16px_rgba(13,43,87,0.18)]"
              />
              <figcaption className="sr-only">
                {VISION_INTRO} {VISION_POINTS.join(' ')} {VISION_TAGLINES.map((line) => line.text).join(' ')}
              </figcaption>
            </figure>
          </section>

          <section id="objectives" className="font-vision mt-10 sm:mt-14">
            <div className="relative overflow-hidden border border-[#0d2b57]/30 p-1.5 sm:p-2 dark:border-[#9ec7ff]/25">
              <div className="relative border border-[#0d2b57]/70 bg-[#faf8f3] px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20 dark:border-[#9ec7ff]/40 dark:bg-[#0e1218]">
                <h2 className="text-4xl font-bold tracking-tight text-[#0d2b57] sm:text-5xl dark:text-[#dce7f8]">
                  Objectives
                </h2>
                <p className="mt-5 text-base text-[#1a2744] sm:text-lg dark:text-neutral-300">
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
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
