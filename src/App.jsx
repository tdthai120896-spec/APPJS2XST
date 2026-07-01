// App.jsx
import { useMemo, useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { X } from 'lucide-react'

// Layout Components (Critical Path)
import NavigationBar from './components/NavigationBar'
import Hero from './components/Hero'
import Cart from './components/Cart'
import Footer from './components/Footer'
import FloatingContactWidget from './components/FloatingContactWidget'
import FloatingAllGames from './components/FloatingAllGames'
import GameCard from './components/GameCard'

// Dữ liệu Game
import { RAW_GAMES, CATEGORY_META } from './gamesData'

// Lazy Loaded Components
const AboutSection = lazy(() => import('./components/AboutSection'))
const GuideSection = lazy(() => import('./components/GuideSection'))
const Location = lazy(() => import('./components/Location'))
const AllGames = lazy(() => import('./components/AllGames'))
const GameDetailModal = lazy(() => import('./components/GameDetailModal'))
const PurchaseModal = lazy(() => import('./components/PurchaseModal'))
const MarqueeGames = lazy(() => import('./components/MarqueeGames'))
const CategoryShelf = lazy(() => import('./components/CategoryShelf'))

const PageLoadingFallback = () => (
  <div className="flex-grow flex items-center justify-center py-24 w-full bg-[#05070a]">
    <div className="w-10 h-10 rounded-full border-2 border-cyan-500/10 border-t-cyan-500 animate-spin" />
  </div>
);

function App() {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null); 
  const [purchaseGame, setPurchaseGame] = useState(null); 
  const [searchedGame, setSearchedGame] = useState(null); 
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [deferredGames, setDeferredGames] = useState({ marquee: [], categories: [] });

  // --- TỐI ƯU DỮ LIỆU ---
  const totalGamesCount = useMemo(() => {
    if (!RAW_GAMES) return 0;
    return Object.values(RAW_GAMES).reduce((sum, catList) => sum + (catList?.length || 0), 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!RAW_GAMES || !CATEGORY_META) return;
      // Lấy 10 game đại diện cho mỗi danh mục ở trang chủ
      const mappedCategories = CATEGORY_META.map(cat => ({ 
        ...cat, 
        games: (RAW_GAMES[cat.key] || []).slice(0, 10) 
      }));
      
      const flattened = Object.values(RAW_GAMES).flat();
      if (flattened.length > 0) {
        // Trộn ngẫu nhiên 10 game cho Marquee
        const selected = [...flattened].sort(() => 0.5 - Math.random()).slice(0, 10);
        setDeferredGames({ categories: mappedCategories, marquee: selected });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // --- HANDLERS (Sử dụng useCallback để tránh re-render) ---
  const handleAddToCart = useCallback((game) => {
    setCartItems((prev) => {
      if (prev.some(i => i.title.toLowerCase() === game.title.toLowerCase())) return prev;
      return [...prev, game];
    });
  }, []);

  const handleRemoveFromCart = useCallback((title) => {
    setCartItems((prev) => prev.filter(item => item.title !== title));
  }, []);

  const closeAllOverlays = useCallback(() => {
    setSelectedGame(null); setPurchaseGame(null); setSearchedGame(null);
    setSuggestions([]); setSearchTerm('');
    document.body.style.overflow = 'unset';
  }, []);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0) {
      if (currentView !== 'AllGames') {
        const flatList = Object.values(RAW_GAMES).flat();
        // Lọc 6 gợi ý nhanh cho dropdown
        const filtered = flatList.filter(g => 
          g.title.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 6);
        setSuggestions(filtered);
      } else { 
        setSuggestions([]); // Khi ở AllGames thì ẩn gợi ý, lọc trực tiếp lưới game
      }
    } else { setSuggestions([]); }
  }, [currentView]);

  const handleSelectSuggestedGame = useCallback((game) => {
    setSearchedGame(game); setSearchTerm(''); setSuggestions([]);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleNavigation = useCallback((view) => {
    setCurrentView(view); setSearchTerm(''); setSuggestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPurchaseModal = useCallback((game) => {
    setPurchaseGame(game);
    setSearchedGame(null);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleOpenDetailModal = useCallback((game) => {
    setSelectedGame(game);
    setSearchedGame(null);
    document.body.style.overflow = 'hidden';
  }, []);

  // ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeAllOverlays(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAllOverlays]);

  return (
    <>
      {/* 1. GIỎ HÀNG (Z-INDEX 100) */}
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />

      {/* 2. MODAL XEM NHANH TỪ TÌM KIẾM (Z-INDEX 2000) */}
      {searchedGame && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSearchedGame(null)}></div>
          <div className="relative z-10 w-[240px] md:w-[320px] animate-in zoom-in-95 duration-300">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[1.6rem] opacity-60 blur-md pointer-events-none"></div>
            <div className="relative bg-[#05080c] rounded-[1.6rem] border border-cyan-400/45 shadow-2xl overflow-hidden">
              <button onClick={() => setSearchedGame(null)} className="absolute top-3 right-3 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 backdrop-blur-md transition-all">
                <X className="h-4 w-4" />
              </button>
              <div className="h-[320px] md:h-[410px] w-full">
                <GameCard 
                  game={searchedGame} 
                  onAddToCart={handleAddToCart} 
                  onOpenDetail={handleOpenDetailModal} 
                  onBuyNow={handleOpenPurchaseModal} 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="relative min-h-screen bg-[#05070a] text-white selection:bg-cyan-500/30 overflow-x-hidden">
        
        {/* HIỆU ỨNG NỀN */}
        <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("/noise.png")' }} />
        <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[180px] rounded-full pointer-events-none z-0" />

        {/* 3. HEADER GỘP THỐNG NHẤT (Z-INDEX 1000) */}
        <NavigationBar 
          currentView={currentView} 
          handleNavigation={handleNavigation}
          searchTerm={searchTerm} 
          handleSearch={handleSearch}
          suggestions={suggestions} 
          onSelectGame={handleSelectSuggestedGame}
        />
        
        {currentView !== 'AllGames' && (
          <FloatingAllGames onClick={() => handleNavigation('AllGames')} totalGames={totalGamesCount.toString()} />
        )}
        
        {/* NỘI DUNG CHÍNH (pt-28/32 để trồi lên cao sát Header) */}
        <div className="relative z-10 flex flex-col min-h-screen pt-28 md:pt-32">

          {currentView === 'home' && (
            <>
              <Hero />
              <div className="space-y-16 pb-20 flex-grow">
                <Suspense fallback={null}>
                  {deferredGames.marquee.length > 0 && (
                    <MarqueeGames 
                        games={deferredGames.marquee} 
                        onGameClick={handleOpenDetailModal} 
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleOpenPurchaseModal}
                    />
                  )}
                  <section className="space-y-16 px-4 md:px-10 max-w-[1600px] mx-auto w-full">
                    {deferredGames.categories.map((cat) => (
                      <CategoryShelf 
                        key={cat.key} 
                        category={cat} 
                        onGameClick={handleOpenDetailModal} 
                        onAddToCart={handleAddToCart} 
                        onBuyNow={handleOpenPurchaseModal} 
                      />
                    ))}
                  </section>
                </Suspense>
              </div>
            </>
          )}

          {currentView === 'AllGames' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 pb-20 max-w-[1600px] mx-auto w-full">
                <AllGames 
                  searchTerm={searchTerm}
                  onAddToCart={handleAddToCart} 
                  onBackToHome={() => handleNavigation('home')} 
                  handleOpenModal={handleOpenDetailModal} 
                  handleOpenPurchaseModal={handleOpenPurchaseModal} 
                />
              </div>
            </Suspense>
          )}

          {/* Các views khác giữ nguyên Suspense và Container */}
          {currentView === 'about' && <Suspense fallback={<PageLoadingFallback />}><div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><AboutSection /></div></Suspense>}
          {currentView === 'guide' && <Suspense fallback={<PageLoadingFallback />}><div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><GuideSection /></div></Suspense>}
          {currentView === 'contact' && <Suspense fallback={<PageLoadingFallback />}><div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><Location /></div></Suspense>}

          <Footer />
          <FloatingContactWidget />

          {/* 4. MODAL TOÀN CỤC (Z-INDEX 3000) */}
          <Suspense fallback={null}>
            {selectedGame && (
              <GameDetailModal 
                game={selectedGame} 
                onClose={closeAllOverlays} 
                onBuyNow={() => handleOpenPurchaseModal(selectedGame)} 
              />
            )}
            {purchaseGame && <PurchaseModal game={purchaseGame} onClose={closeAllOverlays} />}
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default App;