import React, { useState } from 'react'
import { 
  ShoppingBag, X, Trash2, ArrowDown, MessageSquare, 
  Facebook, Phone, CreditCard, Monitor, Settings2, 
  CheckCircle2, PlayCircle, AlertTriangle 
} from 'lucide-react'

// 🛠️ ĐÃ THÊM: Định nghĩa hàm tối ưu hóa kích thước ảnh mini qua CDN cho giỏ hàng
const getOptimizedMiniImage = (url) => {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('data:')) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=120&output=webp&q=80`;
};

function Cart({ cartItems, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Tính tổng tiền của tất cả các game trong giỏ hàng
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, '')) || 0;
    return sum + price;
  }, 0);

  // Định dạng lại tiền hiển thị
  const formattedTotal = totalAmount.toLocaleString('vi-VN') + 'đ';

  // 2. Tạo nội dung chuyển khoản rút gọn tự động cực ngắn
  const shortGameTitles = cartItems
    .map(item => {
      // Bỏ ký tự đặc biệt, chỉ giữ lại chữ, số và dấu cách
      const cleanTitle = item.title.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      // Chỉ lấy tối đa 3 từ đầu tiên của mỗi tên game
      return cleanTitle.split(/\s+/).slice(0, 3).join(' ');
    })
    // Nối các game lại với nhau bằng dấu "/"
    .join('/');

  // Gộp lại thành chuỗi hoàn chỉnh và giới hạn tối đa 25 ký tự để tránh ngân hàng cắt chữ
  const fullAddInfo = `${shortGameTitles}`.substring(0, 25).trim();

  const vietQRUrl = `https://img.vietqr.io/image/VCB-1014044533-compact.png?amount=${totalAmount}&addInfo=${encodeURIComponent(fullAddInfo)}&accountName=TRAN%20DINH%20THAI`;

  const miniSteps = [
    { icon: <MessageSquare className="w-3.5 h-3.5" />, title: "BƯỚC 1", text: "Nhắn Shop Nhận Account" },
    { icon: <Monitor className="w-3.5 h-3.5" />, title: "BƯỚC 2", text: "Đăng Nhập Steam & Tải" },
    { icon: <Settings2 className="w-3.5 h-3.5" />, title: "BƯỚC 3", text: "Chuyển Offline + Tắt Sync" },
    { icon: <CheckCircle2 className="w-3.5 h-3.5" />, title: "BƯỚC 4", text: "Vào Game Trải Nghiệm" }
  ];

  React.useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // CSS tùy chỉnh cho thanh cuộn chuẩn Neon không giật lag
  const neonScrollbarStyle = `
    .gaming-scrollbar::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .gaming-scrollbar::-webkit-scrollbar-track {
      background: rgba(15, 18, 24, 0.4);
    }
    .gaming-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #06b6d4, #22d3ee);
      border-radius: 999px;
    }
    .gaming-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #06b6d4 rgba(15, 18, 24, 0.4);
    }
  `;

  return (
    <>
      {/* NÚT BẤM GIỎ HÀNG NỔI BẬT */}
      <div className="fixed bottom-6 right-1/4 md:top-6 md:bottom-auto md:right-8 z-[99999] select-none will-change-transform">
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-3 bg-[#080d16] border-2 border-cyan-500/50 rounded-2xl backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all group text-white shadow-2xl active:scale-95"
        >
          <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-cyan-400 group-hover:text-white transition-colors" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black flex items-center justify-center rounded-full animate-bounce border-2 border-[#080d16]">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* MODAL CHI TIẾT GIỎ HÀNG */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4 z-[999999] animate-in fade-in duration-200">
          <style>{neonScrollbarStyle}</style>

          {/* KHUNG MẸ CHÍNH */}
          <div className="relative w-full max-w-6xl h-[92vh] md:h-[85vh] overflow-y-auto md:overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-cyan-500/20 bg-[#080d16] shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col md:flex-row gaming-scrollbar">

            {/* NÚT ĐÓNG MODAL */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-[1001] text-gray-400 hover:text-white hover:bg-red-500 transition-all p-2 bg-black/50 border border-white/5 rounded-full shadow-lg"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            {/* ================= CỘT TRÁI: DANH SÁCH GAME & THANH TOÁN (CHIẾM 60% TỔNG THỂ) ================= */}
            <div className="gaming-scrollbar w-full md:w-[60%] p-5 md:p-6 lg:p-8 border-b md:border-b-0 md:border-r border-cyan-500/10 md:overflow-y-auto flex flex-col justify-between">
              <div>
                <h3 className="text-base md:text-xl font-black uppercase tracking-wide text-white flex items-center gap-2 mb-5">
                  <ShoppingBag className="text-cyan-400 h-5 w-5 md:h-6 md:w-6" /> Giỏ hàng & Thanh toán
                </h3>

                {/* DANH SÁCH GAME TRONG GIỎ HÀNG */}
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-gray-500 italic text-sm">Giỏ hàng đang trống. Hãy thêm game bạn thích nhé!</p>
                  </div>
                ) : (
                  <div className="gaming-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[160px] md:max-h-[220px] overflow-y-auto pr-1 mb-6">
                    {cartItems.map((item, index) => (
                      <div
                        key={`cart-item-${index}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-cyan-950/5 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300"
                      >
                        <img
                          src={getOptimizedMiniImage(item.poster)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-10 h-14 object-cover rounded-lg bg-white/5 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-bold text-white uppercase truncate">{item.title}</h4>
                          <span className="text-[9px] text-cyan-400/60 uppercase tracking-widest font-semibold">{item.genre || 'AAA Game'}</span>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-2.5">
                          <span className="text-xs md:text-sm font-black text-cyan-400">{item.price}</span>
                          <button
                            onClick={() => onRemove(item.title)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Xóa khỏi giỏ hàng"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* KHU VỰC THÔNG TIN CHUYỂN KHOẢN & TỔNG TIỀN */}
                {cartItems.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-5 items-center bg-black/60 border border-cyan-500/10 p-5 rounded-2xl shadow-[inner_0_2px_8px_rgba(0,0,0,0.8)]">
                    {/* KHUNG QR PHÁT SÁNG CÔNG NGHỆ */}
                    <div className="relative p-2 bg-white rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.3)] shrink-0 select-none">
                      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
                      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
                      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>
                      <img src={vietQRUrl} alt="Vietcombank QR" className="w-44 md:w-52 h-auto rounded-xl" />
                    </div>

                    {/* Bảng kê khai chi tiết biên nhận chuyển khoản */}
                    <div className="flex-1 w-full space-y-2.5 text-xs">
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
                        <CreditCard className="w-4 h-4" /> Thông tin chuyển khoản
                      </span>
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between border-b border-cyan-500/10 pb-2">
                          <span className="text-gray-400 uppercase font-semibold text-[10px]">Chủ TK</span>
                          <span className="text-white font-black tracking-wide">TRAN DINH THAI</span>
                        </div>
                        <div className="flex justify-between border-b border-cyan-500/10 pb-2">
                          <span className="text-gray-400 uppercase font-semibold text-[10px]">Ngân hàng</span>
                          <span className="text-white font-bold">Vietcombank (VCB)</span>
                        </div>
                        <div className="flex justify-between border-b border-cyan-500/10 pb-2">
                          <span className="text-gray-400 uppercase font-semibold text-[10px]">Nội dung</span>
                          <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-mono text-[11px] select-all cursor-pointer" title="Click để copy">
                            {fullAddInfo}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-gray-400 uppercase font-extrabold text-[10px]">Tổng cần chuyển</span>
                          <span className="text-lg md:text-2xl font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                            {formattedTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* HỆ THỐNG LIÊN HỆ GIAO DỊCH (ĐỒNG BỘ OBSIDIAN NEON) */}
              {cartItems.length > 0 && (
                <div className="mt-5 pt-3 border-t border-cyan-500/10 select-none">
                  <div className="mb-4 p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/15 animate-pulse text-center">
                    <p className="text-[10px] font-bold text-cyan-300 flex items-center justify-center gap-1">
                      <ArrowDown className="h-3 w-3 animate-bounce" /> Chuyển khoản xong, chọn 1 kênh liên hệ bên dưới để nhận Account ngay!
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href="https://www.facebook.com/profile.php?id=61558065130631"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#0e1624] border border-cyan-500/20 text-[10px] font-bold text-cyan-400 hover:text-black hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                    >
                      <MessageSquare className="h-4 w-4 mb-1 shrink-0" /> Zalo Shop
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61558065130631"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#0e1624] border border-cyan-500/20 text-[10px] font-bold text-cyan-400 hover:text-black hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                    >
                      <Facebook className="h-4 w-4 mb-1 shrink-0 text-cyan-400 group-hover:text-black" /> Messenger
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61558065130631"
                      className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-[10px] font-black text-[#080d16] hover:brightness-110 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all active:scale-95"
                    >
                      <Phone className="h-4 w-4 mb-1 shrink-0" /> Gọi Hotline
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* ================= CỘT PHẢI: HƯỚNG DẪN & QUY TRÌNH & COMBO (CHIẾM 40% TỔNG THỂ) ================= */}
            <div className="gaming-scrollbar flex-1 bg-black/35 p-5 md:p-6 lg:p-8 md:overflow-y-auto flex flex-col justify-between gap-5 border-t md:border-t-0 border-cyan-500/10">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center text-gray-500 italic text-xs">
                  Thêm sản phẩm để mở khóa nội dung hướng dẫn cài đặt.
                </div>
              ) : (
                <div className="space-y-4.5">
                  {/* TIÊU ĐỀ VIDEO */}
                  <div className="flex items-center justify-between select-none">
                    <h4 className="text-xs md:text-sm font-black text-white uppercase italic tracking-wider flex items-center gap-1.5">
                      <PlayCircle className="h-4 w-4 text-cyan-400" /> Video hướng dẫn cài game
                    </h4>
                  </div>

                  {/* VIDEO TUTORIAL */}
                  <div className="max-w-md mx-auto w-full relative group/vidBox">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-10"></div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-cyan-500/20 bg-black shadow-xl">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/CcB3vbLEAOM?si=eB8GmzNhn4gxKz20"
                        title="How to Play Steam Games Offline - TechTUTYT"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* QUY TRÌNH 4 BƯỚC THÍCH ỨNG RESPONSIVE */}
                  <div className="select-none">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-cyan-400 block mb-2">Quy trình 4 bước nhận & chơi game:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {miniSteps.map((step, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-[#080d16]/40 border border-cyan-500/10 flex flex-col items-center text-center justify-center hover:border-cyan-500/30 transition-all duration-300">
                          <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-1 border border-cyan-500/20">
                            {step.icon}
                          </div>
                          <span className="text-[8px] font-black text-cyan-500/50 block tracking-wider uppercase">{step.title}</span>
                          <p className="text-[9px] font-bold text-gray-300 leading-tight uppercase mt-0.5 w-full">
                            {step.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BANNER KHUYẾN MÃI COMBO TÍCH HỢP */}
                  <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-left shadow-[0_0_15px_rgba(6,182,212,0.05)] select-none">
                    <p className="text-[10px] font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider mb-1">
                      🎁 Chương trình combo đặc biệt
                    </p>
                    <p className="text-[11px] leading-normal text-gray-300">
                      Khi kích hoạt tài khoản thành công, bạn sẽ được <span className="text-white font-bold underline decoration-cyan-400/30">Tặng kèm thêm từ 20 đến 100 game AAA khác</span> có sẵn trong cùng một cụm tài khoản hoàn toàn miễn phí!
                    </p>
                  </div>

                  {/* CẢNH BÁO AN TOÀN */}
                  <div className="rounded-2xl bg-red-950/20 p-4 border border-red-500/25 border-l-4 border-l-red-500 shadow-md">
                    <div className="flex items-center gap-1.5 mb-1 text-red-500">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <p className="text-[10px] font-black uppercase tracking-wider">Lưu ý bảo mật tài khoản</p>
                    </div>
                    <p className="text-xs text-red-500 font-black uppercase">
                      TUYỆT ĐỐI KHÔNG ĐỔI MẬT KHẨU!
                    </p>
                    <p className="text-[10px] text-gray-400 italic leading-snug mt-1.5">
                      Mọi hành vi đổi mật khẩu/thay đổi thông tin sẽ bị bot tự động quét nhận dạng khóa vĩnh viễn và Shop từ chối bảo hành/hỗ trợ.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Cart