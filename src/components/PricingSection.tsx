"use client";

import { useState, useEffect, useRef } from 'react';
import { Check, ShoppingCart, Monitor, Smartphone, Cpu, Globe, Plane, ChevronDown, Crown, ArrowRight } from 'lucide-react';

// ─────────────────────────────────────────────
// TYPE
// ─────────────────────────────────────────────
interface PricePlan {
  name: string;
  price: string;
  priceNote?: string;       // e.g. "mulai dari" or empty
  desc: string;
  badge?: string;           // badge label (popular / worth it / etc)
  badgeColor?: string;      // tailwind bg class
  tier: 'starter' | 'growth' | 'premium';
  highlight?: string;       // small tagline below price
  features: {
    label: string;
    note?: string;          // optional detail shown as tooltip-like text
  }[];
}

// ─────────────────────────────────────────────
// TIER ICONS
// ─────────────────────────────────────────────
const TierIcon = ({ tier }: { tier: PricePlan['tier'] }) => {
  if (tier === 'premium') return <Crown size={16} className="text-yellow-400" />;
  return null;
};

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const pricingData: Record<string, PricePlan[]> = {

  // ───── WEB LANDING PAGE ─────
  landing: [
    {
      name: 'Starter',
      price: '1.000.000',
      desc: 'Cocok untuk bisnis baru yang butuh online cepat.',
      tier: 'starter',
      highlight: 'Siap dalam 3–5 hari kerja',
      features: [
        { label: 'Domain .com (1 Tahun)', note: 'Gratis tahun pertama' },
        { label: 'Hosting Shared 6 Bulan' },
        { label: 'Desain Responsif Mobile & Desktop' },
        { label: '1 Halaman (Scroll Panjang)' },
        { label: 'Tombol WhatsApp Langsung' },
        { label: 'SSL Gratis (HTTPS)' },
        { label: 'Loading Cepat (Basic SEO)' },
        { label: 'Form Kontak Sederhana' },
        { label: '1× Revisi Gratis' },
        { label: 'Tutorial Edit Konten (Video)' },
      ],
    },
    {
      name: 'Growth',
      price: '1.500.000',
      desc: 'Desain lebih premium + fitur konversi lebih tinggi.',
      tier: 'growth',
      badge: 'Paling Laris',
      badgeColor: 'bg-accent-orange',
      highlight: 'Siap dalam 5–7 hari kerja',
      features: [
        { label: 'Semua di paket Starter' },
        { label: 'Hosting 1 Tahun (Hemat Rp 150rb)' },
        { label: 'Desain Visual Lebih Kompleks & Mewah' },
        { label: 'Google Maps Terintegrasi' },
        { label: 'Animasi Smooth & Interaktif' },
        { label: 'Chatbot WhatsApp Dasar' },
        { label: 'Copywriting Headline & CTA' },
        { label: '2× Revisi Gratis' },
        { label: 'Garansi Maintenance 1 Minggu' },
      ],
    },
    {
      name: 'Pro',
      price: '2.000.000',
      desc: 'All-in-one untuk konversi maksimal & tracking iklan.',
      tier: 'premium',
      highlight: 'Siap dalam 7–10 hari kerja',
      features: [
        { label: 'Semua di paket Growth' },
        { label: 'Hingga 3 Halaman Tambahan' },
        { label: 'Meta Pixel & Google Analytics', note: 'Siap untuk iklan berbayar' },
        { label: 'Desain UI/UX Custom (Wireframe dulu)' },
        { label: '3× Revisi Gratis' },
        { label: 'Prioritas Support 30 Hari' },
        { label: 'Keamanan Extra (Firewall Dasar)' },
        { label: 'Laporan Performa Dasar' },
      ],
    },
  ],

  // ───── WEB COMPANY PROFILE ─────
  profile: [
    {
      name: 'Starter',
      price: '1.500.000',
      desc: 'Profil bisnis esensial — terlihat profesional di Google.',
      tier: 'starter',
      highlight: 'Siap dalam 5–7 hari kerja',
      features: [
        { label: 'Domain .com (1 Tahun)' },
        { label: 'Hosting Shared 6 Bulan' },
        { label: 'Desain Responsif' },
        { label: '3 Halaman: Beranda, Tentang, Kontak' },
        { label: '1 Akun Email Bisnis (@namabisnismu.com)' },
        { label: 'SSL Gratis' },
        { label: 'Form Kontak → WhatsApp' },
        { label: '2× Revisi Gratis' },
        { label: 'Garansi Maintenance 15 Hari' },
      ],
    },
    {
      name: 'Growth',
      price: '2.500.000',
      desc: 'Website company profile lengkap & meyakinkan klien.',
      tier: 'growth',
      badge: 'Recommended',
      badgeColor: 'bg-accent-orange',
      highlight: 'Siap dalam 7–10 hari kerja',
      features: [
        { label: 'Semua di paket Starter' },
        { label: 'Hosting 1 Tahun' },
        { label: '5–6 Halaman (Layanan, Portofolio, Tim, Blog)' },
        { label: '2 Akun Email Bisnis' },
        { label: 'Desain Premium & Clean' },
        { label: 'Galeri Foto & Section Testimoni' },
        { label: 'SEO On-Page Dasar', note: 'Title, meta, struktur heading' },
        { label: 'Google Maps & Media Sosial Link' },
        { label: 'Garansi Maintenance 1 Bulan' },
      ],
    },
    {
      name: 'Executive',
      price: '3.500.000',
      desc: 'Solusi korporat — tampil seperti perusahaan besar.',
      tier: 'premium',
      highlight: 'Siap dalam 10–14 hari kerja',
      features: [
        { label: 'Semua di paket Growth' },
        { label: '8–10 Halaman (Custom Request)' },
        { label: 'Feed Instagram / YouTube Otomatis' },
        { label: 'Desain Interaktif (Parallax / Scroll Efek)' },
        { label: 'Speed Optimization (Lazy Load)' },
        { label: 'Popup, Accordion, Tabs Interaktif' },
        { label: '3 Akun Email Bisnis' },
        { label: '5× Revisi Gratis' },
        { label: 'Garansi Maintenance 1,5 Bulan' },
      ],
    },
  ],

  // ───── WEB TRAVEL & TOUR ─────
  travel: [
    {
      name: 'Starter',
      price: '2.000.000',
      desc: 'Katalog tour sederhana — calon wisatawan langsung hubungi.',
      tier: 'starter',
      highlight: 'Siap dalam 7–10 hari kerja',
      features: [
        { label: 'Domain .com (1 Tahun)' },
        { label: 'Hosting 6 Bulan' },
        { label: 'Desain Responsif' },
        { label: '5 Halaman Utama' },
        { label: '1 Email Bisnis' },
        { label: 'SSL Gratis' },
        { label: 'Katalog Paket Tour (Grid/List)' },
        { label: 'Tombol Booking ke WhatsApp' },
        { label: '2× Revisi Gratis' },
        { label: 'Google Maps Lokasi Destinasi' },
      ],
    },
    {
      name: 'Growth',
      price: '3.500.000',
      desc: 'Manajemen paket tour + filter destinasi.',
      tier: 'growth',
      badge: 'Terfavorit',
      badgeColor: 'bg-accent-orange',
      highlight: 'Siap dalam 10–14 hari kerja',
      features: [
        { label: 'Semua di paket Starter' },
        { label: 'Hosting 1 Tahun' },
        { label: '8–10 Halaman (Destinasi, Blog, Itinerary)' },
        { label: 'Katalog Tour Dinamis (tambah/edit sendiri)' },
        { label: 'Filter & Kategori Paket Tour' },
        { label: 'Form Booking Detail & Itinerary' },
        { label: '10 GB Disk Storage' },
        { label: '3 Email Bisnis' },
        { label: 'Garansi Maintenance 1 Bulan' },
      ],
    },
    {
      name: 'Premium',
      price: '5.000.000',
      priceNote: 'mulai dari',
      desc: 'Website travel profesional dengan sistem booking & pembayaran.',
      tier: 'premium',
      highlight: 'Dikerjakan 14–21 hari kerja',
      features: [
        { label: 'Semua di paket Growth' },
        { label: 'Sistem Booking Online (Tanggal, Kuota Kursi)' },
        { label: 'Integrasi Payment Gateway', note: 'Midtrans / Tripay' },
        { label: 'Cetak Invoice Otomatis (PDF)' },
        { label: 'Dashboard Admin Kelola Order' },
        { label: 'Notifikasi Email Otomatis ke Pembeli' },
        { label: 'Multi-Bahasa Dasar (ID & EN)' },
        { label: 'Garansi Maintenance 2 Bulan' },
        { label: 'Harga Final Tergantung Kompleksitas' },
      ],
    },
  ],

  // ───── WEB TOKO ONLINE ─────
  shop: [
    {
      name: 'Starter',
      price: '2.000.000',
      desc: 'Toko online simpel — produk tampil, pembeli hubungi WA.',
      tier: 'starter',
      highlight: 'Siap dalam 5–7 hari kerja',
      features: [
        { label: 'Domain .com (1 Tahun)' },
        { label: 'Hosting 6 Bulan' },
        { label: 'Desain Responsif' },
        { label: '1 Halaman Toko (Landing Store)' },
        { label: '1 Email Bisnis' },
        { label: 'SSL Gratis' },
        { label: 'Tampil Produk + Harga (hingga 20 Produk)' },
        { label: 'Tombol Beli → WhatsApp Langsung' },
        { label: '2× Revisi Gratis' },
      ],
    },
    {
      name: 'Growth',
      price: '3.500.000',
      desc: 'E-commerce lengkap — katalog dinamis + filter produk.',
      tier: 'growth',
      badge: 'Paling Worth It',
      badgeColor: 'bg-accent-orange',
      highlight: 'Siap dalam 10–14 hari kerja',
      features: [
        { label: 'Semua di paket Starter' },
        { label: 'Hosting 1 Tahun' },
        { label: '5–7 Halaman (Shop, Promo, Kategori)' },
        { label: 'Katalog Produk Dinamis (100+ produk)' },
        { label: 'Fitur Search & Filter Produk' },
        { label: 'Keranjang → Checkout ke WhatsApp' },
        { label: 'SEO On-Page Dasar (produk mudah ditemukan Google)' },
        { label: '10 GB Disk Storage' },
        { label: 'Garansi Maintenance 1 Bulan' },
      ],
    },
    {
      name: 'Full Store',
      price: '5.000.000',
      priceNote: 'mulai dari',
      desc: 'Sistem belanja otomatis — payment gateway + dashboard order.',
      tier: 'premium',
      highlight: 'Dikerjakan 14–21 hari kerja',
      features: [
        { label: 'Semua di paket Growth' },
        { label: 'Keranjang Belanja Otomatis' },
        { label: 'Integrasi Payment Gateway', note: 'QRIS, Transfer, e-Wallet, CC' },
        { label: 'Dashboard Admin (Kelola Order & Produk)' },
        { label: 'Checkout Otomatis + Notif Email ke Pembeli' },
        { label: 'Kalkulasi Ongkir Otomatis (JNE, J&T, dsb)' },
        { label: 'Mobile-Friendly Cart Experience' },
        { label: 'Speed & Performance Optimization' },
        { label: 'Harga Final Tergantung Kompleksitas' },
      ],
    },
  ],

  // ───── APLIKASI MOBILE ─────
  app: [
    {
      name: 'Basic App',
      price: '7.000.000',
      priceNote: 'mulai dari',
      desc: 'Aplikasi mobile cross-platform dengan fitur inti.',
      tier: 'starter',
      highlight: 'Android & iOS — 1 codebase',
      features: [
        { label: 'Android & iOS (Cross Platform / Flutter)' },
        { label: 'Desain UI/UX Dasar (dari referensi)' },
        { label: 'Login / Register (Email & Google)' },
        { label: 'Push Notifikasi' },
        { label: 'Hingga 5 Fitur Utama' },
        { label: 'Koneksi ke API / Backend Dasar' },
        { label: 'SSL & Keamanan Dasar' },
        { label: 'Hosting Backend 3 Bulan' },
        { label: 'Garansi Bug Fix 1 Bulan' },
      ],
    },
    {
      name: 'Standard App',
      price: '10.000.000',
      priceNote: 'mulai dari',
      desc: 'Aplikasi dengan fitur menengah + dashboard admin web.',
      tier: 'growth',
      badge: 'Paling Diminati',
      badgeColor: 'bg-accent-orange',
      highlight: 'Termasuk panel admin berbasis web',
      features: [
        { label: 'Semua di Basic App' },
        { label: 'Hingga 10 Fitur Utama' },
        { label: 'Admin Dashboard Web (Kelola Data)' },
        { label: 'Integrasi Payment Gateway' },
        { label: 'Notifikasi Real-time' },
        { label: 'Fitur Upload Foto / Dokumen' },
        { label: 'Hosting Backend 6 Bulan' },
        { label: 'Garansi Bug Fix 2 Bulan' },
      ],
    },
    {
      name: 'Custom Pro',
      price: 'Hubungi Kami',
      desc: 'Aplikasi kompleks: GPS, chat, marketplace, dsb.',
      tier: 'premium',
      highlight: 'Harga disesuaikan kebutuhan',
      features: [
        { label: 'Semua di Standard App' },
        { label: 'Fitur Tak Terbatas (Custom)' },
        { label: 'Real-time Chat / Live Tracking GPS' },
        { label: 'Marketplace / Multi-Vendor' },
        { label: 'Machine Learning / AI Integration' },
        { label: 'Full API Development & Dokumentasi' },
        { label: 'Dedicated Support 24/7' },
        { label: 'Maintenance 3 Bulan' },
        { label: 'Konsultasi & Wireframe Gratis' },
      ],
    },
  ],

  // ───── SISTEM (ERP / CRM / AI) ─────
  system: [
    {
      name: 'Sistem Dasar',
      price: '5.000.000',
      priceNote: 'mulai dari',
      desc: 'Sistem manajemen internal untuk bisnis skala kecil–menengah.',
      tier: 'starter',
      highlight: 'Web-based, akses dari browser',
      features: [
        { label: 'Manajemen Produk / Inventori' },
        { label: 'Laporan Keuangan Dasar (Pemasukan/Pengeluaran)' },
        { label: 'Multi-User + Hak Akses (Role)' },
        { label: 'Import / Export Excel' },
        { label: 'Dashboard Data Visual (Grafik)' },
        { label: 'Keamanan Database (Backup Otomatis)' },
        { label: 'Hosting 3 Bulan' },
        { label: 'Garansi Maintenance 1 Bulan' },
      ],
    },
    {
      name: 'ERP / CRM Pro',
      price: '8.000.000',
      priceNote: 'mulai dari',
      desc: 'Otomasi alur kerja bisnis — dari penjualan sampai laporan.',
      tier: 'growth',
      badge: 'Terlengkap',
      badgeColor: 'bg-accent-orange',
      highlight: 'Cocok untuk bisnis 5–50 karyawan',
      features: [
        { label: 'Semua di Sistem Dasar' },
        { label: 'CRM: Kelola Lead & Follow-up Pelanggan' },
        { label: 'Manajemen Pembelian & Supplier' },
        { label: 'Laporan Laba-Rugi & Neraca' },
        { label: 'Notifikasi Stok Menipis Otomatis' },
        { label: 'Cloud Sync Real-time' },
        { label: 'Export PDF Invoice / Laporan' },
        { label: 'Hosting 6 Bulan' },
        { label: 'Garansi Maintenance 2 Bulan' },
      ],
    },
    {
      name: 'Enterprise / AI',
      price: 'Hubungi Kami',
      desc: 'Sistem enterprise skala besar + integrasi AI & otomasi.',
      tier: 'premium',
      highlight: 'Harga disesuaikan kebutuhan',
      features: [
        { label: 'Semua di ERP/CRM Pro' },
        { label: 'AI Chatbot Internal (Auto-reply, Query Data)' },
        { label: 'Predictive Analytics & Forecasting' },
        { label: 'Automated Workflow (Trigger & Action)' },
        { label: 'Integrasi API Pihak Ketiga (Shopee, Tokopedia, dsb)' },
        { label: 'High Performance Cloud Server' },
        { label: 'Security Audit Level Enterprise' },
        { label: 'Dedicated Support Team' },
        { label: 'Konsultasi & Analisis Kebutuhan Gratis' },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────
const categories = [
  { id: 'landing', label: 'Web Landing Page', icon: <Globe size={18} /> },
  { id: 'profile', label: 'Web Company Profile', icon: <Monitor size={18} /> },
  { id: 'travel',  label: 'Web Travel & Tour',  icon: <Plane size={18} /> },
  { id: 'shop',    label: 'Web Toko Online',     icon: <ShoppingCart size={18} /> },
  { id: 'app',     label: 'Aplikasi Mobile',     icon: <Smartphone size={18} /> },
  { id: 'system',  label: 'Sistem / ERP / CRM',  icon: <Cpu size={18} /> },
];

// ─────────────────────────────────────────────
// ANIMATED CARD WRAPPER
// ─────────────────────────────────────────────
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// PLAN CARD
// ─────────────────────────────────────────────
function PlanCard({ plan, categoryLabel }: { plan: PricePlan; categoryLabel: string }) {
  const isGrowth = plan.tier === 'growth';
  const isPremium = plan.tier === 'premium';
  const isContactPrice = plan.price === 'Hubungi Kami';

  const waMessage = encodeURIComponent(
    `Halo Alifian, saya tertarik dengan paket *${plan.name}* untuk *${categoryLabel}*. Mohon informasi lebih lanjut. Terima kasih!`
  );
  const waUrl = `https://wa.me/6285188136376?text=${waMessage}`;

  return (
    <div
      className={`relative flex flex-col p-8 md:p-10 shadow-2xl transition-all duration-300 group
        hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        ${isGrowth
          ? 'bg-navy text-white border-4 border-accent-orange z-10 md:scale-[1.03] shadow-[0_0_50px_rgba(255,140,0,0.15)] hover:shadow-[0_0_70px_rgba(255,140,0,0.25)]'
          : isPremium
          ? 'bg-[#001e30] text-white border border-yellow-400/30 hover:border-yellow-400/60'
          : 'bg-white text-navy border border-navy/10 hover:border-primary-blue/30'
        }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className={`absolute top-0 right-8 -translate-y-1/2 text-white text-[9px] font-black px-4 py-1.5 shadow-lg tracking-widest uppercase ${plan.badgeColor ?? 'bg-primary-blue'}`}>
          {plan.badge}
        </div>
      )}

      {/* Tier label */}
      <div className="flex items-center gap-1.5 mb-3">
        <TierIcon tier={plan.tier} />
        <span className={`text-[9px] font-black tracking-[0.3em] uppercase ${isGrowth ? 'text-accent-orange' : isPremium ? 'text-yellow-400' : 'text-primary-blue'}`}>
          {plan.tier === 'starter' ? 'Paket Dasar' : plan.tier === 'growth' ? 'Paket Unggulan' : 'Paket Premium'}
        </span>
      </div>

      {/* Plan name */}
      <h4 className={`text-xl md:text-3xl font-black tracking-tighter mb-1 leading-none ${isGrowth || isPremium ? 'text-white' : 'text-navy'}`}>
        {plan.name}
      </h4>

      {/* Desc */}
      <p className={`text-xs md:text-sm font-semibold mb-5 leading-snug ${isGrowth ? 'text-white/50' : isPremium ? 'text-white/40' : 'text-navy/60'}`}>
        {plan.desc}
      </p>

      {/* Price */}
      <div className="mb-1">
        {plan.priceNote && (
          <span className={`block text-[9px] font-bold tracking-widest uppercase mb-0.5 ${isGrowth || isPremium ? 'text-white/40' : 'text-navy/40'}`}>
            {plan.priceNote}
          </span>
        )}
        <div className="flex items-start gap-1">
          {!isContactPrice && (
            <span className={`text-[10px] md:text-[12px] font-black pt-1 tracking-widest leading-none ${isGrowth ? 'text-white/60' : isPremium ? 'text-white/60' : 'text-navy/60'}`}>
              RP
            </span>
          )}
          <span className={`text-3xl md:text-5xl font-black tracking-tighter leading-none ${isGrowth ? 'text-amber-400' : isPremium ? 'text-yellow-400' : 'text-navy'}`}>
            {plan.price}
          </span>
        </div>
      </div>

      {/* Highlight tagline */}
      {plan.highlight && (
        <span className={`text-[10px] font-bold tracking-wide mt-1 mb-5 ${isGrowth ? 'text-primary-blue' : isPremium ? 'text-primary-blue' : 'text-primary-blue'}`}>
          {plan.highlight}
        </span>
      )}

      <div className={`h-px w-full my-5 ${isGrowth ? 'bg-white/10' : isPremium ? 'bg-white/10' : 'bg-navy/10'}`} />

      {/* Features */}
      <ul className="space-y-3 flex-grow mb-10">
        {plan.features.map((f, fi) => (
          <li key={fi} className="flex items-start gap-3">
            <Check size={15} className={`mt-0.5 shrink-0 ${isGrowth ? 'text-accent-orange' : isPremium ? 'text-yellow-400' : 'text-primary-blue'}`} />
            <div className="flex flex-col">
              <span className={`text-[13px] md:text-[14px] font-bold leading-tight ${isGrowth || isPremium ? 'text-white/90' : 'text-navy'}`}>
                {f.label}
              </span>
              {f.note && (
                <span className={`text-[10px] font-semibold mt-0.5 ${isGrowth ? 'text-white/30' : isPremium ? 'text-white/30' : 'text-navy/40'}`}>
                  {f.note}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-between px-6 py-4 text-[12px] md:text-[13px] font-black tracking-[0.2em] transition-all duration-300 shadow-xl uppercase group/btn mt-auto
          ${isGrowth
            ? 'bg-amber-400 text-navy hover:bg-white hover:tracking-[0.3em]'
            : isPremium
            ? 'bg-yellow-400 text-navy hover:bg-white hover:tracking-[0.3em]'
            : 'bg-primary-blue text-white hover:bg-navy hover:tracking-[0.3em]'
          }`}
      >
        <span>{isContactPrice ? 'Diskusi Sekarang' : 'Pilih Paket'}</span>
        <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────
export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('landing');

  const currentPlans = pricingData[activeTab] ?? [];
  const currentCategory = categories.find(c => c.id === activeTab);

  // Price range display per category
  const priceRangeMap: Record<string, string> = {
    landing: 'Rp 1 jt – 2 jt',
    profile: 'Rp 1,5 jt – 3,5 jt',
    travel:  'Rp 2 jt – 5 jt+',
    shop:    'Rp 2 jt – 5 jt+',
    app:     'Rp 7 jt – 10 jt+',
    system:  'Rp 5 jt – 8 jt+',
  };

  return (
    <section id="pricelist" className="bg-navy px-4 pb-20">
      <div className="container-custom">

        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="text-white font-bold text-[14px] tracking-[0.3em] mb-4 block font-plus-jakarta">
            Pilihan Kategori
          </span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight font-plus-jakarta">
            Produk yang Anda Inginkan
          </h2>
          <p className="text-white/40 text-sm font-semibold mt-3">
            Harga transparan · Fitur jelas · Tidak ada biaya tersembunyi
          </p>
        </div>

        {/* Category Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center justify-center gap-2 px-4 py-4 md:py-6 text-[10px] md:text-[12px] font-black tracking-widest transition-all duration-300 shadow-xl border uppercase relative overflow-hidden group/btn
                ${activeTab === cat.id
                  ? 'bg-accent-orange border-accent-orange text-white'
                  : 'bg-white border-navy/5 text-navy hover:bg-white/95'
                }`}
            >
              <span className={`${activeTab === cat.id ? 'text-white' : 'text-primary-blue'}`}>
                {cat.icon}
              </span>
              <span className="text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Category Header */}
        <div className="flex flex-col items-center mb-8" key={`status-${activeTab}`}>
          <h3 className="text-xl md:text-4xl font-black text-white tracking-tighter text-center">
            {currentCategory?.label}
            <span className="text-primary-blue ml-2">{currentPlans.length} Pilihan Paket</span>
          </h3>

          {/* Price range pill */}
          <div className="mt-3 flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2">
            <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Kisaran Harga</span>
            <span className="text-sm font-black text-accent-orange tracking-tight">{priceRangeMap[activeTab]}</span>
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-[9px] font-bold text-white/20 tracking-[0.4em]">Gulir ke bawah</span>
            <ChevronDown className="text-accent-orange animate-bounce" size={24} />
          </div>
        </div>

        {/* Pricing Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          key={activeTab}
        >
          {currentPlans.map((plan, i) => (
            <AnimatedCard key={i} delay={i * 120}>
              <PlanCard
                plan={plan}
                categoryLabel={currentCategory?.label ?? 'Layanan'}
              />
            </AnimatedCard>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center border border-white/10 bg-white/5 px-8 py-6 max-w-2xl mx-auto">
          <p className="text-white/60 text-xs font-bold tracking-wide leading-relaxed">
            💬 Tidak yakin paket mana yang cocok?{' '}
            <a
              href="https://wa.me/6285188136376?text=Halo%20Alifian%2C%20saya%20ingin%20konsultasi%20pilihan%20paket%20website%20yang%20sesuai%20kebutuhan%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-orange underline hover:text-white transition-colors"
            >
              Konsultasi gratis via WhatsApp
            </a>
            {' '}— kami bantu pilihkan yang paling sesuai budget dan kebutuhan kamu.
          </p>
        </div>

      </div>
    </section>
  );
}
