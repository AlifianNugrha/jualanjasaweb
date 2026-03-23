"use client";

import { useState } from 'react';
import { Check, ShoppingCart, Monitor, Smartphone, Cpu, Globe, Plane, ChevronDown } from 'lucide-react';

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('landing');

  const categories = [
    { id: 'landing', label: 'Web Landing Page', icon: <Globe size={18} /> },
    { id: 'profile', label: 'Web Company Profile', icon: <Monitor size={18} /> },
    { id: 'travel', label: 'Web Travel & Tour', icon: <Plane size={18} /> },
    { id: 'shop', label: 'Web Toko Online', icon: <ShoppingCart size={18} /> },
    { id: 'app', label: 'Aplikasi', icon: <Smartphone size={18} /> },
    { id: 'system', label: 'Sistem', icon: <Cpu size={18} /> },
  ];

  const pricingData: any = {
    landing: [
      {
        name: 'Starter', price: '1.500.000', desc: 'Cepat & elegan untuk bisnis baru.',
        features: [
          'Free Domain (.com)',
          'Shared Hosting (6 Bulan)',
          'Desain Responsif (Mobile & Desktop)',
          '1 Halaman Beranda (scroll panjang)',
          'Integrasi Tombol WhatsApp',
          'Fast Loading / Skor SEO Dasar',
          'Free SSL (Keamanan)',
          '1x Revisi Gratis',
          'Form Kontak Dasar',
          'Video Panduan Edit Website'
        ],
        popular: false
      },
      {
        name: 'Growth', price: '2.750.000', desc: 'Kontrol penuh fitur & brand.',
        features: [
          'Semua yang ada di Starter, plus:',
          'Hosting 1 Tahun',
          'Desain Visual Lebih Kompleks',
          'Integrasi Google Maps',
          'Animasi Smooth & Interaktif',
          '2x Revisi Gratis',
          'Free Setup Chatbot WhatsApp Dasar',
          'Copywriting Dasar (Headline & CTA)',
          'Garansi Maintenance 1 Minggu'
        ],
        popular: true
      },
      {
        name: 'Ultimate', price: '3.750.000', desc: 'All-in-one konversi tinggi.',
        features: [
          'Semua yang ada di Growth, plus:',
          'Up to 2 Halaman Tambahan',
          'Setup Meta Pixel & Google Analytics',
          'Desain Khusus User-Friendly',
          '3x Revisi Gratis',
          'Prioritas Support 24/7 (30 Hari)',
          'Keamanan Website Ekstra'
        ],
        popular: false
      }
    ],
    profile: [
      {
        name: 'Starter', price: '2.500.000', desc: 'Profil bisnis esensial.',
        features: [
          'Free Domain (.com)',
          'Shared Hosting (6 Bulan)',
          'Desain Responsif',
          '3 Halaman Utama',
          '1 Email Bisnis',
          '2 GB Disk Storage',
          '2x Revisi Gratis',
          'Free SSL',
          'Form Kontak Langsung WhatsApp',
          'Garansi Maintenance 15 Hari'
        ],
        popular: false
      },
      {
        name: 'Growth', price: '4.000.000', desc: 'Lengkap & profesional.',
        features: [
          'Semua yang ada di Starter, plus:',
          'Hosting 1 Tahun',
          '5–6 Halaman Utama',
          '2 Email Bisnis',
          'Desain Premium & Clean',
          '10 GB Disk Storage',
          'Galeri Foto / Testimoni',
          'SEO On-Page Dasar',
          'Garansi Maintenance 1 Bulan'
        ],
        popular: true
      },
      {
        name: 'Executive', price: '6.500.000', desc: 'Solusi korporat premium.',
        features: [
          'Semua yang ada di Growth, plus:',
          '8–10 Halaman (Request Khusus)',
          'Request Fitur Tambahan (Popup/Accordion)',
          'Integrasi Instagram/YouTube Feed',
          'Speed Optimization (Lazy Load)',
          'Desain Interaktif (Parallax)',
          '3 Email Bisnis',
          '5x Revisi Gratis',
          'Garansi Maintenance 1,5 Bulan'
        ],
        popular: false
      }
    ],
    travel: [
      {
        name: 'Starter', price: '2.500.000', desc: 'Katalog tour sederhana.',
        features: [
          'Free Domain (.com)',
          'Shared Hosting (6 Bulan)',
          'Desain Responsif',
          '5 Halaman Utama',
          '1 Email Bisnis',
          '2 GB Disk Storage',
          '2x Revisi Gratis',
          'Free SSL',
          'Katalog Paket Tour (Grid/List)',
          'Tombol Booking ke WhatsApp'
        ],
        popular: false
      },
      {
        name: 'Growth', price: '5.000.000', desc: 'Manajemen paket tour.',
        features: [
          'Semua yang ada di Starter, plus:',
          'Hosting 1 Tahun',
          '8–10 Halaman (Destinasi/Blog)',
          'Katalog Tour Dinamis',
          'Fitur Filter/Kategori Paket',
          'Integrasi Google Maps',
          'Form Booking Detail & Itinerary',
          '10 GB Disk Storage',
          '3 Email Bisnis'
        ],
        popular: true
      },
      {
        name: 'Ultimate', price: '12.000.000', desc: 'Sistem booking otomatis.',
        features: [
          'Semua yang ada di Growth, plus:',
          'Sistem Booking Online',
          'Cetak Invoice Otomatis',
          'Integrasi Payment Gateway',
          'Dashboard Kelola Order',
          'Manajemen Itinerary & Kursi',
          'Email Notifikasi Otomatis',
          'Multi-Bahasa Dasar',
          'Garansi Maintenance 3 Bulan'
        ],
        popular: false
      }
    ],
    shop: [
      {
        name: 'Starter', price: '2.500.000', desc: 'Toko online basic.',
        features: [
          'Free Domain (.com)',
          'Shared Hosting (6 Bulan)',
          'Desain Responsif',
          '1 Halaman Landing Store',
          '1 Email Bisnis',
          '2 GB Disk Storage',
          '2x Revisi Gratis',
          'Free SSL',
          'Gambar Produk & Harga',
          'Tombol Beli ke WhatsApp'
        ],
        popular: false
      },
      {
        name: 'Growth', price: '6.000.000', desc: 'E-commerce lengkap.',
        features: [
          'Semua yang ada di Starter, plus:',
          'Hosting 1 Tahun',
          '5–7 Halaman (Shop/Promo)',
          'Katalog Produk Dinamis (100+)',
          'Fitur Search / Filter Produk',
          'Keranjang → Checkout WhatsApp',
          'Desain Custom Kategori',
          'SEO On-Page Dasar',
          '10 GB Disk Storage'
        ],
        popular: true
      },
      {
        name: 'Ultimate', price: '12.000.000', desc: 'Sistem belanja otomatis.',
        features: [
          'Semua yang ada di Growth, plus:',
          'Sistem Keranjang Belanja Otomatis',
          'Integrasi Payment Gateway',
          'QRIS/e-Wallet/Transfer/CC',
          'Dashboard Admin (Order/Produk)',
          'Checkout Otomatis + Email Notif',
          'Ongkir Otomatis (Ekspedisi)',
          'Mobile Friendly Cart Experience',
          'Enterprise Speed Optimization'
        ],
        popular: false
      }
    ],
    app: [
      {
        name: 'Basic App', price: '15.000.000', desc: 'Aplikasi mobile hybrid esensial.',
        features: [
          'Android & iOS (Cross Platform)',
          'Basic UI/UX Design',
          'User Authentication',
          'Push Notifications',
          'Admin Dashboard Dasar',
          'Integrasi API Dasar',
          'Free SSL & Security',
          'Hosting Server 3 Bulan',
          'Garansi Bug 1 Bulan'
        ],
        popular: false
      },
      {
        name: 'Custom Pro', price: 'Deal / Nego', desc: 'Aplikasi fitur kompleks.',
        features: [
          'Semua Fitur Basic, plus:',
          'Native Performance Optimization',
          'Advanced UI/UX (Custom Motion)',
          'Payment Gateway Integration',
          'Real-time Chat / Features',
          'Tracking System / GPS',
          'Full API Development',
          'Priority 24/7 Support',
          'Maintenance 3 Bulan'
        ],
        popular: true
      }
    ],
    system: [
      {
        name: 'ERP / CRM', price: '10.000.000', desc: 'Otomasi alur kerja internal.',
        features: [
          'Inventory Management',
          'Financial Reporting Dasar',
          'User Roles & Permissions',
          'Data Analytics Dashboard',
          'Cloud Data Sync',
          'Import/Export Excel/PDF',
          'Sistem Keamanan Database',
          'Garansi Maintenance 1 Bulan'
        ],
        popular: true
      },
      {
        name: 'AI Automation', price: 'Deal / Nego', desc: 'Integrasi kecerdasan buatan.',
        features: [
          'Custom AI Chatbots',
          'Predictive Analytics',
          'Automated Workflow Systems',
          'Machine Learning Model Integration',
          'Enterprise API Access',
          'High Performance Cloud',
          'Dedicated Support Team',
          'Security Audit Level Tinggi'
        ],
        popular: false
      }
    ]
  };

  return (
    <section id="pricelist" className=" bg-navy px-4 pb-20">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="text-white font-bold text-[14px] tracking-[0.3em] mb-4 block font-plus-jakarta">Pilihan Kategori</span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight font-plus-jakarta">Produk yang anda Inginkan</h2>
        </div>

        {/* COMPACT 3 COLUMN GRID CATEGORY SELECTOR */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center justify-center gap-2 px-4 py-4 md:py-6 text-[10px] md:text-[12px] font-black tracking-widest transition-all duration-300 shadow-xl border uppercase relative overflow-hidden group/btn ${activeTab === cat.id
                ? 'bg-accent-orange border-accent-orange text-white'
                : 'bg-white border-navy/5 text-navy hover:bg-white/95'
                }`}
            >
              <span className={`${activeTab === cat.id ? 'text-white' : 'text-primary-blue'}`}>{cat.icon}</span>
              <span className="text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* CATEGORY STATUS INDICATOR - BETWEEN SELECTOR AND GRID */}
        <div className="flex flex-col items-center mb-5 animate-fade-in" key={`status-${activeTab}`}>
          <h3 className="text-xl md:text-4xl font-black text-white tracking-tighter text-center">
            {categories.find(c => c.id === activeTab)?.label}
            <span className="text-primary-blue ml-2"> {pricingData[activeTab]?.length || 0} Pilihan</span>
          </h3>
          <div className="mt-2 flex flex-col items-center gap-2">
            <span className="text-[9px] font-bold text-white/20 tracking-[0.4em]">Gulir ke bawah</span>
            <ChevronDown className="text-accent-orange animate-bounce" size={24} />
          </div>
        </div>

        {/* PRICING GRID (DEPENDENT ON SELECTION ABOVE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in" key={activeTab}>
          {pricingData[activeTab].map((plan: any, i: number) => {
            const isGrowth = plan.name.includes('Growth');
            return (
              <div
                key={i}
                className={`relative flex flex-col p-8 md:p-10 rounded-none shadow-2xl transition-all duration-500 group 
                  ${isGrowth
                    ? 'bg-navy text-white border-4 border-accent-orange z-10 md:scale-[1.03] shadow-[0_0_50px_rgba(249,115,22,0.15)]'
                    : 'bg-white text-navy border border-navy/10'
                  }`}
              >
                {plan.popular && (
                  <div className={`absolute top-0 right-8 -translate-y-1/2 text-white text-[9px] font-black px-4 py-1.5 rounded-none shadow-lg tracking-widest  ${isGrowth ? 'bg-accent-orange' : 'bg-primary-blue'}`}>
                    {isGrowth ? 'Worth It' : 'Populer'}
                  </div>
                )}
                <h4 className={`text-xl md:text-3xl font-black tracking-tighter mb-2 leading-none ${isGrowth ? 'text-white' : 'text-navy'}`}>{plan.name}</h4>
                <p className={`text-xs md:text-sm font-bold mb-6 leading-tight text-justify ${isGrowth ? 'text-white/40' : 'text-navy'}`}>{plan.desc}</p>

                <div className="mb-1 flex items-start gap-1">
                  <span className={`text-[10px] md:text-[12px] font-black pt-1 tracking-widest leading-none ${isGrowth ? 'text-white/60' : 'text-navy'}`}>RP</span>
                  <span className={`text-3xl md:text-5xl font-black tracking-tighter leading-none ${isGrowth ? 'text-gold-shine' : 'text-navy'}`}>{plan.price}</span>
                </div>

                <div className={`h-px w-full mb-8 ${isGrowth ? 'bg-white/10' : 'bg-navy/10'}`} />

                <ul className="space-y-3 flex-grow mb-10">
                  {plan.features.map((f: string, fi: number) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Check size={16} className="text-accent-orange mt-0.5 shrink-0" />
                      <span className={`text-[13px] md:text-[15px] font-bold leading-tight text-justify w-full ${isGrowth ? 'text-white/90' : 'text-navy'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="https://api.whatsapp.com/send?phone=6283841580448" className={`flex items-center justify-between px-6 py-4 text-[12px] md:text-[14px] font-black tracking-[0.2em] transition-all duration-300 shadow-xl group uppercase ${isGrowth ? 'bg-amber-400 text-navy hover:bg-white' : 'bg-primary-blue text-white hover:bg-navy'}`}>
                  <span>Pilih Paket</span>
                  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
