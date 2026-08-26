import { Check, Minus } from 'lucide-react';
import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import { ComparisonPageContent } from '../content/comparisons';

export default function ComparisonPage({ content }: { content: ComparisonPageContent }) {
  const { h1, intro, fairness, sections, table, screenshot, verdict, faq, related } = content;

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav />

      <main className="flex-1">
        {/* Hero */}
        <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {h1}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              {intro}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <AppStoreButton location={content.path} />
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                Free · iPhone &amp; iPad · No account required
              </span>
            </div>
          </div>
        </header>

        {/* Fairness callout - named up front so the page reads as a comparison,
            not an advert. */}
        {fairness && (
          <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pb-4">
            <div className="max-w-3xl rounded-2xl border border-amber-200/70 bg-amber-50/60 p-5 sm:p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
              <h2 className="text-base sm:text-lg font-semibold tracking-tight">{fairness.heading}</h2>
              {fairness.paragraphs.map((text) => (
                <p
                  key={text.slice(0, 32)}
                  className="mt-3 text-[15px] text-neutral-700 leading-relaxed dark:text-neutral-300"
                >
                  {text}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Body sections with the screenshot alongside */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-16 items-start">
            <div>
              {sections.map((section, i) => (
                <div key={section.heading} className={i === 0 ? '' : 'mt-12'}>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((text) => (
                    <p
                      key={text.slice(0, 32)}
                      className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed max-w-2xl dark:text-neutral-400"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <figure className="mx-auto w-full max-w-[300px] lg:max-w-none lg:sticky lg:top-24">
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                width={920}
                height={1991}
                loading="lazy"
                className="w-full rounded-3xl border border-neutral-200/80 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800"
              />
              <figcaption className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
                {screenshot.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Comparison table */}
        {table && (
          <section className="w-full bg-white dark:bg-neutral-950">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{table.heading}</h2>
              <p className="mt-3 max-w-3xl text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400">
                {table.lede}
              </p>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200/70 dark:border-neutral-800">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-900">
                      <th
                        scope="col"
                        className="px-5 py-4 text-sm font-semibold tracking-tight w-[34%]"
                      >
                        Capability
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-4 text-sm font-semibold tracking-tight w-[33%]"
                      >
                        {table.themLabel}
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-4 text-sm font-semibold tracking-tight w-[33%] text-[#0d2b57] dark:text-blue-300"
                      >
                        Fezer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr
                        key={row.capability}
                        className="border-t border-neutral-200/70 dark:border-neutral-800"
                      >
                        <th
                          scope="row"
                          className="px-5 py-4 text-[15px] font-medium align-top"
                        >
                          {row.capability}
                        </th>
                        <td className="px-5 py-4 text-[15px] text-neutral-600 align-top dark:text-neutral-400">
                          {row.them ?? (
                            <span className="inline-flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
                              <Minus className="h-4 w-4 shrink-0" aria-hidden="true" />
                              Not offered
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-[15px] text-neutral-700 align-top dark:text-neutral-300">
                          {row.us === null ? (
                            <span className="inline-flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
                              <Minus className="h-4 w-4 shrink-0" aria-hidden="true" />
                              Not offered
                            </span>
                          ) : (
                            row.us
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{table.footnote}</p>
            </div>
          </section>
        )}

        {/* Verdict - two honest columns */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{verdict.heading}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-lg font-semibold tracking-tight">{verdict.chooseThem.label}</h3>
              <ul className="mt-4 space-y-3">
                {verdict.chooseThem.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400"
                  >
                    <Minus className="mt-1 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#0d2b57]/15 bg-gradient-to-br from-[#e8f1ff] to-[#fafafa] p-6 dark:border-blue-900/40 dark:from-neutral-900 dark:to-neutral-950">
              <h3 className="text-lg font-semibold tracking-tight">{verdict.chooseUs.label}</h3>
              <ul className="mt-4 space-y-3">
                {verdict.chooseUs.points.map((point) => (
                  <li
                    key={point}
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
            </div>
          </div>
        </section>

        {/* FAQ - mirrored into FAQPage JSON-LD in seo/meta.ts */}
        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <dl className="mt-8 grid gap-5 md:grid-cols-2">
              {faq.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-neutral-200/60 bg-[#fafafa] p-5 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <dt className="text-base font-semibold tracking-tight">{item.q}</dt>
                  <dd className="mt-2 text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 pb-4">
          <div className="rounded-3xl bg-[#0d2b57] p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Try Fezer for free</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] sm:text-base text-blue-100 leading-relaxed">
              Free to plan and track, on iPhone, iPad and Android. No account, no ads, and nothing you
              write ever leaves your device.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <AppStoreButton location={`${content.path}-cta`} className="!bg-white !text-[#0d2b57]" />
              <BetaAccessButton
                location={`${content.path}-cta`}
                className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10 dark:!border-white/40 dark:!bg-transparent dark:!text-white"
              />
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Keep exploring Fezer</h2>
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
