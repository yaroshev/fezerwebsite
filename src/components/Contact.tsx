import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-6">Contact Us</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Ready to transform your space? Get in touch with us for a consultation and let's bring your vision to life.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.07] backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12
            hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)]
            transition-all duration-500 ease-out">
            
            <div className="grid lg:grid-cols-[1.2fr,2px,2fr] gap-8 lg:gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
                <div className="space-y-6">
                  <a href="tel:2506810228" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors duration-300">
                    <div className="bg-white/[0.05] p-3 rounded-lg">
                      <Phone className="h-6 w-6" />
                    </div>
                    <span>(250) 681-0228</span>
                  </a>
                  <a href="mailto:info@domumimpro.com" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors duration-300">
                    <div className="bg-white/[0.05] p-3 rounded-lg">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span>info@domumimpro.com</span>
                  </a>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="bg-white/[0.05] p-3 rounded-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <span>Victoria, British Columbia</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block bg-white/10 w-px h-full mx-auto" />

              {/* Contact Form */}
              <div>
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-white
                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                          transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-white
                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                          transition-all duration-300"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-white
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                        transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2.5 text-white
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                        transition-all duration-300"
                      placeholder="Tell us about your project"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white text-black px-8 py-3 rounded-lg font-semibold
                      hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;