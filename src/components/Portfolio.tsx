import React from 'react';
import { portfolio as portfolioContent } from '../content';
import Modal from './Modal';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [selectedProject, setSelectedProject] = React.useState<null | typeof portfolioContent.items[0]>(null);

  const projects = portfolioContent.items;
  const categoriesFromContent = portfolioContent.categories && portfolioContent.categories.length > 0
    ? portfolioContent.categories
    : Array.from(new Set(projects.map(p => p.category)));
  const categories = ['All', ...categoriesFromContent.filter(c => c && c !== 'All')];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold dark:text-white light:text-black text-center mb-6">{portfolioContent.title}</h2>

        {categories.length > 1 && (
          <div className="flex justify-center mb-12">
            <div className="dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg rounded-full 
              dark:border-white/10 light:border-black/10 border p-2 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'dark:bg-white dark:text-black light:bg-black light:text-white shadow-lg'
                      : 'dark:text-gray-300 light:text-gray-600 dark:hover:text-white light:hover:text-black dark:hover:bg-white/[0.1] light:hover:bg-black/[0.1]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="max-w-3xl mx-auto p-8 rounded-2xl dark:bg-white/[0.07] light:bg-black/[0.07] dark:border-white/10 light:border-black/10 text-center">
            <p className="dark:text-gray-400 light:text-gray-600">Add portfolio items in <code>src/content.ts</code>.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <button
                key={index}
                onClick={() => setSelectedProject(project)}
                className="text-left group dark:bg-white/[0.07] light:bg-black/[0.07] backdrop-blur-lg rounded-2xl 
                  dark:border-white/10 light:border-black/10 border overflow-hidden hover:scale-[1.01]
                  transition-transform duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold dark:text-white light:text-black mb-1.5">
                    {project.title}
                  </h3>
                  <p className="dark:text-gray-400 light:text-gray-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject as any}
        showNavigation={false}
      />
    </section>
  );
}

export default Portfolio;