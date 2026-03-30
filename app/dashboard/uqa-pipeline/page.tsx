'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { UQAUnit } from '@/lib/types'
import { UQATable } from '@/components/UQATable'

export default function UQAPipelinePage() {
  const [units, setUnits] = useState<UQAUnit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const { data, error } = await supabase.from('uqa_units').select('*').order('unit_number')

        if (error) throw error
        if (data) setUnits(data as UQAUnit[])
      } catch (error) {
        console.error('Error loading units:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUnits()
  }, [])

  const statuses = Array.from(new Set(units.map((u) => u.status)))
  const countByStatus = (status: string) => units.filter((u) => u.status === status).length

  if (loading) {
    return <div className="text-center py-12">Loading UQA Pipeline...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">UQA Pipeline</h1>
      <p className="text-gray-600 mb-8">Track all {units.length} units through production</p>

      {/* Progress Summary */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h2 className="font-bold text-lg mb-4">Production Status</h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {statuses.map((status) => (
            <div key={status} className="text-center">
              <div className="text-3xl font-bold text-blue-600">{countByStatus(status)}</div>
              <div className="text-xs text-gray-600 mt-1">{status.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border rounded-lg p-6">
        <UQATable units={units} />
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Unit
        </button>
        <button className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700">
          Bulk Import
        </button>
        <button className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700">
          Export CSV
        </button>
        <Link href="/dashboard/scripts">
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            📚 View Scripts Database
          </button>
        </Link>
      </div>
    </div>
  )
}
