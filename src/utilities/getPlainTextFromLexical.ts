import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Flattens a Lexical richtext value (the `content` field of a post, stored as JSON)
 * into a single plain-text string suitable for full-text indexing.
 *
 * Uses Payload's official `convertLexicalToPlaintext` converter (default heuristic:
 * concatenates every node that has a `text` property, recursing into `children`), then
 * normalizes whitespace. Returns '' for null/empty/malformed input so callers never throw.
 */
export function getPlainTextFromLexical(content: unknown): string {
  if (!content || typeof content !== 'object') return ''

  const data = content as SerializedEditorState
  if (!data.root || typeof data.root !== 'object') return ''

  try {
    const text = convertLexicalToPlaintext({ data })
    // Collapse runs of whitespace/newlines the converter inserts between nodes.
    return text.replace(/\s+/g, ' ').trim()
  } catch {
    return ''
  }
}
