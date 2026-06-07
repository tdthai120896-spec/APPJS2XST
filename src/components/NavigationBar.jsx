import React from 'react';

const NavigationBar = ({ currentView, handleNavigation }) => {
  // Danh sách các danh mục (Menu items)
  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'guide', label: 'Hướng Dẫn' },
    { id: 'contact', label: 'Liên Hệ' },
    { id: 'AllGames', label: 'Tất Cả Games', isCTA: true } // Nút mua game nổi bật
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4">
      <nav className="flex items-center bg-[#030712]/90 backdrop-blur-md rounded-full p-1 border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.15)] w-full sm:w-max max-w-[100%] sm:max-w-2xl justify-between sm:justify-center gap-1">
        {navLinks.map((item) => {
          const isActive = currentView === item.id;

          // Thiết kế riêng cho nút nổi bật "Tất Cả Games"
          if (item.isCTA) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-wide px-2.5 xs:px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'bg-cyan-950/30 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                }`}
              >
                {item.label}
                {/* Chấm tròn hiệu ứng nhấp nháy thu hút sự chú ý */}
                <span className="absolute -top-1 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              </button>
            );
          }

          // Thiết kế cho các nút thường
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-wide px-2.5 xs:px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'text-gray-400 hover:text-white border-transparent'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationBar;