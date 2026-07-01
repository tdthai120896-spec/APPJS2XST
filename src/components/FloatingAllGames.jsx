import React from 'react';
import { Gamepad2 } from 'lucide-react';

function FloatingAllGames({ onClick, totalGames = "500" }) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] pointer-events-none">
      
      {/* 🌟 CSS ANIMATIONS CỦA RIÊNG NÚT NÀY */}
      <style>
        {`
          @keyframes smoothFloat {
            0%, 100% { transform: translateY(0) translate3d(0,0,0); }
            50% { transform: translateY(-6px) translate3d(0,0,0); }
          }
          .animate-smooth-float {
            animation: smoothFloat 4s ease-in-out infinite;
          }
          @keyframes softPulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
          }
          .animate-soft-pulse {
            animation: softPulse 3s ease-in-out infinite;
          }
        `}
      </style>
      
      <div className="relative animate-smooth-float pointer-events-auto transform-gpu will-change-transform">
        
        {/* Vầng sáng nền (Soft Pulse mượt hơn) */}
        <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl animate-soft-pulse pointer-events-none"></div>
        
        <button
          onClick={onClick}
          className="relative flex items-center gap-2.5 h-10 md:h-12 bg-[#05080c]/90 backdrop-blur-xl border border-cyan-400/40 rounded-full pl-2 pr-5 md:pl-2.5 md:pr-6 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-500 hover:scale-105 active:scale-95 group overflow-visible"
        >
          {/* 🎮 ICON GAMEPAD NHỎ (Thay bounce bằng hiệu ứng thở nhẹ) */}
          <span className="absolute -top-1.5 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20"></span>
            <Gamepad2 className="relative h-4 w-4 md:h-5 md:w-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </span>

          {/* Biểu tượng chính bên trái */}
          <div className="flex items-center justify-center bg-cyan-500 text-black h-7 w-7 md:h-8 md:w-8 rounded-full shrink-0 shadow-inner group-hover:rotate-12 transition-transform duration-500">
            <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
          </div>

          {/* Text nội dung */}
          <div className="flex flex-col items-start justify-center leading-none">
            <span className="text-[10px] md:text-xs font-black text-cyan-400 uppercase tracking-[0.1em]">
              {totalGames}+ Games
            </span>
            <span className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5 opacity-80 group-hover:text-white transition-colors">
              Khám phá ngay
            </span>
          </div>

          {/* Hiệu ứng quét sáng (Shimmer) khi hover */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </button>
      </div>
      
    </div>
  );
}

export default FloatingAllGames;