'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const PAIN_POINTS = [
  'Fica horas na frente da tela sem saber o que escrever',
  'Posta uma vez e some por duas semanas',
  'Sabe que precisa de consistência, mas não tem tempo',
  'Cria conteúdo bom, mas ninguém vê porque posta raro',
]

function PainItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span
        className="flex-shrink-0 mt-1"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden="true"
      >
        <X size={11} strokeWidth={2} style={{ color: 'rgba(242,240,235,0.40)' }} />
      </span>
      <span className="text-body" style={{ color: 'var(--text-secondary)' }}>
        {text}
      </span>
    </motion.li>
  )
}

export default function Pain() {
  const scrollToSolution = () => {
    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="pain"
      className="section-padding"
      style={{ background: '#0f0f0f' }}
      aria-label="O problema"
    >
      <div className="section-container">
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          {/* Headline */}
          <motion.h2
            className="text-h2 mb-12"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Criar conteúdo todo dia deveria ser simples.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>Mas não é.</span>
          </motion.h2>

          {/* Pain list */}
          <ul
            className="text-left space-y-6 mb-16"
            style={{ textAlign: 'left' }}
            aria-label="Lista de problemas comuns"
          >
            {PAIN_POINTS.map((text, i) => (
              <PainItem key={i} text={text} index={i} />
            ))}
          </ul>

          {/* Masked CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={scrollToSolution}
              className="cursor-pointer inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(255,255,255,0.20)',
                textUnderlineOffset: '4px',
              }}
              aria-label="Ver a solução"
            >
              E se existisse uma forma de resolver tudo isso de uma vez? →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
