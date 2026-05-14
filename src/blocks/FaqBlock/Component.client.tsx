'use client'

import React, { useState } from 'react'

function AccordionItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left py-6 flex items-start justify-between gap-6 bg-transparent border-0 cursor-pointer font-display text-lg font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
      >
        <span className="flex-1">{question}</span>
        <span
          aria-hidden="true"
          className={[
            'shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full',
            'transition-[background-color,color] duration-200 motion-reduce:transition-none',
            open ? 'bg-orange text-white' : 'bg-blue/8 text-blue',
          ].join(' ')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={[
              'transition-transform duration-300 motion-reduce:transition-none',
              open ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div
        className={[
          'grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <div className="pb-7 pr-10">
            <p className="m-0 text-base text-ink-soft leading-relaxed max-w-3xl">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion({
  items,
  defaultOpenIndex = 0,
}: {
  items: { question: string; answer: string }[]
  defaultOpenIndex?: number
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  )
}
