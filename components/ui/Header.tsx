'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './Button'

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
  } | null
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-gradient-dark border-b border-purple-600/30 shadow-dark-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link 
            href="/overview" 
            className="group"
          >
            <div className="bg-dark-glass px-6 py-3 rounded-lg border border-purple-500/20 shadow-glow-sm">
              <span className="text-xl font-bold text-gradient-light group-hover:opacity-90 transition-all duration-300">
                Bienderen SDG Dashboard
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex gap-8">
            <Link
              href="/overview"
              className={`relative font-semibold transition-all duration-300 group ${
                isActive('/overview') ? 'light-text' : 'text-navy-200 hover:light-text'
              }`}
            >
              <span className="relative z-10">Overzicht</span>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
              {isActive('/overview') && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-glow-sm"></div>
              )}
            </Link>

            <Link
              href="/contact"
              className={`relative font-semibold transition-all duration-300 group ${
                isActive('/contact') ? 'light-text' : 'text-navy-200 hover:light-text'
              }`}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
              {isActive('/contact') && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full shadow-glow-sm"></div>
              )}
            </Link>

            <Link
              href="/ondersteuning"
              className={`relative font-semibold transition-all duration-300 group ${
                isActive('/ondersteuning') ? 'light-text' : 'text-navy-200 hover:light-text'
              }`}
            >
              <span className="relative z-10">Ondersteuning</span>
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-300 to-purple-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
              {isActive('/ondersteuning') && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-300 to-purple-400 rounded-full shadow-glow-sm"></div>
              )}
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/account" className="group">
                  <div className="flex items-center gap-3 bg-dark-glass backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-500/20 hover:cursor-pointer hover:opacity-95 transition-all duration-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-glow-sm">
                      <span className="light-text text-xs font-bold">
                        {(user.name || user.email)?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-purple-300 light-text">Welkom</span>
                      <span className="text-sm light-text font-medium">
                        {user.name || user.email}
                      </span>
                    </div>
                  </div>
                </Link>

                <form action="/api/auth/signout" method="POST">
                  <Button 
                    type="submit" 
                    variant="outline" 
                    size="sm"
                    className="border-purple-400/50 text-purple-200 hover:bg-purple-500/10 hover:border-purple-300 hover:light-text transition-all duration-300"
                  >
                    Uitloggen
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Inloggen knop */}
                <Link href="/login">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 light-text font-semibold shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                  >
                    Inloggen
                  </Button>
                </Link>

                {/* Registreren knop */}
                <Link href="/signup">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 light-text font-semibold shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                  >
                    Registreren
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}