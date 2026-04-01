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
        'bg-base':     '#0F0F0F',
        'bg-surface':  '#1E1A1A',
        'bg-divider':  '#2A2420',
        // Brand — Coral scale
        'coral-deep':    '#4A0F00',  // CTA principal
        'coral-mid':     '#851D00',  // elementos secundários
        'coral-burnt':   '#C23010',  // hover, tags, categorias
        'coral-vivid':   '#FF6030',  // destaque máximo
        // Text
        'text-warm':   '#FFEBE6',
      },
      fontFamily: {
        sans:    ['var(--font-pt-sans)', 'system-ui', 'sans-serif'],
        caption: ['var(--font-pt-sans-caption)', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'spotlight':   'spotlight 2.5s ease 0.5s 1 forwards',
        'bg-drift':    'bg-drift 18s ease-in-out infinite alternate',
        'fade-up':     'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':     'fade-in 0.4s ease-out forwards',
        'pulse-glow':  'pulse-glow 2s ease-in-out infinite',
        'wiggle':      'wiggle 1.5s ease-in-out infinite',
        'float':       'float 1.2s ease-in-out infinite',
        'count-line':  'count-line 1.5s ease-out forwards',
        'draw-line':   'draw-line 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'bg-drift': {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '50%':  { transform: 'translate(12px, -8px) scale(1.02)' },
          '100%': { transform: 'translate(-8px, 12px) scale(0.99)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':      { transform: 'rotate(3deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
        'count-line': {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        'draw-line': {
          '0%':   { strokeDashoffset: '500' },
          '100%': { strokeDashoffset: '0' },
        },
        'spotlight': {
          '0%':   { opacity: '0', transform: 'translate(-72%, -62%) skewX(-30deg)' },
          '35%':  { opacity: '1', transform: 'translate(-50%, -40%) skewX(-30deg)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -40%) skewX(-30deg)' },
        },
      },
      screens: {
        sm:  '640px',
        md:  '768px',
        lg:  '1024px',
        xl:  '1280px',
      },
    },
  },
  plugins: [],
}

export default config
