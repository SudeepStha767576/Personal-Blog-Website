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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-slate-900 dark:text-slate-50">CA Insights Admin</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Content Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              View Blog ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Articles', value: posts.length },
            { label: 'Published', value: posts.filter((p) => p.published).length },
            { label: 'Drafts', value: posts.filter((p) => !p.published).length },
          ].map((s) => (
            <div key={s.label} className="card p-6">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">{s.value}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Header and Action */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Articles</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Manage and edit your blog posts</p>
          </div>
          <Link
            href="/admin/posts/new"
            className="btn-primary"
          >
            + New Article
          </Link>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500">Loading articles…</div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">No articles yet.</p>
              <Link href="/admin/posts/new" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                Create your first article →
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Title</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 hidden sm:table-cell">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-xs">{post.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5 truncate">{post.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 hidden sm:table-cell text-sm">{new Date(post.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 justify-end">
                        <Link
                          href={`/admin/posts/${post.slug}/edit`}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={deleting === post.slug}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium disabled:opacity-50 transition-colors text-sm"
                        >
                          {deleting === post.slug ? 'Deleting…' : 'Delete'}
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
