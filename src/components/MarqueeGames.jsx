// MarqueeGames.jsx - FIX KÍCH THƯỚC CHUẨN GAMECARD VÀ NÚT GIỎ MÀU XANH
import React, { useState } from 'react'
import { Flame, ShoppingBag, Eye } from 'lucide-react'
import PurchaseModal from './PurchaseModal'
import GameDetailModal from './GameDetailModal'

function MarqueeGames({ games, onAddToCart }) {
  const [selectedPurchaseGame, setSelectedPurchaseGame] = useState(null);
  const [selectedDetailGame, setSelectedDetailGame] = useState(null);
  const [showToast, setShowToast] = useState(false); // State để hiện thông báo text

  if (!games || games.length === 0) return null;

  // Hàm xử lý thêm vào giỏ và hiện thông báo text chuyên nghiệp
  const handleAddAction = (e, game) => {
    e.stopPropagation(); // Ngăn không cho mở Modal khi bấm nút giỏ
    if (onAddToCart) {
      onAddToCart(game);
      // Hiện thông báo text màu Cyan như bạn muốn
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1200);
    }
  };

  return (
    <>
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

        <div className="relative w-full overflow-hidden select-none mask-gradient pt-2 pb-4">
          <div className="animate-marquee flex gap-6">
            {games.map((game, index) => (
              /* ĐÃ FIX KÍCH THƯỚC KHUNG BỌC CHO ĐỒNG BỘ 1:1 VỚI GAMECARD */
              <div
                key={`marquee-${game.title}-${index}`}
                onClick={() => setSelectedDetailGame(game)}
                className="shrink-0 w-[160px] sm:w-[200px] md:w-[280px] relative group cursor-pointer min-h-0 flex flex-col"
              >
                {/* Viền phát sáng tổng thể của Thẻ Game khi hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 rounded-[1.2rem] md:rounded-[1.6rem] blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Thẻ chứa nội dung */}
                <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-white/10 bg-[#05080c] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-cyan-400/30 flex flex-col">
                  
                  {/* 1. KHỐI ẢNH POSTER (Cố định tỉ lệ 16:9 không méo hình) */}
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

                    {/* Hiệu ứng lớp phủ & Con mắt Neon khi Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="relative w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <div className="p-3 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] backdrop-blur-sm hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all duration-200">
                          <Eye className="w-6 h-6 md:h-7 md:w-7 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* 2. KHỐI THÔNG TIN CHỮ (Khóa cứng chiều cao bằng GameCard để thẳng hàng) */}
                  <div className="p-3 pt-2.5 pb-2 md:p-4 md:pt-3 flex flex-col justify-between h-[84px] md:h-[96px] shrink-0 min-w-0">
                    <div className="min-w-0 w-full flex flex-col justify-between h-full">
                      <h3 className="text-white font-bold text-xs md:text-sm uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors block max-w-full line-clamp-2 h-8 md:h-10 leading-tight overflow-hidden">
                        {game.title}
                      </h3>
                      <div className="mt-1">
                        <span className="text-cyan-400 font-black text-xs md:text-sm tracking-wide block">{game.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. CỤM NÚT BẤM HÀNH ĐỘNG (Đổi nút Giỏ hàng sang màu xanh lam giống hệt GameCard) */}
                  <div className="px-3 pb-4 md:px-4 md:pb-5 mt-auto flex flex-col sm:flex-row gap-2 shrink-0">
                    <button
                      onClick={(e) => handleAddAction(e, game)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 md:py-2 md:px-2 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:text-white hover:bg-blue-500 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95 w-full sm:flex-1 min-w-0 shrink-0"
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingBag className="h-3 w-3 md:h-3.5 md:w-3.5 stroke-[2.5] shrink-0" />
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter truncate">Giỏ hàng</span>
                    </button>

                    <div className="relative group/btn BuyButton w-full sm:flex-1 shrink-0">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover/btn:opacity-80 transition duration-300"></div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPurchaseGame(game);
                        }}
                        className="relative w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-1.5 px-2 md:py-2 md:px-2 rounded-full text-[9px] md:text-[10px] font-black uppercase transition-transform active:scale-95 text-center block truncate tracking-tighter"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>

                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL CHI TIẾT */}
      {selectedDetailGame && (
        <GameDetailModal
          game={selectedDetailGame}
          onClose={() => setSelectedDetailGame(null)}
          onBuyNow={() => {
            setSelectedDetailGame(null);
            setSelectedPurchaseGame(selectedDetailGame);
          }}
          onAddToCart={onAddToCart}
        />
      )}

      {selectedPurchaseGame && (
        <PurchaseModal
          game={selectedPurchaseGame}
          onClose={() => setSelectedPurchaseGame(null)}
        />
      )}
    </>
  )
}

export default MarqueeGames;