'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white/90 backdrop-blur-xl shadow-xs sticky top-0 z-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.webp" alt="DC Asesores" className="h-10 md:h-12 object-contain" />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex gap-8 items-center font-bold text-slate-800 text-sm">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === '/' ? 'text-[#e11b22]' : 'hover:text-[#e11b22]'}`}
          >
            Inicio
          </Link>
          <Link href="/#servicios" className="hover:text-[#e11b22] transition-colors">
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
            className={`px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform ${
              pathname === '/cotizador'
                ? 'bg-[#e11b22] text-white shadow-red-600/30'
                : 'bg-slate-900 text-white hover:bg-[#e11b22]'
            }`}
          >
            Cotizador Inteligente
          </Link>
        </nav>
      </div>
    </header>
  );
}
