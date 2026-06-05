import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import GameCard from './GameCard'; 
// 🛠️ ĐÃ SỬA: Import thêm CATEGORY_META từ file gamesData
import { RAW_GAMES, CATEGORY_META } from '../gamesData'; 

function AllGames({ onAddToCart, onBackToHome, searchTerm, handleSearch, suggestions, handleOpenModal }) {
  // 🛠️ THÊM STATE: Quản lý danh mục đang được chọn (Mặc định là 'All' - Tất cả)
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Hàm xử lý gộp toàn bộ game từ mọi danh mục và loại bỏ lặp
  const getAllUniqueGames = () => {
    if (!RAW_GAMES) return [];
    const allGamesArray = Object.values(RAW_GAMES).flat();
    const uniqueGames = allGamesArray.reduce((accumulator, currentGame) => {
      const isDuplicated = accumulator.find(item => item.title === currentGame.title);
      if (!isDuplicated) {
        return accumulator.concat([currentGame]);
      }
      return accumulator;
    }, []);
    return uniqueGames;
  };

  const allUniqueGamesList = getAllUniqueGames();

  // 🛠️ LOGIC MỚI: Lọc game theo Danh Mục TRƯỚC, rồi mới lọc theo Thanh Tìm Kiếm SAU
  const getFilteredGames = () => {
    let baseList = [];
    
    // 1. Lọc theo danh mục
    if (selectedCategory === 'All') {
      baseList = allUniqueGamesList; // Lấy tất cả
    } else {
      baseList = RAW_GAMES[selectedCategory] || []; // Chỉ lấy game của danh mục được chọn
    }

    // 2. Lọc tiếp theo từ khóa tìm kiếm (nếu có)
    return baseList.filter(game => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGamesList = getFilteredGames();

  return (
    <div className="w-full px-1 sm:px-0">
      {/* Thanh tiêu đề và nút quay lại */}
      <div className="flex justify-between items-center mb-6 border-b border-cyan-500/20 pb-4">
        <h2 className="text-base md:text-3xl font-black uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          Tất cả sản phẩm ({filteredGamesList.length})
        </h2>
        <button 
          onClick={onBackToHome}
          className="text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-400 hover:text-cyan-400 border border-gray-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-full transition duration-300 bg-white/5 shrink-0"
        >
          ← Trang chủ
        </button>
      </div>

            {/* KHUNG THANH TÌM KIẾM */}
      <div className="relative z-50 w-full max-w-xl mx-auto mb-6 group px-1">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-25 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-30">
            <Search className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
          </div>
          <input
            type="text"
            className="w-full bg-[#0b101a]/95 border-2 border-white/10 rounded-2xl py-4 md:py-5 pl-14 pr-6 text-white text-sm md:text-base focus:outline-none focus:border-cyan-400/50 backdrop-blur-md"
            placeholder="Tìm tên game bạn muốn..."
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Khung hiển thị danh sách gợi ý nhanh khi gõ */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#0b101a]/98 border border-cyan-500/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl" style={{ zIndex: 9999 }}>
              <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {suggestions.map((game) => (
                  <button
                    key={game.title}
                    onClick={() => handleOpenModal(game)}
                    className="w-full flex items-center gap-4 p-3 md:p-4 hover:bg-cyan-500/10 border-b border-white/5 last:border-0 text-left transition-all group/item"
                  >
                    <div className="relative h-12 w-9 md:h-14 md:w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 group-hover/item:border-cyan-500/50 transition-colors">
                      <img src={game.poster} className="h-full w-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-xs md:text-sm text-white uppercase italic truncate group-hover/item:text-cyan-400 transition-colors tracking-tight">
                        {game.title}
                      </h4>
                      <p className="text-[9px] md:text-[10px] text-cyan-500/60 font-bold tracking-widest uppercase">
                        Sẵn hàng • {game.price}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

Tại giao trên giao diện mobile phần kết quả trả khá là to so với màn hình mobile nhờ bạn làm nhỏ lại

Click vô vào kế quả game lại không bams được nút mua ngay

      {/* 🛠️ BỘ LỌC DANH MỤC NGANG (SCROLLABLE CATEGORY BAR) */}
      {/* 🛠️ BỘ LỌC DANH MỤC (TỰ ĐỘNG XUỐNG HÀNG) */}
      <div className="w-full mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 px-1">
          {/* Nút "Tất cả" */}
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 md:px-5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-cyan-500 text-[#05080c] shadow-[0_0_15px_rgba(6,182,212,0.6)] border border-cyan-400'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10'
            }`}
          >
            Tất cả
          </button>
          
          {/* Vòng lặp in ra các danh mục từ CATEGORY_META */}
          {CATEGORY_META && CATEGORY_META.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 md:px-5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat.key
                  ? 'bg-cyan-500 text-[#05080c] shadow-[0_0_15px_rgba(6,182,212,0.6)] border border-cyan-400'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              {cat.key}
            </button>
          ))}
        </div>
      </div>

      {/* Lưới hiển thị danh sách thẻ game */}
      {filteredGamesList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-8 grid-auto-rows-max">
          {filteredGamesList.map((game, index) => (
            <div key={index} className="h-[295px] md:h-[285px] w-full flex flex-col rounded-[1.2rem] md:rounded-[1.6rem] overflow-hidden">
              <GameCard game={game} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 flex flex-col items-center justify-center">
          <div className="p-4 bg-white/5 rounded-full mb-4">
            <Search className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-gray-500 text-sm md:text-base font-bold uppercase tracking-wider">
            Không tìm thấy game nào
          </p>
          <p className="text-gray-600 text-xs mt-2 italic">
            Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.
          </p>
        </div>
      )}
    </div>
  );
}

export default AllGames;