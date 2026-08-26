"""Intent-matched lead screenshots for Apple Search Ads custom product pages.

The first screenshot should echo the search term the ad was served against.
"""
import os
import make_screenshots as M

OUT = "/sessions/trusting-charming-cannon/mnt/fezerwebsite/appstore/cpp"

LEADS = [
    ("timeblocking", dict(
        img="fezer-time-blocking-planner.webp", top=0.00, xcrop=(0.0, 1.0),
        eyebrow="TIME BLOCKING", accent=(88, 76, 220), tint=(238, 235, 255),
        head="The time blocking\nplanner that lasts",
        sub="Repeating blocks build your routine, and Compare\nmode keeps the blocks honest week after week.",
    )),
    ("timetracker", dict(
        img="fezer-time-tracker.webp", top=0.00, xcrop=(0.0, 1.0),
        eyebrow="TIME TRACKER", accent=(0, 102, 255), tint=(233, 241, 255),
        head="Find out where\nyour day goes",
        sub="One tap to start. No projects, no tags, no timesheets.\nJust an honest record of your own hours.",
    )),
    ("goals", dict(
        img="fezer-goal-planner.webp", top=0.00, xcrop=(0.0, 1.0),
        eyebrow="GOAL PLANNER", accent=(200, 122, 10), tint=(255, 243, 226),
        head="Turn goals into\nhours on your day",
        sub="Areas, plans and steps that end as scheduled\nblocks and deadlines, not another list.",
    )),
]

if __name__ == "__main__":
    for label, W, H in M.SIZES:
        d = os.path.join(OUT, f"iphone-{label}")
        os.makedirs(d, exist_ok=True)
        for key, sl in LEADS:
            p = os.path.join(d, f"lead-{key}.png")
            M.build(sl, W, H).save(p, optimize=True)
            print("wrote", p)
