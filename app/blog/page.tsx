import type { Metadata } from 'next'
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
    <div className="container-blog py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
        Articles
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        {allPosts.length} article{allPosts.length !== 1 ? 's' : ''} on Income Tax, GST, Audit, and Financial Planning.
      </p>

      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <TagBadge tag="All" href="/blog" active={!activeTag} />
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              href={`/blog?tag=${tag}`}
              active={activeTag === tag}
            />
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-slate-500 mt-12">
          No posts found{activeTag ? ` for tag "${activeTag}"` : ''}.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
