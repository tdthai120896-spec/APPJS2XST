import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft, X } from 'lucide-react'; // 🛠️ Đã import thêm ChevronLeft
import GameCard from './GameCard';
import { RAW_GAMES, CATEGORY_META } from '../gamesData';
import SearchBar from './SearchBar';

function AllGames({ onAddToCart, onBackToHome, searchTerm, handleSearch, suggestions }) { 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchedGame, setSearchedGame] = useState(null);

  // 🛠️ 1. STATE PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20; // Số lượng game trên 1 trang

  // 🛠️ Tự động quay về trang 1 khi đổi danh mục hoặc tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

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

  // 🛠️ 2. CẮT DỮ LIỆU CHO TRANG HIỆN TẠI
  const totalPages = Math.ceil(filteredGamesList.length / gamesPerPage);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGamesList = filteredGamesList.slice(indexOfFirstGame, indexOfLastGame);

  const handleSelectSuggestedGame = (game) => {
    setSearchedGame(game); 
    if (handleSearch) {
      handleSearch({ target: { value: '' } }); 
    }
  };

  // 🛠️ Hàm chuyển trang kèm hiệu ứng cuộn lên đầu danh sách mượt mà
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' }); 
  };

  return (
    <div className="w-full px-1 sm:px-0 relative">

      {/* MODAL HIỂN THỊ GAMECARD NHỎ GỌN */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <style>
            {`
              @keyframes neonBreathe {
                0%, 100% { opacity: 0.3; transform: scale(0.98); filter: blur(8px); }
                50% { opacity: 1; transform: scale(1.04); filter: blur(18px); }
              }
              .animate-breathe { animation: neonBreathe 3s ease-in-out infinite; }
            `}
          </style>

          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[280px] animate-in zoom-in-95 duration-200 mt-4">
            <div className="absolute -inset-1.5 bg-cyan-500 rounded-[1.2rem] md:rounded-[1.6rem] animate-breathe pointer-events-none"></div>

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

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        suggestions={suggestions}
        onSelectGame={handleSelectSuggestedGame}
      />

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

      {/* 🛠️ 3. MAP QUA currentGamesList THAY VÌ filteredGamesList */}
      {currentGamesList.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-8 grid-auto-rows-max">
            {currentGamesList.map((game, index) => (
              <div
                key={index}
                className="h-[195px] min-[390px]:h-[225px] sm:h-[240px] md:h-[285px] w-full flex flex-col rounded-[1.2rem] md:rounded-[1.6rem]"
              >
                <GameCard game={game} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>

          {/* 🛠️ 4. GIAO DIỆN THANH PHÂN TRANG */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 mb-6 select-none">
              
              {/* Nút lùi */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Các số trang (Có rút gọn dấu ... nếu quá nhiều trang) */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, index, array) => {
                  return (
                    <React.Fragment key={page}>
                      {index > 0 && page - array[index - 1] > 1 && (
                        <span className="text-gray-600 px-1 text-xs">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`h-8 w-8 text-[11px] md:text-xs font-black rounded-full border transition duration-200 ${
                          currentPage === page
                            ? 'bg-cyan-500 text-[#05080c] border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-cyan-500/50 hover:text-cyan-400'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              {/* Nút tiến */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none transition duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              
            </div>
          )}
        </>
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