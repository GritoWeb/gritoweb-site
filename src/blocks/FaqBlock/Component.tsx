import React from 'react'
import type { FaqBlockBlock } from '@/payload-types'
import { SectionTitle } from '@/components/sections'
import { parseTitle } from '@/utilities/parseTitle'
import { titleMaxWidthClass, type TitleMaxWidth } from '@/utilities/titleMaxWidthClass'
import { FaqAccordion } from './Component.client'

export const FaqBlockComponent: React.FC<FaqBlockBlock> = ({
  eyebrow,
  title,
  titleMaxWidth,
  defaultOpenIndex,
  items,
}) => {
  return (
    <section className="px-5 py-22">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <SectionTitle
            eyebrow={eyebrow ?? undefined}
            align="center"
            titleClassName={titleMaxWidthClass(titleMaxWidth as TitleMaxWidth | null | undefined)}
          >
            {parseTitle(title)}
          </SectionTitle>
        </div>
        <FaqAccordion
          items={(items ?? []).map((item) => ({
            question: item.question,
            answer: item.answer,
          }))}
          defaultOpenIndex={defaultOpenIndex ?? 0}
        />
      </div>
    </section>
  )
}
