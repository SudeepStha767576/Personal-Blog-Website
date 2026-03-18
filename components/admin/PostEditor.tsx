'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PostData {
  title: string
  date: string
  excerpt: string
  tags: string
  author: string
  coverImage: string
  published: boolean
  content: string
}

interface Props {
  initial?: Partial<PostData>
  slug?: string // if editing existing
  mode: 'new' | 'edit'
}

const FORMAT_BUTTONS = [
  { label: 'H2', wrap: (s: string) => `## ${s}` },
  { label: 'H3', wrap: (s: string) => `### ${s}` },
  { label: 'Bold', wrap: (s: string) => `**${s}**` },
  { label: 'Italic', wrap: (s: string) => `*${s}*` },
  { label: 'Link', wrap: (s: string) => `[${s}](url)` },
  { label: 'Code', wrap: (s: string) => `\`${s}\`` },
  { label: 'Callout', wrap: () => `<Callout type="info">\nYour note here.\n</Callout>` },
  { label: 'Table', wrap: () => `| Column 1 | Column 2 |\n|----------|----------|\n| Value    | Value    |` },
]

export default function PostEditor({ initial, slug, mode }: Props) {
  const router = useRouter()

  const [form, setForm] = useState<PostData>({
    title: initial?.title ?? '',
    date: initial?.date ?? new Date().toISOString().split('T')[0],
    excerpt: initial?.excerpt ?? '',
    tags: initial?.tags ?? '',
    author: initial?.author ?? 'CA Your Name',
    coverImage: initial?.coverImage ?? '',
    published: initial?.published ?? false,
    content: initial?.content ?? '',
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function set(field: keyof PostData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function insertFormat(wrap: (s: string) => string) {
    const ta = document.getElementById('content-area') as HTMLTextAreaElement
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = form.content.slice(start, end) || 'text'
    const replacement = wrap(selected)
    const newContent =
      form.content.slice(0, start) + replacement + form.content.slice(end)
    set('content', newContent)
    // Re-focus after state update
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start, start + replacement.length)
    }, 0)
  }

  async function handleSave(publishNow?: boolean) {
    setSaving(true)
    setError('')
    setSuccess('')

    const payload = {
      ...form,
      published: publishNow !== undefined ? publishNow : form.published,
    }

    const url = mode === 'new' ? '/api/admin/posts' : `/api/admin/posts/${slug}`
    const method = mode === 'new' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong')
      setSaving(false)
      return
    }

    setSuccess(mode === 'new' ? 'Article created!' : 'Article updated!')
    setSaving(false)

    if (mode === 'new') {
      setTimeout(() => router.push('/admin'), 1000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin')}
            className="text-slate-500 hover:text-slate-900 text-sm"
          >
            ← Dashboard
          </button>
          <span className="text-slate-300">|</span>
          <h1 className="font-semibold text-slate-900 text-sm">
            {mode === 'new' ? 'New Article' : 'Edit Article'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {error && <span className="text-sm text-red-600">{error}</span>}
          {success && <span className="text-sm text-emerald-600">{success}</span>}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Article title…"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            className="w-full text-2xl font-bold px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder-slate-300"
          />

          {/* Excerpt */}
          <textarea
            placeholder="Short excerpt / summary (shown in card previews)"
            value={form.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700 placeholder-slate-400 text-sm resize-none"
          />

          {/* Format toolbar */}
          <div className="bg-white rounded-t-xl border border-b-0 border-slate-200 px-3 py-2 flex flex-wrap gap-1">
            {FORMAT_BUTTONS.map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => insertFormat(btn.wrap)}
                className="px-2 py-1 text-xs font-mono rounded border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <textarea
            id="content-area"
            placeholder="Write your article in Markdown…

# Use headings, **bold**, *italic*
- Bullet lists
- Are easy

> Blockquotes work too

Use <Callout type='info'> for highlighted notes."
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            rows={24}
            className="w-full px-4 py-3 rounded-b-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-sm text-slate-800 placeholder-slate-300 resize-y"
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish status */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">Status</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="w-4 h-4 accent-brand-600"
              />
              <span className="text-sm text-slate-700">Published (visible to readers)</span>
            </label>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <h3 className="font-semibold text-slate-900 text-sm">Details</h3>

            <div>
              <label className="block text-xs text-slate-500 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Tags <span className="text-slate-400">(comma-separated)</span>
              </label>
              <input
                type="text"
                placeholder="income-tax, gst, audit"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">Cover Image URL</label>
              <input
                type="text"
                placeholder="https://…"
                value={form.coverImage}
                onChange={(e) => set('coverImage', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-brand-50 rounded-xl border border-brand-100 p-4">
            <h3 className="font-semibold text-brand-800 text-sm mb-2">Writing Tips</h3>
            <ul className="text-xs text-brand-700 space-y-1">
              <li>• Use <code className="bg-brand-100 px-1 rounded">##</code> for section headings</li>
              <li>• Bold key terms with <code className="bg-brand-100 px-1 rounded">**text**</code></li>
              <li>• Add callout boxes for important notes</li>
              <li>• End with a call-to-action</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
