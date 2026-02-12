'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormatFeature {
  text: string
  included: boolean
}

interface Format {
  name: string
  price: string
  description: string
  features: FormatFeature[]
  popular?: boolean
}

export function FormatsSection() {
  const formats: Format[] = [
    {
      name: 'Format A',
      price: 'Asosiy',
      description: 'Boshlang\'ich darajadagi treyderlarga mos',
      features: [
        { text: 'Kunlik trade signallari', included: true },
        { text: 'Asosiy trade strategiyalar', included: true },
        { text: 'Haftalik tahlillar', included: true },
        { text: 'Guruh chat doʻstup', included: true },
        { text: 'Individual konsultatsiya', included: false },
        { text: 'VIP kontent', included: false },
      ],
    },
    {
      name: 'Format B',
      price: 'Professional',
      description: 'O\'rta darajadagi treyderlarga mos',
      features: [
        { text: 'Kunlik trade signallari', included: true },
        { text: 'Pro trade strategiyalar', included: true },
        { text: 'Kunlik tahlillar', included: true },
        { text: 'Guruh chat do\'stup', included: true },
        { text: 'Individual konsultatsiya (haftasiga 1 marta)', included: true },
        { text: 'VIP kontent (cheklangan)', included: true },
      ],
      popular: true,
    },
    {
      name: 'Format C',
      price: 'VIP Elite',
      description: 'Yuqori darajadagi treyderlarga mos',
      features: [
        { text: 'Prioritet trade signallari', included: true },
        { text: 'Elite trade strategiyalar', included: true },
        { text: 'Doimiy tahlillar va yangilanishlar', included: true },
        { text: 'VIP guruh chat', included: true },
        { text: 'Individual konsultatsiya (cheksiz)', included: true },
        { text: 'To\'liq VIP kontent', included: true },
      ],
    },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  return (
    <section id="formats" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="font-heading font-black text-3xl md:text-5xl mb-4 text-balance">
            <span className="neon-glow">Trading Formatlar</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            O'zingizga mos formatni tanlang va professional trading jamoasiga qo'shiling
          </p>
        </motion.div>

        {/* Formats Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-8 lg:px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {formats.map((format, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className={`relative ${format.popular
                  ? 'glass-strong border-2 border-primary/50 neon-border neon-border-hover lg:-mt-4 lg:mb-4'
                  : 'glass border border-border hover:border-primary/30'
                } rounded-lg p-6 md:p-8 transition-all duration-400 max-w-md mx-auto lg:max-w-none w-full`}
            >
              {/* Popular Badge with pulse */}
              {format.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div
                    className="bg-primary px-4 py-1 rounded-full flex items-center gap-1 neon-border pulse-soft"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold text-white">Eng mashhur</span>
                  </motion.div>
                </div>
              )}

              {/* Format Header */}
              <div className="text-center mb-6">
                <h3 className="font-heading font-bold text-2xl mb-2 text-white">
                  {format.name}
                </h3>
                <div className="text-3xl font-bold mb-2">
                  <span className="text-primary neon-glow">{format.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {format.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-start gap-3 text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                  >
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.included ? 'text-primary' : 'text-muted-foreground/50'
                        }`}
                    />
                    <span className={feature.included ? '' : 'line-through'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => scrollToSection('vip-entry')}
                  className={`w-full ${format.popular
                      ? 'bg-primary hover:bg-primary/90 text-white neon-border'
                      : 'bg-secondary hover:bg-secondary/90 text-foreground'
                    }`}
                >
                  Tanlash
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          Barcha formatlar uchun narxlar va batafsil shartlar VIP kirish jarayonida ko'rsatiladi.
          VIP a'zolik to'lovi $77 bir martalik to'lov hisoblanadi.
        </motion.p>
      </div>
    </section>
  )
}
