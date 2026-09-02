import { Check } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import ArenaCallout from '../components/ArenaCallout';
import { GuideContent } from '../content/guides';
import { HERO_CHIP } from '../seo/constants';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function GuidePage({ content }: { content: GuideContent }) {
  const { eyebrow, h1, intro, datePublished, readMinutes, sections, takeaways, inFezer, related } =
    content;

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/guides" />

      <main className="flex-1">
        {/* Hero */}
        <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0d2b57] dark:text-blue-300">
              <a href="/guides" className="hover:opacity-80 transition-opacity">
                {eyebrow}
              </a>
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {h1}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              {intro}
            </p>
            <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
              {formatDate(datePublished)} · {readMinutes} min read
            </p>
          </div>
        </header>

        {/* Article body */}
        <article className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-14">
            <div className="max-w-3xl">
              {sections.map((section, i) => (
                <section key={section.heading} className={i === 0 ? '' : 'mt-12'}>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((text) => (
                    <p
                      key={text.slice(0, 40)}
                      className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed dark:text-neutral-400"
                    >
                      {text}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="flex gap-3 text-[15px] sm:text-base text-neutral-600 leading-relaxed dark:text-neutral-400"
                        >
                          <span
                            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d2b57] dark:bg-blue-300"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Key takeaways */}
              <section className="mt-14 rounded-2xl border border-[#0d2b57]/15 bg-gradient-to-br from-[#e8f1ff] to-[#fafafa] p-6 sm:p-8 dark:border-blue-900/40 dark:from-neutral-900 dark:to-neutral-950">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Key takeaways</h2>
                <ul className="mt-4 space-y-3">
                  {takeaways.map((point) => (
                    <li
                      key={point.slice(0, 40)}
                      className="flex gap-3 text-[15px] text-neutral-700 leading-relaxed dark:text-neutral-300"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[#0d2b57] dark:text-blue-300"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Product section, clearly labelled */}
              <section className="mt-12">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {inFezer.heading}
                </h2>
                {inFezer.paragraphs.map((text) => (
                  <p
                    key={text.slice(0, 40)}
                    className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed dark:text-neutral-400"
                  >
                    {text}
                  </p>
                ))}
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {inFezer.links.map((link) => (
                    <a
                      key={link.path}
                      href={link.path}
                      className="text-[15px] font-medium text-[#0d2b57] hover:opacity-80 transition-opacity dark:text-blue-300"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <AppStoreButton location={content.path} />
                  <BetaAccessButton location={content.path} />
                  <span className="text-sm text-neutral-400 dark:text-neutral-500">{HERO_CHIP}</span>
                </div>
              </section>
            </div>
          </div>
        </article>

        <ArenaCallout source="guide-page" />

        {/* Related guides */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Keep reading</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className="block h-full rounded-2xl border border-neutral-200/60 bg-white p-5 text-[15px] font-medium text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
