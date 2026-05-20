import React from 'react'

export type MetaItem = {
  label: string
  value: string
}

export function MetaStrip({ items }: { items: MetaItem[] }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 bg-white border border-line rounded-3xl overflow-hidden">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`px-6 py-6 ${index < items.length - 1 ? 'md:border-r border-line' : ''}`}
        >
          <dt className="font-body font-bold text-xs uppercase tracking-[0.12em] text-orange">
            {item.label}
          </dt>
          <dd className="m-0 mt-1.5 font-display font-bold text-[22px] text-blue">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
