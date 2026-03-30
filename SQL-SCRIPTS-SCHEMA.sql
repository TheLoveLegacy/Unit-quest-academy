-- ============================================================================
-- SCRIPTS DATABASE SCHEMA
-- ============================================================================
-- Copy and paste this entire schema into Supabase SQL Editor and run it.
-- This creates the scripts table and related feedback/comments system.
-- ============================================================================

-- Create Scripts table
CREATE TABLE scripts (
  id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES uqa_units(id) ON DELETE CASCADE,
  unit_number INT NOT NULL,
  unit_name VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL, -- Science, History, Math, Art, Geography, Reading
  
  -- Script metadata
  script_title VARCHAR(255) NOT NULL,
  script_status VARCHAR(50) DEFAULT 'draft', -- draft, in_review, approved, published, archived
  script_version INT DEFAULT 1,
  
  -- Script content (stored as markdown)
  script_content TEXT NOT NULL,
  
  -- Video metadata
  estimated_duration_minutes INT, -- 12-15 typically
  activity_duration_minutes INT, -- 20-45 typically
  
  -- Age range and learning objectives
  age_range VARCHAR(20), -- "6-9", "8-11", "10-12", etc.
  learning_objectives TEXT, -- JSON array of objectives
  key_concepts TEXT, -- JSON array of key concepts
  
  -- Production notes
  video_script_notes TEXT, -- Filming, animation, graphics guidance
  game_connection VARCHAR(255), -- How it connects to game mechanics
  nova_dialogue_hook TEXT, -- Opening hook for video
  
  -- Metadata
  created_by VARCHAR(255), -- Who created this script
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP,
  
  -- Search indexing
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', unit_name || ' ' || script_title || ' ' || COALESCE(subject, '') || ' ' || COALESCE(script_content, ''))
  ) STORED
);

-- Create index for search performance
CREATE INDEX scripts_search_idx ON scripts USING GIN(search_vector);
CREATE INDEX scripts_unit_id_idx ON scripts(unit_id);
CREATE INDEX scripts_subject_idx ON scripts(subject);
CREATE INDEX scripts_status_idx ON scripts(script_status);

-- Create Script Feedback/Comments table
CREATE TABLE script_feedback (
  id SERIAL PRIMARY KEY,
  script_id INT REFERENCES scripts(id) ON DELETE CASCADE NOT NULL,
  unit_id INT REFERENCES uqa_units(id) ON DELETE CASCADE,
  
  -- Feedback metadata
  feedback_type VARCHAR(50) DEFAULT 'comment', -- comment, suggestion, approval, revision_needed
  status VARCHAR(50) DEFAULT 'open', -- open, resolved, acknowledged
  
  -- Feedback content
  author_name VARCHAR(255) NOT NULL, -- Usually "Mom" or team member
  author_role VARCHAR(50), -- reviewer, coordinator, admin
  feedback_text TEXT NOT NULL,
  
  -- Optional: line-specific feedback
  line_number INT, -- Reference to specific line in script
  section_name VARCHAR(255), -- e.g., "Intro", "Concept 1", "Activities"
  
  -- Status tracking
  resolved_by VARCHAR(255),
  resolved_at TIMESTAMP,
  resolution_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for feedback queries
CREATE INDEX script_feedback_script_id_idx ON script_feedback(script_id);
CREATE INDEX script_feedback_status_idx ON script_feedback(status);
CREATE INDEX script_feedback_type_idx ON script_feedback(feedback_type);

-- Create Script Activity Log (audit trail)
CREATE TABLE script_activity_log (
  id SERIAL PRIMARY KEY,
  script_id INT REFERENCES scripts(id) ON DELETE CASCADE NOT NULL,
  unit_id INT REFERENCES uqa_units(id) ON DELETE CASCADE,
  
  -- Activity tracking
  action VARCHAR(100) NOT NULL, -- created, edited, published, feedback_added, status_changed, etc.
  actor_name VARCHAR(255), -- Who performed the action
  
  -- Details
  details TEXT, -- JSON object with what changed
  old_value TEXT, -- Previous value (if applicable)
  new_value TEXT, -- New value (if applicable)
  
  -- Timestamp
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for activity log queries
CREATE INDEX script_activity_log_script_id_idx ON script_activity_log(script_id);
CREATE INDEX script_activity_log_action_idx ON script_activity_log(action);

-- ============================================================================
-- SAMPLE DATA (Optional - helps test the system)
-- ============================================================================

-- Insert sample scripts for testing (with correct JSON formatting)
-- Note: Sample data is optional. You can skip this if you just want the tables created.

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Tables created:
-- 1. scripts - Main scripts table with content, metadata, and status
-- 2. script_feedback - Comments and feedback from Mom and team
-- 3. script_activity_log - Audit trail of all changes
--
-- Indexes created for:
-- - Full-text search on script content
-- - Fast lookup by unit_id, subject, status
-- - Feedback and activity log queries
--
-- Sample data inserted:
-- - 2 sample scripts (Life Cycles, Water Cycle)
-- - 2 sample feedback items
-- - 2 activity log entries
--
-- Next steps:
-- 1. Update `.env.local` with your Supabase credentials
-- 2. Run the Scripts page (created next)
-- 3. Upload production scripts to database
-- ============================================================================
