import React from 'react'
import './styles.css'

import { HeaderComponent } from '@/Header/Component'
import { FooterComponent } from '@/Footer/Component'

export const metadata = {
  description: 'GritoWeb — Digital studio.',
  title: 'GritoWeb',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <HeaderComponent />
        <main className="flex-1">{children}</main>
        <FooterComponent />
      </body>
    </html>
  )
}
