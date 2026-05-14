import React from 'react'
import type { SectionContactBlock } from '@/payload-types'
import { FaleComAGente } from '@/components/sections/FaleComAGente'
import { ChatMark } from '@/components/ui/ChatMark'

export const SectionContactComponent: React.FC<SectionContactBlock> = ({
  email,
  emailHref,
  phone,
  phoneHref,
}) => {
  return (
    <FaleComAGente
      email={email}
      emailHref={emailHref}
      phone={phone}
      phoneHref={phoneHref}
      chatMark={<ChatMark size={120} />}
    />
  )
}
