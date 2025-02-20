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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="relative bg-white/[0.07] backdrop-blur-xl rounded-2xl border border-white/10
            w-full max-w-3xl overflow-hidden shadow-2xl transform transition-all"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20
              text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-white/[0.05] rounded-xl">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{service.title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-8">
              {service.description}
            </p>

            {/* Features */}
            {service.features && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">What's Included</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Check className="h-5 w-5 text-white" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process */}
            {service.process && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Our Process</h4>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="bg-white/[0.05] rounded-xl p-4">
                      <h5 className="text-white font-medium mb-2">{step.title}</h5>
                      <p className="text-gray-300 text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Benefits</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
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
              className="inline-block w-full bg-white text-black px-6 py-3 rounded-xl font-semibold
                text-center hover:bg-opacity-90 transition-all duration-300"
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