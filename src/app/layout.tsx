import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'ContentAI — Seu próximo mês de conteúdo, pronto em 10 minutos',
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
    title: 'ContentAI — Seu próximo mês de conteúdo, pronto em 10 minutos',
    description: 'Crie roteiros, legendas e vídeos com IA. Sem complicação.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentAI — Conteúdo com IA para criadores',
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
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
