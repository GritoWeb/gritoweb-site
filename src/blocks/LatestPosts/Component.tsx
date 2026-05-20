import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { LatestPostsBlock, Post, Tag, Media } from '@/payload-types'
import { PostCard, type PostItem } from '@/blocks/BlogListing/BlogListingClient'
import { Button } from '@/components/Button'
import { parseTitle } from '@/utilities/parseTitle'
import { ArrowIcon } from '@/components/ui/ArrowIcon'

export const LatestPostsComponent: React.FC<LatestPostsBlock> = async ({
  eyebrow,
  title,
  buttonLabel,
  buttonHref,
}) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      excerpt: true,
      tags: true,
      publishedAt: true,
      featuredImage: true,
      meta: true,
    },
  })

  const posts: PostItem[] = result.docs.map((post) => {
    const firstTag = Array.isArray(post.tags) && post.tags.length > 0 ? (post.tags[0] as Tag) : null
    const featuredImage = post.featuredImage && typeof post.featuredImage === 'object' ? (post.featuredImage as Media) : null
    const metaImage = post.meta?.image && typeof post.meta.image === 'object' ? (post.meta.image as Media) : null

    return {
      id: String(post.id),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? post.meta?.description ?? null,
      date: post.publishedAt ?? null,
      categoryId: firstTag?.id != null ? String(firstTag.id) : null,
      categoryLabel: firstTag?.title ?? null,
      image: featuredImage ?? metaImage,
    }
  })

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <header className="flex flex-col gap-3">
            {eyebrow && <p className="font-eyebrow m-0">{eyebrow}</p>}
            {title && <h2 className="m-0 text-blue">{parseTitle(title)}</h2>}
          </header>
          {buttonLabel && (
            <Button variant="ghost" href={buttonHref ?? '/posts'} icon={<ArrowIcon size={16} />}>
              {buttonLabel}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
