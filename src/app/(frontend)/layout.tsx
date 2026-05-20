import React from 'react'
import { headers } from 'next/headers'
import './styles.css'

import { HeaderComponent } from '@/Header/Component'
import { FooterComponent } from '@/Footer/Component'

export const metadata = {
  description: 'GritoWeb — Digital studio.',
  title: 'GritoWeb',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headersList = await headers()
  const locale = headersList.get('x-locale') ?? 'pt'
  const lang = locale === 'en' ? 'en' : 'pt-BR'

  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen">
        <HeaderComponent locale={locale} />
        <main className="flex-1">{children}</main>
        <FooterComponent locale={locale} />
      </body>
    </html>
  )
}
