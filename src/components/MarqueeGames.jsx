// components/MarqueeGames.jsx
import React from 'react';
import GameCard from './GameCard';

const MarqueeGames = ({ games, onGameClick, onAddToCart, onBuyNow }) => {
  // Nhân bản danh sách game để tạo hiệu ứng chạy vô tận mượt mà
  const displayGames = [...games, ...games, ...games];

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-2 md:py-4 select-none">
      {/* Lớp phủ mờ hiệu ứng fade ở 2 đầu */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#05070a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#05070a] to-transparent z-10 pointer-events-none" />

      {/* Container chạy Marquee */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-3 md:gap-6 px-4">
        {displayGames.map((game, index) => (
          <div 
            key={`${game.title}-${index}`} 
            /* 
               ĐÃ ĐIỀU CHỈNH CHIỀU CAO (Height):
               Mobile: h-[220px] -> h-[245px]
               Tablet: h-[270px]
               Desktop: h-[350px]
            */
            className="w-[150px] min-[390px]:w-[170px] sm:w-[200px] md:w-[260px] h-[235px] min-[390px]:h-[260px] sm:h-[285px] md:h-[365px] shrink-0"
          >
            <GameCard 
              game={game} 
              onAddToCart={onAddToCart} 
              onOpenDetail={onGameClick} 
              onBuyNow={onBuyNow} 
            />
          </div>
        ))}
      </div>

      {/* Keyframes cho hiệu ứng chạy ngang */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeGames;