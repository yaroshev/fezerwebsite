import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { site, nav as navItems, services as servicesContent, contact as contactContent, footer as footerContent } from '../content';

const Footer = () => {
  return (
    <footer className="section-gradient py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">{site.name}</h3>
            {site.tagline && (
              <p className="dark:text-gray-400 light:text-gray-600 mb-6">{site.tagline}</p>
            )}
            <div className="space-y-3">
              {contactContent.phone && (
                <a href={`tel:${contactContent.phone}`} className="flex items-center gap-3 dark:text-gray-400 light:text-gray-600 
                  dark:hover:text-white light:hover:text-black transition-colors duration-300">
                  <Phone className="h-5 w-5" />
                  <span>{contactContent.phone}</span>
                </a>
              )}
              {contactContent.email && (
                <a href={`mailto:${contactContent.email}`} className="flex items-center gap-3 dark:text-gray-400 light:text-gray-600 
                  dark:hover:text-white light:hover:text-black transition-colors duration-300">
                  <Mail className="h-5 w-5" />
                  <span>{contactContent.email}</span>
                </a>
              )}
              {contactContent.location && (
                <div className="flex items-center gap-3 dark:text-gray-400 light:text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{contactContent.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="dark:text-gray-400 light:text-gray-600 dark:hover:text-white light:hover:text-black transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Core capabilities</h3>
            <ul className="space-y-2">
              {servicesContent.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="dark:text-gray-400 light:text-gray-600 dark:hover:text-white light:hover:text-black transition-colors duration-300"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Hours</h3>
            <ul className="space-y-2">
              {footerContent.hours.map((h) => (
                <li key={h.label} className="dark:text-gray-400 light:text-gray-600">
                  <span className="font-medium dark:text-gray-300 light:text-gray-700">{h.label}:</span> {h.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 dark:border-white/10 light:border-black/10 border-t">
          <div className="text-center dark:text-gray-400 light:text-gray-600">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;