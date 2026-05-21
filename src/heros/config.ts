import type { Field } from 'payload'

import { titleMaxWidth } from '../fields/titleMaxWidth'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'defaultHero',
      label: 'Type',
      required: true,
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Default Hero',
          value: 'defaultHero',
        },
      ],
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow (optional)',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'heroTitle',
      label: 'Title',
      type: 'text',
      localized: true,
      required: false,
      defaultValue: 'Sites que *gritam*,\nnegócios que *escalam*.',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
        description: 'Use *word* for orange. Use \\n for line break.',
      },
    },
    {
      ...titleMaxWidth,
      admin: {
        ...(titleMaxWidth.admin ?? {}),
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'heroDescription',
      label: 'Description',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta1Label',
      label: 'Button 1 — text',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta1Href',
      label: 'Button 1 — link',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta2Label',
      label: 'Button 2 — text',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta2Href',
      label: 'Button 2 — link',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'heroImage',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
  ],
}
