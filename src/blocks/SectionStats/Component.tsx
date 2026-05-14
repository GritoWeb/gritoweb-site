import React from 'react'
import type { SectionStatsBlock } from '@/payload-types'
import { StatsBand } from '@/components/sections'

export const SectionStatsComponent: React.FC<SectionStatsBlock> = ({
  stats,
  showDecoration,
}) => {
  return (
    <StatsBand
      stats={(stats ?? []).map((s) => ({ value: s.value, label: s.label }))}
      showDecoration={showDecoration ?? true}
    />
  )
}
