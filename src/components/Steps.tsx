'use client'

import { motion } from 'framer-motion'
import { Link2, Sparkles, Send } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: Link2,
    title: 'Conecte seu perfil',
    description: 'Diga seu nicho, seus temas favoritos e o tom de voz que você usa. Leva menos de 2 minutos.',
    animationType: 'float',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'A IA gera tudo',
    description: 'Roteiro, legenda, sugestão de vídeo e hashtags. Um mês de conteúdo pronto para revisar.',
    animationType: 'wiggle',
  },
  {
    number: '03',
    icon: Send,
    title: 'Edite e publique',
    description: 'Ajuste o que quiser (ou não ajuste nada) e publique direto nas suas redes sociais.',
    animationType: 'float',
  },
]

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const Icon = step.icon

  const iconAnimation =
    step.animationType === 'wiggle'
      ? {
          rotate: [-3, 3, -3],
          transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }
      : {
          y: [0, -4, 0],
          transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
        }

  return (
    <motion.div
      className="glass relative flex flex-col"
      style={{
        borderRadius: '12px',
        padding: '32px 28px',
        flex: 1,
        minWidth: 0,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Step number */}
      <motion.span
        style={{
          fontSize: '13px',
          fontFamily: 'var(--font-geist-mono)',
          fontWeight: 500,
          color: 'var(--text-tertiary)',
          letterSpacing: '0.08em',
          marginBottom: '20px',
          display: 'block',
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
      >
        {step.number}
      </motion.span>

      {/* Icon */}
      <motion.div
        aria-hidden="true"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
        animate={iconAnimation}
      >
        <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
      </motion.div>

      {/* Title */}
      <h3
        className="text-h3 mb-3"
        style={{ color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: 600 }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-body" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
        {step.description}
      </p>
    </motion.div>
  )
}

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className="section-padding"
      style={{ background: 'var(--bg-base)' }}
      aria-label="Como funciona"
    >
      <div className="section-container">
        {/* Section headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
            Três passos.{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Zero complicação.</span>
          </h2>
        </motion.div>

        {/* Cards + connector */}
        <div className="relative">
          {/* Dashed SVG connector — desktop only */}
          <motion.div
            className="hidden lg:block absolute"
            style={{
              top: '56px',
              left: 'calc(33.33% - 24px)',
              right: 'calc(33.33% - 24px)',
              height: '1px',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <svg
              width="100%"
              height="2"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <motion.line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col lg:flex-row gap-6 relative z-10">
            {STEPS.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
