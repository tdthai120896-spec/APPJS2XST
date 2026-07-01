// components/AllGames.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import GameCard from './GameCard';
import { RAW_GAMES, CATEGORY_META } from '../gamesData';

function AllGames({ searchTerm, onAddToCart, onBackToHome, handleOpenModal, handleOpenPurchaseModal }) { 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const gamesPerPage = 20;

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, searchTerm]);

  const allUniqueGamesList = useMemo(() => {
    if (!RAW_GAMES) return [];
    const allGamesArray = Object.values(RAW_GAMES).flat();
    const seen = new Set();
    const uniques = allGamesArray.filter(game => {
      const duplicate = seen.has(game.title.toLowerCase());
      seen.add(game.title.toLowerCase());
      return !duplicate;
    });
    return uniques.sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const sortedCategoriesGames = useMemo(() => {
    if (!RAW_GAMES) return {};
    const sortedMap = {};
    for (const category in RAW_GAMES) {
      if (RAW_GAMES[category]) {
        sortedMap[category] = [...RAW_GAMES[category]].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    return sortedMap;
  }, []);

  const filteredGamesList = useMemo(() => {
    let baseList = selectedCategory === 'All' ? allUniqueGamesList : (sortedCategoriesGames[selectedCategory] || []);
    if (!searchTerm || !searchTerm.trim()) return baseList;
    const searchLower = searchTerm.toLowerCase();
    return baseList.filter(game => game.title.toLowerCase().includes(searchLower));
  }, [selectedCategory, searchTerm, allUniqueGamesList, sortedCategoriesGames]);

  const totalPages = Math.ceil(filteredGamesList.length / gamesPerPage);
  const currentGamesList = filteredGamesList.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage);

  return (
    <div className="w-full px-1 relative select-none animate-in fade-in duration-500">
      
      {/* HEADER: Thu gọn padding */}
      <div className="flex justify-between items-center mb-6 border-b border-cyan-500/10 pb-4">
        <div>
            <h2 className="text-lg md:text-2xl font-black uppercase text-white tracking-tighter italic">Kho Game</h2>
            <span className="text-[9px] md:text-[10px] text-cyan-400 font-bold uppercase tracking-widest opacity-60">
                {filteredGamesList.length} sản phẩm
            </span>
        </div>
        <button onClick={onBackToHome} className="text-[9px] md:text-xs font-black uppercase tracking-widest text-gray-500 hover:text-cyan-400 transition-all">
          ← Trang chủ
        </button>
      </div>

      {/* CATEGORY: Tối ưu khoảng cách */}
      <div className="flex flex-col items-center mb-8">
        <div className={`w-full transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-[36px] md:max-h-none'}`}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-xs font-black uppercase border transition-all ${
                selectedCategory === 'All' ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-[#0a0f1a] text-gray-500 border-white/5'
              }`}
            >
              Tất cả
            </button>
            {CATEGORY_META.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-xs font-black uppercase border transition-all ${
                  selectedCategory === cat.key ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-[#0a0f1a] text-gray-500 border-white/5'
                }`}
              >
                {cat.key}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="md:hidden mt-4 text-[9px] font-black uppercase text-cyan-500/40 tracking-widest">
            {isExpanded ? 'Thu gọn ▲' : 'Danh mục ▼'}
        </button>
      </div>

      {/* LƯỚI GAME: Chiều cao được bóp gọn (Match với GameCard) */}
      {currentGamesList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8 md:gap-y-10">
          {currentGamesList.map((game, index) => (
            <div 
              key={game.title + index} 
              className="relative h-[220px] min-[390px]:h-[245px] sm:h-[270px] md:h-[350px] w-full"
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
      ) : (
        <div className="text-center py-20 opacity-30">
          <Search className="h-10 w-10 mx-auto mb-2" />
          <p className="font-black uppercase text-xs">Không có kết quả</p>
        </div>
      )}

      {/* PHÂN TRANG: Thu gọn gap */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 mb-10">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 text-gray-500 hover:text-cyan-400 disabled:opacity-0 transition-all">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && page - arr[idx - 1] > 1 && <span className="text-gray-800">..</span>}
                  <button onClick={() => setCurrentPage(page)} className={`h-8 w-8 text-[10px] font-black rounded-full border transition-all ${currentPage === page ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-transparent text-gray-600 border-white/5'}`}>
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 text-gray-500 hover:text-cyan-400 disabled:opacity-0 transition-all">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default AllGames;