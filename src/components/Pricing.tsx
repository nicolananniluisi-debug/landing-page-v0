'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Minus, Zap } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Para quem está começando a criar consistentemente',
    priceMonthly: 49,
    priceAnnual: 34,
    featured: false,
    features: [
      { text: '30 conteúdos gerados por mês', included: true },
      { text: 'Roteiro + legenda + hashtags', included: true },
      { text: 'Instagram e TikTok', included: true },
      { text: 'Editor de conteúdo básico', included: true },
      { text: 'Geração de vídeo com IA', included: false },
      { text: 'Publicação agendada', included: false },
      { text: 'Suporte prioritário', included: false },
    ],
    cta: 'Começar grátis',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para criadores em crescimento que querem resultados rápidos',
    priceMonthly: 97,
    priceAnnual: 68,
    featured: true,
    badge: 'Mais popular',
    features: [
      { text: 'Conteúdos ilimitados por mês', included: true },
      { text: 'Roteiro + legenda + hashtags', included: true },
      { text: 'Instagram, TikTok, YouTube e LinkedIn', included: true },
      { text: 'Editor avançado de conteúdo', included: true },
      { text: 'Geração de vídeo com IA', included: true },
      { text: 'Publicação agendada', included: true },
      { text: 'Suporte prioritário', included: false },
    ],
    cta: 'Começar grátis',
  },
  {
    id: 'scale',
    name: 'Escala',
    description: 'Para criadores profissionais e agências de conteúdo',
    priceMonthly: 197,
    priceAnnual: 138,
    featured: false,
    features: [
      { text: 'Tudo do Pro, ilimitado', included: true },
      { text: 'Múltiplos perfis de criador', included: true },
      { text: 'Todas as plataformas', included: true },
      { text: 'Análise de performance com IA', included: true },
      { text: 'Geração de vídeo com IA — HD', included: true },
      { text: 'Publicação agendada em lote', included: true },
      { text: 'Suporte prioritário 24/7', included: true },
    ],
    cta: 'Falar com vendas',
  },
]

function PlanCard({ plan, isAnnual }: { plan: typeof PLANS[0]; isAnnual: boolean }) {
  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly

  return (
    <motion.div
      className={plan.featured ? 'pricing-featured glass' : 'glass'}
      style={{
        borderRadius: '12px',
        padding: '32px 28px',
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: PLANS.indexOf(plan) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Featured badge */}
      {plan.badge && (
        <span
          className="badge absolute"
          style={{
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <Zap size={10} strokeWidth={1.5} />
          {plan.badge}
        </span>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <p
          style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: '8px',
          }}
        >
          {plan.name}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isAnnual ? 'annual' : 'monthly'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-end gap-2"
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 'clamp(2.25rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              R${price}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', paddingBottom: '4px' }}>
              /mês
            </span>
          </motion.div>
        </AnimatePresence>
        {isAnnual && (
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Cobrado anualmente — economize 30%
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1" aria-label={`Recursos do plano ${plan.name}`}>
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            {feature.included ? (
              <Check
                size={15}
                strokeWidth={2}
                style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: '1px' }}
              />
            ) : (
              <Minus
                size={15}
                strokeWidth={1.5}
                style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: '1px' }}
              />
            )}
            <span
              style={{
                fontSize: '13px',
                color: feature.included ? 'var(--text-secondary)' : 'var(--text-tertiary)',
              }}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={plan.featured ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'}
        style={{ width: '100%', justifyContent: 'center' }}
        aria-label={`${plan.cta} — plano ${plan.name}`}
      >
        {plan.cta}
      </button>

      {/* Urgency */}
      {plan.featured && (
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '10px' }}>
          Preço de lançamento — por tempo limitado
        </p>
      )}
    </motion.div>
  )
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section
      id="pricing"
      className="section-padding dot-grid"
      style={{ background: 'var(--bg-base)' }}
      aria-label="Planos e preços"
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-h2 mb-4" style={{ color: 'var(--text-primary)' }}>
            Escolha seu plano.{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Cancele quando quiser.</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Todos os planos incluem 7 dias grátis. Sem cartão de crédito para começar.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              style={{
                fontSize: '13px',
                color: !isAnnual ? 'var(--text-primary)' : 'var(--text-tertiary)',
                transition: 'color 0.2s',
              }}
            >
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative cursor-pointer"
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                background: isAnnual ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                transition: 'background 0.3s ease',
              }}
              aria-label={`Alternar para plano ${isAnnual ? 'mensal' : 'anual'}`}
              role="switch"
              aria-checked={isAnnual}
            >
              <motion.div
                animate={{ x: isAnnual ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: '3px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--text-primary)',
                }}
              />
            </button>
            <span
              style={{
                fontSize: '13px',
                color: isAnnual ? 'var(--text-primary)' : 'var(--text-tertiary)',
                transition: 'color 0.2s',
              }}
            >
              Anual{' '}
              <span
                className="badge"
                style={{ fontSize: '10px', padding: '2px 8px', display: 'inline-flex' }}
              >
                -30%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-end">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  )
}
