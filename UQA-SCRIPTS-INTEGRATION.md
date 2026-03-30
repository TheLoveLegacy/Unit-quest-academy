# UQA Pipeline + Scripts Integration

How to link scripts directly from the UQA Pipeline view so you can navigate seamlessly between units and their scripts.

---

## What This Does

Currently, the UQA Pipeline shows all 112 units in a table view. This integration adds:

1. **Script status badge** next to each unit — shows if a script exists and its status
2. **"View Script" button** — click to jump directly to the script
3. **Quick script preview** — hover to see script title and version
4. **Script count** — dashboard summary of scripted units

---

## Implementation Steps

### Step 1: Update UQA Pipeline Page

Open `/mission-control/app/dashboard/uqa-pipeline/page.tsx` and modify the table rendering section.

Find the section where units are displayed in the table, and add this column:

```typescript
// In your table header, add:
<th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Script</th>

// In your table row loop, add:
<td className="px-6 py-4 text-sm">
  {unit.scriptStatus ? (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded text-xs font-medium ${getScriptStatusColor(unit.scriptStatus)}`}>
        {unit.scriptStatus}
      </span>
      <button
        onClick={() => navigateToScript(unit.unit_number)}
        className="text-blue-600 hover:underline text-xs"
      >
        View
      </button>
    </div>
  ) : (
    <span className="text-gray-400 text-xs">No script</span>
  )}
</td>
```

### Step 2: Add Helper Functions

In the same file, add these functions:

```typescript
// Helper to get script status color
const getScriptStatusColor = (status: string) => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    case 'in_review':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-blue-100 text-blue-800'
    case 'published':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Navigate to scripts page filtered by unit
const navigateToScript = (unitNumber: number) => {
  window.location.href = `/dashboard/scripts?unit=${unitNumber}`
}
```

### Step 3: Enrich Units with Script Data

In your `useEffect` where you load units, add script lookup:

```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      // Load units
      const { data: unitsData } = await supabase
        .from('uqa_units')
        .select('*')
        .order('unit_number')

      if (!unitsData) return

      // Enrich with script data
      const enrichedUnits = await Promise.all(
        unitsData.map(async (unit) => {
          const { data: scriptData } = await supabase
            .from('scripts')
            .select('id, script_status, script_version')
            .eq('unit_id', unit.id)
            .single()

          return {
            ...unit,
            hasScript: !!scriptData,
            scriptStatus: scriptData?.script_status || null,
            scriptVersion: scriptData?.script_version || null,
          }
        })
      )

      setUnits(enrichedUnits)
      
      // Count scripts for dashboard summary
      const scriptedCount = enrichedUnits.filter(u => u.hasScript).length
      setScriptCount(scriptedCount)
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  loadData()
}, [])
```

### Step 4: Update Dashboard Summary

In `/mission-control/app/dashboard/page.tsx`, update the summary section:

```typescript
// Add this new card to the status summary:
<div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
  <div className="text-4xl font-bold text-purple-600">{scriptCount}</div>
  <div className="text-gray-600 mt-2">Scripts Written</div>
</div>
```

And add state at the top:

```typescript
const [scriptCount, setScriptCount] = useState(0)
```

---

## How It Works for Users

### For Adam (Script Manager)

1. **Open UQA Pipeline**
2. **See script status** next to each unit:
   - ✅ "approved" — script is approved
   - 📝 "draft" — script is being worked on
   - 🔄 "in_review" — waiting for Mom's feedback
   - 🎬 "published" — script is ready/live
3. **Click "View"** to jump to the script and see Mom's feedback
4. **Return to pipeline** to continue reviewing other units

### For Mom (Reviewer)

1. **Open Scripts page** (main view)
2. **Browse and search** for scripts to review
3. **No need to reference pipeline** — all scripts are organized here
4. **Submit feedback** directly in the scripts page

---

## Database Relationship

The link between units and scripts:

```sql
-- UQA Units
uqa_units
  ├── id (primary key)
  └── unit_number
  └── unit_name

-- Scripts (links via unit_id)
scripts
  ├── id (primary key)
  ├── unit_id → uqa_units.id
  └── script_status
```

**When you upload a script**, make sure to include:
- `unit_id` — which unit this script is for (matches uqa_units.id)
- `unit_number` — reference number (1-112)
- `unit_name` — unit name (e.g., "Life Cycles")

---

## Quick Status Summary

This integration provides three views:

| View | Purpose | Shows |
|------|---------|-------|
| **Dashboard** | Quick overview | Total scripts written |
| **UQA Pipeline** | Manage units | Script status for each unit + links |
| **Scripts** | Detailed work | Full script content + Mom's feedback |

---

## Filter Scripts by Unit (Advanced)

The Scripts page supports URL parameters for filtering:

```
/dashboard/scripts?unit=1
```

Shows only scripts for Unit 1.

To implement in code:

```typescript
// In /mission-control/app/dashboard/scripts/page.tsx
import { useSearchParams } from 'next/navigation'

const searchParams = useSearchParams()
const unitFilter = searchParams.get('unit')

// In your filter logic:
const filteredScripts = scripts.filter((script) => {
  if (unitFilter && script.unit_number !== parseInt(unitFilter)) return false
  // ... other filters
  return true
})
```

---

## Example Flow

**Scenario:** Adam is reviewing Unit 5 (Fractions)

1. Opens UQA Pipeline
2. Sees Unit 5 has "approved" script status
3. Clicks "View" next to Unit 5
4. Jumps to Scripts page, filtered to Unit 5
5. Sees the "Fractions" script
6. Reads content and Mom's feedback
7. Sees Mom's comment: "Could explain mixed numbers better"
8. Updates script with mixed numbers section
9. Marks that feedback as "Resolved"
10. Returns to UQA Pipeline
11. Updates Unit 5 status to "filming_scheduled"
12. Moves on to Unit 6

---

## Troubleshooting

### Scripts not showing in pipeline
- [ ] Run SQL schema (creates scripts table)
- [ ] Upload at least one script with `unit_id` filled in
- [ ] Refresh browser
- [ ] Check browser console for errors

### "View" button not working
- [ ] Check `.env.local` has correct Supabase credentials
- [ ] Verify `/dashboard/scripts` page loads correctly
- [ ] Look for JavaScript errors in browser console (F12)

### Script status shows wrong value
- [ ] Check Supabase — ensure script has correct `script_status` value
- [ ] Valid values: draft, in_review, approved, published, archived
- [ ] Refresh browser to reload data

---

## Optional: Add Quick Preview Hover

For a nicer UX, add a tooltip showing script details on hover:

```typescript
import { Tooltip } from '@/components/ui/Tooltip' // or your tooltip library

<button
  onClick={() => navigateToScript(unit.unit_number)}
  title={`${unit.scriptTitle} (v${unit.scriptVersion})`}
  className="text-blue-600 hover:underline text-xs"
>
  View
</button>
```

---

## Next Steps

1. **Implement UQA Pipeline link** (follow steps above)
2. **Upload first script** via Supabase
3. **Test the flow** — click from pipeline to script
4. **Share with team** — everyone can now see script status and provide feedback

---

**Status:** ✅ Integration guide ready. Follow steps above to connect UQA Pipeline to Scripts database.

**Last updated:** 2026-03-29
