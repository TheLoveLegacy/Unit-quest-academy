# 🚀 MONDAY ACTIVATION CHECKLIST (April 1, 2026)

**Target:** Add scripts database to Mission Control + activate Mom's Queue
**Timeline:** 90 minutes (9:00 AM–10:30 AM EDT)
**Status:** ✅ ALL DEPENDENCIES READY

---

## ⏱️ Timeline Overview

```
9:00 AM–9:10 AM   | Database Setup (10 min) ✓
9:10 AM–9:25 AM   | Supabase Verification (15 min) ✓
9:25 AM–9:45 AM   | Local Testing (20 min) ✓
9:45 AM–10:15 AM  | Upload Initial Scripts (30 min) ✓
10:15 AM–10:30 AM | Mom's Access + Final QA (15 min) ✓
```

**Alarm:** Set for 8:45 AM Sunday evening (15-min warning before 9:00 AM Monday start)

---

## 📋 Pre-Work (Do Saturday Evening or Sunday Morning)

- [ ] **Verify Supabase credentials**
  - Check `.env.local` in `/mission-control/`
  - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present
  - Command: `cat .env.local | grep SUPABASE`
  - Expected: Two URLs/keys visible
  
- [ ] **Verify Mission Control is building**
  - Open terminal in `/mission-control/`
  - Run: `npm run dev`
  - Expected: "ready - started server on 0.0.0.0:3000" (no errors)
  - Visit: `http://localhost:3000` (dashboard loads, no console errors)
  - Stop: Press Ctrl+C

- [ ] **Verify scripts files exist**
  - Check: `ls -la /Users/adamknopf/.openclaw/workspace/01-SCRIPTS/`
  - Expected: Science/, History/, Math/, Art/, Geography/, Reading/ folders + master index
  - Verify: `SCRIPTS-INDEX-MASTER.md` readable

**Pre-work time:** 10 minutes (do while coffee brewing)

---

## 🟢 PART 1: Database Setup (9:00 AM–9:10 AM)

### Step 1.1: Open Supabase

1. Go to: https://app.supabase.com/
2. Click your UQA project (mission-control)
3. Click **SQL Editor** (left sidebar)

**Expected:** SQL editor is blank/ready

### Step 1.2: Create Schema

1. Click **"New Query"** (top right)
2. Copy entire contents of: `/Users/adamknopf/.openclaw/workspace/mission-control/SQL-SCRIPTS-SCHEMA.sql`
3. **Paste into the SQL Editor window**
4. **Click "Run"** (blue button, top right)

**Expected output:** Success message
- "Query successful" ✓
- Or: "Multiple statements executed successfully"

**⚠️ If error:** 
- Check if tables already exist: `\d scripts` in SQL Editor
- If yes: Skip to Step 1.3
- If no: Paste schema again, check for syntax errors (missing semicolons, etc.)

### Step 1.3: Verify Tables Created

1. Click **Table Editor** (left sidebar)
2. You should now see three new tables:
   - [ ] `scripts` ✓
   - [ ] `script_feedback` ✓
   - [ ] `script_activity_log` ✓

**Expected:** All three tables visible in dropdown

---

## 🟢 PART 2: Supabase Verification (9:10 AM–9:25 AM)

### Step 2.1: Check Table Structure

1. Click **Table Editor**
2. Click the **`scripts`** table (dropdown)
3. Look at column names (top row shows: id, unit_number, unit_name, subject, script_title, script_content, etc.)

**Expected columns:** 
- id, unit_number, unit_name, subject, script_title, script_status, script_content, estimated_duration_minutes, age_range, learning_objectives, key_concepts, nova_dialogue_hook, video_script_notes, game_connection, created_by, created_at, updated_at, published_at

**Count:** ~18 columns ✓

### Step 2.2: Test Feedback Table

1. Click **`script_feedback`** (dropdown)
2. Verify columns: id, script_id, unit_id, feedback_type, status, author_name, author_role, feedback_text, section_name, resolved_by, created_at, updated_at

**Expected:** 12 columns visible ✓

### Step 2.3: Test Activity Log

1. Click **`script_activity_log`** (dropdown)
2. Verify columns: id, script_id, unit_id, action, actor_name, details, created_at

**Expected:** 7 columns visible ✓

---

## 🟢 PART 3: Local Testing (9:25 AM–9:45 AM)

### Step 3.1: Start Mission Control Dev Server

```bash
cd /Users/adamknopf/.openclaw/workspace/mission-control
npm run dev
```

**Expected:** 
- "ready - started server on 0.0.0.0:3000" (no errors)
- Takes ~30 seconds

### Step 3.2: Visit Scripts Page

1. Open browser: `http://localhost:3000`
2. Click **Dashboard** (left sidebar)
3. Click **Scripts** (left sidebar, under Dashboard)

**Expected:** 
- Scripts page loads
- Message: "No scripts yet" OR sample scripts appear (if they were pre-loaded)
- No console errors (F12 → Console tab)

### Step 3.3: Verify React Components

1. Open browser dev tools: F12
2. Click **Console** tab
3. Check for errors (red text)

**Expected:** 
- No errors
- No warnings about missing tables/data
- Page fully loads with blue buttons visible

**⚠️ If error "relation 'scripts' does not exist":**
- Supabase schema didn't apply
- Go back to PART 1 and re-run SQL

---

## 🟢 PART 4: Upload Initial Scripts (9:45 AM–10:15 AM)

### Step 4.1: Prepare 2 Sample Scripts

These are **pre-written** and ready to use:

**Script 1: Life Cycles V1**
- **File:** `/Users/adamknopf/.openclaw/workspace/01-SCRIPTS/Science/01-LifeCycles-V1-SCRIPT.md`
- **Unit Number:** 1
- **Unit Name:** Life Cycles
- **Subject:** Science
- **Script Title:** Life Cycles: What is a Life Cycle? (Video 1)
- **Age Range:** 6-9
- **Estimated Duration:** 9 minutes
- **Status:** draft

**Script 2: Water Cycle V1**
- **File:** `/Users/adamknopf/.openclaw/workspace/01-SCRIPTS/Science/02-WaterCycle-V1-SCRIPT.md`
- **Unit Number:** 2
- **Unit Name:** Water Cycle
- **Subject:** Science
- **Script Title:** Water Cycle: What is the Water Cycle? (Video 1)
- **Age Range:** 6-9
- **Estimated Duration:** 9 minutes
- **Status:** draft

### Step 4.2: Upload Script 1 (Manual Method)

1. **Supabase Table Editor** → `scripts` table
2. Click **"Insert row"** (or green "+" button)
3. **Fill in these fields:**

```
unit_number: 1
unit_name: Life Cycles
subject: Science
script_title: Life Cycles: What is a Life Cycle? (Video 1)
script_status: draft
age_range: 6-9
estimated_duration_minutes: 9
activity_duration_minutes: 35
nova_dialogue_hook: Did you know that butterflies start as tiny eggs? Let's explore the amazing life cycle of living things!
video_script_notes: Film with close-up macro photography of butterfly eggs, caterpillars, chrysalis. Animate the transformation sequence.
game_connection: Life Cycles Master (complete all 4 life cycle lessons)
created_by: Adam
```

4. **For script_content:** Copy entire text from `/01-SCRIPTS/Science/01-LifeCycles-V1-SCRIPT.md`
5. **Paste into `script_content` field**
6. **Click "Save"**

**Expected:** Row appears in table ✓

### Step 4.3: Upload Script 2 (Same Method)

Repeat Step 4.2 with Water Cycle V1 data:

```
unit_number: 2
unit_name: Water Cycle
subject: Science
script_title: Water Cycle: What is the Water Cycle? (Video 1)
script_status: draft
age_range: 6-9
estimated_duration_minutes: 9
activity_duration_minutes: 35
nova_dialogue_hook: Have you ever wondered where rain comes from? Let's follow the water cycle!
video_script_notes: Animate water cycle diagram: evaporation → condensation → precipitation → collection.
game_connection: Water Cycle Explorer (complete all 4 water cycle lessons)
created_by: Adam
```

**Expected:** Second row appears ✓

### ⚡ Step 4.4: FASTER METHOD (Recommended if 4.2–4.3 is slow)

If manual upload is taking too long:

1. **Copy this CSV:**

```csv
unit_number,unit_name,subject,script_title,script_status,age_range,estimated_duration_minutes,activity_duration_minutes,nova_dialogue_hook,video_script_notes,game_connection,created_by,script_content
1,Life Cycles,Science,Life Cycles: What is a Life Cycle? (Video 1),draft,6-9,9,35,Did you know that butterflies start as tiny eggs?,Film with close-up macro photography.,Life Cycles Master,Adam,"[PASTE FULL SCRIPT 1 HERE]"
2,Water Cycle,Science,Water Cycle: What is the Water Cycle? (Video 1),draft,6-9,9,35,Have you ever wondered where rain comes from?,Animate water cycle diagram.,Water Cycle Explorer,Adam,"[PASTE FULL SCRIPT 2 HERE]"
```

2. **Supabase:** Table Editor → `scripts` → Click menu (three dots) → **"Import data"**
3. **Upload CSV**
4. **Done in 2 minutes**

---

## 🟢 PART 5: Mom's Access + Final QA (10:15 AM–10:30 AM)

### Step 5.1: Verify Mom Can See Scripts

1. **Mission Control running locally?** (Step 3.1)
2. Visit: `http://localhost:3000/dashboard/scripts`
3. You should see **2 scripts in list:**
   - Life Cycles (unit 1)
   - Water Cycle (unit 2)

### Step 5.2: Test Feedback System

1. Click **"Life Cycles"** script
2. Scroll down to **"Feedback" section**
3. Type: "Test feedback - looks great!"
4. Select **Type:** "comment"
5. Select **Author:** Mom (or create new)
6. Click **"Submit Feedback"**

**Expected:** 
- Feedback appears below
- Feedback shows author, type, date
- Status shows "open"

### Step 5.3: Create Mom's Account (If Needed)

If Mom needs her own login:

1. **Supabase → Authentication (left sidebar)**
2. Click **"Invite"** (top right)
3. Enter Mom's email
4. Send invite
5. Mom clicks link, sets password
6. Mom can now access scripts

**Or:** Share the dashboard link + single login (simpler)

### Step 5.4: Final Checks

- [ ] 2 sample scripts visible in list ✓
- [ ] Can click script and view full content ✓
- [ ] Can add feedback ✓
- [ ] Feedback appears in panel ✓
- [ ] No console errors (F12 → Console) ✓
- [ ] Mom can access (share link) ✓

---

## 📊 Success Criteria

By 10:30 AM, you should have:

- ✅ Supabase database created with 3 tables
- ✅ Mission Control Scripts page loads
- ✅ 2 sample scripts visible and searchable
- ✅ Can view full script content
- ✅ Can add and resolve feedback
- ✅ Mom can access and comment

**Time invested:** 90 minutes
**Result:** Operational scripts database, ready for ongoing use + 40-unit upload

---

## 📁 Next Steps (After Monday)

Once this checklist is complete:

1. **Tuesday–Thursday:** Upload remaining 38 scripts (in batches)
2. **Friday:** Deploy to Vercel (same scripts database, now on production)
3. **Weekend:** Onboard Mom + Alaina, start collaborative reviews

**Ongoing:** Scripts database becomes living system (Adam creates, Mom reviews, feedback loop)

---

## 🔗 Reference Files

**If you need help:**
- Full setup: `SCRIPTS-SETUP.md`
- Quick ref: `SCRIPTS-QUICK-START.md`
- Mom's guide: `MOM-SCRIPTS-GUIDE.md`
- SQL schema: `SQL-SCRIPTS-SCHEMA.sql`
- Master index: `/01-SCRIPTS/SCRIPTS-INDEX-MASTER.md`

---

## ⚡ Emergency Recovery

**If something breaks:**

1. **Scripts page shows error?**
   - Check `.env.local` has correct Supabase keys
   - Restart dev server: Ctrl+C, then `npm run dev`

2. **Can't find tables?**
   - Go back to PART 1, re-run SQL schema
   - Check Supabase Table Editor to confirm tables exist

3. **Feedback not saving?**
   - Check browser console (F12) for error
   - Verify `script_id` is correct
   - Supabase RLS policies might be blocking (check: Security → Policies)

4. **Too slow?**
   - Use CSV import (Step 4.4) instead of manual upload
   - Much faster for multiple scripts

---

## 🎯 One-Line Reminder

**Monday 9 AM: Supabase SQL → Local test → Upload 2 scripts → Done by 10:30 AM**

---

_Created: 2026-03-29 (Saturday)_
_For: Adam (Monday morning execution)_
_Time Estimate: 90 minutes_
_Status: ✅ READY TO USE_
