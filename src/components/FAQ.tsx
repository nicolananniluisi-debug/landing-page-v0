'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'

const FAQS = [
  {
    q: 'Funciona para qualquer nicho?',
    a: 'Sim. A IA é treinada para adaptar o conteúdo ao seu nicho específico — seja fitness, gastronomia, educação, tecnologia, empreendedorismo ou qualquer outro. Quanto mais você usa, mais personalizado fica.',
  },
  {
    q: 'Preciso saber editar vídeos ou escrever bem?',
    a: 'Não. O sistema gera roteiro, legenda, hashtags e sugestões de vídeo prontos para usar. Você pode ajustar o que quiser — ou publicar direto. Nenhum skill técnico necessário.',
  },
  {
    q: 'Os conteúdos gerados são originais?',
    a: 'Sim. Cada conteúdo é gerado de forma única, com base no seu tema, tom de voz e nicho. Nada é copiado de outros criadores — o resultado é original e feito para você.',
  },
  {
    q: 'Consigo cancelar quando quiser?',
    a: 'Sim, sem complicação. Você cancela em um clique pelo painel, sem precisar falar com nenhum atendente. Sem multas, sem período mínimo, sem pegadinha.',
  },
  {
    q: 'Quantos posts consigo gerar por mês?',
    a: 'Depende do seu plano. No Starter, são 30 conteúdos por mês. No Pro e Escala, são ilimitados. Em qualquer caso, é mais do que a maioria dos criadores consegue produzir manualmente.',
  },
  {
    q: 'Funciona para Instagram, TikTok e YouTube ao mesmo tempo?',
    a: 'Sim. O sistema adapta o formato do conteúdo para cada plataforma automaticamente — desde a proporção do vídeo até a extensão da legenda e estilo de hashtag.',
  },
]

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof FAQS[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 cursor-pointer"
        style={{
          padding: '20px 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          width: '100%',
        }}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.5,
          }}
        >
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}
          aria-hidden="true"
        >
          {isOpen ? (
            <X size={16} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
          ) : (
            <Plus size={16} strokeWidth={1.5} style={{ color: 'var(--text-secondary)' }} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                paddingBottom: '20px',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: '#0f0f0f' }}
      aria-label="Perguntas frequentes"
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
            Ainda com dúvidas?
          </h2>
        </motion.div>

        <motion.div
          style={{ maxWidth: '680px', margin: '0 auto' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
