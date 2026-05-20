import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode, headers as getHeaders } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const headersList = await getHeaders()
  const locale = (headersList.get('x-locale') ?? 'pt') as 'pt' | 'en'

  const page = await queryPageBySlug({ slug: decodedSlug, locale, draft })

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
