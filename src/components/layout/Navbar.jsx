'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ShieldCheck, ChevronRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-xl shadow-xs sticky top-0 z-50 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        
        {/* Logo con frase Asesores en Seguros */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
          <img 
            src="/logo.webp" 
            alt="DC Asesores en Seguros" 
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <div className="flex flex-col border-l-2 border-slate-200 pl-3">
            <span className="text-base md:text-lg font-black tracking-tight text-slate-900 leading-none">
              DC ASESORES
            </span>
            <span className="text-[10px] md:text-[11px] font-extrabold tracking-widest text-[#e11b22] uppercase mt-1 leading-tight">
              Asesores en Seguros
            </span>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex gap-7 items-center font-bold text-slate-700 text-sm">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === '/' ? 'text-[#e11b22]' : 'hover:text-[#e11b22]'}`}
          >
            Inicio
          </Link>
          <Link 
            href="/servicios" 
            className={`transition-colors ${pathname.startsWith('/servicios') ? 'text-[#e11b22]' : 'hover:text-[#e11b22]'}`}
          >
            Servicios
          </Link>
          <Link href="/#proceso" className="hover:text-[#e11b22] transition-colors">
            Cómo Trabajamos
          </Link>
          <Link 
            href="/blog" 
            className={`transition-colors ${pathname === '/blog' ? 'text-[#e11b22]' : 'hover:text-[#e11b22]'}`}
          >
            Blog
          </Link>
          <Link href="/#contacto" className="hover:text-[#e11b22] transition-colors">
            Contacto
          </Link>
          <Link 
            href="/cotizador" 
            className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform active:scale-95 flex items-center gap-2 ${
              pathname === '/cotizador'
                ? 'bg-[#e11b22] text-white shadow-red-600/30'
                : 'bg-slate-900 text-white hover:bg-[#e11b22]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Cotizador</span>
          </Link>
        </nav>

        {/* Botón Hamburguesa Móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <Link 
            href="/cotizador"
            className="px-3 py-1.5 rounded-full bg-[#e11b22] text-white text-xs font-black uppercase tracking-wider shadow-sm active:scale-95"
          >
            Cotizar
          </Link>
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Abrir menú de navegación"
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#e11b22]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-bold text-slate-800 text-base">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className={`flex items-center justify-between py-2 border-b border-slate-100 ${pathname === '/' ? 'text-[#e11b22]' : ''}`}
            >
              <span>Inicio</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/servicios" 
              onClick={closeMobileMenu}
              className={`flex items-center justify-between py-2 border-b border-slate-100 ${pathname.startsWith('/servicios') ? 'text-[#e11b22]' : ''}`}
            >
              <span>Nuestros Servicios</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/#proceso" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2 border-b border-slate-100"
            >
              <span>Cómo Trabajamos</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/blog" 
              onClick={closeMobileMenu}
              className={`flex items-center justify-between py-2 border-b border-slate-100 ${pathname === '/blog' ? 'text-[#e11b22]' : ''}`}
            >
              <span>Blog & Consejos</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/#contacto" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-2 border-b border-slate-100"
            >
              <span>Contacto & Ubicación</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <Link 
              href="/cotizador" 
              onClick={closeMobileMenu}
              className="w-full py-3.5 rounded-2xl bg-[#e11b22] text-white font-black text-center text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cotizador Inteligente 2026</span>
            </Link>
            <a 
              href="tel:+593991938754" 
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-center text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#e11b22]" />
              <span>Asistencia Telefónica: 099 193 8754</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
