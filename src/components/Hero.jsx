import React from 'react'
import { Sparkles, Users, Layers, ShieldCheck, Search, ChevronRight } from 'lucide-react'

function Hero({ searchTerm, handleSearch, suggestions, handleOpenModal }) {
  return (
    <section className="relative h-[800px] md:h-[850px] w-full flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_hero.jpg"
          className="w-full h-full object-cover opacity-35 scale-105"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/50 to-transparent" />
      </div>

      {/* BANNER ƯU ĐÃI SIÊU BỰ */}
      <div className="w-full max-w-5xl px-4 md:px-8 mb-8 z-20 animate-pulse">
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

      {/* KHUNG NỘI DUNG TÌM KIẾM */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">STEAM</span>
        </h1>

        <p className="text-gray-200 text-base md:text-lg max-w-xl mx-auto mb-6">
          Trải nghiệm siêu phẩm AAA bản quyền. Đồng giá <span className="text-cyan-400 font-black underline decoration-cyan-400/30 underline-offset-4">30.000đ</span>.
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

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-25 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-30">
              <Search className="h-6 w-6 text-cyan-400" />
            </div>
            <input
              type="text"
              className="w-full bg-[#0b101a]/95 border-2 border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-cyan-400/50 backdrop-blur-md"
              placeholder="Tìm tên game bạn muốn..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-[#0b101a]/98 border border-cyan-500/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl" style={{ zIndex: 9999 }}>
                <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                  {suggestions.map((game) => (
                    <button
                      key={game.title}
                      onClick={() => handleOpenModal(game)}
                      className="w-full flex items-center gap-5 p-4 hover:bg-cyan-500/10 border-b border-white/5 last:border-0 text-left transition-all group/item"
                    >
                      <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 group-hover/item:border-cyan-500/50 transition-colors">
                        <img src={game.poster} className="h-full w-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-white uppercase italic truncate group-hover/item:text-cyan-400 transition-colors tracking-tight">
                          {game.title}
                        </h4>
                        <p className="text-[10px] text-cyan-500/60 font-bold tracking-widest uppercase">
                          Sẵn hàng • {game.price}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-600 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero