import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';

function SearchBar({ searchTerm, handleSearch, suggestions, onSelectGame }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef(null);

  // 1. Tự động mở tab gợi ý khi danh sách suggestions có dữ liệu mới
  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [suggestions]);

  // 2. Xử lý đóng tab gợi ý khi người dùng click chuột ra ngoài vùng tìm kiếm
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 3. Cho phép nhấn phím phím Escape (ESC) để đóng nhanh tab gợi ý
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const neonScrollbarStyle = `
    .search-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .search-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .search-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(6, 182, 212, 0.3);
      border-radius: 999px;
    }
    .search-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(6, 182, 212, 0.6);
    }
  `;

  return (
    /* Đảm bảo ô tìm kiếm nổi lên trên cùng bằng cách gán ref */
    <div 
      ref={searchBarRef} 
      className="relative z-50 group mb-8 w-full max-w-xl mx-auto px-2 select-none"
    >
      <style>{neonScrollbarStyle}</style>

      {/* Viền sáng laser mỏng phản hồi khi Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-sm opacity-10 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none"></div>
      
      <div className="relative">
        {/* Kính lúp tìm kiếm */}
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-30">
          <Search className="h-5 w-5 text-cyan-500/60 group-hover:text-cyan-400 transition-colors" />
        </div>
        
        {/* Ô nhập liệu chuẩn Spotlight */}
        <input
          type="text"
          className="w-full bg-[#080d16] border border-cyan-500/20 rounded-2xl py-3.5 md:py-4.5 pl-12 md:pl-14 pr-6 text-white text-[16px] md:text-base placeholder-gray-500 focus:outline-none focus:border-cyan-400/40 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
          placeholder="Tìm tên game bạn muốn..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => {
            // Mở lại danh sách gợi ý nếu đã có sẵn dữ liệu và người dùng tập trung vào ô nhập liệu
            if (suggestions && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
        />

        {/* Khung danh sách kết quả gợi ý nhanh (Nền đặc 100%, chỉ hiển thị khi isOpen = true) */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-[#080d16] border border-cyan-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.98)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50">
            <div className="max-h-[200px] md:max-h-[350px] overflow-y-auto search-scrollbar p-1">
              {suggestions.map((game) => (
                <button
                  key={game.title}
                  onClick={() => {
                    onSelectGame(game);
                    setIsOpen(false); // Đóng danh sách ngay sau khi chọn game thành công
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-cyan-500/10 rounded-xl border-b border-cyan-500/5 last:border-0 text-left transition-colors duration-200 group/item"
                >
                  {/* Poster thu nhỏ sắc nét */}
                  <div className="relative h-11 w-8 shrink-0 overflow-hidden rounded-lg border border-cyan-500/10 group-hover/item:border-cyan-500/35 transition-colors">
                    <img src={game.poster} className="h-full w-full object-cover" alt="" />
                  </div>
                  
                  {/* Thông tin game tinh giản */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-xs md:text-sm text-gray-200 uppercase tracking-wide truncate group-hover/item:text-cyan-400 transition-colors">
                      {game.title}
                    </h4>
                    <p className="text-[9px] md:text-[10px] text-cyan-400/60 font-bold tracking-widest uppercase mt-0.5">
                      Sẵn hàng • {game.price}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all" />
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