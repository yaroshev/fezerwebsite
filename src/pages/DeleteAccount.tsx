import React, { useState } from 'react';

function DeleteAccount() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    document.title = 'Fezer — Request Account Deletion';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !confirmed) return;

    const subject = encodeURIComponent('Account Deletion Request');
    const body = encodeURIComponent(
      `I would like to request deletion of my Fezer account.\n\nEmail: ${email.trim()}\n\n${reason.trim() ? `Reason (optional): ${reason.trim()}\n\n` : ''}Please process this request and confirm when my account and associated data have been removed.`
    );
    window.location.href = `mailto:hello@fezer.app?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const isValid = email.trim().length > 0 && confirmed;

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/fezer-logo-transparent-blue.png" alt="Fezer logo" className="w-7 h-7" />
            <span className="text-base font-semibold tracking-tight">Fezer</span>
          </a>
          <a href="/privacypolicy" className="text-sm text-neutral-600 hover:opacity-80">Privacy Policy</a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl px-4 sm:px-6 md:px-10 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Request Account Deletion</h1>
        <p className="mt-3 text-neutral-600 leading-relaxed">
          Submit this form to request deletion of your Fezer account and associated personal data. We will process
          your request and remove or anonymize your data subject to legal retention requirements.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-neutral-800 font-medium">Check your email client</p>
            <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
              A draft email has been prepared. Please review and send it from your email app to complete your
              deletion request. We will respond and process your request as soon as possible.
            </p>
            <a
              href="/privacypolicy"
              className="mt-4 inline-block text-sm font-medium text-neutral-700 hover:opacity-80"
            >
              ← Back to Privacy Policy
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-neutral-800">
                Reason (optional)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Any additional context for your request..."
                rows={3}
                className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 resize-none"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="confirm"
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
              />
              <label htmlFor="confirm" className="text-sm text-neutral-700 leading-relaxed">
                I understand that deleting my account will permanently remove my data from Fezer and this action
                cannot be undone.
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-full border border-neutral-200 bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Submit deletion request
            </button>
          </form>
        )}
      </main>

      <footer className="w-full border-t border-neutral-200 bg-white mt-16">
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

export default DeleteAccount;
