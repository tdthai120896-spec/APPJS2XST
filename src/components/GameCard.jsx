import React, { useState } from 'react'
import { ShoppingBag, Eye } from 'lucide-react' 
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal' 

function GameCard({ game, onAddToCart }) {
  const [showPurchase, setShowPurchase] = useState(false); // Trạng thái mở Modal mua hàng
  const [showDetail, setShowDetail] = useState(false);     // Trạng thái mở Modal chi tiết game

  return (
    <>
      <div 
        className="relative group cursor-pointer w-full h-full min-h-0 flex flex-col" 
        onClick={() => {
          setShowDetail(true); // Click vào thẻ sẽ mở chi tiết game độc lập
        }}
      >
        {/* Viền phát sáng tổng thể của Thẻ Game khi hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 rounded-[1.2rem] md:rounded-[1.6rem] blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* Thẻ chứa nội dung - Ép cố định chiều cao h-full theo lưới AllGames */}
        <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-white/10 bg-[#05080c] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-cyan-400/30 flex flex-col">
          
          {/* 1. KHỐI ẢNH POSTER (Tỷ lệ 16:9 cố định không co giãn) */}
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
            
            {/* Lớp phủ tối nhẹ khi hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
            
            {/* BIỂU TƯỢNG CON MẮT XANH LAM NEON */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div 
                className="p-3 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] backdrop-blur-sm hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ cha
                  setShowDetail(true); // Mở xem chi tiết game
                }}
                title="Xem chi tiết game"
              >
                <Eye className="h-6 w-6 md:h-7 md:w-7 stroke-[2.5]" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* 2. KHỐI THÔNG TIN CHỮ (Đã tối ưu: Cho phép Tên game xuống dòng tối đa 2 dòng) */}
          {/* 🛠️ FIX: Khóa cứng chiều cao khối text (Mobile: h-[84px], PC: h-[96px]) để card luôn bằng phẳng dù tên game 1 hay 2 dòng */}
          <div className="p-3 pt-2.5 pb-2 md:p-4 md:pt-3 flex flex-col justify-between h-[84px] md:h-[96px] shrink-0 min-w-0">
            <div className="min-w-0 w-full flex flex-col justify-between h-full">
              
              {/* 🛠️ FIX MẤU CHỐT: Sử dụng line-clamp-2 để cho phép tự động xuống dòng khi gặp tên game dài (ví dụ: Assasin's Creed III Remastered), h-8 md:h-10 ép khung chữ cố định */}
              <h3 className="text-white font-bold text-xs md:text-sm uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors block max-w-full line-clamp-2 h-8 md:h-10 leading-tight overflow-hidden">
                {game.title}
              </h3>
              
              {/* Khối giá tiền độc lập ở dưới, luôn thẳng hàng tăm tắp */}
              <div className="mt-1">
                <span className="text-cyan-400 font-black text-xs md:text-sm tracking-wide block">{game.price}</span>
              </div>
            </div>
          </div>

          {/* 3. CỤM NÚT BẤM HÀNH ĐỘNG (Đẩy hẳn xuống đáy, cố định diện tích) */}
          <div className="px-3 pb-4 md:px-4 md:pb-5 mt-auto flex flex-col sm:flex-row gap-2 shrink-0">
            
            {/* NÚT THÊM VÀO GIỎ */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(game);
              }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 md:py-2 md:px-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:text-white hover:bg-blue-500 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95 w-full sm:flex-1 min-w-0 shrink-0"
              title="Thêm vào giỏ hàng"
            >
              <ShoppingBag className="h-3 w-3 md:h-3.5 md:w-3.5 stroke-[2.5] shrink-0" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter truncate">Giỏ hàng</span>
            </button>

            {/* NÚT MUA NGAY */}
            <div className="relative group/btn BuyButton w-full sm:flex-1 shrink-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover/btn:opacity-80 transition duration-300"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPurchase(true);
                }}
                className="relative w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-1.5 px-2 md:py-2 md:px-2 rounded-full text-[9px] md:text-[10px] font-black uppercase transition-transform active:scale-95 text-center block truncate tracking-tighter"
              >
                Mua ngay
              </button>
            </div>

          </div>
        </article>
      </div>

      {/* MODAL THANH TOÁN CHÍNH THỨC */}
      {showPurchase && (
        <PurchaseModal 
          game={game} 
          onClose={() => setShowPurchase(false)} 
        />
      )}

      {/* MODAL CHI TIẾT GAME */}
      {showDetail && (
        <GameDetailModal 
          game={game} 
          onClose={() => setShowDetail(false)} 
          onBuyNow={() => setShowPurchase(true)} 
        />
      )}
    </>
  )
}

export default GameCard;
