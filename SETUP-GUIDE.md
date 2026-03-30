# SETUP GUIDE — Database + Configuration

---

## **Step 1: Create Supabase Account**

1. Go to https://supabase.com
2. Click **"Sign Up"**
3. Use email (or GitHub)
4. Create a new project
   - Name: `mission-control` (or whatever you want)
   - Database password: Create a strong password (you'll need it)
   - Region: Choose closest to you (e.g., `us-east-1`)
5. Wait for project to initialize (~2 min)

---

## **Step 2: Create Database Schema**

1. In your Supabase project, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this entire SQL schema:

```sql
-- Create UQA Units table
CREATE TABLE uqa_units (
  id SERIAL PRIMARY KEY,
  unit_number INT UNIQUE NOT NULL,
  unit_name VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL, -- Science, History, Math, Art, Geography, Reading
  status VARCHAR(50) DEFAULT 'concept', -- concept, script_draft, awaiting_review, review_feedback, final_script, filming_scheduled, filming_complete, editing_in_progress, editing_complete, materials_ready, website_ready, published
  mom_review_status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, approved, feedback_sent
  mom_feedback TEXT,
  filming_date DATE,
  upload_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Mom's Review Queue table
CREATE TABLE mom_review_queue (
  id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES uqa_units(id),
  unit_name VARCHAR(255) NOT NULL,
  videos_count INT DEFAULT 4,
  assigned_date TIMESTAMP DEFAULT NOW(),
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, approved, feedback_sent
  feedback TEXT,
  completed_date TIMESTAMP,
  estimated_hours INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Task Assignments table
CREATE TABLE task_assignments (
  id SERIAL PRIMARY KEY,
  task_type VARCHAR(100) NOT NULL, -- script_review, video_filming, editing, materials_gen, voiceover, etc.
  assigned_to VARCHAR(50) NOT NULL, -- adam, mom, alaina, agent_name
  unit_id INT REFERENCES uqa_units(id),
  unit_name VARCHAR(255),
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, blocked, complete
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Dashboard Users table
CREATE TABLE dashboard_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL, -- admin (Adam), reviewer (Mom), coordinator (Alaina)
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Click **"Run"** (blue button)
5. Wait for success message

---

## **Step 3: Add Sample Data**

In the same SQL Editor, run this:

```sql
-- Insert sample UQA units
INSERT INTO uqa_units (unit_number, unit_name, subject, status, mom_review_status) VALUES
(1, 'Life Cycles', 'Science', 'editing_complete', 'approved'),
(2, 'Water Cycle', 'Science', 'filming_complete', 'awaiting_review'),
(3, 'Photosynthesis', 'Science', 'filming_scheduled', 'pending'),
(4, 'Ancient Egypt', 'History', 'script_draft', 'pending'),
(5, 'Fractions', 'Math', 'final_script', 'approved'),
(6, 'Color Theory', 'Art', 'concept', 'pending'),
(7, 'Continents & Oceans', 'Geography', 'concept', 'pending'),
(8, 'Fairy Tales', 'Reading', 'concept', 'pending'),
(9, 'Space Mission', 'Science', 'concept', 'pending'),
(10, 'Robot Design', 'Math', 'concept', 'pending');

-- Insert Mom's review queue
INSERT INTO mom_review_queue (unit_id, unit_name, due_date, status, estimated_hours) VALUES
(2, 'Water Cycle', CURRENT_DATE + INTERVAL '3 days', 'pending', 3),
(4, 'Ancient Egypt', CURRENT_DATE + INTERVAL '5 days', 'pending', 4),
(5, 'Fractions', CURRENT_DATE + INTERVAL '7 days', 'pending', 2);

-- Insert sample tasks
INSERT INTO task_assignments (task_type, assigned_to, unit_id, unit_name, description, due_date, status, priority) VALUES
('video_filming', 'adam', 1, 'Life Cycles', 'Film Unit 1 Video 1 (Intro)', CURRENT_DATE, 'in_progress', 'urgent'),
('video_editing', 'alaina', 1, 'Life Cycles', 'Edit Unit 1 Video 1', CURRENT_DATE + INTERVAL '1 day', 'pending', 'high'),
('materials_gen', 'adam', 2, 'Water Cycle', 'Generate 30 PDFs for Unit 2', CURRENT_DATE + INTERVAL '2 days', 'pending', 'medium'),
('voiceover_recording', 'adam', 3, 'Photosynthesis', 'Record Nova voiceover for Unit 3', CURRENT_DATE + INTERVAL '3 days', 'pending', 'medium');

-- Insert users
INSERT INTO dashboard_users (name, email, role) VALUES
('Adam', 'adam@uqa.local', 'admin'),
('Mom', 'mom@uqa.local', 'reviewer'),
('Alaina', 'alaina@uqa.local', 'coordinator');
```

Click **"Run"**. Wait for success.

---

## **Step 4: Get Your Connection String**

1. In Supabase, go **Settings** → **Database** (left sidebar)
2. Look for **"Connection string"**
3. Copy the one marked **"URI"** (starts with `postgresql://`)
4. Keep this safe — you'll need it next

---

## **Step 5: Configure Your App**

1. Open `.env.local` in the `mission-control` folder
2. You should see:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

3. Go back to Supabase → **Settings** → **API**
4. Copy **Project URL** → paste into `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **"anon" public key** → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Save `.env.local`

**Your .env.local should now look like:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## **Step 6: Test Locally**

```bash
cd mission-control
npm install  # (if you haven't already)
npm run dev
```

Open http://localhost:3000 in your browser.

You should see:
- Dashboard home with summary cards
- Your tasks list
- Mom's queue

**If you see errors:**
- Check `.env.local` has correct values (no extra spaces)
- Make sure Supabase SQL ran without errors
- Check browser console (F12) for error messages

---

## **That's It!**

Your database is set up and connected. Next: follow **DEPLOYMENT-CHECKLIST.md** to go live.

---

**Questions?** See **ADAM-ADMIN-GUIDE.md**.
