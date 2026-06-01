import { useEffect, useRef, useState } from 'react';
import { Play, Sparkles, ShieldCheck, Banknote, Zap, Infinity as InfinityIcon } from 'lucide-react';

// Đường dẫn chuẩn trỏ trực tiếp vào file video trong thư mục frontend/public/
const BG_VIDEO = '/gaming-bg.mp4';

// Component xử lý video nền tĩnh siêu mượt, tối ưu hóa phần cứng và bypass lỗi CORS
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
      icon: <Banknote className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />, 
      title: "Giá Siêu Hạt Dẻ",
      desc: "Trải nghiệm trọn vẹn bom tấn AAA với mức chi phí rẻ hơn hàng chục lần so với mua key trực tiếp trên Store."
    },
    {
      icon: <InfinityIcon className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />,
      title: "Chơi Trọn Đời",
      desc: "Kích hoạt chuẩn một lần duy nhất, bạn được lưu trữ dữ liệu game và trải nghiệm vĩnh viễn không giới hạn."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />,
      title: "Tiết Kiệm Tối Đa",
      desc: "Không phải tốn quá nhiều tiền mua sắm game lãng phí, giải pháp kinh tế tuyệt đối cho game thủ đam mê cốt truyện."
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />,
      title: "Cấp Account Lập Tức",
      desc: "Nhận thông tin tài khoản hoàn toàn tự động ngay sau khi hoàn tất quá trình quét mã thanh toán VietQR."
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between py-16 overflow-hidden rounded-3xl border border-cyan-500/10 bg-[#06060c] shadow-[0_0_50px_rgba(6,182,212,0.05)]">
      {/* Lớp nền video kết hợp mã màu Tím Cyberpunk, giảm opacity để không bị rối chữ */}
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full opacity-20 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060c]/90 via-transparent to-[#06060c]" />

      {/* Lớp Quầng Sáng Hệ Màu Mới: Xanh Neon & Tím Neon phát sáng ma mị */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-4000" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-3000" />

      {/* Top/Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Kỷ Nguyên Steam Offline
        </div>
        
        <h1
          className="font-black uppercase text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] max-w-5xl leading-[1.05] tracking-normal bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-300 to-purple-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.25)]"
        >
          Làm chủ thế giới game bom tấn{" "}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 pr-2">
            tiết kiệm và <br className="hidden sm:block" /> nhận account tức thì
          </span>
        </h1>
        
        <p className="mt-6 text-cyan-100/50 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium tracking-wide">
          Sở hữu ngay kho game bản quyền Steam khổng lồ. Giải pháp tối ưu giúp bạn chiến mượt mọi siêu phẩm <span className="text-white font-bold">AAA cốt truyện</span> mà không lo về giá.
        </p>
      </div>

      {/* Center Layout: Grid 4 lợi ích lõi style Neon Glow */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-8 my-auto">
        {benefits.map((b, i) => (
          <div 
            key={i} 
            className="p-6 rounded-2xl bg-[#0d0d16]/60 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 hover:bg-[#111122]/80 transition-all duration-300 group shadow-2xl shadow-black/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all border border-cyan-500/20 group-hover:border-transparent">
              {b.icon}
            </div>
            <h3 className="text-white font-black uppercase tracking-tight text-base mb-2 group-hover:text-cyan-400 transition-colors">{b.title}</h3>
            <p className="text-cyan-200/40 text-xs font-medium leading-relaxed group-hover:text-cyan-100/70 transition-colors">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Layout Elements */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4 sm:px-8 mt-12">
        {/* Left Side Info */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2 text-cyan-400 mb-1.5 shadow-[0_0_10px_rgba(6,182,212,0.1)] w-max rounded-md">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-black uppercase tracking-wider">Nexus FlowEngine™</span>
          </div>
          <p className="text-cyan-200/30 text-[11px] leading-relaxed">
            Hệ thống cấp phát tài khoản tự động, đồng bộ dữ liệu đám mây cục bộ an toàn, nhanh chóng ngay sau khi giao dịch.
          </p>
        </div>

        {/* Right Side Control */}
        <div className="flex items-center gap-2 text-white/60 text-xs self-end md:self-auto group cursor-pointer">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-950/40 group-hover:bg-cyan-500 text-cyan-400 group-hover:text-black transition-all border border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </button>
          <div className="flex flex-col">
            <span className="font-bold uppercase tracking-wider text-white/80 group-hover:text-cyan-400 transition-colors">Trailer Store</span>
            <span className="text-purple-400/50 text-[10px]">Duration 1:35</span>
          </div>
        </div>
      </div>
    </section>
  );
}