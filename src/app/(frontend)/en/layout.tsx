import React from 'react'
import type { Metadata } from 'next'

import { HeaderComponent } from '@/Header/Component'
import { FooterComponent } from '@/Footer/Component'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''

export const metadata: Metadata = {
  alternates: {
    languages: {
      pt: baseUrl,
      en: `${baseUrl}/en`,
    },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderComponent locale="en" />
      <main className="flex-1">{children}</main>
      <FooterComponent locale="en" />
    </>
  )
}
