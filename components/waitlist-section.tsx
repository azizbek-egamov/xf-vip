'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, User, Phone, CheckCircle } from 'lucide-react'

export function WaitlistSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    agreed: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const message = `
<b>📝 KUTISH RO'YXATI (YANGI)</b>

<b>👤 Ism:</b> ${formData.name}
<b>📧 Email:</b> ${formData.email}
<b>📱 Telegram:</b> ${formData.telegram}

#waitlist #new_entry
      `

      await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', telegram: '', agreed: false })
      }, 3000)
    } catch (error) {
      console.error('Error submitting waitlist form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.telegram && formData.agreed

  if (isSubmitted) {
    return (
      <section id="waitlist" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto glass-strong p-12 rounded-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: 'spring',
                stiffness: 200
              }}
            >
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h3
              className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Muvaffaqiyatli Qo'shildingiz!
            </motion.h3>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Tez orada siz bilan bog'lanamiz. Telegram orqali xabar yuboramiz.
            </motion.p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-heading font-black text-3xl md:text-5xl mb-4 text-balance">
            <span className="neon-glow">Kutish Ro'yxati</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Birinchi bo'lib yangiliklar va maxsus takliflardan xabardor bo'ling
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-strong p-8 md:p-10 rounded-lg space-y-6">
            {/* Name Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Ism va Familiya
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ismingizni kiriting"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </motion.div>

            {/* Telegram Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label htmlFor="telegram" className="text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telegram Username
              </Label>
              <Input
                id="telegram"
                type="text"
                placeholder="@username"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                required
                className="bg-secondary border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </motion.div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="agreed"
                checked={formData.agreed}
                onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked as boolean })}
                className="mt-1"
              />
              <Label
                htmlFor="agreed"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                Men trading yuqori xavfli faoliyat ekanligini tushunaman va butun sarmoyamni
                yo'qotish xavfi borligini qabul qilaman. XF VIP hech qanday foyda kafolati
                bermaydi.
              </Label>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={isFormValid && !isLoading ? { scale: 1.02 } : {}}
              whileTap={isFormValid && !isLoading ? { scale: 0.98 } : {}}
            >
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white neon-border neon-border-hover py-6 text-base font-semibold transition-all duration-300"
              >
                {isLoading ? 'Yuborilmoqda...' : 'Ro\'yxatga Qo\'shilish'}
              </Button>
            </motion.div>

            <p className="text-xs text-center text-muted-foreground">
              Ro'yxatga qo'shilish bepul. VIP kirish uchun alohida to'lov talab qilinadi.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
