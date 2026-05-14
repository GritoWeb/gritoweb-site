import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating post at path: /posts/${doc.slug}`)
      revalidatePath(`/posts/${doc.slug}`)
      revalidateTag('posts-sitemap')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old post at path: /posts/${previousDoc.slug}`)
      revalidatePath(`/posts/${previousDoc.slug}`)
      revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/posts/${doc?.slug}`)
    revalidateTag('posts-sitemap')
  }
  return doc
}
