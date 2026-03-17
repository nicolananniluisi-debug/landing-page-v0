'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function LogoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <path
        d="M9 14h4m0 0l-2-3m2 3l-2 3M15 10l2 4-2 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />
      <circle cx="20" cy="9" r="2" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`glass-navbar fixed top-4 z-50 rounded-full ${scrolled ? 'scrolled' : ''}`}
      style={{ left: '50%', width: '420px', maxWidth: 'calc(100vw - 32px)' }}
      initial={{ opacity: 0, x: '-50%', y: -12 }}
      animate={{ opacity: 1, x: '-50%', y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      role="banner"
    >
      <div
        className="grid items-center"
        style={{ height: '44px', padding: '0 8px', gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Left — Nav Links */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Menu principal">
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-normal cursor-pointer transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = 'var(--text-primary)')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = 'var(--text-secondary)')
            }
          >
            Preços
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-normal cursor-pointer transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = 'var(--text-primary)')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = 'var(--text-secondary)')
            }
          >
            FAQ
          </button>
        </nav>

        {/* Center — Logo */}
        <button
          onClick={scrollToTop}
          className="cursor-pointer transition-opacity duration-200 hover:opacity-70 flex items-center justify-center"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Voltar ao topo"
        >
          <LogoIcon />
        </button>

        {/* Right — CTA */}
        <div className="flex justify-end">
          <button
            onClick={() => scrollToSection('pricing')}
            className="btn-ghost btn-ghost-sm cursor-pointer"
            style={{ borderRadius: '9999px' }}
            aria-label="Começar grátis"
          >
            Começar grátis
          </button>
        </div>
      </div>
    </motion.header>
  )
}
