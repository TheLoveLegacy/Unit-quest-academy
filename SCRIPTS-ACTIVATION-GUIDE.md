# Scripts Database Activation Guide

**Status:** Ready to activate in Supabase  
**Time needed:** 5 minutes  
**Risk level:** Low (just creating new tables)

---

## **Step 1: Go to Supabase SQL Editor**

1. Open your Supabase dashboard: https://pbdwzvdmqgtmlwatqxrk.supabase.co
2. In the left sidebar, click **"SQL Editor"**
3. Click **"New Query"**

---

## **Step 2: Copy the SQL Schema**

Copy the entire content from this file:
```
/Users/adamknopf/.openclaw/workspace/mission-control/SQL-SCRIPTS-SCHEMA.sql
```

---

## **Step 3: Paste into Supabase**

1. In the SQL Editor, paste the entire schema
2. Click the blue **"Run"** button (or Cmd+Enter)
3. Wait for success message

**You should see:**
```
✅ CREATE TABLE succeeded
✅ CREATE INDEX succeeded
(repeated for each table/index)
```

---

## **Step 4: Verify Tables Created**

In Supabase left sidebar:
1. Click **"Table Editor"**
2. You should see 3 new tables:
   - ✅ `scripts`
   - ✅ `script_feedback`
   - ✅ `script_activity_log`

If you see all 3, you're done! 🎉

---

## **If Something Goes Wrong**

**Error: "Relation already exists"**
- The tables already exist
- No problem — activation is complete

**Error: "Foreign key violation"**
- Means `uqa_units` table doesn't exist
- Go back and create the UQA tables first (should already exist from earlier setup)

**Error: "Permission denied"**
- Your API key might not have write permissions
- Go to Supabase Settings → Policies and verify the key has full access

---

## **What Was Created**

### **1. `scripts` Table**
- Stores all video scripts
- Fields: title, status, content, duration, learning objectives, Nova hooks
- Full-text search index for fast lookup

### **2. `script_feedback` Table**
- Stores Mom's comments and suggestions
- Fields: feedback type, status, author, resolved notes
- Links to scripts table

### **3. `script_activity_log` Table**
- Audit trail of all changes
- Fields: action (created, edited, published), actor, timestamp
- Complete change history for compliance

---

## **Sample Data**

The schema includes 2 sample scripts:
1. Life Cycles (Unit 1)
2. Water Cycle (Unit 2)

These are just examples. You can delete them later when you upload real scripts.

---

## **What's Next**

Once tables are created:
1. Scripts page will be available in Mission Control
2. Mom can view and comment on scripts
3. Upload production scripts to database

---

**Ready?** Go to Supabase SQL Editor and run the schema! 🚀
