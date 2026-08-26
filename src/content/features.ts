import { SCREENSHOTS } from '../seo/constants';

export type FeaturePageContent = {
  path: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problem: {
    heading: string;
    paragraphs: string[];
  };
  how: {
    heading: string;
    lede: string;
    steps: { title: string; body: string }[];
  };
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  useCase: {
    heading: string;
    paragraphs: string[];
  };
  capabilities: { title: string; desc: string }[];
  related: { path: string; label: string }[];
};

export const FEATURE_PAGES: FeaturePageContent[] = [
  {
    path: '/day-planner-app',
    navLabel: 'Day planner',
    title: 'Day Planner App for iPhone -  Fezer',
    metaDescription:
      'Plan your day in time blocks, keep deadlines in view and always know what to work on now. Fezer is a private day planner app for iPhone and iPad.',
    h1: 'A day planner built around what you do now',
    intro:
      'Fezer plans your day as a sequence of time blocks and deadlines, then keeps one commitment in front of you at a time. Not a longer to-do list -  a clearer answer to "what should I be doing right now?"',
    problem: {
      heading: 'The problem with most day planners',
      paragraphs: [
        'A to-do list shows everything you could do, in no particular order. A calendar shows your meetings, but the actual work floats somewhere in between. By mid-afternoon the plan and the day have quietly parted ways, and you are choosing tasks reactively.',
        'A day plan only works if it answers one question at any moment: what is the current commitment? That is the question Fezer is designed around.',
      ],
    },
    how: {
      heading: 'How planning a day works in Fezer',
      lede: 'Fezer has three surfaces for the day: Schedule, Now and Analytics.',
      steps: [
        {
          title: 'Lay out the day in Schedule',
          body: 'Add time blocks for focused work, routines and breaks. Deadlines appear as pins on the timeline, so due items sit right inside the day instead of in a separate list.',
        },
        {
          title: 'Let Now tell you what matters',
          body: 'The Now tab shows your current commitment with clear timing badges: LIVE for what is running, NOW for what should be happening, NEXT for what comes after and DUE for approaching deadlines.',
        },
        {
          title: 'Track the day as it happens',
          body: 'Switch Schedule to Track mode, or start a session with one tap from Now. Tracked time lands next to your plan as its own column.',
        },
        {
          title: 'Compare plan and reality',
          body: 'Compare mode puts the planned day and the tracked day side by side, so tomorrow\u2019s plan starts from evidence, not optimism.',
        },
      ],
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer day planner showing a day planned in time blocks next to the time actually tracked',
      caption: 'A planned day next to the tracked day in Fezer\u2019s Compare mode.',
    },
    useCase: {
      heading: 'Example: a workday in Fezer',
      paragraphs: [
        'The night before, you block tomorrow: breakfast, two work blocks, a break, and an errand pinned as a deadline. In the morning, Now shows the first block as LIVE and the errand as DUE. When plans shift -  they always do -  you drag blocks around in Schedule rather than rewriting a list.',
        'At the end of the day, Compare shows that "Work Block 1" started 25 minutes late and the break stretched. Next day\u2019s plan gets more realistic, and the plan keeps being something you trust.',
      ],
    },
    capabilities: [
      { title: 'Time blocks', desc: 'Plan the day as blocks with start and end times, including repeating blocks for routines.' },
      { title: 'Deadline pins', desc: 'Pin due items directly onto the day so deadlines live inside the plan.' },
      { title: 'Now view', desc: 'One glance shows what is live, what is next and what is due.' },
      { title: 'Plan, Track, Compare', desc: 'Three schedule modes: plan the day, track it, then see both side by side.' },
      { title: 'Plan-connected scheduling', desc: 'Commit steps from your plans straight onto the schedule.' },
      { title: 'Private by design', desc: 'No account, no server. The whole plan stays on your device.' },
    ],
    related: [
      { path: '/time-blocking-app', label: 'Explore Fezer\u2019s time-blocking planner' },
      { path: '/time-tracker', label: 'See how the personal time tracker works' },
      { path: '/weekly-planner', label: 'Plan and review your week' },
    ],
  },
  {
    path: '/time-blocking-app',
    navLabel: 'Time blocking',
    title: 'Time-Blocking Planner for iPhone -  Fezer',
    metaDescription:
      'Fezer is a time-blocking planner for iPhone and iPad. Build your day from time blocks, repeat your routines and compare the plan with what actually happened.',
    h1: 'Time blocking that survives contact with a real day',
    intro:
      'Time blocking means giving every hour a job before the day starts. Fezer makes the blocks fast to place, easy to repeat and honest at the end of the day -  because it also shows what actually happened.',
    problem: {
      heading: 'Why time blocking usually breaks down',
      paragraphs: [
        'Time blocking fails for two predictable reasons. First, maintenance: rebuilding the same morning routine block by block every day gets old within a week. Second, drift: the plan says 9:00 deep work, reality says 9:40, and there is no feedback loop to correct for it -  so the plan slowly becomes fiction.',
        'Fezer addresses both. Repeating blocks carry your routine forward automatically, and the Compare view confronts the plan with the tracked day so your blocks get more accurate over time.',
      ],
    },
    how: {
      heading: 'How time blocking works in Fezer',
      lede: 'Everything happens on the Schedule tab, a vertical timeline of your day.',
      steps: [
        {
          title: 'Add blocks in Plan mode',
          body: 'Create a block, give it a name and a time range. Blocks are visual and draggable -  reshuffling the afternoon takes seconds.',
        },
        {
          title: 'Put routines on repeat',
          body: 'A block can repeat Every Day, on Weekdays, Every Week or Every 2 Weeks. Your morning routine and standing focus blocks build themselves.',
        },
        {
          title: 'Block time for your goals',
          body: 'From any plan, choose Commit and then Work on to turn a step into a scheduled block -  optionally repeating. Your plans claim real hours instead of waiting in a backlog.',
        },
        {
          title: 'Check the blocks against reality',
          body: 'Track the day, then open Compare. Planned blocks and tracked time sit side by side, so you can see which blocks are realistic and which are wishful thinking.',
        },
      ],
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer time-blocking planner showing scheduled time blocks in the Planned column beside tracked time',
      caption: 'Planned time blocks beside tracked time -  the feedback loop that keeps blocks honest.',
    },
    useCase: {
      heading: 'Example: protecting deep work',
      paragraphs: [
        'You set a "Focused work" block from 5:20 to 6:20 every weekday, followed by breakfast and two longer work blocks. Because the blocks repeat, the structure is already there each morning -  you only adjust the exceptions.',
        'After a week, Compare shows the early block holds up on Tuesdays and Wednesdays but collapses on Fridays. So you move Friday\u2019s deep work to the afternoon. That is the point of time blocking with feedback: the schedule adapts to how you actually work.',
      ],
    },
    capabilities: [
      { title: 'Visual time blocks', desc: 'Draggable blocks on a day timeline, quick to add and rearrange.' },
      { title: 'Repeating blocks', desc: 'Every Day, Weekdays, Every Week or Every 2 Weeks -  routines build themselves.' },
      { title: 'Work on commitments', desc: 'Turn plan steps into scheduled blocks without leaving your plans.' },
      { title: 'Compare mode', desc: 'Planned and tracked columns side by side for every day.' },
      { title: 'Deadline pins', desc: 'Deadlines sit on the same timeline as your blocks.' },
      { title: 'On-device data', desc: 'Your schedule never leaves your iPhone or iPad.' },
    ],
    related: [
      { path: '/day-planner-app', label: 'See Fezer as a full day planner' },
      { path: '/weekly-planner', label: 'Build a weekly rhythm with repeating blocks' },
      { path: '/goal-planner', label: 'Create a goal plan and commit it to your schedule' },
    ],
  },
  {
    path: '/time-tracker',
    navLabel: 'Time tracker',
    title: 'Personal Time Tracker -  Fezer',
    metaDescription:
      'Track your time with one tap, add checkpoints as you work and see where your day really went. Fezer is a private personal time tracker for iPhone and iPad.',
    h1: 'A personal time tracker, not a surveillance tool',
    intro:
      'Most time trackers were built for billing clients: timers, categories, exports. Fezer tracks time for one audience -  you. One tap to begin, checkpoints along the way, and analytics that show where your time actually went.',
    problem: {
      heading: 'The problem with tracking every second',
      paragraphs: [
        'Traditional time tracking demands constant bookkeeping: pick a project, pick a tag, start the timer, stop the timer, fix the entry you forgot. The overhead is fine when someone is paying for the hours. For personal insight, it kills the habit within days.',
        'Useful personal tracking needs to be nearly effortless and needs to feed back into planning. Knowing you spent 6 hours "working" is trivia; seeing that your planned two-hour block actually took four is something you can act on tomorrow.',
      ],
    },
    how: {
      heading: 'How time tracking works in Fezer',
      lede: 'Tracking lives on the Now tab, one tap away at any moment.',
      steps: [
        {
          title: 'Tap Begin',
          body: 'One big button starts a session. Optionally attach it to an area, a plan or a specific step -  or just track and name it later.',
        },
        {
          title: 'Drop checkpoints as you go',
          body: 'Tap Submit to add a checkpoint: a note or a photo capturing how the work unfolded. The session keeps running.',
        },
        {
          title: 'End the session',
          body: 'The tracked time lands on your Schedule as a tracked block, with its checkpoints attached. A running session also shows up in Now as LIVE.',
        },
        {
          title: 'Read the results in Analytics',
          body: 'Analytics breaks tracked time down by area and plan across the day, week, month or year -  and Compare shows planned versus actual for any day.',
        },
      ],
    },
    screenshot: {
      src: SCREENSHOTS.timeTracker,
      alt: 'Fezer time tracker Now screen with a large Begin button below the current commitment',
      caption: 'The Now tab: your current commitment on top, one-tap tracking below.',
    },
    useCase: {
      heading: 'Example: finding where the day leaks',
      paragraphs: [
        'You suspect your mornings evaporate but cannot say where. For one week, you tap Begin when you start anything substantial and End when you stop -  no categories, no ceremony. When something notable happens mid-session, you Submit a checkpoint.',
        'By Friday, Analytics shows the story: the "quick email check" after breakfast averages 50 minutes, and transit eats more than either break. You block email into a fixed 20-minute slot and move a reading block onto the commute. Tracking earned its keep in a week, without turning into a second job.',
      ],
    },
    capabilities: [
      { title: 'One-tap sessions', desc: 'Begin and End. That is the whole workflow when you want it to be.' },
      { title: 'Checkpoints', desc: 'Add notes and photos mid-session to capture how the work actually unfolded.' },
      { title: 'Plan-aware tracking', desc: 'Attach sessions to areas, plans or steps so tracked time counts toward something.' },
      { title: 'Tracked blocks', desc: 'Sessions appear on your schedule beside the plan, not in a separate report.' },
      { title: 'Plan vs. reality analytics', desc: 'Day, week, month and year breakdowns by area and plan.' },
      { title: 'Completely private', desc: 'Your tracking history stays on the device. No account, no cloud copy of your day.' },
    ],
    related: [
      { path: '/time-blocking-app', label: 'Plan the time you are about to track' },
      { path: '/day-planner-app', label: 'Run your whole day from Fezer' },
      { path: '/weekly-planner', label: 'Review your week with analytics' },
    ],
  },
  {
    path: '/goal-planner',
    navLabel: 'Goal planner',
    title: 'Goal Planner and Tracker -  Fezer',
    metaDescription:
      'Organize plans into areas, break them into steps and commit each step onto your daily schedule. Fezer is a goal planner and tracker for iPhone and iPad.',
    h1: 'A goal planner that ends on your calendar',
    intro:
      'Goals fail in the gap between "written down" and "scheduled." Fezer closes that gap: organize plans into areas, break them into steps, and commit each step to a deadline or a block of time on your actual day.',
    problem: {
      heading: 'Why written goals stall',
      paragraphs: [
        'Most goals live in a notes app: a tidy list reviewed in January and rediscovered in November. The goal never stalls because it was a bad goal -  it stalls because no specific step ever got a specific time.',
        'A goal planner should force two things: decomposition (what are the concrete steps?) and commitment (when, exactly, does the next step happen?). Fezer builds both into the same flow.',
      ],
    },
    how: {
      heading: 'How goal planning works in Fezer',
      lede: 'The Plan tab organizes everything as areas \u2192 plans \u2192 steps.',
      steps: [
        {
          title: 'Create areas for areas of life',
          body: 'An area is a life area or theme -  Personal Wellbeing, Family, Work. Every plan belongs to an area, so progress is visible per area, not just per task.',
        },
        {
          title: 'Define each goal with a beginning and an end',
          body: 'Each goal records why it was created and what the end result looks like. Between those two anchors sits the strip of steps.',
        },
        {
          title: 'Break plans into steps',
          body: 'Steps are ordered pieces of real work. Attach notes, photos and files to each step, and watch plan progress move as steps complete.',
        },
        {
          title: 'Commit steps onto the schedule',
          body: 'From any step, choose Commit: "Complete by" pins a deadline on your day, "Work on" blocks time for it -  optionally repeating. This is the moment a goal becomes a plan.',
        },
      ],
    },
    screenshot: {
      src: SCREENSHOTS.goalPlanner,
      alt: 'Fezer goal planner showing plans organized under a Personal Wellbeing area',
      caption: 'Plans grouped by area -  each one decomposes into steps you can schedule.',
    },
    useCase: {
      heading: 'Example: from "get fit" to Tuesday at 7 AM',
      paragraphs: [
        'You create a Personal Wellbeing area and add a plan: Consistent Work Out Routine. The end result is written down -  three sessions a week, sustained for three months. The steps: choose a gym, plan a starter program, complete the first week, then each following week.',
        '"Choose a gym" gets a Complete-by pin on Saturday. "Complete the first week" becomes three repeating Work-on blocks at 7 AM. From that point on, the goal is not a wish on a list -  it is visible on your schedule, in your Now view, and in your weekly analytics.',
      ],
    },
    capabilities: [
      { title: 'Areas', desc: 'Group plans by life area so no part of your life goes quietly neglected.' },
      { title: 'Steps with anchors', desc: 'Every plan spans from "why it was created" to "the end result," with ordered steps between.' },
      { title: 'Commit: Complete by', desc: 'Pin a step as a deadline directly on your day.' },
      { title: 'Commit: Work on', desc: 'Block time for a step, once or on repeat.' },
      { title: 'Progress and accomplishment', desc: 'Plan progress follows completed steps; finished plans are marked Accomplished.' },
      { title: 'Time that counts', desc: 'Tracked sessions attach to goals, so analytics show the hours each goal actually received.' },
    ],
    related: [
      { path: '/vision-board-app', label: 'Build a digital vision board for your areas' },
      { path: '/time-blocking-app', label: 'Turn steps into time blocks' },
      { path: '/day-planner-app', label: 'See committed steps inside your day plan' },
    ],
  },
  {
    path: '/vision-board-app',
    navLabel: 'Vision board',
    title: 'Vision Board App for Goals -  Fezer',
    metaDescription:
      'Build a digital vision board for every area of your life and connect it to real plans, steps and scheduled time. Fezer is a private vision board app for iPhone.',
    h1: 'A vision board connected to an actual plan',
    intro:
      'A vision board is only decoration until something links it to action. In Fezer, every board belongs to an area or a plan -  the same plans that break into steps and land on your daily schedule.',
    problem: {
      heading: 'The problem with pretty boards',
      paragraphs: [
        'Vision boards usually live in a collage app or on a corkboard: inspiring in week one, invisible by week six. The images never meet the calendar, so the distance between "the life I want" and "what I did today" never shrinks.',
        'The fix is not a prettier board. It is putting the board inside the system where goals are planned and time is spent -  so dreaming, planning and doing share one address.',
      ],
    },
    how: {
      heading: 'How the vision board works in Fezer',
      lede: 'Each area and each plan can carry its own freeform pin board.',
      steps: [
        {
          title: 'Pin what matters',
          body: 'Add pins with images and text, typed by intent: Want, Need, Idea, Thought or Reflection. A board can hold the house, the car and the habit with equal ease.',
        },
        {
          title: 'Shift the lens',
          body: 'Focus lenses -  Dream, Plan, Remember or All -  change what the board emphasizes, from pure aspiration to concrete intention to reflection on how far you have come.',
        },
        {
          title: 'Scope boards to areas or plans',
          body: 'A Personal Wellbeing area gets its own board; a specific plan inside it can have another. Vision stays attached to the area of life it belongs to.',
        },
        {
          title: 'Walk the pins into goals',
          body: 'Because boards live beside your plans, a Want is one tab away from becoming a plan with steps, deadlines and scheduled time.',
        },
      ],
    },
    screenshot: {
      src: SCREENSHOTS.visionBoard,
      alt: 'Fezer vision board with Want and Need pins including fitness, home and car goals',
      caption: 'Want and Need pins on an area\u2019s vision board -  one tab away from plans and schedule.',
    },
    useCase: {
      heading: 'Example: a wellbeing area with a vision',
      paragraphs: [
        'Your Personal Wellbeing area has plans for sleep, diet and a workout routine. Its vision board carries the reasons: a Need pin for a strong, healthy body; Want pins for the milestones that make the discipline feel worth it.',
        'During a weekly review, you open the board in the Remember lens and add a Reflection pin about the first full week of workouts. The board stops being a poster and becomes a record -  evidence that the daily blocks are moving you somewhere.',
      ],
    },
    capabilities: [
      { title: 'Typed pins', desc: 'Want, Need, Idea, Thought and Reflection -  intent is part of every pin.' },
      { title: 'Focus lenses', desc: 'Dream, Plan, Remember or All shift what the board emphasizes.' },
      { title: 'Boards per area or plan', desc: 'Vision scoped to the part of life or the specific plan it serves.' },
      { title: 'Images and text', desc: 'Freeform boards with photos, captions and notes.' },
      { title: 'Reflections strip', desc: 'Reflections accumulate into a running record of progress.' },
      { title: 'Private boards', desc: 'Your aspirations are stored on your device, not on someone\u2019s server.' },
    ],
    related: [
      { path: '/goal-planner', label: 'Turn pins into plans with steps' },
      { path: '/day-planner-app', label: 'See how vision becomes a daily plan' },
      { path: '/weekly-planner', label: 'Review your vision alongside your week' },
    ],
  },
  {
    path: '/weekly-planner',
    navLabel: 'Weekly planner',
    title: 'Weekly Planner App -  Fezer',
    metaDescription:
      'Plan your week with repeating time blocks, review it with weekly analytics and compare your plan with reality. Fezer is a weekly planner app for iPhone and iPad.',
    h1: 'Plan the week once, correct it with evidence',
    intro:
      'A week is the natural unit for improving how you spend time: long enough to show patterns, short enough to fix them. Fezer builds your week from repeating blocks and closes it with analytics that compare plan against reality.',
    problem: {
      heading: 'Why weeks fill themselves',
      paragraphs: [
        'Without a weekly structure, each day gets planned in the morning under pressure, and the urgent beats the important seven days in a row. Weekly reviews are prescribed as the cure, but most reviews run on memory -  and memory is a flattering historian.',
        'A weekly planner needs two halves: a repeatable structure that carries your intentions across the week, and an honest record to review at the end of it. Fezer supplies both from the same data.',
      ],
    },
    how: {
      heading: 'How weekly planning works in Fezer',
      lede: 'The week is built from the schedule you already keep, day by day.',
      steps: [
        {
          title: 'Build the skeleton with repeating blocks',
          body: 'Blocks repeating on Weekdays, Every Week or Every 2 Weeks form the standing structure of your week -  workouts, deep work, family time -  without re-planning each morning.',
        },
        {
          title: 'Commit plan steps across the week',
          body: 'From your plans, commit steps with Work on to claim specific slots during the week, or pin deadlines with Complete by on the days they are due.',
        },
        {
          title: 'Navigate the week day by day',
          body: 'The Schedule\u2019s day strip moves you through the week quickly, so Thursday can be adjusted on Monday when you see the collision coming.',
        },
        {
          title: 'Close the week with Analytics',
          body: 'Switch Analytics to the Week range and compare Planned against Actual, broken down by area and plan. The next week\u2019s plan starts from what this week really looked like.',
        },
      ],
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer weekly planner showing a day of the week with planned and tracked time side by side',
      caption: 'Each day of the week carries its plan and its record -  the raw material of a real weekly review.',
    },
    useCase: {
      heading: 'Example: a Sunday reset that takes ten minutes',
      paragraphs: [
        'Sunday evening, you open Analytics on the Week range. The compare view shows the plan-versus-reality picture: work absorbed its blocks and then some, while the Family area got half its planned hours -  mostly lost to a Thursday that went sideways.',
        'The correction takes two edits: the Thursday work block shrinks, and a repeating family block moves to a slot that survived every week so far. No journaling ritual, no spreadsheet -  the week critiques itself, and the plan absorbs the lesson.',
      ],
    },
    capabilities: [
      { title: 'Repeating structure', desc: 'Weekday and weekly repeats give the week a stable skeleton.' },
      { title: 'Week-range analytics', desc: 'This Week at a glance: planned, actual and the gap between them.' },
      { title: 'Plan vs. Reality', desc: 'Compare mode for any day; week analytics for the whole picture.' },
      { title: 'Area and plan breakdowns', desc: 'See which parts of life got their hours and which got squeezed.' },
      { title: 'Fast day navigation', desc: 'Move through the week\u2019s days and fix collisions before they happen.' },
      { title: 'Deadlines in place', desc: 'Complete-by pins put due dates on the exact day they matter.' },
    ],
    related: [
      { path: '/time-blocking-app', label: 'Master time blocking first' },
      { path: '/time-tracker', label: 'Track the time that feeds your weekly review' },
      { path: '/goal-planner', label: 'Give every week a goal to serve' },
    ],
  },
];
