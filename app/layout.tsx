import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { MobileNav } from '@/components/layout/mobile-nav'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Resume Maker - Create Professional Resumes',
  description: 'Create ATS-friendly resumes with AI enhancement for Indian job market',
  keywords: 'resume maker, AI resume, Indian jobs, ATS friendly resume',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <MobileNav />
      </body>
    </html>
  )
}