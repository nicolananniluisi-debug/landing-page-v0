import type { Metadata } from 'next'
import { PT_Sans, PT_Sans_Caption } from 'next/font/google'
import './globals.css'

const ptSans = PT_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-pt-sans',
  display: 'swap',
})

const ptSansCaption = PT_Sans_Caption({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pt-sans-caption',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'flowo — Seu próximo mês de conteúdo, pronto em 10 minutos',
  description:
    'Crie roteiros, legendas e vídeos para Instagram, TikTok e YouTube com IA. Mais de 5.000 criadores ativos. Comece grátis por 7 dias.',
  keywords: [
    'criação de conteúdo com IA',
    'conteúdo para redes sociais',
    'gerador de legendas',
    'roteiro com IA',
    'conteúdo para criadores',
  ],
  openGraph: {
    title: 'flowo — Seu próximo mês de conteúdo, pronto em 10 minutos',
    description: 'Crie roteiros, legendas e vídeos com IA. Sem complicação.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'flowo — Conteúdo com IA para criadores',
    description: 'Crie roteiros, legendas e vídeos com IA. Sem complicação.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${ptSans.variable} ${ptSansCaption.variable}`}>
      <body>{children}</body>
    </html>
  )
}
