import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto bg-white dark:bg-slate-900">
      <div className="container-blog py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-2">CA Insights</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Expert guidance on taxation, compliance, and financial planning.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-50 text-sm mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-50 text-sm mb-4">Connect</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Get in touch for consultations and advice.</p>
            <Link href="/about#contact" className="inline-flex text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© {year} CA Insights. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/blog" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                Articles
              </Link>
              <Link href="/about" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
