import React from 'react'
import { 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Facebook, 
  Gamepad2, 
  ChevronRight,
  Mail
} from 'lucide-react';

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-cyan-500/20 bg-[#05070a] overflow-hidden">
      {/* Hiệu ứng ánh sáng nền mờ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* CỘT 1: THÔNG TIN THƯƠNG HIỆU */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2 text-2xl font-black uppercase italic tracking-wider text-white">
              <ShieldCheck className="h-7 w-7 text-cyan-400" />
              NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">STEAM</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Thuê game bản quyền lâu dài chỉ từ 30K • Nói không với game crack, lậu. Trải nghiệm hệ thống Family Share uy tín, ổn định với chi phí tối ưu nhất.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Hệ thống hoạt động ổn định
            </div>
          </div>

          {/* CỘT 2: HỖ TRỢ KHÁCH HÀNG (Links) */}
          <div>
            <h3 className="mb-5 text-sm font-black text-white uppercase tracking-widest">Hỗ trợ khách hàng</h3>
            <ul className="flex flex-col space-y-3 text-sm text-gray-400">
              {['Hướng dẫn thuê tài khoản', 'Chính sách bảo hành', 'Câu hỏi thường gặp (FAQ)', 'Điều khoản dịch vụ'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                    <ChevronRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: THÔNG TIN LIÊN HỆ */}
          <div>
            <h3 className="mb-5 text-sm font-black text-white uppercase tracking-widest">Liên hệ trực tiếp</h3>
            <ul className="flex flex-col space-y-4 text-sm text-gray-400">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
                    <Facebook className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-500">Fanpage Facebook</span>
                    <span className="font-medium group-hover:text-cyan-400 transition-colors">Nexus Offline Steam</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                    <MessageSquare className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-gray-500">Nhắn tin Zalo/Mess</span>
                    <span className="font-medium group-hover:text-cyan-400 transition-colors">Hỗ trợ 24/7</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 4: KẾT NỐI & CỘNG ĐỒNG */}
          

        </div>
      </div>

      {/* THANH BẢN QUYỀN CUỐI TRANG (BOTTOM BAR) */}
      <div className="border-t border-white/10 bg-[#030406]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-[11px] md:text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} NEXUS STEAM. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-gray-500 font-medium">
            <span>Powered by</span>
            <Gamepad2 className="h-3.5 w-3.5 text-cyan-500" />
            <span className="text-gray-400 font-bold tracking-wider">NEXUS TEAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;