import Navbar from './components/Navbar'
import Footer from './components/Footer'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LetrasSinFiltro',
  description: 'Sitio oficial de LetrasSinFiltro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <Navbar />
      <body className={inter.className}>{children}</body>
      <Footer />
    </html>
  )
}
