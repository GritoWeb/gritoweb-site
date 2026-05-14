import type { Block } from 'payload'

export const SectionTestimonials: Block = {
  slug: 'homeSectionTestimonials',
  dbName: 'hst',
  interfaceName: 'SectionTestimonialsBlock',
  labels: { singular: 'Testimonials Section', plural: 'Testimonials Section' },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Depoimentos',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      defaultValue: 'Quem trabalhou com a gente *volta*',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'ratingValue',
      label: 'Rating (e.g.: 4.9 / 5.0)',
      type: 'text',
      required: true,
      defaultValue: '4,9 / 5,0',
    },
    {
      name: 'reviewCount',
      label: 'Review count text (e.g.: 47 reviews on Google)',
      type: 'text',
      required: true,
      defaultValue: '47 avaliações no Google',
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'quote',
          label: 'Testimonial',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          label: 'Author name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          label: 'Role and company',
          type: 'text',
        },
        {
          name: 'avatarVariant',
          label: 'Avatar color',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
          defaultValue: 'blue',
        },
        {
          name: 'surface',
          label: 'Card background',
          type: 'select',
          required: true,
          options: [
            { label: 'White (paper)', value: 'paper' },
            { label: 'Card (card)', value: 'card' },
          ],
          defaultValue: 'paper',
        },
      ],
    },
  ],
}
