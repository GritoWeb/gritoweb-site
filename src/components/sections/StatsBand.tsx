import React from 'react'

type Stat = {
  value: string
  label: string
}

type StatsBandProps = {
  stats: Stat[]
  showDecoration?: boolean
}

export function StatsBand({ stats, showDecoration = true }: StatsBandProps) {
  return (
    <section className="relative bg-blue px-5 section-y overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 text-center md:text-left">
              <span className="font-display font-black text-4xl text-white leading-none">
                {stat.value}
              </span>
              <span className="font-body text-sm text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
