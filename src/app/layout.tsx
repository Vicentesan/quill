import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { cn, constructMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'

import { SpeedInsights } from "@vercel/speed-insights/next"

import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <SpeedInsights/>
      <Providers>
      <body className={cn(
        'min-h-screen font-sans antialiased grainy ',
        inter.className
      )}>
        <Toaster expand={false} position="top-right" richColors closeButton/>
        <Navbar />
        {children}
        </body>
        </Providers>
    </html>
  )
}
