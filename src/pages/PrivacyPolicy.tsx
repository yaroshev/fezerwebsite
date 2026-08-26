import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Nav activePath="/privacypolicy" />

      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight dark:text-neutral-100">Privacy Policy</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">Fezer · Last updated: August 26, 2026</p>

        <div className="mt-6 rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Summary</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            Your plans stay on your device. Fezer has no account, no ads, and no cloud copy of your
            schedule. To keep the app working we send anonymous product analytics, crash reports, and
            masked session recordings. On Android we also use Google Analytics for Firebase. We cannot
            read what you wrote, and we do not sell any of this.
          </p>
        </div>

        <div className="mt-8 space-y-8 text-neutral-800 dark:text-neutral-200">
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 leading-relaxed">
              Fezer (“the app”, “we”, “our”, or “us”) is a personal day planner, time tracker, and goal
              tracker. This policy covers the iPhone and iPad app, the Android app, and this website. By using Fezer you agree to it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Your plans stay on your device</h2>
            <p className="mt-2 leading-relaxed">
              Everything you create in Fezer (areas, plans, steps, schedule blocks, checkpoints, time
              tracking history, notes, vision boards, and attachments) is stored in the app’s private
              storage on your device. We do not run a Fezer account, and we do not keep a copy of your
              planner on a server of ours. The app never uploads your titles, notes, photos, files, or
              the times you planned or tracked.
            </p>
            <p className="mt-2 leading-relaxed">
              If you use your device’s own backup - iCloud Backup or a computer backup on iPhone and
              iPad - your Fezer data may be included like any other app. Those backups are managed by{' '}
              <a className="underline" href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple</a>
              {' '}under Apple’s privacy policy. We cannot open them. The Android app opts out of
              Google’s Auto Backup, so a factory reset or a new phone does not restore your planner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">What leaves the device</h2>
            <p className="mt-2 leading-relaxed">
              The planner itself works without a network. A small amount of technical information is
              sent so we can see whether the app is healthy and which parts people actually use. It is
              not a profile of you, and it is not your day.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium">Product analytics</h3>
                <p className="mt-1 leading-relaxed">
                  We record things like the app opening, which screen you are on, whether onboarding
                  was finished, and that you created an area, a plan, a block, or a pin. For Fezer Plus
                  we record that the paywall was shown or dismissed, and that a purchase, restore, or
                  cancellation happened, including which plan. Events carry counts, durations, and
                  similar structure. They do not carry the names you typed, notes, file names, image
                  data, locations, exact dates, prices, or receipts.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Crashes</h3>
                <p className="mt-1 leading-relaxed">
                  If the app crashes, we receive a report with the stack trace, app version, and device
                  class so we can fix it. Your planner content is not attached.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Session recordings</h3>
                <p className="mt-1 leading-relaxed">
                  To see how a crash or a rough edge actually happened, we capture anonymized session
                  recordings. Before a frame leaves the device, Fezer hides the text on screen and the
                  images on screen. We can see that someone tapped a button. We cannot read your
                  schedule, notes, or photos.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Device and app metadata</h3>
                <p className="mt-1 leading-relaxed">
                  App version, build, operating system, device class, and a random identifier created
                  on the device so we can tell a new install from a returning one. That identifier is
                  not your name, email, or Apple Account.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Who processes this</h2>
            <p className="mt-2 leading-relaxed">
              Product analytics, crash reports, and session recordings are processed by{' '}
              <a className="underline" href="https://posthog.com" target="_blank" rel="noopener noreferrer">PostHog</a>
              {' '}on our behalf, in the United States, on both the iPhone and Android apps. We
              configure PostHog so it does not build a named profile of you. PostHog’s own practices
              are described in{' '}
              <a className="underline" href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">their privacy policy</a>.
            </p>
            <p className="mt-2 leading-relaxed">
              The Android app also includes{' '}
              <a className="underline" href="https://firebase.google.com/docs/analytics" target="_blank" rel="noopener noreferrer">Google Analytics for Firebase</a>.
              {' '}That SDK records sessions and screen views so we can see where Android installs
              come from and whether they stick. It uses an app-instance identifier. Where Google Play
              Services supplies one, it may also read the advertising ID, which is how install
              campaigns are attributed. Fezer does not show ads. Firebase’s practices are described
              in{' '}
              <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a>.
              {' '}iPhone and iPad do not include Firebase.
            </p>
            <p className="mt-2 leading-relaxed">
              We do not sell this information. We do not use it to advertise other products to you.
              We do not share it with data brokers, ad networks, or other apps so they can track you.
              If the law requires us to disclose something, or if Fezer is sold as a business, the
              information may move with it under this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Fezer Plus and the app stores</h2>
            <p className="mt-2 leading-relaxed">
              Fezer Plus is sold by the store you installed the app from, never by us. On iPhone and
              iPad that is Apple; on Android it is Google Play. The store charges your account, keeps
              the receipt, and decides whether the subscription is active. We do not receive your card
              number, billing address, or store receipt. Entitlement reaches the app through StoreKit
              on Apple devices and Google Play Billing on Android, and is held on the device. We may
              record that a paywall was shown, and that a purchase or restore happened and which plan,
              as described above.
            </p>
            <p className="mt-2 leading-relaxed">
              Apple’s handling of the purchase is covered by{' '}
              <a className="underline" href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple’s privacy policy</a>
              {' '}and Google’s by{' '}
              <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a>.
              Because there is no Fezer account, we hold nothing that identifies you as a subscriber.
            </p>
            <p className="mt-2 leading-relaxed">
              Managing or cancelling a subscription is done where you bought it: in your Apple Account
              settings, or from Manage Fezer Plus inside the app, which opens Apple’s subscription
              sheet; or in your Google Play subscriptions on Android.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Device permissions</h2>
            <div className="mt-2 space-y-4">
              <div>
                <h3 className="font-medium">Camera (optional)</h3>
                <p className="mt-1 leading-relaxed">
                  If you take a photo to attach to a step, the app asks for camera permission. Photos
                  you take stay in the app’s local storage. The camera is never used without your action.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Photos</h3>
                <p className="mt-1 leading-relaxed">
                  Fezer uses the system photo picker. The app never gains access to your whole library.
                  Only the images you select are copied into local storage.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Files</h3>
                <p className="mt-1 leading-relaxed">
                  Fezer uses the system document picker. Only the files you select are copied into
                  local storage.
                </p>
              </div>
              <p className="leading-relaxed">
                You can revoke camera permission in iOS Settings or Android settings. The rest of the
                app keeps working.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Apple diagnostics</h2>
            <p className="mt-2 leading-relaxed">
              Separate from Fezer’s own analytics: if you have opted in to share analytics with app
              developers in iOS Settings, Apple may provide us with aggregated crash and usage
              statistics. That sharing is controlled by you and governed by{' '}
              <a className="underline" href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple’s privacy policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Deleting your data</h2>
            <p className="mt-2 leading-relaxed">
              Delete any item inside the app at any time. Deleting Fezer from the device permanently
              removes the planner data stored there, and stops further analytics from that install.
            </p>
            <p className="mt-2 leading-relaxed">
              Because there is no account, we cannot look you up by name. If you want us to delete
              analytics we already hold, write to{' '}
              <a className="underline" href="mailto:hello@fezer.app">hello@fezer.app</a>
              {' '}from the device if you can, and tell us roughly when you installed. We will delete
              what we can identify.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Children</h2>
            <p className="mt-2 leading-relaxed">
              Fezer is not directed at children under 13, and we do not knowingly collect information
              from them. If you believe a child has used Fezer in a way that sent us analytics, write
              to us and we will delete what we can find. There are no ads.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">People in the EEA and UK</h2>
            <p className="mt-2 leading-relaxed">
              We process the technical information above to run and improve Fezer (legitimate
              interests), and to provide a subscription you buy through Apple or Google Play (a contract
              with that store, not with a Fezer account). You can ask us for access, correction, or deletion of the
              analytics we hold, or object to that processing, at{' '}
              <a className="underline" href="mailto:hello@fezer.app">hello@fezer.app</a>.
              You may also complain to your local data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">This website</h2>
            <p className="mt-2 leading-relaxed">
              Optional feedback and beta-access forms send us what you type (feedback, name, email,
              an optional image). We use that only to improve Fezer or reply. Our host may keep
              ordinary server logs (IP address, browser, time) to run and secure the site.
            </p>
            <p className="mt-2 leading-relaxed">
              The website uses Google Analytics to understand which pages are read. That is separate
              from the app. We do not sell website form submissions or use them for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Changes</h2>
            <p className="mt-2 leading-relaxed">
              If these practices change (for example if a future version adds optional sync), we will
              update this page first and change the date above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Questions</h2>
            <p className="mt-2 leading-relaxed">
              Write to{' '}
              <a className="underline" href="mailto:hello@fezer.app">hello@fezer.app</a>.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default PrivacyPolicy;
