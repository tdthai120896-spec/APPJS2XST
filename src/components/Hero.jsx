import React, { useState } from 'react' // 🛠️ Đã thêm useState
import { Sparkles, Users, Layers, ShieldCheck, Search, ChevronRight, Gamepad2, X } from 'lucide-react' // 🛠️ Đã thêm X icon
import GameCard from './GameCard' // 🛠️ Đã import GameCard
import SearchBar from './SearchBar';

// 🛠️ ĐÃ THÊM PROPS `onAddToCart` VÀO ĐÂY ĐỂ TRUYỀN CHO GAMECARD
function Hero({ searchTerm, handleSearch, suggestions, handleOpenModal, handleNavigation, onAddToCart }) {

  // 🛠️ STATE MỚI: Quản lý việc hiển thị Pop-up GameCard
  const [searchedGame, setSearchedGame] = useState(null);

  // 🛠️ HÀM MỚI: Xử lý khi click vào game gợi ý
  const handleSelectSuggestedGame = (game) => {
    setSearchedGame(game); // Mở Pop-up chứa GameCard
    if (handleSearch) {
      handleSearch({ target: { value: '' } }); // Đóng danh sách gợi ý
    }
  };

  return (
    <section className="relative h-[850px] md:h-[900px] w-full flex flex-col items-center justify-center text-center pb-10">

      {/* 🌟 CSS TÙY CHỈNH RIÊNG CHO HIỆU ỨNG NHỊP THỞ (NEON BREATHE) */}
      <style>
        {`
          @keyframes neonBreathe {
            0%, 100% { opacity: 0.3; transform: scale(0.98); filter: blur(8px); }
            50% { opacity: 1; transform: scale(1.04); filter: blur(18px); }
          }
          .animate-breathe {
            animation: neonBreathe 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* 🛠️ MODAL HIỂN THỊ GAMECARD NHỎ GỌN (Giống hệt AllGames) */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 text-left">
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

              {/* Chiều cao thẻ đã được tối ưu để không cấn nút bấm */}
              <div className="h-[230px] min-[390px]:h-[250px] sm:h-[285px] md:h-[320px] w-full flex flex-col">
                <GameCard game={searchedGame} onAddToCart={onAddToCart} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ẢNH BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_hero.jpg"
          className="w-full h-full object-cover opacity-35 scale-105"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/50 to-transparent" />
      </div>

      {/* BANNER ƯU ĐÃI SIÊU BỰ */}
      <div className="w-full max-w-5xl px-4 md:px-8 mb-8 z-20 animate-pulse mt-12 md:mt-16">
        <div className="relative group/promo">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500 via-orange-600 to-amber-500 rounded-3xl blur-xl opacity-50 group-hover/promo:opacity-100 transition duration-1000"></div>
          <div className="relative bg-gradient-to-r from-amber-950/90 via-[#0a0c10]/95 to-orange-950/90 border-2 border-amber-400/50 p-6 md:p-8 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-3">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-spin duration-3000" /> Sự kiện tri ân giới hạn
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">
              🔥 Mua 1 Được 100: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 drop-shadow-[0_4px_15px_rgba(251,191,36,0.5)]">TẶNG LÊN ĐẾN 100 GAMES</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-300 font-extrabold tracking-wide uppercase">
              Áp dụng tự động cho một số tài khoản ngẫu nhiên sau khi mua thành công!
            </p>
          </div>
        </div>
      </div>

      {/* KHUNG NỘI DUNG CHÍNH */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">STEAM</span>
        </h1>

        <p className="text-gray-200 text-base md:text-lg max-w-xl mx-auto mb-6">
          <span className="block mb-1 md:mb-2">
            Trải nghiệm siêu phẩm AAA bản quyền.
          </span>
          <span className="block">
            Đồng giá{' '}
            <span className="text-xl md:text-2xl text-yellow-400 font-black animate-pulse drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]">
              ⚡ <span className="underline decoration-yellow-400/40 underline-offset-4">30.000đ</span> ⚡
            </span>
          </span>
        </p>

        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-8 p-1.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-wider">
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

        {/* THANH TÌM KIẾM DÙNG CHUNG */}
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          suggestions={suggestions}
          onSelectGame={handleSelectSuggestedGame}
        />
      </div>
    </section>
  )
}

export default Hero