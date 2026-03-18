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
      <section className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="container-blog py-24">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4 tracking-widest uppercase">Resources</p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mb-6">
            Financial Insights
          </h1>
          <p className="text-xl text-stone-700 dark:text-stone-300 max-w-3xl leading-relaxed">
            {allPosts.length} expertly-crafted article{allPosts.length !== 1 ? 's' : ''} covering Income Tax, GST, Audit, Company Law, and strategic financial planning.
          </p>
        </div>
      </section>

      <div className="container-blog py-16">
        {/* Tag filter */}
        {tags.length > 0 && (
          <div className="mb-16 pb-12 border-b border-stone-200 dark:border-stone-800">
            <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-6 tracking-widest uppercase">Filter by Topic</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all uppercase tracking-wide ${
                  !activeTag
                    ? 'bg-emerald-600 text-white dark:bg-emerald-600'
                    : 'bg-stone-200 text-stone-900 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                All Topics
              </Link>
              {tags.map((tag) => {
                const isActive = activeTag === tag
                return (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all uppercase tracking-wide ${
                      isActive
                        ? 'bg-emerald-600 text-white dark:bg-emerald-600'
                        : 'bg-stone-200 text-stone-900 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700'
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
          <div className="text-center py-24">
            <p className="text-stone-600 dark:text-stone-400 text-lg mb-4">
              {activeTag ? `No articles found for "${activeTag}".` : 'No articles published yet.'}
            </p>
            <Link href="/blog" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
              View all topics →
            </Link>
          </div>
        ) : (
          <div className="grid gap-12">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
