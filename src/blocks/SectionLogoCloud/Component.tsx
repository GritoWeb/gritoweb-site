import React from 'react'
import Image from 'next/image'
import type { SectionLogoCloudBlock, Media } from '@/payload-types'
import { LogoCloud } from '@/components/sections'
import { LogoMark } from '@/home/cards'

export const SectionLogoCloudComponent: React.FC<SectionLogoCloudBlock> = ({
  eyebrow,
  description,
  partners,
}) => {
  return (
    <LogoCloud
      eyebrow={eyebrow}
      description={description ?? undefined}
      items={(partners ?? []).map((partner) => {
        const logo = partner.logo as Media
        return (
          <LogoMark
            key={partner.id}
            icon={
              logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt ?? ''}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              ) : undefined
            }
          />
        )
      })}
    />
  )
}
