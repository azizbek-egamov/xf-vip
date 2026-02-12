'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FormatsSection } from '@/components/formats-section'
import { TeamSection } from '@/components/team-section'
import { StatsSection } from '@/components/stats-section'
import { VipEntrySection } from '@/components/vip-entry-section'
import { WaitlistSection } from '@/components/waitlist-section'
import { Footer } from '@/components/footer'
import { LoadingScreen } from '@/components/loading-screen'
import { MerchSection } from '@/components/merch-section'

export default function Page() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a short delay (shorter than the loader duration)
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <LoadingScreen />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Header />
            <main>
              <HeroSection />
              <AboutSection />
              <FormatsSection />
              <TeamSection />
              <StatsSection />
              <MerchSection />
              <VipEntrySection />
              <WaitlistSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
