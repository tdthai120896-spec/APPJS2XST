import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, Phone, MessageCircle } from 'lucide-react'

function FloatingContactWidget() {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const widgetRef = useRef(null);

  // Xử lý đóng widget trên mobile khi click ra ngoài màn hình
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpenMobile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleMainButtonClick = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpenMobile(!isOpenMobile);
    }
  };

  // Class điều khiển ẩn/hiện menu con
  const activeMenuClasses = isOpenMobile
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto opacity-0 translate-y-4 pointer-events-none";

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-[99999] group flex flex-col items-end"
    >
      {/* MENU CON (Zalo, Messenger, Call) */}
      <div className={`flex flex-col items-end gap-4 mb-4 transition-all duration-300 ease-out ${activeMenuClasses}`}>

      {/* NÚT ZALO */}
        <a
          href="https://www.facebook.com/profile.php?id=61558065130631"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group/item"
        >
          <span className="bg-[#0b0e14]/90 backdrop-blur-md border border-blue-500/40 text-blue-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 group-hover/item:border-blue-400 group-hover/item:text-blue-300">
            Zalo
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover/item:scale-110">
            <MessageCircle className="w-5 h-5" />
          </div>
        </a>

        {/* NÚT MESSENGER */}
        <a
          href="https://www.facebook.com/profile.php?id=61558065130631" // Thay username page Messenger của bạn
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group/item"
        >
          <span className="bg-[#0b0e14]/90 backdrop-blur-md border border-pink-500/40 text-pink-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300 group-hover/item:border-pink-400 group-hover/item:text-pink-300">
            Messenger
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-transform duration-300 group-hover/item:scale-110">
            <MessageSquare className="w-5 h-5" />
          </div>
        </a>

        {/* NÚT GỌI ĐIỆN */}
        <a
          href="https://www.facebook.com/profile.php?id=61558065130631" // Thay số hotline của bạn
          className="flex items-center gap-3 group/item"
        >
          <span className="bg-[#0b0e14]/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 group-hover/item:border-emerald-400 group-hover/item:text-emerald-300">
            Call
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-transform duration-300 group-hover/item:scale-110">
            <Phone className="w-5 h-5 fill-current" />
          </div>
        </a>

      </div>

      {/* NÚT LIÊN HỆ TỔNG */}
      <div className="relative mr-0.5">
        {/* Lớp ánh sáng xanh neon tỏa ra xung quanh */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500 animate-pulse"></div>

        <button
          onClick={handleMainButtonClick}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-90 transition-transform duration-200"
        >
          <svg
            className={`w-7 h-7 text-black transition-transform duration-300 ${isOpenMobile ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>

          {/* 🔴 CHẤM ĐỎ THÔNG BÁO NHẢY TƯNG TƯNG */}
          {!isOpenMobile && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 animate-bounce">
              {/* Lớp màu đỏ mờ nhấp nháy phía sau (tạo cảm giác phát sóng) */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              {/* Chấm đỏ chính xịn xò */}
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-black/80"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default FloatingContactWidget;
