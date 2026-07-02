import React from 'react';
import { ShieldCheck, Clock, Gift, ScrollText } from 'lucide-react';

function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-start text-center pt-3 md:pt-6 pb-6 overflow-hidden bg-[#030508]">
      {/* 1. CSS ANIMATIONS */}
      <style>
        {`
          @keyframes subtlePulse {
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(1.02); }
          }
          .animate-subtle-pulse { animation: subtlePulse 10s ease-in-out infinite; }
          
          @keyframes textGlow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.4)); opacity: 0.9; }
            50% { filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.7)); opacity: 1; }
          }
          .animate-text-glow { animation: textGlow 2s infinite ease-in-out; }

          @keyframes goldGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.1); border-color: rgba(251, 191, 36, 0.2); }
            50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.4); border-color: rgba(251, 191, 36, 0.7); }
          }
          .animate-gold-glow { animation: goldGlow 2s infinite ease-in-out; }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      {/* 2. BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-[0.5] md:opacity-[0.7]" 
          style={{ filter: 'brightness(0.4) contrast(1.2)' }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,#030508_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030508] to-transparent" />
      </div>

      {/* 3. MAIN CONTENT CONTAINER (Tối ưu khoảng cách dọc siêu gọn gàng cho Mobile) */}
      <div className="relative z-30 w-full max-w-2xl mx-auto px-5 flex flex-col items-center space-y-3.5 md:space-y-5">

        {/* 🌟 4. BẢNG ƯU ĐÃI VÀNG (Được đẩy lên đầu tiên để tăng sự chú ý của khách hàng) */}
        <div className="w-full max-w-[480px] bg-gradient-to-br from-amber-600/30 via-amber-500/10 to-amber-900/30 backdrop-blur-xl border border-amber-500/40 rounded-xl p-3 flex items-center justify-between gap-3 animate-gold-glow relative overflow-hidden transform-gpu">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
          
          <div className="flex items-center gap-3 z-10">
            <div className="h-9 w-9 md:h-11 md:w-11 rounded-lg bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
              <Gift className="w-5 h-5 text-black font-black animate-bounce" />
            </div>
            <div className="text-left">
              <h4 className="text-[8px] md:text-[10px] font-black text-amber-400 uppercase tracking-widest">Ưu đãi độc quyền</h4>
              <p className="text-[13px] md:text-base text-white font-black leading-tight uppercase italic">
                ĐỒNG GIÁ <span className="text-amber-400 text-lg md:text-xl tracking-tighter">30.000đ</span>
              </p>
            </div>
          </div>

          <div className="text-right z-10">
             <p className="text-[8px] font-bold text-amber-200/50 uppercase tracking-tighter">Bonus (Random)</p>
             <p className="text-[10px] md:text-xs font-black text-white italic tracking-tight">+100 Games</p>
          </div>
        </div>

        {/* 🌟 5. BẢNG CHÍNH SÁCH & DỊCH VỤ (Đặt ngay ngắn phía dưới bảng Ưu đãi) */}
        <div className="w-full max-w-[620px] bg-[#05080f]/80 backdrop-blur-2xl border border-cyan-500/25 rounded-2xl p-5 md:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.65)] select-none">
          
          {/* Header Bảng dạng 1 hàng to rõ rệt */}
          <div className="flex flex-col items-center gap-1.5 mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <ScrollText className="w-4.5 h-4.5 text-cyan-400" />
              <h2 className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-100 drop-shadow-sm italic leading-none">
                Chính sách &amp; Dịch vụ
              </h2>
            </div>
            <span className="text-[9px] font-bold text-green-400/80 uppercase tracking-[0.3em]">(Family Sharing)</span>
          </div>

          {/* Nội dung chi tiết các mục dịch vụ */}
          <div className="flex flex-col gap-4 text-left">
            {/* Mục 1: Hình thức */}
            <div className="flex flex-col sm:flex-row gap-2.5 p-3.5 md:p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/35 transition-all duration-300 group transform-gpu">
              <div className="flex items-center gap-2 shrink-0 sm:w-28">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h4 className="text-[11px] font-black text-cyan-100 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">Hình thức</h4>
              </div>
              <p className="text-[11px] md:text-xs text-neutral-300 leading-relaxed font-medium flex-1">
                Tài khoản cho thuê trải nghiệm Offline thông qua chức năng chính thống Steam Family Sharing. Cam kết không kinh doanh tài khoản ảo và tuân thủ pháp luật theo{' '}
                <a 
                  href="https://vanban.chinhphu.vn/?pageid=27160&docid=218185&classid=1&typegroupid=4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 underline font-bold transition-colors"
                >
                  Nghị định 174/2026/NĐ-CP
                </a> [2.1].
              </p>
            </div>

            {/* Mục 2: Thời gian */}
            <div className="flex flex-col sm:flex-row gap-2.5 p-3.5 md:p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-blue-500/35 transition-all duration-300 group transform-gpu">
              <div className="flex items-center gap-2 shrink-0 sm:w-28">
                <Clock className="w-4 h-4 text-blue-400" />
                <h4 className="text-[11px] font-black text-blue-100 uppercase tracking-wider group-hover:text-blue-400 transition-colors">Thời gian</h4>
              </div>
              <p className="text-[11px] md:text-xs text-neutral-300 leading-relaxed font-medium flex-1">
                Không giới hạn thời gian trải nghiệm trong quá trình thuê.
              </p>
            </div>

            {/* Mục 3: Cam kết */}
            <div className="flex flex-col sm:flex-row gap-2.5 p-3.5 md:p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/35 transition-all duration-300 group transform-gpu">
              <div className="flex items-center gap-2 shrink-0 sm:w-28">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-[11px] font-black text-emerald-100 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">Cam kết</h4>
              </div>
              <p className="text-[11px] md:text-xs text-neutral-300 leading-relaxed font-medium flex-1">
                Bảo hành lâu dài, nói không với game crack lậu và không bản quyền.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;