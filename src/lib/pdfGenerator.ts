/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — pdfGenerator.ts
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/lib/pdfGenerator.ts
 * 🏷️ Type: PDF Export Engine (jsPDF + html2canvas)
 * 📦 Module: Core Compartido Actuarial
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Motor Actuarial & Datos
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L40   → Imports de jsPDF, html2canvas y datos corporativos de dcasesoresec.com
 *   L41-L90  → Helper de renderizado de Logo Oficial vectorial inline
 *   L91-L240 → Generador de HTML de proforma individual de lujo
 *   L241-L420→ Generador de HTML de comparativo consolidado de todas las aseguradoras
 *   L421-L510→ generateAndDownloadPdf (exportación nativa a archivo .pdf de alta resolución)
 *   L511-L550→ downloadOrPrintPdf (fallback con iframe de impresión)
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InsurerQuoteResult, QuoteInput } from '../types';
import { formatCurrency, formatPercent } from './calculator';

// Información corporativa oficial extraída de https://dcasesoresec.com/
export const DC_COMPANY_INFO = {
  name: 'DC ASESORES EN SEGUROS',
  legalName: 'DC - Asesores de Seguros Cía. Ltda.',
  website: 'https://dcasesoresec.com',
  websiteDisplay: 'dcasesoresec.com',
  phones: '(04) 371-6612 / 099 812 8813',
  whatsapp: '593998128813',
  whatsappDisplay: '099 812 8813',
  email: 'contacto@dcasesoresec.com',
  offices: [
    'Guayaquil: C.C. Mall del Sol, Torre B, Piso 4, Of. 402',
    'Samborondón: Km 9.5 Vía a Samborondón, Ciudad Celeste',
    'Quito: Av. República del Salvador y Shirys',
  ],
  regulation: 'Agencia Asesora Productora de Seguros autorizada por la Superintendencia de Compañías, Valores y Seguros del Ecuador',
};

/**
 * Logotipo vectorial de DC Asesores renderizado inline para máxima fidelidad
 * en canvas y compatibilidad total con html2canvas y exportación PDF.
 */
function renderInlineLogoSvg(): string {
  return `
  <svg viewBox="0 0 320 120" width="180" height="68" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
    <defs>
      <linearGradient id="dcRedPdf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#991B1B" />
        <stop offset="45%" stop-color="#DC2626" />
        <stop offset="100%" stop-color="#EF4444" />
      </linearGradient>
    </defs>
    <!-- Letra D -->
    <path d="M 28 15 L 68 15 L 68 95 L 28 95 Z" fill="#1E293B" />
    <path d="M 68 15 C 115 15, 142 38, 142 62 C 142 80, 122 95, 80 95 L 68 95 L 68 76 C 96 76, 110 68, 110 56 C 110 42, 94 34, 68 34 Z" fill="url(#dcRedPdf)" />
    <path d="M 68 34 C 92 34, 108 42, 108 55 C 108 68, 92 76, 68 76 Z" fill="#FFFFFF" />
    <!-- Letra C -->
    <path d="M 235 22 C 215 12, 182 12, 158 32 C 130 54, 130 84, 156 102 C 182 120, 222 116, 246 96 L 220 78 C 204 90, 182 92, 168 82 C 152 70, 152 50, 168 38 C 182 28, 202 30, 218 38 Z" fill="#1E293B" />
    <path d="M 152 68 C 152 86, 172 108, 204 108 C 224 108, 240 100, 246 95 L 230 76 C 220 84, 210 88, 198 88 C 180 88, 168 78, 164 68 Z" fill="url(#dcRedPdf)" />
    <!-- Texto Marca -->
    <text x="140" y="118" text-anchor="middle" fill="#0F172A" font-size="17" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-style="italic" letter-spacing="2px">ASESORES EN SEGUROS</text>
  </svg>
  `;
}

/**
 * Genera el documento HTML completo de una proforma individual para una aseguradora.
 */
export function buildSingleInsurerHtml(
  result: InsurerQuoteResult,
  input: QuoteInput,
  quoteId: string = `DC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
): string {
  const { insurer, breakdown } = result;
  const quoteDate = new Date().toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Proforma Formal - ${insurer.name} - DC Asesores</title>
  <style>
    @page { size: A4 portrait; margin: 10mm 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      font-size: 11.5px;
      line-height: 1.4;
    }
    .header-table { width: 100%; border-bottom: 2.5px solid #b91c1c; padding-bottom: 12px; margin-bottom: 14px; }
    .company-sub { font-size: 10px; color: #b91c1c; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 3px; }
    .company-meta { font-size: 9.5px; color: #475569; line-height: 1.35; margin-top: 4px; }
    .proforma-tag { background: #fef2f2; border: 1.5px solid #fecaca; color: #991b1b; padding: 6px 12px; border-radius: 6px; font-weight: 800; font-family: monospace; font-size: 12px; text-align: right; display: inline-block; }
    .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px; margin: 14px 0 6px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; }
    .info-grid { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .info-grid td { padding: 5px 8px; border: 1px solid #e2e8f0; font-size: 10.5px; }
    .info-label { font-weight: 700; color: #475569; background: #f8fafc; width: 22%; }
    .calc-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10.5px; }
    .calc-table th { background: #0f172a; color: #ffffff; padding: 6px 10px; text-align: left; font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.5px; }
    .calc-table td { padding: 5.5px 10px; border-bottom: 1px solid #e2e8f0; }
    .highlight-row { background: #fef2f2; font-weight: 800; color: #991b1b; font-size: 12px; }
    .badge-price { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; padding: 2px 7px; border-radius: 9999px; font-weight: 800; font-size: 9.5px; }
    .badge-coverage { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 2px 7px; border-radius: 9999px; font-weight: 800; font-size: 9.5px; }
    .footer-box { margin-top: 18px; padding-top: 10px; border-top: 1px solid #cbd5e1; font-size: 9.5px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  
  <!-- Encabezado con Logo y Datos Oficiales -->
  <table class="header-table">
    <tr>
      <td style="width: 55%; vertical-align: top;">
        ${renderInlineLogoSvg()}
        <div class="company-sub">Agencia Asesora Productora de Seguros • Ecuador</div>
        <div class="company-meta">
          <strong>Oficinas:</strong> ${DC_COMPANY_INFO.offices[0]}<br>
          ${DC_COMPANY_INFO.offices[1]}<br>
          <strong>PBX:</strong> ${DC_COMPANY_INFO.phones} • <strong>Web:</strong> ${DC_COMPANY_INFO.websiteDisplay}
        </div>
      </td>
      <td style="width: 45%; text-align: right; vertical-align: top;">
        <div class="proforma-tag">PROFORMA: ${quoteId}</div>
        <div style="font-size: 10.5px; color: #334155; margin-top: 5px;">Fecha de emisión: <strong>${quoteDate}</strong></div>
        <div style="font-size: 10px; color: #64748b;">Validez de la oferta: <strong>15 días calendario</strong></div>
        <div style="font-size: 9px; color: #94a3b8; margin-top: 4px;">Superintendencia de Compañías, Valores y Seguros</div>
      </td>
    </tr>
  </table>

  <!-- 1. Datos del Solicitante y Vehículo -->
  <div class="section-title">1. Resumen del Asegurado y Especificaciones Vehiculares</div>
  <table class="info-grid">
    <tr>
      <td class="info-label">Asegurado / Cliente:</td>
      <td><strong>${input.clientName}</strong></td>
      <td class="info-label">Teléfono / WhatsApp:</td>
      <td>${input.clientPhone}</td>
    </tr>
    <tr>
      <td class="info-label">Vehículo Asegurado:</td>
      <td><strong>${input.vehicleBrandModel}</strong></td>
      <td class="info-label">Año de Fabricación:</td>
      <td>${input.vehicleYear} (${breakdown.antiguedad} años de antigüedad)</td>
    </tr>
    <tr>
      <td class="info-label">Ciudad de Circulación:</td>
      <td>${input.city} (Ecuador)</td>
      <td class="info-label">Valor Comercial Asegurado:</td>
      <td><strong style="color: #b91c1c; font-size: 12.5px;">${formatCurrency(input.vehicleValue)}</strong></td>
    </tr>
  </table>

  <!-- 2. Aseguradora Seleccionada -->
  <div class="section-title">2. Compañía Aseguradora y Condiciones de Cobertura</div>
  <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; margin-bottom: 12px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 15px; font-weight: 800; color: #0f172a;">${insurer.name}</span>
        ${result.isBestPrice ? '<span class="badge-price" style="margin-left: 6px;">★ MEJOR PRECIO</span>' : ''}
        ${result.isTopCoverage ? '<span class="badge-coverage" style="margin-left: 4px;">🛡 MAYOR COBERTURA RC</span>' : ''}
        <div style="font-size: 10px; color: #475569; margin-top: 2px;">
          Límite de Responsabilidad Civil (RC): <strong>${formatCurrency(breakdown.responsabilidadCivil)}</strong> • Tasa Comercial Aplicada: <strong>${formatPercent(breakdown.tasaAplicada)}</strong>
        </div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 9.5px; color: #64748b; text-transform: uppercase;">Cuota Mensual (12p):</span><br>
        <strong style="font-size: 18px; color: #0f172a; font-family: monospace;">${formatCurrency(breakdown.cuotaMensual)}</strong>
      </div>
    </div>
  </div>

  <!-- 3. Desglose Actuarial Completo -->
  <div class="section-title">3. Liquidación Económica y Desglose de Ley (Ecuador)</div>
  <table class="calc-table">
    <thead>
      <tr>
        <th>Concepto Liquidado</th>
        <th style="text-align: center; width: 25%;">Base Imponible / Tasa</th>
        <th style="text-align: right; width: 25%;">Valor (USD)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Prima Neta Anual</strong></td>
        <td style="text-align: center;">${formatCurrency(input.vehicleValue)} × ${formatPercent(breakdown.tasaAplicada)}</td>
        <td style="text-align: right; font-weight: 700;">${formatCurrency(breakdown.primaNeta)}</td>
      </tr>
      <tr>
        <td>Contribución Superintendencia de Cías. (SUPER)</td>
        <td style="text-align: center;">3.50% s/ Prima Neta</td>
        <td style="text-align: right;">${formatCurrency(breakdown.superCias)}</td>
      </tr>
      <tr>
        <td>Seguro Social Campesino (SSC)</td>
        <td style="text-align: center;">0.50% s/ Prima Neta</td>
        <td style="text-align: right;">${formatCurrency(breakdown.campesino)}</td>
      </tr>
      <tr>
        <td>Derechos de Emisión de Póliza</td>
        <td style="text-align: center;">Escala Oficial Regulada</td>
        <td style="text-align: right;">${formatCurrency(breakdown.derechosEmision)}</td>
      </tr>
      <tr style="background: #f8fafc; font-weight: 700;">
        <td><strong>Subtotal Imponible</strong></td>
        <td style="text-align: center;">Suma de Tasas e Impuestos Base</td>
        <td style="text-align: right;">${formatCurrency(breakdown.subtotal)}</td>
      </tr>
      <tr>
        <td>Impuesto al Valor Agregado (IVA)</td>
        <td style="text-align: center;">15.00% s/ Subtotal</td>
        <td style="text-align: right;">${formatCurrency(breakdown.iva)}</td>
      </tr>
      <tr class="highlight-row">
        <td>PRIMA TOTAL ANUAL (FACTURADA)</td>
        <td style="text-align: center;">Pago Único de Contado</td>
        <td style="text-align: right; font-size: 13px;">${formatCurrency(breakdown.primaTotalAnual)}</td>
      </tr>
      <tr style="background: #f1f5f9; font-weight: 800; color: #0f172a;">
        <td>CUOTA FINANCIADA EN 12 PAGOS MENSUALES</td>
        <td style="text-align: center;">12 Cuotas sin Recargo Financiero</td>
        <td style="text-align: right; font-size: 13px; color: #b91c1c;">${formatCurrency(breakdown.cuotaMensual)} / mes</td>
      </tr>
    </tbody>
  </table>

  <!-- 4. Deducibles y Condiciones -->
  <div class="section-title">4. Deducibles Oficiales y Asistencias Incluidas</div>
  <table class="info-grid">
    <tr>
      <td class="info-label">Pérdida Parcial / Choque:</td>
      <td>${insurer.conditions.choque}</td>
    </tr>
    <tr>
      <td class="info-label">Pérdida Total (Robo / Daño):</td>
      <td>${insurer.conditions.perdidaTotal}</td>
    </tr>
    <tr>
      <td class="info-label">Servicio de Grúa y Auxilio:</td>
      <td>${insurer.conditions.grua}</td>
    </tr>
    <tr>
      <td class="info-label">Vehículo Sustituto:</td>
      <td>${insurer.conditions.autoSustituto}</td>
    </tr>
    <tr>
      <td class="info-label">Amparo Patrimonial:</td>
      <td>${insurer.conditions.amparoPatrimonial}</td>
    </tr>
    <tr>
      <td class="info-label">Red de Talleres:</td>
      <td>${insurer.conditions.talleresAutorizados}</td>
    </tr>
  </table>

  <!-- 5. Formas de Pago y Firma -->
  <div class="section-title">5. Modalidades de Pago y Firma de Aprobación</div>
  <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
    <tr>
      <td style="width: 60%; vertical-align: top; font-size: 9.5px; color: #475569; padding-right: 15px;">
        <strong>Facilidades de Pago:</strong><br>
        • 12 cuotas mensuales con débito bancario o tarjeta de crédito (Visa, Mastercard, Diners, Amex).<br>
        • Transferencia directa a cuentas corporativas de la aseguradora.<br>
        • Acompañamiento legal y peritaje exclusivo sin costo adicional en caso de siniestro.
      </td>
      <td style="width: 40%; text-align: center; vertical-align: bottom; border-top: 1px solid #0f172a; padding-top: 8px;">
        <strong style="font-size: 10.5px; color: #0f172a;">DC ASESORES EN SEGUROS</strong><br>
        <span style="font-size: 9px; color: #64748b;">Departamento Actuarial y de Suscripción</span><br>
        <span style="font-size: 8.5px; color: #94a3b8;">Oficinas Guayaquil • Samborondón • Quito</span>
      </td>
    </tr>
  </table>

  <!-- Pie de Página Corporativo -->
  <div class="footer-box">
    ${DC_COMPANY_INFO.legalName} • ${DC_COMPANY_INFO.regulation}<br>
    Matriz: ${DC_COMPANY_INFO.offices[0]} • Sucursal: ${DC_COMPANY_INFO.offices[1]} • PBX: ${DC_COMPANY_INFO.phones} • Web: ${DC_COMPANY_INFO.websiteDisplay}
  </div>

</body>
</html>
  `;
}

/**
 * Genera el documento HTML comparativo consolidado de TODAS las aseguradoras.
 */
export function buildAllInsurersHtml(
  quotes: InsurerQuoteResult[],
  input: QuoteInput,
  quoteId: string = `DC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
): string {
  const quoteDate = new Date().toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const eligibleQuotes = quotes.filter((q) => q.breakdown.elegible);

  const summaryRows = eligibleQuotes
    .map((q) => {
      return `
        <tr>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0;">
            <strong>${q.insurer.name}</strong>
            ${q.isBestPrice ? '<span style="background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 9999px; font-size: 8.5px; font-weight: 800; margin-left: 4px;">★ MEJOR PRECIO</span>' : ''}
            ${q.isTopCoverage ? '<span style="background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 9999px; font-size: 8.5px; font-weight: 800; margin-left: 4px;">🛡 MAYOR RC</span>' : ''}
          </td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 800; color: #0f172a; font-family: monospace; font-size: 12px;">
            ${formatCurrency(q.breakdown.cuotaMensual)}
          </td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700; color: #334155; font-family: monospace;">
            ${formatCurrency(q.breakdown.primaTotalAnual)}
          </td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 600;">
            ${formatPercent(q.breakdown.tasaAplicada)}
          </td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #475569;">
            ${formatCurrency(q.breakdown.responsabilidadCivil)}
          </td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e2e8f0; font-size: 9px; color: #475569;">
            ${q.insurer.conditions.choque}
          </td>
        </tr>
      `;
    })
    .join('');

  const detailCards = eligibleQuotes
    .map((q) => {
      const { insurer, breakdown } = q;
      return `
        <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; margin-bottom: 12px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; margin-bottom: 6px;">
            <div>
              <strong style="font-size: 13px; color: #0f172a;">${insurer.name}</strong>
              <span style="font-size: 10px; color: #64748b; margin-left: 8px;">Tasa: <strong>${formatPercent(breakdown.tasaAplicada)}</strong> | RC: <strong>${formatCurrency(breakdown.responsabilidadCivil)}</strong></span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 9px; color: #64748b; text-transform: uppercase;">12 Cuotas Mensuales:</span>
              <strong style="font-size: 15px; color: #b91c1c; font-family: monospace; margin-left: 6px;">${formatCurrency(breakdown.cuotaMensual)} / mes</strong>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; font-family: monospace;">
            <tr style="background: #f8fafc;">
              <td style="padding: 3px 6px;">Prima Neta: <strong>${formatCurrency(breakdown.primaNeta)}</strong></td>
              <td style="padding: 3px 6px;">SUPER (3.5%): <strong>${formatCurrency(breakdown.superCias)}</strong></td>
              <td style="padding: 3px 6px;">SSC (0.5%): <strong>${formatCurrency(breakdown.campesino)}</strong></td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3px 6px;">Emisión: <strong>${formatCurrency(breakdown.derechosEmision)}</strong></td>
              <td style="padding: 3px 6px;">Subtotal: <strong>${formatCurrency(breakdown.subtotal)}</strong></td>
              <td style="padding: 3px 6px;">IVA (15%): <strong>${formatCurrency(breakdown.iva)}</strong></td>
            </tr>
            <tr style="background: #fef2f2; font-weight: 800; color: #991b1b;">
              <td colspan="2" style="padding: 4px 6px;">PRIMA TOTAL ANUAL FACTURADA:</td>
              <td style="text-align: right; padding: 4px 6px; font-size: 11px;">${formatCurrency(breakdown.primaTotalAnual)}</td>
            </tr>
          </table>

          <div style="font-size: 9px; color: #475569; margin-top: 5px; background: #f8fafc; padding: 5px; border-radius: 4px;">
            <strong>Deducibles:</strong> Choque: ${insurer.conditions.choque} | P. Total: ${insurer.conditions.perdidaTotal} | Grúa: ${insurer.conditions.grua}
          </div>
        </div>
      `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Comparativa Multicompañía de Seguros - DC Asesores</title>
  <style>
    @page { size: A4 portrait; margin: 10mm 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 11px;
      line-height: 1.35;
    }
    .header-table { width: 100%; border-bottom: 2.5px solid #b91c1c; padding-bottom: 10px; margin-bottom: 12px; }
    .company-sub { font-size: 10px; color: #b91c1c; font-weight: 800; text-transform: uppercase; margin-top: 3px; }
    .company-meta { font-size: 9.5px; color: #475569; line-height: 1.3; margin-top: 4px; }
    .proforma-tag { background: #fef2f2; border: 1.5px solid #fecaca; color: #991b1b; padding: 5px 10px; border-radius: 6px; font-weight: 800; font-family: monospace; font-size: 11.5px; text-align: right; display: inline-block; }
    .section-title { font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px; margin: 12px 0 6px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; }
    .info-grid { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
    .info-grid td { padding: 4.5px 8px; border: 1px solid #e2e8f0; font-size: 10px; }
    .info-label { font-weight: 700; color: #475569; background: #f8fafc; width: 22%; }
    .summary-table { width: 100%; border-collapse: collapse; margin: 8px 0 12px 0; font-size: 10px; }
    .summary-table th { background: #0f172a; color: #ffffff; padding: 6px 8px; text-align: left; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px; }
    .footer-box { margin-top: 16px; padding-top: 8px; border-top: 1px solid #cbd5e1; font-size: 9px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  
  <!-- Encabezado con Logo y Datos de dcasesoresec.com -->
  <table class="header-table">
    <tr>
      <td style="width: 55%; vertical-align: top;">
        ${renderInlineLogoSvg()}
        <div class="company-sub">Agencia Asesora Productora de Seguros • Ecuador</div>
        <div class="company-meta">
          <strong>Oficinas:</strong> ${DC_COMPANY_INFO.offices[0]}<br>
          ${DC_COMPANY_INFO.offices[1]}<br>
          <strong>Teléfonos:</strong> ${DC_COMPANY_INFO.phones} • <strong>Web:</strong> ${DC_COMPANY_INFO.websiteDisplay}
        </div>
      </td>
      <td style="width: 45%; text-align: right; vertical-align: top;">
        <div class="proforma-tag">PROFORMA COMPARATIVA: ${quoteId}</div>
        <div style="font-size: 10px; color: #334155; margin-top: 4px;">Fecha de emisión: <strong>${quoteDate}</strong></div>
        <div style="font-size: 9.5px; color: #64748b;">Validez de la oferta: <strong>15 días calendario</strong></div>
        <div style="font-size: 9px; color: #94a3b8; margin-top: 3px;">Superintendencia de Compañías, Valores y Seguros</div>
      </td>
    </tr>
  </table>

  <!-- 1. Datos del Solicitante y Vehículo -->
  <div class="section-title">1. Datos del Asegurado y Especificación Vehicular</div>
  <table class="info-grid">
    <tr>
      <td class="info-label">Cliente / Asegurado:</td>
      <td><strong>${input.clientName}</strong></td>
      <td class="info-label">Teléfono / WhatsApp:</td>
      <td>${input.clientPhone}</td>
    </tr>
    <tr>
      <td class="info-label">Vehículo Cotizado:</td>
      <td><strong>${input.vehicleBrandModel}</strong></td>
      <td class="info-label">Año de Fabricación:</td>
      <td>${input.vehicleYear}</td>
    </tr>
    <tr>
      <td class="info-label">Ciudad de Circulación:</td>
      <td>${input.city} (Ecuador)</td>
      <td class="info-label">Valor Comercial Asegurado:</td>
      <td><strong style="color: #b91c1c; font-size: 11.5px;">${formatCurrency(input.vehicleValue)}</strong></td>
    </tr>
  </table>

  <!-- 2. Tabla Resumen Comparativa -->
  <div class="section-title">2. Resumen Comparativo de Aseguradoras (12 Pagos Mensuales y Prima Anual)</div>
  <table class="summary-table">
    <thead>
      <tr>
        <th>Aseguradora</th>
        <th style="text-align: right;">Cuota Mensual (12p)</th>
        <th style="text-align: right;">Prima Total Anual</th>
        <th style="text-align: center;">Tasa %</th>
        <th style="text-align: right;">Límite RC</th>
        <th>Deducible Choque</th>
      </tr>
    </thead>
    <tbody>
      ${summaryRows}
    </tbody>
  </table>

  <!-- 3. Fichas Desglosadas por Aseguradora -->
  <div class="section-title">3. Detalle Financiero y Deducibles por Compañía</div>
  ${detailCards}

  <!-- Pie de Página -->
  <div class="footer-box">
    ${DC_COMPANY_INFO.legalName} • ${DC_COMPANY_INFO.regulation}<br>
    Matriz: ${DC_COMPANY_INFO.offices[0]} • Sucursal: ${DC_COMPANY_INFO.offices[1]} • PBX: ${DC_COMPANY_INFO.phones} • Web: ${DC_COMPANY_INFO.websiteDisplay}
  </div>

</body>
</html>
  `;
}

/**
 * Motor nativo de generación y descarga directa de archivos PDF (.pdf)
 * utilizando jsPDF y html2canvas para renderizado nítido de alta resolución.
 *
 * @param htmlContent Cadena HTML completa generada por buildSingleInsurerHtml o buildAllInsurersHtml
 * @param fileName Nombre del archivo descargado (ej: 'Proforma_Alianza_DC_Asesores.pdf')
 */
export async function generateAndDownloadPdf(
  htmlContent: string,
  fileName: string = 'Proforma_DC_Asesores.pdf'
): Promise<void> {
  // Contenedor temporal fuera de pantalla optimizado para ancho de página A4
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // 210mm a 96 DPI
  container.style.background = '#ffffff';
  container.style.color = '#0f172a';
  container.style.zIndex = '-9999';
  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  try {
    // Breve pausa para asegurar renderizado de fuentes y elementos SVG inline
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Captura con html2canvas a resolución 2x (alta nitidez para impresión)
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Primera página
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Páginas subsecuentes si el contenido sobrepasa la primera página
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    // Descarga nativa directa del archivo .pdf en el dispositivo del usuario
    pdf.save(fileName);
  } catch (err) {
    console.warn('Fallo en renderizado html2canvas, activando fallback de impresión/iframe:', err);
    downloadOrPrintPdf(htmlContent);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Fallback de impresión directa mediante iframe invisible o ventana emergente.
 */
export function downloadOrPrintPdf(htmlContent: string): void {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 450);
  } else {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 3000);
      }, 500);
    }
  }
}
