/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — TrustSignals.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/TrustSignals.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Cotizador Público
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L15   → Imports de Lucide React
 *   L16-L70  → Tarjetas de señales de confianza E-E-A-T e insignias actuariales
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';
import { ShieldCheck, Percent, Clock, Award, FileText } from 'lucide-react';

export const TrustSignals: React.FC = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: '+10 Aseguradoras Líderes',
      desc: 'Alianza, Hispana, Sweaden, Zurich, Mapfre, Privilegio, Atlántida y más.',
    },
    {
      icon: Percent,
      title: 'IVA 15% y SUPER Exacto',
      desc: 'Fórmulas auditadas según la Ley de Seguros del Ecuador sin costos ocultos.',
    },
    {
      icon: Clock,
      title: 'Emisión y Pago en 12 Cuotas',
      desc: 'Póliza mensualizada en 12 pagos directos o financiamiento con tarjeta.',
    },
    {
      icon: Award,
      title: 'Acompañamiento en Siniestros',
      desc: 'Gestoría profesional desde la grúa hasta la entrega del taller.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3.5 hover:border-red-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
