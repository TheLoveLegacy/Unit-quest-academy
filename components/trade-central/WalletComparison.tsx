'use client'

import { Wallet } from '@/lib/types'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

interface WalletComparisonProps {
  wallets: Wallet[]
}

export default function WalletComparison({ wallets }: WalletComparisonProps) {
  // Data for ROI comparison
  const roiData = wallets.map((w) => ({
    name: w.wallet_name,
    ROI: w.roi,
    balance: w.balance / 1000, // Scale down for readability
  }))

  // Data for performance metrics
  const metricsData = wallets.map((w) => ({
    name: w.wallet_name,
    'Win Rate': w.win_rate,
    'Max Drawdown': Math.abs(w.max_drawdown),
    'Total Trades': w.total_trades / 10, // Scale for readability
  }))

  // Radar chart data
  const radarData = wallets.map((w) => ({
    metric: w.wallet_name,
    'Win Rate': w.win_rate,
    'ROI': Math.min(w.roi, 100), // Cap at 100 for radar visibility
    'Profit Factor': Math.min((w.avg_win > 0 ? w.avg_win / w.avg_loss : 0) * 10, 100),
  }))

  return (
    <div className="space-y-6">
      {/* ROI Comparison */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">ROI Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ROI" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Win Rate" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Max Drawdown" stroke="#f97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart - Comprehensive Overview */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Comprehensive Performance Radar</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis />
            <Radar name="Performance" dataKey="Win Rate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
            <Radar name="Return" dataKey="ROI" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-left font-bold text-gray-800">Wallet</th>
              <th className="px-4 py-3 text-right font-bold text-gray-800">Balance</th>
              <th className="px-4 py-3 text-right font-bold text-gray-800">ROI</th>
              <th className="px-4 py-3 text-right font-bold text-gray-800">Win Rate</th>
              <th className="px-4 py-3 text-right font-bold text-gray-800">Trades</th>
              <th className="px-4 py-3 text-right font-bold text-gray-800">Drawdown</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet, idx) => (
              <tr key={wallet.id} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-4 py-3 font-medium text-gray-900">{wallet.wallet_name}</td>
                <td className="px-4 py-3 text-right text-gray-800">
                  ${wallet.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </td>
                <td className={`px-4 py-3 text-right font-bold ${wallet.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {wallet.roi >= 0 ? '+' : ''}{wallet.roi.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right text-blue-600 font-medium">{wallet.win_rate.toFixed(1)}%</td>
                <td className="px-4 py-3 text-right text-gray-800">{wallet.total_trades}</td>
                <td className="px-4 py-3 text-right font-medium text-orange-600">
                  -{wallet.max_drawdown.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
