
COPY = {}

COPY["name"] = "Fezer: Time Block Day Planner"          # limit 30

COPY["subtitle"] = "Time tracker & goal planner"         # limit 30

COPY["keywords"] = (                                      # limit 100, no spaces
    "timeblocking,schedule,focus,routine,vision,board,deep,work,"
    "weekly,agenda,habit,todo,hours,log"
)

COPY["promo"] = (                                         # limit 170
    "New: vision boards. Pin what you want, turn it into plans with steps, "
    "and block real time for them on today's schedule."
)

COPY["whatsNew"] = (                                      # limit 4000
    "Vision boards are here.\n\n"
    "Every area and every plan can now carry its own pin board. Add Want, "
    "Need, Idea, Thought and Reflection pins with images and text, then shift "
    "the Focus lens between Dream, Plan and Remember to change what the board "
    "emphasizes.\n\n"
    "Because boards sit beside your plans, a Want is one tab away from becoming "
    "a plan with steps, deadlines and scheduled time. Vision stops being a "
    "poster and starts being a plan.\n\n"
    "Also in this release: smoother schedule dragging and faster day navigation."
)

COPY["description"] = """Most planners give you a longer list. Fezer answers a better question: what should I be doing right now?

Plan your day as time blocks, track the day as it actually happens, then put the two side by side. Your plan stops being optimism and starts being evidence.

PLAN THE DAY IN TIME BLOCKS
Build tomorrow from draggable blocks on a clean timeline: deep work, routines, breaks. Blocks repeat Every Day, on Weekdays, Every Week or Every 2 Weeks, so your morning routine builds itself. Deadlines pin directly onto the same timeline, so due items live inside your day instead of in a separate list.

KNOW WHAT MATTERS RIGHT NOW
The Now tab shows one commitment at a time with clear badges: LIVE for what is running, NOW for what should be happening, NEXT for what is coming and DUE for approaching deadlines. No scanning, no deciding twice.

TRACK TIME WITH ONE TAP
Tap Begin. That is the whole workflow. Drop checkpoints as you work, with notes or photos, to capture how the session actually unfolded. Tracked time lands on your schedule as its own column, next to what you planned.

COMPARE PLAN VS. REALITY
Compare mode shows the planned day beside the tracked day. See which blocks are realistic and which are wishful thinking. Analytics break your time down by area and plan across day, week, month and year.

TURN PLANS INTO SCHEDULED TIME
Plans fail in the gap between written down and scheduled. Fezer closes it. Organize plans into areas (Work, Family, Personal Wellbeing), record why each plan exists and what the end result looks like, then break it into ordered steps. From any step, Commit: "Complete by" pins a deadline on your day, "Work on" blocks real hours for it, optionally repeating. Progress follows completed steps, and tracked sessions attach to plans, so analytics show the hours each plan truly received.

BUILD A VISION BOARD THAT LEADS SOMEWHERE
Each area and plan can carry a freeform pin board. Add Want, Need, Idea, Thought and Reflection pins with images and text. Focus lenses shift the board between Dream, Plan and Remember. Because the board lives beside your plans, aspiration is one tab away from a scheduled block.

PLAN AND REVIEW YOUR WEEK
Repeating blocks form a standing weekly skeleton. Commit plan steps across the week, move through days quickly to fix collisions before they happen, then close the week in Analytics with planned versus actual by area and plan.

PRIVATE BY DESIGN
No account. No sign-up. No server copy of your day. Anonymous product analytics help us keep the app working; they cannot read what you wrote. Your schedule, tracked hours and vision boards stay on your device.

WHAT YOU GET
- Draggable time blocks with repeats
- Deadline pins on the day timeline
- Now view with LIVE / NOW / NEXT / DUE badges
- One-tap time tracking with checkpoints
- Plan, Track and Compare schedule modes
- Areas, plans, steps and progress
- Commit steps as deadlines or time blocks
- Vision boards with typed pins and focus lenses
- Analytics by day, week, month and year
- iPhone, iPad and Android
- Fully offline planner, with anonymous product analytics

Fezer is for people who already know what they want to do and are tired of losing the day anyway.

Plan it. Track it. Compare it. Own your day."""

LIMITS = {"name": 30, "subtitle": 30, "keywords": 100, "promo": 170,
          "description": 4000, "whatsNew": 4000}

if __name__ == "__main__":
    ok = True
    for k, lim in LIMITS.items():
        v = COPY[k]
        n = len(v)
        flag = "OK " if n <= lim else "OVER"
        if n > lim:
            ok = False
        print(f"{flag} {k:12s} {n:5d} / {lim}")
    print()
    print("NAME:    ", COPY["name"])
    print("SUBTITLE:", COPY["subtitle"])
    print("KEYWORDS:", COPY["keywords"])
    # keyword hygiene
    kw = COPY["keywords"].split(",")
    dupes = [w for w in kw if w.lower() in (COPY["name"] + " " + COPY["subtitle"]).lower()]
    print("Keyword words already covered by name/subtitle (wasted):", dupes)
    print("All good" if ok and not dupes else "NEEDS FIX")
