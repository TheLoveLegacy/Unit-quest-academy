'use client'

import { TaskAssignment } from '@/lib/types'
import { StatusBadge } from './StatusBadge'

interface TaskCardProps {
  task: TaskAssignment
  onStart: (id: number) => void
  onMarkDone: (id: number) => void
  onViewNotes: (id: number) => void
}

const priorityColors: Record<string, string> = {
  low: 'text-blue-600',
  medium: 'text-yellow-600',
  high: 'text-orange-600',
  urgent: 'text-red-600',
}

export function TaskCard({ task, onStart, onMarkDone, onViewNotes }: TaskCardProps) {
  const dueDate = new Date(task.due_date)
  const today = new Date()
  const isOverdue = dueDate < today && task.status !== 'complete'

  return (
    <div className={`p-4 border rounded-lg ${isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{task.task_type.replace(/_/g, ' ')}</h3>
          {task.unit_name && <p className="text-sm text-gray-600">Unit {task.unit_id}: {task.unit_name}</p>}
        </div>
        <StatusBadge status={task.status} type="task" />
      </div>

      <p className="text-sm text-gray-600 mb-2">{task.description}</p>

      <div className="text-xs text-gray-500 mb-3">
        <p>
          Assigned by: {task.assigned_to === 'adam' ? 'Adam' : task.assigned_to}{' '}
          <span className={`font-bold ${priorityColors[task.priority] || 'text-gray-600'}`}>
            • Priority: {task.priority.toUpperCase()}
          </span>
        </p>
        <p className={isOverdue ? 'text-red-600 font-medium' : ''}>
          Due: {dueDate.toLocaleDateString()} {isOverdue && '(OVERDUE)'}
        </p>
      </div>

      {task.notes && (
        <div className="bg-white p-2 rounded text-sm mb-3 border-l-2 border-blue-300">
          <p className="font-medium text-blue-800">Notes:</p>
          <p className="text-gray-700">{task.notes}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onStart(task.id)}
          className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Start
        </button>
        <button
          onClick={() => onMarkDone(task.id)}
          className="flex-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Mark Done
        </button>
        <button
          onClick={() => onViewNotes(task.id)}
          className="flex-1 px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700"
        >
          Notes
        </button>
      </div>
    </div>
  )
}
