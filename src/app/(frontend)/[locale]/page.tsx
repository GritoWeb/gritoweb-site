import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale } = await paramsPromise

  const page = await queryHomePage({ locale: locale as 'pt' | 'en', draft })

  if (!page) notFound()

  return (
    <article>
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

const queryHomePage = cache(
  async ({ locale, draft }: { locale: 'pt' | 'en'; draft: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale,
      where: { slug: { equals: 'home' } },
    })

    return result.docs?.[0] ?? null
  },
)
