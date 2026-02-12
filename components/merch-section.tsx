'use client'

import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'

export function MerchSection() {
    return (
        <section id="merch" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 mb-6 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                        <Gift className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Special Bonus
                        </span>
                    </div>

                    <h2 className="font-heading font-black text-3xl md:text-5xl mb-8 text-balance">
                        <span className="text-white">XF VIP</span>
                        <span className="block text-primary neon-glow mt-2">Merch Box</span>
                    </h2>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative group cursor-pointer mb-8 max-w-2xl mx-auto"
                    >
                        {/* Image Container with Glow */}
                        <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 neon-border group-hover:border-primary/60 transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <img
                                src="/images/merch-box.jpg"
                                alt="XF VIP Merch Box"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {/* Overlay Text */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-left">
                                <p className="text-white font-bold text-lg md:text-2xl leading-tight">
                                    Har bir a’zoga shunday <span className="text-primary">XF MERCH</span> jo’natiladi
                                </p>
                            </div>
                        </div>

                        {/* Reflection Effect beneath the image */}
                        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-primary/20 blur-xl rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                        Siz nafaqat bilim va signallarni, balki bizning jamoamizning bir qismi ekanligingizni his qilishingiz uchun maxsus sovg'alar to'plamini ham qo'lga kiritasiz.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
