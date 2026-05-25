import React from 'react'
import { headers } from 'next/headers'
import './styles.css'

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
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  )
}
