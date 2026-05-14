import React from 'react'

export function SectionTitle({
  eyebrow,
  description,
  align = 'center',
  className = '',
  children,
}: {
  eyebrow?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  children: React.ReactNode
}) {
  const alignClasses: Record<string, string> = {
    left: '',
    center: 'text-center items-center mx-auto',
  }
  const root = ['flex flex-col gap-3 max-w-3xl', alignClasses[align], className]
    .filter(Boolean)
    .join(' ')
  return (
    <header className={root}>
      {eyebrow && <p className="font-eyebrow m-0">{eyebrow}</p>}
      <h2 className="m-0 text-blue">{children}</h2>
      {description && (
        <p className="body-text text-mute m-0 mt-2 max-w-prose">{description}</p>
      )}
    </header>
  )
}
