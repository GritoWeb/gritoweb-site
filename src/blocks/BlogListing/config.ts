import type { Block } from 'payload'

export const BlogListing: Block = {
  slug: 'blogListing',
  interfaceName: 'BlogListingBlock',
  labels: { singular: 'Listagem de Posts', plural: 'Listagens de Posts' },
  fields: [
    {
      name: 'featuredPost',
      label: 'Featured post',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        description: 'Appears as a banner above the listing. Leave empty to hide.',
      },
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      defaultValue: 'Arquivo',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      defaultValue: '*Últimos posts*',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'postsPerPage',
      label: 'Posts per page',
      type: 'number',
      defaultValue: 9,
      min: 3,
      max: 30,
    },
    {
      name: 'showSearch',
      label: 'Show search',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showFilters',
      label: 'Show filters by category',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
