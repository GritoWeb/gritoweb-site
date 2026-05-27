import type { Metadata } from 'next'

import type { Media, Page, Post, Portfolio } from '@/payload-types'

const getBaseURL = () =>
  process.env.NEXT_PUBLIC_BASE_URL || 'https://grito-web.suporte-fd8.workers.dev'

type DocWithMeta = Partial<Page> | Partial<Post> | Partial<Portfolio> | null | undefined

/**
 * Builds Next.js `Metadata` from a document's SEO `meta` group (populated by
 * `@payloadcms/plugin-seo`), falling back to the document title when empty.
 */
export const generateMeta = ({
  doc,
  locale,
}: {
  doc: DocWithMeta
  locale?: 'pt' | 'en'
}): Metadata => {
  const meta = doc?.meta
  const title = meta?.title || (doc?.title ? `${doc.title} | Grito` : 'Grito')
  const description = meta?.description || undefined

  const ogImage =
    meta?.image && typeof meta.image === 'object' ? (meta.image as Media).url : undefined

  return {
    metadataBase: new URL(getBaseURL()),
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}
