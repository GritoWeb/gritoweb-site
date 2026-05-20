import type { Block } from 'payload'

export const SectionProjects: Block = {
  slug: 'homeSectionProjects',
  interfaceName: 'SectionProjectsBlock',
  labels: { singular: 'Projects Section', plural: 'Projects Section' },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Trabalhos recentes',
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Projetos que *colocamos pra rodar*',
      admin: { description: 'Use *palavra* para laranja. Use \\n para quebra de linha.' },
    },
    {
      name: 'portfolioLabel',
      label: 'Portfolio button — text',
      type: 'text',
      localized: true,
      defaultValue: 'Ver portfólio completo',
    },
    {
      name: 'portfolioHref',
      label: 'Portfolio button — link',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'projects',
      label: 'Featured projects',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'tag',
          label: 'Project tag',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'tagVariant',
          label: 'Tag color',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
          defaultValue: 'blue',
        },
        {
          name: 'accent',
          label: 'Card color',
          type: 'select',
          required: true,
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Orange', value: 'orange' },
          ],
          defaultValue: 'blue',
        },
        {
          name: 'client',
          label: 'Client name',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          label: 'Ano',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Project title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'result',
          label: 'Result (e.g.: +38% avg. ticket)',
          type: 'text',
          localized: true,
        },
        {
          name: 'motifType',
          label: 'Card visual motif',
          type: 'select',
          required: true,
          options: [
            { label: 'Tag Mark (checklist azul)', value: 'tagMark' },
            { label: 'Dashboard (mock UI)', value: 'dashboard' },
            { label: 'Arrow Curve (laranja)', value: 'arrowCurve' },
          ],
          defaultValue: 'tagMark',
        },
        {
          name: 'href',
          label: 'Project link',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}
