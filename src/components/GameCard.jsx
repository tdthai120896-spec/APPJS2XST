import React, { useState } from 'react'
import { ShoppingBag, Eye } from 'lucide-react'
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal'

function GameCard({ game, onAddToCart }) {
  const [showPurchase, setShowPurchase] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showToast, setShowToast] = useState(false); // 1. Thêm state thông báo

  // 2. Hàm xử lý khi bấm nút Giỏ hàng
  const handleAddToCartInternal = (e) => {
    e.stopPropagation(); // Chặn mở Modal khi bấm nút
    if (onAddToCart) {
      onAddToCart(game); // Gọi hàm add vào giỏ chính

      // Hiển thị thông báo text
      setShowToast(true);

      // Tự động ẩn sau 1.2 giây
      setTimeout(() => {
        setShowToast(false);
      }, 1200);
    }
  };

  return (
    <>
      {/* 3. POPUP THÔNG BÁO DẠNG TEXT THUẦN (Hiện đè lên mọi thứ) */}
      {showToast && (
        <div className="fixed top-[15%]  left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000005] pointer-events-none animate-in zoom-in fade-in duration-300">
          <div className="flex items-center justify-center bg-cyan-500 px-5 py-2.5 md:px-7 md:py-3 rounded-full shadow-[0_0_40px_rgba(6,182,212,0.5)] border border-white/20">
            <span className="text-black font-black text-[10px] md:text-xs uppercase tracking-[0.2em] leading-none whitespace-nowrap">
              ● Đã thêm vào giỏ hàng
            </span>
          </div>
        </div>
      )}

      <div
        className="relative group cursor-pointer w-[calc((100%-12px)/2)] md:w-[calc((100%-48px)/5)] shrink-0 snap-start"
        onClick={() => setShowDetail(true)}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 rounded-[1rem] md:rounded-[1.4rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <article className="relative w-full h-full overflow-hidden rounded-[1rem] md:rounded-[1.4rem] border border-white/10 bg-[#05080c] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-400/30 flex flex-col">

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[1rem] md:rounded-t-[1.4rem] isolate bg-[#05080c] shrink-0">
            <img src={game.poster} alt={game.title} className="h-full w-full object-cover transition-transform duration-700 ease-out scale-[1.01] group-hover:scale-[1.05] transform-gpu" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Icon mắt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div className="p-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)] backdrop-blur-sm hover:bg-blue-500 hover:text-white transition-all duration-200">
                <Eye className="h-4 w-4 stroke-[2.5]" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-2.5 md:p-3 flex flex-col flex-grow justify-between gap-2.5">
            <div>
              <h3 className="text-white font-bold truncate text-[11px] md:text-xs mb-0.5 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                {game.title}
              </h3>
              <div className="flex items-center justify-between mt-1 mb-0.5">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate max-w-[50%]">{game.genre}</span>
                <span className="text-cyan-400 font-black text-[11px] md:text-xs tracking-wide">{game.price}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-1.5 w-full mt-auto">
              {/* NÚT GIỎ HÀNG ĐÃ CẬP NHẬT HÀM */}
              <button
                onClick={handleAddToCartInternal}
                className="flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-full bg-blue-600/10 border border-blue-500/40 text-blue-400 hover:text-white hover:bg-blue-500 transition-all duration-300 active:scale-95 w-full sm:flex-1 min-w-0"
              >
                <ShoppingBag className="h-3 w-3 stroke-[2.5] shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-tighter truncate">Giỏ</span>
              </button>

              <div className="relative group/btn BuyButton w-full sm:flex-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-20 group-hover/btn:opacity-60 transition duration-300"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowPurchase(true); }}
                  className="relative w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-1.5 px-1.5 rounded-full text-[9px] font-black uppercase transition-transform active:scale-95 text-center block truncate tracking-tighter"
                >
                  Mua
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {showPurchase && <PurchaseModal game={game} onClose={() => setShowPurchase(false)} />}

      {showDetail && (
        <GameDetailModal
          game={game}
          onClose={() => setShowDetail(false)}
          onBuyNow={() => { setShowDetail(false); setShowPurchase(true); }}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  )
}

export default GameCard;