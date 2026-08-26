// Site-wide FAQ. Rendered on /faq and mirrored into FAQPage JSON-LD in
// seo/meta.ts -- Google requires the marked-up questions and answers to match
// the visible page content, so edit here and nowhere else.
//
// Every factual claim below is checked against the shipping apps: the caps come
// from FezerLimits.free, the prices from the store consoles, the platform and
// language facts from the two project files. If the product changes, this file
// changes with it.

export type FaqItem = { q: string; a: string };
export type FaqGroup = { heading: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    heading: 'The basics',
    items: [
      {
        q: 'What is Fezer?',
        a: 'Fezer is a day planner, time tracker and goal planner for iPhone, iPad and Android. You plan your day in time blocks, track what actually happens with one tap, and compare the two side by side. Above the day sits a planning layer - areas, plans, steps and vision boards - whose steps commit directly onto your schedule.',
      },
      {
        q: 'How much does Fezer cost?',
        a: 'Planning your day and tracking it are free, permanently, with no account and no trial clock. A new install includes 3 areas, 3 plans in each, 7 steps per plan, one vision board with up to 10 pins, and the schedule timeline in both Plan and Tracked views. Fezer Plus opens the rest - Compare, Analytics, the list and month views, and unlimited areas, plans, steps and vision boards - for $5.99 a month or $55.99 a year, with a 7-day free trial on the yearly plan.',
      },
      {
        q: 'What does Fezer Plus include?',
        a: 'Four things. Compare, which puts the day you planned beside the day you got. Analytics, which breaks your planned and tracked hours down by area and plan across a day, week, month or year. The list and month views of your schedule, alongside the timeline that is always free. And the removal of every creation cap: unlimited areas, plans and steps, and a vision board for every area.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No. Fezer has no accounts, no sign-up and no login. You install the app and start planning. Your plans stay on the device. Even a Fezer Plus subscription needs no account - your entitlement comes from the App Store or Google Play, not from us.',
      },
      {
        q: 'What do I need to run Fezer?',
        a: 'On Apple devices, an iPhone or iPad running iOS or iPadOS 26 or later. On Android, a phone running Android 8.0 or later. The iPhone and iPad app is available in 40 languages; the Android app is currently English only.',
      },
      {
        q: 'Is Fezer available on Android, Mac or the web?',
        a: 'Android yes - Fezer is on Google Play, and the Android app carries the same planning, tracking and Compare loop as the iPhone one. Mac and web, no. Because everything is stored on the device there is no web version, and there is no Mac app today.',
      },
      {
        q: 'How do I cancel Fezer Plus?',
        a: 'Wherever you bought it. On iPhone or iPad, in your Apple Account subscription settings, or from Manage Fezer Plus inside the app, which opens Apple’s subscription sheet. On Android, in your Google Play subscriptions. Because there is no Fezer account, there is nothing to cancel with us, and your plans stay on your phone either way.',
      },
    ],
  },
  {
    heading: 'Privacy and your data',
    items: [
      {
        q: 'Where is my data stored?',
        a: 'Your schedule, tracked sessions, areas, plans, steps, notes, photos and attachments are written to local storage on your phone or tablet and are never uploaded. The app also sends anonymous product analytics, crash reports and masked session recordings so we can keep it working. Those events do not include what you wrote. See the Privacy Policy for the detail.',
      },
      {
        q: 'So does Fezer track me or not?',
        a: 'Neither answer on its own is honest, so here is both. Nothing you write leaves the device: no titles, notes, dates, photos or file names, ever. What does leave is anonymous diagnostics - that the app opened, which screen you are on, that you created an area or a block, that a crash happened, and for Plus that a paywall was shown or a purchase completed. Session recordings are captured with all text and images masked on-device before a frame is sent. Both apps send this to PostHog on our behalf. The Android app also sends session and screen data to Google Analytics for Firebase, which may read the advertising ID to attribute an install. None of it is sold. If you have seen us say "no tracking" or "no analytics SDKs" anywhere, that was wrong and it has been corrected.',
      },
      {
        q: 'Does Fezer work offline?',
        a: 'Yes. Planning, tracking and your plans work with the network off. A small number of anonymous diagnostic events wait on the device and send when a connection is available. They are not required for the app to run.',
      },
      {
        q: 'Does Fezer sync between my devices?',
        a: 'No. Each device keeps its own local planner data. There is no cloud copy of your schedule to sync from. A Fezer Plus subscription does follow you, because the store account carries it - but your plans do not travel with it.',
      },
      {
        q: 'How do I back up my data or move it to a new phone?',
        a: 'On iPhone and iPad, Fezer data is included in a standard device backup - iCloud Backup or a computer backup - so restoring a device from backup restores your planner with it. On Android the app does not take part in Google Auto Backup, so a factory reset or a new phone starts empty unless you still have the old device. There is no separate export, and no live sync between two devices in use at the same time.',
      },
      {
        q: 'How do I delete my data?',
        a: 'Delete the app. That removes your plans, tracked time, areas, steps, notes and attachments from the device, and stops further analytics from that install. If you want us to delete analytics we already hold, write to hello@fezer.app.',
      },
    ],
  },
  {
    heading: 'Features',
    items: [
      {
        q: 'What is Compare?',
        a: 'The view that puts your planned day and your actual day side by side on the same hourly timeline - planned blocks in one column, tracked sessions in the other. Late starts, overruns, blocks that never happened and work that was never planned all become visible at a glance, which is what makes the next day’s plan more realistic than the last. Compare is part of Fezer Plus.',
      },
      {
        q: 'How does time tracking work?',
        a: 'One tap on Begin starts a session; checkpoints let you drop notes or photos along the way without stopping the timer; End lands the session on your schedule as a tracked block. Sessions can attach to an area, plan or step so the time counts toward something, and ending a session linked to a plan writes a completed step with the time on it. You can also start tracking something you never planned, or re-open a session you ended too early. There is no automatic background tracking - that would require monitoring you, which Fezer will not do.',
      },
      {
        q: 'Can I start and stop tracking without opening the app?',
        a: 'On iPhone and iPad, yes. A running session appears as a Live Activity on the Lock Screen and in the Dynamic Island, with Checkpoint and End as buttons on it. There is a Now widget for the Home Screen in three sizes, Lock Screen widgets, and a Track Time control you can put in Control Center or on the Action Button. You can even long-press a reminder on the Lock Screen and hit Begin without unlocking. Android has reminders and notifications, but no widgets yet.',
      },
      {
        q: 'Can Fezer import my Google, Apple or Outlook calendar?',
        a: 'No. Fezer has no server component and does not connect to external calendar accounts, so meetings from other calendars are not pulled in. If automatic calendar import is essential to how you work, a cloud planner is the better tool for you.',
      },
      {
        q: 'Does Fezer have repeating blocks for routines?',
        a: 'Yes - a block can repeat every day, on weekdays, every week or every two weeks, so your morning routine and standing commitments rebuild themselves and you only plan the exceptions. A repeating series can also start at different times on different weekdays.',
      },
      {
        q: 'What can a time block hold?',
        a: 'More than a title and two times. A block carries notes, the people you are meeting, one or more locations along a route, items to bring or produce, and a gallery of photos and files. It can be linked to an area, a plan and a specific step, and it can be tinted to match the area it belongs to.',
      },
      {
        q: 'What are areas?',
        a: 'Areas are the parts of your life - health, family, work, a side project - and every plan belongs to one. Because tracked time rolls up by area, your analytics show which parts of your life actually received hours and which were quietly starved.',
      },
      {
        q: 'What is a vision board for?',
        a: 'Every area and every plan can carry its own board of pins - typed as Want, Need, Idea, Goal, Dream, Thought or Reflection, with images and text. Lenses let you look at the same board as Dream, Plan or Remember, dimming what is not relevant rather than hiding it. Because the board sits beside the plans it belongs to, the thing you are working toward is one tap from the hour you are working in.',
      },
    ],
  },
  {
    heading: 'Support',
    items: [
      {
        q: 'How do I report a bug or request a feature?',
        a: 'Use the Send feedback link in the footer of this site - it takes a message, an optional email if you want a reply, and an optional screenshot. Feedback goes straight to the developer and genuinely shapes what gets built next.',
      },
      {
        q: 'Who makes Fezer?',
        a: 'Fezer is built by an independent developer, not a company with a data business. The business model is that you pay for the app if you want the whole of it. There are no ads, nothing is sold to anyone, and no investor is waiting for your data to become the product.',
      },
    ],
  },
];

/** Flat list used for FAQPage JSON-LD. */
export const FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);
