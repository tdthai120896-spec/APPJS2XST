import React, { useState } from 'react'
import { 
  ShoppingBag, X, Trash2, ArrowDown, MessageSquare, 
  Facebook, Phone, CreditCard, Monitor, Settings2, 
  CheckCircle2, PlayCircle, AlertTriangle 
} from 'lucide-react'

function Cart({ cartItems, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Tính tổng tiền của tất cả các game trong giỏ hàng
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, '')) || 0;
    return sum + price;
  }, 0);

  // Định dạng lại tiền hiển thị
  const formattedTotal = totalAmount.toLocaleString('vi-VN') + 'đ';

  // 2. Tạo nội dung chuyển khoản rút gọn cực ngắn
  // 2. Tạo nội dung chuyển khoản tự động rút gọn cực ngắn
  const shortGameTitles = cartItems
    .map(item => {
      // Bỏ ký tự đặc biệt, chỉ giữ lại chữ, số và dấu cách
      const cleanTitle = item.title.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      // Chỉ lấy tối đa 3 từ đầu tiên của mỗi tên game
      return cleanTitle.split(/\s+/).slice(0, 3).join(' ');
    })
    // Nối các game lại với nhau bằng dấu " / " để phân biệt rõ ràng
    .join(' / ');

  // Gộp lại thành chuỗi hoàn chỉnh và ép không vượt quá 25 ký tự để tránh bị ngân hàng cắt chữ
  const fullAddInfo = `${shortGameTitles}`.substring(0, 25).trim();
  
  const vietQRUrl = `https://img.vietqr.io/image/VCB-1014044533-compact.png?amount=${totalAmount}&addInfo=${encodeURIComponent(fullAddInfo)}&accountName=TRAN%20DINH%20THAI`;

  const miniSteps = [
    { icon: <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />, title: "BƯỚC 1", text: "Nhắn Shop Nhận Account" },
    { icon: <Monitor className="w-3.5 h-3.5 md:w-4 md:h-4" />, title: "BƯỚC 2", text: "Đăng Nhập Steam & Tải" },
    { icon: <Settings2 className="w-3.5 h-3.5 md:w-4 md:h-4" />, title: "BƯỚC 3", text: "Chuyển Offline + Tắt Sync" },
    { icon: <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />, title: "BƯỚC 4", text: "Vào Game Trải Nghiệm" }
  ];

  React.useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* NÚT BẤM GIỎ HÀNG */}
      <div className="fixed bottom-6 right-1/4 md:top-6 md:bottom-auto md:right-8 z-[99999]">
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-3 bg-[#0b101a] border-2 border-cyan-500/50 rounded-2xl backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all group text-white shadow-2xl"
        >
          <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-cyan-400 group-hover:text-white transition-colors" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black flex items-center justify-center rounded-full animate-bounce border-2 border-[#05070a]">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* MODAL CHI TIẾT GIỎ HÀNG */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 md:p-4 z-[999999] animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl h-[95vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-[2rem] border border-cyan-500/30 bg-[#0f1218] shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col md:flex-row">
            
            {/* NÚT ĐÓNG */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-[1001] text-white/50 hover:text-white hover:bg-red-500 transition-all p-1.5 bg-white/10 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            {/* CỘT TRÁI: CHI TIẾT THANH TOÁN (CHIẾM 2/3 TỔNG THỂ ~ 65%) */}
            <div className="w-full md:w-[65%] p-5 md:p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-2xl font-black uppercase italic text-white flex items-center gap-2 mb-4">
                  <ShoppingBag className="text-cyan-400 h-5 w-5 md:h-6 md:w-6" /> Giỏ hàng & Thanh toán
                </h3>

                {/* DANH SÁCH GAME */}
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-gray-500 italic text-sm">Giỏ hàng đang trống. Hãy thêm game bạn thích nhé!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[160px] md:max-h-[220px] overflow-y-auto pr-1 custom-scrollbar mb-6">
                    {cartItems.map((item, index) => (
                      <div 
                        key={`cart-item-${index}`} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors"
                      >
                        <img src={item.poster} alt="" loading="lazy" className="w-10 h-14 object-cover rounded-lg bg-white/5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-bold text-white uppercase truncate">{item.title}</h4>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.genre || 'AAA Game'}</span>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-2">
                          <span className="text-xs md:text-sm font-black text-cyan-400">{item.price}</span>
                          <button 
                            onClick={() => onRemove(item.title)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* KHU VỰC THÔNG TIN QR (GẤP ĐÔI) & TÀI KHOẢN TỔNG */}
                {cartItems.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
                    {/* KHUNG QR CODE PHÓNG TO */}
                    <div className="relative p-2 bg-white rounded-2xl shadow-[0_0_35px_rgba(34,211,238,0.4)] shrink-0 animate-pulse">
                      <img src={vietQRUrl} alt="Vietcombank QR" className="w-56 md:w-64 h-auto rounded-xl" />
                    </div>
                    
                    <div className="flex-1 w-full space-y-3">
                      <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" /> Thông tin chuyển khoản
                      </span>
                      <div className="space-y-2.5 text-xs md:text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 uppercase text-[11px] md:text-xs">Chủ tài khoản:</span>
                          <span className="text-white font-black tracking-wide">TRAN DINH THAI</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 uppercase text-[11px] md:text-xs">Ngân hàng:</span>
                          <span className="text-white font-medium">Vietcombank (VCB)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 uppercase text-[11px] md:text-xs">Nội dung mẫu:</span>
                          <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{fullAddInfo}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-white/40 uppercase font-bold text-xs">Tổng cần thanh toán:</span>
                          <span className="text-xl md:text-3xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.2)]">{formattedTotal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* HỆ THỐNG LIÊN HỆ GIAO DỊCH */}
              {cartItems.length > 0 && (
                <div className="mt-5 pt-3 border-t border-white/5">
                  <div className="mb-3 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                    <p className="text-[10px] font-bold text-cyan-200 flex items-center justify-center gap-1">
                      <ArrowDown className="h-3 w-3 animate-bounce" /> Chuyển khoản xong hãy chọn một phương thức nhắn tin bên dưới để nhận tài khoản!
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#111622] text-[10px] font-bold text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 transition-colors">
                      <MessageSquare className="h-4 w-4 mb-0.5" /> Zalo Shop
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-[#111622] text-[10px] font-bold text-white border border-white/10 hover:bg-white/5 transition-colors">
                      <Facebook className="h-4 w-4 text-blue-400 mb-0.5" /> Messenger
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61558065130631" className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-gradient-to-br from-[#00d2ff] to-cyan-500 text-[10px] font-black text-[#031018] hover:brightness-110 transition-all">
                      <Phone className="h-4 w-4 mb-0.5" /> Gọi Hotline
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CỘT PHẢI: VIDEO THU NHỎ, ƯU ĐÃI & QUY TRÌNH 4 BƯỚC (CHIẾM 1/3 TỔNG THỂ) */}
            <div className="flex-1 bg-black/40 p-5 md:p-6 flex flex-col justify-between gap-4">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center text-gray-500 italic text-xs">
                  Thêm sản phẩm để mở khóa nội dung hướng dẫn.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* TIÊU ĐỀ VIDEO */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm md:text-base font-black text-white uppercase italic tracking-tight flex items-center gap-1.5">
                      <PlayCircle className="h-4 w-4 text-red-500" /> Video Hướng Dẫn Cài Game
                    </h4>
                  </div>

                  {/* KHUNG VIDEO YOUTUBE ĐÃ ĐƯỢC THU NHỎ */}
                  <div className="max-w-md mx-auto w-full relative group/vidBox">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20"></div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-xl">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/CcB3vbLEAOM?start=4"
                        title="Hướng dẫn"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* KHỐI QUY TRÌNH MỚI - GỌN GÀNG KHÔNG BỊ MẤT KHÚC */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-2">Quy trình 4 bước nhận & chơi game:</span>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
                      {miniSteps.map((step, i) => (
                        <div key={i} className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-1 border border-cyan-500/20">
                            {step.icon}
                          </div>
                          <span className="text-[8px] font-black text-cyan-500/60 block tracking-tighter">{step.title}</span>
                          <p className="text-[9px] font-bold text-gray-300 leading-tight uppercase mt-0.5 break-words w-full">
                            {step.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KHỐI KHUYẾN MÃI COMBO */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent border border-cyan-500/20">
                    <p className="text-[11px] font-bold leading-relaxed text-gray-300">
                      🎁 <span className="text-amber-400 font-black uppercase tracking-wide">ƯU ĐÃI KHỦNG:</span> Khi kích hoạt tài khoản, bạn sẽ được <span className="text-cyan-400 underline decoration-cyan-400/30 font-black">Tặng kèm thêm từ 20 đến 100 game AAA khác</span> có sẵn trong cụm Account hoàn toàn miễn phí!
                    </p>
                  </div>

                  {/* CẢNH BÁO AN TOÀN */}
                  <div className="rounded-xl bg-red-600/10 p-3 border border-red-500/20 border-l-red-500 border-l-4 shadow-md">
                    <div className="flex items-center gap-1.5 mb-0.5 text-red-500">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <p className="text-[10px] font-black uppercase tracking-wider">Lưu ý bảo mật tài khoản</p>
                    </div>
                    <p className="text-xs text-red-500 font-black uppercase">
                      TUYỆT ĐỐI KHÔNG ĐỔI MẬT KHẨU!
                    </p>
                    <p className="text-[10px] text-gray-400 italic leading-snug mt-0.5">
                      Mọi hành vi đổi thông tin/mật khẩu sẽ bị bot quét và hệ thống tự động khóa vĩnh viễn, từ chối quyền lợi hỗ trợ bảo hành.
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