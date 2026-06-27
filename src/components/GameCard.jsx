import React from 'react'
import { ShoppingCart, Plus, Gamepad2 } from 'lucide-react'

// TỐI ƯU ẢNH: Tự động chuyển đổi toàn bộ ảnh Steam sang WebP siêu nhẹ qua Proxy CDN
const getOptimizedImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('data:')) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=320&output=webp&q=80`;
};

function GameCard({ game, onAddToCart, onBuyNow, onOpenDetail }) {
  const optimizedPoster = getOptimizedImageUrl(game.poster);

  // Xử lý mở Modal chi tiết bằng cơ chế kết hợp: Prop hoặc phát Sự kiện toàn cục lên App.jsx
  const handleOpenDetail = (e) => {
    if (e) e.stopPropagation();
    if (onOpenDetail) {
      onOpenDetail(game);
    } else {
      // Phát sự kiện toàn cục nếu cha không truyền prop (Đảm bảo hoạt động 100% trên mọi kệ game/marquee)
      window.dispatchEvent(new CustomEvent('open-detail-modal', { detail: game }));
    }
  };

  // Xử lý mở Modal mua ngay bằng cơ chế kết hợp: Prop hoặc phát Sự kiện toàn cục lên App.jsx
  const handleOpenPurchase = (e) => {
    if (e) e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(game);
    } else {
      // Phát sự kiện toàn cục nếu cha không truyền prop (Đảm bảo hoạt động 100% trên mọi kệ game/marquee)
      window.dispatchEvent(new CustomEvent('open-purchase-modal', { detail: game }));
    }
  };

  return (
    <div
      className="relative group cursor-pointer w-full h-full flex flex-col transform-gpu will-change-transform"
      onClick={handleOpenDetail}
    >
      <article className="relative w-full h-full overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] border border-slate-800/80 bg-[#080d16] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 flex flex-col shadow-lg transform-gpu will-change-transform">

        {/* 1. ẢNH POSTER */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={optimizedPoster}
            alt={game.title}
            loading="lazy"     
            decoding="async"   
            className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] transform-gpu"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/50 transition-colors duration-300" />

          {/* Nút Khám Phá */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none group-hover:pointer-events-auto transform-gpu">
            <div
              className="p-2.5 rounded-full bg-[#080d16]/95 border border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:bg-cyan-500 hover:text-black hover:border-cyan-300 transition-[background-color,color,transform] duration-200 ease-out transform-gpu active:scale-90 cursor-pointer pointer-events-auto"
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
            className="text-gray-100 font-extrabold text-xs md:text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-tight min-h-[1.8rem] md:min-h-[2.4rem]"
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

        {/* 3. CỤM NÚT BẤM VÀ TEXT PHỤ CHỚP NHÁY */}
        {/* Giảm nhẹ bottom padding (pb-2.5 / pb-3) và bổ sung gap-1.5 để chừa diện tích hiển thị gọn gàng */}
        <div className="px-3 pb-2.5 md:px-4 md:pb-3 flex flex-col gap-1.5 shrink-0 select-none">
          <div className="flex flex-row items-center gap-2 md:gap-2.5">
            {/* NÚT THÊM GIỎ HÀNG */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(game);
              }}
              className="relative flex items-center justify-center h-8 w-8 md:h-9.5 md:w-9.5 rounded-full bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 shadow-md hover:text-[#080d16] hover:bg-cyan-500 hover:border-cyan-400 transition-colors duration-200 transform-gpu active:scale-90 shrink-0"
              title="Thêm vào giỏ hàng"
            >
              <ShoppingCart className="h-4 w-4 md:h-[17px] md:w-[17px] stroke-[2]" />
              <span className="absolute -top-0.5 -right-0.5 bg-cyan-400 text-[#080d16] rounded-full p-0.5 scale-[0.75] origin-top-right border border-[#080d16]">
                <Plus className="h-2 w-2 stroke-[4]" />
              </span>
            </button>

            {/* NÚT THUÊ NGAY */}
            <button
              onClick={handleOpenPurchase}
              className="flex-1 flex items-center justify-center py-1.5 md:py-2 rounded-full bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 font-black shadow-md hover:text-[#080d16] hover:bg-cyan-500 hover:border-cyan-400 transition-colors duration-200 transform-gpu active:scale-[0.98]"
            >
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center whitespace-nowrap">
                Thuê ngay
              </span>
            </button>
          </div>
          
          {/* TEXT NHỎ NHẤP NHÁY BÊN DƯỚI */}
          <span className="text-[8px] md:text-[9px] whitespace-nowrap text-yellow-400 font-semibold tracking-wider animate-pulse text-center leading-none drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
  (Thuê dài hạn, chơi không giới hạn)
</span>
        </div>

      </article>
    </div>
  )
}

export default React.memo(GameCard);