# DEPLOYMENT CHECKLIST — Deploy to Vercel

**Goal:** Get your dashboard live on your domain by Friday.

---

## **Pre-Deployment (Do This First)**

- [ ] Mission Control runs locally (`npm run dev` works)
- [ ] No console errors when you open http://localhost:3000
- [ ] Database is set up (see SETUP-GUIDE.md)
- [ ] `.env.local` has correct Supabase credentials

---

## **Step 1: Push to GitHub (10 min)**

### 1.1: Create GitHub Repository

1. Go to https://github.com/new
2. Create new repo: `mission-control`
3. Do NOT initialize with README (you already have one)
4. Click **"Create repository"**
5. Copy the **HTTPS URL** (looks like `https://github.com/yourname/mission-control.git`)

### 1.2: Push Your Code

```bash
cd mission-control

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial Mission Control Phase 0"

# Add remote (paste the URL from Step 1.1)
git remote add origin https://github.com/yourname/mission-control.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Done! Your code is now on GitHub.

---

## **Step 2: Deploy to Vercel (5 min)**

### 2.1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Sign in (or create account)
3. Click **"Import Project"**
4. Select **"Import Git Repository"**
5. Click **"GitHub"**
6. Sign in to GitHub (if prompted)
7. Find `mission-control` repo and click **"Import"**

### 2.2: Configure Vercel Project

1. **Project name:** `mission-control` (default is fine)
2. **Framework:** Next.js (should auto-detect)
3. **Root Directory:** `./` (default)
4. **Build Command:** `npm run build` (default)

### 2.3: Add Environment Variables

1. Click **"Environment Variables"**
2. Add these (copy from your `.env.local`):
   - Name: `NEXT_PUBLIC_SUPABASE_URL` → Value: (your Supabase URL)
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Value: (your Supabase key)
3. Click **"Deploy"**

Vercel will now build and deploy automatically. Wait ~2-3 minutes.

You should see:
```
✓ Production build completed
✓ Deployed to vercel.com
```

### 2.4: Get Your Live URL

After deployment, Vercel shows a URL like:
```
https://mission-control-xxxxx.vercel.app
```

**Test it:** Open this URL in your browser. You should see your dashboard!

---

## **Step 3: Connect Your Domain (10 min)**

Your domain `unitquest.academy` should already point to Vercel (from earlier setup). But let's verify:

### 3.1: Add Domain to Vercel

1. In Vercel project, click **"Settings"** → **"Domains"**
2. Add domain: `unitquest.academy`
3. Vercel will show nameserver instructions (you already did this)
4. Click **"Verify"**

If it shows "Valid", you're done! Your domain now points to Mission Control.

### 3.2: Test Your Domain

1. Open https://unitquest.academy in your browser
2. You should see your Mission Control dashboard
3. ✅ Live!

---

## **Step 4: Celebrate! 🎉**

Your dashboard is now live and accessible to your team.

Next: Share the link with your mom and Alaina.

---

## **Troubleshooting**

**"Build failed"**
- Check Vercel build logs (click "View" in deployment)
- Make sure `.env.local` vars are in Vercel Settings
- Make sure Supabase schema ran successfully

**"Page shows blank"**
- Wait 1 minute, refresh
- Check browser console (F12) for errors
- Make sure Supabase URL is correct in Vercel Settings

**"Domain not working"**
- DNS takes 10-48 hours to propagate
- Try https://dnschecker.org to check status
- In meantime, use Vercel's auto-generated URL (`mission-control-xxxxx.vercel.app`)

---

## **Done**

Your dashboard is live. Next: onboard your team (see MOM-QUICK-START.md and ALAINA-QUICK-START.md).

Questions? See ADAM-ADMIN-GUIDE.md.
