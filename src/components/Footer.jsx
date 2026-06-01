import { MessageSquare, Phone, MessageCircle, ShieldCheck } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-lg font-semibold">
            <ShieldCheck className="h-5 w-5 text-[#00d2ff]" />
            Nexus Offline Steam
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/60">
            Mọi thắc mắc xin liên hệ cho mình nhé. Cảm ơn các bạn đã ghé thăm & ủng hộ.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-semibold text-white">Contact & Support</div>
            <ul className="space-y-3 text-sm text-white/65">
              {/* Link Zalo: thay 09xxxx bằng số điện thoại của bạn */}
              <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#00d2ff] transition-colors cursor-pointer">
                <Phone className="h-4 w-4 text-[#00d2ff]" /> Zalo
              </a>
              {/* Link Messenger: thay username bằng ID page hoặc username của bạn */}
              <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
                <MessageSquare className="h-4 w-4 text-blue-400" /> Messenger
              </a>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-white">Social</div>
            <a
              href="https://www.facebook.com/profile.php?id=61558065130631"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-blue-500/40 hover:text-blue-100"
            >
              <MessageCircle className="h-4 w-4 text-blue-500" />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer