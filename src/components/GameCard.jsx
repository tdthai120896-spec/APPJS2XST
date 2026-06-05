import React, { useState } from 'react'
import { ShoppingBag, Gamepad2 } from 'lucide-react'
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal'

function GameCard({ game, onAddToCart }) {
  const [showPurchase, setShowPurchase] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div
        className="relative group cursor-pointer w-full h-full flex flex-col"
        onClick={() => setShowDetail(true)}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 rounded-[1.2rem] md:rounded-[1.6rem] blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* Thẻ article phải chiếm trọn chiều cao bằng h-full */}
        <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-white/10 bg-[#05080c] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-cyan-400/30 flex flex-col">

          {/* 1. ẢNH POSTER */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5 shrink-0">
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div
                className="p-3 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] backdrop-blur-sm hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetail(true);
                }}
              >
                <Gamepad2 className="h-6 w-6 md:h-7 md:w-7 stroke-[2.5]" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. KHỐI THÔNG TIN CHỮ */}
          {/* ĐÃ SỬA: Bỏ h-[84px], dùng flex-1 để khối chữ tự giãn ra chiếm phần diện tích còn lại, đẩy nút xuống dưới cùng */}
          <div className="p-3 pt-2.5 pb-2 md:p-4 md:pt-3 flex flex-col flex-1 min-w-0">
            {/* Tên game: Ép min-h để giữ không gian cho 2 dòng kể cả khi chữ chỉ có 1 dòng */}
            <h3
              className="text-white font-bold text-xs md:text-sm uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight min-h-[2rem] md:min-h-[2.5rem]"
              title={game.title}
            >
              {game.title}
            </h3>

            {/* Thể loại game */}
            <span className="text-[9px] md:text-[10px] text-blue-400/70 uppercase tracking-wider truncate block italic mt-1">
              {game.genre}
            </span>

            {/* Giá tiền: Nằm sát dưới cùng của khối chữ nhờ mt-auto */}
            <div className="mt-auto pt-2">
              <span className="text-cyan-400 font-black text-xs md:text-sm tracking-wide block">{game.price}</span>
            </div>
          </div>

          {/* 3. CỤM NÚT BẤM (Luôn nằm ở đáy thẻ) */}
          <div className="px-3 pb-4 md:px-4 md:pb-5 flex flex-row gap-2 shrink-0">

            {/* NÚT GIỎ HÀNG (Nút phụ: Viền xanh dương, nền trong suốt) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(game);
              }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 md:py-2 md:px-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:text-white hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95 w-full flex-1 shrink-0"
            >
              <ShoppingBag className="h-3 w-3 md:h-3.5 md:w-3.5 stroke-[2.5]" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter truncate">Giỏ hàng</span>
            </button>

            {/* NÚT MUA NGAY (Nút chính: Nền Cyan đặc, phát sáng mạnh) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPurchase(true);
              }}
              className="flex items-center justify-center py-1.5 px-2 md:py-2 md:px-2 rounded-full bg-cyan-500 border border-cyan-400 text-[#05080c] shadow-[0_0_12px_rgba(6,182,212,0.5)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300 active:scale-95 w-full flex-1 shrink-0"
            >
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter truncate">Mua ngay</span>
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