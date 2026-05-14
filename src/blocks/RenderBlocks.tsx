import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { FaqBlockComponent } from '@/blocks/FaqBlock/Component'
import { SectionTestimonialsComponent } from '@/blocks/SectionTestimonials/Component'

const blockComponents = {
  faqBlock: FaqBlockComponent,
  homeSectionTestimonials: SectionTestimonialsComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]
          if (Block) {
            return (
              <div key={index}>
                <Block {...(block as any)} />
              </div>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}
