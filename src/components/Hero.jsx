import React, { useState } from 'react'
import { Sparkles, Users, Layers, ShieldCheck, X } from 'lucide-react'
import GameCard from './GameCard'
import SearchBar from './SearchBar';

function Hero({ searchTerm, handleSearch, suggestions, handleOpenModal, handleNavigation, onAddToCart, handleOpenPurchaseModal }) {

  const [searchedGame, setSearchedGame] = useState(null);

  const handleSelectSuggestedGame = (game) => {
    setSearchedGame(game);
    if (handleSearch) {
      handleSearch({ target: { value: '' } });
    }
  };

  return (
    <section className="relative min-h-[950px] md:min-h-[1020px] w-full flex flex-col items-center justify-between text-center pt-28 pb-16 overflow-hidden bg-[#030508]">

      {/* 🌟 CSS OPTIMIZED FOR SMOOTH ANIMATIONS */}
      <style>
        {`
          /* Hiệu ứng thở nhẹ nhàng cho vùng sáng nền ambient */
          @keyframes subtlePulse {
            0%, 100% { opacity: 0.15; transform: scale(1) translate3d(0,0,0); }
            50% { opacity: 0.28; transform: scale(1.02) translate3d(0,0,0); }
          }
          .animate-subtle-pulse {
            animation: subtlePulse 10s ease-in-out infinite;
          }

          /* Chuyển động lơ lửng rất khẽ cho khối video chính */
          @keyframes subtleFloat {
            0%, 100% { transform: translateY(0) translate3d(0,0,0); }
            50% { transform: translateY(-5px) translate3d(0,0,0); }
          }
          .animate-subtle-float {
            animation: subtleFloat 8s ease-in-out infinite;
          }

          /* Hoạt ảnh nhấp nháy phát sáng nhẹ nhàng cho viền và khung của Banner Khuyến Mãi */
          @keyframes bannerFlash {
            0%, 100% {
              border-color: rgba(6, 182, 212, 0.15);
              box-shadow: 0 0 20px rgba(6, 182, 212, 0.05);
            }
            50% {
              border-color: rgba(6, 182, 212, 0.65);
              box-shadow: 0 0 35px rgba(6, 182, 212, 0.25);
            }
          }
          .animate-banner-flash {
            animation: bannerFlash 2s infinite ease-in-out;
          }

          /* Hoạt ảnh nhấp nháy phát quang cao cấp cho cụm chữ tiêu điểm */
          @keyframes textGlow {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.2));
              opacity: 0.85;
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.7));
              opacity: 1;
            }
          }
          .animate-text-glow {
            animation: textGlow 1.6s infinite ease-in-out;
          }
        `}
      </style>

      {/* MODAL HIỂN THỊ GAMECARD (Hòa trộn Xanh Neon & Đen) */}
      {searchedGame && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300 text-left">
          <div className="absolute inset-0" onClick={() => setSearchedGame(null)}></div>

          {/* Container chính với góc bo tròn lớn và bóng đổ mịn sâu */}
          <div className="relative z-10 w-[160px] min-[390px]:w-[180px] sm:w-[280px] md:w-[320px] animate-in zoom-in-95 duration-300 mt-4">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[1.2rem] md:rounded-[1.6rem] opacity-60 blur-md pointer-events-none"></div>

            <div className="relative bg-[#05080c] rounded-[1.2rem] md:rounded-[1.6rem] border border-cyan-400/45 shadow-[0_0_25px_rgba(34,211,238,0.3)] overflow-hidden">
              
              {/* Nút đóng tròn mờ tối giản phong cách Apple */}
              <button
                onClick={() => setSearchedGame(null)}
                className="absolute top-3 right-3 z-50 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full p-1.5 backdrop-blur-md transition-all flex items-center justify-center border border-white/10 shadow-sm"
              >
                <X className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>

              {/* Khung chứa GameCard với chiều cao đã được tối ưu để tránh bị cắt chữ */}
              <div className="h-[280px] min-[390px]:h-[310px] sm:h-[370px] md:h-[410px] w-full flex flex-col">
                <GameCard game={searchedGame} onAddToCart={onAddToCart} onOpenDetail={handleOpenModal} onBuyNow={handleOpenPurchaseModal} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 NỀN VÀ HIỆU ỨNG ÁNH SÁNG CHUYÊN NGHIỆP */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Hình nền Wukong trải rộng chính giữa */}
        <div 
          className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-[0.65] md:opacity-[0.80] transition-all duration-700 ease-out"
          style={{ 
            filter: 'brightness(0.75) contrast(1.12) saturate(1.2)' 
          }}
        />
        
        {/* Hai vùng sáng Neon Cyan / Blue cực lớn ở hai góc để tạo cảm giác đồng bộ với thân web */}
        <div className="hidden md:block absolute top-[5%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/12 blur-[160px] rounded-full transform-gpu" />
        <div className="hidden md:block absolute bottom-[15%] right-[-10%] w-[550px] h-[550px] bg-[#2563eb]/10 blur-[140px] rounded-full transform-gpu" />

        {/* Lưới tọa độ Cyber đổi màu sang Xanh Neon siêu mảnh */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:45px_45px]"></div>

        {/* Lớp phủ tối mượt mà pha một chút sắc xanh neon mờ ở tâm giúp Wukong hòa nhập vào không khí neon */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,rgba(3,5,8,0.75)_50%,#030508_100%)]" />
        
        {/* Lớp phủ chuyển màu chân trang hòa trộn mượt mà vào nội dung tối bên dưới */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#030508] via-[#030508]/95 to-transparent" />

        {/* Quầng sáng Ambient mượt mà nhịp thở Xanh Neon chuyển động chậm */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,rgba(59,130,246,0.03)_40%,transparent_70%)] animate-subtle-pulse transform-gpu" />
      </div>

      {/* KHUNG NỘI DUNG CHÍNH */}
      <div className="relative z-30 w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        
        {/* NHÃN KHỞI CHẠY */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-5 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-300" /> Next-gen gaming hub
        </div>

        {/* TIÊU ĐỀ THƯƠNG HIỆU GRADIENT XANH NEON - TRẮNG */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] whitespace-nowrap">
  NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]">STEAM</span>
</h1>
<span className="text-xl md:text-3xl text-yellow-400 font-semibold tracking-wider animate-pulse text-center leading-none drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
  (Thuê dài hạn, chơi không giới hạn)
</span>
        {/* KHUNG VIDEO HUD */}
        <div className="relative w-full max-w-[310px] sm:max-w-md md:max-w-lg aspect-video mb-8 rounded-2xl overflow-hidden bg-black/40 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.12)] flex items-center justify-center animate-subtle-float transform-gpu">
          {/* 4 Góc trang trí công nghệ viễn tưởng */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-cyan-400/40 rounded-tl-md z-10"></div>
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-cyan-400/40 rounded-tr-md z-10"></div>
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-cyan-400/40 rounded-bl-md z-10"></div>
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-cyan-400/40 rounded-br-md z-10"></div>

          {/* 
            🛠️ ĐÃ CẬP NHẬT:
            - Thay thế đuôi video từ .mp4 sang .webm và loại type tương ứng để tăng tốc độ tải.
          */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/background.jpg"
            className="w-full h-full object-cover opacity-90"
          >
            <source src="/gemini_generated_video_27593B13.webm" type="video/webm" />
          </video>
        </div>

        {/* 
          🛠️ ĐÃ TỐI ƯU MÀU CHỮ:
          - Chuyển từ text-cyan-400 sang text-cyan-400/80 để màu chữ dịu và sâu hơn, đỡ chói mắt.
        */}
        

        {/* THANH TÌM KIẾM */}
        <div className="w-full mb-8 relative z-50">
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            suggestions={suggestions}
            onSelectGame={handleSelectSuggestedGame}
          />
        </div>

        {/* THỐNG KÊ DẠNG KÍNH MỜ */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto p-1.5 rounded-2xl bg-[#070b13]/40 backdrop-blur-md border border-cyan-500/10 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-wider shadow-[0_4px_25px_rgba(0,0,0,0.5)] select-none">
          <div className="flex items-center justify-center gap-1.5 py-2.5 border-r border-white/5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <Users className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="text-gray-300 font-extrabold">1.2k+ Online</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-2.5 border-r border-white/5">
            <Layers className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="text-gray-300 font-extrabold">500+ Game</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="text-gray-300 font-extrabold">Bảo hành dài</span>
          </div>
        </div>
      </div>

      {/* BANNER KHUYẾN MÃI DƯỚI ĐÁY TÔNG XANH NEON */}
      <div className="w-full max-w-5xl px-4 md:px-8 mt-12 z-10 relative">
        {/* Sử dụng class animate-banner-flash để viền nhấp nháy phát sáng */}
        <div className="relative group/promo overflow-hidden rounded-3xl border bg-gradient-to-r from-cyan-950/20 via-[#070b13]/90 to-blue-950/20 p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-cyan-500/35 animate-banner-flash">
          {/* Lớp hào quang lấp lánh nhẹ phía sau */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur opacity-35 group-hover/promo:opacity-50 transition duration-500 pointer-events-none"></div>

          <div className="relative flex flex-col items-center justify-center text-center z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-spin-slow" /> Sự kiện tri ân giới hạn
            </div>
            
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none mb-3 text-white select-none">
              🔥 Thuê 1 Được 100: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 font-black animate-text-glow">TẶNG KÈM LÊN ĐẾN 100 GAMES</span>
            </h2>
            
            <p className="text-[10px] md:text-xs text-gray-400 font-extrabold tracking-widest uppercase">
              Áp dụng tự động cho một số tài khoản ngẫu nhiên sau khi kích hoạt thành công!
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero