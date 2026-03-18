import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import TagBadge from './TagBadge'

interface Props {
  post: PostMeta
}

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="card flex flex-col group">
      {post.coverImage && (
        <div className="overflow-hidden h-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mt-auto pt-2">
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
