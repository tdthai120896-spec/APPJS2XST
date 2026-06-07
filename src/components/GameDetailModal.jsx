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

    // Đoạn mã CSS Style tạo thanh cuộn Neon chuẩn Gaming siêu mượt
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

    return createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          style={{ zIndex: 999999 }} // Đè lên tất cả Navbar, Cart
        >
            {/* Lớp nền mờ tối ưu hóa hiệu năng (Không dùng backdrop-blur đè nhau) */}
            <div className="fixed inset-0 bg-black/85" onClick={onClose} />

            {/* Thẻ style nhúng cục bộ */}
            <style>{neonScrollbarStyle}</style>

            {/* Khung nội dung chính - Obsidian Neon Style */}
            <div className="gaming-scrollbar relative w-full max-w-3xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2rem] border border-cyan-500/20 bg-[#080d16] text-white p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col justify-between">

                {/* NÚT ĐÓNG GÓC PHẢI DI ĐỘNG & DESKTOP (Có viền định hình sang trọng) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 border border-white/5 hover:bg-red-500 text-gray-400 hover:text-white rounded-full transition-all duration-300 z-50 shadow-md active:scale-95"
                >
                    <X className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-4 md:pt-2">

                    {/* ================= CỘT TRÁI: ẢNH, GIÁ & NÚT MUA (5/12 cột) ================= */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        {/* Ảnh Poster game có bo góc và viền sáng mờ */}
                        <div className="relative aspect-[3/4] w-full max-w-[180px] mx-auto md:max-w-none overflow-hidden rounded-2xl border border-cyan-500/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)] group">
                            <img
                                src={game.poster}
                                alt={game.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080d16]/80 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Thẻ hiển thị giá tối giản, sang trọng */}
                        <div className="bg-[#0e1624] border border-cyan-500/10 rounded-2xl p-3 text-center">
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Giá trải nghiệm</p>
                            <p className="text-xl md:text-2xl font-black text-cyan-400 tracking-wider">
                                {game.price || '30.000đ'}
                            </p>
                        </div>

                        {/* Nút Mua ngay (Thiết kế đồng bộ với GameCard) */}
                        <div className="relative w-full">
                          <button
                              onClick={() => {
                                  onClose();    // Đóng modal chi tiết
                                  onBuyNow();   // Mở modal QR code của GameCard ngay lập tức
                              }}
                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-[#080d16] py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] transition-all duration-300 active:scale-[0.97] hover:scale-[1.01]"
                          >
                              <ShoppingCart className="h-4 w-4 stroke-[3]" /> Mua ngay
                          </button>
                        </div>
                    </div>

                    {/* ================= CỘT PHẢI: THÔNG TIN CHI TIẾT & CHÍNH SÁCH (7/12 cột) ================= */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                        <div>
                            {/* Tên Game (Loại bỏ thuộc tính italic để tránh rối mắt trên Mobile) */}
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-1.5 leading-tight">
                                {game.title}
                            </h2>
                            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-3.5 flex items-center gap-1.5 select-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,1)]" />
                              Steam Offline Mode • {game.genre || 'AAA'}
                            </p>

                            {/* Banner "Mua 1 Được 100" dạng Hologram tối giản */}
                            <div className="mb-4 p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                                <p className="text-[10px] sm:text-xs font-bold leading-relaxed text-cyan-300 uppercase tracking-wider">
                                    🎁 Mua 1 Được 100: TẶNG LÊN ĐẾN 100 GAMES
                                </p>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold mt-0.5 block leading-normal">
                                    Tài khoản được gán kèm ngẫu nhiên loạt game siêu phẩm sau khi bạn mua thành công!
                                </p>
                            </div>

                            <hr className="border-cyan-500/10 mb-4" />

                            {/* Danh sách 8 chính sách dịch vụ */}
                            <ul className="space-y-2.5">
                                {policies.map((policy, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 group">
                                        <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
                                        <span className="text-[11px] sm:text-xs font-semibold text-gray-300 leading-normal group-hover:text-white transition-colors">
                                            {policy}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* KHU VỰC CONTACT LIÊN HỆ */}
                        <div className="border-t border-cyan-500/10 pt-4 mt-4">
                            <div className="flex items-center gap-1.5 text-cyan-400/80 mb-3 select-none">
                                <HelpCircle className="h-3.5 w-3.5" />
                                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                                    Giải đáp thắc mắc trước khi thanh toán:
                                </p>
                            </div>

                            {/* 3 Nút liên hệ đồng bộ hóa thiết kế tối giản */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="relative group/btn">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61558065130631"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl bg-[#0e1624] border border-cyan-500/15 text-cyan-400 hover:text-black hover:bg-cyan-500 hover:border-cyan-400 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
                                    >
                                        <MessageSquare className="h-3.5 w-3.5 shrink-0" /> Messenger
                                    </a>
                                </div>

                                <div className="relative group/btn">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61558065130631"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl bg-[#0e1624] border border-cyan-500/15 text-cyan-400 hover:text-black hover:bg-cyan-500 hover:border-cyan-400 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95"
                                    >
                                        <Phone className="h-3.5 w-3.5 shrink-0" /> Zalo
                                    </a>
                                </div>

                                <div className="relative group/btn">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61558065130631"
                                        className="relative flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-[#080d16] hover:brightness-110 text-[10px] font-black uppercase tracking-wider transition-all active:scale-95"
                                    >
                                        <Phone className="h-3.5 w-3.5 shrink-0" /> Gọi
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
}

export default GameDetailModal;