'use client'

import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'

export function ClientLayout({
  children,
  isAdminBarEnabled,
}: {
  children: React.ReactNode
  isAdminBarEnabled: boolean
}) {
  return (
    <Providers>
      <AdminBar
        adminBarProps={{
          preview: isAdminBarEnabled,
        }}
      />
      {children}
    </Providers>
  )
}
