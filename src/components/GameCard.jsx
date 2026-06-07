import React, { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Gamepad2 } from 'lucide-react'
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal'

function GameCard({ game, onAddToCart }) {
  const [showPurchase, setShowPurchase] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  
  // State quản lý việc hiển thị thông báo thêm vào giỏ hàng
  const [showToast, setShowToast] = useState(false);

  // Tự động đóng thông báo sau 1.2 giây
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Xử lý sự kiện click thêm giỏ hàng
  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(game);
    setShowToast(true); // Kích hoạt popup
  };

  return (
    <>
      <div
        className="relative group cursor-pointer w-full h-full flex flex-col will-change-transform"
        onClick={() => setShowDetail(true)}
      >
        {/* POPUP THÔNG BÁO TỐI GIẢN (Đặt ở giữa khu vực poster để dễ nhìn) */}
        {showToast && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-cyan-500 text-[#080d16] px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-cyan-300">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                Đã thêm giỏ hàng
              </span>
            </div>
          </div>
        )}

        {/* Hào quang Neon nhẹ nhàng phía sau khi Hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-[1.2rem] md:rounded-[1.6rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Thẻ chứa thông tin (Đã tối ưu hóa padding để chống tràn đáy) */}
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
            {/* Lớp phủ tối mờ */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Nút Khám Phá kính mờ ở chính giữa */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div
                className="p-2.5 rounded-full bg-[#080d16]/80 border border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur-md hover:bg-cyan-500 hover:text-black hover:border-cyan-300 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetail(true);
                }}
              >
                <Gamepad2 className="h-5.5 w-5.5 md:h-6 md:w-6 stroke-[2]" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. KHỐI THÔNG TIN CHI TIẾT (Đã giảm nhẹ padding dọc để chống tràn) */}
          <div className="p-3 pt-2.5 pb-2 md:p-4 md:pt-3.5 flex flex-col flex-1 min-w-0">
            {/* Tên game (Tối ưu lại chiều cao dòng vừa vặn) */}
            <h3
              className="text-gray-100 font-extrabold text-xs md:text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-tight min-h-[1.8rem] md:min-h-[2.4rem]"
              title={game.title}
            >
              {game.title}
            </h3>

            {/* Thể loại game kèm chấm LED Neon */}
            <div className="flex items-center gap-1.5 mt-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)] animate-pulse shrink-0" />
              <span className="text-[9px] md:text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest truncate block">
                {game.genre}
              </span>
            </div>

            {/* Giá tiền */}
            <div className="mt-auto pt-2">
              <span className="text-cyan-400 font-black text-xs md:text-sm tracking-widest block drop-shadow-[0_0_6px_rgba(6,182,212,0.2)]">
                {game.price}
              </span>
            </div>
          </div>

          {/* 3. CỤM NÚT BẤM ĐỒNG BỘ VÀ THOÁNG ĐÃNG HƠN (Giảm pb để tạo khoảng trống an toàn ở đáy khung) */}
          <div className="px-3 pb-3 md:px-4 md:pb-4 flex flex-row items-center gap-2 md:gap-2.5 shrink-0 select-none">

            {/* NÚT THÊM GIỎ HÀNG (Obsidian Neon Style) */}
            <button
              onClick={handleAddToCartClick}
              className="relative flex items-center justify-center h-8 w-8 md:h-9.5 md:w-9.5 rounded-full bg-cyan-950/15 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.05)] hover:text-[#080d16] hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.45)] transition-all duration-300 active:scale-95 shrink-0 will-change-transform"
              title="Thêm vào giỏ hàng"
            >
              <ShoppingCart className="h-4 w-4 md:h-[17px] md:w-[17px] stroke-[2]" />
              
              {/* Dấu cộng mini */}
              <span className="absolute -top-0.5 -right-0.5 bg-cyan-400 text-[#080d16] rounded-full p-0.5 scale-[0.75] origin-top-right border border-[#080d16]">
                <Plus className="h-2 w-2 stroke-[4]" />
              </span>
            </button>

            {/* NÚT MUA NGAY (Obsidian Neon Style - Đồng bộ hoàn hảo với nút giỏ hàng) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPurchase(true);
              }}
              className="flex-1 flex items-center justify-center py-1.5 md:py-2 rounded-full bg-cyan-950/15 border border-cyan-500/30 text-cyan-400 font-black shadow-[0_0_10px_rgba(6,182,212,0.05)] hover:text-[#080d16] hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.45)] transition-all duration-300 active:scale-[0.97] hover:scale-[1.01] will-change-transform"
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