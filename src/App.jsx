// App.jsx
import { useMemo, useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { X } from 'lucide-react'

import NavigationBar from './components/NavigationBar'
import Hero from './components/Hero'
import Cart from './components/Cart'
import Footer from './components/Footer'
import FloatingContactWidget from './components/FloatingContactWidget'
import FloatingAllGames from './components/FloatingAllGames'
import GameCard from './components/GameCard'

import { RAW_GAMES, CATEGORY_META } from './gamesData'

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
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null); 
  const [purchaseGame, setPurchaseGame] = useState(null); 
  const [searchedGame, setSearchedGame] = useState(null); 
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [deferredGames, setDeferredGames] = useState({ marquee: [], categories: [] });

  const totalGamesCount = useMemo(() => {
    if (!RAW_GAMES) return 0;
    return Object.values(RAW_GAMES).reduce((sum, catList) => sum + (catList?.length || 0), 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!RAW_GAMES || !CATEGORY_META) return;
      const mappedCategories = CATEGORY_META.map(cat => ({ 
        ...cat, 
        games: (RAW_GAMES[cat.key] || []).slice(0, 8) 
      }));
      const flattened = Object.values(RAW_GAMES).flat();
      if (flattened.length > 0) {
        const selected = [...flattened].sort(() => 0.5 - Math.random()).slice(0, 12);
        setDeferredGames({ categories: mappedCategories, marquee: selected });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = useCallback((game) => {
    setCartItems((prev) => prev.some(i => i.title.toLowerCase() === game.title.toLowerCase()) ? prev : [...prev, game]);
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
    if (value.trim().length > 2) {
      if (currentView !== 'AllGames') {
        const flatList = Object.values(RAW_GAMES).flat();
        setSuggestions(flatList.filter(g => g.title.toLowerCase().includes(value.toLowerCase())).slice(0, 6));
      }
    } else { setSuggestions([]); }
  }, [currentView]);

  const handleSelectSuggestedGame = useCallback((game) => {
    setSearchedGame(game); setSearchTerm(''); setSuggestions([]);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleNavigation = useCallback((view) => {
    setCurrentView(view); 
    setSearchTerm(''); 
    setSuggestions([]);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />

      {searchedGame && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 p-4">
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>
          <div className="relative z-10 w-[240px] md:w-[320px]">
            <div className="relative bg-[#05080c] rounded-[1.6rem] border border-cyan-400/45 overflow-hidden shadow-2xl">
              <button onClick={() => setSearchedGame(null)} className="absolute top-3 right-3 z-50 bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-all">
                <X className="h-4 w-4" />
              </button>
              <div className="h-[320px] md:h-[410px] w-full">
                <GameCard 
                  game={searchedGame} 
                  onAddToCart={handleAddToCart} 
                  onOpenDetail={(g) => setSelectedGame(g)} 
                  onBuyNow={(g) => setPurchaseGame(g)} 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="relative min-h-screen bg-[#05070a] text-white overflow-x-hidden">
        <div className="hidden md:block fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("/noise.png")' }} />
        
        <NavigationBar 
          currentView={currentView} handleNavigation={handleNavigation}
          searchTerm={searchTerm} handleSearch={handleSearch}
          suggestions={suggestions} onSelectGame={handleSelectSuggestedGame}
        />
        
        <FloatingAllGames onClick={() => handleNavigation('AllGames')} totalGames={totalGamesCount.toString()} />
        
        <div className="relative z-10 flex flex-col min-h-screen pt-32 md:pt-36">
          
          {/* VIEW: TRANG CHỦ */}
          {currentView === 'home' && (
            <>
              <Hero />
              <div className="space-y-12 pb-20 flex-grow">
                <Suspense fallback={null}>
                  {deferredGames.marquee.length > 0 && (
                    <MarqueeGames 
                      games={deferredGames.marquee} 
                      onGameClick={(g) => setSelectedGame(g)} 
                      onAddToCart={handleAddToCart}
                      onBuyNow={(g) => setPurchaseGame(g)}
                      priority={true}
                    />
                  )}
                  <section className="space-y-12 px-4 md:px-10 max-w-[1600px] mx-auto w-full">
                    {deferredGames.categories.map((cat) => (
                      <CategoryShelf key={cat.key} category={cat} onGameClick={(g) => setSelectedGame(g)} onAddToCart={handleAddToCart} onBuyNow={(g) => setPurchaseGame(g)} />
                    ))}
                  </section>
                </Suspense>
              </div>
            </>
          )}

          {/* VIEW: ALL GAMES */}
          {currentView === 'AllGames' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 pb-20 max-w-[1600px] mx-auto w-full">
                <AllGames searchTerm={searchTerm} onAddToCart={handleAddToCart} onBackToHome={() => handleNavigation('home')} handleOpenModal={(g) => setSelectedGame(g)} handleOpenPurchaseModal={(g) => setPurchaseGame(g)} />
              </div>
            </Suspense>
          )}

          {/* 🛠️ FIX: BỔ SUNG CÁC SECTION DƯỚI ĐÂY */}
          {currentView === 'about' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><AboutSection /></div>
            </Suspense>
          )}

          {currentView === 'guide' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><GuideSection /></div>
            </Suspense>
          )}

          {currentView === 'contact' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><Location /></div>
            </Suspense>
          )}
          
          <Footer />
          <FloatingContactWidget />

          <Suspense fallback={null}>
            {selectedGame && <GameDetailModal game={selectedGame} onClose={closeAllOverlays} onBuyNow={() => setPurchaseGame(selectedGame)} />}
            {purchaseGame && <PurchaseModal game={purchaseGame} onClose={closeAllOverlays} />}
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default App;