import { MDXRemote } from 'next-mdx-remote/rsc'
import Callout from './Callout'
import CodeBlock from './CodeBlock'

const components = {
  pre: CodeBlock,
  Callout,
}

interface Props {
  source: string
}

export default function MDXContent({ source }: Props) {
  return <MDXRemote source={source} components={components} />
}
