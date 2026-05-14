import type { Block } from 'payload'

export const SectionLogoCloud: Block = {
  slug: 'homeSectionLogoCloud',
  interfaceName: 'SectionLogoCloudBlock',
  labels: { singular: 'Logo Cloud', plural: 'Logo Cloud' },
  imageURL: '/block-previews/logo-cloud.png',
  imageAltText: 'Logo Cloud',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Clientes',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      defaultValue: 'Empresas que *confiam* na gente',
      admin: { description: 'Use *palavra* para laranja.' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'partners',
      label: 'Partners / Clients',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          label: 'Client Name',
          type: 'text',
          required: true,
        },
        {
          name: 'glyph',
          label: 'Icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Circle', value: 'circle' },
            { label: 'Triangle', value: 'triangle' },
            { label: 'Square', value: 'square' },
            { label: 'Diamond', value: 'diamond' },
            { label: 'Arc', value: 'arc' },
            { label: 'Plus (+)', value: 'plus' },
            { label: 'Hexagon', value: 'hexagon' },
            { label: 'Rings', value: 'rings' },
            { label: 'Half-circle', value: 'halfcircle' },
            { label: 'Wave', value: 'wave' },
            { label: 'Chevron', value: 'chevron' },
            { label: 'Bars', value: 'bars' },
          ],
        },
      ],
    },
  ],
}
