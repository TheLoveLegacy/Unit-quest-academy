'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { UQAUnit, TaskAssignment, MomReviewQueue } from '@/lib/types'

export default function DashboardHome() {
  const [units, setUnits] = useState<UQAUnit[]>([])
  const [tasks, setTasks] = useState<TaskAssignment[]>([])
  const [momQueue, setMomQueue] = useState<MomReviewQueue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [unitsRes, tasksRes, queueRes] = await Promise.all([
          supabase.from('uqa_units').select('*'),
          supabase.from('task_assignments').select('*').eq('assigned_to', 'adam'),
          supabase.from('mom_review_queue').select('*'),
        ])

        if (unitsRes.data) setUnits(unitsRes.data as UQAUnit[])
        if (tasksRes.data) setTasks(tasksRes.data as TaskAssignment[])
        if (queueRes.data) setMomQueue(queueRes.data as MomReviewQueue[])
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const scriptedCount = units.filter((u) => u.status.includes('script')).length
  const filmedCount = units.filter((u) => u.status.includes('filming')).length
  const liveCount = units.filter((u) => u.status === 'published').length

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length
  const momPending = momQueue.filter((q) => q.status === 'pending').length
  const momApproved = momQueue.filter((q) => q.status === 'approved').length

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Welcome, Adam</h1>
      <p className="text-gray-600 mb-8">Mission Control Phase 0</p>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-4xl font-bold text-blue-600">{scriptedCount}</div>
          <div className="text-gray-600 mt-2">Units Scripted</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="text-4xl font-bold text-yellow-600">{filmedCount}</div>
          <div className="text-gray-600 mt-2">Units Filming</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-4xl font-bold text-green-600">{liveCount}</div>
          <div className="text-gray-600 mt-2">Live Units</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Your Tasks */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>{pendingTasks} pending tasks</span>
              <span className="text-red-600 font-bold">TODO</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>{tasks.filter((t) => t.status === 'in_progress').length} in progress</span>
              <span className="text-yellow-600 font-bold">IN PROGRESS</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>{tasks.filter((t) => t.status === 'complete').length} completed</span>
              <span className="text-green-600 font-bold">DONE</span>
            </div>
          </div>
          <a href="/dashboard/tasks" className="block mt-4 text-blue-600 hover:underline">
            View All Tasks →
          </a>
        </div>

        {/* Mom's Queue */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Mom's Review Queue</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>{momPending} units pending</span>
              <span className="text-gray-600 font-bold">PENDING</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>{momQueue.filter((q) => q.status === 'in_progress').length} in progress</span>
              <span className="text-yellow-600 font-bold">REVIEWING</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>{momApproved} approved</span>
              <span className="text-green-600 font-bold">APPROVED</span>
            </div>
          </div>
          <a href="/dashboard/moms-queue" className="block mt-4 text-blue-600 hover:underline">
            View Mom's Queue →
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 bg-slate-50 border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <a href="/dashboard/uqa-pipeline" className="px-4 py-3 bg-white border rounded hover:bg-blue-50 transition text-center">
            📊 UQA Pipeline
          </a>
          <a href="/dashboard/scripts" className="px-4 py-3 bg-white border rounded hover:bg-blue-50 transition text-center">
            📚 Scripts
          </a>
          <a href="/dashboard/trade-central" className="px-4 py-3 bg-white border rounded hover:bg-green-50 transition text-center">
            💰 Trade Central
          </a>
          <a href="/dashboard/moms-queue" className="px-4 py-3 bg-white border rounded hover:bg-green-50 transition text-center">
            👩 Mom's Queue
          </a>
          <a href="/dashboard/tasks" className="px-4 py-3 bg-white border rounded hover:bg-yellow-50 transition text-center">
            ✓ Tasks
          </a>
        </div>
      </div>
    </div>
  )
}
