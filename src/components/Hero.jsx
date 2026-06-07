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
    <section className="relative min-h-[950px] md:min-h-[1050px] w-full flex flex-col items-center justify-between text-center pt-20 pb-12 overflow-hidden bg-[#05070a]">

      {/* 🌟 CSS OPTIMIZED FOR HIGH PERFORMANCE (60FPS) */}
      <style>
        {`
          /* Tối ưu hóa: Hoạt ảnh chỉ thay đổi opacity/scale để GPU xử lý mượt mà, không dùng dynamic blur */
          @keyframes neonBreathe {
            0%, 100% { opacity: 0.35; transform: scale(0.97) translate3d(0,0,0); }
            50% { opacity: 0.85; transform: scale(1.03) translate3d(0,0,0); }
          }
          .animate-breathe {
            animation: neonBreathe 4s ease-in-out infinite;
          }

          /* Hoạt ảnh biến dạng lỏng mượt mà cho Logo */
          @keyframes liquid3D {
            0%, 100% {
              border-radius: 62% 38% 30% 70% / 55% 35% 65% 45%;
              transform: rotate(0deg) translate3d(0,0,0);
            }
            50% {
              border-radius: 40% 60% 70% 30% / 45% 55% 45% 55%;
              transform: rotate(5deg) scale(1.02) translate3d(0,0,0);
            }
          }
          .animate-liquid-3d {
            animation: liquid3D 10s ease-in-out infinite;
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

      {/* VIDEO BACKGROUND (ĐÃ ĐƯỢC TỐI ƯU HÓA) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-20 scale-100"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Lớp phủ chuyển màu sử dụng mã màu tối thay thế cho các hiệu ứng blur động */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#05070a_98%)]" />
      </div>

      {/* KHUNG NỘI DUNG CHÍNH */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        
        {/* 2 & 4/ LOGO "STEAM OFFLINE 30K" 3D LIQUID HOÀNH TRÁNG */}
        <div className="relative w-72 h-36 md:w-[340px] md:h-44 flex items-center justify-center mb-8 select-none group">
          {/* Vòng hào quang phát sáng phía sau (Đã tối ưu để không gây lag) */}
          <div className="absolute -inset-4 rounded-full bg-cyan-500/10 blur-2xl opacity-60 animate-breathe pointer-events-none will-change-transform"></div>

          {/* Khung Gel Liquid 3D chuyển động */}
          <div className="absolute inset-0 animate-liquid-3d bg-gradient-to-br from-cyan-600 via-[#071324] to-[#043152] border-2 border-cyan-400/80 shadow-[inset_0_4px_16px_rgba(255,255,255,0.25),0_15px_30px_rgba(6,182,212,0.45)] overflow-hidden will-change-[border-radius,transform]">
            
            {/* Hiệu ứng bóng sáng bên trong Gel lỏng */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl animate-pulse pointer-events-none will-change-opacity"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/25 rounded-full blur-2xl animate-pulse pointer-events-none will-change-opacity"></div>

            {/* Vệt sáng bóng 3D bề mặt thủy tinh */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[120px] pointer-events-none"></div>
            <div className="absolute top-2.5 left-8 right-8 h-[2.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]"></div>
          </div>

          {/* Chữ hiển thị 3D dập nổi */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center transform group-hover:scale-105 transition-transform duration-500 will-change-transform">
            <span className="text-[11px] md:text-xs font-black tracking-[0.35em] text-cyan-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              Steam Offline
            </span>
            <h2 
              className="text-5xl md:text-6xl font-black italic tracking-tighter text-white uppercase mt-1"
              style={{
                textShadow: '0 1px 0 #06b6d4, 0 2px 0 #0891b2, 0 3px 0 #0284c7, 0 4px 0 #0369a1, 0 5px 0 #075985, 0 8px 16px rgba(6,182,212,0.8)'
              }}
            >
              30.000đ
            </h2>
          </div>
        </div>

        {/* TIÊU ĐỀ THƯƠNG HIỆU */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] text-white">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">STEAM</span>
        </h1>

        {/* MÔ TẢ */}
        <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed font-medium">
          Trải nghiệm kho game AAA đồ sộ, cài đặt đơn giản, bảo mật tối ưu và cập nhật liên tục.
        </p>

        {/* THANH TÌM KIẾM (Đã loại bỏ backdrop-blur nặng nề) */}
        <div className="w-full mb-8">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            suggestions={suggestions}
            onSelectGame={handleSelectSuggestedGame}
          />
        </div>

        {/* THỐNG KÊ (Đã loại bỏ backdrop-blur để tránh lag video) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto p-1.5 rounded-xl bg-[#070b13]/95 border border-cyan-500/10 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.05)]">
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

      {/* BANNER KHUYẾN MÃI (Đã loại bỏ backdrop-blur và tối ưu hóa blur neon) */}
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