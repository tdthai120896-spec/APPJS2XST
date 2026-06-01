// MarqueeGames.jsx - FIX LỖI ADD GIỎ HÀNG 100%
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
              {/* Icon nhỏ gọn, sắc nét */}
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-black stroke-[2.5]" />

              {/* Chữ font Black, dãn cách rộng nhìn rất sang */}
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
              <div
                key={`marquee-${game.title}-${index}`}
                onClick={() => setSelectedDetailGame(game)}
                className="shrink-0 w-[200px] md:w-[240px] cursor-pointer group/marquee-item bg-[#0b101a]/60 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
                    {/* GIỮ NGUYÊN POSTER CỦA BẠN */}
                    <img
                      src={game.poster}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/marquee-item:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/marquee-item:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                      <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-500 transform scale-50 group-hover/marquee-item:scale-100">
                        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md group-hover/marquee-item:animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover/marquee-item:border-cyan-400/50 group-hover/marquee-item:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300">
                          <Eye className="w-6 h-6 text-white group-hover/marquee-item:text-cyan-400 transition-colors duration-300 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b101a] via-transparent to-transparent" />
                  </div>

                  <div className="p-3 pb-1">
                    <h4 className="font-black text-sm text-gray-200 uppercase tracking-tight truncate group-hover/marquee-item:text-cyan-400 transition-colors">
                      {game.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{game.genre}</span>
                      <span className="text-xs font-black text-cyan-400">{game.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0 mt-2 flex items-center gap-1.5 w-full">
                  <button
                    onClick={(e) => handleAddAction(e, game)} // ĐÃ SỬA: Gọi hàm add giỏ hàng chính xác
                    className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex-1 min-w-0"
                  >
                    <ShoppingBag className="h-3 w-3 stroke-[2.5]" />
                    <span className="text-[9px] font-bold uppercase">Giỏ</span>
                  </button>

                  <div className="relative group/btn BuyButton flex-1 min-w-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-20 group-hover/btn:opacity-60 transition duration-300"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPurchaseGame(game);
                      }}
                      className="relative w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-1.5 px-2 rounded-full text-[9px] font-black uppercase transition-transform active:scale-95 text-center"
                    >
                      Mua
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL CHI TIẾT - ĐÃ SỬA: Thêm onAddToCart */}
      {selectedDetailGame && (
        <GameDetailModal
          game={selectedDetailGame}
          onClose={() => setSelectedDetailGame(null)}
          onBuyNow={() => {
            setSelectedDetailGame(null);
            setSelectedPurchaseGame(selectedDetailGame);
          }}
          onAddToCart={onAddToCart} // QUAN TRỌNG: Phải có dòng này mới add được trong modal
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