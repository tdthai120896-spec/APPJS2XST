import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronsRight } from 'lucide-react'
import GameCard from './GameCard'

function CategoryShelf({ category, onAddToCart }) {
  const scrollerRef = useRef(null)
  const cards = useMemo(() => category.games, [category.games])
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }

    const currentProgress = (scrollLeft / maxScroll) * 100;
    setScrollProgress(currentProgress);
  }

  useEffect(() => {
    const node = scrollerRef.current
    if (!node) return undefined

    handleScroll();
    
    // Tối ưu hóa: Sử dụng CSS Smooth Scroll mặc định thay vì ép cộng dồn deltaY thô cứng gây giật lag
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        node.style.scrollBehavior = 'auto'; // Tắt cuộn mượt tạm thời để tăng phản hồi chuột
        node.scrollLeft += event.deltaY * 0.8; // Giảm hệ số lăn chuột giúp cuộn mượt hơn
        node.style.scrollBehavior = 'smooth';
        event.preventDefault()
      }
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    node.addEventListener('scroll', handleScroll)

    return () => {
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 select-none" id="categories">

      {/* 1. KHỐI HEADER TRÊN CÙNG (Phong cách tối giản tinh tế của Apple) */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">{category.key}</h2>
          <p className="mt-1 text-xs text-gray-500">Vuốt ngang hoặc lăn chuột để xem toàn bộ danh sách.</p>
        </div>

        {/* Nút Scroll Area mỏng nhẹ định hình */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="hidden rounded-full border border-cyan-500/10 bg-[#080d16]/80 px-4 py-1.5 text-[9px] uppercase tracking-[0.25em] text-cyan-400 md:block select-none">
            Scroll Area
          </div>
        </div>
      </div>

      {/* 2. KHỐI DANH SÁCH GAME CUỘN NGANG (Bổ sung tính năng bám dính bạt ngàn chuẩn Apple) */}
      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto pt-4 pb-4 scroll-smooth"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory' // 🛠️ Cơ chế bám dính khi vuốt ngang chuẩn iOS
        }}
      >
        <div className="flex gap-3 md:gap-4 pr-4">
          {cards.map((game) => (
            <div
              key={`${category.key}-${game.title}`}
              className="shrink-0 w-[160px] sm:w-[200px] md:w-[240px] flex flex-col"
              style={{ scrollSnapAlign: 'start' }} // 🛠️ Điểm mốc bám dính của thẻ game
            >
              <GameCard
                game={game}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. THANH CHỈ BÁO LASER MỎNG (Chỉ dày 2px thanh lịch, không loè loẹt) */}
      <div className="mt-2 flex items-center justify-center w-full gap-2">
        <div className="w-16 md:w-24 h-[2px] bg-white/5 rounded-full overflow-hidden shrink-0">
          <div
            className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <ChevronsRight className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
      </div>

    </section>
  )
}

export default CategoryShelf