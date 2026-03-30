export interface UQAUnit {
  id: number
  unit_number: number
  unit_name: string
  subject: string
  status: string
  script_status: string
  mom_review_status: string
  mom_feedback?: string
  filming_date?: string
  upload_date?: string
  created_at: string
  updated_at: string
}

export interface MomReviewQueue {
  id: number
  unit_id: number
  unit_name: string
  videos_count: number
  assigned_date: string
  due_date: string
  status: string
  feedback?: string
  completed_date?: string
  estimated_hours: number
  created_at: string
  updated_at: string
}

export interface TaskAssignment {
  id: number
  task_type: string
  assigned_to: string
  unit_id?: number
  unit_name?: string
  description: string
  due_date: string
  status: string
  priority: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface DashboardUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'reviewer' | 'coordinator'
  created_at: string
}

export interface Script {
  id: number
  unit_id?: number
  unit_number: number
  unit_name: string
  subject: string
  script_title: string
  script_status: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
  script_version: number
  script_content: string
  estimated_duration_minutes?: number
  activity_duration_minutes?: number
  age_range?: string
  learning_objectives?: string // JSON array
  key_concepts?: string // JSON array
  video_script_notes?: string
  game_connection?: string
  nova_dialogue_hook?: string
  created_by?: string
  created_at: string
  updated_at: string
  published_at?: string
}

export interface ScriptFeedback {
  id: number
  script_id: number
  unit_id?: number
  feedback_type: 'comment' | 'suggestion' | 'approval' | 'revision_needed'
  status: 'open' | 'resolved' | 'acknowledged'
  author_name: string
  author_role?: string
  feedback_text: string
  line_number?: number
  section_name?: string
  resolved_by?: string
  resolved_at?: string
  resolution_notes?: string
  created_at: string
  updated_at: string
}

export interface ScriptActivityLog {
  id: number
  script_id: number
  unit_id?: number
  action: string
  actor_name?: string
  details?: string
  old_value?: string
  new_value?: string
  created_at: string
}

export interface Wallet {
  id: number
  wallet_name: 'LP-WALLET' | 'MR-WALLET' | 'WX-WALLET'
  balance: number
  roi: number
  win_rate: number
  strategy_name: string
  total_trades: number
  winning_trades: number
  losing_trades: number
  avg_win: number
  avg_loss: number
  max_drawdown: number
  created_at: string
  updated_at: string
}

export interface Trade {
  id: number
  wallet_id: number
  entry_price: number
  exit_price: number
  quantity: number
  roi: number
  status: 'open' | 'closed' | 'cancelled'
  entry_date: string
  exit_date?: string
  strategy: string
  notes?: string
  created_at: string
}

export interface Alert {
  id: number
  wallet_id: number
  alert_type: 'drawdown_warning' | 'daily_summary' | 'milestone' | 'risk_warning'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  is_read: boolean
  created_at: string
}
