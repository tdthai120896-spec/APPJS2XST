import React, { useState } from 'react';
import { Search, ChevronRight, X } from 'lucide-react'; // 🛠️ Import thêm X icon
import GameCard from './GameCard';
import { RAW_GAMES, CATEGORY_META } from '../gamesData';
import SearchBar from './SearchBar';

function AllGames({ onAddToCart, onBackToHome, searchTerm, handleSearch, suggestions }) { // 🛠️ Đã bỏ handleOpenModal từ props vì mình tự xử lý ở đây
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 🛠️ STATE MỚI: Lưu trữ game được chọn từ ô tìm kiếm để hiển thị dạng Pop-up
  const [searchedGame, setSearchedGame] = useState(null);

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

  const getFilteredGames = () => {
    let baseList = [];
    if (selectedCategory === 'All') {
      baseList = allUniqueGamesList;
    } else {
      baseList = RAW_GAMES[selectedCategory] || [];
    }
    return baseList.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGamesList = getFilteredGames();

  // 🛠️ HÀM MỚI: Xử lý khi click vào game gợi ý
  const handleSelectSuggestedGame = (game) => {
    setSearchedGame(game); // Mở Pop-up chứa GameCard
    if (handleSearch) {
      handleSearch({ target: { value: '' } }); // Đóng danh sách gợi ý
    }
  };

  return (
    <div className="w-full px-1 sm:px-0 relative">

      {/* 🛠️ MODAL HIỂN THỊ GAMECARD NHỎ GỌN (Chỉ hiện khi có searchedGame) */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">

          {/* 🌟 CSS TÙY CHỈNH RIÊNG CHO HIỆU ỨNG NHỊP THỞ (NEON BREATHE) */}
          <style>
            {`
              @keyframes neonBreathe {
                0%, 100% { 
                  opacity: 0.3; 
                  transform: scale(0.98); 
                  filter: blur(8px); 
                }
                50% { 
                  opacity: 1; 
                  transform: scale(1.04); 
                  filter: blur(18px); 
                }
              }
              .animate-breathe {
                animation: neonBreathe 3s ease-in-out infinite;
              }
            `}
          </style>

          {/* Vùng bấm ra ngoài để đóng */}
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          {/* KHUNG BAO NGOÀI BẢO VỆ */}
          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[280px] animate-in zoom-in-95 duration-200 mt-4">

            {/* 🌟 ÁNH SÁNG NEON "NHỊP THỞ": Áp dụng class animate-breathe vừa tạo ở trên */}
            <div className="absolute -inset-1.5 bg-cyan-500 rounded-[1.2rem] md:rounded-[1.6rem] animate-breathe pointer-events-none"></div>

            {/* THẺ GAME CHÍNH: Nằm đè lên trên lớp ánh sáng, nền đen tuyền */}
            <div className="relative bg-[#05080c] rounded-[1.2rem] md:rounded-[1.6rem] border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]">

              <button
                onClick={() => setSearchedGame(null)}
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 md:p-1.5 shadow-lg transition-transform hover:scale-110"
              >
                <X className="h-3 w-3 md:h-4 md:w-4" />
              </button>

              <div className="h-[230px] min-[390px]:h-[250px] sm:h-[285px] md:h-[320px] w-full flex flex-col">
                <GameCard game={searchedGame} onAddToCart={onAddToCart} />
              </div>
            </div>

          </div>
        </div>
      )}

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

      {/* KHUNG THANH TÌM KIẾM DÙNG CHUNG */}
      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        suggestions={suggestions}
        onSelectGame={handleSelectSuggestedGame}
      />

      {/* BỘ LỌC DANH MỤC */}
      <div className="w-full mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 px-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 md:px-5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === 'All'
                ? 'bg-cyan-500 text-[#05080c] shadow-[0_0_15px_rgba(6,182,212,0.6)] border border-cyan-400'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
          >
            Tất cả
          </button>

          {CATEGORY_META && CATEGORY_META.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 md:px-5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat.key
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
            <div
              key={index}
              className="h-[195px] min-[390px]:h-[225px] sm:h-[240px] md:h-[285px] w-full flex flex-col rounded-[1.2rem] md:rounded-[1.6rem]"
            >
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