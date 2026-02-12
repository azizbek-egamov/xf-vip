'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Crown, Lock, Mail, User, Phone, CheckCircle, CreditCard, Copy, Upload, X, Trash2, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

export function VipEntrySection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    format: '',
    agreed: false,
    riskAgreed: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number>(12850) // Fallback rate
  const fileInputRef = useRef<HTMLInputElement>(null)

  const cardNumber = process.env.NEXT_PUBLIC_PAYMENT_CARD_NUMBER || '8600000000000000'
  const cardHolder = process.env.NEXT_PUBLIC_CARD_HOLDER || 'ADMIN'

  useEffect(() => {
    // Fetch current USD to UZS rate
    const fetchRate = async () => {
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/latest/USD')
        const data = await response.json()
        if (data.result === 'success' && data.conversion_rates.UZS) {
          setExchangeRate(data.conversion_rates.UZS)
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error)
      }
    }
    fetchRate()
  }, [])

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPaymentModalOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Faqat rasm yuklashingiz mumkin (JPG, PNG, AVIF)')
        return
      }
      setReceiptFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveFile = () => {
    setReceiptFile(null)
    setReceiptPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCopyCard = () => {
    navigator.clipboard.writeText(cardNumber)
    toast.success('Karta raqami nushalandi!')
  }

  const finalSubmit = async () => {
    if (!receiptFile) {
      toast.error('Iltimos, to\'lov cheki rasmini yuklang')
      return
    }

    setIsLoading(true)

    try {
      const priceUzs = (77 * exchangeRate).toLocaleString('uz-UZ')
      const message = `
<b>👑 YANGI VIP A'ZO (TO'LOV BILAN)</b>

<b>👤 Ism:</b> ${formData.name}
<b>📧 Email:</b> ${formData.email}
<b>📱 Telegram:</b> ${formData.telegram}
<b>📊 Format:</b> ${formData.format.toUpperCase()}
<b>💰 To'lov:</b> $77 (~${priceUzs} UZS)
<b>🧾 Chek:</b> Yuklangan

#vip #payment #new_member
      `

      const uploadData = new FormData()
      uploadData.append('message', message)
      uploadData.append('photo', receiptFile)

      const response = await fetch('/api/telegram', {
        method: 'POST',
        body: uploadData,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setIsPaymentModalOpen(false)
        setReceiptFile(null)
        setReceiptPreview(null)

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            telegram: '',
            format: '',
            agreed: false,
            riskAgreed: false
          })
        }, 5000)
      } else {
        toast.error('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Server bilan ulanishda xatolik.')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.telegram &&
    formData.format &&
    formData.agreed &&
    formData.riskAgreed

  const priceUzs = (77 * exchangeRate).toLocaleString('uz-UZ')

  if (isSubmitted) {
    return (
      <section id="vip-entry" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto glass-strong p-12 rounded-lg text-center border-2 border-primary/50 neon-border"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: 'spring',
                stiffness: 200
              }}
            >
              <Crown className="w-16 h-16 text-primary mx-auto mb-4 fill-current" />
            </motion.div>
            <motion.h3
              className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              To'lov Yuborildi!
            </motion.h3>
            <motion.p
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Sizning to'lov chekingiz va ma'lumotlaringiz muvaffaqiyatli yuborildi.
              Adminlarimiz chekni tekshirib, 24 soat ichida siz bilan Telegram orqali bog'lanishadi.
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Tekshirilmoqda...
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="vip-entry" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Crown className="w-10 h-10 text-primary fill-current" />
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl mb-4 text-balance">
            <span className="text-primary neon-glow">VIP Kirish</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty mb-4">
            Eksklyuziv XF VIP TEAM a'zosi bo'ling
          </p>
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold text-white">$77</span>
            <span className="text-sm text-muted-foreground">bir martalik to'lov</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleOpenPayment} className="glass-strong p-8 md:p-10 rounded-lg border border-primary/30 space-y-6">
            {/* VIP Badge */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Xavfsiz to'lov va ma'lumotlar himoyasi
              </span>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="vip-name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Ism va Familiya *
              </Label>
              <Input
                id="vip-name"
                type="text"
                placeholder="To'liq ismingiz"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-secondary border-border focus:border-primary"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="vip-email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="vip-email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-secondary border-border focus:border-primary"
              />
            </div>

            {/* Telegram Field */}
            <div className="space-y-2">
              <Label htmlFor="vip-telegram" className="text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telegram Username *
              </Label>
              <Input
                id="vip-telegram"
                type="text"
                placeholder="@username"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                required
                className="bg-secondary border-border focus:border-primary"
              />
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <Label htmlFor="format" className="text-foreground">
                Trading Format *
              </Label>
              <Select
                value={formData.format}
                onValueChange={(value) => setFormData({ ...formData, format: value })}
              >
                <SelectTrigger className="bg-secondary border-border focus:border-primary">
                  <SelectValue placeholder="Formatni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="format-a">Format A - Asosiy</SelectItem>
                  <SelectItem value="format-b">Format B - Professional</SelectItem>
                  <SelectItem value="format-c">Format C - VIP Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Risk Agreement */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="risk-agreed"
                  checked={formData.riskAgreed}
                  onCheckedChange={(checked) => setFormData({ ...formData, riskAgreed: checked as boolean })}
                  className="mt-1"
                />
                <Label
                  htmlFor="risk-agreed"
                  className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Men trading yuqori xavfli faoliyat ekanligini to'liq tushunaman. Sarmoyamning
                  bir qismini yoki to'liq miqdorini yo'qotish xavfi borligini qabul qilaman.
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="vip-agreed"
                  checked={formData.agreed}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreed: checked as boolean })}
                  className="mt-1"
                />
                <Label
                  htmlFor="vip-agreed"
                  className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Men $77 VIP kirish to'lovi bir martalik to'lov ekanligini va qaytarilmasligini
                  tushunaman.
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white neon-border py-6 text-base font-semibold"
            >
              VIP A'zo Bo'lish - $77
            </Button>
          </form>
        </motion.div>

        {/* Payment Modal */}
        <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
          <DialogContent className="sm:max-w-[500px] glass-strong border-primary/30 p-0 max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <div className="p-6 md:p-8 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading font-bold text-white text-center">
                  To'lov Ma'lumotlari
                </DialogTitle>
                <DialogDescription className="text-center text-muted-foreground pt-2">
                  To'lovni amalga oshiring va chek rasmini yuklang
                </DialogDescription>
              </DialogHeader>

              {/* Price Display */}
              <div className="bg-secondary/50 rounded-lg p-6 text-center border border-border">
                <p className="text-sm text-muted-foreground mb-1">To'lov miqdori:</p>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">$77.00</span>
                  <span className="text-primary font-semibold mt-1">~ {priceUzs} UZS</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg border border-primary/20 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Karta raqami</span>
                    <button
                      onClick={handleCopyCard}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-medium transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Nusxalash
                    </button>
                  </div>
                  <div className="text-xl font-mono font-bold text-white tracking-widest text-center py-2">
                    {cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                  </div>
                  <div className="pt-2 border-t border-primary/10 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Karta egasi:</span>
                    <span className="text-sm font-semibold text-white uppercase">{cardHolder}</span>
                  </div>
                </div>
              </div>

              {/* Receipt Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-white">To'lov cheki (Screenshot) *</Label>

                {!receiptPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all bg-secondary/30"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">Rasm yuklash uchun bosing</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG yoki AVIF formatlari</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-border group">
                    <img
                      src={receiptPreview}
                      alt="Receipt Preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all"
                        title="Rasmni o'zgartirish"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleRemoveFile}
                        className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/40 text-red-500 transition-all"
                        title="Rasmni o'chirish"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="bg-primary px-2 py-1 rounded text-[10px] font-bold text-white uppercase shadow-lg">
                        Tayyor
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-primary/5 p-2 rounded border border-primary/10">
                <ImageIcon className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                <span>Formatlar: JPEG, PNG, WEBP, AVIF. Maksimal hajm: 5MB.</span>
              </div>
            </div>

            <DialogFooter className="p-6 bg-secondary/30 border-t border-border mt-0">
              <Button
                onClick={finalSubmit}
                disabled={!receiptFile || isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 neon-border"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Yuborilmoqda...
                  </div>
                ) : (
                  'To\'lovni Tasdiqlash'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-8 glass p-6 rounded-lg border-l-4 border-primary"
        >
          <h4 className="font-heading font-semibold text-lg mb-2 text-white">
            Muhim Ma'lumot
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• VIP kirish to'lovi ($77) bir martalik to'lov va qaytarilmaydi</li>
            <li>• To'lov UZS kursiga qarab avtomatik hisoblanadi</li>
            <li>• Chek yuborilgandan so'ng moderatorlar 24 soat ichida tasdiqlashadi</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
