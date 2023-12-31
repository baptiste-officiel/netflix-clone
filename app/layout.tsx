import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Login from './login/page'
import Navbar from './components/navbar/Navbar'
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Welcome on the best Netflix Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <Navbar />
        {children}
        </AuthProvider>
        </body>
    </html>
  )
}
