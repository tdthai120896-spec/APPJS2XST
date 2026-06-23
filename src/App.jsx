import { useMemo, useState, useEffect, useCallback, lazy, Suspense } from 'react'

// Các Component nằm trên luồng tải chính (Critical Path) giữ nguyên import thông thường
import NavigationBar from './components/NavigationBar'
import Hero from './components/Hero'
import Cart from './components/Cart'
import Footer from './components/Footer'
import FloatingContactWidget from './components/FloatingContactWidget'
import FloatingAllGames from './components/FloatingAllGames'

import { RAW_GAMES, CATEGORY_META } from './gamesData'

// Tải chậm (Code Splitting) cho các trang phụ và modal để giảm kích thước bundle ban đầu
const AboutSection = lazy(() => import('./components/AboutSection'))
const GuideSection = lazy(() => import('./components/GuideSection'))
const Location = lazy(() => import('./components/Location'))
const AllGames = lazy(() => import('./components/AllGames'))
const GameModal = lazy(() => import('./components/GameModal'))
const PurchaseModal = lazy(() => import('./components/PurchaseModal'))
const MarqueeGames = lazy(() => import('./components/MarqueeGames'))
const CategoryShelf = lazy(() => import('./components/CategoryShelf'))

// Component màn hình chờ tải mượt mà chuẩn tông màu Xanh Neon - Đen
const PageLoadingFallback = () => (
  <div className="flex-grow flex items-center justify-center py-24 w-full">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/10 border-t-cyan-500 animate-spin" />
      <span className="text-[10px] font-bold text-cyan-400/50 uppercase tracking-widest">Đang tải...</span>
    </div>
  </div>
);

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [purchaseGame, setPurchaseGame] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  // 🛠️ TỐI ƯU SÂU: Khởi tạo state rỗng cho dữ liệu game nặng ban đầu
  const [deferredGames, setDeferredGames] = useState({ marquee: [], categories: [] });

  const allGames = useMemo(() => {
    if (!RAW_GAMES) return [];
    return Object.values(RAW_GAMES).flat();
  }, []);

  // 🛠️ TỐI ƯU SÂU: Trì hoãn xử lý mảng và trộn game ngẫu nhiên
  useEffect(() => {
    // Trì hoãn tính toán dữ liệu nặng 150ms sau khi trang chủ đã render xong phần khung chính (Hero)
    const timer = setTimeout(() => {
      if (!RAW_GAMES || !CATEGORY_META) return;

      // 1. Ánh xạ danh mục
      const mappedCategories = CATEGORY_META.map(cat => ({
        ...cat,
        games: RAW_GAMES[cat.key] || []
      }));

      // 2. Trộn ngẫu nhiên game cho Marquee
      const flattened = Object.values(RAW_GAMES).flat();
      if (flattened.length > 0) {
        const shuffled = [...flattened].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 20);
        
        setDeferredGames({
          categories: mappedCategories,
          marquee: [...selected, ...selected]
        });
      }
    }, 150); // Khoảng thời gian trì hoãn ngắn đủ để giải phóng CPU vẽ giao diện LCP trước

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = useCallback((game) => {
    setCartItems((prevItems) => {
      const isExisted = prevItems.some(item => item.title.toLowerCase() === game.title.toLowerCase());
      if (isExisted) return prevItems;
      return [...prevItems, game];
    });
  }, []);

  const handleRemoveFromCart = useCallback((gameTitle) => {
    setCartItems((prevItems) => prevItems.filter(item => item.title !== gameTitle));
  }, []);

  const closeAllOverlays = useCallback(() => {
    if (selectedGame || purchaseGame) {
      setSelectedGame(null);
      setPurchaseGame(null);
      document.body.style.overflow = 'unset';
    } else {
      setSuggestions([]);
      setSearchTerm('');
    }
  }, [selectedGame, purchaseGame]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAllOverlays();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAllOverlays]);

  const handleOpenModal = (game) => {
    setSelectedGame(game);
    setSuggestions([]);
    setSearchTerm('');
    document.body.style.overflow = 'hidden';
  };

  const handleOpenPurchaseModal = (game) => {
    setPurchaseGame(game);
    document.body.style.overflow = 'hidden';
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0) {
      const filtered = allGames.filter(game =>
        game.title.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />

      <main className="relative min-h-screen bg-[#05070a] text-white selection:bg-cyan-500/30 overflow-x-hidden">

        {/* BACKGROUND EFFECTS */}
        <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("/noise.png")', backgroundRepeat: 'repeat' }} />
        <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/15 blur-[180px] rounded-full pointer-events-none z-0" />
        <div className="hidden md:block fixed bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none z-0" />

        {/* COMPONENT THANH ĐIỀU HƯỚNG */}
        <NavigationBar currentView={currentView} handleNavigation={handleNavigation} />
        
        {currentView !== 'AllGames' && (
          <FloatingAllGames
            onClick={() => handleNavigation('AllGames')}
            totalGames={allGames.length.toString()}
          />
        )}
        
        <div className="relative z-10 flex flex-col min-h-screen pt-20 md:pt-14">

          {currentView === 'home' && (
            <>
              <Hero searchTerm={searchTerm} handleSearch={handleSearch} suggestions={suggestions} handleOpenModal={handleOpenModal} onAddToCart={handleAddToCart} />
              
              {/* Chỉ render phần Marquee và Shelves sau khi dữ liệu đã được tính toán chậm thành công */}
              <div className="space-y-24 pb-20 flex-grow">
                <Suspense fallback={null}>
                  {deferredGames.marquee.length > 0 && (
                    <MarqueeGames
                      games={deferredGames.marquee}
                      onGameClick={handleOpenModal}
                      onAddToCart={handleAddToCart}
                    />
                  )}
                  <section className="relative space-y-12">
                    {deferredGames.categories.map((cat) => (
                      <CategoryShelf key={cat.key} category={cat} onGameClick={handleOpenModal} onAddToCart={handleAddToCart} onBuyNow={handleOpenPurchaseModal} />
                    ))}
                  </section>
                </Suspense>
              </div>
            </>
          )}

          {currentView === 'about' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
                <AboutSection />
              </div>
            </Suspense>
          )}

          {currentView === 'guide' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
                <GuideSection />
              </div>
            </Suspense>
          )}

          {currentView === 'contact' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
                <Location />
              </div>
            </Suspense>
          )}

          {currentView === 'AllGames' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
                <AllGames
                  onAddToCart={handleAddToCart}
                  onBackToHome={() => setCurrentView('home')}
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  suggestions={suggestions}
                  handleOpenModal={handleOpenModal}
                />
              </div>
            </Suspense>
          )}

          <Footer />
          <FloatingContactWidget />

          <Suspense fallback={null}>
            {selectedGame && <GameModal selectedGame={selectedGame} onClose={closeAllOverlays} />}
            {purchaseGame && <PurchaseModal game={purchaseGame} onClose={closeAllOverlays} />}
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default App;