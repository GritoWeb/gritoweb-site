import React from 'react'
import Image from 'next/image'
import type { SectionAboutBlock } from '@/payload-types'
import type { Media } from '@/payload-types'
import { AboutSplit, AboutFeatures } from '@/components/sections'
import { Button } from '@/home/primitives'
import { parseTitle } from '@/utilities/parseTitle'

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

export const SectionAboutComponent: React.FC<SectionAboutBlock> = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  features,
  image,
}) => {
  const media = image as Media

  return (
    <AboutSplit
      media={
        media && typeof media !== 'string' ? (
          <Image
            src={media.url!}
            alt={media.alt || ''}
            width={media.width ?? 520}
            height={media.height ?? 520}
            className="w-full max-w-[520px] h-auto"
          />
        ) : null
      }
    >
      <p className="font-eyebrow m-0 mb-2">{eyebrow}</p>
      <h2 className="m-0 text-blue">
        {parseTitle(title)}
      </h2>
      <p className="body-text mt-4 text-ink-soft">{description}</p>
      <AboutFeatures
        items={(features ?? []).map((f) => ({ title: f.title, description: f.description }))}
        className="mt-7"
      />
      <div className="mt-8">
        <Button variant="blue" href={ctaHref} icon={<ArrowRight />}>
          {ctaLabel}
        </Button>
      </div>
    </AboutSplit>
  )
}
