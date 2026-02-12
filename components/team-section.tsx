'use client'

import { motion } from 'framer-motion'
import { Award, TrendingUp, Users, MessageSquare } from 'lucide-react'

export function TeamSection() {
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

  const teamMembers = [
    {
      name: 'Jamoamiz',
      role: 'Professional Treyderlar',
      description: 'Yillar davomida prop trading tajribasiga ega',
      icon: Users
    },
    {
      name: 'Tajriba',
      role: '5+ Yillik',
      description: 'Prop trading va risk managementda tajriba',
      icon: Award
    },
    {
      name: 'Natijalar',
      role: 'Barqaror Growth',
      description: 'Uzoq muddatli muvaffaqiyatli strategiyalar',
      icon: TrendingUp
    },
    {
      name: 'Qo\'llab-quvvatlash',
      role: '24/7 Support',
      description: 'Har doim yordam va maslahat',
      icon: MessageSquare
    }
  ]

  return (
    <section id="team" className="py-16 md:py-24 relative">
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
            <span className="neon-glow">Professional Jamoa</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Tajribali treyderlar va professional yondashuv bilan sizning muvaffaqiyatingiz uchun ishlaymiz
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="glass p-6 rounded-lg text-center hover:glass-strong transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 border-2 border-primary/30">
                <member.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-1 text-white">
                {member.name}
              </h3>
              <div className="text-sm text-primary mb-3 font-semibold">
                {member.role}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Transparency Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-4xl mx-auto glass-strong p-8 rounded-lg text-center"
        >
          <h3 className="font-heading font-bold text-2xl mb-4 text-white">
            To'liq Shaffoflik va Mas'uliyat
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Biz barcha trade natijalarimizni ochiq tarzda baham ko'ramiz. Har bir trade, 
            har bir strategiya va har bir qaror to'liq shaffof va haqiqiydir.
          </p>
          <p className="text-sm text-muted-foreground">
            Sizning ishonchingiz bizning eng qimmatli boyligimiz. Shuning uchun biz hech qachon 
            soxta natijalar yoki ortiqcha va'dalar bilan ish yuritmaymiz.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
