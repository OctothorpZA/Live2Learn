'use client'

import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ClientThemeProvider } from './Theme/ClientTheme' // Import the new client-side provider

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ClientThemeProvider>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </ClientThemeProvider>
  )
}
