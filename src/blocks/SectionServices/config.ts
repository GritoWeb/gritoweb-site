import type { Block } from 'payload'

export const SectionServices: Block = {
  slug: 'homeSectionServices',
  interfaceName: 'SectionServicesBlock',
  labels: { singular: 'Services Section', plural: 'Services Section' },
  imageURL: '/block-previews/servicos.png',
  imageAltText: 'Services Section',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Serviços',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      localized: true,
      defaultValue: 'Soluções *inteligentes*\npara o seu negócio',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'description',
      label: 'Sidebar description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'services',
      label: 'Services',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          label: 'Service name',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'variant',
          label: 'Card color',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
          defaultValue: 'blue',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'iconType',
          label: 'Icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Globe (WordPress)', value: 'globe' },
            { label: 'Cart (E-Commerce)', value: 'cart' },
            { label: 'Landing Page', value: 'landing' },
            { label: 'Screen (UX/UI)', value: 'screen' },
            { label: 'Branding', value: 'brand' },
            { label: 'Code (Digital)', value: 'code' },
          ],
        },
        {
          name: 'bullets',
          label: 'Benefits list (optional)',
          type: 'array',
          admin: {
            initCollapsed: true,
            description: '✓ items that appear below the description.',
          },
          fields: [
            {
              name: 'text',
              label: 'Item text',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'ctaLabel',
          label: 'CTA text',
          type: 'text',
          localized: true,
          defaultValue: 'Conheça',
        },
        {
          name: 'ctaHref',
          label: 'CTA link',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}
