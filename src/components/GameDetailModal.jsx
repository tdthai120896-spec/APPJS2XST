{/* Nội dung trong mục con mắt */}
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, HelpCircle, MessageSquare, Phone, ShoppingCart } from 'lucide-react';

function GameDetailModal({ game, onClose, onBuyNow }) {
    // Tự động khóa cuộn trang nền (background scroll) khi mở Modal trên Mobile
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    if (!game) return null;

    const policies = [
        'Game bản quyền update đầy đủ.',
        'Dạng thuê tài khoản steam chỉ cần đăng nhập và chơi.',
        'Trước khi chơi cần chuyển Steam sang chế độ Offline.',
        'Không đổi được email và mật khẩu.',
        'Được quyền truy cập Workshop.',
        'Đăng nhập được vào các nền tảng cloud gaming.',
        'Hỗ trợ cài đặt và bảo hành trong suốt quá trình chơi game.',
        'Sử dụng không thời hạn.'
    ];

    // Đoạn mã CSS Style nhúng trực tiếp để tạo thanh cuộn Neon chuẩn Gaming
    const neonScrollbarStyle = `
      .gaming-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .gaming-scrollbar::-webkit-scrollbar-track {
        background: rgba(15, 18, 24, 0.5);
        border-radius: 999px;
      }
      .gaming-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #06b6d4, #3b82f6);
        border-radius: 999px;
        box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
      }
      .gaming-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #22d3ee, #60a5fa);
      }
      /* Ẩn thanh cuộn mặc định của trình duyệt để ép dùng giao diện gaming */
      .gaming-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #06b6d4 rgba(15, 18, 24, 0.5);
      }
    `;

    // SỬ DỤNG CREATEPORTAL ĐỂ ĐẨY MODAL RA NGOÀI CÙNG DOM
    return createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          style={{ zIndex: 999999 }} // Đảm bảo đè lên tất cả Navbar, Cart
        >
            {/* Lớp nền mờ */}
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

            {/* Thẻ style nhúng cục bộ */}
            <style>{neonScrollbarStyle}</style>

            {/* Khung nội dung chính - Tối ưu max-h cho mobile không bị cấn viền */}
            <div className="gaming-scrollbar relative w-full max-w-3xl h-[95vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-[#0b101a] text-white p-5 sm:p-6 md:p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)]">

                {/* Nút đóng góc phải */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-5 md:right-5 p-2 bg-white/10 hover:bg-red-500 hover:text-white text-gray-300 rounded-full transition-colors z-50 backdrop-blur-md"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-6 md:pt-4">

                    {/* CỘT TRÁI: HÌNH ẢNH GAME & NÚT MUA NGAY KÍCH HOẠT THANH TOÁN */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto md:max-w-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
                            <img
                                src={game.poster}
                                alt={game.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* GIÁ TIỀN NỔI BẬT */}
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 md:p-4 text-center">
                            <p className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-widest uppercase mb-1">Giá trải nghiệm</p>
                            <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                {game.price || '30.000đ'}
                            </p>
                        </div>

                        {/* NÚT MUA NGAY LIÊN KẾT CHÉO SANG MODAL THANH TOÁN */}
                        <div className="relative group/buyBtn w-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-70 group-hover/buyBtn:opacity-100 transition duration-300"></div>
                            <button
                                onClick={() => {
                                    onClose();    // Đóng modal chi tiết
                                    onBuyNow();   // Mở modal QR code của GameCard ngay lập tức
                                }}
                                className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black py-3 rounded-xl font-black uppercase tracking-wider text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                            >
                                <ShoppingCart className="h-4 w-4 stroke-[2.5]" /> Mua ngay
                            </button>
                        </div>
                    </div>

                    {/* CỘT PHẢI: NỘI DUNG CHI TIẾT */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                        <div>
                            {/* Tên Game */}
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white mb-1">
                                {game.title}
                            </h2>
                            <p className="text-[10px] sm:text-[11px] text-cyan-400 font-extrabold uppercase tracking-widest mb-3">
                                Steam Offline Mode • {game.genre || 'AAA'}
                            </p>

                            {/* DÒNG CHỮ "MUA 1 ĐƯỢC 100" NHẤP NHÁY MÀU VÀNG NEON */}
                            <div className="mb-4 p-3 rounded-xl bg-amber-500/5 border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse">
                                <p className="text-xs font-medium leading-relaxed">
                                    🎁 <span className="font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]">
                                        Mua 1 Được 100: TẶNG LÊN ĐẾN 100 GAMES
                                    </span>
                                    <br />
                                    <span className="text-[10px] sm:text-[11px] text-amber-200/90 font-semibold mt-0.5 block">
                                        Áp dụng tự động cho một số tài khoản ngẫu nhiên sau khi mua thành công!
                                    </span>
                                </p>
                            </div>

                            <hr className="border-white/10 mb-4" />

                            {/* Danh sách 8 gạch đầu dòng */}
                            <ul className="space-y-2.5 sm:space-y-3">
                                {policies.map((policy, idx) => (
                                    <li key={idx} className="flex items-start gap-2 sm:gap-3 group">
                                        <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-[11px] sm:text-sm font-medium text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                                            {policy}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* KHU VỰC CONTACT LIÊN HỆ */}
                        <div className="border-t border-white/10 pt-4 mt-4 md:mt-6">
                            <div className="flex items-center gap-2 text-amber-400 mb-3">
                                <HelpCircle className="h-4 w-4" />
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                                    Bạn có thắc mắc khác trước khi mua? Liên hệ ngay:
                                </p>
                            </div>

                            {/* 3 Nút Contact chia cột Grid cân đối cao cấp */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="relative group/btn">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61558065130631"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-2 sm:py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 text-blue-400 hover:text-white text-[9px] sm:text-[11px] font-bold uppercase tracking-wider transition-all"
                                    >
                                        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" /> Messenger
                                    </a>
                                </div>

                                <div className="relative group/btn">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61558065130631"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-2 sm:py-2.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-600/30 text-emerald-400 hover:text-white text-[9px] sm:text-[11px] font-bold uppercase tracking-wider transition-all"
                                    >
                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" /> Zalo Chat
                                    </a>
                                </div>

                                <div className="relative group/btn">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61558065130631"
                                        className="relative flex items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-2 sm:py-2.5 rounded-xl bg-gradient-to-br from-[#00d2ff] to-cyan-500 text-[#031018] hover:brightness-110 font-bold text-[9px] sm:text-[11px] uppercase tracking-wider transition-all"
                                    >
                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" /> Call
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>,
        document.body // Bắn DOM ra ngoài cùng
    );
}

export default GameDetailModal;