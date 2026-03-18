import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { COOKIE_NAME, COOKIE_VALUE } from '@/lib/adminAuth'
import { cookies } from 'next/headers'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function checkAuth() {
  const cookieStore = cookies()
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const filePath = path.join(POSTS_DIR, `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return NextResponse.json({ ...data, content, slug: params.slug })
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const filePath = path.join(POSTS_DIR, `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = await req.json()
  const { title, date, excerpt, tags, author, published, content, coverImage } = body

  const tagsArray = typeof tags === 'string'
    ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : tags ?? []

  const frontmatter = `---
title: "${(title || '').replace(/"/g, '\\"')}"
date: "${date || new Date().toISOString().split('T')[0]}"
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
tags: [${tagsArray.map((t: string) => `"${t}"`).join(', ')}]
author: "${(author || 'CA Your Name').replace(/"/g, '\\"')}"
published: ${published !== false}
${coverImage ? `coverImage: "${coverImage}"` : ''}
---

${content || ''}`

  fs.writeFileSync(filePath, frontmatter.trim(), 'utf-8')
  return NextResponse.json({ slug: params.slug })
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const filePath = path.join(POSTS_DIR, `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}
