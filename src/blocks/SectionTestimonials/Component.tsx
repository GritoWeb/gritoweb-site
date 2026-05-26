import React from 'react'
import type { SectionTestimonialsBlock } from '@/payload-types'
import { SectionTitle } from '@/components/sections/SectionTitle'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { parseTitle } from '@/utilities/parseTitle'
import { titleMaxWidthClass, type TitleMaxWidth } from '@/utilities/titleMaxWidthClass'
import { TestimonialsCarousel } from './TestimonialsCarousel.client'

export const SectionTestimonialsComponent: React.FC<SectionTestimonialsBlock> = ({
  eyebrow,
  title,
  titleMaxWidth,
  description,
  ratingValue,
  reviewCount,
  testimonials,
}) => {
  return (
    <TestimonialsSection
      leading={
        <>
          <SectionTitle
            eyebrow={eyebrow}
            align="left"
            description={description ?? undefined}
            titleClassName={titleMaxWidthClass(titleMaxWidth as TitleMaxWidth | null | undefined)}
          >
            {parseTitle(title)}
          </SectionTitle>
          <div className="mt-6 flex lg:flex-row flex-col items-baseline lg:items-center gap-2">
            <div className='flex items-center'>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((index) => (
                  <svg
                    key={index}
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="#FE9D2B"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
                  </svg>
                ))}
              </div>
              <span className="font-display font-bold text-blue ml-1">{ratingValue}</span>
            </div>
            <span className="text-mute text-sm">· {reviewCount}</span>
          </div>
        </>
      }
    >
      <TestimonialsCarousel
        items={(testimonials ?? []).map((t) => ({
          id: t.id,
          quote: t.quote,
          author: t.author,
          role: t.role,
          avatarVariant: t.avatarVariant as 'blue' | 'orange',
          surface: t.surface as 'paper' | 'card',
        }))}
      />
    </TestimonialsSection>
  )
}
