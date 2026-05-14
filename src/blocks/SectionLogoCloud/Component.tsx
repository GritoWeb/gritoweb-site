import React from 'react'
import type { SectionLogoCloudBlock } from '@/payload-types'
import { LogoCloud } from '@/components/sections'
import { parseTitle } from '@/utilities/parseTitle'
import { LogoMark } from '@/home/cards'
import { Glyph } from '@/home/illustrations'

export const SectionLogoCloudComponent: React.FC<SectionLogoCloudBlock> = ({
  eyebrow,
  title,
  description,
  partners,
}) => {
  return (
    <LogoCloud
      eyebrow={eyebrow}
      title={parseTitle(title)}
      description={description ?? undefined}
      items={(partners ?? []).map((partner) => (
        <LogoMark
          key={partner.id}
          name={partner.name}
          icon={<Glyph kind={partner.glyph as Parameters<typeof Glyph>[0]['kind']} />}
        />
      ))}
    />
  )
}
