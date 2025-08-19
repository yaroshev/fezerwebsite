import React from 'react';
import { testimonials as testimonialsContent } from '../content';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white light:text-black text-center mb-16">{testimonialsContent.title}</h2>

        {testimonialsContent.items.length === 0 ? (
          <div className="max-w-3xl mx-auto p-8 rounded-2xl dark:bg-white/[0.07] light:bg-black/[0.07] dark:border-white/10 light:border-black/10 text-center">
            <p className="dark:text-gray-400 light:text-gray-600">Add testimonials in <code>src/content.ts</code>.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsContent.items.map((t, idx) => (
              <div key={idx} className="dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg p-8 rounded-2xl dark:border-white/10 light:border-black/10">
                <p className="dark:text-gray-200 light:text-gray-700 mb-6">“{t.quote}”</p>
                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async"/>
                  )}
                  <div>
                    <div className="dark:text-white light:text-black font-medium">{t.author}</div>
                    {t.role && <div className="text-sm dark:text-gray-400 light:text-gray-600">{t.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;

