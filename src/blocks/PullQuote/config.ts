import type { Block } from 'payload'

export const PullQuote: Block = {
  slug: 'pullQuote',
  interfaceName: 'PullQuoteBlock',
  labels: { singular: 'Pull Quote', plural: 'Pull Quotes' },
  imageURL: '/images/blocks/pullQuote.png',
  imageAltText: 'Pull Quote',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      label: 'Author name',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Role / Company',
      type: 'text',
    },
  ],
}
