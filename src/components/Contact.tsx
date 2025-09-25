import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { contact as contactContent } from '../content';

const Contact = () => {
  return (
    <section id="contact" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white light:text-black text-center mb-6">{contactContent.title || 'Contact'}</h2>
        {contactContent.description && (
          <p className="dark:text-gray-400 light:text-gray-600 text-center max-w-2xl mx-auto mb-16">
            {contactContent.description}
          </p>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg rounded-2xl 
            dark:border-white/10 light:border-black/10 border p-8 md:p-12
            dark:hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)]
            light:hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)]
            transition-all duration-500 ease-out">
            
            <div className="grid lg:grid-cols-[1.2fr,2px,2fr] gap-8 lg:gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold dark:text-white light:text-black brand-text">Get in Touch</h3>
                <div className="space-y-6">
                  {contactContent.phone && (
                    <a href={`tel:${contactContent.phone}`} className="flex items-center gap-4 dark:text-gray-400 light:text-gray-600 
                      dark:hover:text-white light:hover:text-black transition-colors duration-300">
                      <div className="dark:bg-white/[0.05] light:bg-black/[0.05] p-3 rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <span>{contactContent.phone}</span>
                    </a>
                  )}
                  {contactContent.email && (
                    <a href={`mailto:${contactContent.email}`} className="flex items-center gap-4 dark:text-gray-400 light:text-gray-600 
                      dark:hover:text-white light:hover:text-black transition-colors duration-300">
                      <div className="dark:bg-white/[0.05] light:bg-black/[0.05] p-3 rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <span>{contactContent.email}</span>
                    </a>
                  )}
                  {contactContent.location && (
                    <div className="flex items-center gap-4 dark:text-gray-400 light:text-gray-600">
                      <div className="dark:bg-white/[0.05] light:bg-black/[0.05] p-3 rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <span>{contactContent.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block dark:bg-white/10 light:bg-black/10 w-px h-full mx-auto" />

              {/* Contact Form (Netlify) */}
              <form name="fezer-beta" method="POST" data-netlify="true" className="space-y-6">
                <input type="hidden" name="form-name" value="fezer-beta" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full dark:bg-white/[0.05] light:bg-black/[0.05] rounded-lg border 
                        dark:border-white/10 light:border-black/10 
                        dark:text-white light:text-black
                        dark:placeholder-gray-400 light:placeholder-gray-500
                        focus:outline-none dark:focus:border-white/30 light:focus:border-black/30 
                        dark:focus:bg-white/[0.08] light:focus:bg-black/[0.08]
                        dark:focus:ring-2 dark:focus:ring-white/10 light:focus:ring-black/10
                        transition-all duration-300 p-3"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full dark:bg-white/[0.05] light:bg-black/[0.05] rounded-lg border 
                        dark:border-white/10 light:border-black/10 
                        dark:text-white light:text-black
                        dark:placeholder-gray-400 light:placeholder-gray-500
                        focus:outline-none dark:focus:border-white/30 light:focus:border-black/30 
                        dark:focus:bg-white/[0.08] light:focus:bg-black/[0.08]
                        dark:focus:ring-2 dark:focus:ring-white/10 light:focus:ring-black/10
                        transition-all duration-300 p-3"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full dark:bg-white/[0.05] light:bg-black/[0.05] rounded-lg border 
                      dark:border-white/10 light:border-black/10 
                      dark:text-white light:text-black
                      dark:placeholder-gray-400 light:placeholder-gray-500
                      focus:outline-none dark:focus:border-white/30 light:focus:border-black/30 
                      dark:focus:bg-white/[0.08] light:focus:bg-black/[0.08]
                      dark:focus:ring-2 dark:focus:ring-white/10 light:focus:ring-black/10
                      transition-all duration-300 p-3"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                    Company & Crew Size
                  </label>
                  <textarea
                    id="message"
                    name="company"
                    rows={4}
                    className="w-full dark:bg-white/[0.05] light:bg-black/[0.05] rounded-lg border 
                      dark:border-white/10 light:border-black/10 
                      dark:text-white light:text-black
                      dark:placeholder-gray-400 light:placeholder-gray-500
                      focus:outline-none dark:focus:border-white/30 light:focus:border-black/30 
                      dark:focus:bg-white/[0.08] light:focus:bg-black/[0.08]
                      dark:focus:ring-2 dark:focus:ring-white/10 light:focus:ring-black/10
                      transition-all duration-300 p-3 resize-none"
                    placeholder="Company, crews, and goals for Fezer"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 brand-btn rounded-lg py-3 font-semibold transition-all duration-300"
                >
                  Request Access
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;