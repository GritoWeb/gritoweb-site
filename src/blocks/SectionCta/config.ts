import type { Block } from 'payload'

export const SectionCta: Block = {
  slug: 'homeSectionCta',
  interfaceName: 'SectionCtaBlock',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    {
      name: 'variant',
      label: 'Color variant',
      type: 'select',
      required: true,
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Orange', value: 'orange' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'orange',
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Próximo passo',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Tem um projeto *em mente?*',
      admin: {
        description: 'Use *palavra* para destacar em laranja. Use \\n para quebrar linha.',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'cta1Label',
      label: 'Button 1 — text',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Agendar uma call',
    },
    {
      name: 'cta1Href',
      label: 'Button 1 — link',
      type: 'text',
      required: true,
      defaultValue: '#',
    },
    {
      name: 'cta1Variant',
      label: 'Button 1 — variant',
      type: 'select',
      required: true,
      options: [
        { label: 'Primary (orange)', value: 'primary' },
        { label: 'Blue', value: 'blue' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'blue',
    },
    {
      name: 'cta2Label',
      label: 'Button 2 — text',
      type: 'text',
      localized: true,
      defaultValue: 'Baixar portfólio (PDF)',
    },
    {
      name: 'cta2Href',
      label: 'Button 2 — link',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'cta2Variant',
      label: 'Button 2 — variant',
      type: 'select',
      options: [
        { label: 'Primary (orange)', value: 'primary' },
        { label: 'Blue', value: 'blue' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'White', value: 'white' },
      ],
      defaultValue: 'white',
    },
    {
      name: 'image',
      label: 'Side image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
