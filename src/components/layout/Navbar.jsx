'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Cotizador', href: '/cotizador' },
    { label: 'Contacto', href: '/#contacto' },
    { label: 'Términos y condiciones', href: '/terminos-y-condiciones' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 transition-colors">
      
      {/* 🔴 1. TOP BAR CORPORATIVO (SE OCULTA EN SCROLL DOWN) */}
      <div 
        className={`w-full bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 hidden sm:block transition-all duration-300 overflow-hidden ${
          scrolled ? 'h-0 max-h-0 opacity-0 border-b-0 py-0 pointer-events-none' : 'h-10 max-h-12 opacity-100'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
          
          {/* Redes Sociales Oficiales */}
          <div className="flex items-center gap-3 text-slate-300">
            <a 
              href="https://www.facebook.com/Asesor012/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook DC Asesores"
              className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[#e11b22] transition-all flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a 
              href="https://www.tiktok.com/@asesorseguros2?_r=1&_t=ZS-94CCdpAiPGZ" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="TikTok DC Asesores"
              className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[#e11b22] transition-all flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.64 1.25-.11 2.37-.93 2.78-2.11.23-.6.3-1.25.28-1.89.02-4.97.01-9.94.01-14.91z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/dc.asesorseguros?igsh=MXMwd2oxbWkza3hjdw%3D%3D" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram DC Asesores"
              className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[#e11b22] transition-all flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>

          {/* Datos de contacto rápidos + Botón Asesoría Gratuita */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#e11b22]" />
              <span>info&#64;dcasesoresec.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#e11b22]" />
              <a href="tel:025003373" className="hover:text-white transition-colors">
                02 500 3373
              </a>
            </div>
            <Link 
              href="/#contacto" 
              className="bg-[#e11b22] hover:bg-red-600 text-white font-extrabold px-4 py-1.5 rounded-md text-[11px] uppercase tracking-wider transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
            >
              <span>Asesoría Gratuita</span>
              <Sparkles className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>

      {/* 🔴 2. NAVBAR PRINCIPAL DUAL (LIGHT / DARK AETHERION STYLE) */}
      <div className="w-full bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          
          {/* Logo con frase Asesores en Seguros */}
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3 group">
            <img 
              src="/logo.webp" 
              alt="DC Asesores en Seguros" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col border-l-2 border-slate-200 dark:border-slate-800 pl-3">
              <span className="text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
                DC ASESORES
              </span>
              <span className="text-[10px] md:text-[11px] font-extrabold tracking-widest text-[#e11b22] uppercase mt-1 leading-tight">
                Asesores en Seguros
              </span>
            </div>
          </Link>

          {/* Navegación Desktop con las opciones oficiales de DC */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 items-center font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : pathname.startsWith(link.href);

              return (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`transition-colors py-1 relative ${
                    isActive 
                      ? 'text-[#e11b22] font-black' 
                      : 'hover:text-[#e11b22] text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11b22] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Acciones Derecha: Botón Cotizador + Switch Tema Claro/Oscuro */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <Link 
              href="/cotizador" 
              className={`px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 ${
                pathname === '/cotizador'
                  ? 'bg-[#e11b22] text-white shadow-red-600/30'
                  : 'bg-slate-950 text-white hover:bg-[#e11b22] dark:bg-white dark:text-slate-900 dark:hover:bg-[#e11b22] dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Cotizador</span>
            </Link>
          </div>

          {/* Botón Móvil: Hamburguesa + Switch Tema */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
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
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#e11b22]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 🔴 3. MENÚ DESPLEGABLE MÓVIL (COMPLETO CON LINKS OFICIALES) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-bold text-slate-800 dark:text-slate-100 text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                onClick={closeMobileMenu}
                className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/80 hover:text-[#e11b22] transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <Link 
              href="/cotizador" 
              onClick={closeMobileMenu}
              className="w-full py-3.5 rounded-2xl bg-[#e11b22] text-white font-black text-center text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Cotizador Inteligente 2026</span>
            </Link>
            <a 
              href="tel:+593991938754" 
              className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-center text-xs flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#e11b22]" />
              <span>Llamar: 02 500 3373 / 099 193 8754</span>
            </a>

            <div className="pt-2 flex items-center justify-center gap-4 text-slate-500 dark:text-slate-400">
              <a 
                href="https://www.facebook.com/Asesor012/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook DC Asesores"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:text-[#e11b22] transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://www.tiktok.com/@asesorseguros2?_r=1&_t=ZS-94CCdpAiPGZ" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="TikTok DC Asesores"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:text-[#e11b22] transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.64 1.25-.11 2.37-.93 2.78-2.11.23-.6.3-1.25.28-1.89.02-4.97.01-9.94.01-14.91z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/dc.asesorseguros?igsh=MXMwd2oxbWkza3hjdw%3D%3D" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram DC Asesores"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:text-[#e11b22] transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
