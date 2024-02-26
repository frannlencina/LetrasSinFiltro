import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { LoggedProvider } from './context/LoggedContext'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LetrasSinFiltro',
  description: 'Sitio oficial de LetrasSinFiltro',
  icons: {
    icon: "/logos/favicon.ico",
    shortcut: "/logos/favicon-16x16.png",
    apple: "/logos/apple-touch-icon.png",
  },
  keywords: [
    "LetrasSinFiltro",
    "Letras",
    "Filtro",
    "Desahogo",
    "Emocional",
    "Indirectas",
    "Frases",
    "Generador",
    "Dedicar",
    "Generador con IA",
    "Red Social Indirectas",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <LoggedProvider>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
        </head>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </LoggedProvider>
    </html>
  )
}