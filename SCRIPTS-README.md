# 📚 Mission Control Scripts Database

A complete, production-ready scripts management system for Mission Control. Store scripts, get Mom's feedback, track versions, and manage your UQA curriculum all in one place.

---

## What It Does

This system lets you:

- **Store scripts** in a searchable database
- **Organize by subject** (Science, History, Math, Art, Geography, Reading)
- **Track versions** as scripts evolve
- **Get feedback** from Mom directly in the app
- **Manage status** (draft → approved → published)
- **Link to UQA Pipeline** for end-to-end workflow
- **Search full-text** across all script content
- **Keep audit trail** of all changes

---

## Quick Start (5 Steps)

### 1. Run Database Schema
```bash
# Open Supabase → SQL Editor
# Copy and paste: SQL-SCRIPTS-SCHEMA.sql
# Click "Run"
```
Takes 1 minute. ✅

### 2. Code is Already in Place
All React components are already created and integrated. Just run:
```bash
cd mission-control
npm run dev
```
Then visit: http://localhost:3000/dashboard/scripts

### 3. Upload Scripts
Use one of three methods in `SCRIPTS-SETUP.md`:
- **Dashboard:** Click and insert rows (easiest, slowest)
- **CSV:** Bulk upload from file (best for 10+)
- **API:** Node.js script (most automated)

Takes 30-45 minutes for 10+ scripts.

### 4. Share with Mom
Send her: `MOM-SCRIPTS-GUIDE.md` and the link.
She can start reviewing immediately.

### 5. Optional: Link to UQA Pipeline
Follow `UQA-SCRIPTS-INTEGRATION.md` to see script status in your units view.

Takes 15 minutes. ✅

---

## File Guide

### Get Started With
- **`SCRIPTS-SETUP.md`** ← Start here for setup and uploading
- **`SCRIPTS-IMPLEMENTATION-CHECKLIST.md`** ← Track your progress

### For Team Members
- **`MOM-SCRIPTS-GUIDE.md`** → Share with Mom (reviewer)
- **`UQA-SCRIPTS-INTEGRATION.md`** → Link scripts to units

### Understanding It All
- **`SCRIPTS-COMPLETE-DELIVERY.md`** → Comprehensive overview
- **`SCRIPTS-FILES-MANIFEST.md`** → File-by-file breakdown

### Technical Details
- **`SQL-SCRIPTS-SCHEMA.sql`** → Database creation
- **`app/dashboard/scripts/page.tsx`** → Main page code
- **`components/scripts/*.tsx`** → UI components

---

## How It Works

### For Adam (You)

1. **Dashboard** → **📚 Scripts**
2. **Search or browse** scripts
3. **Click to view** full content
4. **See Mom's feedback** below
5. **Resolve feedback** as needed
6. **Update status** when approved

### For Mom

1. **Dashboard** → **📚 Scripts**
2. **Find a script** to review
3. **Click "+ Add Feedback"**
4. **Write comment** (💬, 💡, ✅, or 🔄)
5. **Submit** — Adam gets notified
6. **See resolution** when done

### For UQA Pipeline Users

1. **UQA Pipeline** view
2. **See script status** next to each unit
3. **Click "View"** to jump to script
4. **Review content** and feedback
5. **Return to pipeline**

---

## What's Included

✅ **Database**
- `scripts` table with full-text search
- `script_feedback` table for comments
- `script_activity_log` table for audit trail
- Indexes for fast querying

✅ **React Components**
- Scripts page with search and filters
- Script detail viewer
- Feedback panel with resolution tracking
- List component

✅ **Navigation**
- Scripts link in sidebar
- Quick navigation from dashboard
- Integration hooks for UQA Pipeline

✅ **Documentation**
- Setup guide (SCRIPTS-SETUP.md)
- User guide for Mom (MOM-SCRIPTS-GUIDE.md)
- Integration guide (UQA-SCRIPTS-INTEGRATION.md)
- Implementation checklist (SCRIPTS-IMPLEMENTATION-CHECKLIST.md)
- Complete delivery summary (SCRIPTS-COMPLETE-DELIVERY.md)

✅ **Sample Data**
- 2 pre-loaded test scripts
- Sample feedback items
- Activity log examples

---

## Key Features

### Search & Filter
- **Full-text search** across script content
- **Filter by subject** (6 types)
- **Filter by status** (5 types)
- **Results update instantly**

### Script Management
- **View full content** with formatting
- **Display metadata** (age, duration, concepts, objectives)
- **Show production notes** (video, game, dialogue hook)
- **Version tracking** (v1, v2, v3...)
- **Status workflow** (draft → approved → published)

### Feedback System
- **4 feedback types**
  - 💬 Comment — general note
  - 💡 Suggestion — improvement idea
  - ✅ Approval — ready to film
  - 🔄 Revision — needs changes
- **Resolution tracking** with notes
- **Separate open/resolved** sections
- **Author and timestamp** on all feedback

### Data Organization
- **Link to UQA units** via unit_id
- **Full audit trail** of changes
- **Cascading deletes** (safe cleanup)
- **Timestamps** on all records

---

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Database setup | 15 min | ✅ Ready |
| Code integration | 20 min | ✅ Ready |
| Local testing | 15 min | ✅ Ready |
| Upload scripts | 30+ min | ⏳ You do this |
| Train Mom | 20 min | ⏳ You do this |
| UQA integration | 15 min | ⏳ Optional |
| Deployment | 15 min | ⏳ When ready |
| **TOTAL** | **~2 hours** | |

---

## Architecture

```
Mission Control
├── Dashboard Home
│   ├── Quick link to Scripts
│   └── Script count summary
├── UQA Pipeline
│   ├── Script status column
│   └── View script button
└── Scripts Page (NEW)
    ├── Search & filters
    ├── Script browser
    ├── Script detail viewer
    │   ├── Content display
    │   ├── Metadata
    │   ├── Production notes
    │   └── Feedback panel
    └── Feedback system
        ├── Add feedback
        ├── View feedback
        └── Resolve feedback
```

**Database:**
```
uqa_units
  └── scripts (linked via unit_id)
      ├── script_feedback (comments)
      └── script_activity_log (audit trail)
```

---

## Common Tasks

### Upload a Script
1. Open `SCRIPTS-SETUP.md`
2. Choose upload method (A, B, or C)
3. Follow instructions
4. Script appears in Scripts page ✅

### Get Feedback
1. Mom opens Scripts page
2. Finds your script
3. Clicks "+ Add Feedback"
4. You see it immediately
5. Respond and resolve ✅

### Resolve Feedback
1. See feedback in Feedback panel
2. Click "Resolve"
3. Type what you changed
4. Click "Mark Resolved"
5. Feedback moves to "Resolved" ✅

### Update a Script
1. Edit in Supabase
2. Increment version number
3. Save
4. Activity log tracks change ✅

### Link to UQA Pipeline
1. Follow `UQA-SCRIPTS-INTEGRATION.md`
2. Update UQA pipeline page
3. Add script status column
4. Test navigation ✅

---

## Database Schema (Quick View)

### `scripts` table
```sql
id, unit_id, unit_number, unit_name, subject,
script_title, script_status, script_version,
script_content, estimated_duration_minutes,
activity_duration_minutes, age_range,
learning_objectives, key_concepts,
video_script_notes, game_connection,
nova_dialogue_hook, created_by,
created_at, updated_at, published_at
```

### `script_feedback` table
```sql
id, script_id, unit_id,
feedback_type (comment|suggestion|approval|revision_needed),
status (open|resolved|acknowledged),
author_name, author_role, feedback_text,
line_number, section_name,
resolved_by, resolved_at, resolution_notes,
created_at, updated_at
```

### `script_activity_log` table
```sql
id, script_id, unit_id,
action, actor_name, details,
old_value, new_value,
created_at
```

See `SQL-SCRIPTS-SCHEMA.sql` for full definitions.

---

## Troubleshooting

**Scripts page won't load?**
→ Check `SCRIPTS-SETUP.md` Part 1 (database setup)

**Can't submit feedback?**
→ Check browser console (F12), ensure Supabase URL/key are correct

**Search not finding scripts?**
→ Ensure scripts have content in `script_content` field

**UQA Pipeline integration confusing?**
→ Read `UQA-SCRIPTS-INTEGRATION.md` step-by-step

**Mom has questions?**
→ Share `MOM-SCRIPTS-GUIDE.md`

More troubleshooting in each documentation file.

---

## Production Checklist

Before going live:

- [ ] Database schema created (`SQL-SCRIPTS-SCHEMA.sql`)
- [ ] Scripts page loads and shows sample scripts
- [ ] Search and filters work correctly
- [ ] Can add and resolve feedback
- [ ] Deployed to Vercel or production server
- [ ] Mom can access and use it
- [ ] UQA Pipeline linked (if desired)
- [ ] At least 5 real scripts uploaded
- [ ] No console errors in browser

---

## Support & Docs

| Need | See |
|------|-----|
| Setup instructions | `SCRIPTS-SETUP.md` |
| Mom's guide | `MOM-SCRIPTS-GUIDE.md` |
| UQA linking | `UQA-SCRIPTS-INTEGRATION.md` |
| Implementation tracker | `SCRIPTS-IMPLEMENTATION-CHECKLIST.md` |
| Full overview | `SCRIPTS-COMPLETE-DELIVERY.md` |
| File listing | `SCRIPTS-FILES-MANIFEST.md` |

---

## Next Steps

1. **Read `SCRIPTS-SETUP.md`** (10 min)
2. **Run SQL schema** in Supabase (5 min)
3. **Test locally** — `npm run dev` (5 min)
4. **Upload first scripts** (30 min)
5. **Share with Mom** — send `MOM-SCRIPTS-GUIDE.md` (5 min)
6. **Start collecting feedback** (ongoing)

**Total setup time: ~1 hour**

---

## Features at a Glance

| Feature | ✅ | Where |
|---------|----|----|
| Store scripts | ✅ | Supabase table |
| Search scripts | ✅ | Full-text index |
| Filter by subject | ✅ | Scripts page |
| Filter by status | ✅ | Scripts page |
| View content | ✅ | ScriptDetail component |
| Get feedback | ✅ | FeedbackPanel |
| Add feedback types | ✅ | 4 types included |
| Resolve feedback | ✅ | Interactive UI |
| Track versions | ✅ | script_version field |
| Link to units | ✅ | unit_id foreign key |
| Audit trail | ✅ | script_activity_log |
| Status workflow | ✅ | 5 status types |

---

## You're All Set!

Everything is built, tested, and ready to use. Just run the SQL schema and start uploading scripts.

**Questions?** Check the documentation files listed above.

**Ready to go?** Start with `SCRIPTS-SETUP.md`.

---

_Built: 2026-03-29_
_Status: ✅ Production Ready_
_Support: 5 comprehensive guides included_

**Happy scripting! 🚀**
