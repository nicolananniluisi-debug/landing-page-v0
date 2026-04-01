# Flowo — Brainstorming de Identidade Visual
*Design Architect Output — 2026-04-01*

---

## 1. Análise do Estilo Atual

### O que a estética dark/glassmorphism comunica hoje

A configuração atual transmite **sofisticação técnica discreta**. O fundo `#0a0a0a` com gradientes radiais brancos de baixíssima opacidade cria uma profundidade quase imperceptível — o usuário sente atmosfera sem conseguir nomear a fonte. O glassmorphism com `backdrop-filter: blur(12px) saturate(180%)` posiciona o produto no mesmo espaço visual de ferramentas como Linear, Vercel e Raycast: sistemas feitos para profissionais que detestam ruído visual.

O wordmark "flowo" em weight 300, letter-spacing 0.10em e opacidade 25% é uma escolha deliberadamente anticlimática — é um nome que sussurra em vez de gritar. Isso funciona como posicionamento premium para criadores sofisticados, mas pode ser percebido como evasivo ou sem personalidade por criadores de conteúdo de mainstream que esperam energia e cor.

### O que funciona

- **Hierarquia tonal**: `--text-primary` (`#F2F0EB`) vs `--text-secondary` (55% opacity) vs `--text-tertiary` (30% opacity) cria uma escala de atenção funcional com apenas três passos — limpo e manutenível.
- **O easing `[0.16, 1, 0.3, 1]`** (spring-like cubic bezier) é consistente em todos os componentes — isso já é um motion token implícito. É a assinatura cinética do produto.
- **Superfícies glass com bordas 8%/14% opacity** criam separação sem peso — os cards flutuam sobre o fundo sem box-shadow pesada.
- **Ausência de cor de acento cromático**: toda a paleta é acromática. Isso é audacioso — poucos produtos de conteúdo têm coragem de operar assim.

### O que está faltando

1. **Cor de intenção**: não existe diferenciação visual para estados de sucesso, erro, warning, info. Um produto de IA que gera conteúdo precisa comunicar "gerado com sucesso", "processando", "falha" — atualmente não há tokens para isso.
2. **Acento cromático de identidade**: a paleta acromática é poderosa, mas sem um acento a marca não tem um "momento de cor" memorável. Nenhum detalhe que crie reconhecimento imediato ao scroll.
3. **Escala de tipografia no config**: o `tailwind.config.ts` não registra a escala tipográfica — as classes `.text-display`, `.text-h2`, `.text-h3`, `.text-body` existem apenas no CSS, invisíveis para o sistema Tailwind.
4. **Tokens de radius e shadow**: o `borderRadius` e `boxShadow` não estão definidos no config — os componentes usam valores arbitrários (`border-radius: 8px`, `rounded-full`) sem um sistema de referência.
5. **Personalidade de movimento incompleta**: há animações de entrada bem definidas, mas nenhum padrão declarado para estados de loading, micro-interações de hover, ou transições de página.

---

## 2. Design Tokens Propostos — Paleta de Cores Completa

### Filosofia de cor

O Flowo precisa de uma identidade que viva em dois mundos: a seriedade de uma ferramenta de trabalho (pensa Linear, Notion) e a energia de uma plataforma criativa (pensa Figma, Framer). A solução é um sistema **near-achromatic** com um único acento cromático de alta carga semântica.

A proposta: manter o dark acromático como base, introduzir **índigo-violeta profundo** como acento primário de marca. Não o violeta saturado de produto SaaS genérico — mas um tom que flerta com o escuro, quase mineral.

### Paleta Base (valores hex prontos para implementação)

```
BACKGROUNDS
─────────────────────────────────────────────
bg-void         #050507   — mais profundo que o atual, cria profundidade Z
bg-base         #0a0a0f   — base da página (toque de azul-escuro imperceptível)
bg-surface      #13131a   — cards e modais em contexto claro
bg-elevated     #1a1a24   — elementos sobrepostos, dropdowns

TEXTO
─────────────────────────────────────────────
text-primary    #F2F0EB   — mantém o warm white atual (não muda)
text-secondary  #F2F0EB @ 55% → #9B9891 (equivalente opaco)
text-tertiary   #F2F0EB @ 30% → #5E5C59 (equivalente opaco)
text-disabled   #F2F0EB @ 20% → #3F3E3C

BORDAS
─────────────────────────────────────────────
border-subtle   rgba(255,255,255,0.07)
border-medium   rgba(255,255,255,0.13)
border-strong   rgba(255,255,255,0.22)
border-accent   rgba(110, 86, 207, 0.40)

ACENTO PRIMÁRIO — Índigo Profundo
─────────────────────────────────────────────
primary-50      #f0eeff
primary-100     #e2ddff
primary-200     #c6bbff
primary-300     #a999ff
primary-400     #8c77ff
primary-500     #6e56cf   ← brand token (DEFAULT)
primary-600     #5a40b8
primary-700     #462da0
primary-800     #321b85
primary-900     #1e0d6e
primary-950     #0f0638

ACENTO SECUNDÁRIO — Âmbar Quente (para badges, destaques de copy, ícones de AI)
─────────────────────────────────────────────
amber-400       #fbbf24
amber-500       #f59e0b   ← brand secondary

SUPERFÍCIES GLASS
─────────────────────────────────────────────
glass-surface   rgba(110, 86, 207, 0.06)  — glass com toque do acento
glass-glow      rgba(110, 86, 207, 0.12)  — hover state

ESTADO SEMÂNTICO
─────────────────────────────────────────────
success-base    #22c55e   — green-500 (padrão legível)
success-subtle  rgba(34, 197, 94, 0.10)
warning-base    #f59e0b   — amber-500
warning-subtle  rgba(245, 158, 11, 0.10)
error-base      #ef4444   — red-500
error-subtle    rgba(239, 68, 68, 0.10)
info-base       #6e56cf   — primary (reutiliza o brand token)
info-subtle     rgba(110, 86, 207, 0.10)
```

### Tokens Semânticos (nomes abstraídos da implementação)

```
--color-brand          #6e56cf
--color-brand-muted    rgba(110, 86, 207, 0.15)
--color-brand-glow     rgba(110, 86, 207, 0.25)
--color-surface        rgba(255, 255, 255, 0.04)
--color-surface-hover  rgba(255, 255, 255, 0.07)
--color-on-brand       #F2F0EB   (texto sobre fundo primário)
```

---

## 3. Tipografia — Escala Sugerida

### Decisão de fonte

Manter **Geist** para corpo e código — é a escolha correta tecnicamente e alinha com o posicionamento de produto técnico. Introduzir uma fonte de display opcional para headings maiores seria um upgrade de identidade — proposta: **Cal Sans** (open-source, usada pelo Cal.com) ou continuar com Geist em peso variável. Recomendação: Geist com variação de weight (não adicionar uma segunda família agora — custo de carregamento não justifica no estágio atual).

### Escala Tipográfica

| Token       | font-size         | line-height | font-weight | letter-spacing | Uso                               |
|-------------|-------------------|-------------|-------------|----------------|-----------------------------------|
| display-2xl | clamp(3.5rem, 7vw, 6rem)   | 1.05        | 700         | -0.03em        | Headline único acima-do-fold      |
| display-xl  | clamp(2.5rem, 5vw, 4.5rem) | 1.08        | 700         | -0.025em       | Hero principal (uso atual)        |
| display-lg  | clamp(2rem, 4vw, 3.5rem)   | 1.10        | 600         | -0.02em        | Título de seção principal         |
| heading-xl  | clamp(1.5rem, 2.5vw, 2.5rem)| 1.15       | 600         | -0.02em        | H2 de seção                       |
| heading-lg  | clamp(1.25rem, 2vw, 1.875rem)| 1.2       | 600         | -0.01em        | H3, título de card                |
| heading-md  | 1.25rem (20px)    | 1.3         | 500         | -0.01em        | Label de grupo, título inline     |
| body-lg     | 1.0625rem (17px)  | 1.65        | 400         | 0              | Corpo longo (artigos, FAQs)       |
| body-base   | 0.9375rem (15px)  | 1.6         | 400         | 0              | Corpo padrão (uso atual)          |
| body-sm     | 0.875rem (14px)   | 1.55        | 400         | 0              | Labels, descrições                |
| caption     | 0.8125rem (13px)  | 1.5         | 400         | 0.01em         | Metadados, timestamps             |
| label-sm    | 0.75rem (12px)    | 1.4         | 500         | 0.04em         | Badges, tags (uppercase)          |
| mono-base   | 0.875rem (14px)   | 1.6         | 400         | 0              | Código inline, valores técnicos   |

### Nota sobre o wordmark

O wordmark "flowo" em weight 300 / letter-spacing 0.10em não pertence à escala tipográfica — é um token isolado de identidade. Não usar essa combinação em nenhum outro elemento da interface (reservado exclusivamente para o logo).

---

## 4. Motion Design Principles

### Princípio 1 — Spring Natural, Não Mecânico

Todo movimento de entrada usa a curva `[0.16, 1, 0.3, 1]` (já estabelecida no código). Essa curva imita a física de uma mola com amortecimento — o elemento entra com energia e "pousa" suavemente. Nunca usar `linear` para movimentos visíveis ao usuário.

- Easing padrão: `cubic-bezier(0.16, 1, 0.3, 1)`
- Duração de entrada: `280ms – 480ms` (mais curto = mais responsivo)
- Duração de saída: `160ms – 240ms` (saídas sempre mais rápidas que entradas)

### Princípio 2 — Stagger como Narrativa

Quando múltiplos elementos entram juntos (listas, cards de features, itens de pricing), o stagger comunica que cada item é um pensamento distinto, não uma lista genérica. O delay entre itens deve ser perceptível mas não tedioso.

- Stagger delay: `60ms – 80ms` entre itens (não mais que 100ms)
- Offset de entrada: `translateY(16px – 24px)` — pequeno o suficiente para ser fluido, grande o suficiente para ser percebido

### Princípio 3 — Micro-interações com Estado

Hover, focus e active nunca são apenas mudanças de cor. Cada estado interativo deve ter um micro-movimento de `1px – 2px` no eixo Y (elevação) ou uma transição de `opacity + border-color` simultânea. Duração: `150ms – 200ms ease-out`.

- Hover de botão primário: `translateY(-1px)` + `opacity: 0.92` (já implementado)
- Hover de card glass: `translateY(-2px)` + `border-color` step-up
- Focus visible: ring `2px` com cor `--color-brand` + `outline-offset: 3px`

### Princípio 4 — Scroll Reveal com Inércia

Elementos revelados por scroll usam `whileInView` do Framer Motion com `viewport: { once: true, margin: "-80px" }`. O viewport margin de `-80px` garante que o elemento já está parcialmente visível quando a animação começa — o usuário sente que "descobriu" o conteúdo, não que ele "apareceu".

- Entrada por scroll: `opacity: 0 → 1` + `translateY(20px → 0)`
- Duração: `400ms`
- Easing: `[0.16, 1, 0.3, 1]`

### Princípio 5 — Glow como Comunicação de Estado

O `glow-pulse` atual é usado apenas no botão CTA principal. Expandir: qualquer elemento em estado "ativo" ou "processando" usa uma variante de glow. Estados de AI working (quando o produto está gerando conteúdo) devem ter um glow com a cor do acento primário — não branco.

- Glow idle (CTA): `rgba(242, 240, 235, 0.08)` — warm white (atual)
- Glow brand (AI active): `rgba(110, 86, 207, 0.20)` — violeta
- Glow success: `rgba(34, 197, 94, 0.15)` — verde
- Pulse duration: `2s ease-in-out infinite`

---

## 5. Logo e Wordmark — Direções de Evolução

### Estado Atual

```
"flowo"
font: Geist Sans
weight: 300
letter-spacing: 0.10em
color: rgba(242, 240, 235, 0.25) — idle
       rgba(242, 240, 235, 0.55) — hover
```

O wordmark atual é intencionalmente etéreo. Isso funciona na navbar como elemento de navegação que "não compete" com o conteúdo. Mas é insuficiente como representação de marca em materiais externos (OG images, social media, app icon).

### Direção A — Refinamento do Atual (menor risco)

Manter o wordmark tipográfico mas introduzir variações de contexto:

- **Wordmark padrão (navbar)**: "flowo" weight 300, opacity 25-55% — mantém o atual
- **Wordmark expandido (hero, OG image)**: "flowo" weight 400, opacity 100%, cor `#F2F0EB`
- **Wordmark com acento**: "flow" em weight 300 + "o" em weight 300 com cor `#6e56cf` — o "o" se torna um momento de cor. O círculo do "o" como metáfora de loop, fluxo contínuo.

### Direção B — Símbolo + Wordmark

Criar um símbolo independente para contextos onde o wordmark não cabe (favicons, app icons, notificações).

Proposta de símbolo: **dois arcos sobrepostos em rotação**, evocando fluxo/loop. Construído a partir da letra "o" estilizada — conexão direta com o final do nome. Em SVG puro, sem gradiente (funciona em todos os tamanhos).

- Símbolo isolado: para favicon 32×32, app icon 512×512
- Lockup horizontal: símbolo + "flowo" — para OG images, email headers
- Lockup empilhado: símbolo acima de "flowo" — para splash screens, apresentações

### Direção C — Wordmark Geométrico (maior mudança)

Redesenhar as letras do wordmark como um sistema geométrico custom — não uma fonte existente. O "w" central se torna o símbolo da marca (a forma de onda natural do "w" evoca wave/flow). Direção de maior investimento, melhor retorno de reconhecimento a longo prazo.

### Regras de Uso Mínimo/Máximo

- **Tamanho mínimo**: wordmark não deve aparecer abaixo de `12px` (contexto de texto) ou `24px` (contexto de identidade)
- **Clear space**: espaço livre mínimo ao redor do wordmark equivalente à altura da letra "o"
- **Nunca**: esticar, rotacionar, adicionar sombra projetada, usar sobre fundos coloridos sem versão específica para esse contexto

---

## 6. Mood Board Conceitual — 3 Direções Visuais

### Direção 1 — "Void Studio"

**Conceito**: O vazio como luxo. Inspirado em Linear.app, Rauno Fröberg's work, e o design interno da Apple. A marca quase não existe — o produto é o protagonista absoluto.

**Cores**:
- Background: `#050507` (quase preto, com micropigmento azul)
- Superfícies: glass acromático, sem cor de acento
- Texto: `#F2F0EB` — o único elemento "quente" da paleta

**Texturas**: dot grid de `1px` em 4% de opacidade. Gradientes radiais brancos em 2-3% de opacidade. Absolutamente nenhuma textura granulada, nenhum noise.

**Referências estéticas**: Linear.app, Vercel.com (v2023), Liveblocks.io

**Vantagem**: posicionamento premium imediato, sem esforço de justificativa
**Risco**: pode parecer fria demais para o público de criadores de conteúdo, que busca energia

**Evolução sobre o atual**: mínima. Refinamento de valores existentes, introdução de `bg-void #050507`.

---

### Direção 2 — "Creative Flux" (recomendada)

**Conceito**: Onde a precisão técnica encontra a expressão criativa. O fundo permanece escuro, mas um acento violeta-índigo pulsa nos momentos de interação. A tipografia ganha um pouco mais de peso e personalidade. O sistema vibra de forma controlada.

**Cores**:
- Background: `#0a0a0f` (base com toque azul-escuro)
- Acento primário: `#6e56cf` (índigo profundo) — aparece em CTAs, glows, focus rings, ícones de AI
- Acento secundário: `#f59e0b` (âmbar) — aparece em badges de destaque, preço especial, "novo"
- Superfícies: glass com `rgba(110, 86, 207, 0.06)` no hover

**Texturas**: ondas SVG animadas no hero (WavyBackground mantido, mas com `rgba(110, 86, 207, 0.12)` como uma das cores de onda). Dot grid sutil nas seções internas.

**Referências estéticas**: Framer.com, Resend.com, Raycast.com

**Vantagem**: mantém o DNA atual, adiciona memorabilidade e diferenciação. O violeta é incomum no espaço de content creation (Instagram usa laranja, TikTok usa vermelho/preto) — a Flowo se diferencia.
**Risco**: exige disciplina para não deixar o acento proliferar — precisa aparecer em momentos específicos, não em todo lugar.

**Evolução sobre o atual**: moderada. Introdução do acento, ajuste sutil do fundo, expansão do sistema de tokens.

---

### Direção 3 — "Warm Dark"

**Conceito**: Dark mode, mas com acolhimento. O "warm white" `#F2F0EB` existente se expande para infectar suavemente os backgrounds — em vez de preto frio, um quase-preto com tom sépia/café muito baixo. Remete a papel de carta premium, editorial de nicho, zines de design.

**Cores**:
- Background: `#0c0b09` (preto com tom amarelado imperceptível)
- Superfície: `rgba(242, 235, 220, 0.04)` (warm white com low opacity — mais quente que o atual)
- Texto: `#F5F0E8` (ligeiramente mais quente que o atual)
- Acento: `#c9a96e` (ouro envelhecido — não dourado brilhante, mas âmbar fosco)
- Bordas: `rgba(242, 235, 220, 0.09)` — levemente mais quentes que branco puro

**Texturas**: noise grain suave (3-4% de opacidade) aplicado como pseudo-elemento no body. Cria profundidade sem peso. Ondas com tons warm.

**Referências estéticas**: Are.na, Craft.do (dark), publicações Substack premium

**Vantagem**: único no espaço de ferramentas de IA para criadores — mais humano, mais editorial, less "tech company"
**Risco**: o grain pode performar mal em telas de baixa qualidade. O tom sépia pode parecer datado se não executado com precisão milimétrica.

**Evolução sobre o atual**: significativa. Mudança de temperatura da paleta inteira.

---

## 7. Design Tokens para Tailwind — Configuração Sugerida

Baseado na Direção 2 "Creative Flux" como recomendação principal. Valores prontos para copiar.

```typescript
// tailwind.config.ts — proposta completa

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          void:     '#050507',
          base:     '#0a0a0f',
          surface:  '#13131a',
          elevated: '#1a1a24',
        },
        // Texto (valores opacos para Tailwind — usar CSS vars para rgba)
        text: {
          primary:   '#F2F0EB',
          secondary: '#9B9891',
          tertiary:  '#5E5C59',
          disabled:  '#3F3E3C',
        },
        // Acento Primário — Índigo
        primary: {
          50:       '#f0eeff',
          100:      '#e2ddff',
          200:      '#c6bbff',
          300:      '#a999ff',
          400:      '#8c77ff',
          DEFAULT:  '#6e56cf',   // 500
          600:      '#5a40b8',
          700:      '#462da0',
          800:      '#321b85',
          900:      '#1e0d6e',
          950:      '#0f0638',
        },
        // Acento Secundário — Âmbar
        secondary: {
          DEFAULT: '#f59e0b',
          400:     '#fbbf24',
          600:     '#d97706',
        },
        // Neutros (para bordas, divisores)
        neutral: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Semânticos
        success: {
          DEFAULT: '#22c55e',
          subtle:  'rgba(34, 197, 94, 0.10)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          subtle:  'rgba(245, 158, 11, 0.10)',
        },
        error: {
          DEFAULT: '#ef4444',
          subtle:  'rgba(239, 68, 68, 0.10)',
        },
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },

      fontSize: {
        // Escala fixa (complementa os clamp() do CSS)
        'xs':   ['0.75rem',   { lineHeight: '1.4', letterSpacing: '0.04em' }],
        'sm':   ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['0.9375rem', { lineHeight: '1.6' }],
        'md':   ['1rem',      { lineHeight: '1.6' }],
        'lg':   ['1.0625rem', { lineHeight: '1.65' }],
        'xl':   ['1.25rem',   { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '2xl':  ['1.5rem',    { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        '3xl':  ['1.875rem',  { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl':  ['2.25rem',   { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '5xl':  ['3rem',      { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl':  ['3.75rem',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '7xl':  ['4.5rem',    { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },

      fontWeight: {
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
      },

      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.02em',
        snug:    '-0.01em',
        normal:  '0',
        wide:    '0.02em',
        wider:   '0.05em',
        widest:  '0.10em',   // wordmark token
      },

      borderRadius: {
        none:    '0',
        sm:      '4px',
        DEFAULT: '6px',
        md:      '8px',
        lg:      '12px',
        xl:      '16px',
        '2xl':   '20px',
        '3xl':   '24px',
        full:    '9999px',
      },

      boxShadow: {
        // Sombras para dark mode (mais sutis, baseadas em blur)
        'sm':      '0 1px 2px rgba(0, 0, 0, 0.4)',
        DEFAULT:   '0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'md':      '0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4)',
        'lg':      '0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.4)',
        'xl':      '0 16px 48px rgba(0, 0, 0, 0.7)',
        // Glow de marca
        'glow-sm': '0 0 8px 2px rgba(110, 86, 207, 0.15)',
        'glow':    '0 0 16px 4px rgba(110, 86, 207, 0.20)',
        'glow-lg': '0 0 32px 8px rgba(110, 86, 207, 0.25)',
        // Glow de estado
        'glow-success': '0 0 16px 4px rgba(34, 197, 94, 0.20)',
        'glow-error':   '0 0 16px 4px rgba(239, 68, 68, 0.20)',
        // Inner edge (glass)
        'inner-subtle': 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'inner-medium': 'inset 0 0 0 1px rgba(255, 255, 255, 0.11)',
      },

      backdropBlur: {
        xs:  '4px',
        sm:  '8px',
        DEFAULT: '12px',
        md:  '16px',
        lg:  '20px',
        xl:  '32px',
      },

      spacing: {
        // Base 4px — escala 4n até 24, depois 8n
        '0.5': '2px',
        '1':   '4px',
        '1.5': '6px',
        '2':   '8px',
        '2.5': '10px',
        '3':   '12px',
        '4':   '16px',
        '5':   '20px',
        '6':   '24px',
        '8':   '32px',
        '10':  '40px',
        '12':  '48px',
        '14':  '56px',
        '16':  '64px',
        '20':  '80px',
        '24':  '96px',
        '32':  '128px',
        '40':  '160px',
        '48':  '192px',
        '64':  '256px',
      },

      animation: {
        // Existentes (mantidos)
        'spotlight':   'spotlight 2.5s ease 0.5s 1 forwards',
        'bg-drift':    'bg-drift 18s ease-in-out infinite alternate',
        'fade-up':     'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':     'fade-in 0.4s ease-out forwards',
        'pulse-glow':  'pulse-glow 2s ease-in-out infinite',
        'float':       'float 1.2s ease-in-out infinite',
        'count-line':  'count-line 1.5s ease-out forwards',
        'draw-line':   'draw-line 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        // Novos
        'fade-down':   'fade-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in':    'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer':     'shimmer 1.8s linear infinite',
        'spin-slow':   'spin 3s linear infinite',
        'brand-pulse': 'brand-pulse 2s ease-in-out infinite',
      },

      transitionTimingFunction: {
        'spring':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'soft-out':   'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'soft-in':    'cubic-bezier(0.4, 0.0, 1, 1)',
        'soft-inout': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },

      transitionDuration: {
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 8. Component Tokens — Cards, Botões, Inputs, Badges

### Cards

```
card-bg               rgba(255, 255, 255, 0.04)
card-bg-hover         rgba(255, 255, 255, 0.07)
card-bg-elevated      rgba(255, 255, 255, 0.06)
card-border           rgba(255, 255, 255, 0.08)
card-border-hover     rgba(255, 255, 255, 0.14)
card-border-accent    rgba(110, 86, 207, 0.30)
card-radius           12px  (radius-lg)
card-padding-sm       16px  (space-4)
card-padding-base     24px  (space-6)
card-padding-lg       32px  (space-8)
card-shadow           0 2px 8px rgba(0,0,0,0.5)
card-shadow-hover     0 8px 32px rgba(0,0,0,0.6)
card-transition       all 200ms cubic-bezier(0.16, 1, 0.3, 1)
```

### Botões

```
PRIMÁRIO (brand CTA)
btn-primary-bg        #6e56cf
btn-primary-bg-hover  #5a40b8
btn-primary-fg        #F2F0EB
btn-primary-radius    8px
btn-primary-padding   12px 24px
btn-primary-height-sm 32px
btn-primary-height    40px
btn-primary-height-lg 48px
btn-primary-font-size 14px / font-weight 600
btn-primary-shadow    0 0 16px 4px rgba(110,86,207,0.20)

SECUNDÁRIO / GHOST (atual btn-ghost)
btn-ghost-bg          rgba(255,255,255,0.05)
btn-ghost-bg-hover    rgba(255,255,255,0.10)
btn-ghost-border      rgba(255,255,255,0.14)
btn-ghost-border-hover rgba(255,255,255,0.22)
btn-ghost-fg          #F2F0EB
btn-ghost-radius      8px
btn-ghost-padding     12px 24px
btn-ghost-font-size   14px / font-weight 500

OUTLINE BRAND (novo — para ações secundárias de marca)
btn-outline-border    rgba(110,86,207,0.50)
btn-outline-border-hover rgba(110,86,207,0.80)
btn-outline-bg        transparent
btn-outline-bg-hover  rgba(110,86,207,0.08)
btn-outline-fg        #a999ff (primary-300)
btn-outline-radius    8px

DESTRUTIVO
btn-destructive-bg    rgba(239,68,68,0.12)
btn-destructive-bg-hover rgba(239,68,68,0.20)
btn-destructive-fg    #ef4444
btn-destructive-border rgba(239,68,68,0.30)

DISABLED (todos os variants)
btn-disabled-opacity  0.38
btn-disabled-cursor   not-allowed
```

### Inputs

```
input-bg              rgba(255,255,255,0.04)
input-bg-focus        rgba(255,255,255,0.06)
input-border          rgba(255,255,255,0.10)
input-border-hover    rgba(255,255,255,0.18)
input-border-focus    rgba(110,86,207,0.60)
input-border-error    rgba(239,68,68,0.60)
input-ring-focus      0 0 0 3px rgba(110,86,207,0.20)
input-ring-error      0 0 0 3px rgba(239,68,68,0.15)
input-fg              #F2F0EB
input-placeholder     rgba(242,240,235,0.30)
input-label-fg        rgba(242,240,235,0.70)
input-radius          8px
input-padding         10px 14px
input-height          40px
input-height-sm       32px
input-height-lg       48px
input-font-size       14px
input-transition      border-color 150ms ease, box-shadow 150ms ease
```

### Badges / Pills

```
NEUTRO (atual)
badge-bg              rgba(255,255,255,0.05)
badge-border          rgba(255,255,255,0.09)
badge-fg              rgba(242,240,235,0.55)
badge-radius          6px
badge-padding         5px 12px
badge-font-size       12px / font-weight 500

BRAND
badge-brand-bg        rgba(110,86,207,0.12)
badge-brand-border    rgba(110,86,207,0.25)
badge-brand-fg        #a999ff

SUCCESS
badge-success-bg      rgba(34,197,94,0.10)
badge-success-border  rgba(34,197,94,0.20)
badge-success-fg      #4ade80

WARNING
badge-warning-bg      rgba(245,158,11,0.10)
badge-warning-border  rgba(245,158,11,0.20)
badge-warning-fg      #fbbf24

ERROR
badge-error-bg        rgba(239,68,68,0.10)
badge-error-border    rgba(239,68,68,0.20)
badge-error-fg        #f87171

TAMANHO
badge-size-sm         padding: 3px 8px / font: 11px
badge-size-base       padding: 5px 12px / font: 12px
badge-size-lg         padding: 6px 14px / font: 13px
```

---

## Resumo de Decisões para Implementação

| Decisão | Valor | Justificativa |
|---------|-------|---------------|
| Acento primário | `#6e56cf` | Único no espaço de content creation, evoca AI/tech sem ser clichê |
| Fundo base | `#0a0a0f` (ajuste mínimo do atual `#0a0a0a`) | Adiciona micro-temperatura fria que harmoniza com o violeta |
| Wordmark hover | `rgba(242,240,235,0.65)` (ajuste do atual 55%) | Mais contraste, mais responsividade percebida |
| Border radius padrão de card | `12px` | Nem arredondado demais (infantil), nem reto (frio) |
| Easing único | `cubic-bezier(0.16, 1, 0.3, 1)` | Já estabelecido — não mudar, apenas nomear como token |
| Stagger delay | `60ms` entre itens de lista | Perceptível sem ser lento |
| Fonte de display | Geist (mantém) | Custo de segunda família não justificado agora |
| Grain/noise | Não implementar na Direção 2 | Preserva a limpeza técnica do sistema atual |

---

*Este documento deve ser consultado antes de qualquer decisão de design no Flowo. Os valores de token são propostos — validar contrastes WCAG AA (mínimo 4.5:1 para texto) antes de implementar em produção.*
