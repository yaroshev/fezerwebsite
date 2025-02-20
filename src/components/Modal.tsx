import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    image: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    fullDescription?: string;
    details?: {
      client?: string;
      duration?: string;
      location?: string;
      services?: string[];
    };
    gallery?: string[];
  };
}

const Modal = ({ isOpen, onClose, project }: ModalProps) => {
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
            w-full max-w-4xl overflow-hidden shadow-2xl transform transition-all"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20
              text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid md:grid-cols-[1.5fr,1fr]">
            {/* Image Section */}
            <div className="relative aspect-[4/3] md:aspect-auto">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full bg-white/[0.05] text-gray-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Details */}
              {project.details && (
                <div className="space-y-4">
                  {project.details.client && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Client</h4>
                      <p className="text-white">{project.details.client}</p>
                    </div>
                  )}
                  {project.details.duration && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Duration</h4>
                      <p className="text-white">{project.details.duration}</p>
                    </div>
                  )}
                  {project.details.location && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Location</h4>
                      <p className="text-white">{project.details.location}</p>
                    </div>
                  )}
                  {project.details.services && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Services Provided</h4>
                      <ul className="list-disc list-inside text-white space-y-1">
                        {project.details.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                className="inline-block w-full bg-white text-black px-6 py-3 rounded-lg font-semibold
                  text-center hover:bg-opacity-90 transition-all duration-300"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 