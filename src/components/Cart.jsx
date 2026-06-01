import React, { useState } from 'react'
import { 
  ShoppingBag, X, Trash2, Facebook, Phone, CreditCard
} from 'lucide-react'
import PurchaseModal from './PurchaseModal' // <-- Gọi luôn file PurchaseModal khi click nút mua

function Cart({ cartItems, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutGame, setCheckoutGame] = useState(null); // State lưu trữ thông tin gói game mang đi thanh toán QR

  // SỬA LỖI CỘNG TIỀN: Chuyển đổi an toàn, lọc bỏ mọi ký tự chữ/dấu để lấy số chuẩn
  const totalAmount = cartItems.reduce((sum, item) => {
    if (!item.price) return sum;
    const price = parseInt(item.price.toString().replace(/\D/g, '')) || 0;
    return sum + price;
  }, 0);

  const formattedTotal = totalAmount.toLocaleString('vi-VN') + 'đ';

  // SỬA LỖI MẤT NÚT MUA: Định nghĩa Action khi click nút mua ngay trong Giỏ hàng
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    if (cartItems.length === 1) {
      // Nếu giỏ hàng chỉ có 1 game, lấy luôn game đó truyền vào PurchaseModal
      setCheckoutGame(cartItems[0]);
    } else {
      // Nếu mua combo nhiều game, tự động gộp tên và cộng tổng số tiền tạo thành 1 gói combo gọn gàng
      const comboGame = {
        title: `Combo ${cartItems.length} Games (${cartItems.map(i => i.title).join(', ')})`,
        price: formattedTotal
      };
      setCheckoutGame(comboGame);
    }
  };

  // Đồng bộ thanh cuộn màu xanh neon chuẩn gaming giống như thiết kế website của bạn
  const neonScrollbarStyle = `
    .cart-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .cart-scrollbar::-webkit-scrollbar-track {
      background: rgba(15, 18, 24, 0.5);
    }
    .cart-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #06b6d4, #3b82f6);
      border-radius: 999px;
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.6);
    }
    .cart-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #22d3ee, #60a5fa);
    }
  `;

  return (
    <>
      <style>{neonScrollbarStyle}</style>

      {/* NÚT BẤM MỞ GIỎ HÀNG */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-[999] p-3 rounded-full bg-[#05080c]/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-cyan-400 transition-all hover:scale-110 active:scale-95
          md:top-6 md:right-6 
          max-md:bottom-6 max-md:right-24"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
              {cartItems.length}
            </span>
          )}
        </div>
      </button>

      {/* OVERLAY & SIDEBAR GIỎ HÀNG */}
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex justify-end">
          {/* Backdrop mờ làm tối nền */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Nội dung Sidebar */}
          <div className="relative w-full max-w-md bg-[#05080c] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-black uppercase italic text-white tracking-tight">Giỏ hàng của bạn</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Vùng danh sách sản phẩm */}
            <div className="flex-grow overflow-y-auto p-6 cart-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 text-white">
                  <ShoppingBag className="w-16 h-16 mb-4 animate-pulse" />
                  <p className="text-lg font-medium">Giỏ hàng đang trống</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group relative overflow-hidden">
                      
                      {/* SỬA LỖI ẢNH: Đổi từ item.image thành item.poster để khớp với dữ liệu GameCard */}
                      <img 
                        src={item.poster} 
                        alt={item.title} 
                        className="w-16 h-20 md:w-20 md:h-24 object-cover rounded-xl shrink-0 border border-white/10 shadow-lg" 
                      />
                      
                      <div className="flex flex-col justify-center flex-grow min-w-0">
                        <h3 className="font-bold text-white text-sm md:text-base mb-1 truncate group-hover:text-cyan-400 transition-colors uppercase italic tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-cyan-400 font-black text-xs md:text-sm tracking-wide">{item.price}</p>
                      </div>
                      
                      <button 
                        onClick={() => onRemove(item.title)}
                        className="p-2 self-center text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all shrink-0"
                        title="Xóa khỏi giỏ hàng"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Khối hiển thị tổng số tiền và nút mua hàng */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-medium">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    {formattedTotal}
                  </span>
                </div>
                
                {/* ĐÃ THÊM: NÚT MUA HÀNG GAMING (KÍCH HOẠT QR QUÉT MÃ) */}
                <div className="relative group/buyBtn w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-40 group-hover/buyBtn:opacity-100 transition duration-300"></div>
                  <button
                    onClick={handleCheckout}
                    className="relative w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-xl font-black text-xs md:text-sm uppercase transition-transform active:scale-[0.98] flex items-center justify-center gap-2 tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  >
                    <CreditCard className="w-4 h-4 stroke-[2.5]" />
                    Tiến hành mua ngay (Quét mã QR)
                  </button>
                </div>

                <div className="relative text-center my-1">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest bg-[#05080c] px-2 relative z-10">Hoặc liên hệ shop</span>
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 z-0"></div>
                </div>

                {/* Các cổng liên hệ phụ trợ khi khách có thắc mắc */}
                <div className="grid grid-cols-2 gap-3">
                  <a href="https://m.me/yourpage" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase hover:bg-blue-600 hover:text-white transition-all text-center">
                    <Facebook className="w-3.5 h-3.5" /> Messenger
                  </a>
                  <div className="grid grid-cols-3 gap-1.5 mb-2">
  <div className="relative group/btn">
    <div className="absolute -inset-0.5 bg-blue-600 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
    
    {/* Sử dụng div thay vì a để ẩn liên kết trong F12 */}
    <div 
      onClick={() => {
        // Chuỗi mã hóa Base64 cho sđt 0387182528
        const encoded = "MDM4NzE4MjUyOA==";
        const phone = atob(encoded);
        window.open(`https://zalo.me/0387182518`, "_blank");
      }}
      className="relative flex flex-col items-center justify-center w-full gap-0.5 rounded-xl bg-[#111622] py-2 text-[9px] font-bold text-blue-400 border border-blue-500/20 transition-colors cursor-pointer"
    >
      <Phone className="h-3.5 w-3.5" /> 
      Zalo
    </div>
  </div>
</div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ĐÃ TÍCH HỢP: Gọi giao diện quét mã QR PurchaseModal khi người dùng click thanh toán */}
      {checkoutGame && (
        <PurchaseModal 
          game={checkoutGame} 
          onClose={() => setCheckoutGame(null)} 
        />
      )}
    </>
  )
}

export default Cart