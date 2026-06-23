import React from 'react';
import { Play, Sparkles, ShieldCheck, Banknote, Zap, Infinity as InfinityIcon } from 'lucide-react';

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
      icon: <Banknote className="w-5 h-5 text-cyan-400" />, 
      title: "Giá Cực Tiết Kiệm",
      desc: "Thưởng thức trọn vẹn mọi siêu phẩm AAA chỉ với chi phí bằng một cốc cafe, rẻ hơn hàng chục lần key gốc."
    },
    {
      icon: <InfinityIcon className="w-5 h-5 text-cyan-400" />,
      title: "Sở Hữu Trọn Đời",
      desc: "Kích hoạt một lần duy nhất, hỗ trợ lưu trữ đám mây cục bộ an toàn, chơi game vĩnh viễn không giới hạn."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: "Bảo Hành Trọn Đời",
      desc: "An tâm tuyệt đối với chính sách bảo hành dài hạn. Đội ngũ kỹ thuật Nexus hỗ trợ tận tâm 24/7."
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      title: "Cấp Acc Tự Động",
      desc: "Hệ thống tự động cấp tài khoản lập tức ngay sau khi hoàn tất quét mã thanh toán, không độ trễ."
    }
  ];

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-[#05070a] shadow-[0_0_50px_rgba(6,182,212,0.1)] my-10 select-none transform-gpu">
      
      {/* 1. BACKGROUND VIDEO (Tối ưu hóa độ đè hòa trộn) */}
      <BoomerangVideoBg src="/gaming-bg.webm" className="absolute inset-0 w-full h-full opacity-35 pointer-events-none mix-blend-lighten" />
      
      {/* Lớp phủ Radial Gradient cân bằng của Apple giúp text nổi bật trên video */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#05070a_90%)] pointer-events-none" />

      {/* 2. QUẦNG SÁNG NEON TĨNH ĐỂ KHÔNG GÂY LAG TRÌNH DUYỆT */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center">
        
        {/* 3. TIÊU ĐỀ CHUẨN APPLE (Chữ đứng, thanh lịch, giãn dòng thoáng) */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Kỷ Nguyên Steam Offline
          </div>
          
          <h2 className="font-black uppercase tracking-wide text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.15] text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
            LÀM CHỦ THẾ GIỚI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GAME BOM TẤN AAA</span>
          </h2>
          <p className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl font-medium tracking-wide">
            Sở hữu ngay kho game bản quyền Steam khổng lồ. Giải pháp kinh tế hoàn hảo nhất để chinh phục mọi cốt truyện đỉnh cao.
          </p>
        </div>

        {/* 4. MÔ HÌNH BENTO GRID ĐẲNG CẤP (Viền mảnh, góc bo rộng) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="p-6 md:p-8 rounded-[1.8rem] bg-[#080d16]/90 border border-cyan-500/10 hover:border-cyan-500/40 hover:bg-[#0c1424] transition-all duration-300 group shadow-lg hover:shadow-[0_10px_25px_rgba(6,182,212,0.15)] hover:-translate-y-1.5 flex flex-col items-center text-center"
            >
              {/* Vòng bọc Icon tối giản */}
              <div className="w-12 h-12 rounded-xl bg-cyan-950/40 flex items-center justify-center mb-5 group-hover:bg-cyan-500 group-hover:text-black border border-cyan-500/20 group-hover:border-transparent transition-all duration-300">
                {b.icon}
              </div>
              <h3 className="text-white font-black uppercase tracking-wider text-xs md:text-sm mb-3 group-hover:text-cyan-400 transition-colors">
                {b.title}
              </h3>
              <p className="text-gray-400 text-[10px] md:text-xs font-semibold leading-relaxed group-hover:text-gray-300 transition-colors">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 5. HUD CONTROL PANEL BÊN DƯỚI */}
        <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 p-4 md:p-5 rounded-2xl bg-black/55 border border-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black uppercase text-white tracking-widest">Nexus Engine v2.0</span>
              <span className="text-[9px] text-gray-500">Hệ thống phân phối tự động sẵn sàng 24/7</span>
            </div>
          </div>

          <button className="flex items-center gap-2.5 group px-4 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-bold uppercase text-gray-400 group-hover:text-cyan-400 transition-colors">Xem Trailer</span>
              <span className="text-[8px] text-gray-500">Duration 1:35</span>
            </div>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500 text-cyan-400 group-hover:text-black transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}