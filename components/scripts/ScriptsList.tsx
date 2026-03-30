'use client'

import { Script } from '@/lib/types'

interface ScriptsListProps {
  scripts: Script[]
  selectedId?: number
  onSelect: (script: Script) => void
  isLoading?: boolean
}

export default function ScriptsList({ scripts, selectedId, onSelect, isLoading }: ScriptsListProps) {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Loading scripts...</div>
  }

  if (scripts.length === 0) {
    return <div className="p-4 text-center text-gray-600">No scripts found</div>
  }

  return (
    <div className="space-y-2">
      {scripts.map((script) => (
        <button
          key={script.id}
          onClick={() => onSelect(script)}
          className={`w-full text-left p-3 rounded-lg border transition ${
            selectedId === script.id ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50 border-gray-200'
          }`}
        >
          <div className="font-medium text-sm">{script.unit_name}</div>
          <div className="text-xs text-gray-600">{script.script_title}</div>
        </button>
      ))}
    </div>
  )
}
