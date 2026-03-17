'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useCountUp } from '@/hooks/useCountUp'

const CASES = [
  {
    initials: 'AR',
    name: 'Ana R.',
    niche: 'Fitness no Instagram',
    result: '+280%',
    resultLabel: 'de alcance em 30 dias',
    quote: 'Nunca pensei que seria possível escalar assim sem uma equipe.',
    before: { posts: '2 posts/mês', followers: '800 seguidores', engagement: '1.2%' },
    after: { posts: '18 posts/mês', followers: '4.200 seguidores', engagement: '6.8%' },
    countEnd: 280,
  },
  {
    initials: 'JB',
    name: 'João B.',
    niche: 'Negócios no YouTube',
    result: '+15x',
    resultLabel: 'crescimento de canal em 4 meses',
    quote: 'Dediquei um domingo para gerar conteúdo e fiquei livre o resto do mês.',
    before: { posts: '1 vídeo/mês', followers: '800 inscritos', engagement: '0.8%' },
    after: { posts: '12 vídeos/mês', followers: '12.000 inscritos', engagement: '5.2%' },
    countEnd: 1500,
  },
  {
    initials: 'CT',
    name: 'Carla T.',
    niche: 'Gastronomia no TikTok',
    result: '+420%',
    resultLabel: 'de views médios por vídeo',
    quote: 'A consistência que eu nunca consegui manter, a IA mantém por mim.',
    before: { posts: '3 vídeos/mês', followers: '1.200 seguidores', engagement: '2.1%' },
    after: { posts: '25 vídeos/mês', followers: '18.500 seguidores', engagement: '9.3%' },
    countEnd: 420,
  },
]

function BeforeAfterBlock({
  label,
  data,
}: {
  label: 'Antes' | 'Depois'
  data: { posts: string; followers: string; engagement: string }
}) {
  return (
    <div
      style={{
        flex: 1,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '8px',
        padding: '14px 16px',
      }}
    >
      <p
        style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: label === 'Antes' ? 'rgba(242,240,235,0.25)' : 'var(--text-secondary)',
          marginBottom: '10px',
        }}
      >
        {label}
      </p>
      {Object.values(data).map((val, i) => (
        <p
          key={i}
          style={{
            fontSize: '12px',
            color: label === 'Antes' ? 'var(--text-tertiary)' : 'var(--text-secondary)',
            marginBottom: '4px',
            textDecoration: label === 'Antes' ? 'line-through' : 'none',
            textDecorationColor: 'rgba(255,255,255,0.15)',
          }}
        >
          {val}
        </p>
      ))}
    </div>
  )
}

function CaseCard({ c, index }: { c: typeof CASES[0]; index: number }) {
  return (
    <motion.div
      className="glass"
      style={{ borderRadius: '12px', padding: '32px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Author */}
      <div className="flex items-center gap-3 mb-6">
        <div
          aria-hidden="true"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '2px solid rgba(255,255,255,0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            flexShrink: 0,
          }}
        >
          {c.initials}
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{c.niche}</p>
        </div>
      </div>

      {/* Big result */}
      <div className="mb-6">
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}
        >
          {c.result}
        </p>
        <div className="flex items-center gap-2">
          <TrendingUp size={14} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{c.resultLabel}</p>
        </div>
      </div>

      {/* Before / After */}
      <div className="flex gap-3 mb-6">
        <BeforeAfterBlock label="Antes" data={c.before} />
        <BeforeAfterBlock label="Depois" data={c.after} />
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '16px',
        }}
      >
        &ldquo;{c.quote}&rdquo;
      </p>
    </motion.div>
  )
}

export default function Cases() {
  return (
    <section
      id="cases"
      className="section-padding"
      style={{ background: 'var(--bg-base)' }}
      aria-label="Cases de resultado"
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-4" style={{ color: 'var(--text-primary)' }}>
            Resultados reais, de criadores reais.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            O que acontece quando você para de adivinhar e começa a criar com IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <CaseCard key={i} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
