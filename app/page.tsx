import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Mission Control</h1>
        <p className="text-xl text-slate-300 mb-8">UQA Pipeline + Mom's Queue + Task Assignments</p>
        <p className="text-slate-400 mb-12 max-w-2xl">
          Phase 0: Fast, functional MVP. Get the work visible. Polish happens later.
        </p>

        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Enter Dashboard
        </Link>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="p-4">
            <div className="text-3xl mb-2">📊</div>
            <h2 className="font-bold mb-2">UQA Pipeline</h2>
            <p className="text-sm text-slate-400">Track all 112 units through production</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">👩</div>
            <h2 className="font-bold mb-2">Mom's Queue</h2>
            <p className="text-sm text-slate-400">Review and approve scripts</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">✓</div>
            <h2 className="font-bold mb-2">Task Assignments</h2>
            <p className="text-sm text-slate-400">Assign and track work</p>
          </div>
        </div>
      </div>
    </div>
  )
}
