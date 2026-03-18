import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container-blog py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4 tracking-wide uppercase">
              Chartered Accountant
            </p>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 leading-tight">
              Financial Clarity, Practical Advice
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Expert guidance on Income Tax, GST, Audit, and Company Law. Simplified tax strategies and compliance solutions written for clarity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/blog" className="btn-primary">
                Read Articles
              </Link>
              <Link href="/about" className="btn-secondary">
                Get Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
        <div className="container-blog py-20">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-3">Core Services</h2>
            <p className="text-slate-600 dark:text-slate-400">Specialized expertise across key areas of taxation and compliance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Income Tax', 
                desc: 'ITR filing, tax planning, and optimization strategies for individuals and businesses'
              },
              { 
                title: 'GST', 
                desc: 'Registration, returns filing, and compliance management'
              },
              { 
                title: 'Audit', 
                desc: 'Statutory audits, internal audits, and compliance verification'
              },
              { 
                title: 'Company Law', 
                desc: 'ROC compliance, statutory requirements, and regulatory guidance'
              },
            ].map((service) => (
              <div key={service.title} className="card p-6">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 mb-3 text-lg">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container-blog py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Latest Articles
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Stay updated with expert insights and actionable advice</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No articles published yet. Check back soon!</p>
        ) : (
          <>
            <div className="grid gap-8 mb-8">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
            <Link
              href="/blog"
              className="sm:hidden btn-secondary w-full text-center"
            >
              View All Articles
            </Link>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
        <div className="container-blog py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Need Expert Guidance?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Book a consultation or discuss your tax and compliance concerns with a professional.
          </p>
          <Link href="/about" className="btn-primary">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
