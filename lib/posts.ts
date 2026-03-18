import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  coverImage?: string
  author: string
  published: boolean
  readingTime?: string
}

export interface Post extends PostMeta {
  content: string
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    author: data.author ?? 'Author',
    published: data.published !== false,
    readingTime: estimateReadingTime(content),
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map(({ content: _content, ...meta }) => meta)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}
