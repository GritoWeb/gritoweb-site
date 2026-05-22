import React from 'react'

type LogoCloudProps = {
  eyebrow?: string | null
  title?: React.ReactNode
  description?: string
  items?: React.ReactNode[]
}

export function LogoCloud({ eyebrow, title, description, items }: LogoCloudProps) {
  return (
    <section className="px-6 md:px-12 py-16 bg-white border-y border-line">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          {eyebrow && <p className="font-eyebrow m-0 mb-3">{eyebrow}</p>}
          {title && <h2 className="m-0 text-blue">{title}</h2>}
          {description && <p className="mt-4 font-body text-mute text-base max-w-xl mx-auto">{description}</p>}
        </div>
        {items && items.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6">
            {items}
          </div>
        )}
      </div>
    </section>
  )
}
