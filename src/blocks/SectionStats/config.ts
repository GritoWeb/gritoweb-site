import type { Block } from 'payload'

export const SectionStats: Block = {
  slug: 'homeSectionStats',
  interfaceName: 'SectionStatsBlock',
  labels: { singular: 'Stats Strip', plural: 'Stats Strip' },
  imageURL: '/block-previews/stats.png',
  imageAltText: 'Stats Strip',
  fields: [
    {
      name: 'showDecoration',
      label: 'Show decorations (blob and dots)',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'stats',
      label: 'Statistics',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'value',
          label: 'Value (e.g.: +120)',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label (e.g.: Projects delivered)',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
