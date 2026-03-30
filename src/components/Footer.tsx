'use client'

import { Github, Twitter, Instagram } from 'lucide-react'

function FlowoWordmark() {
  return (
    <span
      style={{
        fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
        fontSize: '14px',
        fontWeight: 300,
        letterSpacing: '0.10em',
        color: 'rgba(242, 240, 235, 0.25)',
        userSelect: 'none',
      }}
    >
      flowo
    </span>
  )
}

const SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
]

const LEGAL_LINKS = [
  { label: 'Privacidade', href: '#' },
  { label: 'Termos', href: '#' },
  { label: 'Contato', href: '#' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 0 32px',
      }}
      role="contentinfo"
    >
      <div className="section-container">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          {/* Logo + tagline */}
          <div className="flex items-center">
            <FlowoWordmark />
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-opacity duration-200 hover:opacity-100"
                style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}
                rel="noopener noreferrer"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            &copy; {new Date().getFullYear()} flowo. Todos os direitos reservados.
          </p>

          <nav aria-label="Links legais" className="flex items-center gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: '12px',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--text-secondary)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--text-tertiary)')
                }
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
