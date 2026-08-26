import { Check } from 'lucide-react';
import AppStoreButton from './AppStoreButton';
import BetaAccessButton from './BetaAccessButton';
import { FREE_INCLUDES, PLUS_AVAILABILITY, PLUS_INCLUDES, PRICING } from '../seo/constants';

function List({ items, tone }: { items: string[]; tone: 'muted' | 'brand' }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check
            className={`mt-0.5 h-4 w-4 shrink-0 ${
              tone === 'brand' ? 'text-[#9ec7ff]' : 'text-[#0d2b57] dark:text-blue-300'
            }`}
            aria-hidden="true"
          />
          <span
            className={`text-[15px] leading-relaxed ${
              tone === 'brand' ? 'text-white/80' : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * What Fezer costs.
 *
 * The site previously said only "Free", which is true of the tier most people
 * start on and misleading about the product. Both columns are stated plainly,
 * and the cancellation path is named before anyone has to ask -- for a planner
 * sold on not holding your data, an unanswered "how do I get out" is the
 * objection that actually loses the sale.
 */
export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-white dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            What costs money, and what doesn&rsquo;t
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] sm:text-base md:text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
            Planning your day and tracking it are free, permanently, with no account and no trial
            clock. Fezer Plus opens the half of the app that reads your time back to you.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {/* Free */}
          <div className="rounded-3xl border border-neutral-200/70 bg-[#fafafa] p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-lg font-semibold tracking-tight">Free</h3>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">$0</span>
              <span className="text-[15px] text-neutral-500 dark:text-neutral-400">forever</span>
            </p>
            <p className="mt-3 text-[15px] text-neutral-600 leading-relaxed dark:text-neutral-400">
              Enough to run a real month, not a demo.
            </p>
            <List items={FREE_INCLUDES} tone="muted" />
          </div>

          {/* Plus */}
          <div className="relative rounded-3xl bg-[#0d2b57] p-6 sm:p-8 text-white">
            <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white">
              {PRICING.savingPercent}% off yearly
            </span>
            <h3 className="text-lg font-semibold tracking-tight">Fezer Plus</h3>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">
                {PRICING.perMonthOnYearly}
              </span>
              <span className="text-[15px] text-white/70">
                / month, billed yearly at {PRICING.yearly.display}
              </span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              Or {PRICING.monthly.display} a month. {PRICING.trialDays} days free on the yearly
              plan.
            </p>
            <List items={PLUS_INCLUDES} tone="brand" />
            {!PLUS_AVAILABILITY.ios && (
              <p className="mt-6 rounded-2xl bg-white/10 px-4 py-3 text-[14px] leading-relaxed text-white/80">
                Fezer Plus is available on Google Play today. The iPhone and iPad version is with
                Apple for review - until it clears, the App Store build is the free tier, and
                nothing in it will ask you to pay.
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AppStoreButton location="pricing" className="!bg-white !text-[#0d2b57]" />
              <BetaAccessButton
                location="pricing"
                className="!border-white/40 !bg-transparent !text-white hover:!bg-white/10 dark:!border-white/40 dark:!bg-transparent dark:!text-white"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          No account, so there is nothing to cancel with us. Your subscription lives in your App
          Store or Google Play account and you end it there, in two taps, whenever you like. Your
          plans stay on your phone either way.
        </p>
      </div>
    </section>
  );
}
