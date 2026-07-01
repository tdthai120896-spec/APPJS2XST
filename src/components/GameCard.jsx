import React from 'react'
import { ShoppingCart, Plus, Gamepad2 } from 'lucide-react'

// TỐI ƯU ẢNH: ÉP định dạng WebP và giảm kích thước ảnh dựa trên thiết bị
const getOptimizedImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('data:')) return url;
  // Giảm w=320 giúp file ảnh poster chỉ còn khoảng 15-20kb
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=320&output=webp&q=80`;
};

// 🛠️ THÊM PROP priority: Để phân biệt card nào nằm trên cùng (Hero/Marquee) và card nào ở dưới
function GameCard({ game, onAddToCart, onBuyNow, onOpenDetail, priority = false }) {
  const optimizedPoster = getOptimizedImageUrl(game.poster);

  const handleOpenDetail = (e) => {
    if (e) e.stopPropagation();
    if (onOpenDetail) {
      onOpenDetail(game);
    } else {
      window.dispatchEvent(new CustomEvent('open-detail-modal', { detail: game }));
    }
  };

  const handleOpenPurchase = (e) => {
    if (e) e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(game);
    } else {
      window.dispatchEvent(new CustomEvent('open-purchase-modal', { detail: game }));
    }
  };

  return (
    <div
      className="relative group cursor-pointer w-full h-full flex flex-col transform-gpu"
      onClick={handleOpenDetail}
    >
      <article className="relative w-full h-full overflow-hidden rounded-[1rem] md:rounded-[1.6rem] border border-white/5 bg-[#080d16] transition-all duration-300 md:group-hover:-translate-y-1.5 flex flex-col shadow-md md:hover:shadow-cyan-500/10 transform-gpu">

        {/* 1. ẢNH POSTER - Đã thêm hiệu ứng Discover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={optimizedPoster}
            alt={game.title}
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : "auto"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-[1.08] transform-gpu"
          />

          {/* Lớp phủ màu tối mặc định */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-transparent to-transparent opacity-60" />

          {/* 🌟 HIỆU ỨNG MỚI: Chỉ hiện trên Desktop khi Hover */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {/* Thay con mắt bằng biểu tượng Gamepad hoặc Search sắc nét */}
              <div className="p-3 rounded-full bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
                Xem chi tiết
              </span>
            </div>
          </div>

          {/* Hiệu ứng Scanner Line chạy dọc ảnh khi hover */}
          <div className="absolute inset-0 w-full h-[2px] bg-cyan-400/50 blur-[1px] -translate-y-full group-hover:animate-[scan_1.5s_ease-in-out_infinite] hidden md:block" />
        </div>

        {/* 2. KHỐI THÔNG TIN */}
        <div className="p-2.5 md:p-4 flex flex-col flex-1 min-w-0">
          <h3 className="text-gray-100 font-bold text-[11px] md:text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug min-h-[2.2rem] md:min-h-[2.4rem]">
            {game.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-cyan-500 shrink-0" />
            <span className="text-[8px] md:text-[10px] text-cyan-400/60 font-black uppercase tracking-widest truncate">
              {game.genre}
            </span>
          </div>

          <div className="mt-auto pt-2 flex justify-between items-end">
            <span className="text-cyan-400 font-black text-xs md:text-sm tracking-tighter">
              {game.price}
            </span>
          </div>
        </div>

        {/* 3. CỤM NÚT BẤM - ĐƠN GIẢN HÓA ĐỂ GIẢM NHIỆT */}
        <div className="px-2.5 pb-2.5 md:px-4 md:pb-4 flex flex-col gap-2 shrink-0">
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(game);
              }}
              className="flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-full bg-white/5 border border-white/10 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all active:scale-90 shrink-0"
            >
              <ShoppingCart className="h-4 w-4 md:h-4.5 md:w-4.5" />
            </button>

            <button
              onClick={handleOpenPurchase}
              className="flex-1 py-1.5 md:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all active:scale-95"
            >
              Thuê ngay
            </button>
          </div>

          <p className="text-[8px] md:text-[9px] text-white-400/60 font-black tracking-[0.1em] text-center">
            (Không giới hạn giờ chơi)
          </p>
        </div>

      </article>
    </div>
  )
}

export default React.memo(GameCard);