'use client'

import { useState } from 'react'
import { Script, ScriptFeedback } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import FeedbackPanel from './FeedbackPanel'

interface ScriptDetailProps {
  script: Script
  feedback: ScriptFeedback[]
}

export default function ScriptDetail({ script, feedback }: ScriptDetailProps) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackType, setFeedbackType] = useState<'comment' | 'suggestion' | 'approval' | 'revision_needed'>(
    'comment'
  )
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) return

    setSubmitting(true)
    try {
      const { error } = await supabase.from('script_feedback').insert([
        {
          script_id: script.id,
          unit_id: script.unit_id,
          feedback_type: feedbackType,
          author_name: 'Mom', // In real app, would use actual user
          author_role: 'reviewer',
          feedback_text: feedbackText,
          status: 'open',
        },
      ])

      if (error) throw error

      // Reset form
      setFeedbackText('')
      setShowFeedbackForm(false)

      // Reload page to show new feedback (in production, would optimistically update)
      window.location.reload()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback')
    } finally {
      setSubmitting(false)
    }
  }

  const parseJSON = (jsonString?: string) => {
    try {
      return jsonString ? JSON.parse(jsonString) : null
    } catch {
      return null
    }
  }

  const objectives = parseJSON(script.learning_objectives) || []
  const concepts = parseJSON(script.key_concepts) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'archived':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{script.unit_name}</h2>
            <p className="text-gray-600">{script.script_title}</p>
          </div>
          <span className={`text-sm px-3 py-1 rounded font-medium ${getStatusColor(script.script_status)}`}>
            {script.script_status.toUpperCase()}
          </span>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Subject:</span>
            <span className="ml-2 font-medium">{script.subject}</span>
          </div>
          <div>
            <span className="text-gray-600">Version:</span>
            <span className="ml-2 font-medium">v{script.script_version}</span>
          </div>
          <div>
            <span className="text-gray-600">Age Range:</span>
            <span className="ml-2 font-medium">{script.age_range || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-600">Duration:</span>
            <span className="ml-2 font-medium">
              {script.estimated_duration_minutes || '?'}min video + {script.activity_duration_minutes || '?'}min activity
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Created by:</span>
            <span className="ml-2 font-medium">{script.created_by || 'Unknown'}</span>
          </div>
        </div>
      </div>

      {/* Script Content */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Script Content</h3>

        {/* Nova Hook */}
        {script.nova_dialogue_hook && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-600 mb-1">📺 Opening Hook</p>
            <p className="text-gray-800 italic">{script.nova_dialogue_hook}</p>
          </div>
        )}

        {/* Key Concepts */}
        {concepts.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-2">Key Concepts</h4>
            <ul className="list-disc list-inside space-y-1">
              {concepts.map((concept: string, idx: number) => (
                <li key={idx} className="text-gray-700">
                  {concept}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Objectives */}
        {objectives.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-2">Learning Objectives</h4>
            <ul className="list-decimal list-inside space-y-1">
              {objectives.map((objective: string, idx: number) => (
                <li key={idx} className="text-gray-700">
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Script Content */}
        <div className="mb-6 prose prose-sm max-w-none">
          <div className="bg-gray-50 p-4 rounded border text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
            {script.script_content}
          </div>
        </div>

        {/* Production Notes */}
        {script.video_script_notes && (
          <div className="mb-6 p-4 bg-purple-50 border rounded">
            <p className="text-sm text-gray-600 mb-1">🎥 Video Production Notes</p>
            <p className="text-gray-800">{script.video_script_notes}</p>
          </div>
        )}

        {/* Game Connection */}
        {script.game_connection && (
          <div className="p-4 bg-green-50 border rounded">
            <p className="text-sm text-gray-600 mb-1">🎮 Game Connection</p>
            <p className="text-gray-800">{script.game_connection}</p>
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <FeedbackPanel
        feedback={feedback}
        onAddFeedback={() => setShowFeedbackForm(!showFeedbackForm)}
        showForm={showFeedbackForm}
      />

      {/* Add Feedback Form */}
      {showFeedbackForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Add Feedback</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Type</label>
            <select
              value={feedbackType}
              onChange={(e) =>
                setFeedbackType(e.target.value as 'comment' | 'suggestion' | 'approval' | 'revision_needed')
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="comment">💬 Comment</option>
              <option value="suggestion">💡 Suggestion</option>
              <option value="approval">✅ Approval</option>
              <option value="revision_needed">🔄 Revision Needed</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback here..."
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmitFeedback}
              disabled={submitting || !feedbackText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
