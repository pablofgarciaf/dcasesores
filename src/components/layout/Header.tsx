'use client';
import React from 'react';
import Link from 'next/link';
import { Phone, Lock, ExternalLink } from 'lucide-react';
import { DC_COMPANY_INFO } from '../../lib/pdfGenerator';

interface HeaderProps {
  currentView?: 'cotizador' | 'admin';
  onViewChange?: (view: 'cotizador' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView = 'cotizador', onViewChange }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Oficial de DC Asesores en Seguros */}
          <Link 
            href="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="/logo.webp" 
              alt="DC Asesores en Seguros" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="hidden lg:block pl-3 border-l border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Cotizador Multicompañía
              </span>
              <span className="text-[10px] text-red-600 font-bold">
                Ecuador • Siniestros & Emisiones
              </span>
            </div>
          </Link>

          {/* Links de navegación */}
          <nav className="hidden md:flex items-center gap-6 font-bold text-slate-700 text-sm">
            <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
            <Link href="/cotizador" className="text-red-600">Cotizador</Link>
            <Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link>
          </nav>

          {/* Contacto Directo dcasesoresec.com y Switch a Admin */}
          <div className="flex items-center gap-3">
            
            {/* Teléfono / WhatsApp oficial */}
            <a
              href={`https://wa.me/${DC_COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Hola DC Asesores, necesito información sobre seguros vehiculares.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>{DC_COMPANY_INFO.whatsappDisplay}</span>
            </a>

            {/* Enlace al sitio web oficial */}
            <a
              href={DC_COMPANY_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
              title="Visitar sitio corporativo"
            >
              <span>{DC_COMPANY_INFO.websiteDisplay}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Link al Panel de Administración */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all duration-200 active:scale-95 cursor-pointer"
              title="Acceder al CMS de Tasas y CRM"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Panel</span> Admin
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
