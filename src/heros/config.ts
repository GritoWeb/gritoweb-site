import type { Field } from 'payload'

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
      label: 'Eyebrow (opcional)',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'heroTitle',
      label: 'Título',
      type: 'text',
      localized: true,
      required: false,
      defaultValue: 'Sites que *gritam*,\nnegócios que *escalam*.',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
        description: 'Use *palavra* para laranja. Use \\n para quebra de linha.',
      },
    },
    {
      name: 'heroDescription',
      label: 'Descrição',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta1Label',
      label: 'Botão 1 — texto',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta1Href',
      label: 'Botão 1 — link',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta2Label',
      label: 'Botão 2 — texto',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'cta2Href',
      label: 'Botão 2 — link',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
    {
      name: 'heroImage',
      label: 'Imagem',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'defaultHero',
      },
    },
  ],
}
