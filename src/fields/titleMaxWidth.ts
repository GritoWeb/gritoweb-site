import type { SelectField } from 'payload'

export const titleMaxWidth: SelectField = {
  name: 'titleMaxWidth',
  label: 'Title max width (desktop)',
  type: 'select',
  required: true,
  defaultValue: 'none',
  admin: {
    description: 'Limits the title width only on screens ≥ 1024px (desktop).',
  },
  options: [
    { label: 'Default (no limit)', value: 'none' },
    { label: 'Small (~480px)', value: 'sm' },
    { label: 'Medium (~640px)', value: 'md' },
    { label: 'Large (~800px)', value: 'lg' },
    { label: 'Extra (~960px)', value: 'xl' },
  ],
}
