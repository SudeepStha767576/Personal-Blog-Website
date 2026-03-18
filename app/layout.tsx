import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import '../styles/globals.css'
import PublicShell from '@/components/PublicShell'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CA Insights',
    template: '%s | CA Insights',
  },
  description: 'Expert insights on Income Tax, GST, Audit, Company Law and Financial Planning by a Chartered Accountant.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourblog.vercel.app'
  ),
  openGraph: {
    siteName: 'CA Insights',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  )
}
