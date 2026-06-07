import React from 'react';

const NavigationBar = ({ currentView, handleNavigation }) => {
  // Danh sách các danh mục (Menu items)
  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'guide', label: 'Hướng Dẫn' },
    { id: 'contact', label: 'Liên Hệ' },
    { id: 'AllGames', label: 'Tất Cả Games' } // Đã bỏ cấu hình CTA sặc sỡ cũ
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 select-none">
      
      {/* 🌟 CSS ANIMATION CỤC BỘ CHO HIỆU ỨNG NHÚN NHẢY TINH TẾ */}
      <style>
        {`
          @keyframes microBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-micro-bounce {
            animation: microBounce 1.2s infinite ease-in-out;
          }
        `}
      </style>

      <nav className="flex items-center bg-[#030712]/90 backdrop-blur-md rounded-full p-1 border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.15)] w-full sm:w-max max-w-[100%] sm:max-w-2xl justify-between sm:justify-center gap-1">
        {navLinks.map((item) => {
          const isActive = currentView === item.id;
          const isAllGames = item.id === 'AllGames';

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`relative flex items-center justify-center text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-wide px-2.5 xs:px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 flex-1 sm:flex-none text-center border ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'text-gray-400 hover:text-white border-transparent'
              }`}
            >
              {/* Biểu tượng Gamepad nhảy tưng tưng chỉ hiển thị cạnh nút Tất Cả Games */}
              {isAllGames && (
                <span className="inline-block animate-micro-bounce mr-1.5 text-cyan-400">
                  <svg 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current inline-block" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2Zm4.5 3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Zm3-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z"/>
                  </svg>
                </span>
              )}
              
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationBar;