'use client'

import { motion } from 'framer-motion'
import { Zap, FileText, Video, Share2, Check } from 'lucide-react'

function MockupVisual() {
  const lines = [
    { w: '85%', delay: 0 },
    { w: '70%', delay: 0.1 },
    { w: '90%', delay: 0.2 },
    { w: '60%', delay: 0.3 },
    { w: '75%', delay: 0.4 },
  ]

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-40px',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Main card — product mockup */}
      <div
        className="glass"
        style={{
          borderRadius: '12px',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-6">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
          <div
            style={{
              flex: 1,
              marginLeft: '8px',
              height: '20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Prompt input */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ color: 'var(--text-tertiary)' }}>Tema: </span>
          Como montar uma rotina de treino sem academia
        </div>

        {/* Generated content sections */}
        <div className="space-y-4">
          {/* Script */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              padding: '14px 16px',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} strokeWidth={1.5} style={{ color: 'var(--text-tertiary)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Roteiro gerado
              </span>
              <motion.div
                style={{
                  marginLeft: 'auto',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                style={{
                  height: '8px',
                  width: line.w,
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '4px',
                  marginBottom: i < lines.length - 1 ? '8px' : 0,
                }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + line.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>

          {/* Output row */}
          <div className="flex gap-3">
            {[
              { icon: Video, label: 'Vídeo' },
              { icon: Share2, label: 'Legenda' },
              { icon: Check, label: 'Pronto' },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Solution() {
  return (
    <section
      id="solution"
      className="section-padding"
      style={{ background: 'var(--bg-base)' }}
      aria-label="A solução"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — Visual (60%) */}
          <div className="w-full lg:w-[60%]">
            <MockupVisual />
          </div>

          {/* Right — Copy (40%) */}
          <div className="w-full lg:w-[40%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge mb-6 inline-flex">
                <Zap size={12} strokeWidth={1.5} />
                A solução
              </span>
            </motion.div>

            <motion.h2
              className="text-h2 mb-6"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Seu próximo mês de conteúdo, pronto em 10 minutos.
            </motion.h2>

            <motion.p
              className="text-body mb-8"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Você decide o tema. A IA faz o resto — roteiro, legenda, até sugestão de vídeo.
              Sem bloquear criativo, sem horas perdidas, sem precisar saber escrever.
              Só você e seus conteúdos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="btn-ghost"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Começar grátis agora"
              >
                Começar grátis
                <Zap size={16} strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
