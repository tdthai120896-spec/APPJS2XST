import React, { useState } from 'react' // 🛠️ Đã thêm useState
import { Sparkles, Users, Layers, ShieldCheck, X } from 'lucide-react' // 🛠️ Đã thêm X icon
import GameCard from './GameCard' // 🛠️ Đã import GameCard
import SearchBar from './SearchBar';

// 🛠️ PROPS `onAddToCart` TRUYỀN CHO GAMECARD
function Hero({ searchTerm, handleSearch, suggestions, handleOpenModal, handleNavigation, onAddToCart }) {

  // STATE: Quản lý việc hiển thị Pop-up GameCard khi tìm kiếm
  const [searchedGame, setSearchedGame] = useState(null);

  // Xử lý khi click vào game gợi ý
  const handleSelectSuggestedGame = (game) => {
    setSearchedGame(game); // Mở Pop-up chứa GameCard
    if (handleSearch) {
      handleSearch({ target: { value: '' } }); // Đóng danh sách gợi ý
    }
  };

  return (
    <section className="relative min-h-[950px] md:min-h-[1000px] w-full flex flex-col items-center justify-between text-center pt-24 pb-12 overflow-hidden bg-[#05070a]">

      {/* 🌟 CSS TÙY CHỈNH CHO HIỆU ỨNG NHỊP THỞ (NEON BREATHE) VÀ LIQUID BLOB */}
      <style>
        {`
          @keyframes neonBreathe {
            0%, 100% { opacity: 0.3; transform: scale(0.98); filter: blur(8px); }
            50% { opacity: 1; transform: scale(1.04); filter: blur(18px); }
          }
          .animate-breathe {
            animation: neonBreathe 3s ease-in-out infinite;
          }

          @keyframes liquid {
            0%, 100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              border-radius: 30% 60% 70% 30% / 50% 60% 30% 60%;
            }
          }
          .animate-liquid-blob {
            animation: liquid 8s ease-in-out infinite;
          }
        `}
      </style>

      {/* 🛠️ MODAL HIỂN THỊ GAMECARD NHỎ GỌN */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200 text-left">
          {/* Vùng bấm ra ngoài để đóng */}
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[320px] animate-in zoom-in-95 duration-200 mt-4">

            {/* ÁNH SÁNG NEON "NHỊP THỞ" */}
            <div className="absolute -inset-1.5 bg-cyan-500 rounded-[1.2rem] md:rounded-[1.6rem] animate-breathe pointer-events-none"></div>

            {/* THẺ GAME CHÍNH */}
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

      {/* 1/ VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 scale-105"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Lớp phủ chuyển màu mượt mà để giữ độ tương phản cho text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/50 to-[#05070a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#05070a_95%)]" />
      </div>

      {/* 2 & 4/ KHUNG NỘI DUNG CHÍNH (ĐƯA LÊN TRẦN ĐỂ TẬP TRUNG TÌM KIẾM) */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        
        {/* ICON CHỮ "Steam Offline 30k" HIỆU ỨNG LIQUID CHUYỂN ĐỘNG */}
        <div className="inline-flex items-center justify-center mb-6 relative group select-none">
          {/* Vùng phát sáng nền */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse"></div>
          
          {/* Viền Liquid chuyển động tròn trịa */}
          <div className="relative animate-liquid-blob bg-[#05070a]/90 border border-cyan-400/80 px-6 py-2.5 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-100 text-xs md:text-sm font-black uppercase tracking-widest whitespace-nowrap">
              ⚡ Steam Offline 30k ⚡
            </span>
          </div>
        </div>

        {/* TIÊU ĐỀ THƯƠNG HIỆU */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">STEAM</span>
        </h1>

        {/* MÔ TẢ NGẮN */}
        <p className="text-gray-200 text-base md:text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Trải nghiệm các siêu phẩm AAA bản quyền an toàn, ổn định với chi phí tối ưu nhất.
        </p>

        {/* THANH TÌM KIẾM (ĐẶT Ở VỊ TRÍ TRUNG TÂM HOẠT ĐỘNG) */}
        <div className="w-full mb-8">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            suggestions={suggestions}
            onSelectGame={handleSelectSuggestedGame}
          />
        </div>

        {/* CÁC CHỈ SỐ THỐNG KÊ (SOCIAL PROOF) */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto p-1.5 rounded-xl bg-black/50 border border-cyan-500/10 backdrop-blur-md text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.05)]">
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

      {/* 2 & 3/ BANNER KHUYẾN MÃI (CHUYỂN XUỐNG DƯỚI CÙNG ĐỂ TẠO SỰ CHUYỂN GIAO MƯỢT MÀ) */}
      <div className="w-full max-w-5xl px-4 md:px-8 mt-12 z-20">
        <div className="relative group/promo">
          {/* Viền neon mờ chuyển màu cyan/blue nhịp thở nhẹ nhàng */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover/promo:opacity-60 transition duration-1000"></div>
          
          <div className="relative bg-gradient-to-r from-black/80 via-[#0a0c10]/95 to-black/80 border border-cyan-500/30 p-5 md:p-6 rounded-3xl shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-2.5">
              <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" /> Sự kiện tri ân giới hạn
            </div>
            
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none mb-2">
              🔥 Mua 1 Được 100: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">TẶNG LÊN ĐẾN 100 GAMES</span>
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