/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — Footer.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/layout/Footer.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Layout & Navegación Global
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Layout
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L30   → Imports, redes sociales oficiales y datos corporativos
 *   L31-L150 → Shell de Pie de Página corporativo con logo oficial, oficinas, E-E-A-T
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-20
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Mail, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';
import { DC_COMPANY_INFO } from '../../lib/pdfGenerator';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t-4 border-[#e11b22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Broker Info & Logo Oficial */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <img 
                src="/logo.webp" 
                alt="DC Asesores en Seguros" 
                className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col border-l border-slate-700 pl-3">
                <span className="text-base font-black tracking-tight text-white leading-none">
                  DC ASESORES
                </span>
                <span className="text-[10px] font-extrabold tracking-widest text-[#e11b22] uppercase mt-1 leading-tight">
                  Asesores en Seguros
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Agencia Asesora Productora de Seguros autorizada en la República del Ecuador. 
              Cotización inteligente, comparativa multiaseguradora transparente y asesoramiento profesional en reclamos y siniestros 24/7.
            </p>

            {/* Redes Sociales Oficiales */}
            <div className="pt-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Canales Oficiales
              </span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.facebook.com/Asesor012/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook DC Asesores"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#e11b22] hover:text-white border border-white/20 text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@asesorseguros2?_r=1&_t=ZS-94CCdpAiPGZ" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="TikTok DC Asesores"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#e11b22] hover:text-white border border-white/20 text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.64 1.25-.11 2.37-.93 2.78-2.11.23-.6.3-1.25.28-1.89.02-4.97.01-9.94.01-14.91z"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/dc.asesorseguros?igsh=MXMwd2oxbWkza3hjdw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram DC Asesores"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#e11b22] hover:text-white border border-white/20 text-white transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{DC_COMPANY_INFO.regulation}</span>
            </div>
          </div>

          {/* Col 2: Aseguradoras Autorizadas */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Compañías Aseguradoras
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Alianza</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Latina Seguros</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Hispana de Seguros</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Sweaden Seguros</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Zurich Ecuador</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Mapfre Seguros</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Seguros Privilegio</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Seguros Atlántida</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>ADS Seguros</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>Vaz Seguros</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span>BMI del Ecuador</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Oficinas y Contacto Oficial */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Oficinas & Contacto
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e11b22] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Oficina Central Quito:</div>
                  <div className="text-[11px] text-slate-400">Sector La Carolina / República de El Salvador</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e11b22] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-300">Guayaquil:</div>
                  <div className="text-[11px] text-slate-400">{DC_COMPANY_INFO.offices[0]}</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e11b22] shrink-0" />
                <a href="tel:025003373" className="hover:text-white transition-colors">
                  02 500 3373
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e11b22] font-bold text-xs">WA:</span>
                <a 
                  href="https://wa.me/593991938754" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  +593 99 193 8754 (24/7)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e11b22] shrink-0" />
                {/* Correo ofuscado contra bots/scrapers */}
                <span>
                  <span>info</span>
                  <span className="text-[#e11b22]">&#64;</span>
                  <span>dcasesoresec.com</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparencia Fiscal & Web Oficial */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Sitio Web & Regulación
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cálculo con la Ley de Seguros del Ecuador: SUPER (3.50%), Seguro Social Campesino (0.50%), Derechos de Emisión e IVA al 15.00%.
            </p>
            <div className="pt-2">
              <a
                href={DC_COMPANY_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors border border-white/10"
              >
                <span>Visitar {DC_COMPANY_INFO.websiteDisplay}</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              </a>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Valores expresados en Dólares Americanos (USD).
            </div>
          </div>

        </div>

        {/* Línea inferior */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {DC_COMPANY_INFO.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terminos-y-condiciones" className="hover:text-slate-300 transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/admin" className="hover:text-slate-300 transition-colors">
              Panel Admin
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
