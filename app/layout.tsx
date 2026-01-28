import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

import { prisma } from '@/lib/prisma'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SDG Dashboard | Sustainable Development Goals',
  description: 'Interactief dashboard voor het volgen van Sustainable Development Goals (SDGs) voortgang',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null

  try {
    const cookieStore = cookies()
    const tokenCookie = cookieStore.get('token')
    const token = tokenCookie?.value

    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me'
      const payload = jwt.verify(token, JWT_SECRET) as { id?: string; email?: string }
      if (payload?.id) {
        const u = await prisma.user.findUnique({ where: { id: payload.id } })
        if (u) {
          user = { name: u.name, email: u.email }
        }
      }
    }
  } catch (err) {
    // silently ignore - user stays null
    // eslint-disable-next-line no-console
    console.warn('Could not parse auth cookie', err)
  }

  return (
    <html lang="nl" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-dark text-light-text`}>
        <Header user={user} />
        <main className="flex-1 bg-transparent">
          <div className="min-h-full">
            <div className="max-w-7xl mx-auto px-4 py-8">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}