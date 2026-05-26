import React from 'react'
import Image from 'next/image'
import type { SectionCtaBlock } from '@/payload-types'
import type { Media } from '@/payload-types'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Button } from '@/components/ui/Button'
import { parseTitle } from '@/utilities/parseTitle'
import { titleMaxWidthClass, type TitleMaxWidth } from '@/utilities/titleMaxWidthClass'
import { ArrowIcon } from '@/components/ui/ArrowIcon'

export const SectionCtaComponent: React.FC<SectionCtaBlock> = ({
  variant,
  eyebrow,
  title,
  titleMaxWidth,
  description,
  cta1Label,
  cta1Href,
  cta1Variant,
  cta2Label,
  cta2Href,
  cta2Variant,
  image,
}) => {
  const media = image as Media | null

  return (
    <CtaBanner
      variant={(variant as 'blue' | 'orange' | 'white') ?? 'orange'}
      eyebrow={eyebrow ?? undefined}
      title={parseTitle(title)}
      titleClassName={titleMaxWidthClass(titleMaxWidth as TitleMaxWidth | null | undefined)}
      description={description ?? undefined}
      actions={
        <>
          <Button
            href={cta1Href}
            variant={(cta1Variant as ButtonProps['variant']) ?? 'blue'}
            icon={<ArrowIcon size={16} />}
          >
            {cta1Label}
          </Button>
          {cta2Label && (
            <Button
              href={cta2Href ?? '#'}
              variant={(cta2Variant as ButtonProps['variant']) ?? 'white'}
            >
              {cta2Label}
            </Button>
          )}
        </>
      }
      media={
        media && typeof media !== 'string' ? (
          <Image
            src={media.url!}
            alt={media.alt || ''}
            width={media.width ?? 360}
            height={media.height ?? 360}
            className="w-full max-w-[360px] h-auto animate-fade-in"
          />
        ) : undefined
      }
    />
  )
}

type ButtonProps = Parameters<typeof Button>[0]
