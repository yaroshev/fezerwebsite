export const ABOUT_SECTIONS = [
  { id: 'vision', label: 'Vision', heading: 'Vision Statement' },
  { id: 'thesis', label: 'Thesis', heading: 'Product Thesis' },
  { id: 'objectives', label: 'Objectives', heading: 'Objectives' },
  { id: 'principles', label: 'Principles', heading: 'Principles' },
] as const;

export const VISION_STATEMENT_IMAGE = '/fezer-vision-statement.png';

export const VISION_INTRO = 'The long-term vision guiding Fezer:';

export const VISION_POINTS: string[] = [
  'To pioneer a bright future of abundance in which humanity flourishes beyond Earth, across the Solar System, and ultimately among the stars.',
  'To advance fully automated, self-managing, and self-scaling systems capable of expanding human civilization while remaining aligned with humanity\u2019s long-term flourishing.',
  'To preserve, extend, and advance humankind and life as a whole through every frontier that lies ahead.',
];

export const VISION_TAGLINES: { text: string; emphasis: 'bold' | 'italic' }[] = [
  { text: 'Infrastructure for humanity\u2019s next frontier.', emphasis: 'bold' },
  { text: 'Live a life you mean to live. Own it.', emphasis: 'italic' },
];

export const OBJECTIVES_INTRO = 'The work that moves Fezer toward that vision:';

export const OBJECTIVES: { title: string; body: string }[] = [
  {
    title: 'Build Self-Managing, Self-Scaling Systems',
    body: 'Develop systems capable of planning, coordinating, executing, monitoring, and improving their own operations with progressively less human intervention.',
  },
  {
    title: 'Increase Human Capacity Through Intelligence and Automation',
    body: 'Build tools that expand what individuals and organizations can understand, coordinate, and accomplish by combining human judgment with machine intelligence.',
  },
  {
    title: 'Create a Unified Infrastructure for Coordination',
    body: 'Establish a common architecture for plans, people, resources, time, information, and execution so complex activity can be coordinated through a reliable source of truth.',
  },
  {
    title: 'Design for Autonomy With Human Control',
    body: 'Enable increasingly autonomous operation while preserving clear ownership, accountability, permissions, intervention paths, and human authority over consequential decisions.',
  },
  {
    title: 'Make Systems Measurable and Self-Correcting',
    body: 'Integrate continuous observation, comparison, feedback, and analysis so systems can detect deviation, learn from outcomes, and improve future execution.',
  },
  {
    title: 'Maximize Efficiency of Resources',
    body: 'Reduce unnecessary consumption of time, capital, compute, energy, attention, and labor through intelligent allocation, optimization, and automation.',
  },
  {
    title: 'Build Modular, Adaptable Infrastructure',
    body: 'Design Fezer as a composable platform capable of operating across individuals, families, teams, companies, industries, and increasingly complex environments without sacrificing structural coherence.',
  },
  {
    title: 'Preserve Trust, Security, and Long-Term Alignment',
    body: 'Develop privacy, security, governance, and compliance mechanisms that allow increasingly capable systems to operate safely within clearly defined human objectives and constraints.',
  },
  {
    title: 'Create Systems That Improve Through Use',
    body: 'Build infrastructure that becomes more capable through accumulated knowledge, operational history, feedback, experimentation, and continuous refinement.',
  },
  {
    title: 'Advance the Frontier of Autonomous Coordination',
    body: 'Push toward systems capable of coordinating increasingly large networks of people, machines, intelligence, resources, and infrastructure in support of human flourishing and long-term civilizational progress.',
  },
];

export const THESIS_HEADING = 'Product Thesis';

export const THESIS_LEAD = 'Fezer is built on a simple belief:';

export const THESIS_BELIEF =
  'Human progress is constrained not only by what we can imagine, but by how effectively we can coordinate reality.';

export const THESIS_BEFORE_SCALE: string[] = [
  'Every meaningful undertaking - an individual life, a family, a company, a city, or a civilization - depends on the same fundamental elements: **plans, time, people, resources, places, actions, and outcomes.**',
  'Today, these elements are fragmented across disconnected tools, systems, and institutions. Coordination requires constant human attention, information becomes stale, intentions drift from reality, and valuable knowledge is lost.',
  'Fezer exists to create a **unified infrastructure for coordination**.',
  'We begin with the individual because the smallest complete coordination system is a human life: deciding what matters, planning time, executing work, observing what actually happened, and improving from the difference.',
];

export const THESIS_SCALE_INTRO = 'The same architecture can scale outward.';

export const THESIS_SCALE = [
  'Individual',
  'Family',
  'Team',
  'Organization',
  'Infrastructure',
  'Autonomous Systems',
] as const;

export const THESIS_AFTER_SCALE: string[] = [
  'Fezer progressively connects intent to execution, execution to reality, and reality back to intelligence.',
  'As the system develops, more coordination can become automated: schedules can adapt, resources can be allocated, conflicts can be resolved, outcomes can be measured, and systems can improve their own operation.',
  'The objective is not automation for its own sake.',
  'It is to reduce the cost of coordination while increasing human capability, preserving human authority, and enabling increasingly complex systems to operate coherently at greater scale.',
];

export const THESIS_CLOSING = [
  'Fezer starts by helping people own their day.',
  'It is being built to help humanity coordinate its future.',
] as const;

export const PRINCIPLES: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Reality Over Assumption',
    paragraphs: [
      'Fezer should represent what is actually happening, not merely what was intended.',
      'Plans matter. Reality matters more.',
      'Systems must make it easy to observe, compare, and correct the difference.',
    ],
  },
  {
    title: 'Human Intent Remains Sovereign',
    paragraphs: [
      'Automation should extend human capability, not obscure or replace human authority.',
      'Fezer may recommend, coordinate, adapt, and execute, but ownership, permissions, and ultimate control must remain clear.',
    ],
  },
  {
    title: 'Reduce the Cost of Coordination',
    paragraphs: [
      'Every product, feature, and system should make coordination simpler, faster, more reliable, or less dependent on constant human attention.',
      'Complexity should be absorbed by the system, not transferred to the user.',
    ],
  },
  {
    title: 'Build Systems That Improve Through Use',
    paragraphs: [
      'Fezer should become more capable as it observes reality.',
      'Every action, outcome, correction, and comparison should create useful intelligence that improves future decisions and execution.',
    ],
  },
  {
    title: 'Design for Autonomy',
    paragraphs: [
      'Where repeated human intervention adds no meaningful judgment, it should eventually become unnecessary.',
      'Systems should be capable of monitoring themselves, correcting themselves, coordinating with other systems, and operating reliably within defined boundaries.',
    ],
  },
  {
    title: 'Preserve a Reliable Source of Truth',
    paragraphs: [
      'Plans, actions, resources, people, time, and outcomes should remain connected through a coherent and trustworthy model of reality.',
      'The system must preserve history, context, ownership, and causality wherever possible.',
    ],
  },
  {
    title: 'Scale Without Losing Coherence',
    paragraphs: [
      'What works for one person should be capable of expanding to families, teams, organizations, infrastructure, and increasingly autonomous systems without requiring an entirely different underlying architecture.',
      'Scale should increase capability without destroying clarity.',
    ],
  },
  {
    title: 'Measure What Matters',
    paragraphs: [
      'Progress should be observable.',
      'Fezer should favor systems that can compare intent with execution, detect deviation, evaluate outcomes, and improve from evidence rather than intuition alone.',
    ],
  },
  {
    title: 'Protect Trust',
    paragraphs: [
      'Privacy, security, permissions, reliability, and transparency are structural requirements.',
      'As Fezer gains greater access, intelligence, and autonomy, its responsibility to preserve trust must increase with it.',
    ],
  },
  {
    title: 'Build for the Long Term',
    paragraphs: [
      'Fezer should not optimize only for the next release, market cycle, or technological trend.',
      'Decisions should remain compatible with the larger objective: building infrastructure capable of supporting human flourishing across increasingly complex and distant frontiers.',
      '**Build what remains useful as the scale of the problem grows.**',
    ],
  },
];
