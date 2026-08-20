import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import GameCard from './GameCard';
import { RAW_GAMES } from '../gamesData';

export default function AboutSection({ onAddToCart, onOpenDetail, onBuyNow }) {
  
  const hotGamesList = useMemo(() => {
    try {
      if (!RAW_GAMES) return [];
      const allGamesArray = Object.values(RAW_GAMES).flat();
      if (!allGamesArray || allGamesArray.length === 0) return [];
      
      const hotKeywords = [
        'Reincarnation','Mortal Shell','wukong', 'spider', 'red dead', 'god of war', 'tsushima', 'sekiro',
        'gta', 'grand theft auto', 'elden ring', 'cyberpunk', 'hogwarts',
        'resident evil', 'last of us', 'dragon ball', 'horizon'
      ];

      const seen = new Set();
      const uniqueGames = allGamesArray.filter(game => {
        if (!game || !game.title) return false;
        const duplicate = seen.has(game.title.toLowerCase());
        seen.add(game.title.toLowerCase());
        return !duplicate;
      });

      const prioritized = uniqueGames.sort((a, b) => {
        const aTitle = a.title ? a.title.toLowerCase() : '';
        const bTitle = b.title ? b.title.toLowerCase() : '';
        const aHot = hotKeywords.some(keyword => aTitle.includes(keyword));
        const bHot = hotKeywords.some(keyword => bTitle.includes(keyword));
        if (aHot && !bHot) return -1;
        if (!aHot && bHot) return 1;
        return 0;
      });

      return prioritized.slice(0, 30);
    } catch (error) {
      console.error("Lỗi khi xử lý danh sách game hot:", error);
      return [];
    }
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-start items-center py-10 md:py-16 overflow-hidden rounded-[2rem] border border-cyan-500/10 bg-[#05070a] shadow-2xl my-6 select-none transform-gpu">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030508_95%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* TIÊU ĐỀ SECTION */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-cyan-300" /> SIÊU PHẨM KHUYÊN DÙNG
          </div>
          
          <h2 className="font-black uppercase tracking-tighter text-2xl sm:text-4xl md:text-5xl leading-tight text-white select-none italic">
            DANH SÁCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GAME HOT NEXUS</span>
          </h2>
          <p className="mt-3 text-gray-500 text-[10px] md:text-xs leading-relaxed max-w-lg font-bold uppercase tracking-wider opacity-80">
            Tổng hợp 30 tựa game bom tấn AAA có lượt thuê nhiều nhất. <br className="hidden md:block" /> Sẵn sàng kích hoạt tức thì.
          </p>
        </div>

        {/* 🛠️ LƯỚI SẢN PHẨM: ĐÃ ĐIỀU CHỈNH CHIỀU CAO (Height) CHUẨN */}
        {hotGamesList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-10 md:gap-x-8 md:gap-y-12 w-full max-w-5xl">
            {hotGamesList.map((game, index) => (
              <div 
                key={`about-hot-${index}`}
                /* 
                   CHIỀU CAO VÀNG:
                   Mobile: h-[270px]
                   Desktop: h-[380px] 
                   => Đảm bảo lòi hết nút "Thuê ngay" và "Thêm giỏ hàng"
                */
                className="relative h-[270px] min-[390px]:h-[280px] sm:h-[300px] md:h-[380px] w-full flex flex-col transition-transform duration-300 hover:z-20"
              >
                <GameCard 
                  game={game} 
                  onAddToCart={onAddToCart} 
                  onOpenDetail={onOpenDetail}
                  onBuyNow={onBuyNow}
                  // Ưu tiên load ảnh cho 6 game đầu tiên để tăng điểm LCP
                  priority={index < 6}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Đang tối ưu dữ liệu...</p>
          </div>
        )}

      </div>
    </section>
  );
}