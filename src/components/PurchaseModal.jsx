import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { 
  X, MessageSquare, Monitor, Settings2, CheckCircle2, 
  ArrowDown, Facebook, Phone, PlayCircle, AlertTriangle 
} from 'lucide-react'

function PurchaseModal({ game, onClose }) {
  // Khóa cuộn trang nền khi mở modal thanh toán
  useEffect(() => {
    document.body.style.overflow = 'hidden';
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

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 md:p-4 animate-in fade-in duration-300"
      style={{ zIndex: 999999 }}
    >
      {/* Thẻ style nhúng cục bộ để kích hoạt hiệu ứng đổ bóng và màu sắc neon của thanh cuộn */}
      <style>{neonScrollbarStyle}</style>

      {/* KHUNG MẸ CHÍNH - Áp dụng class gaming-scrollbar phục vụ Mobile */}
      <div className="gaming-scrollbar relative w-full max-w-5xl h-[95vh] md:h-[85vh] overflow-y-auto md:overflow-hidden rounded-[2rem] border border-cyan-500/30 bg-[#0f1218] shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col md:flex-row animate-in zoom-in-95 duration-300">

        {/* NÚT ĐÓNG MODAL */}
        <button
          onClick={onClose}
          className="fixed md:absolute right-6 top-6 md:right-4 md:top-4 z-[1002] text-white/50 hover:text-white hover:bg-red-500 transition-all p-1.5 md:p-2 bg-black/60 md:bg-white/10 rounded-full backdrop-blur-lg shadow-xl"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* CỘT TRÁI: THANH TOÁN QR */}
        <div className="w-full md:w-[360px] p-5 md:p-8 border-b md:border-b-0 md:border-r border-white/5 md:shrink-0 bg-gradient-to-b from-transparent to-white/[0.01] flex flex-col justify-between">
          <div className="text-center">
            <h3 className="text-base md:text-xl font-bold text-white tracking-tight">Thanh Toán</h3>
            <p className="text-[10px] md:text-xs text-cyan-400 mt-0.5 uppercase tracking-[0.1em] font-black line-clamp-1">{game.title}</p>

            {/* Vùng QR Code */}
            <div className="my-4 md:my-6 flex justify-center">
              <div className="relative p-1.5 bg-white rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                <img src={vietQRUrl} alt="Vietcombank QR" className="w-32 md:w-44 h-auto rounded-lg md:rounded-xl" />
              </div>
            </div>

            {/* Thông tin số tài khoản */}
            <div className="space-y-1 mb-4 text-left bg-white/5 p-3 md:p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-[10px] md:text-[11px]">
                <span className="text-white/40 uppercase font-medium">Chủ TK:</span>
                <span className="text-white font-bold text-xs md:text-sm">TRAN DINH THAI</span>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-white/5">
                <span className="text-white/40 text-[10px] md:text-[11px] uppercase font-medium">Số tiền:</span>
                <span className="text-base md:text-xl font-black text-emerald-400">{game.price}</span>
              </div>
            </div>

            {/* KHỐI ƯU ĐÃI */}
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <p className="text-[11px] md:text-xs font-black text-left leading-relaxed">
                🎁 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 uppercase tracking-wide">QUÀ TẶNG ĐẶC BIỆT:</span>
                <br />
                <span className="text-white/90">Sau khi đăng nhập, bạn sẽ được </span>
                <span className="text-cyan-400 underline decoration-cyan-400/30">Tặng thêm nhiều game khác lên đến 100 games</span>
                <span className="text-white/90"> hoàn toàn miễn phí!</span>
              </p>
            </div>

            {/* Dòng text trạng thái */}
            <div className="mb-4 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 animate-pulse">
              <p className="text-[9px] md:text-[10px] font-bold text-cyan-200 flex items-center justify-center gap-1">
                <ArrowDown className="h-3 w-3" />
                Chuyển xong nhắn mình nhận Account nhé!
              </p>
            </div>

            {/* Hệ thống nút liên hệ */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
  <div className="relative group/btn">
    <div className="absolute -inset-0.5 bg-blue-600 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
    
    {/* Zalo ẩn */}
    <div 
      onClick={() => {
        // Chuỗi mã hóa Base64 cho sđt 0387182528
        const encoded = "MDM4NzE4MjUyOA1==";
        const phone = atob(encoded);
        window.open(`https://zalo.me/0387182518`, "_blank");
      }}
      className="relative flex flex-col items-center justify-center w-full gap-0.5 rounded-xl bg-[#111622] py-2 text-[9px] font-bold text-blue-400 border border-blue-500/20 transition-colors cursor-pointer"
    >
      <MessageCircle className="h-3.5 w-3.5" /> 
      Zalo
    </div>
  </div>
</div>

          <div>
              <div className="relative group/btn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
                <a href="https://www.facebook.com/profile.php?id=61558065130631" target="_blank" rel="noreferrer" className="relative flex flex-col items-center justify-center w-full gap-0.5 rounded-xl bg-[#111622] py-2 text-[9px] font-bold text-white border border-white/10 transition-colors">
                  <Facebook className="h-3.5 w-3.5 text-blue-400" /> Messenger
                </a>
              </div>

              <div className="relative group/btn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition duration-300"></div>
                <a href="https://www.facebook.com/profile.php?id=61558065130631" className="relative flex flex-col items-center justify-center w-full gap-0.5 rounded-xl bg-gradient-to-br from-[#00d2ff] to-cyan-500 py-2 text-[9px] font-bold text-[#031018] hover:brightness-110 transition-all">
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              </div>
            </div>
          </div>

          {/* Slider quy trình trên Mobile */}
          <div className="md:hidden border-t border-white/5 pt-3 mt-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Quy trình 4 bước</span>
              <span className="text-[8px] font-medium text-white/40 animate-pulse">Vuốt ngang ~&gt;</span>
            </div>

            <div className="no-scrollbar overflow-x-auto pb-1 flex gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {miniSteps.map((step, i) => (
                <div key={i} className="w-[125px] shrink-0 flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-1 border border-cyan-500/20">
                    {step.icon}
                  </div>
                  <span className="text-[7px] font-black text-cyan-500/50 tracking-widest">{step.title}</span>
                  <p className="text-[9px] font-bold text-gray-300 leading-tight uppercase mt-0.5">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: VIDEO & CẢNH BÁO - Áp dụng class gaming-scrollbar phục vụ PC */}
        <div className="gaming-scrollbar flex-1 bg-black/40 p-5 md:p-8 md:overflow-y-auto">
          <div className="mb-3 md:mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] md:text-[10px] font-bold text-red-500 uppercase mb-1.5">
              <PlayCircle className="h-3 w-3" /> Video hướng dẫn
            </div>
            <h4 className="text-base md:text-xl font-black text-white uppercase italic tracking-tight">Hướng Dẫn Chơi Chi Tiết</h4>
          </div>

          <div className="relative group/vidBox mb-5 md:mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-md opacity-20 group-hover/vidBox:opacity-100 transition duration-500"></div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/CcB3vbLEAOM?start=4"
                title="Hướng dẫn"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Quy trình dạng Grid lớn trên PC */}
          <div className="hidden md:grid md:grid-cols-4 gap-3 mb-6">
            {miniSteps.map((step, i) => (
              <div key={i} className="group/step flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 hover:bg-cyan-500/[0.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2 border border-cyan-500/20 group-hover/step:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-[9px] font-black text-cyan-500/60 mb-0.5 tracking-widest">{step.title}</span>
                <p className="text-[10px] font-bold text-gray-300 leading-tight uppercase">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Khung cảnh báo */}
          <div className="rounded-xl bg-red-600/10 p-4 md:p-5 border border-red-500/30 border-l-red-500 border-l-4 shadow-[0_0_20px_rgba(239,68,68,0.05)] mb-2">
            <div className="flex items-center gap-2 mb-1 text-red-500">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-[11px] md:text-[13px] font-black uppercase tracking-wider">Lưu ý cực quan trọng</p>
            </div>
            <p className="text-xs md:text-[15px] text-red-500 font-black">
              TUYỆT ĐỐI KHÔNG ĐỔI MẬT KHẨU TÀI KHOẢN!
            </p>
            <p className="text-[10px] md:text-[11px] text-gray-400 mt-1 italic leading-relaxed">
              Mọi hành vi thay đổi thông tin sẽ bị hệ thống tự động khóa vĩnh viễn và từ chối hỗ trợ.
            </p>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}

export default PurchaseModal;