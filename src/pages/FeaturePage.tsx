import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import { FeaturePageContent } from '../content/features';

export default function FeaturePage({ content }: { content: FeaturePageContent }) {
  const { h1, intro, problem, how, screenshot, useCase, capabilities, related } = content;

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
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">{intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <AppStoreButton location={content.path} />
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                Free · iPhone &amp; iPad · No account required
              </span>
            </div>
          </div>
        </header>

        {/* Problem + How, with screenshot alongside */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{problem.heading}</h2>
              {problem.paragraphs.map((text) => (
                <p key={text.slice(0, 32)} className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed max-w-2xl dark:text-neutral-400">
                  {text}
                </p>
              ))}

              <h2 className="mt-12 text-2xl sm:text-3xl font-semibold tracking-tight">{how.heading}</h2>
              <p className="mt-4 text-[15px] sm:text-base text-neutral-600 leading-relaxed max-w-2xl dark:text-neutral-400">{how.lede}</p>
              <ol className="mt-6 space-y-6">
                {how.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0d2b57] text-white text-sm font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight">{step.title}</h3>
                      <p className="mt-1 text-[15px] text-neutral-600 leading-relaxed max-w-xl dark:text-neutral-400">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <figure className="mx-auto w-full max-w-[300px] lg:max-w-none lg:sticky lg:top-24">
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                width={920}
                height={1996}
                loading="lazy"
                className="w-full rounded-3xl border border-neutral-200/80 shadow-xl shadow-[#0d2b57]/10 dark:border-neutral-800"
              />
              <figcaption className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
                {screenshot.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Use case */}
        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
            <div className="rounded-3xl border border-neutral-200/60 bg-gradient-to-br from-[#e8f1ff] to-[#fafafa] p-6 sm:p-10 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{useCase.heading}</h2>
              {useCase.paragraphs.map((text) => (
                <p key={text.slice(0, 32)} className="mt-4 text-[15px] sm:text-base text-neutral-700 leading-relaxed max-w-3xl dark:text-neutral-300">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">What you get</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed dark:text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pb-4">
          <div className="rounded-3xl bg-[#0d2b57] p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Own your day with Fezer</h2>
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

        {/* Related pages */}
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
