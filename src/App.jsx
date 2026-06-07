import { useMemo, useState, useEffect, useCallback } from 'react'
import CategoryShelf from './components/CategoryShelf'
import Footer from './components/Footer'
import FloatingContactWidget from './components/FloatingContactWidget'
import FloatingAllGames from './components/FloatingAllGames'
import GuideSection from './components/GuideSection'
import Hero from './components/Hero'
import MarqueeGames from './components/MarqueeGames'
import GameModal from './components/GameModal'
import PurchaseModal from './components/PurchaseModal'
import Cart from './components/Cart'
import AboutSection from './components/AboutSection'
import Location from './components/Location'
import AllGames from './components/AllGames'
import NavigationBar from './components/NavigationBar'

import { RAW_GAMES, CATEGORY_META } from './gamesData'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [purchaseGame, setPurchaseGame] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  // Khởi tạo các hàm quản lý giỏ hàng và overlay an toàn bằng useCallback
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

  // Tính toán trước danh sách Shelf Category bằng useMemo
  const categories = useMemo(() => {
    if (!CATEGORY_META || !RAW_GAMES) return [];
    return CATEGORY_META.map(cat => ({
      ...cat,
      games: RAW_GAMES[cat.key] || []
    }));
  }, []);

  const allGames = useMemo(() => Object.values(RAW_GAMES).flat(), []);

  const marqueeGames = useMemo(() => {
    if (allGames.length === 0) return [];
    const shuffled = [...allGames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    return [...selected, ...selected];
  }, [allGames]);

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

  // Hàm điều hướng cuộn mượt mà lên đầu trang
  const handleNavigation = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Giỏ hàng thanh toán */}
      <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />

      {/* 🌟 KEYFRAMES CSS HOẠT ẢNH CHUYỂN TRANG CAO CẤP */}
      <style>
        {`
          @keyframes pageFadeIn {
            from { opacity: 0; transform: translate3d(0, 10px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
          }
          .animate-page {
            animation: pageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      <main className="relative min-h-screen bg-[#05070a] text-white selection:bg-cyan-500/30 overflow-x-hidden">

        {/* BACKGROUND EFFECTS (Đã tối ưu hóa luồng GPU để đảm bảo 60fps mượt mà) */}
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-0" style={{ backgroundImage: 'url("/noise.png")', backgroundRepeat: 'repeat' }} />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none z-0 transform-gpu will-change-transform" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0 transform-gpu will-change-transform" />

        {/* THANH ĐIỀU HƯỚNG */}
        <NavigationBar currentView={currentView} handleNavigation={handleNavigation} />
        
        {/* Nút AllGames nổi tiện ích bên lề */}
        {currentView !== 'AllGames' && (
          <FloatingAllGames
            onClick={() => handleNavigation('AllGames')}
            totalGames={allGames.length.toString()} // Đồng bộ lấy độ dài mảng game tự động
          />
        )}

        <div className="relative z-10 flex flex-col min-h-screen pt-20 md:pt-14">

          {/* TRANG CHỦ */}
          {currentView === 'home' && (
            <div className="animate-page flex-grow">
              <Hero 
                searchTerm={searchTerm} 
                handleSearch={handleSearch} 
                suggestions={suggestions} 
                handleOpenModal={handleOpenModal} 
                onAddToCart={handleAddToCart} 
              />
              <div className="space-y-24 pb-20">
                <MarqueeGames
                  games={marqueeGames}
                  onGameClick={handleOpenModal}
                  onAddToCart={handleAddToCart}
                />
                <section className="relative space-y-12">
                  {categories.map((cat) => (
                    <CategoryShelf 
                      key={cat.key} 
                      category={cat} 
                      onGameClick={handleOpenModal} 
                      onAddToCart={handleAddToCart} 
                      onBuyNow={handleOpenPurchaseModal} 
                    />
                  ))}
                </section>
              </div>
            </div>
          )}

          {/* TRANG GIỚI THIỆU */}
          {currentView === 'about' && (
            <div className="animate-page flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
              <AboutSection />
            </div>
          )}

          {/* TRANG HƯỚNG DẪN */}
          {currentView === 'guide' && (
            <div className="animate-page flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
              <GuideSection />
            </div>
          )}

          {/* TRANG LIÊN HỆ */}
          {currentView === 'contact' && (
            <div className="animate-page flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
              <Location />
            </div>
          )}

          {/* DANH SÁCH TẤT CẢ GAME */}
          {currentView === 'AllGames' && (
            <div className="animate-page flex-grow px-4 md:px-10 py-12 max-w-7xl mx-auto w-full">
              <AllGames
                onAddToCart={handleAddToCart}
                onBackToHome={() => setCurrentView('home')}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                suggestions={suggestions}
                handleOpenModal={handleOpenModal}
              />
            </div>
          )}

          {/* CHÂN TRANG & LIÊN HỆ BÊN LỀ */}
          <Footer />
          <FloatingContactWidget />

          {/* HỆ THỐNG POPUP OVERLAYS */}
          <GameModal selectedGame={selectedGame} onClose={closeAllOverlays} />
          {purchaseGame && <PurchaseModal game={purchaseGame} onClose={closeAllOverlays} />}
        </div>
      </main>
    </>
  );
}

export default App;