'use client'

import { MomReviewQueue } from '@/lib/types'
import { StatusBadge } from './StatusBadge'

interface ReviewQueueCardProps {
  item: MomReviewQueue
  onStartReview: (id: number) => void
  onSendFeedback: (id: number) => void
  onMarkDone: (id: number) => void
}

export function ReviewQueueCard({
  item,
  onStartReview,
  onSendFeedback,
  onMarkDone,
}: ReviewQueueCardProps) {
  const dueDate = new Date(item.due_date)
  const today = new Date()
  const isOverdue = dueDate < today && item.status !== 'approved'

  return (
    <div className={`p-4 border rounded-lg ${isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">Unit {String(item.unit_id).padStart(2, '0')}: {item.unit_name}</h3>
        <StatusBadge status={item.status} type="review" />
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p>{item.videos_count} videos to review • Est: {item.estimated_hours} hours</p>
        <p className={isOverdue ? 'text-red-600 font-medium' : ''}>
          Due: {dueDate.toLocaleDateString()} {isOverdue && '(OVERDUE)'}
        </p>
      </div>

      {item.feedback && (
        <div className="bg-white p-2 rounded text-sm mb-3 border-l-2 border-orange-300">
          <p className="font-medium text-orange-800">Feedback:</p>
          <p className="text-gray-700">{item.feedback}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onStartReview(item.id)}
          className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Start Review
        </button>
        <button
          onClick={() => onSendFeedback(item.id)}
          className="flex-1 px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
        >
          Send Feedback
        </button>
        <button
          onClick={() => onMarkDone(item.id)}
          className="flex-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Mark Done
        </button>
      </div>
    </div>
  )
}
