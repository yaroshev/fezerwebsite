import React, { useState } from 'react';
import { Hammer, Ruler, Paintbrush, Award } from 'lucide-react';
import ServiceModal from './ServiceModal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { services as servicesContent, ServiceItem } from '../content';

const Services = () => {
  type ModalService = Omit<ServiceItem, 'icon'> & { icon: React.ReactNode };
  const [selectedService, setSelectedService] = useState<null | ModalService>(null);
  const { elementRef, isVisible } = useIntersectionObserver();

  const services = servicesContent;

  const iconMap: Record<string, JSX.Element> = {
    ruler: <Ruler className="h-8 w-8" />,
    hammer: <Hammer className="h-8 w-8" />,
    paintbrush: <Paintbrush className="h-8 w-8" />,
    award: <Award className="h-8 w-8" />,
  };

  return (
    <section id="services" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white light:text-black text-center mb-16">Our Services</h2>
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className={`group dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg p-8 rounded-2xl 
                dark:border-white/10 light:border-black/10 
                dark:hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)] 
                light:hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] 
                hover:-translate-y-1 hover:scale-[1.02]
                dark:hover:bg-white/[0.09] light:hover:bg-black/[0.09] 
                transition-all duration-500 ease-out cursor-pointer
                ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="dark:text-gray-100 light:text-gray-800 mb-6 group-hover:scale-110 
                dark:group-hover:text-white light:group-hover:text-black transition-all duration-500">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-semibold dark:text-white light:text-black mb-4 transition-colors duration-500">
                {service.title}
              </h3>
              <p className="dark:text-gray-400 light:text-gray-600 dark:group-hover:text-gray-200 light:group-hover:text-gray-800 transition-colors duration-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={
          selectedService
            ? { ...selectedService, icon: iconMap[(selectedService as unknown as ServiceItem).icon as string] }
            : ({} as ModalService)
        }
      />
    </section>
  );
}

export default Services;