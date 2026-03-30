'use client'

interface StatusBadgeProps {
  status: string
  type?: 'stage' | 'review' | 'task'
}

export function StatusBadge({ status, type = 'stage' }: StatusBadgeProps) {
  const colors: Record<string, { bg: string; text: string }> = {
    // Stage statuses
    concept: { bg: 'bg-gray-100', text: 'text-gray-800' },
    script_draft: { bg: 'bg-blue-100', text: 'text-blue-800' },
    awaiting_review: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    review_feedback: { bg: 'bg-orange-100', text: 'text-orange-800' },
    final_script: { bg: 'bg-blue-100', text: 'text-blue-800' },
    filming_scheduled: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    filming_complete: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    editing_in_progress: { bg: 'bg-purple-100', text: 'text-purple-800' },
    editing_complete: { bg: 'bg-violet-100', text: 'text-violet-800' },
    materials_ready: { bg: 'bg-lime-100', text: 'text-lime-800' },
    website_ready: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    published: { bg: 'bg-green-100', text: 'text-green-800' },
    // Review statuses
    pending: { bg: 'bg-gray-100', text: 'text-gray-800' },
    in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    approved: { bg: 'bg-green-100', text: 'text-green-800' },
    feedback_sent: { bg: 'bg-orange-100', text: 'text-orange-800' },
    // Task statuses
    blocked: { bg: 'bg-red-100', text: 'text-red-800' },
    complete: { bg: 'bg-green-100', text: 'text-green-800' },
  }

  const color = colors[status] || { bg: 'bg-gray-100', text: 'text-gray-800' }
  const displayStatus = status.replace(/_/g, ' ')

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${color.bg} ${color.text}`}>
      {displayStatus}
    </span>
  )
}
