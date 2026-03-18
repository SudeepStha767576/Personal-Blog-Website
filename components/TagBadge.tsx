'use client'

import Link from 'next/link'

interface Props {
  tag: string
  href?: string
  active?: boolean
}

export default function TagBadge({ tag, href, active }: Props) {
  const classes = `tag-badge ${active ? 'ring-2 ring-brand-500' : ''}`

  if (href) {
    return (
      <Link href={href} className={classes} onClick={(e) => e.stopPropagation()}>
        {tag}
      </Link>
    )
  }

  return <span className={classes}>{tag}</span>
}
