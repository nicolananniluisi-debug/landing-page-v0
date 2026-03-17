'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'

// ─── Metrics ───────────────────────────────────────────────────────────────

const METRICS = [
  { end: 5000, prefix: '+', suffix: '', label: 'Criadores ativos', decimals: 0 },
  { end: 3, prefix: '', suffix: 'x', label: 'Mais posts por semana', decimals: 0 },
  { end: 10, prefix: '', suffix: 'min', label: 'Para gerar um mês de conteúdo', decimals: 0 },
  { end: 98, prefix: '', suffix: '%', label: 'Taxa de satisfação', decimals: 0 },
]

function MetricItem({ metric }: { metric: typeof METRICS[0] }) {
  const { count, ref } = useCountUp({ end: metric.end, duration: 1600, decimals: metric.decimals })

  return (
    <div className="text-center">
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}
      >
        {metric.prefix}{metric.end > 100 ? count.toLocaleString('pt-BR') : count}{metric.suffix}
      </p>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{metric.label}</p>
    </div>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Lucas M.',
    role: 'Creator de Tech',
    initials: 'LM',
    text: 'Saí de 2 posts por mês para 20. Não mudei nada na minha rotina — só adicionei essa ferramenta.',
    stars: 5,
  },
  {
    name: 'Ana R.',
    role: 'Fitness no Instagram',
    initials: 'AR',
    text: 'Sempre tive ideias, mas não sabia escrever. Agora meu perfil cresce todo dia sem eu virar redatora.',
    stars: 5,
  },
  {
    name: 'Marcos F.',
    role: 'Empreendedor Digital',
    initials: 'MF',
    text: 'Em 3 semanas triplicou meu alcance no TikTok. A consistência que a IA me deu é impossível de replicar manualmente.',
    stars: 5,
  },
  {
    name: 'Priya S.',
    role: 'Creator de Lifestyle',
    initials: 'PS',
    text: 'O conteúdo soa como eu. Não robótico. Fiquei surpresa com a qualidade das legendas geradas.',
    stars: 5,
  },
  {
    name: 'João B.',
    role: 'Negócios e Finanças',
    initials: 'JB',
    text: 'Gero um mês de conteúdo em uma tarde de domingo. Liberdade total durante a semana.',
    stars: 5,
  },
  {
    name: 'Carla T.',
    role: 'Gastronomia no YouTube',
    initials: 'CT',
    text: 'Meu canal saiu de 800 para 12k inscritos em 4 meses. A regularidade fez toda a diferença.',
    stars: 5,
  },
]

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: '320px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '24px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        marginRight: '16px',
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`${t.stars} estrelas`}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={13} strokeWidth={0} fill="currentColor" style={{ color: 'var(--text-secondary)' }} />
        ))}
      </div>

      {/* Text */}
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          marginBottom: '20px',
        }}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            flexShrink: 0,
          }}
        >
          {t.initials}
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
            {t.name}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{t.role}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Platform logos ─────────────────────────────────────────────────────────

function PlatformLogos() {
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn']
  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginRight: '8px' }}>
        Funciona em
      </span>
      {platforms.map((p) => (
        <span
          key={p}
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.04em',
          }}
        >
          {p}
        </span>
      ))}
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function SocialProof() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section
      id="social-proof"
      className="section-padding"
      style={{ background: '#0e0e0e' }}
      aria-label="Prova social"
    >
      {/* Metrics */}
      <div className="section-container mb-20">
        <motion.h2
          className="text-center text-h2 mb-14"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Números que falam por si.
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <MetricItem metric={m} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials marquee */}
      <div className="mb-12">
        <div className="marquee-wrapper" aria-label="Depoimentos de usuários">
          <div className="marquee-track">
            {doubled.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Platform logos */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PlatformLogos />
        </motion.div>
      </div>
    </section>
  )
}
