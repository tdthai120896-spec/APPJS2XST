import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import GameCard from './GameCard'; 
import { RAW_GAMES } from '../gamesData'; 

// 🛠️ ĐÃ BỔ SUNG PROPS: searchTerm, handleSearch, suggestions, handleOpenModal từ file Hero sang
function AllGames({ onAddToCart, onBackToHome, searchTerm, handleSearch, suggestions, handleOpenModal }) {
  
  // Hàm xử lý gộp toàn bộ game từ mọi danh mục và loại bỏ những game bị lặp tên (title)
  const getAllUniqueGames = () => {
    if (!RAW_GAMES) return [];
    
    // Gộp tất cả mảng con thành 1 mảng phẳng duy nhất
    const allGamesArray = Object.values(RAW_GAMES).flat();
    
    // Lọc bỏ trùng lặp dựa trên tên (title) của game
    const uniqueGames = allGamesArray.reduce((accumulator, currentGame) => {
      const isDuplicated = accumulator.find(item => item.title === currentGame.title);
      if (!isDuplicated) {
        return accumulator.concat([currentGame]);
      }
      return accumulator;
    }, []);

    return uniqueGames;
  };

  const gamesList = getAllUniqueGames();

  // 🛠️ LOGIC BỔ SUNG: Lọc danh sách lưới game phía dưới theo ô tìm kiếm (nếu đang gõ)
  const filteredGamesList = gamesList.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* 🛠️ KHUNG THANH TÌM KIẾM ĐÃ CHUYỂN SANG VÀ TỐI ƯU DIỆN TÍCH CHO TRANG ALLGAMES */}
      <div className="relative z-50 w-full max-w-xl mx-auto mb-10 group px-1">
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

          {/* Khung hiển thị danh sách gợi ý nhanh khi gõ */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#0b101a]/98 border border-cyan-500/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl" style={{ zIndex: 9999 }}>
              <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
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

      {/* Lưới hiển thị danh sách thẻ game (Sửa triệt để chiều cao chống đè mobile) */}
      {filteredGamesList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2.5 gap-y-6 md:gap-x-6 md:gap-y-8 grid-auto-rows-max">
          {filteredGamesList.map((game, index) => (
            <div key={index} className="h-[200px] md:h-[240px] w-full flex flex-col overflow-hidden">
              <GameCard game={game} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-sm font-bold uppercase tracking-wider">
          Không tìm thấy game nào khớp với từ khóa "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default AllGames;