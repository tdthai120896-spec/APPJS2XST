import React, { useState } from 'react'
import { Flame, ShoppingBag } from 'lucide-react'
import GameCard from './GameCard' // 🛠️ IMPORT TRỰC TIẾP GAMECARD VÀO ĐÂY

function MarqueeGames({ games, onAddToCart }) {
  const [showToast, setShowToast] = useState(false); // Chỉ giữ lại State cho thông báo Toast

  if (!games || games.length === 0) return null;

  // Hàm xử lý thêm vào giỏ và hiện thông báo text chuyên nghiệp
  const handleAddAction = (game) => {
    if (onAddToCart) {
      onAddToCart(game);
      // Hiện thông báo text màu Cyan
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1200);
    }
  };

  return (
    <section className="w-full overflow-hidden py-4 bg-gradient-to-b from-cyan-500/[0.02] to-transparent font-['Kanit']">
      
      {/* POPUP THÔNG BÁO - Xuất hiện đè lên trên cùng */}
      {showToast && (
        <div className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[1000005] pointer-events-none animate-in zoom-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-cyan-500 px-5 py-2.5 md:px-7 md:py-3 rounded-full shadow-[0_0_40px_rgba(6,182,212,0.5)] border border-white/20">
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-black stroke-[2.5]" />
            <span className="text-black font-black text-[10px] md:text-xs uppercase tracking-[0.15em] whitespace-nowrap leading-none">
              Đã thêm vào giỏ hàng
            </span>
          </div>
        </div>
      )}
      
      {/* TIÊU ĐỀ SECTION */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 animate-pulse">
            <Flame className="h-5 w-5 fill-cyan-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">
              Game ưa thích <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">được mua nhiều nhất</span>
            </h2>
          </div>
        </div>
      </div>

      {/* DANH SÁCH GAME CHẠY NGANG (MARQUEE) */}
      <div className="relative w-full overflow-hidden select-none mask-gradient pt-2 pb-4">
        <div className="animate-marquee flex gap-6">
          {games.map((game, index) => (
            /* Khung bọc giới hạn chiều rộng cho từng thẻ trên thanh trượt */
            <div
              key={`marquee-${game.title}-${index}`}
              className="shrink-0 w-[180px] sm:w-[200px] md:w-[280px]"
            >
              {/* 🛠️ GỌI COMPONENT GAMECARD VÀ TRUYỀN DỮ LIỆU VÀO */}
              <GameCard 
                game={game} 
                onAddToCart={handleAddAction} 
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default MarqueeGames;