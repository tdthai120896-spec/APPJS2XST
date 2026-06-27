import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import GameCard from './GameCard';
import { RAW_GAMES, CATEGORY_META } from '../gamesData';
import SearchBar from './SearchBar';

function AllGames({ onAddToCart, onBackToHome, searchTerm, handleSearch, suggestions, handleOpenModal, handleOpenPurchaseModal }) { 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false); // 🛠️ ĐÃ THÊM: Quản lý trạng thái đóng/mở rộng danh mục
  const gamesPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // 🛠️ ĐÃ THÊM: Tự động trượt mở rộng danh mục nếu người dùng đang chọn một bộ lọc khác "Tất cả"
  useEffect(() => {
    if (selectedCategory !== 'All') {
      setIsExpanded(true);
    }
  }, [selectedCategory]);

  // TỐI ƯU A-Z: Lọc trùng và sắp xếp danh sách tổng từ A-Z một lần duy nhất khi mở trang
  const allUniqueGamesList = useMemo(() => {
    if (!RAW_GAMES) return [];
    const allGamesArray = Object.values(RAW_GAMES).flat();
    const seen = new Set();
    const uniques = allGamesArray.filter(game => {
      const duplicate = seen.has(game.title);
      seen.add(game.title);
      return !duplicate;
    });
    
    return uniques.sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  // TỐI ƯU A-Z: Sắp xếp sẵn từng danh mục nhỏ từ A-Z một lần duy nhất
  const sortedCategoriesGames = useMemo(() => {
    if (!RAW_GAMES) return {};
    const sortedMap = {};
    for (const category in RAW_GAMES) {
      if (RAW_GAMES[category]) {
        sortedMap[category] = [...RAW_GAMES[category]].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      }
    }
    return sortedMap;
  }, []);

  // TỐI ƯU A-Z: Lọc tìm kiếm trên mảng đã được xếp sẵn từ trước, ngăn nghẽn CPU lúc tìm kiếm
  const filteredGamesList = useMemo(() => {
    let baseList = selectedCategory === 'All' 
      ? allUniqueGamesList 
      : (sortedCategoriesGames[selectedCategory] || []);
      
    if (!searchTerm.trim()) return baseList;
    
    const searchLower = searchTerm.toLowerCase();
    return baseList.filter(game => game.title.toLowerCase().includes(searchLower));
  }, [selectedCategory, searchTerm, allUniqueGamesList, sortedCategoriesGames]);

  const totalPages = Math.ceil(filteredGamesList.length / gamesPerPage);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGamesList = filteredGamesList.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' }); 
  };

  return (
    <div className="w-full px-1 sm:px-0 relative select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-cyan-500/10 pb-4">
        <h2 className="text-sm md:text-2xl font-black uppercase tracking-wider text-white">
          Tất cả sản phẩm ({filteredGamesList.length})
        </h2>
        <button
          onClick={onBackToHome}
          className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-cyan-400 border border-gray-800 hover:border-cyan-500/30 px-4 py-2 rounded-full transition duration-300 bg-white/5 shrink-0"
        >
          ← Trang chủ
        </button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        suggestions={suggestions}
        onSelectGame={handleOpenModal}
      />

      {/* Cụm bộ lọc Category tối giản có tính năng thu gọn/mở rộng */}
      <div className="w-full mb-10 flex flex-col items-center">
        {/* Khung bọc danh mục có hiệu ứng co giãn mượt mà, trên Mobile kịch trần 1 dòng (38px) */}
        <div className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-[38px] md:max-h-none'}`}>
          <div className="flex flex-wrap items-center justify-center gap-2 px-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${selectedCategory === 'All'
                  ? 'bg-cyan-500 text-[#05080c] shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400'
                  : 'bg-transparent text-gray-400 border border-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400'
                }`}
            >
              Tất cả
            </button>

            {CATEGORY_META && CATEGORY_META.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${selectedCategory === cat.key
                    ? 'bg-cyan-500 text-[#05080c] shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400'
                    : 'bg-transparent text-gray-400 border border-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400'
                  }`}
              >
                {cat.key}
              </button>
            ))}
          </div>
        </div>

        {/* NÚT THAY ĐỔI ĐÓNG/MỞ DANH MỤC TRÊN MOBILE */}
        {CATEGORY_META && CATEGORY_META.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden mt-4 flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-200"
          >
            {isExpanded ? (
              <>Thu gọn bớt ▲</>
            ) : (
              <>Xem tất cả danh mục ▼</>
            )}
          </button>
        )}
      </div>

      {currentGamesList.length > 0 ? (
        <>
          {/* Lưới sản phẩm bố cục Bento đồng bộ chiều cao */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-6 grid-auto-rows-max">
            {currentGamesList.map((game, index) => (
              <div
                key={index}
                className="h-[215px] min-[390px]:h-[240px] sm:h-[260px] md:h-[310px] w-full flex flex-col rounded-[1.2rem] md:rounded-[1.6rem]"
              >
                <GameCard 
                  game={game} 
                  onAddToCart={onAddToCart} 
                  onOpenDetail={handleOpenModal}
                  onBuyNow={handleOpenPurchaseModal}
                />
              </div>
            ))}
          </div>

          {/* Phân trang tinh xảo */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 mb-6">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-full border border-cyan-500/10 bg-transparent text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 disabled:opacity-20 disabled:pointer-events-none transition duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && page - array[index - 1] > 1 && (
                      <span className="text-gray-700 px-1 text-xs">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`h-8 w-8 text-[11px] md:text-xs font-black rounded-full border transition duration-200 ${
                        currentPage === page
                          ? 'bg-cyan-500 text-[#05080c] border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'bg-transparent text-gray-400 border-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-full border border-cyan-500/10 bg-transparent text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 disabled:opacity-20 disabled:pointer-events-none transition duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 flex flex-col items-center justify-center">
          <div className="p-4 bg-white/5 rounded-full mb-4">
            <Search className="h-6 w-6 text-gray-600" />
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            Không tìm thấy game nào
          </p>
        </div>
      )}
    </div>
  );
}

export default AllGames;