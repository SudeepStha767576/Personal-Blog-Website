import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import TagBadge from '@/components/TagBadge'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Expert articles on Income Tax, GST, Audit, Company Law, and Financial Planning.',
}

interface Props {
  searchParams: { tag?: string }
}

export default function BlogPage({ searchParams }: Props) {
  const activeTag = searchParams.tag ?? null
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const posts = activeTag
    ? allPosts.filter((p) =>
        p.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
      )
    : allPosts

  return (
    <>
      {/* Header */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container-blog py-16">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Articles
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
            {allPosts.length} article{allPosts.length !== 1 ? 's' : ''} on Income Tax, GST, Audit, Company Law, and Financial Planning.
          </p>
        </div>
      </section>

      <div className="container-blog py-12">
        {/* Tag filter */}
        {tags.length > 0 && (
          <div className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 tracking-wide uppercase">Filter by topic</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !activeTag
                    ? 'bg-indigo-600 text-white dark:bg-indigo-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                All Articles
              </Link>
              {tags.map((tag) => {
                const isActive = activeTag === tag
                return (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white dark:bg-indigo-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tag}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {activeTag ? `No articles found for "${activeTag}". ` : 'No articles yet. '}
              <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                View all articles
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
