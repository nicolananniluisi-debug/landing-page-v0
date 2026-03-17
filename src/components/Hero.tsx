'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Star, ArrowDown, Zap } from 'lucide-react'

const HEADLINE_WORDS = ['Crie', 'um', 'mês', 'de', 'conteúdo', 'sem', 'travar', 'a', 'tela.']

const AVATARS = [
  { initials: 'LM', bg: 'rgba(255,255,255,0.12)' },
  { initials: 'AC', bg: 'rgba(255,255,255,0.09)' },
  { initials: 'RP', bg: 'rgba(255,255,255,0.07)' },
  { initials: 'KS', bg: 'rgba(255,255,255,0.05)' },
  { initials: 'BT', bg: 'rgba(255,255,255,0.04)' },
]

const PLATFORM_LOGOS = [
  {
    name: 'Instagram',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.25 8.25 0 004.83 1.55V6.79a4.85 4.85 0 01-1.06-.1z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    svg: (
      <svg width="20" height="14" viewBox="0 0 24 17" fill="currentColor" aria-label="YouTube">
        <path d="M23.495 2.205a3.02 3.02 0 00-2.127-2.138C19.428 0 12 0 12 0S4.572 0 2.632.067a3.02 3.02 0 00-2.127 2.138C0 4.152 0 8.5 0 8.5s0 4.35.505 6.295a3.02 3.02 0 002.127 2.138C4.572 17 12 17 12 17s7.428 0 9.368-.067a3.02 3.02 0 002.127-2.138C24 12.85 24 8.5 24 8.5s0-4.35-.505-6.295zM9.545 12.068V4.932L15.818 8.5l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Canva',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="Canva">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 14.285c-.374.87-1.27 1.454-2.243 1.454-.547 0-1.058-.168-1.46-.48-.336.31-.763.48-1.222.48-.947 0-1.74-.738-1.74-1.69 0-.21.04-.41.11-.596-.523-.385-.85-.998-.85-1.68 0-1.123.905-2.04 2.019-2.04.413 0 .8.127 1.12.344.355-.58.978-.96 1.695-.96.57 0 1.086.224 1.462.588.38-.364.9-.588 1.47-.588 1.12 0 2.027.91 2.027 2.04 0 .717-.37 1.347-.929 1.716.048.17.073.35.073.54 0 .32-.075.622-.206.872z" />
      </svg>
    ),
  },
  {
    name: 'X',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="X">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(((e.clientX - centerX) / rect.width) * 10)
      mouseY.set(((e.clientY - centerY) / rect.height) * 10)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', paddingTop: '56px' }}
      aria-label="Hero section"
    >
      {/* Parallax radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: springX, y: springY, zIndex: 1 }}
      >
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Main content */}
      <div
        className="section-container text-center z-10 flex flex-col items-center"
        style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
      >
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="badge">
            <Star size={12} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
            Usado por +5.000 criadores
          </span>
        </motion.div>

        {/* Headline — word stagger */}
        <h1
          className="text-display font-bold mb-6"
          style={{ color: 'var(--text-primary)', maxWidth: '760px', margin: '0 auto 1.5rem' }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-body mb-10"
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Você decide o tema. A IA escreve o roteiro, a legenda e ainda sugere o vídeo.
          Consistência sem bloquear sua criatividade.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            className="btn-primary btn-glow"
            onClick={() => scrollToSection('pricing')}
            aria-label="Começar agora, grátis"
          >
            <Zap size={16} strokeWidth={1.5} />
            Começar agora — grátis
          </button>
          <button
            className="btn-ghost"
            onClick={() => scrollToSection('how-it-works')}
            aria-label="Ver como funciona"
          >
            Ver como funciona
            <ArrowDown size={16} strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="flex items-center">
            {AVATARS.map((avatar, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: avatar.bg,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  marginLeft: i === 0 ? 0 : '-8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  zIndex: AVATARS.length - i,
                  position: 'relative',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Mais de{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>5.000 criadores</span>{' '}
            já usam todo dia
          </p>
        </motion.div>
      </div>

      {/* Platform logos marquee */}
      <motion.div
        className="z-10 w-full flex justify-center"
        style={{ paddingBottom: '2.5rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <div
          className="flex items-center overflow-hidden rounded-2xl border"
          style={{
            borderColor: 'var(--border-subtle)',
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(12px)',
            maxWidth: '640px',
            width: '100%',
            height: '56px',
          }}
        >
          {/* Label */}
          <div
            className="flex-shrink-0 border-r hidden sm:flex items-center justify-end px-5"
            style={{ borderColor: 'var(--border-subtle)', width: '160px', minWidth: '160px', height: '100%' }}
          >
            <p
              className="text-right"
              style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.5, letterSpacing: '0.02em' }}
            >
              Crie para todas<br />as plataformas
            </p>
          </div>

          {/* Marquee */}
          <div
            className="relative overflow-hidden h-full"
            style={{
              flex: '1 1 0%',
              maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            <div
              className="marquee-track absolute top-0 left-0 h-full items-center"
              style={{ willChange: 'transform' }}
            >
              {PLATFORM_LOGOS.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)', padding: '0 28px', flexShrink: 0 }}
                  title={platform.name}
                >
                  {platform.svg}
                  <span style={{ fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {platform.name}
                  </span>
                </div>
              ))}
              {PLATFORM_LOGOS.map((platform) => (
                <div
                  key={`${platform.name}-dup`}
                  className="flex items-center gap-2"
                  style={{ color: 'var(--text-secondary)', padding: '0 28px', flexShrink: 0 }}
                  aria-hidden="true"
                >
                  {platform.svg}
                  <span style={{ fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, var(--bg-base), transparent)',
          zIndex: 5,
        }}
      />
    </section>
  )
}
