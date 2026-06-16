'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Wrapper that plays the slide-up fade-in animation only once the element
 * has scrolled into the viewport. Starts invisible so there's no flash before
 * the observer fires.
 */
export function AnimatedCard({
  children,
  delay = 0,
  className = 'h-full',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} motion-reduce:animate-none ${
        visible
          ? 'animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both'
          : 'opacity-0'
      }`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
