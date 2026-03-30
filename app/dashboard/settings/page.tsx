'use client'

import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'reviewer' | 'coordinator'
}

export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Adam Knopf', email: 'adam@example.com', role: 'admin' },
    { id: 2, name: 'Mom', email: 'mom@example.com', role: 'reviewer' },
    { id: 3, name: 'Alaina', email: 'alaina@example.com', role: 'coordinator' },
  ])

  const roleDescriptions: Record<string, string> = {
    admin: 'Full access, can manage users and all settings',
    reviewer: 'Can review units and provide feedback',
    coordinator: 'Can manage tasks and track progress',
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Dashboard users and permissions</p>

      {/* Users Section */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard Users</h2>

        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">{roleDescriptions[user.role]}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 rounded text-sm font-medium">{user.role}</span>
                <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-bold mb-4">Add New User</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="reviewer">Reviewer</option>
                <option value="coordinator">Coordinator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-slate-50 border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">System Information</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Version:</span>
            <span className="font-mono">Phase 0 - MVP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Database:</span>
            <span className="font-mono">Supabase</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated:</span>
            <span className="font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
