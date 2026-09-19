/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — PdfQuoteModal.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/PdfQuoteModal.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Cotizador Público
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Imports de Lucide React, utilidades de formato y tipos
 *   L26-L65  → Formato de proforma legal y fecha de validez (15 días)
 *   L66-L230 → Modal y hoja membretada formal optimizada para impresión (window.print)
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React from 'react';
import { InsurerQuoteResult, QuoteInput } from '../../types';
import { formatCurrency, formatPercent } from '../../lib/calculator';
import { X, Printer, MessageCircle, Shield, CheckCircle, Car, FileDown, Loader2 } from 'lucide-react';
import { DcLogo } from '../common/DcLogo';
import { DC_COMPANY_INFO, buildSingleInsurerHtml, generateAndDownloadPdf } from '../../lib/pdfGenerator';

interface PdfQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: InsurerQuoteResult | null;
  inputData: QuoteInput;
  onWhatsAppContact: (result: InsurerQuoteResult) => void;
}

export const PdfQuoteModal: React.FC<PdfQuoteModalProps> = ({
  isOpen,
  onClose,
  result,
  inputData,
  onWhatsAppContact,
}) => {
  if (!isOpen || !result) return null;

  const [downloading, setDownloading] = React.useState(false);
  const { insurer, breakdown } = result;
  const quoteNumber = `DC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const quoteDate = new Date().toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      const html = buildSingleInsurerHtml(result, inputData, quoteNumber);
      const safeName = inputData.clientName.trim().replace(/\s+/g, '_').slice(0, 30);
      await generateAndDownloadPdf(html, `Proforma_${insurer.slug.toUpperCase()}_DC_Asesores_${safeName}.pdf`);
    } catch (err) {
      console.error('Error al descargar PDF:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Barra superior de herramientas (no imprimible) */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-sm">Vista de Proforma Formal de Seguro</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-semibold text-white transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generando PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Descargar PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              type="button"
              onClick={() => onWhatsAppContact(result)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contratar</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hoja de Cotización Formal (Imprimible) */}
        <div className="p-6 sm:p-10 overflow-y-auto print:p-0 print:overflow-visible space-y-6 text-slate-800 font-sans text-xs sm:text-sm">
          
          {/* Encabezado Membretado Oficial DC Asesores */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-red-700 gap-4">
            <div>
              <DcLogo size="md" />
              <div className="text-[11px] font-bold text-red-700 uppercase tracking-wider mt-1">
                Agencia Asesora Productora de Seguros • Ecuador
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {DC_COMPANY_INFO.offices[0]} • Tel: {DC_COMPANY_INFO.phones} • Web: {DC_COMPANY_INFO.websiteDisplay}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-red-50 text-red-800 border border-red-200 font-bold font-mono text-xs rounded-lg">
                PROFORMA: {quoteNumber}
              </span>
              <p className="text-xs text-slate-600 mt-1">Fecha de emisión: <strong>{quoteDate}</strong></p>
              <p className="text-[11px] text-slate-500">Validez de oferta: <strong>15 días calendario</strong></p>
              <p className="text-[10px] text-slate-400">Regulado por Superintendencia de Compañías</p>
            </div>
          </div>

          {/* Cuadro de Datos del Cliente y Vehículo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Datos del Asegurado:
              </h4>
              <p><span className="text-slate-500">Nombre:</span> <span className="font-semibold text-slate-800">{inputData.clientName}</span></p>
              <p><span className="text-slate-500">Teléfono:</span> <span className="font-semibold font-mono text-slate-800">{inputData.clientPhone}</span></p>
              <p><span className="text-slate-500">Ciudad:</span> <span className="font-semibold text-slate-800">{inputData.city}</span></p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Datos del Vehículo:
              </h4>
              <p><span className="text-slate-500">Vehículo:</span> <span className="font-semibold text-slate-800">{inputData.vehicleBrandModel}</span></p>
              <p><span className="text-slate-500">Año de Fabricación:</span> <span className="font-semibold font-mono text-slate-800">{inputData.vehicleYear}</span> ({breakdown.antiguedad} años de antigüedad)</p>
              <p><span className="text-slate-500">Suma Asegurada (VA):</span> <span className="font-bold text-slate-900 font-mono text-sm">{formatCurrency(inputData.vehicleValue)}</span></p>
            </div>
          </div>

          {/* Aseguradora y Plan Cotizado */}
          <div className="border border-sky-200 bg-sky-50/50 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                Compañía Aseguradora Seleccionada
              </span>
              <h3 className="text-lg font-bold text-slate-900">{insurer.name}</h3>
              <p className="text-xs text-slate-600">
                Límite de Responsabilidad Civil (RC): <strong className="text-slate-900 font-mono">{formatCurrency(breakdown.responsabilidadCivil)}</strong>
              </p>
            </div>

            <div className="text-center sm:text-right bg-white p-3 rounded-lg border border-sky-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 block">Plan Mensualizado (12 Cuotas)</span>
              <span className="text-2xl font-extrabold text-sky-900 font-mono">
                {formatCurrency(breakdown.cuotaMensual)}
              </span>
              <span className="text-[11px] text-slate-500 block">/ mes sin recargo</span>
            </div>
          </div>

          {/* Tabla de Desglose Actuarial y Legal */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
              Liquidación Actuarial de Impuestos y Emisión (Ley de Seguros de Ecuador):
            </h4>
            <table className="w-full text-xs font-mono border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="py-2 px-3 text-left">Concepto</th>
                  <th className="py-2 px-3 text-center">Porcentaje / Base</th>
                  <th className="py-2 px-3 text-right">Valor en USD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 px-3 text-slate-800">Prima Neta de Seguro</td>
                  <td className="py-2 px-3 text-center text-slate-600">Tasa {formatPercent(breakdown.tasaAplicada)} s/ VA</td>
                  <td className="py-2 px-3 text-right font-semibold">{formatCurrency(breakdown.primaNeta)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-800">Superintendencia de Compañías (SUPER)</td>
                  <td className="py-2 px-3 text-center text-slate-600">3.50% s/ Prima Neta</td>
                  <td className="py-2 px-3 text-right">{formatCurrency(breakdown.superCias)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-800">Seguro Social Campesino (SSC)</td>
                  <td className="py-2 px-3 text-center text-slate-600">0.50% s/ Prima Neta</td>
                  <td className="py-2 px-3 text-right">{formatCurrency(breakdown.campesino)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-800">Derechos de Emisión de Póliza</td>
                  <td className="py-2 px-3 text-center text-slate-600">Escala de Ley s/ Rango PN</td>
                  <td className="py-2 px-3 text-right">{formatCurrency(breakdown.derechosEmision)}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="py-2 px-3 text-slate-900" colSpan={2}>Subtotal de la Póliza</td>
                  <td className="py-2 px-3 text-right text-slate-900">{formatCurrency(breakdown.subtotal)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-800">Impuesto al Valor Agregado (IVA)</td>
                  <td className="py-2 px-3 text-center text-slate-600">15.00% s/ Subtotal</td>
                  <td className="py-2 px-3 text-right">{formatCurrency(breakdown.iva)}</td>
                </tr>
                <tr className="bg-sky-50 font-bold text-sky-950 text-sm">
                  <td className="py-2.5 px-3" colSpan={2}>VALOR TOTAL ANUAL A PAGAR</td>
                  <td className="py-2.5 px-3 text-right">{formatCurrency(breakdown.primaTotalAnual)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deducibles y Condiciones de Cobertura */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Deducibles y Asistencias Pactadas:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-700">
              <div>
                <strong className="text-slate-900 block">Choque / Colisión:</strong>
                <span>{insurer.conditions.choque}</span>
              </div>
              <div>
                <strong className="text-slate-900 block">Pérdida Total:</strong>
                <span>{insurer.conditions.perdidaTotal}</span>
              </div>
              <div>
                <strong className="text-slate-900 block">Servicio de Grúa:</strong>
                <span>{insurer.conditions.grua}</span>
              </div>
            </div>
          </div>

          {/* Pie de Firma y Nota Legal */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">DC Asesores de Seguros</p>
              <p>Canal Digital de Emisión • Soporte en Siniestros</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Cotización Formal Certificada</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer del modal */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 print:hidden shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Descargar Proforma</span>
          </button>
        </div>

      </div>
    </div>
  );
};
