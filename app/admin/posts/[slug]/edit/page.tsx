import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import PostEditor from '@/components/admin/PostEditor'

interface Props {
  params: { slug: string }
}

export default function EditPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <PostEditor
      mode="edit"
      slug={params.slug}
      initial={{
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags.join(', '),
        author: post.author,
        coverImage: post.coverImage ?? '',
        published: post.published,
        content: post.content,
      }}
    />
  )
}
