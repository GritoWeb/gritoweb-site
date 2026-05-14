'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Header } from '@/payload-types'
import type { Page } from '@/payload-types'
import { LogoWord } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

type NavItem = NonNullable<Header['navItems']>[number]

function resolveHref(link: NavItem['link']): string {
  if (link.type === 'reference' && link.reference && typeof link.reference.value === 'object') {
    const slug = (link.reference.value as Page).slug
    return `/${slug}`
  }
  return link.url ?? '#'
}

const linkBase =
  'no-underline font-body font-bold text-xs uppercase tracking-[0.12em] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm'

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  const navItems = (data?.navItems ?? []).map((item) => ({
    id: item.id ?? item.link.label,
    label: item.link.label,
    href: resolveHref(item.link),
  }))

  return (
    <header className="flex items-center justify-between gap-6 flex-wrap px-12 py-[22px] bg-paper border-b border-line">
      <Link
        href="/"
        aria-label="GritoWeb — home"
        className="no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-md"
      >
        <LogoWord />
      </Link>

      <nav aria-label="Primary">
        <ul className="flex items-center gap-7 list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`${linkBase} ${isActive ? 'text-orange' : 'text-blue hover:text-orange'}`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
