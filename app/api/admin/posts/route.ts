import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { COOKIE_NAME, COOKIE_VALUE } from '@/lib/adminAuth'
import { cookies } from 'next/headers'
import { getAllPosts } from '@/lib/posts'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function checkAuth() {
  const cookieStore = cookies()
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Return all posts including drafts
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    : []

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '')
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
    const titleMatch = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m)
    const dateMatch = raw.match(/^date:\s*["']?(.+?)["']?\s*$/m)
    const publishedMatch = raw.match(/^published:\s*(true|false)\s*$/m)
    const tagsMatch = raw.match(/^tags:\s*\[(.+?)\]\s*$/m)
    return {
      slug,
      title: titleMatch?.[1] ?? slug,
      date: dateMatch?.[1] ?? '',
      published: publishedMatch?.[1] !== 'false',
      tags: tagsMatch?.[1]?.split(',').map((t) => t.trim().replace(/['"]/g, '')) ?? [],
    }
  }).sort((a, b) => (a.date > b.date ? -1 : 1))

  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, date, excerpt, tags, author, published, content, coverImage } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const slug = slugify(title)
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'A post with this title already exists' }, { status: 409 })
  }

  const tagsArray = typeof tags === 'string'
    ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : tags ?? []

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date || new Date().toISOString().split('T')[0]}"
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
tags: [${tagsArray.map((t: string) => `"${t}"`).join(', ')}]
author: "${(author || 'CA Your Name').replace(/"/g, '\\"')}"
published: ${published !== false}
${coverImage ? `coverImage: "${coverImage}"` : ''}
---

${content}`

  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })
  fs.writeFileSync(filePath, frontmatter.trim(), 'utf-8')

  return NextResponse.json({ slug }, { status: 201 })
}
