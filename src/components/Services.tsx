import React, { useState } from 'react';
import { Hammer, Ruler, Paintbrush, Award } from 'lucide-react';
import ServiceModal from './ServiceModal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Services = () => {
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);
  const { elementRef, isVisible } = useIntersectionObserver();

  const services = [
    {
      icon: <Ruler className="h-8 w-8" />,
      title: "Custom Cabinetry",
      description: "Bespoke cabinet solutions tailored to your space and style",
      features: [
        "Custom cabinet design",
        "Premium material selection",
        "Precise measurements",
        "3D design visualization",
        "Hardware customization",
        "Finish selection"
      ],
      benefits: [
        "Maximize storage space",
        "Increase property value",
        "Perfect fit guarantee",
        "Unique design aesthetic"
      ],
      process: [
        {
          title: "Initial Consultation",
          description: "We discuss your vision, requirements, and style preferences while assessing your space."
        },
        {
          title: "Design Phase",
          description: "Our team creates detailed 3D designs and material recommendations for your approval."
        },
        {
          title: "Manufacturing",
          description: "Your cabinets are crafted with precision using premium materials in our workshop."
        },
        {
          title: "Installation",
          description: "Expert installation team ensures perfect fit and functionality."
        }
      ]
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Professional Installation",
      description: "Expert installation services ensuring perfect fit and finish",
      features: [
        "Site preparation",
        "Professional installation team",
        "Quality assurance checks",
        "Clean-up services",
        "Final inspection",
        "Warranty coverage"
      ],
      benefits: [
        "Professional results",
        "Time-efficient installation",
        "Minimal disruption",
        "Expert craftsmanship"
      ],
      process: [
        {
          title: "Pre-Installation Inspection",
          description: "We assess the installation site and prepare the area for work."
        },
        {
          title: "Installation Process",
          description: "Our expert team carefully installs your cabinetry with precision."
        },
        {
          title: "Quality Check",
          description: "Thorough inspection ensures everything meets our high standards."
        },
        {
          title: "Final Walkthrough",
          description: "We demonstrate functionality and address any questions."
        }
      ]
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: "Renovation Services",
      description: "Complete renovation solutions for your space",
      features: [
        "Space planning",
        "Design consultation",
        "Material selection",
        "Project management",
        "Construction oversight",
        "Final finishing"
      ],
      benefits: [
        "Comprehensive service",
        "Expert project management",
        "Quality materials",
        "Timely completion"
      ],
      process: [
        {
          title: "Planning",
          description: "Detailed project planning and timeline development."
        },
        {
          title: "Design",
          description: "Creating the perfect design for your renovation."
        },
        {
          title: "Construction",
          description: "Expert execution of the renovation plan."
        },
        {
          title: "Completion",
          description: "Final touches and quality assurance."
        }
      ]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Rigorous quality control for lasting satisfaction",
      features: [
        "Material inspection",
        "Construction review",
        "Functionality testing",
        "Finish inspection",
        "Performance checks",
        "Documentation"
      ],
      benefits: [
        "Guaranteed quality",
        "Long-term durability",
        "Peace of mind",
        "Warranty protection"
      ],
      process: [
        {
          title: "Initial Assessment",
          description: "Thorough inspection of all materials and components."
        },
        {
          title: "Construction Review",
          description: "Regular checks during the construction process."
        },
        {
          title: "Final Inspection",
          description: "Comprehensive testing of all installed elements."
        },
        {
          title: "Documentation",
          description: "Detailed documentation of all quality assurance measures."
        }
      ]
    }
  ];

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
                {service.icon}
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
        service={selectedService!}
      />
    </section>
  );
}

export default Services;