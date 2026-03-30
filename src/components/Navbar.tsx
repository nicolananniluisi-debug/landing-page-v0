'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function FlowoWordmark() {
  return (
    <span
      style={{
        fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
        fontSize: '15px',
        fontWeight: 300,
        letterSpacing: '0.10em',
        color: 'rgba(242, 240, 235, 0.25)',
        transition: 'color 0.2s ease',
        userSelect: 'none',
      }}
      className="flowo-wordmark"
    >
      flowo
    </span>
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
          className="cursor-pointer flex items-center justify-center flowo-wordmark-btn"
          aria-label="Voltar ao topo"
          onMouseEnter={(e) => {
            const span = (e.currentTarget as HTMLElement).querySelector('.flowo-wordmark') as HTMLElement | null
            if (span) span.style.color = 'rgba(242, 240, 235, 0.55)'
          }}
          onMouseLeave={(e) => {
            const span = (e.currentTarget as HTMLElement).querySelector('.flowo-wordmark') as HTMLElement | null
            if (span) span.style.color = 'rgba(242, 240, 235, 0.25)'
          }}
        >
          <FlowoWordmark />
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
