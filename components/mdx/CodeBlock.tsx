interface Props {
  children?: React.ReactNode
  className?: string
}

export default function CodeBlock({ children, ...props }: Props) {
  return (
    <pre
      className="overflow-x-auto rounded-xl bg-slate-900 dark:bg-slate-800 p-4 text-sm leading-relaxed my-6"
      {...props}
    >
      {children}
    </pre>
  )
}
