'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { MomReviewQueue } from '@/lib/types'
import { ReviewQueueCard } from '@/components/ReviewQueueCard'

export default function MomsQueuePage() {
  const [queue, setQueue] = useState<MomReviewQueue[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    const loadQueue = async () => {
      try {
        const { data, error } = await supabase
          .from('mom_review_queue')
          .select('*')
          .order('due_date')

        if (error) throw error
        if (data) setQueue(data as MomReviewQueue[])
      } catch (error) {
        console.error('Error loading mom queue:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQueue()
  }, [])

  const handleStartReview = async (id: number) => {
    try {
      const { error } = await supabase
        .from('mom_review_queue')
        .update({ status: 'in_progress' })
        .eq('id', id)

      if (error) throw error
      const updated = queue.map((q) => (q.id === id ? { ...q, status: 'in_progress' } : q))
      setQueue(updated)
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleSendFeedback = async (id: number) => {
    const feedback = prompt('Enter feedback:')
    if (feedback) {
      try {
        const { error } = await supabase
          .from('mom_review_queue')
          .update({ status: 'feedback_sent', feedback })
          .eq('id', id)

        if (error) throw error
        const updated = queue.map((q) =>
          q.id === id ? { ...q, status: 'feedback_sent', feedback } : q
        )
        setQueue(updated)
      } catch (error) {
        console.error('Error updating feedback:', error)
      }
    }
  }

  const handleMarkDone = async (id: number) => {
    try {
      const { error } = await supabase
        .from('mom_review_queue')
        .update({ status: 'approved', completed_date: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      const updated = queue.map((q) =>
        q.id === id ? { ...q, status: 'approved', completed_date: new Date().toISOString() } : q
      )
      setQueue(updated)
    } catch (error) {
      console.error('Error marking done:', error)
    }
  }

  const filtered = filter
    ? queue.filter((q) => q.status === filter)
    : queue

  const pending = filtered.filter((q) => q.status === 'pending')
  const inProgress = filtered.filter((q) => q.status === 'in_progress')
  const approved = filtered.filter((q) => q.status === 'approved')
  const feedbackSent = filtered.filter((q) => q.status === 'feedback_sent')

  if (loading) {
    return <div className="text-center py-12">Loading your review queue...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Your Review Queue</h1>
      <p className="text-gray-600 mb-8">Mom's review dashboard</p>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600">{pending.length}</div>
          <div className="text-xs text-gray-600 mt-1">Pending</div>
        </div>
        <div className="bg-yellow-50 border rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">{inProgress.length}</div>
          <div className="text-xs text-gray-600 mt-1">In Progress</div>
        </div>
        <div className="bg-orange-50 border rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">{feedbackSent.length}</div>
          <div className="text-xs text-gray-600 mt-1">Feedback Sent</div>
        </div>
        <div className="bg-green-50 border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{approved.length}</div>
          <div className="text-xs text-gray-600 mt-1">Approved</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded bg-white"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="feedback_sent">Feedback Sent</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Queue Sections */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pending Reviews</h2>
          <div className="space-y-4">
            {pending.map((item) => (
              <ReviewQueueCard
                key={item.id}
                item={item}
                onStartReview={handleStartReview}
                onSendFeedback={handleSendFeedback}
                onMarkDone={handleMarkDone}
              />
            ))}
          </div>
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">In Progress</h2>
          <div className="space-y-4">
            {inProgress.map((item) => (
              <ReviewQueueCard
                key={item.id}
                item={item}
                onStartReview={handleStartReview}
                onSendFeedback={handleSendFeedback}
                onMarkDone={handleMarkDone}
              />
            ))}
          </div>
        </div>
      )}

      {feedbackSent.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Feedback Sent</h2>
          <div className="space-y-4">
            {feedbackSent.map((item) => (
              <ReviewQueueCard
                key={item.id}
                item={item}
                onStartReview={handleStartReview}
                onSendFeedback={handleSendFeedback}
                onMarkDone={handleMarkDone}
              />
            ))}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Approved</h2>
          <div className="space-y-4">
            {approved.map((item) => (
              <ReviewQueueCard
                key={item.id}
                item={item}
                onStartReview={handleStartReview}
                onSendFeedback={handleSendFeedback}
                onMarkDone={handleMarkDone}
              />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No items in this queue. Great work! 🎉
        </div>
      )}
    </div>
  )
}
