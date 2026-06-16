// @vitest-environment node
// Backend test: must run under Node (jsdom's TextEncoder breaks esbuild, which wrangler's
// getPlatformProxy pulls in via getD1 / payload.config).
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, afterAll, expect } from 'vitest'

import { GET } from '@/app/api/search/route'

// Unique suffix so tokens never collide with seed data or previous runs.
const SUF = `z${Date.now().toString(36)}`
const TITLE_A = `Programacao${SUF}` // stored WITHOUT accent variant below
const TITLE_A_ACCENTED = `Programação${SUF}` // stored WITH ç/ã to test accent-insensitivity
const TITLE_B = `Zephyrium${SUF}`
const CONTENT_ONLY = `Xilofonibus${SUF}` // appears ONLY in the richtext content
const DRAFT_WORD = `Quokkazord${SUF}` // only in a draft post

function lexical(text: string) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
          ],
        },
      ],
    },
  }
}

async function search(q: string, locale = 'pt') {
  const res = await GET(
    new Request(`http://localhost/api/search?q=${encodeURIComponent(q)}&locale=${locale}`),
  )
  return (await res.json()) as { docs: { id: string }[]; totalDocs: number }
}

let payload: Payload
let publishedId: number
let draftId: number

describe('FTS5 post search', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })

    // disableRevalidate: the existing revalidatePost hook calls next/cache revalidatePath,
    // which only works inside a Next request. Our search-index hook runs regardless.
    const published = await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data: {
        title: `${TITLE_A_ACCENTED} ${TITLE_B}`,
        slug: `fts-published-${SUF}`,
        excerpt: 'Resumo do post de teste.',
        content: lexical(`Texto do corpo contendo a palavra ${CONTENT_ONLY} que só existe aqui.`),
        _status: 'published',
      },
    })
    publishedId = published.id

    const draft = await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data: {
        title: `Rascunho ${DRAFT_WORD}`,
        slug: `fts-draft-${SUF}`,
        content: lexical(`Rascunho com a palavra ${DRAFT_WORD}.`),
        _status: 'draft',
      },
    })
    draftId = draft.id
  }, 90_000)

  afterAll(async () => {
    const context = { disableRevalidate: true }
    if (publishedId)
      await payload.delete({ collection: 'posts', id: publishedId, context }).catch(() => {})
    if (draftId) await payload.delete({ collection: 'posts', id: draftId, context }).catch(() => {})
  }, 30_000)

  it('(a) finds a post by two title words in SWAPPED order', async () => {
    const { docs } = await search(`${TITLE_B.toLowerCase()} ${TITLE_A.toLowerCase()}`)
    expect(docs.some((d) => d.id === String(publishedId))).toBe(true)
  })

  it('(b) matches accented stored text with an UN-accented query term', async () => {
    // query "programacaoXXXX" (no diacritics) must match stored "Programação XXXX"
    const { docs } = await search(TITLE_A.toLowerCase())
    expect(docs.some((d) => d.id === String(publishedId))).toBe(true)
  })

  it('(c) finds a post by a word that exists ONLY in the richtext content', async () => {
    const { docs } = await search(CONTENT_ONLY.toLowerCase())
    expect(docs.some((d) => d.id === String(publishedId))).toBe(true)
  })

  it('(d) does NOT return draft posts', async () => {
    const { docs } = await search(DRAFT_WORD.toLowerCase())
    expect(docs.some((d) => d.id === String(draftId))).toBe(false)
  })

  it('returns empty for a query with no usable terms', async () => {
    const { docs } = await search('   ***   ')
    expect(docs).toHaveLength(0)
  })
})
