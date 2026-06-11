import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { 
  X, MessageSquare, Monitor, Settings2, CheckCircle2, 
  ArrowDown, Facebook, Phone, PlayCircle, AlertTriangle 
} from 'lucide-react'

// Các chuỗi Base64 đã mã hóa thông tin liên hệ
const ENCODED_ZALO = 'aHR0cHM6Ly96YWxvLm1lLzAzNzkzMzI4NzA=' // https://zalo.me/0379332870
const ENCODED_CALL = 'dGVsOjAzNzkzMzI4NzA=' // tel:0379332870
const ENCODED_FACEBOOK = 'aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3Byb2ZpbGUucGhwP2lkPTYxNTU4MDY1MTMwNjMx' // Trang Facebook cá nhân

function PurchaseModal({ game, onClose }) {
  const [links, setLinks] = useState({ zalo: '#', messenger: '#', call: '#' });

  // Khóa cuộn trang nền và xử lý giải mã liên kết trên client
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    try {
      setLinks({
        zalo: window.atob(ENCODED_ZALO),
        messenger: window.atob(ENCODED_FACEBOOK),
        call: window.atob(ENCODED_CALL)
      });
    } catch (error) {
      console.error("Lỗi giải mã liên kết:", error);
    }

    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const rawPrice = game.price.replace(/\D/g, '');
  const vietQRUrl = `https://img.vietqr.io/image/VCB-1014044533-compact.png?amount=${rawPrice}&addInfo=${encodeURIComponent(game.title)}&accountName=TRAN%20DINH%20THAI`;

  const miniSteps = [
    { icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />, title: "BƯỚC 1", text: "Nhắn Shop Gửi Account" },
    { icon: <Monitor className="w-4 h-4 md:w-5 md:h-5" />, title: "BƯỚC 2", text: "Đăng nhập Steam và Tải Game" },
    { icon: <Settings2 className="w-4 h-4 md:w-5 md:h-5" />, title: "BƯỚC 3", text: "Chuyển Offline + Tắt Cloud Sync" },
    { icon: <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />, title: "BƯỚC 4", text: "Vào Game và Trải Nghiệm" }
  ];

  // Đoạn mã CSS tạo thanh cuộn mượt mà chuẩn Gaming không gây lag
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
      className="fixed inset-0 flex items-center justify-center bg-black/90 p-2 sm:p-4 animate-in fade-in duration-300"
      style={{ zIndex: 999999 }}
    >
      <style>{neonScrollbarStyle}</style>

      {/* KHUNG MẸ CHÍNH */}
      {/* Thiết kế thông minh: Trên Mobile cho phép cuộn toàn trang (overflow-y-auto), trên PC chia đôi cột và cuộn độc lập */}
      <div className="relative w-full max-w-5xl h-[92vh] md:h-[85vh] overflow-y-auto md:overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-cyan-500/20 bg-[#070b13] shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col md:flex-row animate-in zoom-in-95 duration-300 gaming-scrollbar">

        {/* NÚT ĐÓNG MODAL DI ĐỘNG & DESKTOP (Đặt cố định góc để không bị khuất khi cuộn) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[1002] text-gray-400 hover:text-white hover:bg-red-500 transition-all p-2 bg-black/50 border border-white/5 rounded-full backdrop-blur-md shadow-lg"
        >
          <X className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* ================= CỘT TRÁI: KHU VỰC THANH TOÁN (TRANSACTION ZONE) ================= */}
        <div className="w-full md:w-[360px] p-5 md:p-6 lg:p-8 border-b md:border-b-0 md:border-r border-cyan-500/10 md:shrink-0 bg-[#080e18]/45 flex flex-col justify-between">
          <div className="text-center">
            
            {/* Header thanh toán */}
            <h3 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">Thanh Toán</h3>
            <p className="text-[10px] md:text-xs text-cyan-400 mt-1 uppercase tracking-widest font-extrabold line-clamp-1">
              {game.title}
            </p>

            {/* Vùng QR Code thiết kế công nghệ giả lập khung quét laser */}
            <div className="my-5 flex justify-center">
              <div className="relative p-2 bg-white rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.3)] group">
                {/* 4 Góc Laser trang trí */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>
                
                <img 
                  src={vietQRUrl} 
                  alt="Vietcombank QR" 
                  className="w-32 sm:w-36 md:w-40 h-auto rounded-xl" 
                />
              </div>
            </div>

            {/* Thông tin hóa đơn điện tử (Receipt Card) */}
            <div className="space-y-2 mb-5 text-left bg-black/60 p-4 rounded-2xl border border-cyan-500/10 shadow-[inner_0_2px_8px_rgba(0,0,0,0.8)]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Chủ TK</span>
                <span className="text-white font-black text-xs md:text-sm">TRAN DINH THAI</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-cyan-500/10 text-xs">
                <span className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Số TK (VCB)</span>
                <span className="text-cyan-400 font-bold font-mono text-xs md:text-sm">1014044533</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-cyan-500/10">
                <span className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Số tiền</span>
                <span className="text-lg md:text-xl font-black text-emerald-400 tracking-wider">
                  {game.price}
                </span>
              </div>
            </div>

            {/* Khối quà tặng tri ân tích hợp */}
            <div className="mb-4 p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/25 text-left text-[11px] leading-relaxed shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <p className="font-extrabold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider text-[10px] mb-1">
                🎁 Quà tặng tri ân đi kèm
              </p>
              <span className="text-gray-300">Sau khi đăng nhập thành công, bạn sẽ được </span>
              <span className="text-white font-bold underline decoration-cyan-400/30">Tặng thêm loạt game bản quyền khác lên đến 100 games</span>
              <span className="text-gray-300"> hoàn toàn miễn phí!</span>
            </div>

            {/* Dòng trạng thái nhấp nháy định vị quy trình */}
            <div className="mb-4 p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/15 animate-pulse text-center">
              <p className="text-[10px] font-bold text-cyan-300 flex items-center justify-center gap-1">
                <ArrowDown className="h-3 w-3 animate-bounce" />
                Chuyển xong nhấn liên hệ nhận Account ngay!
              </p>
            </div>

            {/* Hệ thống nút liên hệ (Zalo, Messenger, Call) */}
            <div className="grid grid-cols-3 gap-2">
              <a 
                href={links.zalo} 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center justify-center w-full gap-1 rounded-xl bg-[#0e1624] py-2.5 text-[10px] font-extrabold text-blue-400 border border-blue-500/25 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.1)] active:scale-95"
              >
                <MessageSquare className="h-4 w-4" /> Zalo
              </a>

              <a 
                href={links.messenger} 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center justify-center w-full gap-1 rounded-xl bg-[#0e1624] py-2.5 text-[10px] font-extrabold text-[#38bdf8] border border-[#38bdf8]/20 hover:bg-[#38bdf8] hover:text-black hover:border-[#38bdf8] transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0.1)] active:scale-95"
              >
                <Facebook className="h-4 w-4" /> Messenger
              </a>

              <a 
                href={links.call} 
                className="flex flex-col items-center justify-center w-full gap-1 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 py-2.5 text-[10px] font-black text-[#031018] hover:brightness-110 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all active:scale-95"
              >
                <Phone className="h-4 w-4" /> Gọi điện
              </a>
            </div>

          </div>
        </div>

        {/* ================= CỘT PHẢI: VIDEO & HƯỚNG DẪN CHI TIẾT (ONBOARDING ZONE) ================= */}
        <div className="gaming-scrollbar flex-1 bg-black/35 p-5 md:p-6 lg:p-8 md:overflow-y-auto flex flex-col gap-6">
          
          {/* Tiêu đề hướng dẫn */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[9px] md:text-[10px] font-bold text-cyan-400 uppercase mb-2">
              <PlayCircle className="h-3 w-3" /> Hướng dẫn kỹ thuật
            </div>
            <h4 className="text-lg md:text-2xl font-black text-white uppercase italic tracking-tight">Cài Đặt & Trải Nghiệm</h4>
          </div>

          {/* Video Hướng dẫn chi tiết */}
          <div className="relative group/vidBox w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-md opacity-20 group-hover/vidBox:opacity-40 transition duration-500 pointer-events-none"></div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-black shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src=""
                title="Hướng dẫn"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Quy trình cài đặt 4 Bước */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {miniSteps.map((step, i) => (
              <div 
                key={i} 
                className="group/step flex sm:flex-col items-center sm:text-center text-left gap-3 sm:gap-0 p-3.5 rounded-xl bg-white/[0.01] border border-cyan-500/10 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover/step:scale-105 group-hover/step:border-cyan-400 transition-all shrink-0 sm:mb-2.5">
                  {step.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] md:text-[9px] font-black text-cyan-500/50 tracking-widest uppercase">
                    {step.title}
                  </span>
                  <p className="text-[10px] md:text-[11px] font-bold text-gray-200 leading-snug uppercase mt-0.5">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Khung Lưu Ý An Toàn (Warning Card) */}
          <div className="rounded-2xl bg-red-950/20 p-4 md:p-5 border border-red-500/25 border-l-4 border-l-red-500 shadow-[0_0_20px_rgba(239,68,68,0.05)]">
            <div className="flex items-center gap-2 mb-1.5 text-red-500">
              <AlertTriangle className="h-4.5 w-4.5" />
              <p className="text-xs md:text-sm font-black uppercase tracking-wider">Lưu ý cực kỳ quan trọng</p>
            </div>
            <p className="text-sm md:text-base text-red-500 font-black tracking-wide uppercase">
              TUYỆT ĐỐI KHÔNG THAY ĐỔI THÔNG TIN TÀI KHOẢN!
            </p>
            <p className="text-[11px] md:text-xs text-gray-400 mt-1.5 italic leading-relaxed">
              Mọi hành động cố ý thay đổi mật khẩu hoặc email của tài khoản được cung cấp sẽ bị hệ thống tự động nhận diện khóa vĩnh viễn và Shop có quyền từ chối mọi hình thức hỗ trợ/bảo hành sau đó.
            </p>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}

export default PurchaseModal;