import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'

export const Portfolios: CollectionConfig<'portfolios'> = {
  slug: 'portfolios',
  labels: { singular: 'Portfolio', plural: 'Portfolios' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    client: true,
    image: true,
    tag: true,
    tagVariant: true,
    accent: true,
    year: true,
    result: true,
    summary: true,
  },
  admin: {
    group: 'Portfolio',
    defaultColumns: ['title', 'client', 'year', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Project title',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      label: 'Company / client name',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      label: 'Summary',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Cover image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tag',
      label: 'Card tag',
      type: 'relationship',
      relationTo: 'portfolio-tags',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tagVariant',
      label: 'Tag color',
      type: 'select',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Orange', value: 'orange' },
      ],
      defaultValue: 'blue',
      admin: { position: 'sidebar' },
    },
    {
      name: 'accent',
      label: 'Card color',
      type: 'select',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Orange', value: 'orange' },
      ],
      defaultValue: 'blue',
      admin: { position: 'sidebar' },
    },
    {
      name: 'year',
      label: 'Year',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'result',
      label: 'Result (e.g.: +38% avg. ticket)',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
