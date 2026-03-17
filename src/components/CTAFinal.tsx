'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTAFinal() {
  return (
    <section
      id="cta-final"
      className="section-padding"
      style={{
        minHeight: '50dvh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Call to action final"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container text-center">
        {/* Headline */}
        <motion.h2
          className="text-h2 mb-5"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Bora testar?{' '}
          <span style={{ color: 'var(--text-secondary)' }}>É de graça por 7 dias.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-body mb-10"
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '440px',
            margin: '0 auto 2.5rem',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Sem cartão. Sem compromisso. Só você e seus conteúdos.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            className="btn-ghost"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontSize: '15px', padding: '14px 32px' }}
            aria-label="Criar minha conta gratuita"
          >
            Criar minha conta gratuita
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          style={{
            fontSize: '12px',
            color: 'var(--text-tertiary)',
            marginTop: '20px',
            letterSpacing: '0.02em',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          7 dias grátis&nbsp;&nbsp;•&nbsp;&nbsp;Cancele quando quiser&nbsp;&nbsp;•&nbsp;&nbsp;Sem pegadinha
        </motion.p>
      </div>
    </section>
  )
}
