// Centralized content configuration for the template

export const site = {
  name: 'Fezer',
  tagline: 'The Field Operations OS for Construction',
};

export const nav = [
  { label: 'Overview', href: '#about' },
  { label: 'Features', href: '#services' },
  { label: 'Screens', href: '#portfolio' },
  { label: 'Proof', href: '#testimonials' },
  { label: 'Request Access', href: '#contact' },
];

export const hero = {
  eyebrow: 'Fezer — Field Operations OS',
  heading: 'Control the job. Not just the paperwork.',
  subheading: 'All‑in‑one, iOS‑native system for time, tasks, tools, supplies, teams, and reports. Built for crews and PMs—clock‑in to close‑out, handled.',
  primaryCta: { label: 'Request Access', href: '#contact' },
  secondaryCta: { label: 'Book a Demo', href: '#contact' },
  background: {
    type: 'none' as 'none' | 'image' | 'video',
    src: '',
  },
};

export const about = {
  title: 'Fezer in one minute',
  paragraphs: [
    'Fezer is the all‑in‑one workforce and asset management platform for construction teams—clock‑in to close‑out, handled.',
    'Paper, spreadsheets, and point tools slow the field. Fezer replaces them with a fast, native app that gives foremen, PMs, and owners real‑time control over labor, tools, schedules, and progress—complete with QR workflows, blueprint access, role‑based views, and automated reporting.',
  ],
  highlights: [
    'iOS‑native performance with offline tolerance',
    'End‑to‑end: time, tasks, tools, supplies, projects, teams, reports',
    'Role‑aware UX for Admins, Employees, and Clients',
    'Traceability by default with QR‑based check‑out/in',
    'Real‑time sync and notifications across crews and sites',
  ] as string[],
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
    title: 'Time that tells the truth',
    description: 'Clock‑in/out with project assignment, mid‑shift switches, live timer, and guardrails at clock‑out.',
  },
  {
    icon: 'hammer',
    title: 'Tools that never go missing',
    description: 'QR‑based check‑out/in, accountability indicators, bulk assign and register, and condition capture on return.',
  },
  {
    icon: 'paintbrush',
    title: 'Tasks that move',
    description: 'Create, assign, and complete tasks with role‑aware lists and fast home widgets for action.',
  },
  {
    icon: 'award',
    title: 'Projects with context',
    description: 'Blueprints and documents with alignment, clearing, paging, and reporting modes—right where crews work.',
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
};

export const testimonials = {
  title: 'Proof from the field',
  items: [
    {
      quote: 'We finally know where our tools and time go—every day.',
      author: 'Ops Director',
      role: 'Mid‑Size GC',
    },
  ] as Testimonial[],
};

export const contact = {
  title: 'Request Access',
  description: 'Join the Fezer beta. Tell us about your crew and we’ll get you set up.',
  phone: '',
  email: 'hello@fezer.app',
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
  title: 'Screens',
  categories: ['App'],
  items: [
    {
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=60',
      title: 'Home Dashboard',
      description: 'Live status widgets and one‑tap actions.',
      category: 'App',
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60',
      title: 'Admin Console',
      description: 'Projects, inventory, and teams in one place.',
      category: 'App',
    },
    {
      image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60',
      title: 'Project Mode',
      description: 'Blueprints and documents with alignment and reports.',
      category: 'App',
    },
  ] as PortfolioProject[],
};

