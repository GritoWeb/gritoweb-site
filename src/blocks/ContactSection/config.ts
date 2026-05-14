import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  interfaceName: 'ContactSectionBlock',
  labels: { singular: 'Contact Section (Form)', plural: 'Contact Sections (Form)' },
  imageURL: '/images/blocks/contactSection.png',
  imageAltText: 'Contact Section (Form)',
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
    },
    {
      name: 'sidebarEyebrow',
      label: 'Sidebar eyebrow',
      type: 'text',
      defaultValue: 'Fale direto',
    },
    {
      name: 'successTitle',
      label: 'Success title',
      type: 'text',
      defaultValue: 'Mensagem enviada',
    },
    {
      name: 'successMessage',
      label: 'Success message',
      type: 'textarea',
      defaultValue:
        'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.',
    },
    {
      name: 'channels',
      label: 'Contact channels',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Location', value: 'location' },
          ],
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Displayed value',
          type: 'text',
          required: true,
        },
        {
          name: 'hint',
          label: 'Hint (optional)',
          type: 'text',
        },
        {
          name: 'href',
          label: 'Link (optional)',
          type: 'text',
        },
      ],
    },
  ],
}
