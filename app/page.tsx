import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <>
      {/* Premium Hero */}
      <section className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="container-blog py-32 sm:py-48">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-6 tracking-widest uppercase">
              Tax &amp; Accounting Expertise
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mb-8 leading-tight">
              Strategic Financial Guidance
            </h1>
            <p className="text-xl sm:text-2xl text-stone-700 dark:text-stone-300 mb-12 leading-relaxed max-w-3xl font-light">
              Expert counsel on income tax, GST, audits, and compliance. Tailored strategies for your financial success.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/blog" className="btn-primary">
                Explore Articles
              </Link>
              <Link href="/about" className="btn-secondary">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Grid */}
      <section className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/50">
        <div className="container-blog py-32">
          <div className="mb-20">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4 tracking-widest uppercase">
              Our Expertise
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50 mb-4">Specialized Services</h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg">Comprehensive solutions across taxation and compliance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Income Tax',
                icon: '📊',
                desc: 'Strategic tax planning, ITR filing, and optimization for individuals and businesses'
              },
              { 
                title: 'GST',
                icon: '🧾',
                desc: 'Registration, returns management, and compliance solutions'
              },
              { 
                title: 'Audit Services',
                icon: '🔍',
                desc: 'Statutory and internal audits with detailed compliance verification'
              },
              { 
                title: 'Company Law',
                icon: '⚖️',
                desc: 'ROC compliance, regulatory guidance, and corporate advisory'
              },
            ].map((service) => (
              <div key={service.title} className="card p-8 hover:border-emerald-300 dark:hover:border-emerald-700">
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="font-bold text-stone-900 dark:text-stone-50 mb-3 text-lg">{service.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Articles Section */}
      <section className="container-blog py-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16">
          <div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4 tracking-widest uppercase">
              Insights &amp; Resources
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-50">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors uppercase tracking-wide"
          >
            View all →
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500 dark:text-stone-400 text-lg">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-12 mb-12">
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

      {/* Premium CTA */}
      <section className="border-t border-stone-200 dark:border-stone-800 bg-gradient-to-br from-emerald-50 via-white to-stone-50 dark:from-emerald-950/30 dark:via-stone-900 dark:to-stone-900">
        <div className="container-blog py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-6xl font-bold text-stone-900 dark:text-stone-50 mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-lg sm:text-xl text-stone-700 dark:text-stone-300 mb-12 leading-relaxed">
              Let's discuss your specific financial challenges and develop a tailored strategy for your success.
            </p>
            <Link href="/about" className="btn-primary">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
