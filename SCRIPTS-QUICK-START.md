# Scripts Database — Quick Start Card

**Print this or keep it handy. You'll need it for the next few hours.**

---

## 🚀 Right Now (5 minutes)

```bash
# 1. Open Supabase
# 2. SQL Editor → New Query
# 3. Copy entire contents of: SQL-SCRIPTS-SCHEMA.sql
# 4. Paste into SQL Editor
# 5. Click "Run"
# 6. Wait for success ✅
```

**Your database is ready.**

---

## 💻 Next (5 minutes)

```bash
# Run Mission Control locally
cd mission-control
npm run dev

# Visit: http://localhost:3000/dashboard/scripts
# You should see 2 sample scripts
```

**Code is already integrated.**

---

## 📚 Upload Scripts (30-60 minutes)

### Choose ONE method:

**A) Dashboard Upload (Easiest)**
- Supabase → Table Editor → scripts
- Click "Insert row"
- Fill in fields
- Save
- Repeat for each script
- ⏱️ Slow for many scripts

**B) CSV Upload (Best)**
- Create CSV with columns
- Supabase → scripts → Import data
- Upload CSV
- Map columns
- Import
- ⏱️ Fast for 10+ scripts

**C) Node.js Upload (Automated)**
- Create `upload-scripts.js`
- Add your scripts to array
- Run: `node upload-scripts.js`
- Done
- ⏱️ Fastest for automation

**Read SCRIPTS-SETUP.md (Part 2)** for detailed instructions.

---

## 👩 Tell Mom (5 minutes)

1. Send her the link: `/dashboard/scripts`
2. Send her: `MOM-SCRIPTS-GUIDE.md`
3. Show her once (2 min demo)
4. She's ready ✅

**She can start reviewing immediately.**

---

## 🔗 Optional: Link UQA Pipeline (15 minutes)

Want to see script status in your units view?

**Read:** `UQA-SCRIPTS-INTEGRATION.md`

**Then:** Update UQA pipeline page per instructions

**Benefits:**
- See which units have scripts
- Jump from unit to script directly
- Track progress in one view

---

## 📋 Progress Tracker

- [ ] Database created (SQL schema run)
- [ ] Scripts page loads locally
- [ ] Sample scripts display
- [ ] Uploaded first 5+ scripts
- [ ] Mom can access and use it
- [ ] Tested feedback workflow
- [ ] UQA Pipeline linked (optional)
- [ ] Deployed to production (optional)

**Minimum viable:** First 3 items = 15 min setup

---

## 🆘 When Things Break

| Problem | Solution |
|---------|----------|
| Scripts page won't load | Run the SQL schema first |
| Can't see sample scripts | Refresh browser (Ctrl+R) |
| Search doesn't work | Scripts need content in `script_content` field |
| Feedback won't submit | Check browser console (F12), look for errors |
| Can't find SQL file | It's at: `mission-control/SQL-SCRIPTS-SCHEMA.sql` |
| Mom can't see feedback | Make sure `.env.local` has correct Supabase URL |

**Detailed help:** See SCRIPTS-SETUP.md (Troubleshooting section)

---

## 📖 Documentation Map

**Start here:**
- `SCRIPTS-README.md` — Overview
- `SCRIPTS-SETUP.md` — Setup instructions

**Then:**
- `MOM-SCRIPTS-GUIDE.md` — Share with Mom
- `SCRIPTS-IMPLEMENTATION-CHECKLIST.md` — Track progress

**Optional:**
- `UQA-SCRIPTS-INTEGRATION.md` — Link to UQA Pipeline
- `SCRIPTS-COMPLETE-DELIVERY.md` — Full details
- `SCRIPTS-FILES-MANIFEST.md` — What each file does

---

## ⏱️ Time Estimate

| Task | Time |
|------|------|
| Database setup | 5 min |
| Test locally | 5 min |
| Upload 5 scripts | 15-30 min |
| Show Mom | 10 min |
| Test feedback | 10 min |
| UQA integration | 15 min (optional) |
| **TOTAL** | **60-75 min** |

---

## 💡 Pro Tips

✅ **Upload scripts in batches** — Don't try all 112 at once. Do 10, test, then 20 more.

✅ **Script format matters** — Use markdown. See SCRIPTS-SETUP.md Part 6 for format.

✅ **Mom's feedback is gold** — Encourage detailed comments. They help you improve.

✅ **Keep JSON clean** — learning_objectives and key_concepts need valid JSON.

✅ **Test locally first** — Make sure everything works before showing Mom.

✅ **Version everything** — Increment script_version when you update.

---

## 🎯 Success Looks Like

You did it right when:

1. Scripts page shows your scripts ✅
2. Search finds them ✅
3. Can view full content ✅
4. Mom can add feedback ✅
5. Feedback appears instantly ✅
6. Can resolve feedback ✅
7. No console errors ✅

---

## 📞 Need Help?

1. **Before starting?** Read SCRIPTS-README.md (5 min)
2. **During setup?** Read SCRIPTS-SETUP.md (10 min)
3. **Mom needs help?** Share MOM-SCRIPTS-GUIDE.md (2 min)
4. **UQA linking?** Read UQA-SCRIPTS-INTEGRATION.md (15 min)
5. **Stuck?** Check SCRIPTS-SETUP.md Troubleshooting section

---

## The Files You Need

| File | Why | When |
|------|-----|------|
| `SQL-SCRIPTS-SCHEMA.sql` | Create database | Right now |
| `SCRIPTS-SETUP.md` | How to upload | Next (Part 2) |
| `MOM-SCRIPTS-GUIDE.md` | Share with Mom | After uploading |
| `UQA-SCRIPTS-INTEGRATION.md` | Link to pipeline | Optional |

---

## One-Liner Reminders

> "Database first, then code, then upload scripts, then tell Mom."

> "If it breaks, check the console (F12) and the Supabase table."

> "Search needs content, feedback needs Supabase access, everything needs proper JSON."

---

## You've Got This!

✅ Code is ready
✅ Database schema is ready
✅ Documentation is ready
✅ You're ready

**Go make scripts! 🚀**

---

_Quick Start Card for Scripts Database_
_Keep this handy while implementing_
_Last updated: 2026-03-29_
