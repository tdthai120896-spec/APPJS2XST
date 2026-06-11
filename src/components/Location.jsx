import React, { useState, useEffect } from 'react';
import { MessageSquare, MessageCircle, Phone, MapPin, Globe, Radar, ChevronRight } from 'lucide-react';

// Chuỗi Base64 ẩn thông tin liên hệ
const ENCODED_ZALO = 'aHR0cHM6Ly96YWxvLm1lLzAzNzkzMzI4NzA='; // https://zalo.me/0379332870
const ENCODED_MESSENGER = 'aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3Byb2ZpbGUucGhwP2lkPTYxNTU4MDY1MTMwNjMx'; // Link FB cá nhân
const ENCODED_CALL = 'dGVsOjAzNzkzMzI4NzA='; // tel:0379332870

// Component video nền tĩnh
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
    const [links, setLinks] = useState({ zalo: '#', messenger: '#', call: '#' });

    // Thực hiện giải mã động sau khi component đã được dựng trên trình duyệt
    useEffect(() => {
        try {
            setLinks({
                zalo: window.atob(ENCODED_ZALO),
                messenger: window.atob(ENCODED_MESSENGER),
                call: window.atob(ENCODED_CALL)
            });
        } catch (error) {
            console.error("Lỗi giải mã liên kết:", error);
        }
    }, []);

    return (
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden rounded-[2.5rem] border border-cyan-500/20 bg-[#05070a] shadow-lg my-10">

            {/* BACKGROUND TỐI ƯU */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#05070a_90%)] pointer-events-none z-0" />

            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* NỘI DUNG CHÍNH */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8">

                {/* Header Tiêu đề */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Radar className="w-4 h-4 text-cyan-300 animate-spin-slow" /> Mạng lưới giao tiếp
                    </div>
                    <h2 className="font-black uppercase italic text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider mb-4">
                        Thiết Lập Kết Nối
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
                        Mọi tín hiệu của bạn đều được Nexus phản hồi lập tức. Lựa chọn kênh liên lạc bảo mật bên dưới để bắt đầu truyền tải dữ liệu.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    {/* CỘT BÊN TRÁI: BẢNG KÊNH LIÊN LẠC */}
                    <div className="lg:col-span-5 flex flex-col gap-5">
                        
                        {/* ZALO CHANNEL */}
                        <a
                            href={links.zalo} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#0b101a]/80 backdrop-blur-sm border border-white/5 hover:border-cyan-500/50 hover:bg-[#0d1424] transition-colors duration-300"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="relative flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-black uppercase tracking-wider text-sm group-hover:text-cyan-400 transition-colors">Zalo</span>
                                    <span className="text-[10px] text-cyan-500/60 font-bold uppercase tracking-widest mt-0.5">Online • Phản hồi 1 phút</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                        </a>

                        {/* MESSENGER CHANNEL */}
                        <a
                            href={links.messenger}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#0b101a]/80 backdrop-blur-sm border border-white/5 hover:border-blue-500/50 hover:bg-[#0d1424] transition-colors duration-300"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="relative flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <MessageSquare className="w-5 h-5 fill-current" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-black uppercase tracking-wider text-sm group-hover:text-blue-400 transition-colors">Messenger</span>
                                    <span className="text-[10px] text-blue-400/60 font-bold uppercase tracking-widest mt-0.5">Online • Hỗ trợ 24/7</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                        </a>

                        {/* HOTLINE CHANNEL */}
                        <a
                            href={links.call} 
                            className="group relative flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[#0b101a]/80 backdrop-blur-sm border border-white/5 hover:border-emerald-400/50 hover:bg-[#0d1424] transition-colors duration-300"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="relative flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                    <Phone className="w-5 h-5 fill-current" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-black uppercase tracking-wider text-sm group-hover:text-emerald-400 transition-colors">Call</span>
                                    <span className="text-[10px] text-emerald-400/60 font-bold uppercase tracking-widest mt-0.5">Call now</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                        </a>

                        {/* BẢNG ĐỊA CHỈ TỌA ĐỘ */}
                        <div className="mt-2 p-5 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-4">
                            <div className="relative flex h-3 w-3 mt-1 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> Tọa độ Core
                                </span>
                                <span className="text-sm md:text-base text-cyan-100 font-medium leading-relaxed">
                                    1146 Quang Trung, Phường 8,<br />Quận Gò Vấp, TP. Hồ Chí Minh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CỘT BÊN PHẢI: BẢN ĐỒ */}
                    <div className="lg:col-span-7 relative w-full h-[350px] lg:h-auto rounded-[2rem] bg-[#0d0d16]/80 border border-white/5 p-2 group overflow-hidden flex flex-col">
                        
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-[2rem] z-20 pointer-events-none group-hover:border-cyan-400 transition-colors"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-[2rem] z-20 pointer-events-none group-hover:border-cyan-400 transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-[2rem] z-20 pointer-events-none group-hover:border-cyan-400 transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-[2rem] z-20 pointer-events-none group-hover:border-cyan-400 transition-colors"></div>

                        <div className="absolute top-4 left-6 z-20 bg-black/80 px-3 py-1 rounded-md border border-cyan-500/30 flex items-center gap-2">
                            <Globe className="w-3 h-3 text-cyan-400 animate-pulse" />
                            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.2em]">GPS Active</span>
                        </div>

                        {/* IFRAME BẢN ĐỒ */}
                        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-black">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.420664034874!2d106.6276513153343!3d10.855574760694157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b6a2b351a5%3A0x11690ada8c36f9bc!2s1146%20Quang%20Trung%2C%20Ph%Ccedil;%C6%B0%E1%BB%9Dng%208%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1689234567890!5m2!1sen!2s"
                                className="w-full h-full filter grayscale invert-[90%] hue-rotate-[180deg] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Nexus Steam Store Location"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}