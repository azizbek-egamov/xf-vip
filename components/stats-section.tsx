'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Stat {
  label: string
  value: string
  suffix: string
  icon: React.ElementType
  color: string
}

function CountUpNumber({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / (duration * 1000), 1)
      
      setCount(Math.floor(end * percentage))
      
      if (percentage < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count}</span>
}

export function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const stats: Stat[] = [
    {
      label: 'Faol A\'zolar',
      value: '100',
      suffix: '+',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      label: 'O\'rtacha Growth',
      value: '15',
      suffix: '%',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      label: 'Oylik Volume',
      value: '250',
      suffix: 'K+',
      icon: DollarSign,
      color: 'text-yellow-500'
    },
    {
      label: 'Win Rate',
      value: '65',
      suffix: '%',
      icon: Target,
      color: 'text-primary'
    }
  ]

  return (
    <section id="stats" className="py-16 md:py-24 relative">
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
            <span className="neon-glow">Bizning Natijalarimiz</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Haqiqiy raqamlar va statistika - to'liq shaffoflik bilan
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="glass p-6 rounded-lg text-center hover:glass-strong transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10 border border-primary/30`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="font-heading font-black text-4xl mb-2 text-white">
                <CountUpNumber end={parseInt(stat.value)} />
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong p-6 md:p-8 rounded-lg">
            <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 text-white text-center">
              Performance Haqida
            </h3>
            <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                Yuqorida ko'rsatilgan statistikalar bizning jamoamizning umumiy natijalarini aks ettiradi. 
                Bu raqamlar o'tmish natijalar bo'lib, kelajakdagi natijalar uchun kafolat emas.
              </p>
              <p>
                Har bir treyderning natijalari turlicha bo'ladi va ko'pgina omillarga bog'liq: 
                tajriba, risk management, psixologik holat va bozor sharoitlari.
              </p>
              <p className="text-primary font-semibold">
                Eslatma: Trading yuqori xavfli faoliyat. O'tmish natijalari kelajak uchun kafolat emas.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
