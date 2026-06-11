import React, { useState, useRef, useEffect } from 'react'
import { Flame, ShoppingBag } from 'lucide-react'
import GameCard from './GameCard' // IMPORT TRỰC TIẾP GAMECARD

function MarqueeGames({ games, onAddToCart }) {
  const [showToast, setShowToast] = useState(false);
  const containerRef = useRef(null);
  
  // Sử dụng useRef để kiểm soát tương tác tức thời mà không cần re-render gây giật lag
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  if (!games || games.length === 0) return null;

  // THUẬT TOÁN TỰ ĐỘNG TRƯỢT TỪ TRÁI SANG PHẢI & TỰ ĐỘNG KHÔI PHỤC KHI THẢ TAY
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    const scrollSpeed = 0.8; // Tốc độ trượt tự động cực kỳ êm ái

    // Thiết lập vị trí ban đầu ở giữa để tránh bị kịch biên khi chạy ngược chiều
    const halfWidth = container.scrollWidth / 2;
    if (container.scrollLeft === 0 && halfWidth > 0) {
      container.scrollLeft = halfWidth;
    }

    const animate = () => {
      // Chỉ chạy tự động khi người dùng KHÔNG di chuột vào (Hover) và KHÔNG kéo vuốt (Drag)
      if (!isDragging.current && !isHovered.current) {
        container.scrollLeft -= scrollSpeed;
        
        // Reset vòng lặp vô hạn khi trượt về sát góc bên trái (0)
        if (container.scrollLeft <= 0) {
          const currentHalfWidth = container.scrollWidth / 2;
          container.scrollLeft += currentHalfWidth;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [games]);

  // ================= XỬ LÝ SỰ KIỆN TRÊN DESKTOP (CHUỘT) =================
  const handleMouseEnter = () => {
    isHovered.current = true; // Dừng chạy khi di chuột vào để người dùng dễ đọc/click game
  };

  const handleMouseLeave = () => {
    isHovered.current = false; // Chạy lại ngay lập tức khi di chuột ra ngoài
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = 'auto'; // Tắt cuộn mượt tạm thời để kéo tay bám dính hơn
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Hệ số bám tay khi vuốt kéo
    let newScrollLeft = scrollLeftStart.current - walk;

    const halfWidth = containerRef.current.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft -= halfWidth;
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeftStart.current = newScrollLeft;
    } else if (newScrollLeft < 0) {
      newScrollLeft += halfWidth;
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeftStart.current = newScrollLeft;
    }

    containerRef.current.scrollLeft = newScrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  // ================= XỬ LÝ SỰ KIỆN TRÊN MOBILE (VUỐT CHẠM) =================
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = 'auto';
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    let newScrollLeft = scrollLeftStart.current - walk;

    const halfWidth = containerRef.current.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft -= halfWidth;
      startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
      scrollLeftStart.current = newScrollLeft;
    } else if (newScrollLeft < 0) {
      newScrollLeft += halfWidth;
      startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
      scrollLeftStart.current = newScrollLeft;
    }

    containerRef.current.scrollLeft = newScrollLeft;
  };

  const handleTouchEnd = () => {
    isDragging.current = false; // Chạy lại ngay lập tức khi người dùng thả tay trên điện thoại
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  };

  // Hàm xử lý thêm vào giỏ và hiện thông báo Toast
  const handleAddAction = (game) => {
    if (onAddToCart) {
      onAddToCart(game);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1200);
    }
  };

  // Đoạn CSS phụ ẩn thanh cuộn scrollbar
  const hideScrollbarStyle = `
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  return (
    <section className="relative w-full overflow-hidden py-8 bg-gradient-to-b from-cyan-950/10 via-[#05070a] to-[#05070a] select-none">
      <style>{hideScrollbarStyle}</style>
      
      {/* POPUP THÔNG BÁO THÊM GIỎ HÀNG */}
      {showToast && (
        <div className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[1000005] pointer-events-none animate-in zoom-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-cyan-500 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-white/15">
            <ShoppingBag className="w-4.5 h-4.5 text-[#080d16] stroke-[2.5]" />
            <span className="text-[#080d16] font-black text-xs uppercase tracking-widest whitespace-nowrap leading-none">
              Đã thêm vào giỏ hàng
            </span>
          </div>
        </div>
      )}
      
      {/* TIÊU ĐỀ SECTION */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-6 select-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
            <Flame className="h-5 w-5 fill-cyan-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
              Game ưa thích <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">được mua nhiều nhất</span>
            </h2>
          </div>
        </div>
      </div>

      {/* DANH SÁCH GAME TRƯỢT NGANG (MARQUEE DRAGGABLE) */}
      <div className="relative w-full overflow-hidden pt-2 pb-6">
        
        {/* Lớp phủ mờ indicators 3D ở 2 đầu để game ẩn hiện đẹp mắt */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-20 bg-gradient-to-r from-[#05070a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-20 bg-gradient-to-l from-[#05070a] to-transparent z-10 pointer-events-none" />

        {/* Khung trượt chính */}
        <div 
          ref={containerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-6 md:px-20 py-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {games.map((game, index) => (
            <div
              key={`marquee-${game.title}-${index}`}
              className="shrink-0 w-[180px] sm:w-[200px] md:w-[260px] flex flex-col h-full"
            >
              <GameCard 
                game={game} 
                onAddToCart={handleAddAction} 
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default MarqueeGames;