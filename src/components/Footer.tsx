import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="section-gradient py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Domum</h3>
            <p className="dark:text-gray-400 light:text-gray-600 mb-6">
              Crafting premium cabinetry and storage solutions for Victoria's finest homes.
            </p>
            <div className="space-y-3">
              <a href="tel:2506810228" className="flex items-center gap-3 dark:text-gray-400 light:text-gray-600 
                dark:hover:text-white light:hover:text-black transition-colors duration-300">
                <Phone className="h-5 w-5" />
                <span>(250) 681-0228</span>
              </a>
              <a href="mailto:info@domumimpro.com" className="flex items-center gap-3 dark:text-gray-400 light:text-gray-600 
                dark:hover:text-white light:hover:text-black transition-colors duration-300">
                <Mail className="h-5 w-5" />
                <span>info@domumimpro.com</span>
              </a>
              <div className="flex items-center gap-3 dark:text-gray-400 light:text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>Victoria, British Columbia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="dark:text-gray-400 light:text-gray-600 dark:hover:text-white light:hover:text-black transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Custom Cabinetry',
                'Professional Installation',
                'Renovation Services',
                'Quality Assurance'
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="dark:text-gray-400 light:text-gray-600 dark:hover:text-white light:hover:text-black transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4">Hours</h3>
            <ul className="space-y-2">
              <li className="dark:text-gray-400 light:text-gray-600">
                <span className="font-medium dark:text-gray-300 light:text-gray-700">Mon - Fri:</span> 8:00 AM - 5:00 PM
              </li>
              <li className="dark:text-gray-400 light:text-gray-600">
                <span className="font-medium dark:text-gray-300 light:text-gray-700">Saturday:</span> By Appointment
              </li>
              <li className="dark:text-gray-400 light:text-gray-600">
                <span className="font-medium dark:text-gray-300 light:text-gray-700">Sunday:</span> Closed
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 dark:border-white/10 light:border-black/10 border-t">
          <div className="text-center dark:text-gray-400 light:text-gray-600">
            <p>&copy; {new Date().getFullYear()} Domum. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;