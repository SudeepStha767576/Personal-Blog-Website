import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Professional CA services — Income Tax, GST, Audit, Company Law, and Financial Planning.',
}

const services = [
  {
    icon: '📊',
    title: 'Income Tax',
    items: [
      'ITR Filing — Individuals, Firms, Companies',
      'Advance Tax computation & payment',
      'Tax planning and optimisation',
      'Handling Income Tax notices & assessments',
      'Capital gains planning',
    ],
  },
  {
    icon: '🧾',
    title: 'GST Services',
    items: [
      'GST Registration',
      'Monthly / Quarterly return filing (GSTR-1, 3B)',
      'Annual return (GSTR-9, 9C)',
      'GST audit & reconciliation',
      'GST notice handling',
    ],
  },
  {
    icon: '🔍',
    title: 'Audit & Assurance',
    items: [
      'Statutory Audit under Companies Act',
      'Tax Audit (Section 44AB)',
      'Internal & management audit',
      'Bank audit',
      'Stock audit',
    ],
  },
  {
    icon: '🏢',
    title: 'Company Law & MCA',
    items: [
      'Company / LLP Incorporation',
      'ROC annual filings',
      'Director KYC and changes',
      'Share transfer & allotment',
      'Strike off & winding up',
    ],
  },
  {
    icon: '💼',
    title: 'Financial Planning',
    items: [
      'Business financial projections',
      'CMA data preparation for bank loans',
      'Investment advisory',
      'MIS & management reporting',
      'Business valuation',
    ],
  },
  {
    icon: '📋',
    title: 'Accounting & Payroll',
    items: [
      'Bookkeeping & accounting',
      'Tally / Zoho Books / QuickBooks setup',
      'Monthly MIS preparation',
      'Payroll processing & TDS on salary',
      'PF / ESI compliance',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="container-blog py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
        Services
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg">
        End-to-end CA services for individuals, businesses, and corporates.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow bg-white dark:bg-slate-800/50"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              {s.title}
            </h2>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-brand-500 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-brand-50 dark:bg-slate-800 border border-brand-200 dark:border-slate-700 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          Ready to get started?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Send your query and we&apos;ll respond within 24 hours.
        </p>
        <Link href="/about#contact" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </div>
  )
}
