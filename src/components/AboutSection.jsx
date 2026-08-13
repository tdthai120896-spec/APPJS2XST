import React, { useMemo } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import GameCard from './GameCard';
import { RAW_GAMES } from '../gamesData';

// Component Video nền mờ tối giản
function BoomerangVideoBg({ src, className }) {
  return (
    <div className={className ?? 'absolute inset-0 w-full h-full'}>
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata" // Tải nhẹ metadata để bảo toàn tốc độ load trang
      />
    </div>
  );
}

export default function AboutSection({ onAddToCart, onOpenDetail, onBuyNow }) {
  
  // 🛠️ TỰ ĐỘNG LỌC RA 30 SIÊU PHẨM GAME HOT NHẤT TỪ GAMESDATA
  const hotGamesList = useMemo(() => {
    if (!RAW_GAMES) return [];
    
    // Gộp phẳng toàn bộ game từ các danh mục
    const allGamesArray = Object.values(RAW_GAMES).flat();
    
    // Từ khóa ưu tiên các game siêu bom tấn để đưa lên hàng đầu
    const hotKeywords = [
      'wukong', 'spider', 'red dead', 'god of war', 'tsushima', 'sekiro',
      'gta', 'grand theft auto', 'elden ring', 'cyberpunk', 'hogwarts',
      'resident evil', 'last of us', 'dragon ball', 'horizon'
    ];

    // Lọc trùng lặp game dựa trên title
    const seen = new Set();
    const uniqueGames = allGamesArray.filter(game => {
      const duplicate = seen.has(game.title);
      seen.add(game.title);
      return !duplicate;
    });

    // Sắp xếp ưu tiên các tựa game chứa từ khóa hot lên đầu trang
    const prioritized = uniqueGames.sort((a, b) => {
      const aHot = hotKeywords.some(keyword => a.title.toLowerCase().includes(keyword));
      const bHot = hotKeywords.some(keyword => b.title.toLowerCase().includes(keyword));
      if (aHot && !bHot) return -1;
      if (!aHot && bHot) return 1;
      return 0;
    });

    // Chỉ lấy tối đa 30 game hot đại diện cho trang này
    return prioritized.slice(0, 30);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-start items-center py-16 overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-[#05070a] shadow-[0_0_50px_rgba(6,182,212,0.1)] my-10 select-none transform-gpu">
      
      {/* 1. BACKGROUND VIDEO */}
      <BoomerangVideoBg src="/gaming-bg.webm" className="absolute inset-0 w-full h-full opacity-25 pointer-events-none mix-blend-lighten" />
      
      {/* Lớp phủ cân bằng của Apple giúp text nổi bật trên video */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#05070a_90%)] pointer-events-none" />

      {/* 2. QUẦNG SÁNG NEON TĨNH KHÔNG GÂY LAG */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center">
        
        {/* 3. TIÊU ĐỀ SECTION */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> SIÊU PHẨM KHUYÊN DÙNG
          </div>
          
          <h2 className="font-black uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl max-w-4xl leading-tight text-white select-none">
            DANH SÁCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GAME HOT KHUYẾN NGHỊ</span>
          </h2>
          <p className="mt-4 text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl font-medium tracking-wide">
            Tổng hợp 30 tựa game bom tấn AAA có lượt thuê và trải nghiệm nhiều nhất hệ thống. Sẵn sàng kích hoạt tự động tức thì.
          </p>
        </div>

        {/* 4. LƯỚI SẢN PHẨM BENTO 3 CỘT TRÊN DESKTOP (Đã đồng bộ chiều cao Card) */}
        {hotGamesList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-8 w-full max-w-5xl">
            {hotGamesList.map((game, index) => (
              <div 
                key={`about-hot-${index}`}
                className="h-[215px] min-[390px]:h-[240px] sm:h-[260px] md:h-[310px] w-full flex flex-col rounded-[1.2rem] md:rounded-[1.6rem]"
              >
                <GameCard 
                  game={game} 
                  onAddToCart={onAddToCart}
                  onOpenDetail={onOpenDetail}
                  onBuyNow={onBuyNow}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">Không tìm thấy dữ liệu game hot.</p>
          </div>
        )}

      </div>
    </section>
  );
}