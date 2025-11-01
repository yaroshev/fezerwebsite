import React from 'react';

function PrivacyPolicy() {
  React.useEffect(() => {
    document.title = 'Fezer — Privacy Policy';
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/fezer-logo-transparent-blue.png" alt="Fezer logo" className="w-7 h-7" />
            <span className="text-base font-semibold tracking-tight">Fezer</span>
          </a>
          <a href="/" className="text-sm text-neutral-600 hover:opacity-80">Back to home</a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-10 py-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-neutral-600">Last updated: November 1, 2025</p>

        <div className="mt-8 space-y-8 text-neutral-800">
          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 leading-relaxed">
              Fezer ("Fezer", "we", "our", or "us") provides field operations software for construction
              teams. This Privacy Policy describes how we collect, use, disclose, and safeguard information when
              you use our websites (including <span className="underline">fezer.app</span>) and our mobile or web
              applications (collectively, the "Services"). By using the Services, you agree to this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <div className="mt-2 space-y-4">
              <div>
                <h3 className="font-medium">Account and profile data</h3>
                <p className="mt-1 leading-relaxed">
                  Name, email address, company, role, project affiliations, and team memberships. If your
                  organization provisions your account, we may receive this information from your administrator.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Operational data you provide</h3>
                <p className="mt-1 leading-relaxed">
                  Task details, time entries, tool and supply tracking records, comments, attachments, QR scan
                  results, report content, and other project data entered into the Services.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Device and usage data</h3>
                <p className="mt-1 leading-relaxed">
                  Log files, IP address, device identifiers, app version, pages or screens viewed, referring URLs,
                  date/time stamps, language preferences, and diagnostic events. On mobile, we may collect limited
                  device information to ensure performance, security, and compatibility.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Location data</h3>
                <p className="mt-1 leading-relaxed">
                  With your permission, we may collect approximate or precise location for features such as
                  time-entry verification, asset tracking, or QR workflows. You can control location sharing at any
                  time in your device settings.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Communications</h3>
                <p className="mt-1 leading-relaxed">
                  Email messages, support requests, and feedback you submit. We use this data to respond and improve
                  the Services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">How We Use Information</h2>
            <ul className="mt-2 list-disc pl-6 space-y-2">
              <li>Provide, operate, and secure the Services.</li>
              <li>Enable core features: time, tasks, tools, supplies, teams, and reports.</li>
              <li>Personalize experiences and improve usability and performance.</li>
              <li>Communicate about updates, new features, and service-related notices.</li>
              <li>Provide customer support and investigate issues or misuse.</li>
              <li>Comply with legal obligations and enforce our terms and policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Legal Bases (EEA/UK users)</h2>
            <p className="mt-2 leading-relaxed">
              If you are in the EEA or UK, we process personal data under these legal bases: (i) contract
              performance (to provide the Services), (ii) legitimate interests (e.g., to improve, secure, and
              support the Services), (iii) consent (where required, e.g., location), and (iv) legal obligation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Sharing and Disclosure</h2>
            <div className="mt-2 space-y-4">
              <div>
                <h3 className="font-medium">Service providers</h3>
                <p className="mt-1 leading-relaxed">
                  We use trusted vendors to host, process, and analyze data, deliver emails, and provide
                  infrastructure, analytics, and security. These providers access data only to perform services on
                  our behalf and under appropriate safeguards.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Organization access</h3>
                <p className="mt-1 leading-relaxed">
                  If your account is provisioned by an organization, your admin and authorized users may access
                  and manage data you submit to organization projects, subject to that organization’s policies.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Legal, safety, and compliance</h3>
                <p className="mt-1 leading-relaxed">
                  We may disclose information if required by law or in good faith to protect the rights, property,
                  or safety of Fezer, our users, or others.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Business transfers</h3>
                <p className="mt-1 leading-relaxed">
                  In connection with a merger, acquisition, financing, or sale of assets, data may be transferred
                  as part of the transaction, subject to this policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p className="mt-2 leading-relaxed">
              We retain personal data for as long as necessary to provide the Services, comply with legal
              obligations, resolve disputes, and enforce agreements. Retention periods vary based on data type,
              organizational settings, and legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="mt-2 leading-relaxed">
              We implement administrative, technical, and physical safeguards designed to protect personal data.
              No system can be 100% secure, but we continuously improve defenses including least-privilege access,
              encryption in transit, monitoring, and regular reviews.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">International Transfers</h2>
            <p className="mt-2 leading-relaxed">
              We may process data in the United States and other countries. When transferring personal data from
              the EEA/UK, we use appropriate safeguards such as Standard Contractual Clauses and additional
              technical and organizational measures.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p className="mt-2 leading-relaxed">
              Depending on your location, you may have rights to access, correct, delete, restrict, or object to
              processing of your personal data, and to data portability. You may also have the right to withdraw
              consent where processing is based on consent.
            </p>
            <p className="mt-2 leading-relaxed">
              To exercise rights, contact us at <a className="underline" href="mailto:hello@fezer.app">hello@fezer.app</a>.
              We may need to verify your identity and coordinate with your organization where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Children’s Privacy</h2>
            <p className="mt-2 leading-relaxed">
              Our Services are not directed to children under 13 (or as defined by local law). We do not knowingly
              collect personal data from children. If you believe a child has provided personal data, please
              contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Changes to This Policy</h2>
            <p className="mt-2 leading-relaxed">
              We may update this Privacy Policy from time to time. We will post the updated version on this page
              and update the “Last updated” date above. Material changes may be communicated through the Services
              or by email where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="mt-2 leading-relaxed">
              Questions about this policy or our privacy practices? Contact us at
              {' '}<a className="underline" href="mailto:hello@fezer.app">hello@fezer.app</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-neutral-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/fezer-logo-transparent-blue.png" alt="Fezer logo" className="w-6 h-6" />
              <span className="text-sm text-neutral-700">Fezer</span>
            </div>
            <div className="text-sm text-neutral-700">
              <a href="mailto:hello@fezer.app" className="hover:opacity-70 transition-opacity">hello@fezer.app</a>
              <span className="mx-2">·</span>
              <a href="/privacypolicy" className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-black/5 transition-colors">Privacy Policy</a>
              <span className="mx-2">·</span>
              <a href="/terms" className="hover:opacity-70 transition-opacity">Terms</a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">© {new Date().getFullYear()} Fezer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;


