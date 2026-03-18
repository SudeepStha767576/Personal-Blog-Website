import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A selection of things I have built.',
}

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  status: 'active' | 'archived' | 'wip'
}

const projects: Project[] = [
  {
    title: 'Personal Blog',
    description:
      'This very blog — built with Next.js 14, MDX, Tailwind CSS, and deployed on Vercel. Fully static, zero runtime cost.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    github: 'https://github.com/yourusername/personal-blog',
    live: 'https://yourblog.vercel.app',
    status: 'active',
  },
  {
    title: 'Project Two',
    description: 'Short description of what this project does and the problem it solves.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/yourusername/project-two',
    status: 'active',
  },
  {
    title: 'Project Three',
    description: 'Another cool project. Replace this with your real work.',
    tags: ['Python', 'FastAPI', 'Docker'],
    github: 'https://github.com/yourusername/project-three',
    status: 'archived',
  },
]

const statusLabel: Record<Project['status'], string> = {
  active: 'Active',
  wip: 'In Progress',
  archived: 'Archived',
}

const statusColor: Record<Project['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  wip: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  archived: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
}

export default function ProjectsPage() {
  return (
    <div className="container-blog py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
        Projects
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">
        A selection of things I&apos;ve built or am currently building.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div key={project.title} className="card p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {project.title}
              </h2>
              <span
                className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusColor[project.status]}`}
              >
                {statusLabel[project.status]}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs px-3 py-1.5"
                >
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-3 py-1.5"
                >
                  Live site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
