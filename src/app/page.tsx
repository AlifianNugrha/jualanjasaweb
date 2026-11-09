"use client";

import { useState, useEffect, useRef } from 'react';
import PricingSection from '@/components/PricingSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
   Menu, X, Instagram, Mail, Linkedin, ExternalLink, ChevronDown, ShieldCheck, Zap, Smartphone, Sparkles
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
// ANIMATED HERO — word-by-word reveal (looping) + rotating word + bouncing buttons
// ─────────────────────────────────────────────────────────
const LINE1_WORDS = [
  { text: 'Jasa', color: 'text-white' },
  { text: 'Pembuatan', color: 'text-white' },
  { text: 'Website,', color: 'text-white' },
];

const LINE2_WORDS = [
  { text: 'Sistem', color: 'text-primary-blue' },
  { text: '&', color: 'text-white' },
  { text: 'Aplikasi.', color: 'text-accent-orange' },
];

const ROTATING_WORDS = ['Cepat.', 'Murah.', 'Berkualitas.', 'Terpercaya.', 'On-Time.'];

function AnimatedHero({ onScrollPricelist }: { onScrollPricelist: () => void }) {
  const line1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef    = useRef<HTMLDivElement>(null);

  const [display, setDisplay] = useState(ROTATING_WORDS[0]);
  const [phase, setPhase]     = useState<'in' | 'hold' | 'out'>('hold');

  // ── Word-by-word slide-up reveal, looping forever ──
  useEffect(() => {
    const l1 = line1Refs.current.filter(Boolean) as HTMLSpanElement[];
    const l2 = line2Refs.current.filter(Boolean) as HTMLSpanElement[];
    const all = [...l1, ...l2];
    if (!all.length) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0 });
    tl.set(all, { opacity: 0, y: 36, filter: 'blur(6px)' });
    tl.to(all, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.55,
      stagger: 0.12,
      ease: 'power3.out',
    });
    tl.to(all, {
      opacity: 0,
      y: -20,
      filter: 'blur(5px)',
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.in',
      delay: 3.2,
    });

    return () => { tl.kill(); };
  }, []);

  // ── Rotating word cycle ──
  useEffect(() => {
    const HOLD = 1800;
    const TRANS = 280;
    let t: ReturnType<typeof setTimeout>;
    let idx = 0;

    const cycle = () => {
      setPhase('out');
      t = setTimeout(() => {
        idx = (idx + 1) % ROTATING_WORDS.length;
        setDisplay(ROTATING_WORDS[idx]);
        setPhase('in');
        t = setTimeout(() => {
          setPhase('hold');
          t = setTimeout(cycle, HOLD);
        }, TRANS);
      }, TRANS);
    };

    setPhase('hold');
    t = setTimeout(cycle, HOLD);
    return () => clearTimeout(t);
  }, []);

  // ── CTA entrance: bounce in on mount ──
  useEffect(() => {
    if (!ctaRef.current) return;
    const btns = Array.from(ctaRef.current.children);
    gsap.fromTo(
      btns,
      { opacity: 0, y: 36, scale: 0.88 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75,
        stagger: 0.18,
        ease: 'back.out(1.6)',
        delay: 0.5,
      }
    );
  }, []);

  const rotStyle: React.CSSProperties = {
    display: 'inline-block',
    transition: 'opacity 0.28s ease, transform 0.28s ease',
    opacity:   phase === 'hold' ? 1 : 0,
    transform: phase === 'out'  ? 'translateY(-10px)' : 'translateY(0)',
  };

  return (
    <div className="max-w-5xl mx-auto text-center px-4 pt-12 md:pt-20">

      {/* ── Main Headline: 2 lines with matching font-black tracking-tighter style ── */}
      <h1
        className="leading-tight mb-6"
        aria-label="Jasa Pembuatan Website, Sistem & Aplikasi."
      >
        {/* Line 1: Jasa Pembuatan Website (besar & gagah di mobile) */}
        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-2 md:mb-4 leading-tight">
          {LINE1_WORDS.map((w, i) => (
            <span
              key={`l1-${i}`}
              ref={el => { line1Refs.current[i] = el; }}
              className={`inline-block mr-1.5 sm:mr-2 md:mr-4 ${w.color}`}
              style={{ willChange: 'opacity, transform, filter' }}
            >
              {w.text}
            </span>
          ))}
        </span>

        {/* Line 2: Sistem & Aplikasi (besar & dominan di mobile) */}
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
          {LINE2_WORDS.map((w, i) => (
            <span
              key={`l2-${i}`}
              ref={el => { line2Refs.current[i] = el; }}
              className={`inline-block mr-1.5 sm:mr-2 md:mr-4 ${w.color}`}
              style={{ willChange: 'opacity, transform, filter' }}
            >
              {w.text}
            </span>
          ))}
        </span>
      </h1>

      {/* ── Rotating sub-word ── */}
      <p className="text-lg md:text-2xl font-black tracking-wide mb-10 h-9">
        <span className="text-white/30 mr-2">Selalu</span>
        <span className="text-primary-blue" style={rotStyle}>
          {display}
        </span>
      </p>

      {/* ── CTA Buttons (bounced in by GSAP, then CSS looping bounce) ── */}
      <div
        ref={ctaRef}
        className="flex flex-wrap justify-center gap-4"
        style={{ opacity: 0 }} /* GSAP will reveal */
      >
        <a
          href={`https://wa.me/6285188136376?text=${encodeURIComponent(
            'Halo Alifian, saya ingin berkonsultasi gratis mengenai project saya. Bisa bantu?'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-3 px-8 md:px-12 rounded-none text-sm md:text-base font-black tracking-widest shadow-2xl animate-hero-bounce"
        >
          Konsultasi Gratis
        </a>
        <button
          onClick={onScrollPricelist}
          className="btn-outline py-3 px-8 md:px-12 rounded-none text-sm md:text-base font-black tracking-widest border-white/20 hover:bg-white hover:text-navy transition-all duration-300 animate-hero-bounce [animation-delay:0.4s]"
        >
          Lihat Harga
        </button>
      </div>

      {/* Scroll hint button (posisi lebih ke bawah dengan margin besar) */}
      <button
        onClick={onScrollPricelist}
        className="mt-24 md:mt-32 flex flex-col items-center gap-2 group cursor-pointer mx-auto"
        aria-label="Scroll ke produk"
      >
        <span className="text-[11px] md:text-xs font-black tracking-[0.3em] text-white/40 uppercase group-hover:text-white transition-colors duration-300">
          Jelajahi Produk &amp; Jasa Kami
        </span>
        <ChevronDown
          size={24}
          className="text-accent-orange animate-bounce group-hover:text-white transition-colors duration-300"
        />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────
export default function Home() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.fade-section').forEach((section: any) => {
         gsap.fromTo(section,
            { opacity: 0, y: 30 },
            {
               opacity: 1,
               y: 0,
               duration: 0.8,
               ease: 'power2.out',
               scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
               }
            }
         );
      });
   }, []);

   const navItems = [
      { name: 'Tentang',    id: 'about' },
      { name: 'Portofolio', id: 'portfolio' },
      { name: 'Harga',      id: 'pricelist' },
      { name: 'Kontak',     id: 'contact' },
   ];

   const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      setIsMenuOpen(false);
   };

   return (
      <div className="relative flex flex-col min-h-screen bg-navy text-white selection:bg-accent-orange selection:text-white">

         {/* ── NAVBAR ── */}
         <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl">
            <div className="md:bg-white md:shadow-2xl md:border md:border-navy/5 rounded-none px-6 md:px-10 h-14 md:h-16 flex items-center justify-between transition-all duration-500">
               <div className="hidden md:flex items-center">
                  <div className="text-xl md:text-2xl font-black tracking-tight text-navy uppercase">
                     Nano<span className="text-primary-blue">artif</span>
                  </div>
               </div>

               <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  <div className="hidden md:flex items-center gap-8 text-navy/60 font-bold text-sm tracking-wide mr-6">
                     {navItems.map((item) => (
                        <button
                           key={item.id}
                           onClick={() => scrollTo(item.id)}
                           className="hover:text-navy transition-colors uppercase font-black tracking-widest text-[11px]"
                        >
                           {item.name}
                        </button>
                     ))}
                  </div>
                  <a
                     href={`https://wa.me/6285188136376?text=${encodeURIComponent('Halo Alifian, saya ingin berkonsultasi mengenai layanan di Nanoartif. Bisa bantu saya?')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hidden md:flex btn-primary py-2 px-8 rounded-none text-xs font-black tracking-widest shadow-xl"
                  >
                     Mulai
                  </a>
                  <button
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                     className="md:hidden bg-white text-navy w-12 h-12 flex items-center justify-center shadow-2xl border border-navy/5 transition-all duration-300 active:scale-95"
                  >
                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden fixed inset-x-0 top-[calc(100%+1rem)] transition-all duration-500 origin-top shadow-2xl ${
               isMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-10 pointer-events-none'
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

         {/* ── HERO ── */}
         <section className="fade-section min-h-screen flex items-center justify-center bg-navy text-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img src="/wallpaper.jpg" className="w-full h-full object-cover opacity-40" alt="Background" />
               <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-navy" />
            </div>
            <div className="absolute top-0 left-0 w-full h-[15vh] bg-accent-orange pointer-events-none z-0 md:hidden"
               style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />

            <div className="container-custom relative z-10 w-full">
               <AnimatedHero onScrollPricelist={() => scrollTo('pricelist')} />
            </div>
         </section>

         {/* ── ABOUT / TENTANG KAMI ── */}
         <section id="about" className="fade-section py-24 md:py-32 bg-navy border-t border-white/5 relative overflow-hidden">
            <div className="container-custom relative z-10">
               {/* Header */}
               <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
                  <span className="text-primary-blue font-black text-xs md:text-sm tracking-[0.3em] uppercase block mb-3 font-plus-jakarta">
                     Tentang Nanoartif
                  </span>
                  <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
                     Solusi Digital Cepat, Rapi &amp; Bergaransi.
                  </h2>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-bold">
                     Kami fokus membangun website, sistem, dan aplikasi modern yang bukan sekadar indah, tetapi dirancang strategis untuk mendongkrak kredibilitas bisnis, efisiensi kerja, dan konversi penjualan Anda.
                  </p>
               </div>

               {/* Keunggulan 4 Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                  {[
                     {
                        icon: <Zap className="text-accent-orange" size={28} />,
                        title: 'Proses Cepat & Tepat Waktu',
                        desc: 'Timeline pengerjaan transparan sejak hari pertama. Website Anda live sesuai jadwal yang disepakati tanpa drama.',
                     },
                     {
                        icon: <Smartphone className="text-primary-blue" size={28} />,
                        title: '100% Responsif & Modern',
                        desc: 'Tampilan rapi dan adaptif sempurna di layar smartphone, tablet, laptop hingga layar monitor besar.',
                     },
                     {
                        icon: <Sparkles className="text-yellow-400" size={28} />,
                        title: 'Teknologi Canggih & SEO',
                        desc: 'Dibangun dengan teknologi Next.js terkini. Loading secepat kilat dan struktur ramah mesin pencari Google.',
                     },
                     {
                        icon: <ShieldCheck className="text-emerald-400" size={28} />,
                        title: 'Garansi Bebas Bug & Support',
                        desc: 'Dilengkapi garansi maintenance dan video panduan kelola website agar Anda bisa menggunakannya dengan tenang.',
                     },
                  ].map((card, i) => (
                     <div
                        key={i}
                        className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 hover:border-primary-blue/30 transition-all duration-300 group"
                     >
                        <div>
                           <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              {card.icon}
                           </div>
                           <h3 className="text-lg md:text-xl font-black text-white tracking-tight mb-3">
                              {card.title}
                           </h3>
                           <p className="text-white/50 text-xs md:text-sm font-semibold leading-relaxed">
                              {card.desc}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Workflow Steps */}
               <div className="border border-white/10 bg-white/[0.02] p-8 md:p-12">
                  <div className="text-center mb-10">
                     <span className="text-[11px] font-black tracking-[0.3em] text-accent-orange uppercase block mb-2">
                        Alur Kerja Kami
                     </span>
                     <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
                        4 Langkah Mudah Mewujudkan Project Anda
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                     {[
                        { step: '01', title: 'Konsultasi Gratis', desc: 'Diskusi kebutuhan, fitur, referensi, dan pemilihan paket yang pas.' },
                        { step: '02', title: 'Perencanaan & Desain', desc: 'Penyusunan arsitektur halaman dan konsep desain yang disetujui.' },
                        { step: '03', title: 'Coding & Pengujian', desc: 'Pembuatan kode bersih, integrasi fitur, dan uji performa di berbagai device.' },
                        { step: '04', title: 'Live & Serah Terima', desc: 'Website online dengan domain & hosting aktif serta panduan lengkap.' },
                     ].map((item, idx) => (
                        <div key={idx} className="relative flex flex-col">
                           <span className="text-4xl md:text-5xl font-black text-white/10 mb-3 tracking-tighter">
                              {item.step}
                           </span>
                           <h4 className="text-base md:text-lg font-black text-white mb-2 tracking-tight">
                              {item.title}
                           </h4>
                           <p className="text-white/50 text-xs md:text-sm font-semibold leading-relaxed">
                              {item.desc}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── PRICING ── */}
         <div className="fade-section">
            <PricingSection />
         </div>

         {/* ── STATS ── */}
         <section className="fade-section relative py-20 overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 z-0">
               <img src="/wallpaper2.jpg" className="w-full h-full object-cover opacity-20" alt="Stats BG" />
               <div className="absolute inset-0 bg-navy/80" />
               <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy to-transparent" />
               <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
            </div>
            <div className="container-custom relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  {[
                     { val: '49+', label: 'Website & Sistem Selesai' },
                     { val: '99%', label: 'Kepuasan Client' },
                     { val: '24/7', label: 'Support Project' },
                  ].map((stat, id) => (
                     <div key={id}>
                        <div className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-1 leading-none">{stat.val}</div>
                        <div className="text-[12px] font-black text-accent-orange tracking-[0.2em] uppercase">{stat.label}</div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── PORTFOLIO ── */}
         <section id="portfolio" className="fade-section py-20 bg-navy border-t border-white/5 overflow-hidden">
            <div className="container-custom mb-16 text-center">
               <span className="text-primary-blue font-black text-[14px] tracking-[0.3em] mb-4 block">Portofolio</span>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">Hasil Kerja Terkini</h2>
            </div>
            <div className="flex relative">
               <div className="flex animate-marquee whitespace-nowrap gap-6 py-4">
                  {[...Array(2)].map((_, listIdx) => (
                     <div key={listIdx} className="flex gap-6">
                        {[
                           '/port1.png','/port2.png','/port3.png','/port4.png','/port5.png',
                           '/port6.png','/port7.png','/port8.png','/port9.png','/port10.png',
                        ].map((img, i) => (
                           <div key={i} className="group relative w-[280px] md:w-[400px] aspect-[16/10] bg-white rounded-none overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105">
                              <img src={img} className="w-full h-full object-cover transition-all duration-700" alt="" />
                           </div>
                        ))}
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── CONTACT ── */}
         <section id="contact" className="fade-section relative py-20 md:py-32 border-t border-white/5 text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img src="/wallpaper3.jpg" className="w-full h-full object-cover" alt="Contact BG" />
               <div className="absolute inset-0 bg-white/70" />
               <div className="absolute inset-x-0 top-0 h-30 bg-gradient-to-b from-navy to-transparent" />
               <div className="absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="container-custom relative z-10 flex flex-col items-center">
               <div className="bg-white text-navy rounded-none px-6 py-16 md:p-24 text-center relative overflow-hidden shadow-2xl flex flex-col items-center w-full">
                  <h2 className="text-2xl md:text-5xl font-black mb-8 tracking-tighter text-navy leading-tight">
                     Mulailah <br />
                     <span className="text-primary-blue">bangun project Anda.</span>
                  </h2>
                  <a
                     href={`https://wa.me/6285188136376?text=${encodeURIComponent('Halo Alifian, saya siap untuk membangun project saya. Mari berdiskusi!')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="btn-primary py-4 px-12 rounded-none text-base md:text-xl font-black tracking-widest shadow-2xl hover:bg-navy hover:text-white transition-all scale-100 hover:scale-105 duration-300"
                  >
                     Hubungi WhatsApp
                  </a>
               </div>
            </div>
         </section>

         {/* ── FOOTER ── */}
         <footer className="fade-section bg-white border-t border-navy/5 pt-24 pb-12 overflow-hidden relative">
            <div className="container-custom relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                  <div className="md:col-span-2">
                     <div className="text-4xl font-black text-navy mb-8 tracking-tighter">Nano<span className="text-primary-blue">artif</span></div>
                     <p className="text-navy/60 text-sm md:text-base max-w-md leading-relaxed mb-10 text-justify font-bold">
                        Membangun ekosistem digital yang cerdas dan berkelanjutan. Kami fokus pada solusi otomasi, efisiensi, dan transformasi bisnis melalui teknologi terdepan.
                     </p>
                     <div className="flex gap-4">
                        <a href="https://www.instagram.com/nanoartif/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:border-primary-blue hover:shadow-xl transition-all duration-500"><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/in/pandu-alifian-nugroho-1b08713a2/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:border-primary-blue hover:shadow-xl transition-all duration-500"><Linkedin size={20} /></a>
                        <a href="https://nanoartif.my.id" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:border-primary-blue hover:shadow-xl transition-all duration-500"><ExternalLink size={20} /></a>
                        <a href="mailto:hello@nanoartif.my.id" className="w-12 h-12 rounded-none bg-navy/5 border border-navy/5 flex items-center justify-center text-navy/40 hover:text-primary-blue hover:border-primary-blue hover:shadow-xl transition-all duration-500"><Mail size={20} /></a>
                     </div>
                  </div>

                  <div>
                     <h4 className="text-1xl font-black text-accent-orange mb-8">Layanan Utama</h4>
                     <ul className="flex flex-col gap-4">
                        {['Web Landing Page','Web Company Profile','Web Toko Online','Aplikasi Mobile','Sistem Kustom'].map(l => (
                           <li key={l}><button onClick={() => scrollTo('pricelist')} className="text-navy/70 hover:text-primary-blue transition-colors text-sm font-bold">{l}</button></li>
                        ))}
                     </ul>
                  </div>

                  <div>
                     <h4 className="text-1xl font-black text-accent-orange mb-8">Informasi</h4>
                     <ul className="flex flex-col gap-4">
                        {['Tentang Kami','Portofolio','Pilihan Harga','Hubungi Kami'].map(l => (
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
                     Design & Code by{' '}
                     <a href="https://nanoartif.my.id" target="_blank" rel="noopener noreferrer" className="text-primary-blue font-black hover:underline px-2 py-1 bg-primary-blue/5">
                        fian_ngraha
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
