'use client'

import { useEffect, type ReactNode } from 'react'

/**
 * Watches the admin DOM for top-level `layout` block rows being expanded and
 * tells the Live Preview iframe to scroll to the matching block.
 *
 * Identification trick: every block row contains a hidden input
 * `layout.N.id` carrying the block's UUID. When a collapsible is expanded we
 * find the input whose name has exactly one segment after `layout.N.` — that
 * proves the row is a top-level layout block (not a nested array row inside a
 * block), and N is its index. We then read `layout.N.id`'s value and post it.
 */
export default function LivePreviewScrollSync({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== 'attributes' || m.attributeName !== 'class') continue
        const target = m.target as HTMLElement
        if (!target.classList?.contains('collapsible')) continue
        if (target.classList.contains('collapsible--collapsed')) continue

        const oldClass = m.oldValue ?? ''
        if (!oldClass.includes('collapsible--collapsed')) continue

        const index = findTopLevelLayoutIndex(target)
        if (index === null) continue

        const blockId = readBlockId(index)
        if (!blockId) continue

        postScrollMessage(blockId)
      }
    })

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    })

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}

function findTopLevelLayoutIndex(collapsible: HTMLElement): number | null {
  const named = collapsible.querySelectorAll<HTMLElement>('[name^="layout."]')
  let best: number | null = null
  let bestDepth = Infinity
  for (const el of named) {
    const name = el.getAttribute('name')
    if (!name) continue
    const match = name.match(/^layout\.(\d+)\.(.+)$/)
    if (!match) continue
    const depth = match[2].split('.').length
    if (depth < bestDepth) {
      bestDepth = depth
      best = parseInt(match[1], 10)
    }
  }
  return bestDepth === 1 ? best : null
}

function readBlockId(index: number): string | null {
  const input = document.querySelector<HTMLInputElement>(`input[name="layout.${index}.id"]`)
  return input?.value || null
}

function postScrollMessage(blockId: string) {
  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe')
  for (const iframe of iframes) {
    iframe.contentWindow?.postMessage({ type: 'payload-scroll-to-block', blockId }, '*')
  }
}
