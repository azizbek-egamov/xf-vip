'use client'

import { useEffect, useRef } from 'react'

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Star properties
    interface Star {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }

    const stars: Star[] = []
    const starCount = window.innerWidth < 768 ? 50 : 100 // Fewer stars on mobile for performance

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    // Mouse parallax effect
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.01
      mouseY = (e.clientY - window.innerHeight / 2) * 0.01
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star, index) => {
        // Update position with parallax
        star.y += star.speed
        star.x += mouseX * star.speed * 0.5
        
        // Wrap around screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
        if (star.x > canvas.width) star.x = 0
        if (star.x < 0) star.x = canvas.width

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Add occasional twinkle effect
        if (Math.random() > 0.99) {
          star.opacity = Math.random() * 0.5 + 0.3
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ zIndex: 0 }}
    />
  )
}
