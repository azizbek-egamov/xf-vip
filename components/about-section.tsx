'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Shield, Users } from 'lucide-react'

export function AboutSection() {
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

  const highlights = [
    {
      icon: Target,
      title: 'Aniq Maqsad',
      description: 'Har bir a\'zoga individual yondashuv va professional yo\'l-yo\'riq'
    },
    {
      icon: TrendingUp,
      title: 'Haqiqiy Natijalar',
      description: 'Barcha trade natijalari ochiq va tekshirilgan'
    },
    {
      icon: Shield,
      title: 'Mas\'uliyat',
      description: 'To\'liq shaffoflik va javobgarlik har bir qadam'
    },
    {
      icon: Users,
      title: 'Eksklyuziv',
      description: 'Cheklangan a\'zolik va sifatli qo\'llab-quvvatlash'
    }
  ]

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading font-black text-3xl md:text-5xl mb-6 text-balance">
              <span className="metal-text">XF VIP</span>
              <br />
              <span className="neon-glow">Nima uchun Biz?</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                XF VIP - bu faqat signallar emas, balki to'liq professional trading tajribasi.
                Biz har bir a'zoga individual yondashamiz va haqiqiy natijalar bilan ishlaymiz.
              </p>
              <p className="text-pretty">
                Bizning jamoamiz prop trading sohasida katta tajribaga ega bo'lgan professionallardan iborat.
                Biz har bir trade, har bir qaror va har bir natijani to'liq shaffof tarzda baham ko'ramiz.
              </p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass p-6 rounded-lg text-center hover:glass-strong transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10 border border-primary/30">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-white">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Risk Warning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 glass-strong p-6 rounded-lg border-l-4 border-primary"
          >
            <h4 className="font-heading font-semibold text-lg mb-3 text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Muhim Ogohlantirish
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                Trading yuqori darajada xavfli faoliyat hisoblanadi. Siz sarmoyangizning bir qismini yoki
                to'liq miqdorini yo'qotishingiz mumkin.
              </p>
              <p>
                XF VIP hech qanday foyda kafolati bermaydi. Biz faqat professional yo'l-yo'riq,
                strategiyalar va ta'lim taqdim etamiz.
              </p>
              <p>
                Iltimos, faqat yo'qotishga qodir bo'lgan mablag'lar bilan trading qiling. Barcha qarorlar
                va ularning natijalari sizning mas'uliyatingizda.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
