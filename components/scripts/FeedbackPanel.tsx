'use client'

import { ScriptFeedback } from '@/lib/types'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface FeedbackPanelProps {
  feedback: ScriptFeedback[]
  onAddFeedback: () => void
  showForm: boolean
}

export default function FeedbackPanel({ feedback, onAddFeedback, showForm }: FeedbackPanelProps) {
  const [resolving, setResolving] = useState<number | null>(null)
  const [resolutionNotes, setResolutionNotes] = useState('')

  const handleResolveFeedback = async (feedbackId: number) => {
    if (!resolutionNotes.trim()) return

    setResolving(feedbackId)
    try {
      const { error } = await supabase
        .from('script_feedback')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
          resolution_notes: resolutionNotes,
        })
        .eq('id', feedbackId)

      if (error) throw error

      // Reload to show updates
      window.location.reload()
    } catch (error) {
      console.error('Error resolving feedback:', error)
      alert('Failed to resolve feedback')
    } finally {
      setResolving(null)
      setResolutionNotes('')
    }
  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return '💬'
      case 'suggestion':
        return '💡'
      case 'approval':
        return '✅'
      case 'revision_needed':
        return '🔄'
      default:
        return '💭'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-50 border-blue-200'
      case 'resolved':
        return 'bg-green-50 border-green-200'
      case 'acknowledged':
        return 'bg-gray-50 border-gray-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'acknowledged':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openFeedback = feedback.filter((f) => f.status === 'open')
  const resolvedFeedback = feedback.filter((f) => f.status !== 'open')

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Feedback & Comments</h3>
          <p className="text-sm text-gray-600">
            {feedback.length} total • {openFeedback.length} open
          </p>
        </div>
        <button
          onClick={onAddFeedback}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            showForm
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {showForm ? 'Cancel' : '+ Add Feedback'}
        </button>
      </div>

      {feedback.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No feedback yet. Mom can add comments here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Open Feedback */}
          {openFeedback.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-700 mb-3">Awaiting Response</h4>
              <div className="space-y-3">
                {openFeedback.map((item) => (
                  <div key={item.id} className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getFeedbackIcon(item.feedback_type)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{item.author_name}</p>
                          <p className="text-xs text-gray-600">
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${getStatusBadge(
                          item.feedback_type
                        )}`}
                      >
                        {item.feedback_type.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-gray-800 mb-3">{item.feedback_text}</p>

                    {item.section_name && (
                      <p className="text-sm text-gray-600 mb-3">
                        📍 Section: <span className="font-medium">{item.section_name}</span>
                      </p>
                    )}

                    <button
                      onClick={() => {
                        // Toggle resolution form
                        if (resolving !== item.id) {
                          setResolving(item.id)
                        } else {
                          setResolving(null)
                        }
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {resolving === item.id ? 'Hide response' : 'Resolve'}
                    </button>

                    {resolving === item.id && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <textarea
                          value={resolutionNotes}
                          onChange={(e) => setResolutionNotes(e.target.value)}
                          placeholder="Add resolution notes..."
                          rows={3}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleResolveFeedback(item.id)}
                            disabled={!resolutionNotes.trim()}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:bg-gray-300"
                          >
                            Mark Resolved
                          </button>
                          <button
                            onClick={() => setResolving(null)}
                            className="px-3 py-1 border text-sm rounded hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolved Feedback */}
          {resolvedFeedback.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-bold text-gray-700 mb-3">Resolved</h4>
              <div className="space-y-3">
                {resolvedFeedback.map((item) => (
                  <div key={item.id} className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getFeedbackIcon(item.feedback_type)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{item.author_name}</p>
                          <p className="text-xs text-gray-600">
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded font-medium bg-green-100 text-green-800">
                        ✓ Resolved
                      </span>
                    </div>

                    <p className="text-gray-800 mb-2">{item.feedback_text}</p>

                    {item.resolution_notes && (
                      <div className="mt-3 p-3 bg-white border-l-4 border-green-500 rounded text-sm">
                        <p className="text-gray-600 font-medium mb-1">Resolution:</p>
                        <p className="text-gray-800">{item.resolution_notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
