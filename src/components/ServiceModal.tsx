import React from 'react';
import { X, Check } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    features?: string[];
    benefits?: string[];
    process?: {
      title: string;
      description: string;
    }[];
  };
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 dark:bg-black/70 light:bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="relative dark:bg-[#1a1a1a] light:bg-white backdrop-blur-xl rounded-2xl 
            dark:border-white/10 light:border-black/10
            w-full max-w-3xl overflow-hidden shadow-2xl transform transition-all"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full dark:bg-white/10 light:bg-black/10 
              dark:hover:bg-white/20 light:hover:bg-black/20
              dark:text-white light:text-black transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 dark:bg-white/10 light:bg-black/5 rounded-xl">
                <div className="dark:text-white light:text-black">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold dark:text-white light:text-black">{service.title}</h3>
            </div>

            {/* Description */}
            <p className="dark:text-gray-200 light:text-gray-700 mb-8">
              {service.description}
            </p>

            {/* Features */}
            {service.features && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold dark:text-white light:text-black mb-4">What's Included</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 dark:text-gray-200 light:text-gray-700"
                    >
                      <Check className="h-5 w-5 dark:text-white light:text-black flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process */}
            {service.process && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold dark:text-white light:text-black mb-4">Our Process</h4>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="dark:bg-white/5 light:bg-black/5 rounded-xl p-4">
                      <h5 className="dark:text-white light:text-black font-medium mb-2">{step.title}</h5>
                      <p className="dark:text-gray-200 light:text-gray-700 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold dark:text-white light:text-black mb-4">Benefits</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 dark:text-gray-200 light:text-gray-700"
                    >
                      <div className="h-1.5 w-1.5 dark:bg-white light:bg-black rounded-full flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block w-full dark:bg-white dark:text-black light:bg-black light:text-white 
                px-6 py-3 rounded-xl font-semibold text-center hover:opacity-90 transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal; 