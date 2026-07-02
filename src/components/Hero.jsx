import React from 'react';
import { Sparkles, ShieldCheck, Clock, Gift, ScrollText } from 'lucide-react';

function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-start text-center pt-2 md:pt-4 pb-8 overflow-hidden bg-[#030508]">
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

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="relative z-30 w-full max-w-xl mx-auto px-5 flex flex-col items-center space-y-3 md:space-y-5">
        
        {/* Nhãn nhỏ */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">
          <Sparkles className="w-2.5 h-2.5 animate-pulse text-cyan-300" /> Nexus Premium Service
        </div>

        {/* Tiêu đề Thương hiệu */}
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-white select-none leading-none">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">STEAM</span>
        </h1>

        {/* 🌟 4. BẢNG ƯU ĐÃI VÀNG (Gọn nhẹ & Hook) */}
        <div className="w-full max-w-[480px] bg-gradient-to-br from-amber-600/30 via-amber-500/10 to-amber-900/30 backdrop-blur-xl border border-amber-500/40 rounded-xl p-3 flex items-center justify-between gap-3 animate-gold-glow relative overflow-hidden">
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

        {/* 🌟 5. BẢNG CHÍNH SÁCH (Policy Table - Đã thu gọn cực đẹp) */}
        <div className="w-full max-w-[500px] bg-[#05080f]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Header Bảng */}
          <div className="flex flex-col items-center gap-1.5 mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <ScrollText className="w-3.5 h-3.5 text-cyan-400" />
              <h2 className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-100 drop-shadow-sm italic">
                Dịch vụ thuê Game bản quyền
              </h2>
            </div>
            <span className="text-[9px] font-bold text-green-100/60 uppercase tracking-[0.3em]">(Family Sharing)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Mục 1 */}
            <div className="flex flex-col gap-1 text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <h4 className="text-[9px] font-black text-cyan-100 uppercase tracking-tighter group-hover:text-cyan-400">Hình thức</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-snug font-medium">Thuê Game Steam (Family Sharing) đúng quy định từ 01/07/026</p>
            </div>

            {/* Mục 2 */}
            <div className="flex flex-col gap-1 text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-blue-400" />
                <h4 className="text-[9px] font-black text-blue-100 uppercase tracking-tighter group-hover:text-blue-400">Thời gian</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-snug font-medium">Không giới thời gian chơi game sau khi thuê.</p>
            </div>

            {/* Mục 3 */}
            <div className="flex flex-col gap-1 text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <h4 className="text-[9px] font-black text-emerald-100 uppercase tracking-tighter group-hover:text-emerald-400">Cam kết</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-snug font-medium">Bảo hành & Hỗ trợ tận tịnh. Nói không với game crack, lậu, không bản quyền</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;