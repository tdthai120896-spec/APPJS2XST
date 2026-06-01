import React from 'react';

const NavigationBar = ({ currentView, handleNavigation }) => {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4">
      <nav className="flex items-center bg-[#05080c]/95 backdrop-blur-xl rounded-full p-1 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.45)] w-full sm:w-max max-w-[100%] sm:max-w-2xl justify-between sm:justify-center gap-1">
        
        <button 
          onClick={() => handleNavigation('home')} 
          className={`text-[11px] sm:text-sm font-black uppercase italic tracking-wide px-2.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
            currentView === 'home' 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' 
              : 'text-gray-400 hover:text-white border-transparent'
          }`}
        >
          Trang Chủ
        </button>

        <button 
          onClick={() => handleNavigation('about')} 
          className={`text-[11px] sm:text-sm font-black uppercase italic tracking-wide px-2.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
            currentView === 'about' 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' 
              : 'text-gray-400 hover:text-white border-transparent'
          }`}
        >
          Giới Thiệu
        </button>

        <button 
          onClick={() => handleNavigation('guide')} 
          className={`text-[11px] sm:text-sm font-black uppercase italic tracking-wide px-2.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
            currentView === 'guide' 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' 
              : 'text-gray-400 hover:text-white border-transparent'
          }`}
        >
          Hướng Dẫn
        </button>

        <button 
          onClick={() => handleNavigation('contact')} 
          className={`text-[11px] sm:text-sm font-black uppercase italic tracking-wide px-2.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
            currentView === 'contact' 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]' 
              : 'text-gray-400 hover:text-white border-transparent'
          }`}
        >
          Liên Hệ
        </button>

      </nav>
    </div>
  );
};

export default NavigationBar;