'use client'

import { Alert } from '@/lib/types'
import { useState } from 'react'

interface AlertsPanelProps {
  alerts: Alert[]
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  const [expandedAlerts, setExpandedAlerts] = useState<number[]>([])

  const toggleAlert = (id: number) => {
    setExpandedAlerts((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800'
      case 'high':
        return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'low':
        return 'bg-blue-100 border-blue-300 text-blue-800'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '🚨'
      case 'high':
        return '⚠️'
      case 'medium':
        return '⚡'
      case 'low':
        return 'ℹ️'
      default:
        return '•'
    }
  }

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'drawdown_warning':
        return 'Drawdown Warning'
      case 'daily_summary':
        return 'Daily Summary'
      case 'milestone':
        return 'Milestone'
      case 'risk_warning':
        return 'Risk Warning'
      default:
        return type
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold">Alerts & Notifications</h2>
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-800">
          <p className="font-medium">✓ No alerts at this time</p>
          <p className="text-xs text-green-700 mt-1">All wallets are performing normally</p>
        </div>
      ) : (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 cursor-pointer transition hover:shadow-md ${getSeverityColor(
                alert.severity
              )}`}
              onClick={() => toggleAlert(alert.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-xl mt-0.5">{getSeverityIcon(alert.severity)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{getAlertTypeLabel(alert.alert_type)}</span>
                      <span className="text-xs px-2 py-1 rounded bg-black bg-opacity-20">
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{alert.message}</p>
                    {expandedAlerts.includes(alert.id) && (
                      <div className="mt-2 pt-2 border-t border-current border-opacity-30 text-xs opacity-75">
                        <p>Time: {new Date(alert.created_at).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="ml-2 text-lg opacity-50 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
