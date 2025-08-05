'use client'

import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'

import { Props } from './types'

export const ClientThemeProvider: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on the server to avoid mismatch
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
