import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import TagBadge from './TagBadge'

interface Props {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: Props) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="card group overflow-hidden flex flex-col sm:flex-row-reverse">
        {post.coverImage && (
          <div className="overflow-hidden h-64 sm:h-auto sm:w-2/5 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3">
              {post.title}
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readingTime && <span className="font-medium">{post.readingTime}</span>}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="card flex flex-col group">
      {post.coverImage && (
        <div className="overflow-hidden h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto pt-2 border-t border-slate-200 dark:border-slate-700">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      </div>
    </Link>
  )
}
