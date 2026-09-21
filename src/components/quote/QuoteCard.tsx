/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — QuoteCard.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/QuoteCard.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Cotizador Público
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L30   → Imports de Lucide React, utilidades de formato y tipos
 *   L31-L90  → Formateo de mensaje para WhatsApp y estados de acordeón actuarial
 *   L91-L280 → Card visual con insignias Mejor Precio/Mayor Cobertura, deducibles y CTAs
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import {
  Shield,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileText,
  AlertCircle,
  Wrench,
  Truck,
  CarFront,
  HelpCircle,
} from 'lucide-react';
import { InsurerQuoteResult, QuoteInput } from '../../types';
import { formatCurrency, formatPercent } from '../../lib/calculator';

interface QuoteCardProps {
  result: InsurerQuoteResult;
  inputData: QuoteInput;
  onSelectForPdf: (result: InsurerQuoteResult) => void;
  onContactWhatsApp: (result: InsurerQuoteResult) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  result,
  inputData,
  onSelectForPdf,
  onContactWhatsApp,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { insurer, breakdown, isBestPrice, isTopCoverage } = result;

  // Render for non-eligible carrier
  if (!breakdown.elegible) {
    return (
      <div className="bg-slate-50/80 rounded-2xl border border-dashed border-slate-300 p-5 opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">
              {insurer.logoText.slice(0, 3)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-700">{insurer.name}</h3>
              <span className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                No asegurable
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Máx. {insurer.maxVehicleAge} años
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
          {breakdown.motivoNoElegible}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden relative ${
        isBestPrice
          ? 'border-amber-400 shadow-md ring-2 ring-amber-400/20'
          : isTopCoverage
          ? 'border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
          : 'border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300'
      }`}
    >
      {/* Insignias Flotantes */}
      <div className="flex items-center gap-1.5 absolute top-3.5 right-4 z-10">
        {isBestPrice && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs tracking-tight">
            <Award className="w-3.5 h-3.5" />
            Mejor Precio
          </span>
        )}
        {isTopCoverage && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs tracking-tight">
            <Shield className="w-3.5 h-3.5" />
            Mayor Cobertura RC
          </span>
        )}
      </div>

      <div className="p-6">
        
        {/* Cabecera de Tarjeta: Aseguradora y Tasas */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs ${
                insurer.slug === 'latina' ? 'bg-[#D9222A]' :
                insurer.slug === 'alianza' ? 'bg-[#005596]' :
                insurer.slug === 'hispana' ? 'bg-[#0A2540]' :
                insurer.slug === 'vaz' ? 'bg-[#E06D10]' :
                insurer.slug === 'sweaden' ? 'bg-[#004B87]' :
                insurer.slug === 'privilegio' ? 'bg-[#2A6F97]' :
                insurer.slug === 'atlantida' ? 'bg-[#006699]' :
                insurer.slug === 'zurich' ? 'bg-[#1B365D]' :
                insurer.slug === 'mapfre' ? 'bg-[#D8232A]' :
                insurer.slug === 'bmi' ? 'bg-[#b91c1c]' :
                'bg-slate-900'
              }`}
            >
              {insurer.logoText.slice(0, 4)}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 leading-tight">
                {insurer.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                  Tasa: {formatPercent(breakdown.tasaAplicada)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  RC: {formatCurrency(breakdown.responsabilidadCivil)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque Central: Precios Destacados */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                12 Cuotas Mensuales
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {formatCurrency(breakdown.cuotaMensual)}
                </span>
                <span className="text-xs font-medium text-slate-500">/ mes</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-medium text-slate-500">
                Prima Total Anual (IVA 15%)
              </span>
              <div className="text-sm sm:text-base font-bold text-slate-700 font-mono">
                {formatCurrency(breakdown.primaTotalAnual)}
              </div>
            </div>
          </div>
        </div>

        {/* Resumen de Condiciones y Deducibles */}
        <div className="space-y-2.5 mb-5 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <CarFront className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Choque: </span>
              <span>{insurer.conditions.choque}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-700">
            <Wrench className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Pérdida Total: </span>
              <span>{insurer.conditions.perdidaTotal}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-700">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Grúa: </span>
              <span>{insurer.conditions.grua}</span>
            </div>
          </div>
        </div>

        {/* Acordeón: Desglose Actuarial Paso a Paso */}
        <div className="border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors py-1 cursor-pointer"
          >
            <span>Ver cálculo actuarial de impuestos e intermediación</span>
            {showBreakdown ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showBreakdown && (
            <div className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Valor Comercial Asegurado:</span>
                <span>{formatCurrency(breakdown.valorAsegurado)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Prima Neta ({breakdown.tasaAplicada}%):</span>
                <span>{formatCurrency(breakdown.primaNeta)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Superintendencia Cías. (3.50%):</span>
                <span>{formatCurrency(breakdown.superCias)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Seguro Social Campesino (0.50%):</span>
                <span>{formatCurrency(breakdown.campesino)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Derechos de Emisión (Ley):</span>
                <span>{formatCurrency(breakdown.derechosEmision)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-200">
                <span>Subtotal Póliza:</span>
                <span>{formatCurrency(breakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>IVA Vigente Ecuador (15.00%):</span>
                <span>{formatCurrency(breakdown.iva)}</span>
              </div>
              <div className="flex justify-between font-bold text-sky-900 pt-1 border-t border-slate-200 text-sm">
                <span>Prima Total Anual:</span>
                <span>{formatCurrency(breakdown.primaTotalAnual)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Acciones de Conversión */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onContactWhatsApp(result)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contratar por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectForPdf(result)}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Descargar Proforma</span>
          </button>
        </div>

      </div>
    </div>
  );
};
