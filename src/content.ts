// Centralized content configuration for the template

export const site = {
  name: 'Your Brand',
  tagline: '',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: '',
  heading: 'Headline goes here',
  subheading: 'Short subheading that explains your value proposition.',
  primaryCta: { label: 'Get Started', href: '#contact' },
  secondaryCta: { label: 'Learn More', href: '#about' },
  background: {
    type: 'none' as 'none' | 'image' | 'video',
    src: '',
  },
};

export const about = {
  title: 'About',
  paragraphs: [
    'Use this section to describe your company or product. Keep it concise and focused on outcomes.',
  ],
  highlights: [] as string[],
};

export type ServiceIconKey = 'ruler' | 'hammer' | 'paintbrush' | 'award';

export type ServiceItem = {
  icon: ServiceIconKey;
  title: string;
  description: string;
  features?: string[];
  benefits?: string[];
  process?: { title: string; description: string }[];
};

export const services: ServiceItem[] = [
  {
    icon: 'ruler',
    title: 'Service One',
    description: 'Short description of the service.',
    features: [],
    benefits: [],
    process: [],
  },
  {
    icon: 'hammer',
    title: 'Service Two',
    description: 'Short description of the service.',
    features: [],
    benefits: [],
    process: [],
  },
  {
    icon: 'paintbrush',
    title: 'Service Three',
    description: 'Short description of the service.',
    features: [],
    benefits: [],
    process: [],
  },
  {
    icon: 'award',
    title: 'Service Four',
    description: 'Short description of the service.',
    features: [],
    benefits: [],
    process: [],
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
};

export const testimonials = {
  title: 'What clients say',
  items: [
    {
      quote: 'This is a sample testimonial. Replace it with a real client quote to build trust.',
      author: 'Alex Doe',
      role: 'Founder, Example Co.',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=64&h=64&q=80',
    },
    {
      quote: 'Another short testimonial to demonstrate the layout in both light and dark modes.',
      author: 'Jordan Smith',
      role: 'Product Lead',
    },
  ] as Testimonial[],
};

export const contact = {
  title: 'Contact',
  description: 'Reach out with any questions or project ideas.',
  phone: '',
  email: '',
  location: '',
};

export const footer = {
  hours: [
    { label: 'Mon - Fri', value: '9:00 AM - 5:00 PM' },
    { label: 'Saturday', value: 'By Appointment' },
    { label: 'Sunday', value: 'Closed' },
  ],
};

export type PortfolioProject = {
  image: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  details?: {
    client?: string;
    duration?: string;
    location?: string;
    services?: string[];
  };
};

export const portfolio = {
  title: 'Portfolio',
  categories: ['Sample'],
  items: [
    {
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=60',
      title: 'Sample Project One',
      description: 'A short description for the sample project.',
      category: 'Sample',
      tags: ['UX', 'Web'],
    },
    {
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=60',
      title: 'Sample Project Two',
      description: 'Another placeholder project to show the grid.',
      category: 'Sample',
      tags: ['Brand', 'Strategy'],
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60',
      title: 'Sample Project Three',
      description: 'Replace with your real portfolio item.',
      category: 'Sample',
      tags: ['App', 'Design'],
    },
  ] as PortfolioProject[],
};

