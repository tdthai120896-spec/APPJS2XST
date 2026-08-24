import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, MessageSquare, MessageCircle, Phone, ShoppingCart, Loader2, Play, BookOpen, Info, Gift } from 'lucide-react';

const ENCODED_ZALO = 'aHR0cHM6Ly96YWxvLm1lLzAzNzkzMzI4NzA=';
const ENCODED_MESSENGER = 'aHR0cHM6Ly9tLm1lLzYxNTU4MDY1MTMwNjMx';
const ENCODED_CALL = 'dGVsOjAzNzkzMzI4NzA=';

const getOptimizedModalImage = (url, width = 800) => {
    if (!url) return '';
    if (url.startsWith('/') || url.startsWith('data:')) return url;
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=80`;
};

function GameDetailModal({ game, onClose, onBuyNow }) {
    const [links, setLinks] = useState({ zalo: '#', messenger: '#', call: '#' });
    const [steamAppId, setSteamAppId] = useState(null);
    const [loadingSteam, setLoadingSteam] = useState(true);
    const [activeTab, setActiveTab] = useState('info'); 
    const [mainImage, setMainImage] = useState(game.poster);

    const fetchSteamAppId = async (title) => {
        try {
            const searchUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(title)}&l=english&cc=US`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(searchUrl)}`;
            const response = await fetch(proxyUrl);
            const rawData = await response.json();
            const data = JSON.parse(rawData.contents);
            if (data?.items?.length > 0) return data.items[0].id;
        } catch (error) { console.error(error); }
        return null;
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        setMainImage(game.poster);
        const initModal = async () => {
            setLoadingSteam(true);
            const id = await fetchSteamAppId(game.title);
            if (id) setSteamAppId(id);
            setLoadingSteam(false);
            try {
                setLinks({
                    zalo: window.atob(ENCODED_ZALO),
                    messenger: window.atob(ENCODED_MESSENGER),
                    call: window.atob(ENCODED_CALL)
                });
            } catch (e) {}
        };
        initModal();
        return () => { document.body.style.overflow = 'unset'; };
    }, [game]);

    const steamAssets = steamAppId ? {
        background: `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/page_bg_generated_v6b.jpg`,
        screenshots: [
            `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/ss_1.1920x1080.jpg`,
            `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/ss_2.1920x1080.jpg`,
            `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/ss_3.1920x1080.jpg`,
        ]
    } : null;

    const policies = [
        'Đăng nhập tài khoản & chơi Offline.',
        'Sử dụng vĩnh viễn, bảo hành trọn đời.',
        'Truy cập đầy đủ Workshop & Mods.',
        'Hỗ trợ Cloud Gaming (Geforce Now...).'
    ];

    if (!game) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[999999] animate-in fade-in duration-300">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 bg-[#05070a] text-white shadow-2xl flex flex-col transform-gpu">
                
                {/* HEADER CỐ ĐỊNH */}
                <div className="relative z-20 flex justify-between items-center p-4 md:p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
                    <div className="text-left">
                        <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter italic text-cyan-400">
                            {game.title}
                        </h2>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                           🔥 {game.price} • {game.genre}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-rose-500 transition-all shadow-lg text-white"><X className="w-5 h-5" /></button>
                </div>

                {/* CONTENT AREA */}
                <div className="relative z-10 flex-grow overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
                    
                    {/* CỘT TRÁI: ẢNH & SCREENSHOTS */}
                    <div className="w-full md:w-[45%] p-4 md:p-6 bg-black/20 flex flex-col gap-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                            <img src={getOptimizedModalImage(mainImage)} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        {steamAssets && (
                            <div className="grid grid-cols-4 gap-2">
                                {[game.poster, ...steamAssets.screenshots].map((img, i) => (
                                    <button key={i} onClick={() => setMainImage(img)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-cyan-400 scale-95' : 'border-transparent opacity-40'}`}>
                                        <img src={getOptimizedModalImage(img, 200)} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CỘT PHẢI: TABS NỘI DUNG */}
                    <div className="w-full md:w-[55%] p-4 md:p-6 flex flex-col min-h-[380px]">
                        {/* Tab Switcher */}
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-5 border border-white/5">
                            <button onClick={() => setActiveTab('info')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'info' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}>
                                <Info className="w-3.5 h-3.5" /> Thông tin
                            </button>
                            <button onClick={() => setActiveTab('guide')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'guide' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}>
                                <Play className="w-3.5 h-3.5" /> Video & HD
                            </button>
                        </div>

                        {/* TAB THÔNG TIN */}
                        {activeTab === 'info' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                
                                {/* 🌟 QUÀ TẶNG CHỚP NHÁY - ĐÃ ĐẨY LÊN CAO NHẤT */}
                                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-pulse">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="h-5 w-5 bg-amber-500 rounded-md flex items-center justify-center">
                                            <Gift className="w-3.5 h-3.5 text-black font-black" />
                                        </div>
                                        <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Ưu đãi kèm theo</h4>
                                    </div>
                                    <p className="text-[12px] text-white font-black leading-tight italic">
                                        TẶNG KÈM NGẪU NHIÊN <span className="text-amber-400 underline decoration-amber-500/50">LÊN ĐẾN 100 GAMES</span> BẢN QUYỀN KHÁC!
                                    </p>
                                </div>

                                {/* LIST QUY ĐỊNH */}
                                <div className="space-y-2.5">
                                    <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Quy định dịch vụ</h4>
                                    {policies.map((p, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span className="text-[11px] font-bold text-gray-300 leading-tight">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB HƯỚNG DẪN */}
                        {activeTab === 'guide' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-inner">
                                    <iframe 
                                        key="guide-video"
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/CcB3vbLEAOM?si=eB8GmzNhn4gxKz20" 
                                        title="HD Steam Offline"
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    />
                                </div>
                                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2 text-left">
                                    <h4 className="text-[10px] font-black text-cyan-400 uppercase flex items-center gap-2 italic"><BookOpen className="w-3.5 h-3.5" /> 3 Bước kích hoạt</h4>
                                    <p className="text-[11px] text-gray-300 font-bold leading-relaxed">
                                        1. Đăng nhập tài khoản Nexus <br/>
                                        2. Tải game về máy <br/>
                                        3. Chọn "Go Offline" và chơi vĩnh viễn.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 🌟 FOOTER: 3 NÚT LIÊN HỆ SIÊU NỔI BẬT */}
                <div className="relative z-20 p-4 md:p-6 bg-black/60 backdrop-blur-2xl border-t border-white/10 flex flex-col gap-4">
                    <button onClick={() => { onClose(); onBuyNow(); }} className="w-full py-3.5 md:py-4 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                        <ShoppingCart className="w-5 h-5 stroke-[3]" /> Nhận tài khoản ngay
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default GameDetailModal;