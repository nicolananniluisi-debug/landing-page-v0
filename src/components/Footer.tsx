'use client'

import { Github, Twitter, Instagram } from 'lucide-react'

function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1" y="1" width="26" height="26" rx="7"
        stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"
      />
      <path
        d="M9 14h4m0 0l-2-3m2 3l-2 3M15 10l2 4-2 4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"
      />
      <circle cx="20" cy="9" r="2" fill="currentColor" fillOpacity="0.4" />
    </svg>
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
          <div className="flex items-center gap-3">
            <span style={{ color: 'var(--text-tertiary)' }}>
              <LogoMark />
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '-0.01em',
              }}
            >
              ContentAI
            </span>
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
            &copy; {new Date().getFullYear()} ContentAI. Todos os direitos reservados.
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
