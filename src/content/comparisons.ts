// Comparison and problem-led landing pages.
//
// These are deliberately kept separate from FEATURE_PAGES. Feature pages target
// broad category terms ("day planner app") that a young domain cannot realistically
// win yet. The pages below target lower-competition, higher-intent queries:
// alternative/comparison searches and specific-problem searches where the
// searcher already knows what they want.
//
// House rule for the comparison pages: every claim about another product must be
// verifiable from that product's own App Store listing or website, and the
// comparison must name things the other product does better. Overstating a
// competitor's weaknesses is both dishonest and a liability.
import { SCREENSHOTS } from '../seo/constants';

export type ComparisonRow = {
  capability: string;
  /** How the compared product handles it. Null renders as "not offered". */
  them: string | null;
  /** How Fezer handles it. Null renders as "not offered" -- used deliberately,
   *  since a comparison table that never concedes a row is not credible. */
  us: string | null;
};

export type ComparisonPageContent = {
  path: string;
  /** Short label used in footer / related-link lists. */
  navLabel: string;
  title: string;
  metaDescription: string;
  /** Slug of the pre-generated card in /public/og. */
  ogSlug: string;
  h1: string;
  intro: string;
  /** Optional honest framing shown directly under the hero. */
  fairness?: {
    heading: string;
    paragraphs: string[];
  };
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  table?: {
    heading: string;
    lede: string;
    /** Column header for the compared product. */
    themLabel: string;
    rows: ComparisonRow[];
    footnote: string;
  };
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  verdict: {
    heading: string;
    /** Who genuinely should not pick Fezer. Builds trust and reduces bad installs. */
    chooseThem: { label: string; points: string[] };
    chooseUs: { label: string; points: string[] };
  };
  faq: { q: string; a: string }[];
  related: { path: string; label: string }[];
};

export const COMPARISON_PAGES: ComparisonPageContent[] = [
  // ---------------------------------------------------------------------------
  {
    path: '/structured-alternative',
    navLabel: 'vs Structured',
    title: 'Structured Alternative for iPhone -  Fezer',
    metaDescription:
      'Looking for a Structured alternative? Fezer plans your day in time blocks like Structured, then tracks the day and shows planned time against actual time. Free to plan and track, no account, on iPhone, iPad and Android.',
    ogSlug: 'structured-alternative',
    h1: 'A Structured alternative that also records how the day went',
    intro:
      'Structured is a genuinely good visual day planner, and for a lot of people it is the right answer. Fezer overlaps with it on time blocking, then adds the part most planners leave out: tracking what actually happened and putting it next to the plan.',
    fairness: {
      heading: 'Where Structured is stronger',
      paragraphs: [
        'Structured has been shipping since 2020, has well over a hundred thousand App Store ratings, and runs on iPhone, iPad, Apple Watch and Mac with iCloud sync between them. It is localised into more than two dozen languages, has serious accessibility work behind it, and its paid tier connects Google, Apple and Outlook calendars plus Reminders. If you need your planner on your wrist and your desktop, or you need your existing calendars pulled in automatically, Structured does things Fezer does not do today.',
        'Fezer is new, has no collaboration or integrations, and deliberately does not sync anywhere. Those are real trade-offs, and they are the direct consequence of the design choice described below.',
      ],
    },
    sections: [
      {
        heading: 'The gap both apps start from',
        paragraphs: [
          'A visual timeline is a big improvement over a list. You stop staring at twenty undifferentiated tasks and start seeing a day with a shape. Structured does this well and Fezer does it too.',
          'But a timeline is still only a statement of intent. It shows the day you meant to have. Once the day is over, the plan is either quietly edited to match what happened or abandoned, and either way the information that would have made tomorrow’s plan better is gone.',
        ],
      },
      {
        heading: 'What Fezer adds: a second column',
        paragraphs: [
          'Fezer’s Schedule has three modes. Plan is the timeline you would recognize from Structured. Track records what you actually did -  one tap to begin, checkpoints along the way, one tap to end. Compare puts the two side by side in the same view, hour for hour.',
          'That third mode is the whole point. When you can see that "Deep work, 9:00-11:00" reliably starts at 9:40 and ends at 10:20, you stop writing two-hour blocks you never honour. The plan gets calibrated by evidence rather than by how you felt about last week.',
        ],
      },
      {
        heading: 'Goals that claim real hours',
        paragraphs: [
          'Fezer also carries a planning layer that sits above the day. You organize work into areas, break each into plans and steps, then commit a step directly onto the schedule as a block. The chain runs plan to step to a specific hour on a specific day, and the time you spend on it is tracked against it.',
          'The effect is that your goals compete for hours in a visible way, instead of living in a separate list that never touches the calendar.',
        ],
      },
      {
        heading: 'Privacy is a design constraint, not a setting',
        paragraphs: [
          'Fezer has no accounts and no server. There is nothing to sign up for, and your schedule, plans, notes and attachments never leave the device. That is why there is no sync: there is nowhere for the planner data to sync to.',
          'This is a genuine trade-off rather than a straight upgrade. You gain a planner that cannot leak, and you give up multi-device continuity. If continuity matters more to you, Structured’s iCloud sync is the better fit and you should use it.',
        ],
      },
    ],
    table: {
      heading: 'Feature comparison',
      lede: 'Structured details are taken from its App Store listing and its own site as of July 2026. Both apps are free to download; Structured sells a Pro subscription, Fezer sells Fezer Plus for Compare, Analytics and unlimited plans.',
      themLabel: 'Structured',
      rows: [
        {
          capability: 'Visual day timeline',
          them: 'Yes -  drag-and-drop timeline, colours and icons',
          us: 'Yes -  draggable time blocks with deadline pins',
        },
        {
          capability: 'Repeating routines',
          them: 'Structured Pro',
          us: 'Free -  daily, weekdays, weekly or biweekly',
        },
        {
          capability: 'Calendar import (Google, Apple, Outlook)',
          them: 'Structured Pro',
          us: null,
        },
        {
          capability: 'Time tracking of what you actually did',
          them: null,
          us: 'Yes -  one-tap sessions with checkpoints',
        },
        {
          capability: 'Planned vs. actual comparison',
          them: null,
          us: 'Yes -  Compare mode, side by side',
        },
        {
          capability: 'Plans broken into steps and scheduled',
          them: 'Sub-tasks within a task',
          us: 'Areas, plans and steps committed onto the day',
        },
        {
          capability: 'Vision board',
          them: null,
          us: 'Yes -  boards per plan and life area',
        },
        {
          capability: 'Focus / Pomodoro timer',
          them: 'Yes -  focus timer free, timed intervals in Pro',
          us: 'Tracked sessions rather than a fixed Pomodoro cycle',
        },
        {
          capability: 'AI planning assistance',
          them: 'Structured Pro',
          us: null,
        },
        {
          capability: 'Apple Watch and Mac apps',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Sync across devices',
          them: 'Yes -  via iCloud',
          us: null,
        },
        {
          capability: 'Account required',
          them: 'No account needed to start',
          us: 'No account, ever',
        },
        {
          capability: 'Data stored off-device',
          them: 'Yes -  iCloud sync, calendar connections',
          us: 'No -  everything stays on your device',
        },
        {
          capability: 'Price',
          them: 'Free tier plus Pro subscription',
          us: 'Free to plan and track; Plus from $5.99/mo',
        },
      ],
      footnote:
        'Both products change often. If something here has gone out of date, tell us through the feedback link in the footer and we will correct it.',
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer Compare mode showing planned time blocks in one column and tracked time in another',
      caption: 'Compare mode -  the planned day and the tracked day in the same view.',
    },
    verdict: {
      heading: 'Which one should you actually use?',
      chooseThem: {
        label: 'Stay with Structured if',
        points: [
          'You want your planner on Apple Watch or Mac as well as iPhone.',
          'You need Google, Apple or Outlook calendar events pulled in automatically.',
          'You want AI to draft your schedule and reschedule what you missed.',
          'You use the app in a language other than English.',
          'Syncing across devices matters more to you than keeping data off servers.',
        ],
      },
      chooseUs: {
        label: 'Try Fezer if',
        points: [
          'You want to know where your hours actually went, not just where you meant to send them.',
          'Your time blocks keep drifting and you want a feedback loop that fixes them.',
          'You want goals that claim real hours on a real day.',
          'You would rather your plans never left your device.',
          'You want repeating routines without paying for them.',
        ],
      },
    },
    faq: [
      {
        q: 'Is Fezer free?',
        a: 'Partly. Planning your day and tracking it are free forever, with no account and no ads -  repeating blocks, deadline pins, one-tap tracking with checkpoints and the schedule timeline all sit in the free tier. Compare, Analytics, the list and month views and unlimited areas, plans and steps are Fezer Plus, at $5.99 a month or $55.99 a year with a week free on the yearly plan.',
      },
      {
        q: 'Can Fezer import my Google or Apple Calendar?',
        a: 'Not today. Fezer does not connect to external calendars, because it has no server component and does not request access to your calendar accounts. If automatic calendar import is essential to you, Structured Pro handles it well.',
      },
      {
        q: 'Does Fezer sync between my devices?',
        a: 'No. Fezer stores everything locally on each device and never sends it anywhere, so there is no sync between devices. This is deliberate -  it is the same design decision that means your data cannot be exposed by a server breach.',
      },
      {
        q: 'What does Compare mode actually show?',
        a: 'Two columns for the same day: the blocks you planned, and the sessions you actually tracked, aligned on the same hourly timeline. You can see which blocks started late, which ran over and which never happened.',
      },
      {
        q: 'Can I switch from Structured to Fezer easily?',
        a: 'There is no automatic import. Most people rebuild their recurring blocks once -  a morning routine, standing focus blocks, regular commitments -  which takes a few minutes, and repeating blocks carry them forward from then on.',
      },
      {
        q: 'Is Fezer available on Android?',
        a: 'Yes. Fezer is on Google Play, and the Android app carries the same planning, tracking and Compare loop as the iPhone one. There is no Mac app and no web version, because everything is stored on the device.',
      },
    ],
    related: [
      { path: '/time-blocking-app', label: 'How time blocking works in Fezer' },
      { path: '/plan-vs-actual-time-tracking', label: 'See planned time against actual time' },
      { path: '/offline-planner-app', label: 'Why Fezer keeps everything on your device' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/offline-planner-app',
    navLabel: 'Offline & private',
    title: 'Offline Day Planner App for iPhone -  No Account -  Fezer',
    metaDescription:
      'Fezer is an offline day planner for iPhone, iPad and Android. No account, no sign-up and no cloud sync. Your schedule, plans and notes stay on your device.',
    ogSlug: 'offline-planner-app',
    h1: 'A planner with no account, no cloud and nothing of yours on a server',
    intro:
      'Most planner apps want an email address before they will show you a calendar. Fezer does not have accounts at all. You install it, you open it, you plan. Nothing you write is transmitted anywhere, because there is nowhere for it to go.',
    sections: [
      {
        heading: 'What "no account" actually means here',
        paragraphs: [
          'It is not a privacy mode you switch on, or a paid tier. Fezer has no authentication system and no cloud copy of your schedule. There is no user table of your day, because your plans never leave the device.',
          'The practical consequences: nothing to sign up for, nothing to log into, no password to lose, no session to expire, and no company database that can be breached with your schedule in it.',
        ],
      },
      {
        heading: 'It works with the network off',
        paragraphs: [
          'Because nothing needs a server, Fezer works exactly the same on a plane, on the underground, in a dead zone or with the device in airplane mode for a week. There is no offline mode with reduced functionality and no queue of changes waiting to sync.',
          'Your schedule, tracked sessions, plans, notes, photos and file attachments are all read from and written to local storage on the device.',
        ],
      },
      {
        heading: 'Your day is unusually revealing data',
        paragraphs: [
          'A full calendar is one of the more sensitive things you can hand to a company. It shows where you are and when, who you meet, what you are working on, how you sleep, when you exercise, when you see a doctor, and what you are trying to change about your life.',
          'That data is routinely used for advertising profiles, sold through data brokers, requested by third parties, and exposed in breaches. The most reliable way to keep a schedule private is for it never to be uploaded in the first place.',
        ],
      },
      {
        heading: 'The honest trade-offs',
        paragraphs: [
          'Keeping everything on-device costs you real conveniences, and it would be misleading to pretend otherwise. There is no sync between your iPhone and your iPad. There is no web version. There is no automatic import of your Google or Outlook calendar. If you lose the device without a backup, the data goes with it -  though an encrypted iPhone backup does capture it.',
          'If those trade-offs are unacceptable for how you work, a cloud planner is the better tool and you should use one. Fezer is built for people who would rather give up sync than give up custody of their calendar.',
        ],
      },
      {
        heading: 'What Fezer does with the privacy it buys you',
        paragraphs: [
          'Because the data never leaves, Fezer can be relaxed about how much of it you keep. Track every session with checkpoints, attach photos and documents to steps, keep long notes on plans, build vision boards -  none of it increases your exposure, because none of it is uploaded.',
          'The website you are reading uses Google Analytics, which is separate from the app. The app sends anonymous product analytics, crash reports and masked session recordings so we can keep it working. Those events do not include your schedule, notes or photos. Details are in the Privacy Policy.',
        ],
      },
    ],
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer running a full day schedule on iPhone with no account and no network connection',
      caption: 'A full planner, tracker and goal system with nothing stored off the device.',
    },
    verdict: {
      heading: 'Is an offline planner right for you?',
      chooseThem: {
        label: 'Use a cloud planner if',
        points: [
          'You need the same schedule on a phone, a laptop and a browser.',
          'You share calendars with a team, a partner or an assistant.',
          'You want existing Google or Outlook events imported automatically.',
          'You would rather trust a provider’s backups than manage your own.',
        ],
      },
      chooseUs: {
        label: 'Use Fezer if',
        points: [
          'You do not want to create yet another account.',
          'Your calendar contains things you would not want on someone else’s server.',
          'You want an app that works identically with no signal.',
          'You are tired of productivity apps that mine the data you feed them.',
          'You want it to be free without being the product.',
        ],
      },
    },
    faq: [
      {
        q: 'Does Fezer need an internet connection?',
        a: 'Planning, tracking and your plans work with the network off. A small number of anonymous diagnostic events wait on the device and send when a connection is available. They are not required for the app to run.',
      },
      {
        q: 'Do I have to create an account to use Fezer?',
        a: 'No. Fezer has no accounts, no sign-up and no login. You install the app and start planning immediately.',
      },
      {
        q: 'Where is my data stored?',
        a: 'Your schedule, tracked time, plans, steps, notes, photos and attachments stay in local storage on your phone or tablet and are never uploaded. The app also sends anonymous product analytics so we can keep it working. Those events do not include what you wrote.',
      },
      {
        q: 'Does Fezer track my usage or show ads?',
        a: 'There are no ads, and we do not sell your data or use it to advertise other products to you. The app does send anonymous product analytics, crash reports and masked session recordings to help us improve Fezer. On Android, Google Analytics for Firebase may also read the advertising ID to attribute an install. Details are in the Privacy Policy.',
      },
      {
        q: 'What happens to my data if I delete the app?',
        a: 'Your planner data is deleted with the app, because that is the only place it lives. Uninstalling also stops further analytics from that install. If you want us to delete analytics we already hold, write to hello@fezer.app.',
      },
      {
        q: 'Can I back up or move my data to a new phone?',
        a: 'On iPhone and iPad, Fezer data is included in a standard encrypted backup through iCloud Backup or Finder, so restoring a device restores your planner. On Android the app does not take part in Google Auto Backup. There is no live sync between two devices in use at the same time.',
      },
    ],
    related: [
      { path: '/day-planner-app', label: 'See Fezer as a full day planner' },
      { path: '/structured-alternative', label: 'How Fezer compares with Structured' },
      { path: '/privacypolicy', label: 'Read the full privacy policy' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/plan-vs-actual-time-tracking',
    navLabel: 'Plan vs. actual',
    title: 'Planned vs. Actual Time Tracking on iPhone -  Fezer',
    metaDescription:
      'Fezer shows the day you planned next to the day you actually had. Time block your schedule, track real sessions, then compare planned time against actual time to fix your estimates.',
    ogSlug: 'plan-vs-actual-time-tracking',
    h1: 'Put the day you planned next to the day you had',
    intro:
      'Planners tell you what you intended. Time trackers tell you what happened. Almost nothing puts the two in the same view -  which is exactly where the useful information lives. Fezer’s Compare mode is built around that gap.',
    sections: [
      {
        heading: 'Why plans stop working after a week',
        paragraphs: [
          'The usual failure is not laziness, it is calibration. You block ninety minutes for something that reliably takes three hours. You schedule deep work at 9:00 when you have never once started before 9:40. You leave no gap between commitments because on paper they fit exactly.',
          'None of that is visible from the plan alone, and it is not visible from a time tracker alone either. It only appears when the intended day and the real day are drawn on the same axis.',
        ],
      },
      {
        heading: 'How the loop works',
        paragraphs: [
          'Plan mode is where you lay the day out in blocks, with repeating blocks carrying your routines forward. Track mode records reality -  tap Begin to start a session, add checkpoints as the work changes shape, tap End and the session lands on the timeline as a tracked block.',
          'Compare mode then draws both columns against the same hours. Planned on one side, tracked on the other. Overruns, late starts, blocks that never happened and work that was never planned at all are all immediately legible.',
        ],
      },
      {
        heading: 'What the comparison tends to reveal',
        paragraphs: [
          'Three patterns show up for almost everyone. Setup and transition time is invisible in planning and substantial in reality. Estimates for creative or open-ended work are wrong by a consistent multiple rather than randomly. And the work that quietly consumes the day is usually work that was never on the plan.',
          'Once you can see your own multiplier, estimating stops being guesswork. A block you would have written as an hour becomes ninety minutes because you have a week of evidence saying so.',
        ],
      },
      {
        heading: 'Analytics across days and weeks',
        paragraphs: [
          'Single days are noisy. Fezer’s Analytics view aggregates tracked time by area and by plan across a day or a week, so you can see where the hours are really going at a level above individual blocks.',
          'This is where the planning layer pays off: because steps are committed onto the schedule and tracked against their goal, you get an honest read on which goals are actually receiving time and which have been getting intentions.',
        ],
      },
      {
        heading: 'Not a timesheet',
        paragraphs: [
          'This is deliberately not billing software. There are no clients, no invoices, no rates, no exports for a manager and no team dashboards. Nobody else sees any of it, because it never leaves your device.',
          'The only audience for the comparison is you, and the only purpose is making the next plan more accurate than the last one.',
        ],
      },
    ],
    screenshot: {
      src: SCREENSHOTS.timeTracker,
      alt: 'Fezer time tracker with a running session and the planned block it belongs to',
      caption: 'One tap starts a tracked session; it lands beside the block you planned.',
    },
    verdict: {
      heading: 'Who this is for',
      chooseThem: {
        label: 'Probably not for you if',
        points: [
          'You need to bill clients or produce timesheets for an employer.',
          'You want a team to share tracked time with.',
          'You want tracking to happen automatically in the background.',
          'You are looking for a pure to-do list rather than a schedule.',
        ],
      },
      chooseUs: {
        label: 'Worth trying if',
        points: [
          'Your time estimates are consistently wrong and you want to know by how much.',
          'You already time block but the blocks have drifted into fiction.',
          'You suspect a large part of your week goes somewhere you cannot name.',
          'You want the feedback loop without handing your schedule to a server.',
        ],
      },
    },
    faq: [
      {
        q: 'What is planned vs. actual time tracking?',
        a: 'It is comparing the time you scheduled for something against the time it actually took. Rather than only recording hours, you record them against an intention, which turns tracking into feedback you can plan with.',
      },
      {
        q: 'Does Fezer track my time automatically?',
        a: 'No. Sessions start and stop when you tap Begin and End. Automatic tracking requires monitoring what you are doing, which would mean collecting far more about you than Fezer is willing to collect.',
      },
      {
        q: 'What are checkpoints?',
        a: 'Notes you add inside a running session to mark that the work changed shape -  finished a draft, got interrupted, switched to something else. They give a long session internal structure so you can see how it actually unfolded.',
      },
      {
        q: 'Can I see planned against actual time for a whole week?',
        a: 'Yes. Compare mode works day by day, and the Analytics view aggregates tracked time by area and by plan across a day or a week.',
      },
      {
        q: 'Is this the same as a Pomodoro timer?',
        a: 'No. A Pomodoro timer imposes a fixed cycle of work and break intervals. Fezer records sessions of whatever length actually happened, so the record reflects your real working rhythm rather than a prescribed one.',
      },
      {
        q: 'Can I export my tracked time?',
        a: 'Not currently. Fezer is built as a personal feedback loop rather than a reporting tool, and everything stays on the device.',
      },
    ],
    related: [
      { path: '/time-tracker', label: 'How the personal time tracker works' },
      { path: '/time-blocking-app', label: 'Build the day out of time blocks' },
      { path: '/structured-alternative', label: 'How Fezer compares with Structured' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/sunsama-alternative',
    navLabel: 'vs Sunsama',
    title: 'Sunsama Alternative for iPhone -  Fezer',
    metaDescription:
      'Looking for a Sunsama alternative? Fezer keeps the part that matters -  planning your day and tracking it -  free forever, on iPhone, iPad and Android, with no account and no trial clock.',
    ogSlug: 'sunsama-alternative',
    h1: 'The Sunsama loop, without the subscription or the servers',
    intro:
      'Sunsama is one of the few planners that takes the same idea seriously as Fezer: a day should be planned deliberately and then checked against what actually happened. The difference is who each app is built for, where your data lives, and what it costs.',
    fairness: {
      heading: 'Where Sunsama is stronger',
      paragraphs: [
        'Sunsama is a mature product built for professionals. It runs on iPhone, Android, Mac, Windows, Linux and the web, and its whole premise is pulling your working life into one place: more than twenty integrations bring in tasks from tools like Asana, ClickUp, Trello and Todoist alongside your Google and Outlook calendars. Its guided daily planning ritual -  set a realistic workload, timebox it onto the calendar, review at the end -  is genuinely well designed, and a focus mode can mute distracting apps while you work.',
        'Fezer does none of that aggregation. It is a phone and tablet app with no integrations, no desktop version and no guided ritual. If your day is spread across work tools and a desk, Sunsama is built for exactly that and Fezer is not.',
      ],
    },
    sections: [
      {
        heading: 'The idea both apps agree on',
        paragraphs: [
          'Most planners stop at intention. Sunsama and Fezer both go one step further: they treat the plan as a hypothesis and the day as the experiment. Sunsama shows you where your time actually went against what you planned; Fezer’s Compare mode draws the planned day and the tracked day side by side on the same timeline.',
          'That shared conviction is why this page exists. If you were drawn to Sunsama because of the planned-versus-actual loop, Fezer is one of the few places you will find the same loop -  implemented differently, for a different situation.',
        ],
      },
      {
        heading: 'Built for a workday vs. built for a whole life',
        paragraphs: [
          'Sunsama’s centre of gravity is professional work. It assumes a desk, a calendar full of meetings, and tasks scattered across team tools -  and it earns its keep by unifying them. The ritual language is about workload, burnout and finishing the workday cleanly.',
          'Fezer’s centre of gravity is the whole day. Its planning layer organizes life into areas -  health, family, work, projects -  each with plans, steps and its own vision board, and steps get committed onto the same timeline as everything else. Training for a race and shipping a project claim hours from the same day, and the analytics show which areas actually received time.',
        ],
      },
      {
        heading: 'The subscription question',
        paragraphs: [
          'Sunsama is subscription software with a fourteen-day free trial and no permanent free tier. That is not a criticism: it runs servers, maintains twenty-plus integrations and syncs your data across six platforms, and subscriptions are the honest way to pay for that.',
          'Fezer is free to plan and track, with no ads -  and the shape of the pricing is structural rather than promotional. There are no servers to pay for, because there is nothing to sync and nothing to integrate. You are not getting a teaser version of a paid product; you are getting an app whose design removed its own running costs.',
        ],
      },
      {
        heading: 'Where your data lives',
        paragraphs: [
          'To do its job, Sunsama has to hold your data: an account, your tasks, and connections into your calendars and work tools. For a work aggregator that is a reasonable trade, and Sunsama is upfront about it.',
          'Fezer makes the opposite trade. No account, no server, nothing transmitted -  your schedule, tracked sessions, plans and vision boards exist only on your device. The cost is real: no sync, no web version, no pulling in your calendar. If custody of your data matters more than convergence of your tools, that is the trade Fezer is built around.',
        ],
      },
    ],
    table: {
      heading: 'Feature comparison',
      lede: 'Sunsama details are taken from its own website as of August 2026. Sunsama offers a 14-day free trial and then requires a subscription; Fezer is free to plan and track, with Fezer Plus for Compare, Analytics and unlimited plans.',
      themLabel: 'Sunsama',
      rows: [
        {
          capability: 'Guided daily planning ritual',
          them: 'Yes -  a signature guided flow for planning a realistic day',
          us: 'No guided flow -  you lay out blocks yourself',
        },
        {
          capability: 'Timeboxing on a visual timeline',
          them: 'Yes -  drag tasks onto the calendar',
          us: 'Yes -  draggable time blocks with deadline pins',
        },
        {
          capability: 'Planned vs. actual time',
          them: 'Yes -  analytics on where time went vs. the plan',
          us: 'Yes -  Compare mode, side by side on one timeline',
        },
        {
          capability: 'Pulls in tasks from other tools (Asana, Trello, ClickUp...)',
          them: 'Yes -  20+ integrations',
          us: null,
        },
        {
          capability: 'Calendar integrations (Google, Outlook)',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Focus mode',
          them: 'Yes -  can mute distracting apps',
          us: 'Tracked sessions with checkpoints instead',
        },
        {
          capability: 'Plans broken into steps and scheduled',
          them: 'Weekly goals and objectives',
          us: 'Areas, plans and steps committed onto the day',
        },
        {
          capability: 'Vision board',
          them: null,
          us: 'Yes -  boards per plan and life area',
        },
        {
          capability: 'Platforms',
          them: 'iPhone, Android, Mac, Windows, Linux, web',
          us: 'iPhone, iPad and Android',
        },
        {
          capability: 'Sync across devices',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Account required',
          them: 'Yes',
          us: 'No account, ever',
        },
        {
          capability: 'Data stored off-device',
          them: 'Yes -  accounts, sync and integrations require it',
          us: 'No -  everything stays on your device',
        },
        {
          capability: 'Price',
          them: 'Subscription after a 14-day trial; no free tier',
          us: 'Free to plan and track; Plus from $5.99/mo',
        },
      ],
      footnote:
        'Both products change often. If something here has gone out of date, tell us through the feedback link in the footer and we will correct it.',
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer Compare mode showing the planned day beside the tracked day on one timeline',
      caption: 'The loop Sunsama users know -  plan the day, then face what actually happened.',
    },
    verdict: {
      heading: 'Which one should you actually use?',
      chooseThem: {
        label: 'Stay with Sunsama if',
        points: [
          'Your tasks live in Asana, Trello, ClickUp or Todoist and you need them pulled into one place.',
          'You plan at a desk and want the same planner on Mac, Windows or the web.',
          'The guided daily ritual is what keeps you consistent.',
          'You need Google or Outlook calendar events inside your plan.',
          'A work-focused tool your employer might pay for fits your situation.',
        ],
      },
      chooseUs: {
        label: 'Try Fezer if',
        points: [
          'You want the planned-versus-actual loop for your life, not just your job.',
          'You plan from your phone, not from a desk.',
          'You do not want a work-tool subscription for planning your own day.',
          'You want plans and vision boards attached to the same schedule.',
          'You would rather your calendar never touched anyone’s server.',
        ],
      },
    },
    faq: [
      {
        q: 'Is Fezer really free where Sunsama is subscription-only?',
        a: 'Yes, but not in the same shape. Sunsama offers a 14-day free trial and then requires a subscription to use it at all. Fezer stays usable free forever -  planning and tracking never expire -  and charges only for Compare, Analytics, the extra schedule views and unlimited areas, plans and steps. It has no servers to fund, so there is nothing the price needs to cover.',
      },
      {
        q: 'Does Fezer have Sunsama’s guided daily planning ritual?',
        a: 'No. Fezer does not walk you through a guided flow. Repeating blocks carry your routine forward automatically, and you adjust the day directly on the timeline. If the ritual itself is what keeps you planning, Sunsama does that better.',
      },
      {
        q: 'Can Fezer pull in my tasks from Asana, Trello or Todoist?',
        a: 'No. Fezer has no integrations and no server component, so nothing is imported from other tools. Sunsama is the right choice if consolidating work tools is the point.',
      },
      {
        q: 'Both apps show planned vs. actual time -  what is the difference?',
        a: 'Sunsama reports where your time went against your plan as part of its work-focused analytics. Fezer draws the planned day and the tracked day as two columns on the same hourly timeline in Compare mode, and its analytics break tracked time down by the areas and plans of your personal life.',
      },
      {
        q: 'Does Fezer sync between devices like Sunsama does?',
        a: 'No. Fezer stores everything on the device and never transmits it, so there is no sync. That is the deliberate cost of keeping your schedule entirely in your custody.',
      },
      {
        q: 'Is Fezer available on Android or desktop?',
        a: 'Android yes -  Fezer is on Google Play. Desktop no: there is no Mac app and no web version, because everything is stored on the device.',
      },
    ],
    related: [
      { path: '/plan-vs-actual-time-tracking', label: 'How plan vs. actual works in Fezer' },
      { path: '/goal-planner', label: 'Areas, plans and steps explained' },
      { path: '/offline-planner-app', label: 'Why Fezer keeps everything on your device' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/ticktick-alternative',
    navLabel: 'vs TickTick',
    title: 'TickTick Alternative for iPhone -  Fezer',
    metaDescription:
      'Looking for a TickTick alternative? Fezer starts from your hours instead of your list: plan the day in time blocks, track what happens and compare the two. Free to plan and track, no account, on iPhone, iPad and Android.',
    ogSlug: 'ticktick-alternative',
    h1: 'A TickTick alternative that starts with your hours, not your list',
    intro:
      'TickTick is one of the most complete task managers ever shipped -  lists, calendar, habits, Pomodoro, collaboration, everywhere. Fezer is not trying to out-feature it. It starts from a different unit: not the task, but the hour, and what actually happened during it.',
    fairness: {
      heading: 'Where TickTick is stronger',
      paragraphs: [
        'TickTick runs on practically everything -  iPhone, iPad, Android, Mac, Windows and the web -  with sync across all of it. Capturing a task is close to effortless: natural-language input understands "pay rent friday 9am", and tasks come in via widgets, voice and browser extensions. Around the core list it has built a habit tracker, a Pomodoro timer with focus statistics, an Eisenhower priority matrix, Kanban and timeline views, and shared lists for working with other people. It has a generous free tier and a decade of polish.',
        'Fezer has none of that breadth. It has no collaboration and no natural-language capture. What it has is a different starting point, described below.',
      ],
    },
    sections: [
      {
        heading: 'List-first vs. time-first',
        paragraphs: [
          'TickTick, at its heart, is a list. A superb one -  but the organizing question is "what needs to be done?", and the calendar is one of several views onto the answer. It is possible to plan your time in TickTick, and many people do, but the app does not insist on it.',
          'Fezer inverts the hierarchy. The organizing question is "what is happening with your hours?" -  the day timeline is the primary surface, everything you commit to occupies actual time on it, and the Now view keeps exactly one current commitment in front of you. A task without a time is not yet a plan in Fezer’s model.',
        ],
      },
      {
        heading: 'What happens after the checkmark',
        paragraphs: [
          'TickTick records that things got done, and its Pomodoro timer can record focused stretches. What it does not do is put your planned day and your real day side by side and let one correct the other.',
          'That is Fezer’s core loop. Plan the day in blocks, track sessions with one tap as the day runs, then open Compare and see both columns on the same hours: the block that started forty minutes late, the "quick" task that ran to lunch, the afternoon that vanished into work no list ever contained. Estimates get calibrated by evidence, which is the part checkmarks cannot teach.',
        ],
      },
      {
        heading: 'Where goals live',
        paragraphs: [
          'In a task manager, a goal is usually a list or a tag -  a container of tasks. Fezer gives your work its own structure: areas for the parts of your life, plans with a written beginning and end state, ordered steps, and a vision board attached to each area and plan.',
          'The structural difference shows up in the analytics. Because tracked time attaches to areas and plans, the week answers a question a completed-task count cannot: which parts of your life actually received hours, and which received intentions.',
        ],
      },
      {
        heading: 'Accounts, sync and the price of everywhere',
        paragraphs: [
          'TickTick’s everywhere-sync requires an account, and your tasks live on its servers -  the normal architecture for a cross-platform product, and TickTick maintains a paid Premium tier on top of a capable free one.',
          'Fezer has no account and no server, and Fezer is free to plan and track, with no account and no ads; Compare, Analytics, the list and month views and unlimited areas, plans and steps are Fezer Plus, at $5.99 a month or $55.99 a year with a week free on the yearly plan. Everything you write stays on your device. The cost is that "everywhere" shrinks to your phone and tablet. That is the trade, stated plainly.',
        ],
      },
    ],
    table: {
      heading: 'Feature comparison',
      lede: 'TickTick details are taken from its own website as of August 2026. TickTick has a free tier and a Premium subscription; Fezer is free to plan and track, with Fezer Plus for Compare, Analytics and unlimited plans.',
      themLabel: 'TickTick',
      rows: [
        {
          capability: 'Quick capture with natural language',
          them: 'Yes -  NLP dates, voice, widgets, extensions',
          us: 'Manual -  blocks are placed on the timeline by hand',
        },
        {
          capability: 'To-do lists, tags and filters',
          them: 'Yes -  lists, tags, filters, Kanban, timeline views',
          us: 'Not the model -  work lives as blocks, deadlines and plan steps',
        },
        {
          capability: 'Visual day timeline',
          them: 'Calendar views across days, weeks and months',
          us: 'Yes -  the day timeline is the primary surface',
        },
        {
          capability: 'Repeating routines',
          them: 'Yes -  recurring tasks',
          us: 'Yes -  repeating blocks: daily, weekdays, weekly, biweekly',
        },
        {
          capability: 'Habit tracker',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Pomodoro / focus timer',
          them: 'Yes -  Pomodoro with focus statistics',
          us: 'Tracked sessions with checkpoints instead of fixed cycles',
        },
        {
          capability: 'Planned vs. actual comparison',
          them: null,
          us: 'Yes -  Compare mode, side by side',
        },
        {
          capability: 'Plans with structure',
          them: 'Lists and tags act as containers',
          us: 'Areas, plans, ordered steps, committed onto the day',
        },
        {
          capability: 'Vision board',
          them: null,
          us: 'Yes -  boards per plan and life area',
        },
        {
          capability: 'Collaboration and shared lists',
          them: 'Yes -  share lists, assign tasks',
          us: null,
        },
        {
          capability: 'Platforms',
          them: 'iPhone, iPad, Android, Mac, Windows, web',
          us: 'iPhone, iPad and Android',
        },
        {
          capability: 'Sync across devices',
          them: 'Yes -  account-based cloud sync',
          us: null,
        },
        {
          capability: 'Account required',
          them: 'Yes -  for sync and most use',
          us: 'No account, ever',
        },
        {
          capability: 'Price',
          them: 'Free tier plus Premium subscription',
          us: 'Free to plan and track; Plus from $5.99/mo',
        },
      ],
      footnote:
        'Both products change often. If something here has gone out of date, tell us through the feedback link in the footer and we will correct it.',
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer day timeline showing planned time blocks beside tracked time',
      caption: 'The day as Fezer sees it -  blocks of time, then the record of what those hours held.',
    },
    verdict: {
      heading: 'Which one should you actually use?',
      chooseThem: {
        label: 'Stay with TickTick if',
        points: [
          'Fast capture is the feature -  you live by getting things out of your head instantly.',
          'You need your tasks on Windows, Mac or the web.',
          'You share lists with family or colleagues.',
          'You want habits, Pomodoro and tasks in a single app.',
          'A to-do list genuinely is the right model for your work.',
        ],
      },
      chooseUs: {
        label: 'Try Fezer if',
        points: [
          'Your list is fine but your days keep disappearing anyway.',
          'You want to see planned time against actual time, not just completed counts.',
          'You want plans with real structure that claim real hours.',
          'You want a time-first planner whose paid tier is the analysis layer, not the day itself.',
          'You want a planner that works with no account and no cloud.',
        ],
      },
    },
    faq: [
      {
        q: 'Is Fezer free? TickTick already has a free tier.',
        a: 'Yes, and the difference is where the ceiling sits. TickTick’s free tier is capable but holds some features for Premium. Fezer’s free tier never expires and its paid tier is narrower: repeating blocks, deadline pins, one-tap tracking with checkpoints and the schedule timeline are free forever, with no ads. Compare, Analytics, the list and month views and unlimited areas, plans and steps are Fezer Plus, at $5.99 a month or $55.99 a year.',
      },
      {
        q: 'Can Fezer import my tasks from TickTick?',
        a: 'No. Fezer has no import and no server to import through. Most people rebuild their standing commitments as repeating blocks once, which takes a few minutes -  and a plan built from blocks tends to carry far fewer items than an accumulated task list.',
      },
      {
        q: 'Does Fezer have a habit tracker?',
        a: 'Not as a separate feature. The closest equivalent is a repeating block -  a habit with an actual time reserved for it -  plus the tracked record of whether it happened. If streak-style habit tracking is what keeps you going, TickTick does that well.',
      },
      {
        q: 'Does Fezer have a Pomodoro timer like TickTick?',
        a: 'No. Fezer records sessions of whatever length actually happened, with checkpoints you drop along the way, rather than imposing fixed work-break cycles. The record reflects your real rhythm instead of a prescribed one.',
      },
      {
        q: 'Can I use Fezer on my Mac or on Android?',
        a: 'Android yes -  Fezer is on Google Play. Mac no, and because it stores everything on-device there is no web version either.',
      },
      {
        q: 'Why would I give up TickTick’s capture speed?',
        a: 'You might not -  some people keep a capture tool and plan their hours in Fezer. The argument for time-first planning is that a captured task costs nothing and changes nothing; a block on your timeline is a decision about your day. Fezer optimizes for the decision, not the capture.',
      },
    ],
    related: [
      { path: '/time-blocking-app', label: 'How time blocking works in Fezer' },
      { path: '/plan-vs-actual-time-tracking', label: 'See planned time against actual time' },
      { path: '/goal-planner', label: 'Give goals structure beyond a list' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/tiimo-alternative',
    navLabel: 'vs Tiimo',
    title: 'Tiimo Alternative for iPhone -  Fezer',
    metaDescription:
      'Looking for a Tiimo alternative? Fezer is a visual day planner that also records how the day went -  planned time next to actual time. Free to plan and track, no account, all on-device.',
    ogSlug: 'tiimo-alternative',
    h1: 'A visual day planner that also records how the day went',
    intro:
      'Tiimo and Fezer share a starting conviction: a day you can see is easier to follow than a list you have to hold in your head. Tiimo builds on that with design centred on neurodivergent users and an AI planner. Fezer builds on it with a feedback loop: the day you planned, measured against the day you got.',
    fairness: {
      heading: 'Where Tiimo is stronger',
      paragraphs: [
        'Tiimo has been built by and for neurodivergent people from the start, with particular care for ADHD and autistic users, and that shows in the details: a gentle visual timeline, widgets that show what is next without opening the app, a focus timer designed to anchor rather than pressure, mood logging, and an AI planner that turns a brain-dump into a realistic schedule. It runs on iPhone, iPad, Apple Watch, Android and the web, and reports over half a million users.',
        'Fezer was not designed specifically around neurodivergence, has no AI assistance, no Apple Watch app and no web version. If Tiimo’s specialised design is what makes planning workable for you, that is a real reason to choose it, and this page will not pretend otherwise.',
      ],
    },
    sections: [
      {
        heading: 'What the two apps share',
        paragraphs: [
          'Both apps reject the wall-of-text to-do list in favour of a visual day: time made concrete, the current thing made obvious. Fezer’s Now view keeps a single commitment in front of you -  what is live, what is next, what is due -  which is the same "reduce the day to one step" instinct that makes visual planners work for so many people.',
          'Both also treat routines as first-class: Tiimo through its visual routines, Fezer through repeating blocks that rebuild your standing structure every morning without re-planning.',
        ],
      },
      {
        heading: 'What Fezer adds: the day, recorded',
        paragraphs: [
          'Tiimo’s timeline shows the day as intended, and its focus timer helps you stay inside the current activity. What it does not keep is a record of the day as it actually ran, placed against the plan.',
          'Fezer does. One tap begins a tracked session, checkpoints mark how the work unfolded, and Compare mode then draws planned and actual as two columns on the same hours. For anyone whose time perception runs optimistic -  which is most people -  that record is the difference between feeling like the day vanished and seeing exactly where it went.',
        ],
      },
      {
        heading: 'A planning layer above the day',
        paragraphs: [
          'Fezer also carries structure that Tiimo’s task-and-routine model does not: areas for the parts of your life, plans with a written end state, ordered steps, and vision boards attached to each area and plan. Steps get committed onto the schedule as deadlines or blocks of time.',
          'The payoff arrives in the weekly analytics, where tracked time rolls up by area and plan -  an honest account of which parts of your life received hours, not just which tasks got checked.',
        ],
      },
      {
        heading: 'Subscription vs. free, cloud vs. device',
        paragraphs: [
          'Tiimo uses a freemium model: a free version with the essentials and a Tiimo Pro subscription for the full feature set, with cross-device sync as part of the product. That is a reasonable architecture for a multi-platform app with AI features -  those things cost money to run.',
          'Fezer is free to plan and track, with no ads and no account; Compare, Analytics, the list and month views and unlimited areas, plans and steps are Fezer Plus, at $5.99 a month or $55.99 a year with a week free on the yearly plan. Everything you plan and track stays on your phone or tablet. The cost is no sync, no watch app and no web access; the benefit is that a fairly intimate record of your days is never in anyone’s custody but yours.',
        ],
      },
    ],
    table: {
      heading: 'Feature comparison',
      lede: 'Tiimo details are taken from its own website as of August 2026. Tiimo has a free version and a Pro subscription; Fezer is free to plan and track, with Fezer Plus for Compare, Analytics and unlimited plans.',
      themLabel: 'Tiimo',
      rows: [
        {
          capability: 'Visual day timeline',
          them: 'Yes -  a visual schedule you can follow',
          us: 'Yes -  draggable time blocks with deadline pins',
        },
        {
          capability: 'Designed around neurodivergence',
          them: 'Yes -  built by and for neurodivergent people',
          us: 'No -  a general-purpose planner',
        },
        {
          capability: 'AI planning assistance',
          them: 'Yes -  turns tasks into a realistic schedule',
          us: null,
        },
        {
          capability: 'Widgets',
          them: 'Yes -  see what is next without opening the app',
          us: 'Yes -  Home Screen, Lock Screen, Control Center and a Live Activity',
        },
        {
          capability: 'Focus timer',
          them: 'Yes -  countdown that anchors the current task',
          us: 'Tracked sessions with checkpoints instead',
        },
        {
          capability: 'Mood / reflection',
          them: 'Mood logging to spot patterns',
          us: 'Reflection pins on vision boards',
        },
        {
          capability: 'Time tracking of what actually happened',
          them: null,
          us: 'Yes -  one-tap sessions with checkpoints',
        },
        {
          capability: 'Planned vs. actual comparison',
          them: null,
          us: 'Yes -  Compare mode, side by side',
        },
        {
          capability: 'Plans broken into steps and scheduled',
          them: 'To-dos and routines',
          us: 'Areas, plans and steps committed onto the day',
        },
        {
          capability: 'Vision board',
          them: null,
          us: 'Yes -  boards per plan and life area',
        },
        {
          capability: 'Platforms',
          them: 'iPhone, iPad, Apple Watch, Android, web',
          us: 'iPhone, iPad and Android',
        },
        {
          capability: 'Sync across devices',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Account required',
          them: 'Yes',
          us: 'No account, ever',
        },
        {
          capability: 'Price',
          them: 'Free version plus Tiimo Pro subscription',
          us: 'Free to plan and track; Plus from $5.99/mo',
        },
      ],
      footnote:
        'Both products change often. If something here has gone out of date, tell us through the feedback link in the footer and we will correct it.',
    },
    screenshot: {
      src: SCREENSHOTS.timeTracker,
      alt: 'Fezer Now screen showing the current commitment with one-tap time tracking below it',
      caption: 'One commitment in view, one tap to record it -  the visual day, plus its record.',
    },
    verdict: {
      heading: 'Which one should you actually use?',
      chooseThem: {
        label: 'Stay with Tiimo if',
        points: [
          'Design built around ADHD or autism is what makes planning work for you.',
          'You rely on an Apple Watch to see what is next.',
          'You want AI to turn a brain-dump into a schedule.',
          'You need your planner on the web, or on a Mac.',
          'Mood tracking alongside your schedule matters to you.',
        ],
      },
      chooseUs: {
        label: 'Try Fezer if',
        points: [
          'You want a visual day that also keeps a record of the real one.',
          'Seeing planned time against actual time would change how you plan.',
          'You want plans and vision boards wired to the same timeline.',
          'You want a visual day whose paid tier is the analysis layer, not the day itself.',
          'You want your schedule kept on your device, with no account.',
        ],
      },
    },
    faq: [
      {
        q: 'Is Fezer designed for ADHD like Tiimo is?',
        a: 'Not specifically. Fezer is a general-purpose planner. Some of its choices help anyone who loses the thread of a day -  the visual timeline, the single-commitment Now view, one-tap tracking -  but Tiimo’s design is purpose-built for neurodivergent users, and if that is what you need, Tiimo is the more considered choice.',
      },
      {
        q: 'Is Fezer completely free where Tiimo has a Pro tier?',
        a: 'The parts you use every day, yes. Repeating blocks, deadline pins, one-tap tracking with checkpoints and the schedule timeline are free forever, with no ads. Compare, Analytics, the list and month views and unlimited areas, plans and steps are Fezer Plus, at $5.99 a month or $55.99 a year. Fezer has no servers or AI infrastructure to fund, which is what keeps the free tier genuinely usable rather than a demo.',
      },
      {
        q: 'Does Fezer have an AI planner?',
        a: 'No. You place blocks yourself, and repeating blocks carry your routines forward automatically. Fezer’s bet is that the Compare view -  seeing what actually happened against the plan -  teaches realistic scheduling faster than delegating the plan.',
      },
      {
        q: 'Does Fezer work on Apple Watch or Android?',
        a: 'Android yes -  Fezer is on Google Play. Apple Watch, not yet.',
      },
      {
        q: 'Does Fezer sync between devices?',
        a: 'No. Planner data is stored on the device, so there is no sync between an iPhone, an iPad and an Android phone. That is the deliberate trade for keeping your day entirely in your custody.',
      },
      {
        q: 'Can I move my Tiimo routines into Fezer?',
        a: 'There is no automatic import. Most routines translate directly into repeating blocks -  daily, weekdays, weekly or biweekly -  and rebuilding a typical set takes a few minutes, once.',
      },
    ],
    related: [
      { path: '/day-planner-app', label: 'See Fezer as a full day planner' },
      { path: '/plan-vs-actual-time-tracking', label: 'How plan vs. actual works' },
      { path: '/offline-planner-app', label: 'Why Fezer keeps everything on your device' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    path: '/todoist-alternative',
    navLabel: 'vs Todoist',
    title: 'Todoist Alternative for iPhone -  Fezer',
    metaDescription:
      'Looking for a Todoist alternative? Fezer replaces the endless list with a planned day: time blocks, one-tap tracking and a side-by-side view of plan versus reality. Free to plan and track, no account, on iPhone, iPad and Android.',
    ogSlug: 'todoist-alternative',
    h1: 'For when the list stops being the problem',
    intro:
      'Todoist may be the best pure to-do list ever built, and if capturing and organizing tasks is what you need, you should probably just use it. Fezer is for the moment after that -  when the list is immaculate, the days keep vanishing anyway, and the question stops being "what needs doing?" and becomes "what happened to my time?"',
    fairness: {
      heading: 'Where Todoist is stronger',
      paragraphs: [
        'Todoist has been refined for nearly two decades and it shows. Capture is instant and natural-language dates ("every other friday at 4pm") are best in class. It runs on essentially everything, syncs seamlessly, and scales from a grocery list to shared team projects with assignments, comments and permissions. Its free tier is genuinely usable, and the Pro tier adds a calendar layout, task durations and AI assistance.',
        'Fezer competes with none of that breadth. It has no collaboration, no natural-language capture and no integrations. It is built around one loop Todoist does not have, described below.',
      ],
    },
    sections: [
      {
        heading: 'A list records obligations. A day is made of hours.',
        paragraphs: [
          'The to-do list model has a known failure mode: it grows. Every commitment, idea and someday-item accumulates in one place, each morning opens on dozens of undifferentiated entries, and choosing what to do becomes its own job. Todoist manages the pile better than anyone -  projects, filters, priorities -  but the model is still the pile.',
          'Fezer’s model is the day. Twenty-four hours, some already spoken for, the rest yours to allocate. Work gets a block with a start and an end; deadlines pin to the timeline of the day they are due; the Now view holds up exactly one current commitment. The constraint is the feature: a day, unlike a list, cannot quietly grow to hold everything.',
        ],
      },
      {
        heading: 'The loop a checkmark cannot close',
        paragraphs: [
          'A completed task tells you that something got done -  not what it cost. Six checked items can describe a focused morning or a fourteen-hour slog, and the list cannot tell the difference. So next week gets planned with the same optimism as last week, indefinitely.',
          'Fezer closes the loop with evidence. Track a session with one tap as you work, then let Compare mode draw the planned day and the real one side by side: the block that started late, the estimate that was off by double, the untracked hours that belonged to no plan at all. That feedback -  not a better-organized list -  is what makes the next plan more honest than the last.',
        ],
      },
      {
        heading: 'Projects vs. areas',
        paragraphs: [
          'Todoist organizes work into projects and sub-tasks, which suits deliverables. Fezer organizes life into areas -  areas like health, family and work -  each holding plans with a written end state, ordered steps, and a vision board. A step becomes real by being committed onto the schedule: pinned as a deadline or blocked as time.',
          'Because tracked time attaches to areas and plans, Fezer’s analytics answer a question a productivity streak cannot: which areas of your life actually received hours this week, and which only received good intentions.',
        ],
      },
      {
        heading: 'Free to plan, Plus to analyse',
        paragraphs: [
          'Todoist’s free tier is real, and its paid tiers fund a sync service, collaboration infrastructure and AI features -  a fair exchange for a cloud product.',
          'Fezer is free to plan and track, with no ads and no account, because there is no server to pay for. Compare, Analytics, the extra schedule views and unlimited areas, plans and steps are Fezer Plus. Everything you write stays on your device, which also means no sync and no web access. If those are dealbreakers, Todoist is the safer choice.',
        ],
      },
    ],
    table: {
      heading: 'Feature comparison',
      lede: 'Todoist details are taken from its own website as of August 2026. Todoist has a free tier plus Pro and Business subscriptions; Fezer is free to plan and track, with Fezer Plus for Compare, Analytics and unlimited plans.',
      themLabel: 'Todoist',
      rows: [
        {
          capability: 'Quick capture with natural language',
          them: 'Yes -  best-in-class NLP dates and recurrence',
          us: 'Manual -  blocks are placed on the timeline by hand',
        },
        {
          capability: 'Projects, labels and filters',
          them: 'Yes -  with more of each in paid tiers',
          us: 'Areas, plans and steps instead of projects',
        },
        {
          capability: 'Visual day timeline',
          them: 'Calendar layout in Pro',
          us: 'Yes -  free, and the primary surface',
        },
        {
          capability: 'Task durations',
          them: 'Pro',
          us: 'Every block has a start and an end by definition',
        },
        {
          capability: 'Recurring items',
          them: 'Yes -  natural-language recurrence',
          us: 'Repeating blocks: daily, weekdays, weekly, biweekly',
        },
        {
          capability: 'Time tracking of what you actually did',
          them: null,
          us: 'Yes -  one-tap sessions with checkpoints',
        },
        {
          capability: 'Planned vs. actual comparison',
          them: null,
          us: 'Yes -  Compare mode, side by side',
        },
        {
          capability: 'Vision board',
          them: null,
          us: 'Yes -  boards per plan and life area',
        },
        {
          capability: 'Collaboration and shared projects',
          them: 'Yes -  assignments, comments, team workspaces',
          us: null,
        },
        {
          capability: 'AI assistance',
          them: 'Pro and Business',
          us: null,
        },
        {
          capability: 'Platforms',
          them: 'iPhone, iPad, Android, Mac, Windows, web and more',
          us: 'iPhone, iPad and Android',
        },
        {
          capability: 'Sync across devices',
          them: 'Yes',
          us: null,
        },
        {
          capability: 'Account required',
          them: 'Yes',
          us: 'No account, ever',
        },
        {
          capability: 'Price',
          them: 'Free tier plus Pro and Business subscriptions',
          us: 'Free to plan and track; Plus from $5.99/mo',
        },
      ],
      footnote:
        'Both products change often. If something here has gone out of date, tell us through the feedback link in the footer and we will correct it.',
    },
    screenshot: {
      src: SCREENSHOTS.timeBlocking,
      alt: 'Fezer showing a day planned in time blocks next to the time actually tracked',
      caption: 'Not a tidier list -  a day with a shape, and the record of what the hours really held.',
    },
    verdict: {
      heading: 'Which one should you actually use?',
      chooseThem: {
        label: 'Stay with Todoist if',
        points: [
          'Frictionless capture from anywhere is the feature you live by.',
          'You share projects with a team, a partner or clients.',
          'You need your tasks on desktop and the web.',
          'Your work is genuinely list-shaped: many small items, few time decisions.',
          'You want AI help drafting and organizing tasks.',
        ],
      },
      chooseUs: {
        label: 'Try Fezer if',
        points: [
          'Your list is well-kept and your time still disappears.',
          'You want every commitment to occupy real hours on a real day.',
          'You want to see planned time against actual time, every day.',
          'You want life areas and plans above the task level.',
          'You want the loop on your device, free to plan and track.',
        ],
      },
    },
    faq: [
      {
        q: 'Is Fezer a to-do list app like Todoist?',
        a: 'No. Fezer has no standalone task list. Commitments exist as time blocks on the day, deadline pins, or steps inside plans. If you mainly need a capture-everything list, Todoist is the better tool -  some people use both, capturing in a list and planning their hours in Fezer.',
      },
      {
        q: 'Can Fezer import my Todoist tasks?',
        a: 'No. Fezer has no integrations or server to import through. In practice a day plan holds far fewer items than an accumulated list, so most people rebuild only their standing routines as repeating blocks, which takes a few minutes.',
      },
      {
        q: 'Todoist Pro has a calendar layout. How is Fezer different?',
        a: 'Todoist’s calendar layout is a paid view onto your task list. In Fezer the day timeline is the entire model, free: blocks have durations by definition, deadlines pin to the day, tracking lands beside the plan, and Compare shows the two against each other -  a loop the calendar view does not attempt.',
      },
      {
        q: 'Does Fezer do recurring tasks?',
        a: 'It does repeating blocks -  daily, weekdays, weekly or biweekly -  which cover routines and standing commitments. It does not parse natural-language recurrence like "every other Friday"; Todoist remains unmatched at that.',
      },
      {
        q: 'Does Fezer work with a team?',
        a: 'No. Fezer is strictly personal -  no sharing, no assignments, no comments. Everything stays on your device, which is precisely why collaboration is out of scope.',
      },
      {
        q: 'Is Fezer available on Android or the web?',
        a: 'Android yes -  Fezer is on Google Play. The web, no -  everything is stored on the device, so there is nothing to sign in to.',
      },
    ],
    related: [
      { path: '/day-planner-app', label: 'See Fezer as a full day planner' },
      { path: '/time-blocking-app', label: 'How time blocking works in Fezer' },
      { path: '/plan-vs-actual-time-tracking', label: 'See planned time against actual time' },
    ],
  },
];
