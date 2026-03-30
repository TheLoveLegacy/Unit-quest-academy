# START HERE — Mission Control Phase 0

Welcome! This is your operational dashboard hub.

---

## **What You Have**

A **working Next.js application** that's ready to:
1. Track all 112 UQA units (scripts → filming → editing → live)
2. Manage your mom's review queue (clear, actionable tasks)
3. Assign tasks to team members (mom, Alaina, agents)
4. Give everyone visibility (no more scattered information)

---

## **Quick Start (2 hours)**

### Step 1: Set Up Database (45 min)

1. **Create Supabase account** → https://supabase.com
2. **Create new project** (free tier is fine)
3. **Open SQL editor** in Supabase
4. **Copy the schema** from `SETUP-GUIDE.md` (in this folder)
5. **Paste into SQL editor** and run
6. **Copy your connection string** (you'll need it next)

### Step 2: Configure Environment (15 min)

1. **Open `.env.local`** in this folder
2. **Paste your Supabase URL and KEY** (from Step 1)
3. Save the file

### Step 3: Run Locally (30 min)

```bash
cd mission-control
npm install  # (if not done already)
npm run dev
```

Open http://localhost:3000 in your browser.

You should see the dashboard.

---

## **What You're Looking At**

**Dashboard Home:**
- Summary cards (# units scripted, filming, live)
- Your tasks this week
- Mom's queue status
- Quick navigation

**UQA Pipeline:**
- All 112 units in a sortable table
- Filter by status or subject
- Click to see details
- Edit status inline

**Mom's Queue:**
- Units waiting for her review
- Overdue highlighting (red)
- Action buttons (Start Review, Send Feedback, Mark Done)
- Shows progress (% complete)

**Tasks:**
- All team tasks visible
- Filter by person or priority
- Assign new tasks
- Track status (pending → complete)

---

## **Next Steps**

### To Deploy (Friday)

Follow **DEPLOYMENT-CHECKLIST.md** (in this folder).

It will walk you through:
1. Push code to GitHub
2. Deploy to Vercel (1 click)
3. Your domain points to it
4. Live! 🎉

### To Onboard Team

**For your mom:**
- Send her the link
- Attach **MOM-QUICK-START.md** (5-min guide)
- She can start reviewing immediately

**For Alaina:**
- Send her the link
- Attach **ALAINA-QUICK-START.md** (5-min guide)
- She can start helping with tasks

---

## **Stuck?**

See **ADAM-ADMIN-GUIDE.md** for troubleshooting + detailed workflows.

---

## **That's It**

You have a working dashboard. Next step: Run it locally (Step 3 above).

Questions? Check the docs in this folder.

---

**Status:** ✅ Ready to use. Let's build! 🚀
