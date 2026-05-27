'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Next.js Image that fades in when it scrolls into the viewport.
 *
 * The initial `opacity: 0` is set via the `.fade-in-img` class (rendered on the
 * server, so there's no flash), and an IntersectionObserver adds `.is-visible`
 * once — the moment the image enters the screen. Users with
 * `prefers-reduced-motion` never get the hidden state (handled in CSS), and
 * environments without IntersectionObserver reveal the image immediately.
 */
export function FadeInImage({ className, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const merged = ['fade-in-img', className].filter(Boolean).join(' ')

  return <Image ref={ref} className={merged} {...props} />
}
