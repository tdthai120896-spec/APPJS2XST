import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, Phone, MessageCircle, Sparkles } from 'lucide-react'

const ENCODED_ZALO = 'aHR0cHM6Ly96YWxvLm1lLzAzNzkzMzI4NzA='
const ENCODED_CALL = 'dGVsOjAzNzkzMzI4NzA='
const ENCODED_MESSENGER = 'aHR0cHM6Ly9tLm1lLzYxNTU4MDY1MTMwNjMx'

function FloatingContactWidget() {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [links, setLinks] = useState({ zalo: '#', messenger: '#', call: '#' });
  const widgetRef = useRef(null);

  // 🛠️ TỐI ƯU SÂU: Quản lý trạng thái tự động đóng/mở & trượt mượt mà của Popup Quảng cáo
  const [shouldRenderPromo, setShouldRenderPromo] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(false);

  useEffect(() => {
    try {
      setLinks({
        zalo: window.atob(ENCODED_ZALO),
        messenger: window.atob(ENCODED_MESSENGER),
        call: window.atob(ENCODED_CALL)
      });
    } catch (error) {
      console.error("Lỗi giải mã liên kết:", error);
    }
  }, []);

  // 🛠️ TỐI ƯU SÂU: Trình kích hoạt tự động mở và ẩn từ từ sau 3 giây của Promo Tooltip
  useEffect(() => {
    // Chờ 1.5 giây sau khi tải trang để luồng chính ổn định, sau đó hiện popup
    const startTimer = setTimeout(() => {
      setShouldRenderPromo(true);
      setIsPromoVisible(true);

      // Kích hoạt hiệu ứng từ từ biến mất (fade out) sau khi hiển thị đủ 3 giây
      const fadeTimer = setTimeout(() => {
        setIsPromoVisible(false);

        // Hủy hẳn việc render trong DOM sau khi hoạt ảnh mờ dần hoàn tất (500ms)
        const unmountTimer = setTimeout(() => {
          setShouldRenderPromo(false);
        }, 500);

        return () => clearTimeout(unmountTimer);
      }, 3000);

      return () => clearTimeout(fadeTimer);
    }, 1500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpenMobile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMainButtonClick = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsOpenMobile(!isOpenMobile);
    }
  };

  const activeMenuClasses = isOpenMobile
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto opacity-0 translate-y-4 pointer-events-none";

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-[99999] group flex flex-col items-end select-none">
      
      {/* DANH SÁCH LIÊN HỆ ĐỒNG BỘ OBSIDIAN NEON */}
      <div className={`flex flex-col items-end gap-3 mb-3.5 transition-all duration-300 ease-out ${activeMenuClasses}`}>
        {/* ZALO */}
        <a href={links.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/item">
          <span className="bg-[#080d16] border border-cyan-500/20 text-gray-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all duration-300 group-hover/item:border-cyan-400 group-hover/item:text-cyan-400">
            Zalo Chat
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#080d16] border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover/item:bg-cyan-500 group-hover/item:text-black transition-all duration-300">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
        </a>

        {/* MESSENGER */}
        <a href={links.messenger} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/item">
          <span className="bg-[#080d16] border border-cyan-500/20 text-gray-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all duration-300 group-hover/item:border-cyan-400 group-hover/item:text-cyan-400">
            Messenger
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#080d16] border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover/item:bg-cyan-500 group-hover/item:text-black transition-all duration-300">
            <MessageSquare className="w-5 h-5" />
          </div>
        </a>

        {/* HOTLINE */}
        <a href={links.call} className="flex items-center gap-3 group/item">
          <span className="bg-[#080d16] border border-cyan-500/20 text-gray-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl transition-all duration-300 group-hover/item:border-cyan-400 group-hover/item:text-cyan-400">
            Gọi Hotline
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#080d16] border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover/item:bg-cyan-500 group-hover/item:text-black transition-all duration-300">
            <Phone className="w-4 h-4 fill-current" />
          </div>
        </a>
      </div>

      {/* 🌟 NÚT LIÊN HỆ TỔNG & POPUP KHUYẾN MÃI TỰ ĐỘNG BIẾN MẤT */}
      <div className="relative flex items-center justify-end">

        {/* 🛠️ ĐÃ THÊM: Popup tự động kích hoạt, trượt ngang mượt mà và mờ dần ra sau 3 giây */}
        {shouldRenderPromo && (
          <div 
            className={`absolute right-[70px] bottom-0 flex items-center gap-2.5 bg-[#080d16]/95 border border-cyan-500/30 rounded-2xl p-3.5 shadow-[0_10px_35px_rgba(6,182,212,0.2)] text-left w-72 md:w-80 transition-all duration-500 ease-in-out backdrop-blur-md z-[1000] transform-gpu ${
              isPromoVisible 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-0 translate-x-4 scale-95 pointer-events-none"
            }`}
          >
            {/* Lớp bóng mờ nhẹ màu xanh phía sau */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-md opacity-50 pointer-events-none"></div>
            
            {/* Khối icon gây sự chú ý nhấp nháy chuẩn Apple */}
            <div className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
              <span className="absolute inset-0 rounded-lg bg-cyan-400/20 animate-ping opacity-75" />
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            </div>
            
            {/* Nội dung thông báo rút gọn 2 dòng */}
            <div className="relative flex flex-col min-w-0">
              <span className="text-[9px] font-black uppercase text-cyan-400 tracking-wider">Mách nhỏ bạn</span>
              <p className="text-[10.5px] md:text-[11.5px] font-semibold leading-normal text-neutral-300 mt-0.5">
                Gói <strong className="text-white">30K</strong> bao gồm thuê <strong className="text-white">01 game chính</strong> + được tặng kèm thêm cực nhiều <strong className="text-emerald-400 font-bold">game phụ AAA</strong> siêu phẩm!
              </p>
            </div>
          </div>
        )}

        {/* Lớp hào quang nền sâu (Ambient Glow) */}
        <div className="absolute -inset-2 bg-cyan-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Vòng tròn nhấp nháy nhảy động (Ping Animation) */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 animate-ping opacity-25 pointer-events-none" />

        {/* Hào quang lỏng (Liquid Aura) */}
        <span className="absolute inset-[-2px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-cyan-600 opacity-60 animate-pulse blur-[1px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        
        {/* Nút bấm chính */}
        <button
          onClick={handleMainButtonClick}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#080d16] border border-cyan-500/40 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] active:scale-90 transition-all duration-300 z-10 overflow-hidden"
        >
          {/* Lớp phủ kính nhẹ trên mặt nút */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-40"></div>
          
          <svg
            className={`w-7 h-7 transition-all duration-500 ${
                isOpenMobile 
                ? 'rotate-[135deg] text-rose-500 scale-110' 
                : 'text-cyan-400 group-hover:scale-110'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FloatingContactWidget;