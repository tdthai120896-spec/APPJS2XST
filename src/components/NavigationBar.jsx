// components/NavigationBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, Gamepad2 } from 'lucide-react';

const NavigationBar = ({ currentView, handleNavigation, searchTerm, handleSearch, suggestions, onSelectGame }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef(null);

  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'guide', label: 'Hướng Dẫn' },
    { id: 'contact', label: 'Liên Hệ' },
    { id: 'AllGames', label: 'All Games' }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (suggestions?.length > 0) setIsSearchOpen(true);
  }, [suggestions]);

  return (
    <div className="fixed top-3 left-0 right-0 z-[1000] flex justify-center px-2 sm:px-4 select-none pointer-events-none">
      <div 
        ref={containerRef}
        className="pointer-events-auto w-full max-w-[550px] md:max-w-2xl flex flex-col bg-[#030712]/95 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-cyan-500/20 shadow-2xl overflow-visible transition-all duration-300"
      >
        <nav className="flex items-center justify-center p-1 md:p-1.5 gap-0.5 md:gap-1 px-1.5 md:px-2" >
          {navLinks.map((item) => {
            const isActive = currentView === item.id;
            const isAllGames = item.id === 'AllGames';

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative flex items-center justify-center text-[9px] xs:text-[10px] md:text-xs font-black uppercase tracking-tight md:tracking-wider px-2.5 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300 border outline-none ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                    // 🛠️ FIX: CHỮ MÀU TRẮNG
                    : 'bg-transparent text-white hover:text-cyan-400 border-transparent'
                }`}
              >
                {isAllGames && (
                  <Gamepad2 className={`w-3.5 h-3.5 mr-1.5 hidden min-[400px]:block ${isActive ? 'animate-bounce text-cyan-400' : ''}`} />
                )}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        <div className="relative p-1.5 md:p-2 group">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-3.5 h-3.5 text-white-500/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => suggestions?.length > 0 && setIsSearchOpen(true)}
              placeholder="Tìm game nhanh..."
              className="w-full bg-cyan-950/20 border border-cyan-400/30 rounded-full py-2 md:py-2.5 pl-10 pr-4 text-white text-xs md:text-sm focus:outline-none focus:border-cyan-300/50 transition-all placeholder:text-gray-400"
            />
          </div>

          {isSearchOpen && suggestions?.length > 0 && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#070b14] border border-cyan-500/30 rounded-[1.2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="max-h-[250px] md:max-h-[350px] overflow-y-auto p-1.5 custom-scrollbar">
                {suggestions.map((game) => (
                  <button
                    key={game.title}
                    onClick={() => { onSelectGame(game); setIsSearchOpen(false); }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-cyan-500/10 rounded-lg transition-all group/item mb-1 last:mb-0 text-left"
                  >
                    <img src={game.poster} className="h-10 w-7 object-cover rounded border border-white/5" alt="" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[10px] md:text-xs text-gray-200 uppercase truncate group-hover:text-cyan-400">
                        {game.title}
                      </h4>
                      <p className="text-[9px] text-cyan-400/50 font-bold uppercase">{game.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;