import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlockBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  imageURL: '/images/blocks/FAQ.png',
  imageAltText: 'FAQ',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Perguntas *frequentes*',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'defaultOpenIndex',
      label: 'Default open index (0-based, -1 to close all)',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'items',
      label: 'Questions and answers',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
