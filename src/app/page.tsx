import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Pain from '@/components/Pain'
import Solution from '@/components/Solution'
import Steps from '@/components/Steps'
import SocialProof from '@/components/SocialProof'
import Cases from '@/components/Cases'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pain />
        <Solution />
        <Steps />
        <SocialProof />
        <Cases />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
