import React from 'react';
import { Gamepad2 } from 'lucide-react';

function FloatingAllGames({ onClick, totalGames = "500" }) {
  return (
    <div className="fixed right-4 md:right-8 top-1/4 -translate-y-1/2 z-[100]">
      
      {/* Vầng sáng nền chớp chớp */}
      <div className="absolute -inset-1 bg-cyan-400 rounded-full blur opacity-40 animate-pulse"></div>
      
      <button
        onClick={onClick}
        className="relative flex items-center gap-2 h-9 md:h-10 bg-[#05080c]/95 backdrop-blur-md border border-cyan-400/60 rounded-full pl-1.5 pr-4 md:pl-2 md:pr-5 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* 🎮 ICON GAMEPAD NHẢY TƯNG TƯNG THAY CHO CHẤM ĐỎ */}
        <span className="absolute -top-2 -right-1 md:-top-2.5 md:-right-2 flex animate-bounce">
          {/* Bạn có thể đổi màu text-red-500 thành màu khác như text-yellow-400 nếu thích */}
          <Gamepad2 className="h-4 w-4 md:h-5 md:w-5 text-red-500 drop-shadow-[0_0_12px_rgba(255,0,0,1)]" />
        </span>

        <div className="flex items-center justify-center bg-cyan-500 text-black h-6 w-6 md:h-7 md:w-7 rounded-full shrink-0">
          <Gamepad2 className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
        </div>

        <div className="flex flex-col items-start justify-center leading-none mt-0.5">
          <span className="text-[10px] md:text-xs font-black text-cyan-400 uppercase tracking-wider">
            {totalGames}+ Games
          </span>
          <span className="text-[8px] md:text-[9px] text-gray-300 font-medium italic animate-pulse mt-0.5">
            Click khám phá ngay 👉
          </span>
        </div>
      </button>
      
    </div>
  );
}

export default FloatingAllGames;