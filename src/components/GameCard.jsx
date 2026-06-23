import React from 'react'
import { ShoppingCart, Plus, Gamepad2 } from 'lucide-react'

function GameCard({ game, onAddToCart }) {
  
  // Phát sự kiện toàn cục để App.jsx nhận diện và mở Modal Khám phá
  const handleOpenDetail = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('open-detail-modal', { detail: game }));
  };

  // Phát sự kiện toàn cục để App.jsx nhận diện và mở Modal Thanh toán
  const handleOpenPurchase = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('open-purchase-modal', { detail: game }));
  };

  return (
    <div
      className="relative group cursor-pointer w-full h-full flex flex-col transform-gpu"
      onClick={handleOpenDetail}
    >
      <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-slate-800/80 bg-[#080d16] transition-transform duration-200 ease-out group-hover:-translate-y-1 flex flex-col shadow-lg">

        {/* 1. ẢNH POSTER */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={game.poster}
            alt={game.title}
            loading="lazy"      
            decoding="async"    
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/50 transition-colors duration-200" />

          {/* Nút Khám Phá */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
            <div
              className="p-2.5 rounded-full bg-[#080d16]/90 border border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-cyan-500 hover:text-black hover:border-cyan-300 transition-colors duration-200"
              onClick={handleOpenDetail}
            >
              <Gamepad2 className="h-5 w-5 md:h-5.5 md:w-5.5 stroke-[2]" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2. KHỐI THÔNG TIN CHI TIẾT */}
        <div className="p-3 pt-2.5 pb-2 md:p-4 md:pt-3.5 flex flex-col flex-1 min-w-0">
          <h3
            className="text-gray-100 font-extrabold text-xs md:text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2 leading-tight min-h-[1.8rem] md:min-h-[2.4rem]"
            title={game.title}
          >
            {game.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-1 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)] shrink-0" />
            <span className="text-[9px] md:text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest truncate block">
              {game.genre}
            </span>
          </div>

          <div className="mt-auto pt-2">
            <span className="text-cyan-400 font-black text-xs md:text-sm tracking-widest block">
              {game.price}
            </span>
          </div>
        </div>

        {/* 3. CỤM NÚT BẤM */}
        <div className="px-3 pb-3 md:px-4 md:pb-4 flex flex-row items-center gap-2 md:gap-2.5 shrink-0 select-none">
          {/* NÚT THÊM GIỎ HÀNG */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(game);
            }}
            className="relative flex items-center justify-center h-8 w-8 md:h-9.5 md:w-9.5 rounded-full bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 shadow-md hover:text-[#080d16] hover:bg-cyan-500 hover:border-cyan-400 transition-colors duration-200 shrink-0"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="h-4 w-4 md:h-[17px] md:w-[17px] stroke-[2]" />
            <span className="absolute -top-0.5 -right-0.5 bg-cyan-400 text-[#080d16] rounded-full p-0.5 scale-[0.75] origin-top-right border border-[#080d16]">
              <Plus className="h-2 w-2 stroke-[4]" />
            </span>
          </button>

          {/* NÚT MUA NGAY */}
          <button
            onClick={handleOpenPurchase}
            className="flex-1 flex items-center justify-center py-1.5 md:py-2 rounded-full bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 font-black shadow-md hover:text-[#080d16] hover:bg-cyan-500 hover:border-cyan-400 transition-colors duration-200"
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center whitespace-nowrap">
              Mua ngay
            </span>
          </button>
        </div>

      </article>
    </div>
  )
}

export default React.memo(GameCard);