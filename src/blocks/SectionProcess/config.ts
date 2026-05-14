import type { Block } from 'payload'

export const SectionProcess: Block = {
  slug: 'homeSectionProcess',
  interfaceName: 'SectionProcessBlock',
  labels: { singular: 'Process Section', plural: 'Process Section' },
  imageURL: '/block-previews/processo.png',
  imageAltText: 'Process Section',
  fields: [
    {
      name: 'background',
      label: 'Background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Escuro (padrão)', value: 'dark' },
        { label: 'Branco', value: 'white' },
      ],
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Como trabalhamos',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      defaultValue: 'Um *processo claro*, do briefing ao go-live',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'highlightIndex',
      label: 'Highlighted step index (0-based)',
      type: 'number',
      defaultValue: 2,
      admin: {
        description: 'The step number that will be highlighted in orange (0 = first).',
      },
    },
    {
      name: 'steps',
      label: 'Process steps',
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
        },
      ],
    },
  ],
}
