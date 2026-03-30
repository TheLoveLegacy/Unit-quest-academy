'use client'

import { Wallet } from '@/lib/types'

interface WalletCardProps {
  wallet: Wallet
}

export default function WalletCard({ wallet }: WalletCardProps) {
  const profitLossColor = wallet.roi >= 0 ? 'text-green-600' : 'text-red-600'
  const profitLossBg = wallet.roi >= 0 ? 'bg-green-50' : 'bg-red-50'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Balance Card */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Total Balance</div>
        <div className="text-3xl font-bold mt-2">${wallet.balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
        <div className="text-xs text-gray-500 mt-2">{wallet.strategy_name} Strategy</div>
      </div>

      {/* ROI Card */}
      <div className={`rounded-lg p-6 shadow-sm hover:shadow-md transition border ${profitLossBg}`}>
        <div className="text-sm text-gray-600 font-medium">Return on Investment</div>
        <div className={`text-3xl font-bold mt-2 ${profitLossColor}`}>
          {wallet.roi >= 0 ? '+' : ''}{wallet.roi.toFixed(2)}%
        </div>
        <div className="text-xs text-gray-600 mt-2">
          Profit: ${(wallet.balance * (wallet.roi / 100)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
        </div>
      </div>

      {/* Win Rate Card */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Win Rate</div>
        <div className="text-3xl font-bold mt-2 text-blue-600">{wallet.win_rate.toFixed(1)}%</div>
        <div className="text-xs text-gray-600 mt-2">
          {wallet.winning_trades}W / {wallet.losing_trades}L
        </div>
      </div>

      {/* Drawdown Card */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Max Drawdown</div>
        <div className={`text-3xl font-bold mt-2 ${wallet.max_drawdown > 10 ? 'text-orange-600' : 'text-yellow-600'}`}>
          -{wallet.max_drawdown.toFixed(2)}%
        </div>
        <div className="text-xs text-gray-600 mt-2">Risk Management</div>
      </div>

      {/* Avg Win/Loss */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Avg. Win / Loss</div>
        <div className="mt-2">
          <div className="text-lg font-bold text-green-600">
            +${wallet.avg_win.toFixed(2)}
          </div>
          <div className="text-lg font-bold text-red-600">
            -${wallet.avg_loss.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Total Trades */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Total Trades</div>
        <div className="text-3xl font-bold mt-2">{wallet.total_trades}</div>
        <div className="text-xs text-gray-600 mt-2">
          {((wallet.winning_trades / wallet.total_trades) * 100).toFixed(0)}% win rate
        </div>
      </div>

      {/* Profit Factor */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Profit Factor</div>
        <div className="text-3xl font-bold mt-2 text-blue-600">
          {(wallet.avg_win > 0 ? wallet.avg_win / wallet.avg_loss : 0).toFixed(2)}
        </div>
        <div className="text-xs text-gray-600 mt-2">Win/Loss Ratio</div>
      </div>

      {/* Status */}
      <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">
        <div className="text-sm text-gray-600 font-medium">Status</div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Active</span>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          Last updated: {new Date(wallet.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
