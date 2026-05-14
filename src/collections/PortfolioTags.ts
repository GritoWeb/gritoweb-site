import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const PortfolioTags: CollectionConfig = {
  slug: 'portfolio-tags',
  labels: { singular: 'Portfolio Tag', plural: 'Portfolio Tags' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Portfolio',
    defaultColumns: ['title', 'slug'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    slugField(),
  ],
}
