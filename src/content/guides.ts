// Long-form guides. These target informational queries ("how to time block",
// "why do I underestimate time") rather than product queries, and they feed
// internal links to the feature and comparison pages.
//
// House rules: the advice must stand on its own without the app -- a reader who
// never installs Fezer should still leave with something usable. Product talk is
// quarantined in the `inFezer` block at the end of each guide, clearly labelled.
// No invented statistics, no fake precision; where research is referenced, it is
// described at the level of confidence we actually have.

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
};

export type GuideContent = {
  path: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  /** Slug of the pre-generated card in /public/og. */
  ogSlug: string;
  /** Small label above the h1, e.g. "Guide". */
  eyebrow: string;
  h1: string;
  intro: string;
  datePublished: string;
  readMinutes: number;
  sections: GuideSection[];
  takeaways: string[];
  /** Clearly-labelled product section at the end. */
  inFezer: {
    heading: string;
    paragraphs: string[];
    links: { path: string; label: string }[];
  };
  related: { path: string; label: string }[];
};

export const GUIDES: GuideContent[] = [
  // ---------------------------------------------------------------------------
  {
    path: '/guides/how-to-time-block',
    navLabel: 'How to time block',
    title: 'How to Time Block: A Practical Guide -  Fezer',
    metaDescription:
      'A practical guide to time blocking: how to build a day out of blocks, size them honestly, survive interruptions and use a review loop so the plan improves every week.',
    ogSlug: 'guide-how-to-time-block',
    eyebrow: 'Guide',
    h1: 'How to time block, in practice',
    intro:
      'Time blocking is simple to describe -  give every hour of the day a job before the day starts -  and easy to get wrong. This guide covers the method end to end: building the day, sizing blocks honestly, surviving contact with reality, and the review loop that most explanations leave out.',
    datePublished: '2026-08-04',
    readMinutes: 9,
    sections: [
      {
        heading: 'What time blocking actually is',
        paragraphs: [
          'A to-do list answers "what needs to be done?" A calendar answers "where do I have to be?" Time blocking answers the question between them: "what will I be doing at 10:15?" You divide the day into blocks -  usually thirty minutes to two hours -  and assign each block one job: a piece of focused work, a batch of small tasks, a meal, a commute, a rest.',
          'The defining move is that everything gets a block, not just meetings. Deep work gets a block. Email gets a block instead of leaking into every gap. Lunch gets a block so it stops being the thing that gets skipped. When the day is fully allocated, "what should I do now?" always has an answer, and the answer was chosen calmly the night before rather than under pressure at 10:14.',
        ],
      },
      {
        heading: 'Why it works when lists do not',
        paragraphs: [
          'A list has no capacity limit. It will happily accept forty items on a day with room for six, and it lets you feel productive by doing the three easiest. The pile does the choosing.',
          'A day is a fixed container. The moment you place work into hours, you are forced to confront capacity: there are only so many blocks, so putting one thing in pushes another thing out. That collision -  painful the first few times -  is the entire value. Prioritization stops being an abstract ranking exercise and becomes a concrete question: which of these two things gets Tuesday morning?',
          'Blocking also moves decisions to when you are good at them. Deciding at 9 PM what tomorrow’s deep work will be costs little; deciding at 9 AM, cold, with a full inbox, costs the best hour of the day. And a block is a commitment to one thing at a time -  a structural defence against the constant low-grade switching that fragments unstructured days.',
        ],
      },
      {
        heading: 'Step 1: Find the fixed points',
        paragraphs: [
          'Start with the parts of the day that are not up for negotiation: sleep, meals, commute, standing meetings, school pickup, training sessions. Put them in first. What remains is your actual discretionary time -  usually a smaller number than it feels like, and seeing that number honestly is the first correction time blocking makes.',
          'These fixed points are also your anchors. A day with a firm 12:30 lunch and a firm 5:30 shutdown has natural walls to build against; a day that is one undifferentiated slab from waking to midnight gives your blocks nothing to hold on to.',
        ],
      },
      {
        heading: 'Step 2: Place the blocks that matter most, first',
        paragraphs: [
          'With the anchors in place, add blocks in order of importance, not in order of time. The one or two blocks of demanding, high-value work go in first, and they go at the hours when you are actually sharp -  which you may only discover honestly after a couple of weeks of tracking. Everything else fits around them.',
          'Then batch the shallow work. Email, messages, admin and errands go into one or two dedicated blocks rather than being sprinkled through the day. A "small stuff" block at 11:30 and another at 4:00 will absorb an astonishing amount of what used to interrupt your mornings.',
        ],
        bullets: [
          'Deep work blocks: 60-120 minutes. Longer than two hours rarely survives.',
          'Shallow batches: 30-45 minutes, placed after deep work, never before.',
          'Breaks and meals: real blocks, not gaps. Unblocked breaks get eaten.',
          'Buffers: 10-15 minutes between consecutive commitments. Days without buffers fail by noon.',
        ],
      },
      {
        heading: 'Step 3: Size blocks with evidence, not hope',
        paragraphs: [
          'The fastest way to abandon time blocking is to build a day out of best-case estimates. If a report has never once taken you less than three hours, a ninety-minute block for it is not a plan -  it is a wish with a border around it, and by 11 AM the whole day behind it has collapsed.',
          'Until you have real data on yourself, use a blunt rule: take your instinctive estimate for any open-ended work and add half again. Then, as you start comparing planned days against real ones, replace the blanket rule with your actual multipliers -  most people discover their estimates for creative work run low by a consistent, correctable factor. Sizing from your own history is what eventually makes the plan trustworthy.',
        ],
      },
      {
        heading: 'Step 4: Run the day without worshipping the plan',
        paragraphs: [
          'The plan will break. Someone calls, a task overruns, energy dips. This is not failure; it is the medium. The skill is in the response: when a block breaks, you move blocks -  drag the afternoon around, shrink something, push something to tomorrow -  rather than abandoning the schedule and free-falling through the rest of the day.',
          'A useful mental posture: the plan is a default, not a contract. At any moment you either follow the current block or make a deliberate decision to change it. What you never do is drift -  the state where no decision was made and the hours simply go missing.',
        ],
      },
      {
        heading: 'Step 5: Close the loop',
        paragraphs: [
          'This is the step most time-blocking advice skips, and it is the one that makes the habit permanent. At the end of the day -  or the week -  put the plan next to what actually happened. Which blocks started late? Which ran over, and by how much? Which never happened at all? What consumed time that was never on the plan?',
          'Without this comparison, your blocks stay fictional forever and the daily failure slowly convinces you that "time blocking doesn’t work for me." With it, next week’s blocks inherit this week’s lessons: the 9:00 start becomes 9:30 because that is when you actually start; the writing block doubles because writing always doubles. The plan converges on reality, and a plan that matches reality is one you can finally trust.',
        ],
      },
      {
        heading: 'The failure modes to avoid',
        paragraphs: [
          'Almost everyone who quits time blocking quits for one of a handful of preventable reasons.',
        ],
        bullets: [
          'Blocking every minute. A day scheduled to 100% capacity fails on first contact. Leave slack -  aim to allocate roughly 70-80% of your discretionary time.',
          'No buffers. Back-to-back blocks assume teleportation and instant context switches. Fifteen unglamorous minutes between blocks keep the whole chain alive.',
          'Rebuilding from scratch daily. If you re-create the same morning routine block by block every evening, you will stop within two weeks. Routines should repeat automatically; you should only plan the exceptions.',
          'Treating drift as a character flaw. A block that never holds is a data point about the block -  wrong size, wrong hour -  not about your discipline. Fix the block.',
          'Planning without reviewing. Write-only time blocking decays into fiction. The comparison step is not optional; it is the mechanism.',
        ],
      },
    ],
    takeaways: [
      'Give every hour a job, chosen the night before -  including breaks and shallow work.',
      'Place fixed points first, then the most important deep work at your genuinely best hours.',
      'Size blocks from your own history, not best-case estimates; until you have history, add half again.',
      'When the day breaks, move blocks deliberately -  never drift.',
      'Compare the plan with what actually happened; that loop is what makes the blocks realistic over time.',
    ],
    inFezer: {
      heading: 'Doing this in Fezer',
      paragraphs: [
        'Fezer was built around exactly this loop. The Schedule tab is the day timeline: blocks are draggable, deadlines pin to the day, and repeating blocks -  daily, weekdays, weekly or biweekly -  carry your standing structure forward so you only ever plan the exceptions. The Now view holds up the current block so "follow or deliberately change" stays a one-glance decision.',
        'The review step is native rather than a spreadsheet you have to maintain: Track mode records real sessions with one tap, and Compare mode draws the planned day and the tracked day side by side on the same hours. Everything stays on your device -  no account, no cloud, free.',
      ],
      links: [
        { path: '/time-blocking-app', label: 'The time-blocking planner in detail' },
        { path: '/plan-vs-actual-time-tracking', label: 'How Compare mode closes the loop' },
      ],
    },
    related: [
      { path: '/guides/why-your-schedule-slips', label: 'Why your schedule keeps slipping' },
      { path: '/guides/weekly-review-in-10-minutes', label: 'A 10-minute weekly review that uses evidence' },
      { path: '/guides/turn-goals-into-a-schedule', label: 'Turn goals into a schedule you follow' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/guides/why-your-schedule-slips',
    navLabel: 'Why schedules slip',
    title: 'Why Your Schedule Keeps Slipping -  Fezer',
    metaDescription:
      'Your plans are not failing because of discipline. A guide to the planning fallacy, invisible transition costs and unplanned work -  and how to measure your personal estimation multiplier.',
    ogSlug: 'guide-why-your-schedule-slips',
    eyebrow: 'Guide',
    h1: 'Why your schedule keeps slipping',
    intro:
      'You plan a reasonable day, and by mid-afternoon it is fiction. The usual self-diagnosis is discipline. The actual causes are more mechanical -  and more fixable: systematic estimation bias, invisible transition costs, and a category of work your plans refuse to acknowledge exists.',
    datePublished: '2026-08-04',
    readMinutes: 8,
    sections: [
      {
        heading: 'The planning fallacy is not a personal defect',
        paragraphs: [
          'Psychologists have a name for the reliable optimism of human time estimates: the planning fallacy, described by Daniel Kahneman and Amos Tversky in the 1970s. Its signature is stubbornness. People underestimate how long their own tasks will take even when they know their previous, similar tasks ran late. The memory of every past overrun somehow never makes it into the next estimate.',
          'The mechanism matters for fixing it. When you estimate, you imagine performing the task -  and imagination produces the best-case script: the version with no interruptions, no false starts, no revision, no waiting on someone else. You are not lying to yourself about the work; you are accurately estimating a version of the work that almost never occurs.',
        ],
      },
      {
        heading: 'The inside view and the outside view',
        paragraphs: [
          'The research points at a reliable correction: stop asking "how will this task go?" (the inside view -  which triggers the best-case script) and ask instead "how long has this kind of task taken before?" (the outside view -  which consults the record).',
          'The outside view works because it silently includes everything the script omits -  the interruptions, the rabbit holes, the second draft -  without you having to predict any specific one of them. You do not need to know what will go wrong; the historical number already contains the average of everything that usually does. The catch is that the outside view needs a record to consult, which is exactly what most people do not keep about their own days.',
        ],
      },
      {
        heading: 'The invisible taxes: transitions and switches',
        paragraphs: [
          'Plans are written as if work is contiguous: 9:00-11:00, deep work, done. Real work pays taxes at every boundary. Opening the project and reloading the mental state takes time. Physically moving between contexts takes time. And after every interruption there is a re-entry cost -  attention research consistently finds that refocusing after a switch takes real minutes, not seconds, and that some residue of the previous task lingers into the next one.',
          'None of these taxes appear as line items in anyone’s plan, which is why a day of six planned hours so often yields four real ones with nothing visibly "wasted." The time went to seams between the work. A plan that acknowledges seams -  buffers between blocks, fewer and longer blocks rather than many short ones -  slips far less, not because the work got faster but because the plan stopped denying the taxes.',
        ],
      },
      {
        heading: 'Unplanned work: the day’s dark matter',
        paragraphs: [
          'Compare any planned week against the real one and a third category always appears: hours that belonged to no block at all. The favour that took the afternoon. The small emergency. The forty-minute "quick look" at something. Unplanned work is the dark matter of the schedule -  invisible in the plan, yet bending every trajectory in it.',
          'You cannot eliminate it, but you can budget for it. If your record shows roughly a quarter of each day goes to the unplanned, the honest response is to plan roughly six hours of a nine-hour day and let the reserve absorb reality. A plan at full capacity is not ambitious; it is pre-broken.',
        ],
      },
      {
        heading: 'Measure your multiplier',
        paragraphs: [
          'Here is the practical, one-week fix. Track your actual time -  just start and stop times against what you planned, no elaborate categories -  for one ordinary week. Then, for each kind of recurring work, divide actual time by planned time. That number is your personal multiplier, and for most people it is remarkably stable per category: perhaps around 1.5 for focused writing or coding, higher for anything creative or open-ended, close to 1.0 only for truly routine tasks.',
          'The multiplier converts the planning fallacy from a character judgment into an engineering constant. You do not need to become a better estimator; you need to keep estimating exactly as you do, then multiply. When the block for "write the proposal" is sized at your real historical rate, it holds -  and a schedule whose blocks hold is a schedule you start believing again.',
        ],
      },
      {
        heading: 'What to change, concretely',
        paragraphs: ['The full prescription fits in five lines.'],
        bullets: [
          'Keep a record of planned versus actual time for at least a week -  you cannot correct what you have not measured.',
          'Estimate as usual, then apply your measured multiplier per type of work.',
          'Add buffers at every boundary between commitments; prefer fewer, longer blocks.',
          'Budget explicit reserve capacity for unplanned work instead of planning at 100%.',
          'Schedule start times you have historically kept, not the ones that sound virtuous.',
        ],
      },
    ],
    takeaways: [
      'Underestimating your own tasks is a documented, universal bias -  not a discipline problem.',
      'Estimates fail because imagination produces the best-case script; the historical record includes what the script omits.',
      'Transitions, context switches and re-entry after interruptions are real costs your plan must carry as buffers.',
      'Unplanned work is a permanent category; budget reserve for it instead of pretending this week will be different.',
      'One week of tracking gives you a personal multiplier that turns estimation into arithmetic.',
    ],
    inFezer: {
      heading: 'Doing this in Fezer',
      paragraphs: [
        'Fezer exists to make the record effortless enough to actually keep. You plan the day in blocks, tap Begin and End to track real sessions as they happen, and Compare mode draws both columns on the same hours -  late starts, overruns and unplanned dark matter all become visible without a spreadsheet. Analytics then rolls the same data up by week, which is where your multipliers and your true unplanned-work budget emerge.',
        'It is free, and the record it builds about your days never leaves your device -  no account, no server.',
      ],
      links: [
        { path: '/plan-vs-actual-time-tracking', label: 'Plan vs. actual in detail' },
        { path: '/time-tracker', label: 'The one-tap time tracker' },
      ],
    },
    related: [
      { path: '/guides/how-to-time-block', label: 'How to time block, in practice' },
      { path: '/guides/weekly-review-in-10-minutes', label: 'A 10-minute weekly review that uses evidence' },
      { path: '/guides/turn-goals-into-a-schedule', label: 'Turn goals into a schedule you follow' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/guides/weekly-review-in-10-minutes',
    navLabel: 'Weekly review',
    title: 'A 10-Minute Weekly Review That Uses Evidence -  Fezer',
    metaDescription:
      'Most weekly reviews die because they run on memory and take an hour. This guide builds a ten-minute review on three questions and one rule: look at the record, change one thing.',
    ogSlug: 'guide-weekly-review',
    eyebrow: 'Guide',
    h1: 'A 10-minute weekly review that uses evidence',
    intro:
      'The weekly review is the most prescribed habit in productivity writing and one of the least kept. The versions that die share two features: they take an hour, and they run on memory. This one takes ten minutes, runs on the record, and ends with exactly one change.',
    datePublished: '2026-08-04',
    readMinutes: 7,
    sections: [
      {
        heading: 'Why weekly reviews die',
        paragraphs: [
          'The classic weekly review is a ceremony: clear every inbox, revisit every project, reflect in a journal, plan the horizon. As a quarterly exercise it is valuable. As a weekly obligation it competes with your Sunday evening -  and loses, usually by week four.',
          'The deeper problem is the data source. A review that asks "how did the week go?" is querying your memory, and memory is a genuinely unreliable witness to time. It compresses routine hours to nothing, inflates whatever was vivid or recent, and files the week under a single mood. Reviewing memory produces resolutions about feelings; only reviewing a record produces changes to a schedule.',
        ],
      },
      {
        heading: 'The precondition: a record to review',
        paragraphs: [
          'An evidence-based review needs two artifacts from the week: what you planned, and what actually happened. If you time block, the plan already exists. The record can be as light as tracked start and end times -  it does not need categories, tags or completeness. Even a record covering only your main working hours beats memory by a distance.',
          'If you have neither yet, spend one week collecting them before your first review. A review without a record is a mood with an agenda.',
        ],
      },
      {
        heading: 'Question 1: Where did the plan and the week disagree? (4 minutes)',
        paragraphs: [
          'Put the planned week next to the real one, day by day, and hunt for repeats -  single misses are noise, patterns are signal. The same block starting late every day it appears. A kind of work that overran every single time. A block that exists in the plan and simply never happened all week -  the ghost block, and it is trying to tell you something: wrong hour, wrong size, or wrong goal dressed up as a commitment.',
          'Write each pattern down in one line. Not why -  just what: "Deep work starts ~30 late." "Admin always overruns." "Friday workout: never happened."',
        ],
      },
      {
        heading: 'Question 2: What ate the unplanned time? (3 minutes)',
        paragraphs: [
          'Now look at the hours that belonged to no plan at all. Some are life being life -  noise, ignore them. What you are looking for is recurring unplanned time: the same person, the same kind of favour, the same afternoon leak appearing week after week.',
          'Recurring unplanned time is a category your plan refuses to acknowledge. The fix is never resentment; it is a block. If helping your colleague reliably consumes three hours a week, a standing "help" block converts dark matter into schedule -  same hours, but now they are chosen, bounded, and no longer detonating your afternoons at random.',
        ],
      },
      {
        heading: 'Question 3: What one thing changes next week? (3 minutes)',
        paragraphs: [
          'One. The reviews that die are the ones that end with seven resolutions; seven changes cannot be attributed, and by Wednesday none of them are alive. Pick the pattern with the best ratio of annoyance to effort and make the smallest edit that addresses it: move the 9:00 block to 9:30, since 9:30 is when you demonstrably start. Double the admin block. Move Friday’s workout to the slot that survived every other day.',
          'Note the change somewhere you will see it next Sunday. That is the whole output: one line of diagnosis, one edit to the schedule. Next week’s review opens by checking whether the edit worked -  which is the moment the loop becomes compound interest.',
        ],
      },
      {
        heading: 'Keeping it at ten minutes',
        paragraphs: [
          'Give the review itself a repeating block -  ten minutes, same slot every week, typically Sunday evening or Friday shutdown. When the timer ends, stop; an unfinished review that happens every week is worth more than a thorough one that happens twice a quarter.',
          'And hold the posture that makes the whole thing sustainable: the review is calibration, not judgment. A week where the plan and reality diverged badly is not a failed week -  it is a well-documented one, and next week inherits the documentation.',
        ],
        bullets: [
          'Ten minutes, timeboxed, same slot weekly -  put a repeating block on it.',
          'Record first: no review without a plan and a track to compare.',
          'Patterns over incidents: only act on what repeated.',
          'One change per week, small enough to attribute.',
          'Open each review by checking last week’s change.',
        ],
      },
    ],
    takeaways: [
      'Reviews die from length and from running on memory; cap the time and review the record instead.',
      'Three questions: where did plan and reality disagree, what ate the unplanned time, what one thing changes.',
      'Recurring unplanned time is a missing category -  give it a block instead of resenting it.',
      'End with exactly one small, attributable change to next week’s schedule.',
      'Check last week’s change first; that is what turns review into a compounding loop.',
    ],
    inFezer: {
      heading: 'Doing this in Fezer',
      paragraphs: [
        'Fezer generates both review artifacts as a by-product of using it: the planned week exists because you block your days, and the record exists because tracking is one tap. Compare mode answers Question 1 visually -  planned and actual, day by day on the same hours -  and Analytics on the Week range rolls time up by area and plan, which is where recurring unplanned hours and starved life areas show themselves.',
        'The review itself fits in a ten-minute repeating block, and everything involved stays on your device.',
      ],
      links: [
        { path: '/weekly-planner', label: 'The weekly planner in detail' },
        { path: '/plan-vs-actual-time-tracking', label: 'How Compare mode works' },
      ],
    },
    related: [
      { path: '/guides/how-to-time-block', label: 'How to time block, in practice' },
      { path: '/guides/why-your-schedule-slips', label: 'Why your schedule keeps slipping' },
      { path: '/guides/turn-goals-into-a-schedule', label: 'Turn goals into a schedule you follow' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/guides/turn-goals-into-a-schedule',
    navLabel: 'Goals to schedule',
    title: 'How to Turn Goals into a Schedule You Actually Follow -  Fezer',
    metaDescription:
      'Written goals stall because no step ever gets a time. A guide to decomposing goals into schedulable steps, committing them to real hours, and auditing which goals actually receive time.',
    ogSlug: 'guide-turn-goals-into-a-schedule',
    eyebrow: 'Guide',
    h1: 'How to turn goals into a schedule you actually follow',
    intro:
      'Almost nobody fails at goals for lack of ambition or clarity of vision. Goals fail in a narrower place: the gap between the written goal and any particular Tuesday. This guide is about closing that gap -  decomposition, commitment to real hours, and the audit that keeps you honest.',
    datePublished: '2026-08-04',
    readMinutes: 8,
    sections: [
      {
        heading: 'Where goals actually fail',
        paragraphs: [
          'The typical goal lives in a notes app: well-phrased, reviewed in January, rediscovered with a wince in November. Between those two dates it generated no behaviour -  not because it was a bad goal, but because a written goal is an artifact, and artifacts do not compete for time. Your calendar competes for time. Whatever is on it wins by default, every day, against everything that is not.',
          'So the test of a goal system is brutally simple: does the goal ever become an appointment? If no specific step of it ever occupies a specific hour of a specific day, the goal has no interface with your life -  it is decoration with a deadline.',
        ],
      },
      {
        heading: 'Write the ending before the steps',
        paragraphs: [
          'Before decomposing anything, write two sentences: why this goal exists, and what the world looks like when it is done. "Get fit" cannot be scheduled or finished. "Run three sessions a week, sustained for three months" can be both -  you can point at the week it becomes true.',
          'The written end state does quiet work later. Months in, when the goal has become a grind of steps, it is the thing that answers "why am I doing this?" -  and it is the referee that lets you declare a goal genuinely accomplished and closed, rather than letting everything drift on forever at eighty percent.',
        ],
      },
      {
        heading: 'Decompose until steps are schedulable',
        paragraphs: [
          'The unit that bridges goal and calendar is the step, and a step is defined by one property: you could put it in a time block without further thinking. "Improve the website" is not a step -  faced with it at 9 AM, you would have to start planning, and planning at execution time is where momentum dies. "Draft the pricing page copy" is a step.',
          'A practical decomposition rule: keep splitting until each step fits inside one to three of your real working blocks, and always know the next physical action for every active goal. You do not need the full path mapped to the end -  the first three steps, genuinely schedulable, beat a thirty-step plan you had to invent upfront and will rewrite anyway.',
        ],
      },
      {
        heading: 'Commit steps to hours: the if-then bridge',
        paragraphs: [
          'A large body of research on what psychologists call implementation intentions points the same direction: people who decide in advance when and where they will act -  "if it is Tuesday at 7 AM, then I train" -  follow through at meaningfully higher rates than people with identical goals and no trigger. The decision is pre-made, so the moment needs no motivation, only compliance with an appointment.',
          'A schedule is exactly this device. Committing a step means one of two things: it gets a deadline pinned to a real day, or it gets a block of time -  once, or repeating for as long as the goal needs. The repeating form is the strongest move available: a goal with a standing block no longer depends on being remembered, chosen or felt like. It happens the way lunch happens.',
        ],
      },
      {
        heading: 'Audit hours, not intentions',
        paragraphs: [
          'Every goal competes with every other goal -  and with your job, family and sleep -  for the same twenty-four hours. Most goal systems hide this competition; a schedule surfaces it. There is one honest metric for how much you are pursuing a goal, and it is not enthusiasm: it is hours received in the last week.',
          'Run the audit weekly, per area of life. Goals sorted by actual hours received produce uncomfortable, useful facts: the goal you talk about most got ninety minutes this month; an area of your life got zero. Then either recommit -  give the starved goal a standing block that survives contact with your real week -  or retire it honestly. A consciously parked goal costs nothing; a phantom goal that is "active" but never receives an hour quietly corrodes the whole system.',
        ],
      },
      {
        heading: 'Keep the vision where the work happens',
        paragraphs: [
          'Steps and blocks are deliberately mundane -  that is what makes them executable. The risk of a fully proceduralized goal is forgetting what it was for, at which point the standing block becomes one more chore to skip. The antidote is keeping the reason physically near the plan: the image of the finish line, the sentence about why, the photo from the week it started working.',
          'This is the legitimate core of the much-mocked vision board. As decoration, divorced from any plan, a board is a poster. Attached to the goal it motivates -  reviewed in the same session where you look at the hours -  it is the emotional battery of the system, and reflections added along the way turn it into a record that the grind is moving something.',
        ],
        bullets: [
          'Two or three active goals per area of life, maximum -  attention divides badly.',
          'Every active goal has a known next step sized for one to three blocks.',
          'Prefer standing repeating blocks over weekly re-negotiation.',
          'Weekly: sort goals by hours actually received; recommit or retire the starved ones.',
          'Keep the written end state and the vision one glance from the schedule.',
        ],
      },
    ],
    takeaways: [
      'A goal only exists operationally once a specific step occupies a specific hour.',
      'Write the end state first -  it defines both the finish line and the reason.',
      'Decompose until each step fits in one to three blocks with no thinking left.',
      'Pre-deciding when and where you act -  the if-then commitment -  is the best-supported trick in behaviour change; a repeating block is its strongest form.',
      'Audit goals by hours received, not by enthusiasm; recommit or retire, never haunt.',
    ],
    inFezer: {
      heading: 'Doing this in Fezer',
      paragraphs: [
        'This guide is close to a description of Fezer’s goal layer. Areas hold the areas of your life; each goal records why it began and what the end looks like, with ordered steps between. Commit turns a step into schedule -  "Complete by" pins a deadline, "Work on" claims a block, once or repeating. Tracked time attaches to goals, so weekly Analytics is precisely the hours-received audit, and every area and goal carries its own vision board with reflection pins.',
        'All of it is on-device: no account and no server. Planning and tracking are free forever; Compare and Analytics are Fezer Plus.',
      ],
      links: [
        { path: '/goal-planner', label: 'The goal planner in detail' },
        { path: '/vision-board-app', label: 'Vision boards connected to goals' },
      ],
    },
    related: [
      { path: '/guides/how-to-time-block', label: 'How to time block, in practice' },
      { path: '/guides/weekly-review-in-10-minutes', label: 'A 10-minute weekly review that uses evidence' },
      { path: '/guides/why-your-schedule-slips', label: 'Why your schedule keeps slipping' },
    ],
  },
];
