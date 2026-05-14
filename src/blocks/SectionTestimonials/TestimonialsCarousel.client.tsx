'use client'

import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css/core'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

type TestimonialItem = {
  id?: string | null
  quote: string
  author: string
  role?: string | null
  avatarVariant: 'blue' | 'orange'
  surface: 'paper' | 'card'
}

export function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  return (
    <>
      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          arrows: false,
          pagination: true,
          gap: '2rem',
          autoHeight: true,
        }}
        aria-label="Depoimentos"
        className="testimonials-splide"
      >
        {items.map((item) => (
          <SplideSlide key={item.id ?? item.author}>
            <TestimonialCard
              quote={item.quote}
              author={item.author}
              role={item.role ?? undefined}
              avatarVariant={item.avatarVariant}
              surface={item.surface}
            />
          </SplideSlide>
        ))}
      </Splide>

      <style>{`
        .testimonials-splide .splide__pagination {
          position: static;
          margin-top: 1.5rem;
          gap: 0.5rem;
          justify-content: flex-start;
        }
        .testimonials-splide .splide__pagination__page {
          background: var(--color-blue, #0033CC);
          opacity: 0.2;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          transition: opacity 0.2s, width 0.2s;
          margin: 0;
        }
        .testimonials-splide .splide__pagination__page.is-active {
          background: var(--color-orange, #FE9D2B);
          opacity: 1;
          width: 24px;
          transform: none;
        }
      `}</style>
    </>
  )
}
