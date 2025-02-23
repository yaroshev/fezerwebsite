import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
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

const Modal = ({ isOpen, onClose, project, onPrevious, onNext, showNavigation }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 dark:bg-black/90 light:bg-black/75 backdrop-blur-xl" onClick={onClose} />
      
      {/* Navigation Buttons */}
      {showNavigation && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious?.();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
              bg-white/10 hover:bg-white/20 text-white
              transition-all duration-300 backdrop-blur-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
              bg-white/10 hover:bg-white/20 text-white
              transition-all duration-300 backdrop-blur-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="relative w-full max-w-4xl dark:bg-[#1a1a1a] light:bg-white backdrop-blur-2xl rounded-2xl overflow-hidden
        dark:border-white/10 light:border-black/10 border shadow-2xl animate-modal-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full 
            dark:bg-white/10 light:bg-black/5 
            dark:hover:bg-white/20 light:hover:bg-black/10
            dark:text-white light:text-black 
            transition-all duration-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-[1.5fr,1fr]">
          {/* Image Section */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6 dark:bg-[#1a1a1a] light:bg-white relative">
            <div>
              <h3 className="text-2xl font-bold dark:text-white light:text-black mb-2">{project.title}</h3>
              <p className="dark:text-gray-300 light:text-gray-700">{project.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded-full 
                    dark:bg-white/10 light:bg-black/5 
                    dark:text-gray-200 light:text-gray-700 
                    dark:border-white/10 light:border-black/10 border"
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
                    <h4 className="text-sm font-medium dark:text-gray-400 light:text-gray-500">Client</h4>
                    <p className="dark:text-gray-200 light:text-gray-800">{project.details.client}</p>
                  </div>
                )}
                {project.details.duration && (
                  <div>
                    <h4 className="text-sm font-medium dark:text-gray-400 light:text-gray-500">Duration</h4>
                    <p className="dark:text-gray-200 light:text-gray-800">{project.details.duration}</p>
                  </div>
                )}
                {project.details.location && (
                  <div>
                    <h4 className="text-sm font-medium dark:text-gray-400 light:text-gray-500">Location</h4>
                    <p className="dark:text-gray-200 light:text-gray-800">{project.details.location}</p>
                  </div>
                )}
                {project.details.services && (
                  <div>
                    <h4 className="text-sm font-medium dark:text-gray-400 light:text-gray-500 mb-2">Services Provided</h4>
                    <ul className="list-disc list-inside dark:text-gray-200 light:text-gray-800 space-y-1">
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
              className="inline-block w-full dark:bg-white dark:text-black light:bg-black light:text-white
                px-6 py-3 rounded-lg font-semibold text-center 
                dark:hover:bg-gray-100 light:hover:bg-gray-900
                transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discuss Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 