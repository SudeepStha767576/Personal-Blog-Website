import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our Chartered Accountant — qualifications, services, and how to get in touch.',
}

const expertise = [
  'Income Tax', 'GST', 'Statutory Audit', 'Tax Planning',
  'Company Law', 'ROC Filings', 'Financial Statements', 'MCA Compliance',
  'TDS / TCS', 'Internal Audit', 'FEMA', 'Transfer Pricing',
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  { label: 'ICAI Profile', href: 'https://icai.org' },
  { label: 'Email', href: 'mailto:ca@example.com' },
  { label: 'Phone / WhatsApp', href: 'tel:+91-XXXXXXXXXX' },
]

export default function AboutPage() {
  return (
    <div className="container-blog py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
        About Me
      </h1>

      <div className="prose-blog mb-12">
        <p>
          Hi! I&apos;m <strong>Your Name</strong>, a practising <strong>Chartered Accountant</strong> and
          Fellow Member of ICAI with over <strong>10 years of experience</strong> serving individuals,
          SMEs, and corporates across India.
        </p>
        <p>
          I specialise in <strong>direct and indirect taxation</strong>, statutory audit, and
          corporate compliance. My goal with this blog is to break down complex tax and finance
          topics into plain language so that business owners and individuals can make
          informed decisions — without needing to decode legalese every time.
        </p>
        <p>
          Whether you are a salaried employee filing your first ITR or a business owner
          navigating GST audits, you will find practical, up-to-date guidance here.
        </p>
      </div>

      {/* Expertise */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Areas of Expertise
        </h2>
        <div className="flex flex-wrap gap-2">
          {expertise.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full text-sm font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Get in Touch
        </h2>
        <ul className="space-y-2">
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                {label} →
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Download */}
      <section>
        <a href="/profile.pdf" download className="btn-primary">
          Download Firm Profile (PDF)
        </a>
      </section>
    </div>
  )
}
