/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — ComparisonTable.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/ComparisonTable.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Cotizador Público
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L35   → Imports de Lucide React, QuoteCard y tipos
 *   L36-L90  → Tabla Resumen con nombre de empresa y cuota mensual
 *   L91-L180 → Lista desplegable para visualizar un solo cuadro o todos
 *   L181-L280→ Renderizado dinámico de la tarjeta seleccionada o el grid
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { InsurerQuoteResult, QuoteInput } from '../../types';
import { QuoteCard } from './QuoteCard';
import { formatCurrency, formatPercent } from '../../lib/calculator';
import {
  CheckCircle2,
  FileDown,
  MessageCircle,
  ShieldAlert,
  ChevronDown,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ComparisonTableProps {
  results: InsurerQuoteResult[];
  inputData: QuoteInput;
  onSelectForPdf: (result: InsurerQuoteResult) => void;
  onDownloadAllPdf: () => void;
  onContactWhatsApp: (result: InsurerQuoteResult) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  results,
  inputData,
  onSelectForPdf,
  onDownloadAllPdf,
  onContactWhatsApp,
}) => {
  const eligibleResults = results.filter((r) => r.breakdown.elegible);
  const bestPriceResult = results.find((r) => r.isBestPrice);
  const topCoverageResult = results.find((r) => r.isTopCoverage);

  // Estado para la lista desplegable: 'all' o el id/slug de la aseguradora seleccionada
  const [selectedInsurerId, setSelectedInsurerId] = useState<string>(
    eligibleResults[0]?.insurer.id || 'all'
  );
  const [filterEligibleOnly, setFilterEligibleOnly] = useState(true);

  const displayedList = filterEligibleOnly ? eligibleResults : results;

  // Aseguradora única seleccionada si no está en 'all'
  const activeSingleResult = displayedList.find(
    (r) => r.insurer.id === selectedInsurerId
  ) || displayedList[0];

  return (
    <div className="space-y-8">
      
      {/* Banner Resumen Métrico con Descarga de TODAS las Proformas */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-red-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-xs font-semibold text-red-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Cotización Inteligente Multicompañía</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {inputData.vehicleBrandModel} ({inputData.vehicleYear})
            </h2>
            <p className="text-xs text-slate-300 mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>
                Valor Comercial: <strong className="text-white font-mono text-sm">{formatCurrency(inputData.vehicleValue)}</strong>
              </span>
              <span>•</span>
              <span>
                Circulación: <strong className="text-white">{inputData.city}</strong>
              </span>
              <span>•</span>
              <span>
                Disponibles: <strong className="text-emerald-400">{eligibleResults.length} Aseguradoras</strong>
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Mejor Precio Badge */}
            {bestPriceResult && (
              <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-white/15 text-left sm:text-right">
                <span className="text-[11px] text-amber-300 font-bold block uppercase tracking-wider">
                  ★ Cuota Más Baja
                </span>
                <span className="text-xl font-extrabold font-mono text-white">
                  {formatCurrency(bestPriceResult.breakdown.cuotaMensual)}
                  <span className="text-xs font-normal text-slate-300">/mes</span>
                </span>
              </div>
            )}

            {/* BOTÓN PRINCIPAL: Descargar TODAS las Proformas */}
            <button
              type="button"
              onClick={onDownloadAllPdf}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs shadow-lg hover:shadow-red-600/30 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Todas las Proformas (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. TABLA RESUMEN CON NOMBRE DE EMPRESA Y VALOR MENSUAL
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-600" />
              Tabla Resumen Comparativa de Aseguradoras
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparativa de cuota mensual a 12 pagos, prima total anual e impuestos de ley.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-slate-600 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={filterEligibleOnly}
              onChange={(e) => setFilterEligibleOnly(e.target.checked)}
              className="rounded border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>Mostrar únicamente asegurables</span>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Compañía Aseguradora</th>
                <th className="py-3.5 px-4 text-right">Cuota Mensual (12 pagos)</th>
                <th className="py-3.5 px-4 text-right">Prima Total Anual</th>
                <th className="py-3.5 px-4 text-center">Tasa %</th>
                <th className="py-3.5 px-4 text-right">Cobertura RC</th>
                <th className="py-3.5 px-4">Deducible Choque</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayedList.map((item) => {
                const { insurer, breakdown } = item;
                const isSelected = selectedInsurerId === insurer.id;

                return (
                  <tr
                    key={insurer.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-red-50/50' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Nombre de la Empresa y Badges */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-[11px] shrink-0 shadow-2xs"
                          style={{ backgroundColor: insurer.color }}
                        >
                          {insurer.logoText}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <span>{insurer.name}</span>
                            {item.isBestPrice && (
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                                ★ Mejor Precio
                              </span>
                            )}
                            {item.isTopCoverage && (
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                🛡 Mayor RC
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Antigüedad máx: {insurer.maxVehicleAge} años
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Valor Mensual (Destacado) */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {breakdown.elegible ? (
                        <div className="font-extrabold text-base text-red-600 font-mono">
                          {formatCurrency(breakdown.cuotaMensual)}
                          <span className="text-[10px] font-normal text-slate-500"> /mes</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No asegurable</span>
                      )}
                    </td>

                    {/* Prima Total Anual */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                      {breakdown.elegible ? formatCurrency(breakdown.primaTotalAnual) : '—'}
                    </td>

                    {/* Tasa */}
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-700">
                      {breakdown.elegible ? formatPercent(breakdown.tasaAplicada) : '—'}
                    </td>

                    {/* Límite RC */}
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {breakdown.elegible ? formatCurrency(breakdown.responsabilidadCivil) : '—'}
                    </td>

                    {/* Deducible Choque */}
                    <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs">
                      {insurer.conditions.choque}
                    </td>

                    {/* Acciones */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {breakdown.elegible ? (
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Ver Cuadro */}
                          <button
                            type="button"
                            onClick={() => setSelectedInsurerId(insurer.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                            title="Ver cuadro detallado de esta aseguradora"
                          >
                            Ver Cuadro
                          </button>

                          {/* Descargar Proforma Individual */}
                          <button
                            type="button"
                            onClick={() => onSelectForPdf(item)}
                            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Descargar proforma en PDF de esta aseguradora"
                          >
                            <FileDown className="w-4 h-4 text-red-600" />
                          </button>

                          {/* Contratar WhatsApp */}
                          <button
                            type="button"
                            onClick={() => onContactWhatsApp(item)}
                            className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                            title="Contratar por WhatsApp con asesor"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-rose-500">Excede edad</span>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CUADROS POR ASEGURADORA CON LISTA DESPLEGABLE
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        
        {/* Barra del Selector Desplegable */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              Cuadros Detallados por Aseguradora
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Usa la lista desplegable para visualizar un solo cuadro a la vez o todos simultáneamente.
            </p>
          </div>

          {/* LISTA DESPLEGABLE */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Visualizar cuadro:
            </span>
            <div className="relative min-w-[220px]">
              <select
                value={selectedInsurerId}
                onChange={(e) => setSelectedInsurerId(e.target.value)}
                className="w-full pl-3.5 pr-9 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 shadow-xs focus:ring-2 focus:ring-red-600 focus:border-red-600 appearance-none cursor-pointer"
              >
                <option value="all">Ver Todos los Cuadros (Grid Completo)</option>
                <optgroup label="Cuadro Individual por Aseguradora:">
                  {displayedList.map((r) => (
                    <option key={r.insurer.id} value={r.insurer.id}>
                      {r.insurer.name} {r.isBestPrice ? '★ (Mejor Precio)' : ''}
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* RENDERIZADO: UN SOLO CUADRO A LA VEZ vs TODOS */}
        {selectedInsurerId === 'all' ? (
          // Vista de todos los cuadros
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {displayedList.map((result) => (
              <QuoteCard
                key={result.insurer.id}
                result={result}
                inputData={inputData}
                onSelectForPdf={onSelectForPdf}
                onContactWhatsApp={onContactWhatsApp}
              />
            ))}
          </div>
        ) : activeSingleResult ? (
          // Vista de UN SOLO CUADRO A LA VEZ
          <div className="max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Visualizando cuadro único:</span>
              <button
                type="button"
                onClick={() => setSelectedInsurerId('all')}
                className="text-red-600 font-semibold hover:underline cursor-pointer"
              >
                Ver todos los cuadros
              </button>
            </div>
            <QuoteCard
              result={activeSingleResult}
              inputData={inputData}
              onSelectForPdf={onSelectForPdf}
              onContactWhatsApp={onContactWhatsApp}
            />
          </div>
        ) : null}

      </div>

      {displayedList.length === 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center text-amber-900">
          <ShieldAlert className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <h3 className="font-bold text-base">No hay aseguradoras que cumplan los filtros actuales</h3>
          <p className="text-xs text-amber-800 mt-1 max-w-md mx-auto">
            Intenta ajustar el año del vehículo o el valor comercial asegurado en el formulario superior.
          </p>
        </div>
      )}

    </div>
  );
};
