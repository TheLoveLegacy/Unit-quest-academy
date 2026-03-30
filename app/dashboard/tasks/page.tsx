'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TaskAssignment } from '@/lib/types'
import { TaskCard } from '@/components/TaskCard'

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [filterPerson, setFilterPerson] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string>('')

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('task_assignments')
          .select('*')
          .order('due_date')

        if (error) throw error
        if (data) setTasks(data as TaskAssignment[])
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleStart = async (id: number) => {
    try {
      const { error } = await supabase
        .from('task_assignments')
        .update({ status: 'in_progress' })
        .eq('id', id)

      if (error) throw error
      const updated = tasks.map((t) => (t.id === id ? { ...t, status: 'in_progress' } : t))
      setTasks(updated)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleMarkDone = async (id: number) => {
    try {
      const { error } = await supabase
        .from('task_assignments')
        .update({ status: 'complete' })
        .eq('id', id)

      if (error) throw error
      const updated = tasks.map((t) => (t.id === id ? { ...t, status: 'complete' } : t))
      setTasks(updated)
    } catch (error) {
      console.error('Error marking task done:', error)
    }
  }

  const handleViewNotes = (id: number) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      alert(`Notes for: ${task.task_type}\n\n${task.notes || 'No notes'}`)
    }
  }

  const filtered = tasks.filter((t) => {
    if (filterPerson && t.assigned_to !== filterPerson) return false
    if (filterPriority && t.priority !== filterPriority) return false
    return true
  })

  const pending = filtered.filter((t) => t.status === 'pending')
  const inProgress = filtered.filter((t) => t.status === 'in_progress')
  const blocked = filtered.filter((t) => t.status === 'blocked')
  const complete = filtered.filter((t) => t.status === 'complete')

  const assignees = Array.from(new Set(tasks.map((t) => t.assigned_to)))

  if (loading) {
    return <div className="text-center py-12">Loading tasks...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Task Assignments</h1>
      <p className="text-gray-600 mb-8">Manage work across the team</p>

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
        <div className="bg-red-50 border rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">{blocked.length}</div>
          <div className="text-xs text-gray-600 mt-1">Blocked</div>
        </div>
        <div className="bg-green-50 border rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{complete.length}</div>
          <div className="text-xs text-gray-600 mt-1">Complete</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={filterPerson}
          onChange={(e) => setFilterPerson(e.target.value)}
          className="px-4 py-2 border rounded bg-white"
        >
          <option value="">All People</option>
          {assignees.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2 border rounded bg-white"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      {/* Task Sections */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pending</h2>
          <div className="space-y-4">
            {pending.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleStart}
                onMarkDone={handleMarkDone}
                onViewNotes={handleViewNotes}
              />
            ))}
          </div>
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">In Progress</h2>
          <div className="space-y-4">
            {inProgress.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleStart}
                onMarkDone={handleMarkDone}
                onViewNotes={handleViewNotes}
              />
            ))}
          </div>
        </div>
      )}

      {blocked.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Blocked</h2>
          <div className="space-y-4">
            {blocked.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleStart}
                onMarkDone={handleMarkDone}
                onViewNotes={handleViewNotes}
              />
            ))}
          </div>
        </div>
      )}

      {complete.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Complete</h2>
          <div className="space-y-4">
            {complete.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleStart}
                onMarkDone={handleMarkDone}
                onViewNotes={handleViewNotes}
              />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tasks match your filters.
        </div>
      )}

      {/* Create Task Button */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create New Task</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + New Task
        </button>
      </div>
    </div>
  )
}
