import type { Block } from 'payload'

export const PortfolioListing: Block = {
  slug: 'portfolioListing',
  interfaceName: 'PortfolioListingBlock',
  labels: { singular: 'Listagem de Portfólios', plural: 'Listagens de Portfólios' },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Portfólio',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      localized: true,
      defaultValue: '*Projetos* que colocamos pra rodar',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'showFilters',
      label: 'Mostrar filtros por categoria',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showViewToggle',
      label: 'Mostrar toggle Grade / Lista',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
