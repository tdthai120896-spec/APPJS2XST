import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, HelpCircle, MessageSquare, MessageCircle, Phone, ShoppingCart } from 'lucide-react';

// Chuỗi mã hóa Base64 cho thông tin liên hệ
const ENCODED_ZALO = 'aHR0cHM6Ly96YWxvLm1lLzAzNzkzMzI4NzA='; // https://zalo.me/0379332870
const ENCODED_MESSENGER = 'aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3Byb2ZpbGUucGhwP2lkPTYxNTU4MDY1MTMwNjMx'; // Link FB cá nhân
const ENCODED_CALL = 'dGVsOjAzNzkzMzI4NzA='; // tel:0379332870

// 🛠️ ĐÃ THÊM: Hàm nén ảnh và tự động chuyển sang WebP (giới hạn chiều rộng 640px cho Modal sắc nét)
const getOptimizedModalImage = (url) => {
    if (!url) return '';
    if (url.startsWith('/') || url.startsWith('data:')) return url;
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=640&output=webp&q=80`;
};

function GameDetailModal({ game, onClose, onBuyNow }) {
    const [links, setLinks] = useState({ zalo: '#', messenger: '#', call: '#' });

    // Tự động khóa cuộn trang nền khi mở Modal và giải mã liên kết
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        try {
            setLinks({
                zalo: window.atob(ENCODED_ZALO),
                messenger: window.atob(ENCODED_MESSENGER),
                call: window.atob(ENCODED_CALL)
            });
        } catch (error) {
            console.error("Lỗi giải mã liên kết:", error);
        }

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

    // Đoạn mã CSS Style tạo thanh cuộn Neon mượt mà
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
          style={{ zIndex: 999999 }}
        >
            {/* Lớp nền tối */}
            <div className="fixed inset-0 bg-black/85" onClick={onClose} />

            <style>{neonScrollbarStyle}</style>

            {/* Khung nội dung chính - Phong cách Apple Card bo tròn hiện đại */}
            <div className="gaming-scrollbar relative w-[92vw] sm:w-[85vw] md:w-full md:max-w-3xl h-fit max-h-[86dvh] md:max-h-[85vh] overflow-y-auto rounded-[2rem] border border-cyan-500/20 bg-[#080d16] text-white p-5 sm:p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between">

                {/* NÚT ĐÓNG GÓC PHẢI DI ĐỘNG & DESKTOP */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 border border-white/5 hover:bg-red-500 text-gray-400 hover:text-white rounded-full transition-all duration-300 z-50 shadow-md active:scale-95"
                >
                    <X className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 pt-4 md:pt-2">

                    {/* ================= CỘT TRÁI: ẢNH, GIÁ & NÚT MUA (5/12 cột) ================= */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        {/* Khung ảnh tỉ lệ 16:9 sắc nét đã qua tối ưu WebP */}
                        <div className="relative aspect-[16/9] w-full mx-auto overflow-hidden rounded-2xl border border-cyan-500/10 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                            <img
                                src={getOptimizedModalImage(game.poster)} // 🛠️ Áp dụng nén WebP động tại đây
                                alt={game.title}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080d16]/80 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Thẻ hiển thị giá tối giản */}
                        <div className="bg-[#0e1624] border border-cyan-500/10 rounded-2xl p-2.5 text-center">
                            <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase mb-0.5">Giá trải nghiệm</p>
                            <p className="text-lg md:text-2xl font-black text-cyan-400 tracking-wider leading-none">
                                {game.price || '30.000đ'}
                            </p>
                        </div>

                        {/* Nút Mua ngay */}
                        <div className="relative w-full">
                          <button
                              onClick={() => {
                                  onClose();
                                  onBuyNow();
                              }}
                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-[#080d16] py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] transition-all duration-300 active:scale-[0.97] hover:scale-[1.01]"
                          >
                              <ShoppingCart className="h-4 w-4 stroke-[3]" /> Mua ngay
                          </button>
                        </div>
                    </div>

                    {/* ================= CỘT PHẢI: THÔNG TIN CHI TIẾT & CHÍNH SÁCH (7/12 cột) ================= */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
                        <div>
                            {/* Tên Game */}
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-1 leading-tight">
                                {game.title}
                            </h2>
                            <p className="text-[9px] sm:text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-3 flex items-center gap-1.5 select-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,1)]" />
                              Steam Offline Mode • {game.genre || 'AAA'}
                            </p>

                            {/* Banner "Mua 1 Được 100" */}
                            <div className="mb-3.5 p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                                <p className="text-[10px] sm:text-xs font-bold leading-normal text-cyan-300 uppercase tracking-wider">
                                    🎁 Mua 1 Được 100: TẶNG LÊN ĐẾN 100 GAMES
                                </p>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold mt-0.5 block leading-normal">
                                    Tài khoản được gán kèm ngẫu nhiên loạt game siêu phẩm sau khi bạn mua thành công!
                                </p>
                            </div>

                            <hr className="border-cyan-500/10 mb-3" />

                            {/* Danh sách chính sách dịch vụ */}
                            <ul className="space-y-2">
                                {policies.map((policy, idx) => (
                                    <li key={idx} className="flex items-start gap-2 group">
                                        <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
                                        <span className="text-[11px] sm:text-xs font-semibold text-gray-300 leading-normal group-hover:text-white transition-colors">
                                            {policy}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* KHU VỰC CONTACT LIÊN HỆ */}
                        <div className="border-t border-cyan-500/10 pt-3.5 mt-3">
                            <div className="flex items-center gap-1.5 text-cyan-400/80 mb-2.5 select-none">
                                <HelpCircle className="h-3.5 w-3.5" />
                                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                                    Giải đáp thắc mắc trước khi thanh toán:
                                </p>
                            </div>

                            {/* Hệ thống 3 nút liên hệ (Đã đồng bộ hóa biểu tượng) */}
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                <a
                                    href={links.messenger}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-1 px-1 py-2.5 rounded-xl bg-[#0e1624] border border-cyan-500/15 text-cyan-400 hover:text-black hover:bg-cyan-500 hover:border-cyan-400 text-[9px] min-[375px]:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 text-center"
                                >
                                    <MessageSquare className="h-3.5 w-3.5 shrink-0 hidden min-[360px]:block" /> Messenger
                                </a>

                                <a
                                    href={links.zalo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-1 px-1 py-2.5 rounded-xl bg-[#0e1624] border border-cyan-500/15 text-cyan-400 hover:text-black hover:bg-cyan-500 hover:border-cyan-400 text-[9px] min-[375px]:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 text-center"
                                >
                                    <MessageCircle className="h-3.5 w-3.5 shrink-0 hidden min-[360px]:block fill-current" /> Zalo
                                </a>

                                <a
                                    href={links.call}
                                    className="flex items-center justify-center gap-1 px-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-[#080d16] hover:brightness-110 text-[9px] min-[375px]:text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 text-center"
                                >
                                    <Phone className="h-3.5 w-3.5 shrink-0 hidden min-[360px]:block fill-current" /> Gọi điện
                                </a>
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