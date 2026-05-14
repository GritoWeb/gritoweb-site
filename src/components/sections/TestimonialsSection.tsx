import React from 'react'

export function TestimonialsSection({
  leading,
  children,
  className = '',
}: {
  leading: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const root = ['relative px-12 py-24', className].filter(Boolean).join(' ')
  return (
    <section className={root}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="self-start">{leading}</div>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </section>
  )
}
