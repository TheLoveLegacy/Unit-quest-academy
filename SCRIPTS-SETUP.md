# Scripts Database Setup & Integration Guide

Complete guide to set up the Scripts database, upload scripts, and integrate with Mission Control.

---

## Part 1: Database Setup (15 minutes)

### Step 1: Run the SQL Schema

1. **Open Supabase** → Your mission-control project
2. **Click SQL Editor** (left sidebar)
3. **Click "New Query"**
4. **Copy and paste the entire schema** from `/mission-control/SQL-SCRIPTS-SCHEMA.sql`
5. **Click "Run"** (blue button)
6. Wait for success confirmation

**What got created:**
- `scripts` table — stores all script content, metadata, and versions
- `script_feedback` table — stores Mom's comments and team feedback
- `script_activity_log` table — audit trail of all changes
- Full-text search indexes for fast script searching

### Step 2: Verify Tables

In Supabase, click **"Table Editor"** (left sidebar). You should see:
- ✅ scripts
- ✅ script_feedback
- ✅ script_activity_log

If you don't see them, check the SQL Editor output for errors.

---

## Part 2: Upload Scripts (30-45 minutes)

There are three ways to upload scripts. Pick the one that fits your workflow.

### Option A: Upload via Supabase Dashboard (Easiest)

1. **Open Supabase** → **Table Editor**
2. **Click the `scripts` table**
3. **Click "Insert row"** (or "+" button)
4. **Fill in:**
   - `unit_number` — e.g., 1, 2, 3...
   - `unit_name` — e.g., "Life Cycles"
   - `subject` — Science, History, Math, Art, Geography, or Reading
   - `script_title` — descriptive title with version
   - `script_content` — paste the full markdown script
   - `script_status` — "draft" initially
   - `age_range` — "6-9", "8-11", "10-12", etc.
   - `learning_objectives` — paste as JSON array: `["Objective 1", "Objective 2", ...]`
   - `key_concepts` — paste as JSON array: `["Concept 1", "Concept 2", ...]`
   - `estimated_duration_minutes` — e.g., 14
   - `activity_duration_minutes` — e.g., 35
   - `nova_dialogue_hook` — opening hook text
   - `video_script_notes` — production notes
   - `game_connection` — game achievement text
   - `created_by` — "Adam" or team member name

5. **Click "Save"**
6. Repeat for each script

**Pros:** Easy, visual, straightforward
**Cons:** Slow for many scripts

### Option B: Bulk Upload via CSV (Recommended for 10+ scripts)

**Prerequisites:** Prepare a CSV file with these columns (in this order):

```csv
unit_number,unit_name,subject,script_title,script_content,script_status,age_range,learning_objectives,key_concepts,estimated_duration_minutes,activity_duration_minutes,nova_dialogue_hook,video_script_notes,game_connection,created_by
1,Life Cycles,Science,"Life Cycles: From Egg to Adult","# Life Cycles...",draft,"6-9","[""Understand metamorphosis""]","[""Metamorphosis""]",14,35,"Did you know...",Use time-lapse...,Life Cycles Master...,Adam
```

**Steps:**
1. Create a CSV file with all scripts (see format above)
2. **Open Supabase** → Table Editor → `scripts`
3. **Click the menu** (three dots) → **"Import data"**
4. **Select your CSV file**
5. **Map columns** (should auto-detect)
6. **Click "Import"**

**Pros:** Fast for many scripts, bulk operation
**Cons:** Need to prepare CSV carefully

### Option C: API Upload via Node.js Script (For Automation)

Create a file `upload-scripts.js` in your project root:

```javascript
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY // Use service key, not anon key

const supabase = createClient(supabaseUrl, supabaseKey)

const scripts = [
  {
    unit_number: 1,
    unit_name: 'Life Cycles',
    subject: 'Science',
    script_title: 'Life Cycles: From Egg to Adult',
    script_content: '# Life Cycles\n\nContent here...',
    script_status: 'draft',
    age_range: '6-9',
    learning_objectives: JSON.stringify([
      'Understand metamorphosis',
      'Identify lifecycle stages',
      'Recognize examples in nature',
    ]),
    key_concepts: JSON.stringify(['Metamorphosis', 'Egg', 'Larva', 'Pupae']),
    estimated_duration_minutes: 14,
    activity_duration_minutes: 35,
    nova_dialogue_hook: 'Did you know...',
    video_script_notes: 'Use time-lapse footage...',
    game_connection: 'Life Cycles Master achievement...',
    created_by: 'Adam',
  },
  // Add more scripts here
]

async function uploadScripts() {
  try {
    console.log('Uploading scripts...')
    const { data, error } = await supabase.from('scripts').insert(scripts)

    if (error) {
      console.error('Upload error:', error)
      process.exit(1)
    }

    console.log(`✅ Successfully uploaded ${scripts.length} scripts`)
    process.exit(0)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

uploadScripts()
```

**Run it:**
```bash
node upload-scripts.js
```

**Pros:** Automated, repeatable, scriptable
**Cons:** Requires coding setup

---

## Part 3: Integration with UQA Pipeline (10 minutes)

Make scripts accessible from the UQA Pipeline view.

### Update UQA Pipeline Page

Open `/mission-control/app/dashboard/uqa-pipeline/page.tsx` and add a "View Script" action.

Find the section where units are displayed and add:

```typescript
// In the UQA table row, add a button:
<button
  onClick={() => {
    // Navigate to scripts page, pre-filtered to this unit
    window.location.href = `/dashboard/scripts?unit=${unit.unit_number}`
  }}
  className="text-blue-600 hover:underline text-sm"
>
  📚 View Script
</button>
```

### Update Supabase Link

Modify the UQA Pipeline to show if a script exists and link to it:

In `/mission-control/app/dashboard/uqa-pipeline/page.tsx`:

```typescript
// In your useEffect where you load units:
const [unitsWithScripts, setUnitsWithScripts] = useState([])

// After loading units:
const enrichedUnits = await Promise.all(
  units.map(async (unit) => {
    const { data: script } = await supabase
      .from('scripts')
      .select('id, script_status')
      .eq('unit_id', unit.id)
      .single()

    return {
      ...unit,
      hasScript: !!script,
      scriptStatus: script?.script_status,
    }
  })
)

setUnitsWithScripts(enrichedUnits)
```

Then display script status in the table:

```typescript
{unit.hasScript ? (
  <span className="text-green-600 font-medium">
    ✅ {unit.scriptStatus}
  </span>
) : (
  <span className="text-gray-400">No script</span>
)}
```

---

## Part 4: Mom's Script Feedback Workflow (Ongoing)

### For Mom (Reviewer)

1. **Go to Dashboard** → **Scripts**
2. **Browse or search** for units to review
3. **Click a script** to view full content
4. **Scroll to "Feedback & Comments"**
5. **Click "+ Add Feedback"**
6. **Select feedback type:**
   - 💬 Comment — general note
   - 💡 Suggestion — idea for improvement
   - ✅ Approval — approved for production
   - 🔄 Revision Needed — requires changes
7. **Write feedback** in the text box
8. **Click "Submit Feedback"**
9. Feedback appears instantly for Adam to review

### For Adam (Script Manager)

1. **Check Scripts page** regularly for new feedback
2. **Open a script** to see all feedback from Mom
3. **Review each item:**
   - Read the feedback
   - Note if it's a comment, suggestion, or revision needed
4. **Resolve feedback:**
   - Click "Resolve"
   - Add notes about what you changed
   - Click "Mark Resolved"
5. **Feedback history** is preserved for record-keeping

---

## Part 5: Sample Scripts to Start With

Two sample scripts are pre-loaded from SQL schema:

1. **Life Cycles: From Egg to Adult** (Science, ages 6-9)
2. **Water Cycle: Journey of a Water Droplet** (Science, ages 7-10)

You can delete these and replace with your actual scripts, or keep them as templates.

---

## Part 6: Production Script Format

For best results, format your scripts consistently:

```markdown
# [Unit Name]: [Descriptive Subtitle]

## Introduction
[Opening hook and context — 2-3 sentences]

## Key Concepts
1. [Concept name] - brief explanation
2. [Concept name] - brief explanation
3. [Concept name] - brief explanation
4. [Concept name] - brief explanation

## Learning Objectives
- Students will understand [concept]
- Students will be able to [skill]
- Students will recognize [application]
- Students will appreciate [significance]

## Activities
1. **Activity Name:** Description of what to do
2. **Activity Name:** Description of what to do
3. **Activity Name:** Description of what to do

## Conclusion
[Wrap-up and preview of next unit]
```

**In database, enter:**
- `script_content` — above markdown
- `learning_objectives` — `["understand X", "able to Y", "recognize Z"]`
- `key_concepts` — `["concept 1", "concept 2", "concept 3"]`

---

## Part 7: Search & Discovery

The Scripts page includes full-text search:

- **Search for:** unit names, script titles, subject areas, content keywords
- **Filter by:** Subject (Science, History, etc.) or Status (draft, approved, published)
- **Results update instantly** as you type

---

## Part 8: Version Control

Each script can have versions:

```
script_version: 1  (original)
script_version: 2  (after Mom feedback)
script_version: 3  (final approved)
```

To update a script:
1. In Supabase, find the script row
2. Edit `script_content` with new text
3. Increment `script_version`
4. Update `updated_at` (or let it auto-update)
5. Click Save

Activity log automatically tracks all changes.

---

## Troubleshooting

### "Scripts table not found"
- [ ] Run the SQL schema (Part 1)
- [ ] Check Supabase Table Editor for the table
- [ ] Refresh your browser

### "No feedback button showing"
- [ ] Make sure `.env.local` has correct Supabase URL and key
- [ ] Check browser console (F12) for errors
- [ ] Verify Supabase connection is working

### "Upload failed"
- [ ] Check CSV format (if using bulk upload)
- [ ] Verify JSON arrays are valid JSON
- [ ] Check Supabase error message for details

### Scripts not showing up
- [ ] Refresh browser (Ctrl+R or Cmd+R)
- [ ] Check Supabase Table Editor to verify data was inserted
- [ ] Look at browser console (F12) for JavaScript errors

---

## Next Steps

1. **Setup complete?** Run the Scripts page: `npm run dev` and visit `/dashboard/scripts`
2. **Upload scripts** using Option A, B, or C (above)
3. **Share with Mom** — send her the link to `/dashboard/scripts`
4. **Start collecting feedback** — Mom can comment on scripts immediately
5. **Iterate** — update scripts based on feedback, track versions

---

## Quick Reference

| Task | Where | How |
|------|-------|-----|
| View all scripts | `/dashboard/scripts` | Click Scripts in sidebar |
| Add a comment | Scripts page → select script → + Add Feedback | Write comment and submit |
| Upload new script | Supabase Table Editor | Insert row or import CSV |
| Update a script | Supabase Table Editor | Edit the row and save |
| Resolve feedback | Scripts page → Feedback section | Click Resolve and add notes |
| Link to UQA Pipeline | `/dashboard/uqa-pipeline` | Add "View Script" button per UQA unit |

---

**Status:** ✅ Scripts database is live and ready for scripts.

**Last updated:** 2026-03-29
