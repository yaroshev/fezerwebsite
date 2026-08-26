import Nav from '../components/Nav';
import AppStoreButton from '../components/AppStoreButton';
import BetaAccessButton from '../components/BetaAccessButton';
import SiteFooter from '../components/SiteFooter';
import { FAQ_GROUPS } from '../content/faq';
import { HERO_CHIP } from '../seo/constants';

export default function FaqPage() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 flex flex-col dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/faq" />

      <main className="flex-1">
        <header className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
          <div className="max-w-3xl animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Frequently asked questions
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-neutral-500 leading-relaxed dark:text-neutral-400">
              Everything people ask about Fezer, answered plainly -  what is free, what Fezer Plus
              opens, where your data lives and what the apps deliberately do not do.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <AppStoreButton location="/faq" />
              <BetaAccessButton location="/faq" />
              <span className="text-sm text-neutral-400 dark:text-neutral-500">{HERO_CHIP}</span>
            </div>
          </div>
        </header>

        {/* FAQ groups -- mirrored into FAQPage JSON-LD in seo/meta.ts */}
        <section className="w-full bg-white dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10 sm:py-14">
            {FAQ_GROUPS.map((group, i) => (
              <div key={group.heading} className={i === 0 ? '' : 'mt-12'}>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {group.heading}
                </h2>
                <dl className="mt-6 grid gap-5 md:grid-cols-2">
                  {group.items.map((item) => (
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
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16">
          <div className="rounded-3xl bg-[#0d2b57] p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Still have a question?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] sm:text-base text-blue-100 leading-relaxed">
              Use the Send feedback link in the footer -  questions land directly with the
              developer, and the useful ones end up on this page.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <AppStoreButton location="faq-cta" className="!bg-white !text-[#0d2b57]" />
              <BetaAccessButton
                location="faq-cta"
                className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10 dark:!border-white/40 dark:!bg-transparent dark:!text-white"
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
