import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 mt-auto bg-white dark:bg-stone-900">
      <div className="container-blog py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-50 mb-3">CA Insights</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">Strategic tax and accounting expertise for individuals and businesses. Simplifying compliance since day one.</p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-50 text-sm mb-5 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  Blog Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-50 text-sm mb-5 uppercase tracking-widest">Get in Touch</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">Need professional consultation or have questions?</p>
            <Link href="/about" className="inline-flex text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors uppercase tracking-wide">
              Schedule a Call →
            </Link>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500 dark:text-stone-400 tracking-wide">
            <p>© {year} CA Insights. All rights reserved.</p>
            <div className="flex gap-8 text-xs">
              <Link href="/blog" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-medium">
                Articles
              </Link>
              <Link href="/about" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
