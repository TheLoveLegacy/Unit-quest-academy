'use client'

import { Wallet } from '@/lib/types'

interface WalletComparisonProps {
  wallets: Wallet[]
}

export default function WalletComparison({ wallets }: WalletComparisonProps) {
  return (
    <div className="space-y-6">
      {/* Summary Table */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Wallet Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="px-4 py-3 text-left font-bold text-gray-900">Wallet</th>
                <th className="px-4 py-3 text-right font-bold text-gray-900">Balance</th>
                <th className="px-4 py-3 text-right font-bold text-gray-900">ROI</th>
                <th className="px-4 py-3 text-right font-bold text-gray-900">Win Rate</th>
                <th className="px-4 py-3 text-right font-bold text-gray-900">Trades</th>
                <th className="px-4 py-3 text-right font-bold text-gray-900">Max Drawdown</th>
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

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="text-sm font-bold text-gray-700 mb-2">{wallet.wallet_name}</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">ROI:</span>
                <span className={wallet.roi >= 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {wallet.roi.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Win Rate:</span>
                <span className="text-blue-600 font-bold">{wallet.win_rate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trades:</span>
                <span className="text-gray-800">{wallet.total_trades}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
