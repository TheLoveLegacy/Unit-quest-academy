'use client'

import { useState, useMemo } from 'react'
import { UQAUnit } from '@/lib/types'
import { StatusBadge } from './StatusBadge'

interface UQATableProps {
  units: UQAUnit[]
}

export function UQATable({ units }: UQATableProps) {
  const [sortBy, setSortBy] = useState<keyof UQAUnit>('unit_number')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterSubject, setFilterSubject] = useState<string>('')

  const sorted = useMemo(() => {
    let result = [...units]

    if (filterStatus) {
      result = result.filter((u) => u.status === filterStatus)
    }
    if (filterSubject) {
      result = result.filter((u) => u.subject === filterSubject)
    }

    result.sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]

      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }

      return 0
    })

    return result
  }, [units, sortBy, sortDir, filterStatus, filterSubject])

  const subjects = Array.from(new Set(units.map((u) => u.subject)))
  const statuses = Array.from(new Set(units.map((u) => u.status)))

  const handleSort = (column: keyof UQAUnit) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('asc')
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded bg-white"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, ' ')}
            </option>
          ))}
        </select>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-3 py-2 border rounded bg-white"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th
                className="px-4 py-2 text-left cursor-pointer hover:bg-slate-200"
                onClick={() => handleSort('unit_number')}
              >
                Unit # {sortBy === 'unit_number' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:bg-slate-200"
                onClick={() => handleSort('unit_name')}
              >
                Name {sortBy === 'unit_name' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:bg-slate-200"
                onClick={() => handleSort('subject')}
              >
                Subject {sortBy === 'subject' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:bg-slate-200"
                onClick={() => handleSort('status')}
              >
                Status {sortBy === 'status' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer hover:bg-slate-200"
                onClick={() => handleSort('mom_review_status')}
              >
                Mom Review {sortBy === 'mom_review_status' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-2 text-left">Dates</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((unit) => (
              <tr key={unit.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-2 font-medium">{String(unit.unit_number).padStart(2, '0')}</td>
                <td className="px-4 py-2">{unit.unit_name}</td>
                <td className="px-4 py-2 text-sm">{unit.subject}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={unit.status} type="stage" />
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={unit.mom_review_status} type="review" />
                </td>
                <td className="px-4 py-2 text-sm text-slate-600">
                  {unit.filming_date && <div>Film: {unit.filming_date}</div>}
                  {unit.upload_date && <div>Upload: {unit.upload_date}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        Showing {sorted.length} of {units.length} units
      </div>
    </div>
  )
}
