import React from 'react';
import { MessageSquare, MessageCircle, Phone, MapPin, Sparkles } from 'lucide-react';

// Component video nền đồng bộ với AboutSection
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

export default function Location() {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-between py-16 overflow-hidden rounded-3xl border border-cyan-500/10 bg-[#06060c] shadow-[0_0_50px_rgba(6,182,212,0.05)] font-['Kanit']">

            {/* 1. LỚP NỀN VIDEO & OVERLAY ĐỒNG BỘ */}
            <BoomerangVideoBg
                src="/location-bg.mp4"
                className="absolute inset-0 w-full h-full opacity-20 mix-blend-screen pointer-events-none z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06060c]/90 via-transparent to-[#06060c] z-0" />

            {/* 2. QUẦNG SÁNG NEON DYNAMICS */}
            <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-4000 z-0" />
            <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-3000 z-0" />

            {/* 3. NỘI DUNG CHÍNH */}
            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8 my-auto">

                {/* Header Tiêu đề */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Trung Tâm Kết Nối
                    </div>
                    <h2 className="font-black uppercase text-[2.2rem] sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-300 to-purple-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.25)] tracking-tight">
                        Liên Hệ & Vị Trí
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                    {/* CỘT BÊN TRÁI: THÔNG TIN LIÊN HỆ */}
                    <div className="flex flex-col gap-6 bg-[#0d0d16]/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl shadow-black/80">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-cyan-400 mb-2">Hỗ Trợ Trực Tuyến</h3>
                            <p className="text-cyan-100/40 text-xs font-medium leading-relaxed">
                                Đội ngũ kỹ thuật viên Nexus Steam luôn túc trực để giải đáp và xử lý cấp tài khoản cho bạn nhanh nhất có thể.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* NÚT ZALO */}
                            <a
                                href="https://www.facebook.com/people/Andy-Tran/61558065130631/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl bg-[#0b0e14]/90 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                            >
                                <span className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg group-hover:text-cyan-200 transition-colors">
                                    Zalo
                                </span>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-transform duration-300 group-hover:scale-110">
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                </div>
                            </a>

                            {/* NÚT MESSENGER */}
                            <a
                                href="https://www.facebook.com/profile.php?id=61558065130631"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl bg-[#0b0e14]/90 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                            >
                                <span className="bg-purple-500/10 border border-purple-500/40 text-purple-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg group-hover:text-purple-200 transition-colors">
                                    Messenger
                                </span>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-transform duration-300 group-hover:scale-110">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                            </a>

                            {/* NÚT GỌI ĐIỆN */}
                            <a
                                href="https://www.facebook.com/people/Andy-Tran/61558065130631/"
                                className="flex items-center justify-between p-4 rounded-xl bg-[#0b0e14]/90 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                            >
                                <span className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg group-hover:text-emerald-200 transition-colors">
                                    Call
                                </span>
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform duration-300 group-hover:scale-110">
                                    <Phone className="w-5 h-5 fill-current" />
                                </div>
                            </a>
                        </div>

                        {/* Địa chỉ */}
                        <div className="flex items-start gap-4 pt-6 border-t border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-1">Địa chỉ Store</span>
                                <span className="text-sm text-cyan-100/70 font-medium leading-relaxed">
                                    1146 Quang Trung, Phường 8,<br />Quận Gò Vấp, TP. Hồ Chí Minh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CỘT BÊN PHẢI: BẢN ĐỒ */}
                    <div className="relative w-full aspect-square md:aspect-auto rounded-2xl p-1.5 bg-[#0d0d16]/60 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-black/80 group overflow-hidden">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 pointer-events-none z-10" />

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.665782782354!2d106.6401642758814!3d10.836881958074983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175298150426f4f%3A0xc3f3448f86f86b46!2zMTE0NiBRdWFuZyBUcnVuZywgUGjGsOG7nW5nIDgsIEfDsiBW4bqlcCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1715000000000!5m2!1svi!2s"
                            className="w-full h-full rounded-xl filter grayscale invert-[90%] hue-rotate-[180deg] opacity-60 group-hover:opacity-100 group-hover:filter-none transition-all duration-700"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Nexus Steam Store Location"
                        />
                    </div>

                </div>
            </div>

            {/* 4. FOOTER LOGO */}
            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8 mt-12 mb-4">
                <div className="flex items-center gap-2 text-cyan-400/50">
                    <Sparkles className="w-4 h-4 text-purple-500/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Nexus Connect Center</span>
                </div>
            </div>
        </section>
    );
}