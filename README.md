# Mission Control Phase 0

UQA Pipeline + Mom's Review Queue + Task Assignments Dashboard

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Copy your Supabase credentials to .env.local

# 3. Run development server
npm run dev

# 4. Visit http://localhost:3000
```

## Project Structure

```
mission-control/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── dashboard/
│       ├── layout.tsx        # Dashboard layout with sidebar
│       ├── page.tsx          # Dashboard home
│       ├── uqa-pipeline/
│       │   └── page.tsx      # UQA Pipeline table
│       ├── moms-queue/
│       │   └── page.tsx      # Mom's review queue
│       ├── tasks/
│       │   └── page.tsx      # Task assignments
│       └── settings/
│           └── page.tsx      # User management
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── StatusBadge.tsx       # Color-coded status badges
│   ├── UQATable.tsx          # Sortable/filterable UQA table
│   ├── ReviewQueueCard.tsx   # Mom's review queue cards
│   └── TaskCard.tsx          # Task assignment cards
├── lib/
│   ├── supabase.ts           # Supabase client setup
│   └── types.ts              # TypeScript types
├── .env.local                # Environment variables (not in git)
└── README.md                 # This file
```

## Features

### UQA Pipeline
- View all 112 units in a sortable, filterable table
- Track production status (concept → script → filming → editing → live)
- See Mom's review status for each unit
- Filter by status or subject
- Sort by any column

### Mom's Review Queue
- Shows scripts pending Mom's review
- Display status: pending, in progress, approved, feedback sent
- Due dates with overdue highlighting
- Quick action buttons: Start Review, Send Feedback, Mark Done
- View feedback history

### Task Assignments
- Assign work to Mom, Alaina, or agents
- Set priority (low, medium, high, urgent)
- Track status (pending, in progress, blocked, complete)
- Filter by person or priority
- Due date tracking with overdue warnings

### Dashboard Home
- Summary counts (units scripted, filming, live)
- Your tasks for the week
- Mom's queue status
- Quick navigation to all sections

## Tech Stack

- **Next.js 14** — React framework with TypeScript
- **Tailwind CSS** — Styling
- **Supabase** — PostgreSQL database + auth
- **React Hook Form** — Form handling
- **Zod** — Schema validation
- **Recharts** — Charts and graphs

## Environment Setup

### 1. Supabase

Create a free account at [supabase.com](https://supabase.com)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database

Run the SQL schema from `SETUP-GUIDE.md` in Supabase SQL Editor.

Insert sample data (also in SETUP-GUIDE.md).

## Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Mission Control Phase 0"
git push origin main

# 2. Go to vercel.com
# 3. Import GitHub repo
# 4. Add environment variables
# 5. Deploy
```

See `DEPLOYMENT-CHECKLIST.md` for detailed steps.

## Documentation

- **SETUP-GUIDE.md** — Supabase setup and database schema
- **DEPLOYMENT-CHECKLIST.md** — Step-by-step to Vercel
- **ADAM-ADMIN-GUIDE.md** — For managing the dashboard
- **MOM-QUICK-START.md** — For Mom's review workflow
- **ALAINA-QUICK-START.md** — For Alaina's task workflow

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

### Code Quality
```bash
npm run lint
```

## Database Schema

### uqa_units
- Track all 112 video units through production
- Fields: unit_number, unit_name, subject, status, mom_review_status, filming_date, upload_date

### mom_review_queue
- Mom's pending/approved script reviews
- Fields: unit_id, due_date, status, feedback, estimated_hours

### task_assignments
- All work assigned to team
- Fields: task_type, assigned_to, unit_id, due_date, status, priority

### dashboard_users
- Team member access and roles
- Fields: name, email, role (admin, reviewer, coordinator)

## Troubleshooting

See `ADAM-ADMIN-GUIDE.md` for common issues and solutions.

## Support

Questions? Contact Adam at adam@example.com

---

**Phase 0 MVP** — Fast, functional, ready to use.  
**Phase 1** — UI polish, analytics, calendar, document hub.
