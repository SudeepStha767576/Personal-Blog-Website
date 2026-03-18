'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PostMeta {
  slug: string
  title: string
  date: string
  published: boolean
  tags: string[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function fetchPosts() {
    const res = await fetch('/api/admin/posts')
    if (res.ok) {
      setPosts(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeleting(slug)
    await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.slug !== slug))
    setDeleting(null)
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏦</span>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">CA Insights Admin</h1>
            <p className="text-xs text-slate-500">Blog Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            View Blog ↗
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Articles', value: posts.length },
            { label: 'Published', value: posts.filter((p) => p.published).length },
            { label: 'Drafts', value: posts.filter((p) => !p.published).length },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">All Articles</h2>
          <Link
            href="/admin/posts/new"
            className="btn-primary text-sm"
          >
            + New Article
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-slate-400">Loading…</div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              No articles yet.{' '}
              <Link href="/admin/posts/new" className="text-brand-600 hover:underline">
                Create your first one →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 truncate max-w-xs">{post.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{post.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{post.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/posts/${post.slug}/edit`}
                          className="text-brand-600 hover:text-brand-800 font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={deleting === post.slug}
                          className="text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                        >
                          {deleting === post.slug ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
