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

const PageLoadingFallback = () => <div className="min-h-screen bg-[#0a0f1e]" />;

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
    }, 800); // Tăng lên 800ms để Hero load mượt trước
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
    setCurrentView(view); setSearchTerm(''); setSuggestions([]);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />

      {/* MODAL SEARCH QUICKET */}
      {searchedGame && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>
          <div className="relative z-10 w-[260px] md:w-[320px] animate-in zoom-in-95 duration-300">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[1.6rem] opacity-60 blur-md pointer-events-none"></div>
            <div className="relative bg-[#080d16] rounded-[1.6rem] border border-cyan-400/45 shadow-2xl overflow-hidden">
              <button onClick={() => setSearchedGame(null)} className="absolute top-3 right-3 z-50 bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-all text-white">
                <X className="h-4 w-4" />
              </button>
              <div className="h-[340px] md:h-[410px] w-full">
                <GameCard game={searchedGame} onAddToCart={handleAddToCart} onOpenDetail={(g) => setSelectedGame(g)} onBuyNow={(g) => setPurchaseGame(g)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="relative min-h-screen bg-[#080b14] text-white selection:bg-cyan-500/30 overflow-x-hidden">
        
        {/* 🌟 LỚP ÁNH SÁNG MÔI TRƯỜNG (MAKES THE WEB BRIGHTER) */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Quầng sáng Cyan bên trái */}
          <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full opacity-60" />
          {/* Quầng sáng Blue bên phải */}
          <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] bg-blue-700/10 blur-[130px] rounded-full opacity-40" />
          {/* Noise texture nhẹ cho cảm giác Cinematic */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }} />
        </div>

        <NavigationBar 
          currentView={currentView} handleNavigation={handleNavigation}
          searchTerm={searchTerm} handleSearch={handleSearch}
          suggestions={suggestions} onSelectGame={handleSelectSuggestedGame}
        />

        <FloatingAllGames onClick={() => handleNavigation('AllGames')} totalGames={totalGamesCount.toString()} />

        <div className="relative z-10 flex flex-col min-h-screen pt-28 md:pt-32">

          {/* VIEW: TRANG CHỦ */}
          {currentView === 'home' && (
            <>
              <Hero />
              <div className="space-y-16 pb-20 flex-grow">
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
                  <section className="space-y-16 px-4 md:px-10 max-w-[1600px] mx-auto w-full">
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

          {/* VIEW: GIỚI THIỆU */}
          {currentView === 'about' && (
            <Suspense fallback={<PageLoadingFallback />}>
              <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full">
                <AboutSection onAddToCart={handleAddToCart} handleOpenModal={(g) => setSelectedGame(g)} handleOpenPurchaseModal={(g) => setPurchaseGame(g)} />
              </div>
            </Suspense>
          )}

          {/* CÁC VIEW KHÁC */}
          {currentView === 'guide' && <Suspense fallback={<PageLoadingFallback />}><div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><GuideSection /></div></Suspense>}
          {currentView === 'contact' && <Suspense fallback={<PageLoadingFallback />}><div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full"><Location /></div></Suspense>}

          <Footer />
          <FloatingContactWidget />

          {/* MODALS */}
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