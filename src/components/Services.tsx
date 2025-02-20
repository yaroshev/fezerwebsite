import React, { useState } from 'react';
import { Hammer, Ruler, Paintbrush, Award } from 'lucide-react';
import ServiceModal from './ServiceModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);

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
      description: "Expert installation by certified professionals",
      features: [
        "Precise fitting",
        "Hardware installation",
        "Level adjustment",
        "Clean workspace",
        "Quality inspection",
        "Post-installation support"
      ],
      benefits: [
        "Professional finish",
        "Warranty coverage",
        "Minimal disruption",
        "Expert craftsmanship"
      ],
      process: [
        {
          title: "Site Preparation",
          description: "We prepare the installation area and protect surrounding surfaces."
        },
        {
          title: "Installation",
          description: "Our team carefully installs each component with precision."
        },
        {
          title: "Quality Check",
          description: "Thorough inspection of all installed elements for perfect functionality."
        },
        {
          title: "Final Walkthrough",
          description: "We demonstrate proper usage and care of your new installations."
        }
      ]
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: "Renovation Services",
      description: "Complete kitchen and bathroom renovation services",
      features: [
        "Full space planning",
        "Material selection",
        "Lighting design",
        "Plumbing coordination",
        "Electrical updates",
        "Project management"
      ],
      benefits: [
        "Increased home value",
        "Modern functionality",
        "Energy efficiency",
        "Updated aesthetics"
      ],
      process: [
        {
          title: "Planning",
          description: "Comprehensive planning including timeline and material selection."
        },
        {
          title: "Demolition",
          description: "Careful removal of existing elements with minimal disruption."
        },
        {
          title: "Construction",
          description: "Skilled craftsmen execute the renovation according to plan."
        },
        {
          title: "Finishing",
          description: "Final touches and thorough cleanup of the renovated space."
        }
      ]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Premium materials and craftsmanship guaranteed",
      features: [
        "Material inspection",
        "Construction review",
        "Hardware testing",
        "Finish examination",
        "Functionality check",
        "Long-term warranty"
      ],
      benefits: [
        "Peace of mind",
        "Long-lasting quality",
        "Superior materials",
        "Expert workmanship"
      ],
      process: [
        {
          title: "Material Verification",
          description: "Thorough inspection of all materials before construction begins."
        },
        {
          title: "Construction Oversight",
          description: "Regular quality checks throughout the building process."
        },
        {
          title: "Final Inspection",
          description: "Comprehensive testing of all components and features."
        },
        {
          title: "Documentation",
          description: "Detailed warranty information and care instructions provided."
        }
      ]
    }
  ];

  return (
    <section id="services" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group bg-white/[0.07] backdrop-blur-lg p-8 rounded-2xl border border-white/10 
                hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:scale-[1.02]
                hover:bg-white/[0.09] transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="text-gray-100 mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-500">
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