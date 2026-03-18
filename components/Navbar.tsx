'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/blog', label: 'Articles' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur">
      <div className="container-blog flex items-center justify-between py-5">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl text-stone-900 dark:text-stone-50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors tracking-tight"
        >
          CA Insights
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-12">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors uppercase tracking-wide ${
                pathname.startsWith(href)
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-stone-700 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-stone-200 dark:border-stone-800 py-3 bg-stone-50 dark:bg-stone-800/50">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-sm font-semibold transition-colors uppercase tracking-wide ${
                pathname.startsWith(href)
                  ? 'text-emerald-600 dark:text-emerald-400 bg-stone-100 dark:bg-stone-700'
                  : 'text-stone-700 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
