# 🚀 FRIDAY DEPLOYMENT CHECKLIST (April 4, 2026)

**Target:** Deploy Mission Control (with Scripts) to Vercel at `unitquest.academy`
**Timeline:** 60 minutes (10:00 AM–11:00 AM EDT)
**Status:** ✅ ALL DEPENDENCIES READY (Supabase live, scripts uploaded, local build passing)

---

## ⏱️ Timeline Overview

```
10:00 AM–10:10 AM | GitHub Push + Build Verify (10 min) ✓
10:10 AM–10:30 AM | Vercel Deployment (20 min) ✓
10:30 AM–10:50 AM | Production Testing (20 min) ✓
10:50 AM–11:00 AM | DNS + Final Checks (10 min) ✓
```

**Alarm:** Set for 9:45 AM Friday (15-min warning before 10:00 AM start)

---

## 📋 Pre-Deployment Checklist (Do Thursday Evening)

- [ ] **All scripts uploaded to Supabase**
  - Verify: `SELECT COUNT(*) FROM scripts;` in Supabase SQL Editor
  - Expected: ≥ 40 rows (all units uploaded)
  
- [ ] **Mission Control builds locally without errors**
  - Run: `cd /mission-control && npm run build`
  - Expected: "successfully" or "✓" message (no errors)
  - Stop: Ctrl+C

- [ ] **Environment variables are correct**
  - Check: `cat .env.local` in mission-control/
  - Ensure: NEXT_PUBLIC_SUPABASE_URL is production URL (not localhost)
  - Note: Supabase credentials same on prod and dev (RLS policies control access)

- [ ] **Git repo is clean**
  - Run: `cd /mission-control && git status`
  - Expected: "nothing to commit, working tree clean"
  - If not clean: `git add . && git commit -m "Pre-deployment checkpoint"`

**Pre-work time:** 15 minutes Thursday evening

---

## 🟢 PART 1: GitHub Push (10:00 AM–10:10 AM)

### Step 1.1: Final Local Build Check

```bash
cd /Users/adamknopf/.openclaw/workspace/mission-control
npm run build
```

**Expected:** 
- "successfully generated static optimization..." or ✓ symbol
- Takes ~2–3 minutes
- No errors (red text)

**⚠️ If build fails:**
- Check error message (likely import or type error)
- Fix error, rebuild
- Don't proceed to push until build passes

### Step 1.2: Commit Changes (If Any)

```bash
cd /Users/adamknopf/.openclaw/workspace/mission-control
git status
```

**If nothing to commit:** Skip to Step 1.3

**If changes exist:**
```bash
git add .
git commit -m "Scripts database integration complete - ready for production"
git push origin main
```

**Expected:** Push completes (no authentication errors)

### Step 1.3: Verify GitHub

1. Go to: https://github.com/YOUR_USERNAME/mission-control
2. Click **"Code"** tab
3. Verify the commit timestamp is recent (within last minute)
4. Check that `mission-control/` directory is visible with latest files

**Expected:** Latest commit shows "Scripts database integration" ✓

---

## 🟢 PART 2: Vercel Deployment (10:10 AM–10:30 AM)

### Step 2.1: Access Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click your **"mission-control"** project

**Expected:** Project dashboard loads, shows git history

### Step 2.2: Deploy

1. Click **"Deployments"** (left sidebar)
2. Click **"Deploy"** (or "Redeploy" if recent)
   - **Or:** New commit auto-triggers (check if it already deployed)

**Expected:** 
- Deployment starts (spinning indicator)
- Takes ~3–5 minutes
- Status changes from "Building" → "Ready"
- A new deployment URL appears (e.g., `https://mission-control-abc123.vercel.app`)

**⚠️ If deployment fails:**
- Check **"Build Logs"** for error message
- Common issues:
  - Missing environment variables (add in Vercel → Settings → Environment Variables)
  - Build error (same as Step 1.1, check locally)
  - Out of memory (restart Vercel build)

### Step 2.3: Verify Deployment URL Works

1. Once status shows **"Ready"**, click the URL (auto-generated)
2. Dashboard should load in browser

**Expected:**
- Mission Control homepage loads
- No 404 or 500 errors
- Dashboard links work (sidebar clickable)
- Scripts page loads: `/dashboard/scripts`

---

## 🟢 PART 3: DNS Configuration (10:30 AM–10:50 AM)

### Step 3.1: Add Custom Domain

1. **Vercel:** Project → Settings (top right) → **"Domains"**
2. Click **"Add Domain"**
3. Enter: `unitquest.academy`

**Expected:** Vercel shows DNS configuration steps

### Step 3.2: Update DNS Records

Your domain registrar (GoDaddy, Namecheap, etc.) needs updating:

1. **Vercel shows 2–4 DNS records to add:**
   - Type: CNAME
   - Name: `unitquest.academy` (or `www.unitquest.academy`)
   - Value: Vercel-provided CNAME (e.g., `cname.vercel-dns.com`)

2. **Log into your domain registrar:**
   - GoDaddy: DNS Management → DNS Records
   - Namecheap: Manage Domain → Advanced DNS
   - Other: Find DNS/Records section

3. **Add CNAME record:**
   - Name: `unitquest.academy`
   - Type: CNAME
   - Value: [Vercel-provided value]
   - TTL: 3600 (default)
   - Click "Save"

4. **Wait for DNS propagation** (5–30 minutes)

### Step 3.3: Verify Domain Points to Vercel

1. Go back to **Vercel → Domains**
2. Status should change from "Pending" → "Valid" (may take 5–15 minutes)
3. Once valid, visit: `https://unitquest.academy`

**Expected:** 
- Mission Control loads at custom domain ✓
- Browser shows green lock (HTTPS) ✓
- All pages/scripts work ✓

---

## 🟢 PART 4: Production Testing (10:50 AM–11:00 AM)

### Step 4.1: Test Critical Paths

1. **Homepage:** `https://unitquest.academy`
   - [ ] Dashboard loads
   - [ ] Sidebar visible
   - [ ] No console errors (F12)

2. **Scripts Page:** `https://unitquest.academy/dashboard/scripts`
   - [ ] 40 scripts visible in list
   - [ ] Search works (try searching for "Life")
   - [ ] Filter by subject works (click "Science")
   - [ ] Click script → detail view loads
   - [ ] Feedback panel visible

3. **Mom's Queue:** `https://unitquest.academy/dashboard/queue`
   - [ ] Units in review visible
   - [ ] Can filter by status
   - [ ] Can mark as reviewed

4. **Supabase Connection:**
   - Scripts data should be live from production Supabase (same DB as local)
   - All 40 scripts visible and searchable

### Step 4.2: Check Performance

1. Open DevTools: F12 → **"Network"** tab
2. Reload page: Cmd+R
3. Check load time (should be <3 seconds)

**Expected:**
- Largest resource <2 MB
- Total load <1 MB
- No failed requests (404, 500, etc.)

### Step 4.3: Verify Environment

1. Check: `https://unitquest.academy/` (any page)
2. Open DevTools: F12 → **"Console"**
3. Look for errors (red text)

**Expected:** 
- No errors
- No warnings about missing data
- All API calls to Supabase succeed (check Network tab)

---

## ✅ Success Criteria

By 11:00 AM Friday, you should have:

- ✅ Code pushed to GitHub (latest commit visible)
- ✅ Vercel deployment successful (status = "Ready")
- ✅ Custom domain `unitquest.academy` points to Vercel
- ✅ Mission Control loads at `https://unitquest.academy`
- ✅ All 40 scripts visible in production
- ✅ Feedback system works
- ✅ No console errors or failed API calls
- ✅ Page loads in <3 seconds

**Time invested:** 60 minutes
**Result:** Mission Control live + production-ready for team collaboration

---

## 📊 Post-Deployment (Friday PM)

Once deployed:

1. **Share with team:** Send `https://unitquest.academy` to Mom + Alaina
2. **Onboarding:** Walk them through Scripts page (5 min each)
3. **Start feedback loop:** They can review scripts, add feedback
4. **Monitor:** Watch Vercel Deployments for any errors (auto-rollback if needed)

---

## 🔗 Reference Files

**If you need help:**
- Local setup: `MONDAY-ACTIVATION-CHECKLIST.md`
- Scripts overview: `SCRIPTS-START-HERE.md`
- Full setup: `SCRIPTS-SETUP.md`
- Mom's guide: `MOM-SCRIPTS-GUIDE.md`

---

## ⚡ Troubleshooting

**Deployment fails to build?**
- Check build logs in Vercel
- Run `npm run build` locally to find same error
- Fix locally, push to GitHub, Vercel auto-redeploys

**Domain not pointing to Vercel?**
- DNS takes 5–30 minutes to propagate
- Check: `nslookup unitquest.academy` should show Vercel's IP
- In Vercel, status should show "Valid" (not "Pending")

**Scripts not visible in production?**
- Verify `.env.local` has correct Supabase URL (production, not localhost)
- Check Supabase RLS policies aren't blocking reads
- Test: `SELECT * FROM scripts LIMIT 5;` in Supabase SQL Editor

**Performance slow?**
- Check Vercel: Settings → Usage (may be hitting API limits)
- Check Supabase: Database → Usage (may be over quota)
- Both should show green ✓ under limits

**Rollback if critical error?**
- Vercel: Deployments → Click previous deployment → "Promote to Production"
- GitHub: `git revert HEAD` and push (creates new commit)
- Both restore previous working state in <2 minutes

---

## 🎯 One-Line Reminder

**Friday 10 AM: Push → Deploy → Test domain → Done by 11 AM**

---

_Created: 2026-03-29 (Saturday)_
_For: Adam (Friday April 4, 2026)_
_Time Estimate: 60 minutes_
_Status: ✅ READY TO USE_
