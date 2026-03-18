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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Top bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors"
          >
            ← Dashboard
          </button>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <h1 className="font-semibold text-slate-900 dark:text-slate-50 text-base">
            {mode === 'new' ? 'New Article' : 'Edit Article'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</span>}
          {success && <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{success}</span>}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="btn-secondary text-sm disabled:opacity-50"
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

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
              Article Title
            </label>
            <input
              type="text"
              placeholder="Enter article title…"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full text-3xl font-bold px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition-all"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
              Excerpt
            </label>
            <textarea
              placeholder="Short summary shown in card previews…"
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 text-sm resize-none transition-all"
            />
          </div>

          {/* Format toolbar */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-t-lg border border-b-0 border-slate-200 dark:border-slate-700 px-3 py-3 flex flex-wrap gap-2">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide self-center mr-2">Formatting:</span>
            {FORMAT_BUTTONS.map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => insertFormat(btn.wrap)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 hover:border-indigo-300 dark:hover:border-slate-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
              Content
            </label>
            <textarea
              id="content-area"
              placeholder="Write your article in Markdown…

# Main heading
## Section heading
### Subsection

Use **bold**, *italic*, `code`
- Bullet points
- Work great

Use <Callout type='info'>Your note</Callout> for highlighted boxes."
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              rows={24}
              className="w-full px-4 py-3 rounded-b-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm placeholder-slate-400 resize-y transition-all"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish status */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4 text-sm">Publish Status</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                Published (visible to readers)
              </span>
            </label>
          </div>

          {/* Meta fields */}
          <div className="card p-6 space-y-5">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm">Article Details</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Publish Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="income-tax, gst, audit"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition-all"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Comma-separated, no spaces</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Author
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={form.coverImage}
                onChange={(e) => set('coverImage', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="card p-6 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-900/20 dark:to-indigo-900/10 border-indigo-200 dark:border-indigo-800">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm mb-4">Writing Tips</h3>
            <ul className="text-xs text-indigo-800 dark:text-indigo-200 space-y-2 leading-relaxed">
              <li>• Use <code className="bg-indigo-100 dark:bg-indigo-900/50 px-1.5 py-0.5 rounded text-xs font-mono">##</code> for sections</li>
              <li>• Make key terms <strong>bold</strong> for emphasis</li>
              <li>• Use Callout boxes for important notes</li>
              <li>• End with a clear call-to-action</li>
              <li>• Keep paragraphs short and scannable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
