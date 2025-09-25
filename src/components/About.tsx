import React from 'react';
import { about as aboutContent } from '../content';

const About = () => {
  return (
    <section id="about" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white light:text-black text-center mb-6">{aboutContent.title}</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {aboutContent.paragraphs.map((p, idx) => (
            <p key={idx} className="dark:text-gray-400 light:text-gray-700 text-lg">
              {p}
            </p>
          ))}
          {aboutContent.highlights && aboutContent.highlights.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-3 pt-6">
              {aboutContent.highlights.map((h, i) => (
                <li key={i} className="dark:text-gray-300 light:text-gray-700 text-base">• {h}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;

