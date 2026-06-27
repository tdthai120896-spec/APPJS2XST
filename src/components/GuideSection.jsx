import React from 'react';
import { 
  UserPlus, 
  Wallet, 
  ShoppingCart, 
  CheckCircle2, 
  Gamepad2,
  Youtube,
  ExternalLink
} from 'lucide-react';

function GuideSection() {
  const steps = [
    {
      icon: <UserPlus className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />,
      title: "Thanh toán thành công & Liên hệ cho Shop",
      desc: "Tạo tài khoản nhanh chóng chỉ trong 30 giây bằng Email hoặc kết nối Google để bắt đầu hành trình.",
      badge: "Bước 1"
    },
    {
      icon: <Wallet className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />,
      title: "Nhận tài khoản và đăng nhập",
      desc: "Hỗ trợ nhiều phương thức nạp linh hoạt: Chuyển khoản ngân hàng tự động 24/7, ví điện tử Momo, thẻ siêu rẻ.",
      badge: "Bước 2"
    },
    {
      icon: <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />,
      title: "Tải game bạn muốn",
      desc: "Duyệt qua kho game đa dạng, nhấn 'Thuê ngay' hoặc thêm vào giỏ hàng. Hệ thống xử lý đơn hàng tức thì.",
      badge: "Bước 3"
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />,
      title: "Tắt chế độ Sync Cloud và chuyển sang chế độ Offline",
      desc: "Thông tin tài khoản game hoặc mã kích hoạt (Key) sẽ được gửi ngay vào mục 'Lịch sử' của bạn.",
      badge: "Bước 4"
    },
    {
      icon: <Gamepad2 className="h-5 w-5 md:h-6 md:w-6 text-pink-400" />,
      title: "Trải nghiệm trò chơi",
      desc: "Đăng nhập và bắt đầu thưởng thức tựa game yêu thích của bạn. Đội ngũ hỗ trợ kỹ thuật luôn sẵn sàng 24/7.",
      badge: "Bước 5"
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20 relative" id="guide">
      {/* Hiệu ứng ánh sáng nền phía sau */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Tiêu đề phần hướng dẫn */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl font-black uppercase italic tracking-tight sm:text-4xl text-white">
          Hướng dẫn <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">nhận game chi tiết</span>
        </h2>
        <p className="mt-3 text-xs md:text-sm text-white/40 uppercase tracking-widest max-w-md mx-auto">
          ⚡ Quy trình 5 bước đơn giản & Video trực quan để sở hữu game bản quyền siêu tốc
        </p>
        <div className="w-24 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
      </div>

      {/* LAYOUT GRID 2 CỘT: Cân bằng Timeline và Video */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        
        {/* --- CỘT BÊN TRÁI: Timeline Hướng dẫn --- */}
        <div className="relative pl-10">
          {/* Thanh màu xanh chạy dọc sát mép trái */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[2.5px] bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]" />

          {/* Danh sách các bước (Căn trái toàn bộ) */}
          <div className="space-y-10">
            {steps.map((step, index) => (
              <div 
                key={`step-${index}`} 
                className="relative flex items-start"
              >
                {/* Chấm tròn nút bấm Neon */}
                <div className="absolute left-[-10.5px] top-4 flex items-center justify-center z-20">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#05080c] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                  </div>
                </div>

                {/* Nội dung card (Căn trái) */}
                <div className="relative group bg-[#0b101a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1">
                  {/* Góc phát sáng gradient nhỏ khi hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Khối bọc Icon */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2.5 bg-white/[0.02] border border-white/10 rounded-xl group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all duration-300 transform group-hover:scale-105">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-cyan-400/80 bg-cyan-500/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-cyan-500/20">
                        {step.badge}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-white uppercase mt-1 group-hover:text-cyan-400 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Đoạn văn mô tả */}
                  <p className="text-xs text-white/60 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CỘT BÊN PHẢI: Clip YouTube Hướng dẫn --- */}
        <div className="md:sticky md:top-24 space-y-6">
          <div className="relative group bg-[#0b101a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            
            {/* Header Video */}
            <div className="flex items-center justify-between gap-4 p-3 mb-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                  <Youtube className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-tight">Video Hướng Dẫn</h4>
                  <p className="text-[11px] text-white/40 uppercase tracking-widest mt-0.5">Cách chơi game offline steam</p>
                </div>
              </div>
              <a 
                href="https://www.youtube.com/watch?v=CcB3vbLEAOM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/[0.02] border border-white/10 text-white/40 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300"
                title="Xem trên YouTube"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            {/* Container Iframe Video YouTube tỉ lệ 16:9 */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:border-cyan-500/30 transition-all duration-500">
              <iframe 
                src="https://www.youtube.com/embed/CcB3vbLEAOM?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0" 
                title="Vss Shop Tutorial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

          </div>

          {/* Dòng text mô tả ngắn */}
          <p className="text-center text-[10px] text-white/20 uppercase tracking-widest leading-relaxed max-w-sm mx-auto">
            ⚡ Khuyến nghị: Xem video kết hợp với quy trình các bước bên trái để có trải nghiệm game mà nhất.
          </p>
        </div>

      </div>
    </section>
  );
}

export default GuideSection;