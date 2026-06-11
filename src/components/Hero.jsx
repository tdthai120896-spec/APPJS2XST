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

      {/* 🌟 CSS OPTIMIZED FOR HIGH PERFORMANCE (60FPS) */}
      <style>
        {`
          /* Tối ưu hóa: Hoạt ảnh nhịp thở cho quầng sáng nền */
          @keyframes neonBreathe {
            0%, 100% { opacity: 0.35; transform: scale(0.96) translate3d(0,0,0); }
            50% { opacity: 0.75; transform: scale(1.04) translate3d(0,0,0); }
          }
          .animate-breathe {
            animation: neonBreathe 6s ease-in-out infinite;
          }

          /* Hoạt ảnh lơ lửng nhẹ nhàng cho video Hologram */
          @keyframes floatVideo {
            0%, 100% { transform: translateY(0) translate3d(0,0,0); }
            50% { transform: translateY(-8px) translate3d(0,0,0); }
          }
          .animate-float {
            animation: floatVideo 6s ease-in-out infinite;
          }
          
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spinSlow 12s linear infinite;
          }
        `}
      </style>

      {/* MODAL HIỂN THỊ GAMECARD */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200 text-left">
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[320px] animate-in zoom-in-95 duration-200 mt-4">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[1.2rem] md:rounded-[1.6rem] opacity-60 blur-md pointer-events-none"></div>

            <div className="relative bg-[#05080c] rounded-[1.2rem] md:rounded-[1.6rem] border border-cyan-400/45 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
              <button
                onClick={() => setSearchedGame(null)}
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 md:p-1.5 shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
              >
                <X className="h-3 w-3 md:h-4 md:w-4" />
              </button>

              <div className="h-[230px] min-[390px]:h-[250px] sm:h-[285px] md:h-[320px] w-full flex flex-col">
                <GameCard game={searchedGame} onAddToCart={onAddToCart} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 HÌNH NỀN VÀ HIỆU ỨNG ÁNH SÁNG NEON TÍCH HỢP */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Hình nền mờ ảo hòa quyện vào giao diện tối */}
        <div 
          className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ filter: 'brightness(0.5) contrast(1.15) saturate(0.9)' }}
        />
        
        {/* Lưới tọa độ cyber huyền bí */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(6,182,212,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.25)_1px,transparent_1px)] bg-[size:45px_45px]"></div>
        
        {/* Quầng sáng Neon nhịp thở (Eclipse Glow) tỏa rộng từ tâm */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(6,182,212,0.12)_45%,#030508_80%)] animate-breathe transform-gpu" />
        
        {/* Lớp phủ gradient mờ dần nối tiếp vào phần chân trang tối */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070a] via-[#030508]/80 to-transparent" />
      </div>

      {/* KHUNG NỘI DUNG CHÍNH */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        
        {/* NHÃN KHỞI CHẠY */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-4 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" /> Next-gen gaming hub
        </div>

        {/* TIÊU ĐỀ THƯƠNG HIỆU */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-5 text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]">STEAM</span>
        </h1>

        {/* KHUNG VIDEO HUD CÔNG NGHỆ */}
        <div className="relative w-full max-w-[310px] sm:max-w-md md:max-w-lg aspect-video mb-8 rounded-2xl overflow-hidden bg-black/40 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.12)] flex items-center justify-center animate-float transform-gpu">
          {/* 4 Góc trang trí công nghệ viễn tưởng */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-cyan-400/40 rounded-tl-md z-10"></div>
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-cyan-400/40 rounded-tr-md z-10"></div>
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-cyan-400/40 rounded-bl-md z-10"></div>
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-cyan-400/40 rounded-br-md z-10"></div>

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
        <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed font-medium">
          Trải nghiệm kho game AAA đồ sộ, cài đặt đơn giản, bảo mật tối ưu và cập nhật liên tục.
        </p>

        {/* THANH TÌM KIẾM */}
        <div className="w-full mb-8">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            suggestions={suggestions}
            onSelectGame={handleSelectSuggestedGame}
          />
        </div>

        {/* THỐNG KÊ DẠNG GƯƠNG (GLASSMORPHIC) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto p-1.5 rounded-2xl bg-[#070b13]/40 backdrop-blur-md border border-cyan-500/10 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-wider shadow-[0_4px_25px_rgba(0,0,0,0.5)] select-none">
          <div className="flex items-center justify-center gap-1.5 py-2.5 border-r border-white/5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <Users className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="text-gray-300 font-extrabold">1.2k+ Online</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2.5 border-r border-white/5">
            <Layers className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="text-gray-300 font-extrabold">500+ Game</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="text-gray-300 font-extrabold">Bảo hành dài</span>
          </div>
        </div>
      </div>

      {/* BANNER KHUYẾN MÃI DƯỚI ĐÁY ĐƯỢC THIẾT KẾ LẠI */}
      <div className="w-full max-w-5xl px-4 md:px-8 mt-12 z-20">
        <div className="relative group/promo overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-[#070b13]/90 to-blue-950/20 p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-cyan-500/40">
          {/* Lớp hào quang lấp lánh nhẹ phía sau */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur opacity-35 group-hover/promo:opacity-50 transition duration-500 pointer-events-none"></div>

          <div className="relative flex flex-col items-center justify-center text-center z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-spin-slow" /> Sự kiện tri ân giới hạn
            </div>
            
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none mb-3 text-white">
              🔥 Mua 1 Được 100: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)]">TẶNG LÊN ĐẾN 100 GAMES</span>
            </h2>
            
            <p className="text-[10px] md:text-xs text-gray-400 font-extrabold tracking-widest uppercase">
              Áp dụng tự động cho một số tài khoản ngẫu nhiên sau khi mua thành công!
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero