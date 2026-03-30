'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Wallet, Trade, Alert } from '@/lib/types'
import WalletCard from '@/components/trade-central/WalletCard'
import WalletComparison from '@/components/trade-central/WalletComparison'
import AlertsPanel from '@/components/trade-central/AlertsPanel'
import AllocationTool from '@/components/trade-central/AllocationTool'

export default function TradeCentralPage() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [trades, setTrades] = useState<Trade[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [activeWallet, setActiveWallet] = useState<string>('LP-WALLET')
  const [showAllocation, setShowAllocation] = useState(false)

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [walletsRes, tradesRes, alertsRes] = await Promise.all([
          supabase.from('wallets').select('*').order('created_at', { ascending: false }),
          supabase.from('trades').select('*').order('created_at', { ascending: false }),
          supabase.from('alerts').select('*').order('created_at', { ascending: false }).limit(10),
        ])

        if (walletsRes.data) {
          setWallets(walletsRes.data as Wallet[])
        }

        if (tradesRes.data) {
          setTrades(tradesRes.data as Trade[])
        }

        if (alertsRes.data) {
          setAlerts(alertsRes.data as Alert[])
        }
      } catch (error) {
        console.error('Error loading trade data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const activeWalletData = wallets.find((w) => w.wallet_name === activeWallet)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Trade Central...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Trade Central</h1>
          <p className="text-gray-600 mt-2">Monitor wallets, view real-time stats, and manage allocation</p>
        </div>
        <button
          onClick={() => setShowAllocation(!showAllocation)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {showAllocation ? 'Hide Allocation' : 'Real Money Allocation'}
        </button>
      </div>

      {/* Alerts Panel */}
      {alerts.length > 0 && <AlertsPanel alerts={alerts} />}

      {/* Allocation Tool */}
      {showAllocation && <AllocationTool wallets={wallets} />}

      {/* Wallet Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {wallets.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => setActiveWallet(wallet.wallet_name)}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeWallet === wallet.wallet_name
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {wallet.wallet_name}
          </button>
        ))}
      </div>

      {/* Active Wallet Detail */}
      {activeWalletData ? (
        <div className="space-y-6">
          <WalletCard wallet={activeWalletData} />

          {/* Wallet Comparison Chart */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-4">Wallet Comparison</h2>
            <WalletComparison wallets={wallets} />
          </div>

          {/* Recent Trades */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
            <div className="space-y-2">
              {trades
                .filter((t) =>
                  wallets.find((w) => w.id === t.wallet_id && w.wallet_name === activeWallet)
                )
                .slice(0, 10)
                .map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{trade.strategy}</div>
                      <div className="text-xs text-gray-600">
                        Entry: ${trade.entry_price.toFixed(2)} → Exit: ${trade.exit_price.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${trade.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.roi >= 0 ? '+' : ''}{trade.roi.toFixed(2)}%
                      </div>
                      <div className="text-xs text-gray-600">{new Date(trade.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-12 text-center">
          <p className="text-gray-600">No wallet data available</p>
        </div>
      )}
    </div>
  )
}
