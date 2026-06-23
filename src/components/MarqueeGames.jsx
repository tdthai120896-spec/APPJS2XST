import React from 'react'
import { Flame } from 'lucide-react'
import GameCard from './GameCard'

function MarqueeGames({ games }) {
  if (!games || games.length === 0) return null;

  // Lấy ra 10 sản phẩm đầu tiên để nhân đôi tạo hiệu ứng trượt vô tận nhẹ nhàng
  const displayGames = games.slice(0, 10);

  return (
    <section className="relative w-full overflow-hidden py-8 bg-[#05070a] select-none">
      {/* 🌟 CSS MARQUEE CHẠY TRỰC TIẾP TRÊN GPU (0MS BLOCKING TIME) */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-css {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          /* Tạm dừng chuyển động mượt mà khi di chuột vào (Chỉ hoạt động trên Desktop) */
          @media (min-width: 768px) {
            .animate-marquee-css:hover {
              animation-play-state: paused;
            }
          }
        `}
      </style>
      
      {/* TIÊU ĐỀ SECTION */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-6 select-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
            <Flame className="h-5 w-5 fill-cyan-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
              Game ưa thích <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">được mua nhiều nhất</span>
            </h2>
          </div>
        </div>
      </div>

      {/* DANH SÁCH GAME TRƯỢT NGANG */}
      <div className="relative w-full overflow-hidden pt-2 pb-6">
        {/* Lớp phủ mờ 3D ở 2 đầu */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-20 bg-gradient-to-r from-[#05070a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-20 bg-gradient-to-l from-[#05070a] to-transparent z-10 pointer-events-none" />

        {/* Khung trượt chính chạy bằng CSS GPU Animation */}
        <div className="animate-marquee-css gap-4 md:gap-6 px-4 md:px-10">
          {/* Lượt đầu tiên */}
          {displayGames.map((game, index) => (
            <div
              key={`marquee-first-${game.title}-${index}`}
              className="shrink-0 w-[180px] sm:w-[200px] md:w-[260px]"
            >
              <GameCard game={game} />
            </div>
          ))}
          {/* Lượt thứ hai nối đuôi */}
          {displayGames.map((game, index) => (
            <div
              key={`marquee-second-${game.title}-${index}`}
              className="shrink-0 w-[180px] sm:w-[200px] md:w-[260px]"
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default MarqueeGames;