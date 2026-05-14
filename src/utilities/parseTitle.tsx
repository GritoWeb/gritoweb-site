import React from 'react'

/**
 * Renders a title string with accent highlighting and line breaks.
 *
 * Syntax:
 *   *word*  → <span class="text-orange">word</span>
 *   \n      → <br />
 */
export function parseTitle(raw?: string | null, nonAccentClass?: string): React.ReactNode {
  if (!raw) return null

  const lines = raw.split('\n')
  const nodes: React.ReactNode[] = []

  lines.forEach((line, li) => {
    line.split('*').forEach((part, pi) => {
      if (!part) return
      if (pi % 2 === 1) {
        nodes.push(
          <span key={`${li}-${pi}`} className="text-orange">
            {part}
          </span>,
        )
      } else if (nonAccentClass) {
        nodes.push(
          <span key={`${li}-${pi}`} className={nonAccentClass}>
            {part}
          </span>,
        )
      } else {
        nodes.push(part)
      }
    })
    if (li < lines.length - 1) nodes.push(<br key={`br-${li}`} />)
  })

  return nodes.length === 1 ? nodes[0] : nodes
}
