import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { LoggedProvider } from './context/LoggedContext'
import { EmotionProvider } from './context/EmotionContext'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import Script from 'next/script'

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
        <EmotionProvider>
          <head>

            {/* Google tag (gtag.js) */}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LQ7375CC8N"></Script>
            <Script id='google-analytics'>
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-LQ7375CC8N');
            
            `}
            </Script>

            {/* Google Adsense */}

            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADS_CLIENT_ID}`}
              crossOrigin="anonymous"
            ></Script>

            <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
          </head>
          <body className={inter.className}>
            <Navbar />
            {children}
            <SpeedInsights />
            <Analytics />
            <Footer />
          </body>
        </EmotionProvider>
      </LoggedProvider>
    </html>
  )
}