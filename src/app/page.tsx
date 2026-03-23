"use client";

import { useState } from 'react';
import PricingSection from '@/components/PricingSection';
import {
   Menu, X, ArrowRight, Monitor, Smartphone, Cpu, ShieldCheck, Instagram, Mail, Phone, ChevronDown, Linkedin, ExternalLink
} from 'lucide-react';

export default function Home() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const navItems = [
      { name: 'Tentang', id: 'about' },
      { name: 'Portofolio', id: 'portfolio' },
      { name: 'Harga', id: 'pricelist' },
      { name: 'Kontak', id: 'contact' }
   ];

   const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
         window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
      setIsMenuOpen(false);
   };

   return (
      <div className="relative flex flex-col min-h-screen bg-navy text-white selection:bg-accent-orange selection:text-white overflow-x-hidden">
         {/* NAVBAR - Floating Burger on Mobile, Full on Desktop */}
         <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl">
            <div className="md:bg-white md:shadow-2xl md:border md:border-navy/5 rounded-none px-6 md:px-10 h-14 md:h-16 flex items-center justify-between transition-all duration-500">
               {/* LOGO - Hidden on Mobile */}
               <div className="hidden md:flex items-center">
                  <div className="text-xl md:text-2xl font-black tracking-tight text-navy uppercase">
                     Nano<span className="text-primary-blue">artif</span>
                  </div>
               </div>

               <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  <div className="hidden md:flex items-center gap-8 text-navy/60 font-bold text-sm tracking-wide mr-6">
                     <div className="relative group/drop">
                        <button className="flex items-center gap-1 hover:text-navy transition-colors py-4 uppercase font-black tracking-widest text-[11px]">
                           Layanan <ChevronDown size={14} className="group-hover/drop:rotate-180 transition-transform duration-300" />
                        </button>

                        {/* 2 COLUMN 3 ROW DROPDOWN WITH PRICES */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 pointer-events-none group-hover/drop:opacity-100 group-hover/drop:scale-100 group-hover/drop:pointer-events-auto transition-all duration-300 w-[500px]">
                           <div className="bg-white border border-navy/5 shadow-[0_30px_100px_rgba(0,0,0,0.1)] p-6 grid grid-cols-2 gap-4">
                              {[
                                 { name: 'Web Landing Page', price: '2.5 JT', id: 'pricelist' },
                                 { name: 'Web Company Profile', price: '3.5 JT', id: 'pricelist' },
                                 { name: 'Web Travel & Tour', price: '4.5 JT', id: 'pricelist' },
                                 { name: 'Web Toko Online', price: '5.0 JT', id: 'pricelist' },
                                 { name: 'Aplikasi Mobile', price: '7.0 JT', id: 'pricelist' },
                                 { name: 'Sistem Kustom', price: '10.0 JT', id: 'pricelist' },
                              ].map((svc, idx) => (
                                 <button
                                    key={idx}
                                    onClick={() => scrollTo(svc.id)}
                                    className="flex flex-col items-start gap-1 p-4 hover:bg-navy/5 transition-all group/item text-left border border-transparent hover:border-navy/5"
                                 >
                                    <span className="text-navy font-black text-[12px] uppercase leading-tight group-hover/item:text-primary-blue">{svc.name}</span>
                                    <span className="text-[10px] font-bold text-accent-orange/60 tracking-[0.1em] uppercase">Mulai RP {svc.price}</span>
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>
                     {navItems.map((item) => (
                        <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-navy transition-colors uppercase font-black tracking-widest text-[11px]">{item.name}</button>
                     ))}
                  </div>

                  <a href="https://api.whatsapp.com/send?phone=6283841580448" className="hidden md:flex btn-primary py-2 px-8 rounded-none text-xs font-black tracking-widest shadow-xl">
                     Mulai
                  </a>

                  {/* MOBILE MENU TRIGGER - STANDALONE BOX ON MOBILE */}
                  <button
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                     className="md:hidden bg-white text-navy w-12 h-12 flex items-center justify-center shadow-2xl border border-navy/5 transition-all duration-300 active:scale-95"
                  >
                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`md:hidden fixed inset-x-0 top-[calc(100%+1rem)] transition-all duration-500 origin-top shadow-2xl ${isMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-10 pointer-events-none'
               }`}>
               <div className="bg-white border border-navy/5 p-8 flex flex-col gap-6 items-center shadow-2xl">
                  {navItems.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="text-navy/60 hover:text-navy text-xl font-black tracking-widest uppercase py-3 w-full border-b border-navy/5 last:border-0"
                     >
                        {item.name}
                     </button>
                  ))}
               </div>
            </div>
         </nav>

         {/* Stats & Title Section */}
         <section className="pt-56 md:pt-48 pb-16 md:pb-24 bg-navy text-center relative overflow-hidden transition-all duration-700">
            {/* HERO TOP DECORATION - CENTERED TRIANGLE (INSIDE SECTION) */}
            <div className="absolute top-0 left-0 w-full h-[25vh] md:h-[44vh] bg-accent-orange pointer-events-none z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>

            <div className="container-custom relative z-10">
               <div className="max-w-4xl mx-auto mb-16 text-center">
                  <h1 className="text-3xl md:text-7xl font-black tracking-tighter text-white leading-tight mb-8">
                     Jasa pembuatan Website, Sistem dan Aplikasi.
                  </h1>
                  <div className="flex justify-center gap-4">
                     <a href="https://api.whatsapp.com/send?phone=6283841580448" className="btn-primary py-3 px-8 md:px-12 rounded-none text-sm md:text-base font-black tracking-widest shadow-2xl">Konsultasi Gratis</a>
                     <button onClick={() => scrollTo('pricelist')} className="btn-outline py-3 px-8 md:px-12 rounded-none text-sm md:text-base font-black tracking-widest border-white/20 hover:bg-white hover:text-navy transition-all duration-300">Lihat Harga</button>
                  </div>
               </div>

            </div>
         </section>



         {/* Pricing Section */}
         <PricingSection />

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center py-16 border-t border-white/5">
            {[
               { val: '49+', label: 'Website & Sistem Selesai' },
               { val: '99%', label: 'Kepuasan Client' },
               { val: '24/7', label: 'Support Project' }
            ].map((stat, id) => (
               <div key={id}>
                  <div className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-1 leading-none">{stat.val}</div>
                  <div className="text-[12px] font-black text-accent-orange tracking-[0.2em] uppercase">{stat.label}</div>
               </div>
            ))}
         </div>


         {/* Portfolio Marquee Section */}
         <section id="portfolio" className="py-20 bg-white/5 border-t border-white/5 overflow-hidden">
            <div className="container-custom mb-16 text-center">
               <span className="text-primary-blue font-black text-[14px] tracking-[0.3em] mb-4 block ">Portofolio</span>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter  leading-none">Hasil Kerja Terkini</h2>
            </div>

            <div className="flex relative">
               <div className="flex animate-marquee whitespace-nowrap gap-6 py-4">
                  {[...Array(2)].map((_, listIdx) => (
                     <div key={listIdx} className="flex gap-6">
                        {[
                           { name: '', type: '', img: '/port1.png' },
                           { name: '', type: '', img: '/port2.png' },
                           { name: '', type: '', img: '/port3.png' },
                           { name: '', type: '', img: '/port4.png' },
                           { name: '', type: '', img: '/port5.png' },
                           { name: '', type: '', img: '/port6.png' },
                           { name: '', type: '', img: '/port7.png' },
                           { name: '', type: '', img: '/port8.png' }
                        ].map((p, i) => (
                           <div key={i} className="group relative w-[280px] md:w-[400px] aspect-[16/10] bg-white rounded-none overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105">
                              <img src={p.img} className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end h-1/2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                 <h3 className="text-xl font-black text-white tracking-tighter uppercase">{p.name}</h3>
                                 <p className="text-[12px] text-accent-orange font-black tracking-widest uppercase">{p.type}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Contact Section */}
         <section id="contact" className="py-20 md:py-32 border-t border-white/5 text-center">
            <div className="container-custom flex flex-col items-center">
               <div className="bg-white text-navy rounded-none px-6 py-16 md:p-24 text-center relative overflow-hidden border-none shadow-2xl flex flex-col items-center w-full">
                  <h2 className="text-2xl md:text-5xl font-black mb-8 tracking-tighter text-navy leading-tight">Mulailah <br /> <span className="text-primary-blue">bangun project Anda.</span></h2>
                  <a href="https://api.whatsapp.com/send?phone=6283841580448" className="btn-primary py-4 px-12 rounded-none text-base md:text-xl font-black tracking-widest shadow-2xl hover:bg-navy hover:text-white transition-all scale-100 hover:scale-105 duration-300">Hubungi WhatsApp</a>
               </div>
            </div>
         </section>

         {/* PREMIUM WHITE FOOTER */}
         <footer className="bg-white border-t border-navy/5 pt-24 pb-12 overflow-hidden relative shadow-[0_-30px_100px_rgba(0,0,0,0.02)]">
            {/* LARGE BACKGROUND BRAND TEXT ACCENT */}
            <div className="absolute -bottom-10 -right-20 text-[180px] font-black italic text-navy/[0.03] pointer-events-none uppercase select-none leading-none">
            </div>

            <div className="container-custom relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                  {/* BRAND COLUMN */}
                  <div className="md:col-span-2">
                     <div className="text-4xl font-black text-navy mb-8 tracking-tighter">Nano<span className="text-primary-blue">artif</span></div>
                     <p className="text-navy/60 text-sm md:text-base max-w-md leading-relaxed mb-10 text-justify font-bold">
                        Membangun ekosistem digital yang cerdas dan berkelanjutan. Kami fokus pada solusi otomasi, efisiensi, dan transformasi bisnis melalui teknologi terdepan.
                     </p>

                     <div className="flex gap-4">
                        <a href="https://www.instagram.com/alifian_ho/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:bg-white hover:border-primary-blue hover:shadow-xl transition-all duration-500"><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/in/pandu-alifian-nugroho-1b08713a2/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:bg-white hover:border-primary-blue hover:shadow-xl transition-all duration-500"><Linkedin size={20} /></a>
                        <a href="https://alifiangardenmain.vercel.app" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:bg-white hover:border-primary-blue hover:shadow-xl transition-all duration-500"><ExternalLink size={20} /></a>
                        <a href="mailto:hello@nanoartif.my.id" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:bg-white hover:border-primary-blue hover:shadow-xl transition-all duration-500"><Mail size={20} /></a>
                     </div>
                  </div>

                  {/* SERVICES COLUMN */}
                  <div>
                     <h4 className="text-1xl font-black text-accent-orange mb-8">Layanan Utama</h4>
                     <ul className="flex flex-col gap-4">
                        {['Web Landing Page', 'Web Company Profile', 'Web Toko Online', 'Aplikasi Mobile', 'Sistem Kustom'].map(l => (
                           <li key={l}><button onClick={() => scrollTo('pricelist')} className="text-navy/70 hover:text-primary-blue transition-colors text-sm font-bold">{l}</button></li>
                        ))}
                     </ul>
                  </div>

                  {/* QUICK LINKS COLUMN */}
                  <div>
                     <h4 className="text-1xl font-black text-accent-orange mb-8">Informasi</h4>
                     <ul className="flex flex-col gap-4">
                        {['Tentang Kami', 'Portofolio', 'Pilihan Harga', 'Hubungi Kami'].map(l => (
                           <li key={l}><button onClick={() => scrollTo('about')} className="text-navy/70 hover:text-primary-blue transition-colors text-sm font-bold">{l}</button></li>
                        ))}
                     </ul>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-navy/5 pt-12">
                  <div className="text-navy/20 text-[10px] font-bold tracking-[0.4em] uppercase">
                     © 2026 Nanoartif Digital Ecosystem. All Rights Reserved.
                  </div>
                  <div className="text-navy/30 text-[10px] font-medium tracking-[0.2em] uppercase">
                     Design & Code by <a href="https://alifiangardenmain.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary-blue font-black hover:underline px-2 py-1 bg-primary-blue/5">fian_ngraha</a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
