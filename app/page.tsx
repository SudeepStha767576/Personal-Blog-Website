import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-br from-brand-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="container-blog py-20 sm:py-28">
          <p className="text-brand-600 dark:text-brand-400 font-medium mb-4">
            Chartered Accountant · Tax &amp; Finance Expert
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            CA Insights
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Practical guidance on Income Tax, GST, Audit, Company Law, and
            Financial Planning — written in plain language so you can make
            confident decisions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog" className="btn-primary">
              Read Articles
            </Link>
            <Link href="/about" className="btn-secondary">
              About the CA
            </Link>
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-slate-200 dark:border-slate-700">
        <div className="container-blog py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: '📊', title: 'Income Tax', desc: 'ITR filing & planning' },
            { icon: '🧾', title: 'GST', desc: 'Registration & returns' },
            { icon: '🔍', title: 'Audit', desc: 'Statutory & internal' },
            { icon: '🏢', title: 'Company Law', desc: 'ROC & compliance' },
          ].map((s) => (
            <div key={s.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{s.icon}</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{s.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container-blog py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Recent Articles
          </h2>
          <Link
            href="/blog"
            className="text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-slate-500">No articles yet — check back soon!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="border-t border-slate-200 dark:border-slate-700 bg-brand-50 dark:bg-slate-800/50">
        <div className="container-blog py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Need professional advice?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Book a consultation or send a query — response within 24 hours.
          </p>
          <Link href="/about#contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
