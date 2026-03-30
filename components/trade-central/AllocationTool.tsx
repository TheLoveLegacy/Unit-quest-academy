'use client'

import { Wallet } from '@/lib/types'
import { useState } from 'react'

interface AllocationToolProps {
  wallets: Wallet[]
}

export default function AllocationTool({ wallets }: AllocationToolProps) {
  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)
  const [allocations, setAllocations] = useState<Record<number, number>>(
    wallets.reduce((acc, w) => {
      acc[w.id] = (w.balance / totalBalance) * 100
      return acc
    }, {} as Record<number, number>)
  )
  const [submitted, setSubmitted] = useState(false)

  const handleAllocationChange = (walletId: number, newPercentage: number) => {
    setAllocations((prev) => {
      const updated = { ...prev, [walletId]: newPercentage }
      // Normalize to sum to 100
      const sum = Object.values(updated).reduce((a, b) => a + b, 0)
      if (sum !== 100) {
        Object.keys(updated).forEach((key) => {
          updated[Number(key)] = (updated[Number(key)] / sum) * 100
        })
      }
      return updated
    })
  }

  const handleSubmit = async () => {
    // In a real app, this would save to Supabase
    console.log('Allocation submitted:', allocations)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real Money Allocation</h2>
          <p className="text-sm text-gray-600 mt-1">
            Adjust capital allocation across wallets. Total: ${totalBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>
        {submitted && <div className="text-green-600 font-bold text-lg">✓ Submitted</div>}
      </div>

      <div className="space-y-4">
        {wallets.map((wallet) => {
          const allocationAmount = (totalBalance * allocations[wallet.id]) / 100
          return (
            <div key={wallet.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900">{wallet.wallet_name}</div>
                  <div className="text-xs text-gray-600">Strategy: {wallet.strategy_name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">{allocations[wallet.id].toFixed(1)}%</div>
                  <div className="text-xs text-gray-600">
                    ${allocationAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={allocations[wallet.id]}
                onChange={(e) => handleAllocationChange(wallet.id, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              {/* Stats */}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-600 bg-gray-50 rounded p-2">
                <span>ROI: {wallet.roi >= 0 ? '+' : ''}{wallet.roi.toFixed(2)}%</span>
                <span>Win Rate: {wallet.win_rate.toFixed(1)}%</span>
                <span>Drawdown: -{wallet.max_drawdown.toFixed(2)}%</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk Warning */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div className="flex-1">
            <p className="font-bold text-yellow-900">Risk Warning</p>
            <p className="text-sm text-yellow-800 mt-1">
              Allocation changes take effect immediately. Past performance does not guarantee future results. Only allocate what you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-md hover:shadow-lg"
        >
          Confirm & Apply Allocation
        </button>
        <p className="text-xs text-gray-600">
          Total allocation: {Object.values(allocations).reduce((a, b) => a + b, 0).toFixed(1)}%
        </p>
      </div>
    </div>
  )
}
