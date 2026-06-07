import React, { useState } from 'react'
import { ShoppingCart, Plus, Gamepad2 } from 'lucide-react'
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal'

function GameCard({ game, onAddToCart }) {
  const [showPurchase, setShowPurchase] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div
        className="relative group cursor-pointer w-full h-full flex flex-col will-change-transform"
        onClick={() => setShowDetail(true)}
      >
        {/* Hào quang Neon nhẹ nhàng phía sau khi Hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-[1.2rem] md:rounded-[1.6rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Thẻ chứa thông tin (Đã bỏ backdrop-blur-xl để tăng hiệu năng cuộn trang) */}
        <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-slate-800/80 bg-[#080d16] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:-translate-y-1.5 group-hover:border-cyan-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_12px_30px_rgba(6,182,212,0.25)] flex flex-col will-change-[transform,border-color]">

          {/* 1. ẢNH POSTER */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 shrink-0">
            <img
              src={game.poster}
              alt={game.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out scale-[1.01] group-hover:scale-[1.06] transform-gpu"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'transform',
                imageRendering: '-webkit-optimize-contrast'
              }}
            />
            {/* Lớp phủ chuyển màu tối huyền bí */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Nút Khám Phá kính mờ sang trọng ở chính giữa */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div
                className="p-3 rounded-full bg-[#080d16]/80 border border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur-md hover:bg-cyan-500 hover:text-black hover:border-cyan-300 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetail(true);
                }}
              >
                <Gamepad2 className="h-6 w-6 md:h-7 md:w-7 stroke-[2]" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. KHỐI THÔNG TIN CHI TIẾT */}
          <div className="p-3.5 pt-3 pb-2.5 md:p-4.5 md:pt-4.5 flex flex-col flex-1 min-w-0">
            {/* Tên game */}
            <h3
              className="text-gray-100 font-extrabold text-xs md:text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-tight min-h-[2.2rem] md:min-h-[2.5rem]"
              title={game.title}
            >
              {game.title}
            </h3>

            {/* Thể loại game kèm chấm LED Neon nhấp nháy */}
            <div className="flex items-center gap-1.5 mt-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)] animate-pulse shrink-0" />
              <span className="text-[9px] md:text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest truncate block">
                {game.genre}
              </span>
            </div>

            {/* Giá tiền nổi bật */}
            <div className="mt-auto pt-3">
              <span className="text-cyan-400 font-black text-xs md:text-sm tracking-widest block drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                {game.price}
              </span>
            </div>
          </div>

          {/* 3. CỤM NÚT BẤM (Thiết kế liền mạch, cao cấp) */}
          <div className="px-3.5 pb-4.5 md:px-4.5 md:pb-5 flex flex-row items-center gap-2.5 shrink-0">

            {/* NÚT THÊM GIỎ HÀNG (Cyberpunk Shopee Style) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(game);
              }}
              className="relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:text-black hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 active:scale-95 shrink-0 will-change-transform"
              title="Thêm vào giỏ hàng"
            >
              <ShoppingCart className="h-4 w-4 md:h-[18px] md:w-[18px] stroke-[2]" />
              
              {/* Dấu cộng mini thiết kế tinh xảo hơn */}
              <span className="absolute -top-0.5 -right-0.5 bg-cyan-400 text-[#080d16] rounded-full p-0.5 scale-[0.75] origin-top-right border border-[#080d16] group-hover/btn:bg-white transition-colors">
                <Plus className="h-2 w-2 stroke-[4]" />
              </span>
            </button>

            {/* NÚT MUA NGAY (Liquid 3D Gradient) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPurchase(true);
              }}
              className="flex-1 flex items-center justify-center py-2 md:py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-[#080d16] font-black border border-cyan-300/60 shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 active:scale-[0.97] hover:scale-[1.01] will-change-transform"
            >
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center whitespace-nowrap">
                Mua ngay
              </span>
            </button>

          </div>

        </article>
      </div>

      {showPurchase && <PurchaseModal game={game} onClose={() => setShowPurchase(false)} />}
      {showDetail && <GameDetailModal game={game} onClose={() => setShowDetail(false)} onBuyNow={() => setShowPurchase(true)} />}
    </>
  )
}

export default GameCard;