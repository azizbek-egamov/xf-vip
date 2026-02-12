'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    // On mobile, close menu first
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    const element = document.getElementById(id)
    if (element) {
      // Small delay on mobile to let the menu start closing and layout stabilize
      const delay = mobileMenuOpen ? 100 : 0
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, delay)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded flex items-center justify-center neon-border">
              <span className="font-heading font-bold text-white text-sm md:text-base">XF</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-base md:text-lg text-white">
                XF VIP TEAM
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground">Prop Trading Elite</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Jamoa haqida
            </button>
            <button
              onClick={() => scrollToSection('formats')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Formatlar
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Jamoa
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Statistika
            </button>
            <Button
              onClick={() => scrollToSection('waitlist')}
              className="bg-primary hover:bg-primary/90 text-white neon-border"
            >
              Qo'shilish
            </Button>
          </nav>

          {/* Mobile Menu Button with morph animation */}
          <motion.button
            className="md:hidden text-foreground relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute"
              animate={mobileMenuOpen ? 'open' : 'closed'}
            >
              <motion.span
                className="block w-6 h-0.5 bg-foreground absolute"
                variants={{
                  closed: { rotate: 0, y: -6 },
                  open: { rotate: 45, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-foreground absolute"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.4 }}
              />
              <motion.span
                className="block w-6 h-0.5 bg-foreground absolute"
                variants={{
                  closed: { rotate: 0, y: 6 },
                  open: { rotate: -45, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation with slide animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="md:hidden py-4 space-y-4 border-t border-border/50 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                { id: 'about', label: 'Jamoa haqida' },
                { id: 'formats', label: 'Formatlar' },
                { id: 'team', label: 'Jamoa' },
                { id: 'stats', label: 'Statistika' }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Button
                  onClick={() => scrollToSection('waitlist')}
                  className="w-full bg-primary hover:bg-primary/90 text-white neon-border"
                >
                  Qo'shilish
                </Button>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
