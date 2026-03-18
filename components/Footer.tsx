import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 mt-auto">
      <div className="container-blog py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <p>© {year} CA Insights. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/blog" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Articles
          </Link>
          <Link href="/services" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Services
          </Link>
          <Link href="/about" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
