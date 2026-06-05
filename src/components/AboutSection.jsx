import { useEffect, useRef, useState } from 'react';
import { Play, Sparkles, ShieldCheck, Banknote, Zap, Infinity as InfinityIcon } from 'lucide-react';

// Đường dẫn chuẩn trỏ trực tiếp vào file video trong thư mục frontend/public/
const BG_VIDEO = '/gaming-bg.mp4';

// Component xử lý video nền tĩnh siêu mượt, tối ưu hóa phần cứng
function BoomerangVideoBg({ src, className }) {
  return (
    <div className={className ?? 'absolute inset-0 w-full h-full'}>
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

export default function AboutSection() {
  const benefits = [
    {
      icon: <Banknote className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />, 
      title: "Giá Siêu Hạt Dẻ",
      desc: "Trải nghiệm trọn vẹn siêu phẩm AAA với chi phí chỉ bằng cốc cafe, rẻ hơn hàng chục lần so với mua key gốc."
    },
    {
      icon: <InfinityIcon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />,
      title: "Chơi Trọn Đời",
      desc: "Kích hoạt chuẩn một lần duy nhất, dữ liệu lưu trữ đám mây cục bộ an toàn, chơi vĩnh viễn không giới hạn."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />,
      title: "Bảo Hành Tận Tâm",
      desc: "An tâm tuyệt đối với chính sách bảo hành dài hạn. Đội ngũ Nexus luôn sẵn sàng hỗ trợ bạn 24/7."
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />,
      title: "Nhận Account Tức Thì",
      desc: "Hệ thống cấp tài khoản tự động lập tức ngay sau khi hoàn tất quét mã thanh toán. Không cần chờ đợi!"
    }
  ];

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden rounded-[2.5rem] border border-cyan-500/20 bg-[#05070a] shadow-[0_0_50px_rgba(6,182,212,0.15)] my-10">
      
      {/* 🌟 1. BACKGROUND VIDEO ĐÃ ĐƯỢC LÀM NỔI BẬT */}
      {/* Tăng opacity lên 40-50% để video hiện rõ hơn */}
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none mix-blend-lighten" />
      
      {/* Dùng Radial Gradient: Sáng rõ ở giữa (để lộ video), tối dần về 4 góc (để nổi bật chữ) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#05070a_85%)] pointer-events-none" />

      {/* 🌟 2. QUẦNG SÁNG NEON CYBERPUNK CHỚP TẮT */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none animate-pulse duration-3000" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        
        {/* 🌟 3. TIÊU ĐỀ (Đồng bộ font-black, italic và gradient như Hero) */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" /> Kỷ Nguyên Steam Offline
          </div>
          
          <h2 className="font-black uppercase italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl leading-[1.1] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            Làm chủ thế giới <br className="hidden md:block" /> Game Bom Tấn
          </h2>
          <p className="mt-6 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium tracking-wide">
            Sở hữu ngay kho game bản quyền Steam khổng lồ. Giải pháp kinh tế hoàn hảo giúp bạn chiến mượt mọi siêu phẩm <span className="text-cyan-400 font-bold uppercase tracking-widest">AAA Cốt truyện</span>.
          </p>
        </div>

        {/* 🌟 4. GRID LỢI ÍCH (Cân đối 4 cột, viền sáng Neon) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="p-6 md:p-8 rounded-3xl bg-[#0b101a]/80 backdrop-blur-xl border border-white/5 hover:border-cyan-400/50 hover:bg-[#0b101a]/95 transition-all duration-500 group shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/50 flex items-center justify-center mb-5 group-hover:bg-cyan-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 border border-cyan-500/20 group-hover:border-transparent">
                {b.icon}
              </div>
              <h3 className="text-white font-black uppercase italic tracking-wider text-sm md:text-base mb-3 group-hover:text-cyan-400 transition-colors">
                {b.title}
              </h3>
              <p className="text-gray-400 text-[11px] md:text-xs font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 🌟 5. THANH THÔNG TIN BÊN DƯỚI (Phong cách bảng điều khiển HUD) */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 p-4 md:p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
          {/* Hệ thống thông báo */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black uppercase text-white tracking-widest">Nexus FlowEngine™</span>
              <span className="text-[10px] text-gray-400">Hệ thống cấp phát tài khoản tự động đang hoạt động</span>
            </div>
          </div>

          {/* Nút xem Video Trailer */}
          <button className="flex items-center gap-3 group px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-cyan-400 transition-colors">Xem Trailer</span>
              <span className="text-[9px] text-gray-500">Duration 1:35</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-400 group-hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}