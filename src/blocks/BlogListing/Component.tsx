import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BlogListingBlock, Post, Tag, Media } from '@/payload-types'
import { BlogListingClient, type PostItem, type FilterOption, type FeaturedPostItem } from './BlogListingClient'

type PartialPost = Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'tags' | 'publishedAt' | 'featuredImage' | 'meta'>

function normalizePost(post: PartialPost): PostItem {
  const firstTag =
    Array.isArray(post.tags) && post.tags.length > 0 ? (post.tags[0] as Tag) : null

  const featuredImage =
    post.featuredImage && typeof post.featuredImage === 'object'
      ? (post.featuredImage as Media)
      : null

  const metaImage =
    post.meta?.image && typeof post.meta.image === 'object'
      ? (post.meta.image as Media)
      : null

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
}

export const BlogListingComponent: React.FC<BlogListingBlock> = async ({
  featuredPost,
  eyebrow,
  title,
  postsPerPage,
  showSearch,
  showFilters,
}) => {
  const payload = await getPayload({ config: configPromise })

  const featuredPostId =
    featuredPost && typeof featuredPost === 'object'
      ? (featuredPost as Post).id
      : (featuredPost as number | null)

  const [postsResult, tagsResult, featuredDoc] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 200,
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
    }),
    payload.find({
      collection: 'tags',
      depth: 0,
      limit: 100,
      overrideAccess: false,
    }),
    featuredPostId
      ? payload.findByID({
          collection: 'posts',
          id: featuredPostId,
          depth: 1,
          overrideAccess: false,
        })
      : Promise.resolve(null),
  ])

  const posts: PostItem[] = postsResult.docs.map((doc) => normalizePost(doc as PartialPost))

  const filters: FilterOption[] = tagsResult.docs.map((tag) => ({
    label: tag.title,
    value: String(tag.id),
  }))

  let featured: FeaturedPostItem | null = null
  if (featuredDoc) {
    const base = normalizePost(featuredDoc)
    featured = {
      ...base,
      excerpt: featuredDoc.excerpt ?? featuredDoc.meta?.description ?? null,
    }
  }

  return (
    <BlogListingClient
      posts={posts}
      filters={filters}
      featuredPost={featured}
      eyebrow={eyebrow}
      title={title}
      postsPerPage={postsPerPage ?? 9}
      showSearch={showSearch ?? true}
      showFilters={showFilters ?? true}
    />
  )
}
