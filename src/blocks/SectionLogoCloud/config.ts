import type { Block } from 'payload'

export const SectionLogoCloud: Block = {
  slug: 'homeSectionLogoCloud',
  interfaceName: 'SectionLogoCloudBlock',
  labels: { singular: 'Empresas parceiras', plural: 'Empresas parceiras' },
  imageURL: '/block-previews/logo-cloud.png',
  imageAltText: 'Empresas parceiras',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Clientes',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      localized: true,
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      localized: true,
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
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
