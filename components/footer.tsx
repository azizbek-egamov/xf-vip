import { Instagram, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center neon-border">
                <span className="font-heading font-bold text-white text-sm">XF</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">XF VIP</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Eksklyuziv prop trading jamoa. Professional yondashuv, to'liq shaffoflik va masuliyat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Tezkor Havolalar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Jamoa haqida
                </a>
              </li>
              <li>
                <a href="#formats" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Formatlar
                </a>
              </li>
              <li>
                <a href="#team" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Jamoa
                </a>
              </li>
              <li>
                <a href="#stats" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Statistika
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Bog'lanish</h4>
            <div className="space-y-3">
              <a
                href="https://t.me/xfvipteam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Send size={16} />
                <span>Telegram</span>
              </a>
              <a
                href="https://instagram.com/xfvipteam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 XF VIP. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
              Ogohlantirish: Trading yuqori xavfli faoliyat hisoblanadi. Sarmoyangizni yo'qotish xavfi mavjud.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
