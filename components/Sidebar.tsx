'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">Mission Control</h1>
        <p className="text-xs text-slate-400 mt-1">Phase 0</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/dashboard"
          className={`block px-4 py-2 rounded ${
            isActive('/dashboard') && !pathname.includes('uqa') && !pathname.includes('queue') && !pathname.includes('tasks')
              ? 'bg-slate-700'
              : 'hover:bg-slate-800'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/uqa-pipeline"
          className={`block px-4 py-2 rounded ${isActive('/dashboard/uqa-pipeline') ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
        >
          UQA Pipeline
        </Link>
        <Link
          href="/dashboard/moms-queue"
          className={`block px-4 py-2 rounded ${isActive('/dashboard/moms-queue') ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
        >
          Mom&apos;s Queue
        </Link>
        <Link
          href="/dashboard/tasks"
          className={`block px-4 py-2 rounded ${isActive('/dashboard/tasks') ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
        >
          Tasks
        </Link>
        <Link
          href="/dashboard/scripts"
          className={`block px-4 py-2 rounded ${isActive('/dashboard/scripts') ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
        >
          📚 Scripts
        </Link>
        <Link
          href="/dashboard/trade-central"
          className={`block px-4 py-2 rounded ${isActive('/dashboard/trade-central') ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
        >
          💰 Trade Central
        </Link>
        <Link
          href="/dashboard/settings"
          className={`block px-4 py-2 rounded ${isActive('/dashboard/settings') ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
        >
          Settings
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">User: Adam</p>
        <button className="mt-2 w-full px-4 py-2 bg-slate-700 rounded text-sm hover:bg-slate-600">
          Logout
        </button>
      </div>
    </div>
  )
}
