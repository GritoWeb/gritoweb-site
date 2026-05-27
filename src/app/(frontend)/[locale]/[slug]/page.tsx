import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await paramsPromise
  const page = await queryPageBySlug({
    slug: decodeURIComponent(slug),
    locale: locale as 'pt' | 'en',
    draft,
  })
  return generateMeta({ doc: page, locale: locale as 'pt' | 'en' })
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageBySlug({ slug: decodedSlug, locale: locale as 'pt' | 'en', draft })

  if (!page) notFound()

  return (
    <article>
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

const queryPageBySlug = cache(
  async ({ slug, locale, draft }: { slug: string; locale: 'pt' | 'en'; draft: boolean }) => {
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
  },
)
