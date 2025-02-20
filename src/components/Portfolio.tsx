import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Modal from './Modal';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  
  const categories = ['All', 'Kitchen', 'Bathroom', 'Closet', 'Office', 'Bedroom'];
  
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9",
      title: "Modern Kitchen Renovation",
      description: "Custom walnut cabinets with brass hardware",
      category: "Kitchen",
      tags: ["Kitchen", "Modern", "Custom"],
      details: {
        client: "Private Residence",
        duration: "6 weeks",
        location: "Oak Bay, Victoria",
        services: [
          "Custom cabinet design and manufacturing",
          "Premium hardware installation",
          "Integrated lighting solutions",
          "Countertop installation"
        ]
      }
    },
    {
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101",
      title: "Luxury Bathroom Vanity",
      description: "Floating vanity in rich mahogany finish",
      category: "Bathroom",
      tags: ["Bathroom", "Luxury", "Modern"],
      details: {
        client: "Luxury Condo",
        duration: "3 weeks",
        location: "Downtown Victoria",
        services: [
          "Custom vanity design",
          "Mirror cabinet installation",
          "Under-cabinet lighting",
          "Storage solutions"
        ]
      }
    },
    {
      image: "https://images.unsplash.com/photo-1597218868981-1b68e15f0065",
      title: "Walk-in Closet",
      description: "Custom storage in premium dark oak",
      category: "Closet",
      tags: ["Storage", "Premium", "Custom"],
      details: {
        client: "Private Estate",
        duration: "4 weeks",
        location: "Uplands, Victoria",
        services: [
          "Custom closet system design",
          "LED lighting integration",
          "Drawer and shelf installation",
          "Jewelry and accessory storage"
        ]
      }
    },
    {
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      title: "Executive Office Suite",
      description: "Built-in cabinets with integrated lighting",
      category: "Office",
      tags: ["Office", "Premium", "Modern"],
      details: {
        client: "Corporate Office",
        duration: "5 weeks",
        location: "Victoria",
        services: [
          "Built-in desk and storage",
          "Cable management solutions",
          "Integrated task lighting",
          "Filing system design"
        ]
      }
    },
    {
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
      title: "Master Bedroom Storage",
      description: "Floor-to-ceiling wardrobe in white oak",
      category: "Bedroom",
      tags: ["Bedroom", "Storage", "Custom"],
      details: {
        client: "Private Residence",
        duration: "4 weeks",
        location: "Gordon Head, Victoria",
        services: [
          "Custom wardrobe design",
          "Soft-close hardware installation",
          "Interior organization systems",
          "Mirror integration"
        ]
      }
    },
    {
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77",
      title: "Contemporary Kitchen Design",
      description: "Minimalist cabinets with hidden handles",
      category: "Kitchen",
      tags: ["Kitchen", "Contemporary", "Minimalist"],
      details: {
        client: "Modern Home",
        duration: "7 weeks",
        location: "Fairfield, Victoria",
        services: [
          "Handle-less cabinet design",
          "Smart storage solutions",
          "Appliance integration",
          "Island feature design"
        ]
      }
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-32 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-6">Our Portfolio</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Explore our collection of premium cabinetry and renovation projects, each crafted with precision and care.
        </p>
        
        {/* Filter Bar */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/[0.07] backdrop-blur-lg rounded-full border border-white/10 p-2 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === category
                    ? 'bg-white text-black shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.1]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white/[0.07] backdrop-blur-lg rounded-2xl border border-white/10 
                hover:shadow-[0_15px_30px_-10px_rgba(255,255,255,0.08)] hover:-translate-y-1 hover:scale-[1.02]
                transition-all duration-500 ease-out overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-500">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-sm px-3 py-1 rounded-full bg-white/[0.05] text-gray-300 border border-white/5
                        group-hover:bg-white/[0.08] group-hover:text-white transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  View Project <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <Modal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={selectedProject!}
        />
      </div>
    </section>
  );
}

export default Portfolio;