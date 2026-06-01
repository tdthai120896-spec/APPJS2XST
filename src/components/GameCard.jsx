import React, { useState } from 'react'
import { ShoppingBag, Eye } from 'lucide-react' 
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal' // <-- ĐÃ SỬA: Thay thế GameModal cũ bằng GameDetailModal của bạn

function GameCard({ game, onAddToCart }) {
  const [showPurchase, setShowPurchase] = useState(false); // Trạng thái mở Modal mua hàng
  const [showDetail, setShowDetail] = useState(false);     // Trạng thái mở Modal chi tiết game

  return (
    <>
      <div 
        className="relative group cursor-pointer w-[200px] md:w-[240px] shrink-0 h-full"
        onClick={() => {
          setShowDetail(true); // Click vào thẻ sẽ mở chi tiết game độc lập
        }}
      >
        {/* Viền phát sáng tổng thể của Thẻ Game khi hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 rounded-[1.2rem] md:rounded-[1.6rem] blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-white/10 bg-[#05080c] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-cyan-400/30 flex flex-col">
          
          {/* Ảnh Poster Game & Biểu tượng Con mắt Hover */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
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

          {/* Phần thông tin chữ và nút bấm phía dưới */}
          <div className="p-3 md:p-4 flex flex-col flex-grow justify-between">
            <div>
              {/* Tên Game */}
              <h3 className="text-white font-bold truncate text-xs md:text-sm mb-1 md:mb-1.5 uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors">
                {game.title}
              </h3>
              
              {/* Giá tiền */}
              <div className="mb-2 md:mb-2.5">
                <span className="text-cyan-400 font-black text-xs md:text-sm tracking-wide">{game.price}</span>
              </div>
            </div>

            {/* Cụm nút bấm: Tối ưu chống tràn tuyệt đối */}
            <div className="flex flex-col md:flex-row items-stretch gap-2 w-full mt-auto">
              
              {/* NÚT THÊM VÀO GIỎ */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ cha
                  if (onAddToCart) onAddToCart(game);
                }}
                className="flex items-center justify-center gap-1 py-1.5 px-2 md:py-2 md:px-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:text-white hover:bg-blue-500 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95 w-full md:flex-1 min-w-0"
                title="Thêm vào giỏ hàng"
              >
                <ShoppingBag className="h-3 w-3 md:h-3.5 md:w-3.5 stroke-[2.5] shrink-0" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter truncate">Giỏ hàng</span>
              </button>

              {/* NÚT MUA NGAY */}
              <div className="relative group/btn BuyButton w-full md:flex-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover/btn:opacity-80 transition duration-300"></div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ cha
                    setShowPurchase(true); // Kích hoạt mở PurchaseModal xịn
                  }}
                  className="relative w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-1.5 px-2 md:py-2 md:px-2 rounded-full text-[9px] md:text-[10px] font-black uppercase transition-transform active:scale-95 text-center block truncate tracking-tighter"
                >
                  Mua ngay
                </button>
              </div>

            </div>
          </div>
        </article>
      </div>

      {/* MODAL THANH TOÁN CHÍNH THỨC (Gọi độc lập từ bên trong) */}
      {showPurchase && (
        <PurchaseModal 
          game={game} 
          onClose={() => setShowPurchase(false)} 
        />
      )}

      {/* MODAL CHI TIẾT GAME (Gọi file GameDetailModal.jsx riêng biệt của bạn) */}
      {showDetail && (
        <GameDetailModal 
          game={game} 
          onClose={() => setShowDetail(false)} 
          onBuyNow={() => setShowPurchase(true)} // <-- ĐÃ SỬA: Truyền prop onBuyNow để nút Mua ngay bên trong modal chi tiết kích hoạt được PurchaseModal ngoài này
        />
      )}
    </>
  )
}

export default GameCard;