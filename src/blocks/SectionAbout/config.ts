import type { Block } from 'payload'

export const SectionAbout: Block = {
  slug: 'homeSectionAbout',
  interfaceName: 'SectionAboutBlock',
  labels: { singular: 'About Us Section', plural: 'About Us Section' },
  imageURL: '/block-previews/sobre-nos.png',
  imageAltText: 'About Us Section',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Sobre nós',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      defaultValue: 'Um estúdio *pequeno* com\nentregas *de gente grande*.',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'description',
      label: 'Body text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ctaLabel',
      label: 'Button — text',
      type: 'text',
      required: true,
      defaultValue: 'Conheça o time',
    },
    {
      name: 'ctaHref',
      label: 'Button — link',
      type: 'text',
      required: true,
      defaultValue: '#',
    },
    {
      name: 'features',
      label: 'Differentials',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
