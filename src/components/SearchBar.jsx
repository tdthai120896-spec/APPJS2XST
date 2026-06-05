import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

function SearchBar({ searchTerm, handleSearch, suggestions, onSelectGame }) {
  return (
    <div className="relative group mb-6 w-full max-w-xl mx-auto px-1">
      {/* Hiệu ứng viền sáng neon */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-25 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-30">
          <Search className="h-4 w-4 md:h-6 md:w-6 text-cyan-400" />
        </div>
        
        {/* Ô nhập liệu tìm kiếm (Font 16px chống tự động zoom trên iPhone) */}
        <input
          type="text"
          className="w-full bg-[#0b101a]/95 border-2 border-white/10 rounded-2xl py-3.5 md:py-5 pl-12 md:pl-14 pr-6 text-white text-[16px] md:text-base focus:outline-none focus:border-cyan-400/50 backdrop-blur-md"
          placeholder="Tìm tên game bạn muốn..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Khung danh sách kết quả gợi ý nhanh */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0b101a]/98 border border-cyan-500/40 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl z-40">
            <div className="max-h-[180px] md:max-h-[350px] overflow-y-auto custom-scrollbar">
              {suggestions.map((game) => (
                <button
                  key={game.title}
                  onClick={() => onSelectGame(game)}
                  className="w-full flex items-center gap-2 md:gap-4 p-2 md:p-4 hover:bg-cyan-500/10 border-b border-white/5 last:border-0 text-left transition-all group/item"
                >
                  <div className="relative h-8 w-6 md:h-14 md:w-10 shrink-0 overflow-hidden rounded md:rounded-lg border border-white/10 group-hover/item:border-cyan-500/50 transition-colors">
                    <img src={game.poster} className="h-full w-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-[9px] md:text-sm text-white uppercase italic truncate group-hover/item:text-cyan-400 transition-colors tracking-tight">
                      {game.title}
                    </h4>
                    <p className="text-[8px] md:text-[10px] text-cyan-500/60 font-bold tracking-widest uppercase mt-0.5">
                      Sẵn hàng • {game.price}
                    </p>
                  </div>
                  <ChevronRight className="h-3 w-3 md:h-5 md:w-5 text-gray-600 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;