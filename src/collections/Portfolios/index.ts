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
    // ── Campos de listagem (já existentes) ─────────────────────────────
    {
      name: 'title',
      label: 'Project title',
      type: 'text',
      localized: true,
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
      label: 'Summary (subtítulo do hero)',
      type: 'textarea',
      localized: true,
      admin: { description: 'Aparece abaixo do título na página do case.' },
    },
    {
      name: 'image',
      label: 'Cover image (hero)',
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
      label: 'Result destaque (card)',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Exibido no card da listagem. Ex: +38% ticket médio',
      },
    },
    {
      name: 'siteUrl',
      label: 'Link do site ao vivo',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'nextProjectHref',
      label: 'Link próximo projeto',
      type: 'text',
      admin: { position: 'sidebar', description: 'Botão "Próximo projeto" no hero.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },

    // ── Meta strip ─────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Meta strip (cliente / setor / entregas / duração)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'sector',
          label: 'Setor',
          type: 'text',
        },
        {
          name: 'deliverables',
          label: 'Entregas',
          type: 'text',
          admin: { description: 'Ex: Site, POS, Reservas' },
        },
        {
          name: 'duration',
          label: 'Duração',
          type: 'text',
          admin: { description: 'Ex: 10 semanas' },
        },
      ],
    },

    // ── Desafio ────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'O desafio',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'challengeTitle',
          label: 'Título do desafio',
          type: 'text',
          admin: { description: 'Use *palavra* para laranja.' },
        },
        {
          name: 'challengeBody',
          label: 'Corpo do desafio',
          type: 'textarea',
          admin: { description: 'Parágrafos separados por linha em branco.' },
        },
      ],
    },

    // ── Processo ───────────────────────────────────────────────────────
    {
      name: 'processSteps',
      label: 'Processo',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'number',
          label: 'Número',
          type: 'text',
          admin: { description: 'Ex: 01' },
        },
        {
          name: 'title',
          label: 'Título',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Descrição',
          type: 'textarea',
        },
      ],
    },

    // ── Galeria ────────────────────────────────────────────────────────
    {
      name: 'gallery',
      label: 'Galeria',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          label: 'Imagem',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          label: 'Legenda',
          type: 'text',
        },
        {
          name: 'accent',
          label: 'Cor de fundo (fallback)',
          type: 'select',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
          defaultValue: 'blue',
        },
      ],
    },

    // ── Big Quote ──────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Citação do cliente',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'quoteText',
          label: 'Citação',
          type: 'textarea',
        },
        {
          name: 'quoteAuthor',
          label: 'Autor',
          type: 'text',
        },
        {
          name: 'quoteRole',
          label: 'Cargo / empresa',
          type: 'text',
        },
      ],
    },

    // ── Resultados ─────────────────────────────────────────────────────
    {
      name: 'stats',
      label: 'Resultados (números)',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'value',
          label: 'Valor',
          type: 'text',
          admin: { description: 'Ex: +38%' },
        },
        {
          name: 'label',
          label: 'Descrição',
          type: 'text',
          admin: { description: 'Ex: Ticket médio após redesign' },
        },
      ],
    },

    // ── Equipe & Stack ─────────────────────────────────────────────────
    {
      name: 'team',
      label: 'Equipe',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
        },
        {
          name: 'role',
          label: 'Função',
          type: 'text',
        },
      ],
    },
    {
      name: 'stack',
      label: 'Stack / ferramental',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'tool',
          label: 'Ferramenta',
          type: 'text',
        },
      ],
    },

    // ── Projetos relacionados ──────────────────────────────────────────
    {
      name: 'relatedPortfolios',
      label: 'Projetos relacionados',
      type: 'relationship',
      relationTo: 'portfolios',
      hasMany: true,
      maxRows: 3,
      filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
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
