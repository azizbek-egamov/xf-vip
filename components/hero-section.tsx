'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Shield, Users, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StarfieldBackground } from './starfield-background'

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    {
      icon: TrendingUp,
      title: 'Professional Trading',
      description: 'Yuqori darajali trading strategiyalar'
    },
    {
      icon: Shield,
      title: 'To\'liq Shaffoflik',
      description: 'Barcha natijalar ochiq va haqiqiy'
    },
    {
      icon: Users,
      title: 'Eksklyuziv Jamoa',
      description: 'Cheklangan a\'zolik va individual yondashuv'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <StarfieldBackground />
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 0, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 py-12 md:py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6"
          >
            <div className="glass px-4 py-2 rounded-full border border-primary/30 pulse-soft">
              <span className="text-sm font-medium" style={{ color: '#ff4d4d' }}>
                🔥 Cheklangan o'rinlar mavjud
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight text-balance"
          >
            <motion.span 
              className="metal-text block mb-2"
              initial={{ filter: 'blur(10px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              XF VIP TEAM
            </motion.span>
            <motion.span 
              className="neon-glow block relative"
              initial={{ filter: 'blur(10px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Eksklyuziv Prop Trading
              <motion.span
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-pretty"
          >
            Professional prop trading jamoasiga qo'shiling. To'liq shaffoflik, haqiqiy natijalar va 
            individual yondashuv bilan muvaffaqiyatga erishing.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('vip-entry')}
                className="bg-primary hover:bg-primary/90 text-white text-base px-8 py-6 neon-border neon-border-hover font-semibold glow-pulse"
              >
                VIP Kirish - $77
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('waitlist')}
                className="border-primary/50 text-foreground hover:bg-primary/10 text-base px-8 py-6"
              >
                Kutish ro'yxatiga qo'shilish
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="glass p-6 rounded-lg float-animation"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <feature.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-heading font-semibold text-lg mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={() => scrollToSection('about')}
            className="mt-12 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm">Batafsil ma'lumot</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
