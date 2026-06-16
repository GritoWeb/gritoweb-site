import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { buildAsyncBlocks } from '@/blocks/buildAsyncBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { PageContent } from '@/components/PageContent'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

const locale = 'pt' as const

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({ slug: decodedSlug, draft })
  return generateMeta({ doc: page, locale, path: `/${decodedSlug}` })
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageBySlug({ slug: decodedSlug, draft })

  if (!page) notFound()

  if (draft) {
    const asyncBlocks = buildAsyncBlocks(page.layout)
    return (
      <article>
        <PageContent initialPage={page as Page} asyncBlocks={asyncBlocks} />
      </article>
    )
  }

  return (
    <article>
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

const queryPageBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    locale,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] ?? null
})
