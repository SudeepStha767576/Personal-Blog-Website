type CalloutType = 'info' | 'warning' | 'success' | 'error'

interface Props {
  type?: CalloutType
  children: React.ReactNode
}

const styles: Record<CalloutType, string> = {
  info: 'bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-200',
  warning: 'bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-900/20 dark:border-amber-500 dark:text-amber-200',
  success: 'bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-500 dark:text-emerald-200',
  error: 'bg-red-50 border-red-400 text-red-900 dark:bg-red-900/20 dark:border-red-500 dark:text-red-200',
}

const icons: Record<CalloutType, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  success: '✅',
  error: '❌',
}

export default function Callout({ type = 'info', children }: Props) {
  return (
    <div className={`my-6 flex gap-3 rounded-xl border-l-4 p-4 ${styles[type]}`}>
      <span className="text-lg shrink-0">{icons[type]}</span>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
