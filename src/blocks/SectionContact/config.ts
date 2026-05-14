import type { Block } from 'payload'

export const SectionContact: Block = {
  slug: 'homeSectionContact',
  interfaceName: 'SectionContactBlock',
  labels: { singular: 'Contact Section', plural: 'Contact Section' },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      defaultValue: 'contato@exemplo.com',
    },
    {
      name: 'emailHref',
      label: 'Email link',
      type: 'text',
      required: true,
      defaultValue: 'mailto:contato@exemplo.com',
    },
    {
      name: 'phone',
      label: 'Phone / WhatsApp',
      type: 'text',
      required: true,
      defaultValue: '(11) 99999-9999',
    },
    {
      name: 'phoneHref',
      label: 'Phone link',
      type: 'text',
      required: true,
      defaultValue: 'tel:+5511999999999',
    },
  ],
}
