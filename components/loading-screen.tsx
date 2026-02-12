'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingScreen() {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setTimeout(() => setLoading(false), 500)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 150)

        return () => clearInterval(timer)
    }, [])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-4 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    }}
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative flex flex-col items-center max-w-xs w-full">
                        {/* Logo Animation */}
                        <motion.div
                            className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-xl flex items-center justify-center mb-8 neon-border shadow-[0_0_30px_rgba(255,0,0,0.3)]"
                            initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
                            animate={{
                                scale: [0.8, 1.1, 1],
                                rotate: 0,
                                opacity: 1
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <span className="font-heading font-black text-white text-3xl md:text-4xl italic">XF</span>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-6"
                        >
                            <h2 className="font-heading font-bold text-xl md:text-2xl text-white tracking-widest metal-text">
                                XF VIP
                            </h2>
                        </motion.div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2 }}
                            />
                            {/* Animated scanning line */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                    left: ["-100%", "200%"]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </div>

                        {/* Percentage Text */}
                        <motion.div
                            className="mt-3 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <span className="font-mono text-[10px] text-muted-foreground w-8 text-right">
                                {Math.min(100, Math.floor(progress))}%
                            </span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 h-1 bg-primary rounded-full"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            delay: i * 0.1,
                                            duration: 0.6,
                                            repeat: Infinity
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Grid/Matrix effect elements */}
                    <div className="absolute bottom-8 left-8 hidden md:block opacity-20 font-mono text-[8px] space-y-1">
                        <div className="text-primary">CORE_INIT: OK</div>
                        <div className="text-white">ENCRYPTION: ACTIVE</div>
                        <div className="text-white">PROP_READY: TRUE</div>
                    </div>
                    <div className="absolute bottom-8 right-8 hidden md:block opacity-20 font-mono text-[8px] text-white text-right">
                        v2.4.0 (STABLE)<br />
                        © 2026 XF ELITE
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
