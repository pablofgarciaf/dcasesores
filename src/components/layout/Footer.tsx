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
 *   L1-L25   → Imports de Lucide React, DcLogo y datos oficiales de dcasesoresec.com
 *   L26-L125 → Shell de Pie de Página corporativo con oficinas, teléfono, E-E-A-T y correo ofuscado
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';
import { Phone, MapPin, Mail, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';
import { DcLogo } from '../common/DcLogo';
import { DC_COMPANY_INFO } from '../../lib/pdfGenerator';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Broker Info & Logo Oficial */}
          <div className="space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 inline-block">
              <DcLogo size="sm" variant="white" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Agencia Asesora Productora de Seguros autorizada en la República del Ecuador. 
              Cotización inteligente, comparativa multiaseguradora transparente y asesoramiento profesional en reclamos y siniestros.
            </p>
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

          {/* Col 3: Oficinas y Contacto dcasesoresec.com */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Oficinas & Canales Directos
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-300">Guayaquil:</div>
                  <div className="text-[11px] text-slate-400">{DC_COMPANY_INFO.offices[0]}</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-300">Samborondón:</div>
                  <div className="text-[11px] text-slate-400">{DC_COMPANY_INFO.offices[1]}</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>PBX: {DC_COMPANY_INFO.phones}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                {/* Correo ofuscado contra bots/scrapers */}
                <span>
                  <span>contacto</span>
                  <span className="text-red-400">&#64;</span>
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
            <span>Términos y Condiciones</span>
            <span>Política de Privacidad</span>
            <span>Código de Ética</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
