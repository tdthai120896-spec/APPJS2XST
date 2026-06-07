import React from 'react';

const NavigationBar = ({ currentView, handleNavigation }) => {
  // Định nghĩa danh sách menu để tối ưu hóa code và dễ bảo trì
  const navLinks = [
    {
      id: 'home',
      label: 'Trang Chủ',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'about',
      label: 'Giới Thiệu',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'guide',
      label: 'Hướng Dẫn',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Liên Hệ',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'AllGames',
      label: 'Tất Cả Games',
      isCTA: true, // Đánh dấu nút nổi bật thu hút click mua hàng
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center bg-[#030712]/90 backdrop-blur-md rounded-full p-1.5 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] w-auto max-w-full justify-center gap-1.5 sm:gap-2">
        {navLinks.map((item) => {
          const isActive = currentView === item.id;

          // CSS dành riêng cho nút đặc biệt "Tất Cả Games" (CTA)
          if (item.isCTA) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] font-extrabold'
                    : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                {item.icon}
                <span className="hidden xs:inline">{item.label}</span>
                {/* Đèn nháy neon nhỏ để tăng tính tương tác */}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
              </button>
            );
          }

          // CSS dành cho các nút menu thông thường
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 border ${
                isActive
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold'
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5 border-transparent'
              }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
              
              {/* Vạch kẻ chỉ báo nhỏ ở cạnh dưới khi active */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationBar;