import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import TagBadge from '@/components/TagBadge'
import MDXContent from '@/components/mdx/MDXContent'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourblog.vercel.app'

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage
        ? [{ url: `${siteUrl}${post.coverImage}` }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post || !post.published) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourblog.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    url: `${siteUrl}/blog/${post.slug}`,
    ...(post.coverImage && { image: `${siteUrl}${post.coverImage}` }),
  }

  return (
    <article className="container-blog py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} href={`/blog?tag=${tag}`} />
          ))}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          {post.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {post.author} &middot;{' '}
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          &middot; {post.readingTime}
        </p>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-10 rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full object-cover max-h-96"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose-blog">
        <MDXContent source={post.content} />
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
        <p className="text-slate-500 text-sm">
          Written by{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {post.author}
          </span>
        </p>
      </footer>
    </article>
  )
}
