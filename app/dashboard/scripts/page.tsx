'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Script, ScriptFeedback } from '@/lib/types'
import ScriptsList from '@/components/scripts/ScriptsList'
import ScriptDetail from '@/components/scripts/ScriptDetail'

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)
  const [feedback, setFeedback] = useState<ScriptFeedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSubject, setFilterSubject] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('')

  // Load scripts and feedback
  useEffect(() => {
    const loadData = async () => {
      try {
        const [scriptsRes, feedbackRes] = await Promise.all([
          supabase.from('scripts').select('*').order('created_at', { ascending: false }),
          supabase.from('script_feedback').select('*'),
        ])

        if (scriptsRes.data) {
          setScripts(scriptsRes.data as Script[])
          // Select first script by default
          if (scriptsRes.data.length > 0) {
            setSelectedScript(scriptsRes.data[0] as Script)
          }
        }

        if (feedbackRes.data) {
          setFeedback(feedbackRes.data as ScriptFeedback[])
        }
      } catch (error) {
        console.error('Error loading scripts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter scripts based on search and filters
  const filteredScripts = scripts.filter((script) => {
    const matchesSearch =
      script.unit_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.script_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubject = filterSubject === '' || script.subject === filterSubject
    const matchesStatus = filterStatus === '' || script.script_status === filterStatus

    return matchesSearch && matchesSubject && matchesStatus
  })

  // Get feedback for selected script
  const scriptFeedback = selectedScript
    ? feedback.filter((f) => f.script_id === selectedScript.id)
    : []

  const subjects = ['Science', 'History', 'Math', 'Art', 'Geography', 'Reading']
  const statuses = ['draft', 'in_review', 'approved', 'published', 'archived']

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scripts database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Scripts Database</h1>
        <p className="text-gray-600 mt-2">Browse, search, and manage all {scripts.length} UQA scripts. Mom can view and leave feedback.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600">Total Scripts</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{scripts.length}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600">Published</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {scripts.filter((s) => s.script_status === 'published').length}
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600">In Review</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">
            {scripts.filter((s) => s.script_status === 'in_review').length}
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600">Drafts</div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            {scripts.filter((s) => s.script_status === 'draft').length}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Scripts List */}
        <div className="col-span-1 bg-white border rounded-lg p-6">
          <div className="mb-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Found {filteredScripts.length} script{filteredScripts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Scripts List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredScripts.map((script) => (
              <button
                key={script.id}
                onClick={() => setSelectedScript(script)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selectedScript?.id === script.id
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
              >
                <div className="font-medium text-sm">{script.unit_name}</div>
                <div className="text-xs text-gray-600 mt-1">{script.script_title}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(script.script_status)}`}>
                    {script.script_status}
                  </span>
                  <span className="text-xs text-gray-500">{script.subject}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Script Detail & Feedback */}
        <div className="col-span-2 space-y-6">
          {selectedScript ? (
            <>
              <ScriptDetail script={selectedScript} feedback={scriptFeedback} />
            </>
          ) : (
            <div className="bg-white border rounded-lg p-12 text-center">
              <p className="text-gray-600">Select a script to view details and feedback</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
