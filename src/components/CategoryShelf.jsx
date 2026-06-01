import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronsRight } from 'lucide-react' // <-- VSS ĐÃ IMPORT THÊM ICON MŨI TÊN KÉP
import GameCard from './GameCard'

function CategoryShelf({ category, onAddToCart }) {
  const scrollerRef = useRef(null)
  const cards = useMemo(() => category.games, [category.games])
  
  // State quản lý phần trăm cuộn trang để làm hiệu ứng thanh Cyan
  const [scrollProgress, setScrollProgress] = useState(0)

  // Theo dõi tiến trình cuộn của trục ngang
  const handleScroll = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    // Tránh lỗi chia cho 0 nếu số lượng game quá ít không đủ tràn màn hình
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

    // Kích hoạt tính toán thanh cuộn ngay lần đầu render
    handleScroll();

    const onWheel = (event) => {
      // Cho phép cuộn chuột ngang trên PC
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        node.scrollLeft += event.deltaY
        event.preventDefault()
      }
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    node.addEventListener('scroll', handleScroll) // Gắn listener cuộn

    return () => {
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="categories">
      
      {/* 1. KHỐI HEADER TRÊN CÙNG (Chỉ giữ lại Text và nút Scroll Area) */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl uppercase italic">{category.key}</h2>
          <p className="mt-2 text-sm text-white/55">Cuộn sang trái để xem thêm các games khác.</p>
        </div>
        
        {/* Nút Scroll Area (Giữ nguyên bên góc phải) */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className={`hidden rounded-full border border-white/10 bg-gradient-to-r ${category.accent} px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80 md:block`}>
            Scroll Area
          </div>
        </div>
      </div>

      {/* 2. KHỐI DANH SÁCH GAME CUỘN NGANG */}
      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto pt-4 pb-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-2.5 md:gap-4 pr-4">
          {cards.map((game) => (
            <GameCard 
              key={`${category.key}-${game.title}`} 
              game={game} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>

      {/* 3. 🌟 THANH CHỈ BÁO CUỘN VÀ MŨI TÊN CHỚP NHÁY 🌟 */}
      <div className="mt-2 flex items-center justify-center w-full gap-2">
        <div className="w-24 md:w-32 h-[3px] bg-white/10 rounded-full overflow-hidden shrink-0">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Mũi tên nhấp nháy báo hiệu vuốt ngang */}
        <ChevronsRight className="w-4 h-4 text-cyan-400 animate-pulse" />
      </div>

    </section>
  )
}

export default CategoryShelf