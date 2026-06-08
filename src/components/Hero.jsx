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
    <section className="relative min-h-[950px] md:min-h-[1050px] w-full flex flex-col items-center justify-between text-center pt-24 pb-12 overflow-hidden bg-[#030508]">

      {/* 🌟 CSS OPTIMIZED FOR HIGH PERFORMANCE (60FPS) */}
      <style>
        {`
          /* Tối ưu hóa: Hoạt ảnh nhịp thở cho quầng sáng nền */
          @keyframes neonBreathe {
            0%, 100% { opacity: 0.4; transform: scale(0.97) translate3d(0,0,0); }
            50% { opacity: 0.85; transform: scale(1.03) translate3d(0,0,0); }
          }
          .animate-breathe {
            animation: neonBreathe 5s ease-in-out infinite;
          }

          /* Hoạt ảnh lơ lửng nhẹ nhàng cho video Hologram */
          @keyframes floatVideo {
            0%, 100% { transform: translateY(0) translate3d(0,0,0); }
            50% { transform: translateY(-8px) translate3d(0,0,0); }
          }
          .animate-float {
            animation: floatVideo 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* MODAL HIỂN THỊ GAMECARD */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200 text-left">
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[320px] animate-in zoom-in-95 duration-200 mt-4">
            <div className="absolute -inset-1.5 bg-cyan-500 rounded-[1.2rem] md:rounded-[1.6rem] opacity-60 blur-md pointer-events-none"></div>

            <div className="relative bg-[#05080c] rounded-[1.2rem] md:rounded-[1.6rem] border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <button
                onClick={() => setSearchedGame(null)}
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 md:p-1.5 shadow-lg transition-transform hover:scale-110"
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

      {/* BACKGROUND ĐEN/XANH NEON TÍCH HỢP HIỆU ỨNG NHẬT THỰC (ECLIPSE GLOW) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#030508]">
        {/* Lưới tọa độ cyber mờ ảo */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* 🌟 HÀO QUANG NHẬT THỰC: Đen kịt ở tâm (0%-25%) để hòa hợp với video, tỏa dần ra xanh neon (50%-60%) và mờ dần */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#030508_25%,rgba(6,182,212,0.15)_50%,transparent_75%)] animate-breathe transform-gpu will-change-transform" />
        
        {/* Gradient mờ dần nối tiếp vào phần chân trang tối */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070a] to-transparent" />
      </div>

      {/* KHUNG NỘI DUNG CHÍNH */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        
        {/* TIÊU ĐỀ THƯƠNG HIỆU */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] text-white">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">STEAM</span>
        </h1>

        {/* 1 & 2/ VIDEO KHÔNG KHUNG - TỰ TRÔI NỔI LƠ LỬNG TRÊN QUẦNG SÁNG */}
        <div className="relative w-full max-w-[300px] sm:max-w-md md:max-w-lg aspect-video mb-8 rounded-2xl overflow-hidden bg-transparent flex items-center justify-center animate-float transform-gpu">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-95"
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

        {/* THỐNG KÊ */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto p-1.5 rounded-xl bg-[#070b13]/95 border border-cyan-500/10 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.05)] select-none">
          <div className="flex items-center justify-center gap-1.5 py-1.5 border-r border-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <Users className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">1.2k+ Online</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 border-r border-white/5">
            <Layers className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">500+ Game</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="truncate">Bảo hành dài</span>
          </div>
        </div>
      </div>

      {/* BANNER KHUYẾN MÃI DƯỚI ĐÁY */}
      <div className="w-full max-w-5xl px-4 md:px-8 mt-12 z-20">
        <div className="relative group/promo">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-20 pointer-events-none"></div>
          
          <div className="relative bg-[#070b13]/95 border border-cyan-500/25 p-5 md:p-6 rounded-3xl shadow-[0_0_25px_rgba(6,182,212,0.1)] flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-2.5">
              <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" /> Sự kiện tri ân giới hạn
            </div>
            
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none mb-2 text-white">
              🔥 Mua 1 Được 100: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)]">TẶNG LÊN ĐẾN 100 GAMES</span>
            </h2>
            
            <p className="text-[10px] md:text-xs text-gray-400 font-extrabold tracking-wider uppercase">
              Áp dụng tự động cho một số tài khoản ngẫu nhiên sau khi mua thành công!
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero