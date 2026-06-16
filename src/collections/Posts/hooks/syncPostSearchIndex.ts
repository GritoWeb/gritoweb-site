import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post } from '../../../payload-types'
import { getD1 } from '../../../lib/d1'
import { deletePostFromSearchIndex, reindexPostById } from '../../../lib/postsSearchIndex'

/**
 * Keep the `posts_fts` full-text index in sync with the posts collection.
 *
 * Only PUBLISHED content is indexed (drafts are never searchable). On every change we
 * re-derive the index from the canonical published document (idempotent), but we only do
 * the work when the published state could actually have changed — i.e. the current or the
 * previous document was published. This skips the autosave-draft churn (draft → draft) that
 * Payload fires every ~100ms while editing.
 *
 * Index sync is best-effort: a failure here is logged but never blocks saving a post.
 */
export const syncPostSearchIndex: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { payload } = req

  const becamePublished = doc?._status === 'published'
  const wasPublished = previousDoc?._status === 'published'
  if (!doc?.id || (!becamePublished && !wasPublished)) return doc

  try {
    const d1 = await getD1()
    await reindexPostById(d1, payload, doc.id, req)
  } catch (err) {
    payload.logger.error(`[posts_fts] failed to sync search index for post ${doc.id}: ${err}`)
  }

  return doc
}

export const removePostFromSearchIndex: CollectionAfterDeleteHook<Post> = async ({ doc, req }) => {
  const { payload } = req
  if (!doc?.id) return doc

  try {
    const d1 = await getD1()
    await deletePostFromSearchIndex(d1, doc.id)
  } catch (err) {
    payload.logger.error(`[posts_fts] failed to remove post ${doc.id} from search index: ${err}`)
  }

  return doc
}
