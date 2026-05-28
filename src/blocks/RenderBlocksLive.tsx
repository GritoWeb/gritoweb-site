'use client'

import React, { Fragment, type ReactNode } from 'react'

import type { Page } from '@/payload-types'

import { FaqBlockComponent } from '@/blocks/FaqBlock/Component'
import { SectionAboutComponent } from '@/blocks/SectionAbout/Component'
import { SectionLogoCloudComponent } from '@/blocks/SectionLogoCloud/Component'
import { SectionProcessComponent } from '@/blocks/SectionProcess/Component'
import { SectionProjectsComponent } from '@/blocks/SectionProjects/Component'
import { SectionServicesComponent } from '@/blocks/SectionServices/Component'
import { SectionStatsComponent } from '@/blocks/SectionStats/Component'
import { SectionTestimonialsComponent } from '@/blocks/SectionTestimonials/Component'
import { SectionCtaComponent } from '@/blocks/SectionCta/Component'
import { ContactSectionComponent } from '@/blocks/ContactSection/Component'
import { SectionContactComponent } from '@/blocks/SectionContact/Component'
import { ChecklistGridComponent } from '@/blocks/ChecklistGrid/Component'
import { PullQuoteComponent } from '@/blocks/PullQuote/Component'

// Async blocks (blogListing, portfolioListing, latestPosts, latestPortfolios)
// are server-only — they're pre-rendered on the server and passed in via the
// `asyncBlocks` prop instead of being imported here.
const syncBlockComponents = {
  faqBlock: FaqBlockComponent,
  homeSectionAbout: SectionAboutComponent,
  homeSectionLogoCloud: SectionLogoCloudComponent,
  homeSectionProcess: SectionProcessComponent,
  homeSectionProjects: SectionProjectsComponent,
  homeSectionServices: SectionServicesComponent,
  homeSectionStats: SectionStatsComponent,
  homeSectionTestimonials: SectionTestimonialsComponent,
  homeSectionCta: SectionCtaComponent,
  contactSection: ContactSectionComponent,
  homeSectionContact: SectionContactComponent,
  checklistGrid: ChecklistGridComponent,
  pullQuote: PullQuoteComponent,
}

type LayoutBlock = NonNullable<Page['layout']>[number]

const getBlockKey = (block: LayoutBlock, index: number) =>
  block.id ?? `${block.blockType}-${index}`

export function RenderBlocksLive({
  blocks,
  asyncBlocks,
}: {
  blocks: Page['layout']
  asyncBlocks: Record<string, ReactNode>
}) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const key = getBlockKey(block, index)
        const preRendered = asyncBlocks[key]
        if (preRendered) return <Fragment key={key}>{preRendered}</Fragment>

        const Block = syncBlockComponents[block.blockType as keyof typeof syncBlockComponents]
        if (!Block) return null
        return (
          <div key={key}>
            <Block {...(block as any)} />
          </div>
        )
      })}
    </>
  )
}
