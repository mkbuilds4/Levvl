# Levvl features

Documentation of planned and existing features, with growth notes. Build order starts simple: core task experience, then reminders and widgets, then task-type interactions and create/explore.

---

## Principles

- **Start with one task per day; unlock more over time:** Users begin at 1 task/day, then unlock 2/day (e.g. day 7), then 3/day (e.g. day 30). Not “one task forever.”
- **Courses can have multiple tasks per day:** A single day in a course can list several tasks (ordered); the user’s unlock cap limits how many they can complete that day.
- **Interact, don’t just check:** Task type drives completion (reflection, action, learning, etc.), not a generic checkbox.
- **Show benefits and what they’ll look like:** Surface milestones (e.g. after 7 days, 30 days)—streak, reflection history, next unlock—so the future feels tangible.
- **Levvl first, then create/explore:** Default courses get users doing something immediately; creating and exploring come later.
- **Surfaces everywhere:** In-app today view, widget, notification—all point at the same “today’s tasks” (up to cap).

---

## Feature summary

| Feature | Purpose | Status / build order |
|--------|---------|----------------------|
| Courses & task sets | Levvl’s default content; each day can have multiple tasks (ordered). Same for creator courses. | Core – build first |
| Progression & unlocks | User unlocks 2 tasks/day (e.g. day 7), 3/day (e.g. day 30). Locked tasks shown with unlock message. | Core – with progress |
| Benefits & milestones | Show “what you’ll look like” at 7 days, 30 days (streak, history, next unlock). | Core – in-app + onboarding |
| User progress | Which course(s), which day, how many tasks completed today; streak. | Core – build first |
| Today’s tasks (in-app) | List of today’s tasks from active course(s); first N (cap) completable, rest locked. | Core – build first |
| Task types & interactions | Different completion flows per type (reflection, action, learning, etc.). | Core – after basic completion works |
| Reminder setting | User chooses daily notification time. | Simple – with notifications |
| Notifications | Daily “Your task for today” (and optional nudges). | Simple – after reminder setting |
| Widget | Home/lock screen: “Today’s task(s)” (+ optional tap to open). | Simple – after today’s tasks work |
| Create (creator) | Build and share courses (multiple tasks per day supported). | Later |
| Explore | Discover and do courses from other creators; same cap and today logic. | Later |

---

## Core: Courses & task sets

**What:** Levvl ships with a small set of default courses. Each course has a short run (e.g. 5–7 days). **Each day can have multiple tasks** (e.g. Day 2 = “Take a 10 min walk” + “Stretch 5 min” + “Note how you feel”), ordered. Tasks have a type (action, reflection, learning, routine) so the app can show the right completion UI. Creator courses use the same shape.

**Why:** Onboarding picks “first focus”; that choice sets the user’s first course. Today we show that day’s task list; the user’s **unlock cap** (1, 2, or 3) decides how many they can complete today.

**Needs:** Schema: courses; course tasks with `courseId`, `dayIndex`, `orderInDay`, `title`, `type`, etc. Seed 2–4 default courses; some days can have 2–3 tasks.

<!-- GROWTH: More default courses (e.g. Write more, Mindfulness). Variable length (3 / 5 / 7 days). “Surprise me” / shuffle. Creator-built courses (same structure). Optional: categories or tags for explore. -->

---

## Core: Progression & unlocks

**What:** User has a **max tasks per day** cap: 1 at signup, then **2 at day 7**, **3 at day 30** (or similar). “Today’s tasks” is built from active course(s); we show the first `maxTasksPerDay` as completable; the rest are **locked** with copy like “Unlock 2 tasks per day at Day 7” or “You’ve done your 1 task for today.”

**Why:** Gives a clear progression, avoids “one task forever,” and motivates return (e.g. “Come back at day 7 to unlock more”).

**Needs:** User field e.g. `maxTasksPerDay` (1 | 2 | 3). Logic that checks “days since first completion” or “streak / total days” and upgrades cap at 7 and 30. UI to show locked tasks and unlock message.

<!-- GROWTH: More unlock tiers (4/day, 5/day). Unlock by streak vs calendar day. “Unlock early” (e.g. pay or share). -->

---

## Core: Benefits & milestones (“what you’ll look like”)

**What:** Show users what they get at milestones. **After 7 days:** e.g. “You’ll see your 7-day streak” and “You’ll unlock 2 tasks per day.” **After 30 days:** e.g. “You’ll see your reflection history” and “You’ll unlock 3 tasks per day.” Surfaces: in-app (e.g. profile or “Your progress”) and/or a short onboarding-style screen.

**Why:** Makes the future concrete; ties unlocks to time and builds anticipation.

**Needs:** Copy and optional simple visuals (e.g. “Day 7” / “Day 30” with one line each). Can be static at first; later hook to real streak/history.

<!-- GROWTH: More milestones (e.g. 14, 60). “What you’ll look like” preview in onboarding. Link to real streak/history when available. -->

---

## Core: User progress

**What:** Per user: which course(s) they’re in, which day per course, **how many tasks they’ve completed today** (so we don’t exceed cap). When they complete a task, increment today’s count; when the day rolls over, reset. Optional: streak (consecutive days with at least one completion). **Unlock level:** `maxTasksPerDay` upgraded at day 7 and day 30.

**Why:** Defines “today’s tasks,” enforces cap, and enables streak + unlock logic.

**Needs:** Schema: e.g. `userProgress` or `userCourseProgress` (userId, courseId, currentDay, lastCompletedAt, streak); user field for `maxTasksPerDay` and “tasks completed today” (or derive from completion records). Convex (or similar) to compute today’s list and apply cap.

<!-- GROWTH: Multiple active courses. Pause / resume. Streak freeze or grace day. History view (“What I did”). Export or share progress. -->

---

## Core: Today’s tasks (in-app)

**What:** One screen or section that shows **today’s task list** from active course(s). Each day in a course can have multiple tasks; we show them in order. The first **maxTasksPerDay** are completable (type-specific flow); the rest are shown as **locked** with the unlock message. “Complete” saves the response and increments today’s completed count (and advances day when appropriate—e.g. when calendar day changes or when all tasks for today are done; decide and document).

**Why:** Central in-app experience; widget and notification surface the same data. Without this, reminders and widget have nothing to show.

**Needs:** API that returns today’s tasks (with locked/completable and cap); UI that renders each task and the right completion component by type; lock state UI.

<!-- GROWTH: “I’ll do it later” vs “Done.” Optional “Skip today” with or without streak impact. Rich task content (image, link, video). Connect to onboarding “first task” moment. -->

---

## Core: Task types & interactions

**What:** Tasks have a type. Completion is not a single checkbox—it’s a type-specific interaction (e.g. reflection = short text, action = “I did it” + optional duration, learning = “I did it” + optional one-sentence takeaway). One “Complete” or “Save” at the end still advances the day.

**Why:** Makes completion feel meaningful; differentiates Levvl from a generic todo app; creates data that can be surfaced later (e.g. “You said this last week”).

**Suggested types to ship first:**

| Type | Completion interaction | Stored |
|------|-------------------------|--------|
| **Action** | “I did it” + optional duration (e.g. 5 / 10 / 15 min) or “Just did it” | completedAt, duration? |
| **Reflection** | One short text prompt (e.g. “One sentence: how do you feel?”) | completedAt, responseText |
| **Learning** | “I read/watched it” + optional “One sentence: main idea?” | completedAt, takeaway? |

**Needs:** Task type on each course task; UI components per type (input, duration picker, etc.); schema for completion payload (e.g. response text, duration).

<!-- GROWTH: More types (e.g. Routine with time-of-day or rating, Create with text/link output). Multiple prompts per task. Media upload (photo/audio). Review past responses in profile or “Your journey.” Let creators choose type when building courses. -->

---

## Simple: Reminder setting

**What:** In settings (or end of onboarding): “Daily reminder” toggle and a time picker. Store the chosen time per user.

**Why:** Notifications need a send time; user control improves acceptance and relevance.

**Needs:** User preference in schema (e.g. `reminderEnabled`, `reminderTime` or `reminderTimeUtc`). Settings UI to read/update it.

<!-- GROWTH: Multiple reminders (e.g. morning + evening). Per-course reminder. “Quiet days” or do-not-disturb window. Sync with system focus/Do Not Disturb. -->

---

## Simple: Notifications

**What:** Daily push at the user’s chosen time: “Your task for today: [task title].” Optional later: evening nudge if not completed (“You still have today’s task(s)”), or “Tomorrow’s tasks are ready.”

**Why:** Brings users back and reinforces daily tasks without opening the app.

**Needs:** Stored reminder time; push token (e.g. Expo); job or cron that runs daily, looks up users with reminders on, fetches today’s task, sends notification. No need for in-app notification UI beyond system permission prompt.

<!-- GROWTH: Rich notifications (action buttons: “Open” / “Mark done”). Local notifications as fallback if push is unavailable. Weekly digest. Streak milestone notifications (“7-day streak!”). -->

---

## Simple: Widget

**What:** Home screen (and optionally lock screen) widget. Shows “Today’s task: [title]” (or first of N tasks) and optionally “Tap to open.” Single widget size to start.

**Why:** Visibility without opening the app; reinforces daily habit.

**Needs:** Widget extension (iOS/Android) that reads “today’s tasks” from shared storage (e.g. App Group) or from a small authenticated endpoint. App updates the shared data when it has it (or widget fetches on a schedule if supported). Fallback copy when no task (“You’re done for today” or “Open Levvl to get started”).

<!-- GROWTH: Multiple widget sizes. Streak on widget. “Mark complete” from widget (if platform allows). Lock screen / Live Activity. -->

---

## Later: Create (creator)

**What:** Creators build courses with the **same structure**: days, and **multiple tasks per day** (ordered, with type). Participants see “today’s tasks” from that course in the same list as Levvl courses; the **same cap** (maxTasksPerDay) applies. Creator courses don’t change unlock rules—they add more tasks to the pool; we still only allow completing up to the user’s cap per day.

**Why:** Enables “create your own to share” from onboarding and differentiates Levvl as a creator tool. One consistent model for Levvl and creator content.

**Needs:** Schema for creator-owned courses and tasks (course + tasks with dayIndex, orderInDay, type); editor UI; share/invite flow; access control. Same “today’s tasks” and progress logic as Levvl courses.

<!-- GROWTH: Templates, duplicate/edit Levvl courses. Analytics (completion rate, drop-off by day). Payments or gated courses. Community or cohort start dates. -->

---

## Later: Explore

**What:** Users can browse or search courses from other creators (or Levvl). Start a course and get daily tasks like with default Levvl courses. Optional: follow creators, recommendations.

**Why:** “Explore courses others have made” from onboarding; completes the loop.

**Needs:** Discovery surface (list/search); schema for public/explorable courses; “Start this course” and plug into same user progress and today’s task logic.

<!-- GROWTH: Categories, trending, “Because you did X.” Reviews or ratings. Social proof (e.g. “12k completed”). -->

---

## Onboarding integration

**Goal:** Weave progression, benefits, and “today’s tasks” into onboarding so users see the full picture early. This section describes *how* to integrate; the exact flow and copy remain in `docs/onboarding.md`.

| Onboarding moment | Integration idea |
|-------------------|------------------|
| **After “Why it works” (Screen 2)** | Add a short **benefits/milestone** block or screen: “After 7 days you’ll see your streak and unlock 2 tasks per day. After 30 days you’ll see your reflection history and unlock 3.” Optional: one simple visual (Day 7 / Day 30). |
| **“What you’ll get” (Screen 3)** | Mention: “You’ll start with one task per day. Stick with it and you’ll unlock more.” So “unlock more” is promised before they pick a course. |
| **First focus (Screen 6)** | No change to flow; course choice still sets first course. Optional: one line that “this course has multiple tasks on some days; you’ll unlock doing more over time.” |
| **First task (Screen 8)** | Use the **type-specific interaction** (reflection, action, learning) so the first completion feels like the real product, not a generic checkbox. |
| **After first win (Screen 9)** | Add one line: “At day 7 you’ll unlock a second task per day.” Reinforces progression. |
| **Before “Take me home”** | Optional: “Set a daily reminder?” (time picker) so reminder is part of onboarding; store in user settings. |

**Note:** This doc does not change the screen order or copy in `onboarding.md`; it only describes where features (unlocks, benefits, reminder) can be referenced or surfaced.

<!-- GROWTH: Dedicated “What you’ll unlock” screen. A/B test reminder placement. Connect milestone copy to real in-app progress when available. -->

---

## Growth areas (overview)

| Area | Notes |
|------|--------|
| **Courses** | More defaults, variable length, categories, creator courses (same structure). |
| **Progression & unlocks** | More tiers (4/day, 5/day), unlock by streak vs calendar day, “unlock early.” |
| **Benefits & milestones** | More milestones (14, 60), preview in onboarding, link to real streak/history. |
| **Progress** | Multiple active courses, pause, streak rules, history, export. |
| **Today’s tasks** | Skip/later, rich content, link to onboarding first task. |
| **Task types** | New types, multiple prompts, media, past responses, creator choice. |
| **Reminders** | Multiple times, per-course, quiet hours. |
| **Notifications** | Rich actions, local fallback, digest, streak milestones. |
| **Widget** | Sizes, streak, mark complete, Live Activity. |
| **Create** | Templates, analytics, payments, cohorts. |
| **Explore** | Discovery, recommendations, ratings, social proof. |
| **Onboarding integration** | Dedicated “What you’ll unlock” screen, reminder placement, link to real progress. |
| **Cross-cutting** | Keep feature and onboarding docs in sync as flows evolve. |
