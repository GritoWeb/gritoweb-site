import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { HeaderComponent } from '@/Header/Component'
import { FooterComponent } from '@/Footer/Component'

const locales = ['pt', 'en'] as const

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  return {
    alternates: {
      languages: {
        pt: `${baseUrl}/pt`,
        en: `${baseUrl}/en`,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as (typeof locales)[number])) notFound()

  return (
    <>
      <HeaderComponent locale={locale} />
      <main className="flex-1">{children}</main>
      <FooterComponent locale={locale} />
    </>
  )
}
