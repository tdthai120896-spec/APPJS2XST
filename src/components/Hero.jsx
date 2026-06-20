import React, { useState } from 'react'
import { Sparkles, Users, Layers, ShieldCheck, X } from 'lucide-react'
import GameCard from './GameCard'
import SearchBar from './SearchBar';

function Hero({ searchTerm, handleSearch, suggestions, handleOpenModal, handleNavigation, onAddToCart }) {

  const [searchedGame, setSearchedGame] = useState(null);

  const handleSelectSuggestedGame = (game) => {
    setSearchedGame(game);
    if (handleSearch) {
      handleSearch({ target: { value: '' } });
    }
  };

  return (
    <section className="relative min-h-[950px] md:min-h-[1020px] w-full flex flex-col items-center justify-between text-center pt-28 pb-16 overflow-hidden bg-[#030508]">

      {/* 🌟 CSS OPTIMIZED FOR APPLE-STYLE SMOOTH ANIMATIONS */}
      <style>
        {`
          /* Hiệu ứng thở vô cùng nhẹ nhàng cho vùng sáng nền ambient */
          @keyframes subtlePulse {
            0%, 100% { opacity: 0.12; transform: scale(1) translate3d(0,0,0); }
            50% { opacity: 0.22; transform: scale(1.02) translate3d(0,0,0); }
          }
          .animate-subtle-pulse {
            animation: subtlePulse 10s ease-in-out infinite;
          }

          /* Chuyển động lơ lửng rất khẽ cho khối video chính */
          @keyframes subtleFloat {
            0%, 100% { transform: translateY(0) translate3d(0,0,0); }
            50% { transform: translateY(-5px) translate3d(0,0,0); }
          }
          .animate-subtle-float {
            animation: subtleFloat 8s ease-in-out infinite;
          }
        `}
      </style>

      {/* MODAL HIỂN THỊ GAMECARD (Sửa đổi theo chuẩn Apple Glassmorphism) */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300 text-left">
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          {/* Container chính với góc bo tròn lớn và bóng đổ mịn sâu */}
          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[320px] animate-in zoom-in-95 duration-300 mt-4">
            <div className="relative bg-[#121214]/90 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.85)] overflow-hidden">
              
              {/* Nút đóng tròn mờ tối giản phong cách Apple */}
              <button
                onClick={() => setSearchedGame(null)}
                className="absolute top-3 right-3 z-50 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full p-1.5 backdrop-blur-md transition-all flex items-center justify-center border border-white/10 shadow-sm"
              >
                <X className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>

              {/* Khung chứa GameCard với chiều cao đã được tối ưu để tránh bị cắt chữ */}
              <div className="h-[280px] min-[390px]:h-[310px] sm:h-[370px] md:h-[410px] w-full flex flex-col">
                <GameCard game={searchedGame} onAddToCart={onAddToCart} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 NỀN VÀ HIỆU ỨNG ÁNH SÁNG CHUYÊN NGHIỆP */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Hình nền gốc phủ một lớp đen mờ sang trọng */}
        <div 
          className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-[0.12] mix-blend-luminosity"
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
        />
        
        {/* Lưới tọa độ siêu mờ, chỉ đủ để tạo chiều sâu tinh tế */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Quầng sáng Ambient mượt mà chuyển động chậm (thay thế cho chớp neon sáng gắt) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0%,rgba(59,130,246,0.03)_40%,transparent_70%)] animate-subtle-pulse transform-gpu" />
        
        {/* Gradient mờ chân trang nối mềm vào phần nền tối */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070a] via-[#030508]/90 to-transparent" />
      </div>

      {/* KHUNG NỘI DUNG CHÍNH */}
      <div className="relative z-30 w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        
        {/* NHÃN KHỞI CHẠY KHÔNG MÀU MÈ */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-5 shadow-sm">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></span> Next-gen gaming hub
        </div>

        {/* TIÊU ĐỀ THƯƠNG HIỆU SANG TRỌNG VỚI GRADIENT BẠC KIM LOẠI */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-sm select-none">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400">STEAM</span>
        </h1>

        {/* KHUNG VIDEO TỐI GIẢN (Đã bỏ 4 góc rườm rà) */}
        <div className="relative w-full max-w-[310px] sm:max-w-md md:max-w-lg aspect-video mb-8 rounded-[1.5rem] overflow-hidden bg-black/60 border border-white/5 shadow-[0_24px_48px_rgba(0,0,0,0.6)] flex items-center justify-center animate-subtle-float transform-gpu">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-90"
          >
            <source src="/gemini_generated_video_27593B13.mp4" type="video/mp4" />
          </video>
        </div>

        {/* MÔ TẢ */}
        <p className="text-neutral-400 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed font-normal">
          Trải nghiệm kho game AAA đồ sộ, cài đặt đơn giản, bảo mật tối ưu và cập nhật liên tục.
        </p>

        {/* THANH TÌM KIẾM */}
        <div className="w-full mb-8 relative z-50">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            suggestions={suggestions}
            onSelectGame={handleSelectSuggestedGame}
          />
        </div>

        {/* THỐNG KÊ DẠNG KÍNH MỜ (SANG XỊN) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto p-1.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] text-[10px] md:text-xs font-semibold text-white/60 uppercase tracking-wider shadow-[0_12px_32px_rgba(0,0,0,0.4)] select-none">
          <div className="flex items-center justify-center gap-2 py-2 border-r border-white/[0.05]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-white/80 font-bold">1.2k+ Online</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 border-r border-white/[0.05]">
            <Layers className="h-3.5 w-3.5 text-white/40 shrink-0" />
            <span className="text-white/80 font-bold">500+ Game</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <ShieldCheck className="h-3.5 w-3.5 text-white/40 shrink-0" />
            <span className="text-white/80 font-bold">Bảo hành dài</span>
          </div>
        </div>
      </div>

      {/* BANNER KHUYẾN MÃI DƯỚI ĐÁY ĐÃ ĐƯỢC TINH CHỈNH TỐI GIẢN */}
      <div className="w-full max-w-5xl px-4 md:px-8 mt-12 z-10 relative">
        <div className="relative group/promo overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 md:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-all duration-300">
          
          <div className="relative flex flex-col items-center justify-center text-center z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-3">
              Sự kiện tri ân giới hạn
            </div>
            
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 text-white">
              🔥 Mua 1 Được 100: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">TẶNG LÊN ĐẾN 100 GAMES</span>
            </h2>
            
            <p className="text-[10px] md:text-xs text-neutral-400 font-medium tracking-wide">
              Áp dụng tự động cho một số tài khoản ngẫu nhiên sau khi mua thành công!
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero