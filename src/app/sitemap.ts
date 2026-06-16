import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://grito-web.suporte-fd8.workers.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  const [pagesResult, postsResult, portfoliosResult] = await Promise.all([
    payload.find({
      collection: 'pages',
      limit: 200,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 500,
      overrideAccess: false,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'portfolios',
      limit: 500,
      overrideAccess: false,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
  ])

  const pages: MetadataRoute.Sitemap = pagesResult.docs.flatMap((page) => {
    const lastModified = new Date(page.updatedAt)
    if (!page.slug || page.slug === 'home') {
      return [
        { url: baseUrl, lastModified, priority: 1.0 },
        { url: `${baseUrl}/en`, lastModified, priority: 0.9 },
      ]
    }
    return [
      { url: `${baseUrl}/${page.slug}`, lastModified, priority: 0.8 },
      { url: `${baseUrl}/en/${page.slug}`, lastModified, priority: 0.7 },
    ]
  })

  const posts: MetadataRoute.Sitemap = postsResult.docs.flatMap((post) => {
    const lastModified = new Date(post.updatedAt)
    return [
      { url: `${baseUrl}/posts/${post.slug}`, lastModified, priority: 0.7 },
      { url: `${baseUrl}/en/posts/${post.slug}`, lastModified, priority: 0.6 },
    ]
  })

  const portfolios: MetadataRoute.Sitemap = portfoliosResult.docs.flatMap((portfolio) => {
    const lastModified = new Date(portfolio.updatedAt)
    return [
      { url: `${baseUrl}/portfolio/${portfolio.slug}`, lastModified, priority: 0.7 },
      { url: `${baseUrl}/en/portfolio/${portfolio.slug}`, lastModified, priority: 0.6 },
    ]
  })

  return [...pages, ...posts, ...portfolios]
}
