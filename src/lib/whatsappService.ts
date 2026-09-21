/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — whatsappService.ts
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/lib/whatsappService.ts
 * 🏷️ Type: Helper Service
 * 📦 Module: Core Compartido Actuarial
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Motor Actuarial & Datos
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L20   → Imports y tipos
 *   L21-L70  → Generador de enlace y mensaje de WhatsApp preformateado
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import { InsurerQuoteResult, QuoteInput } from '../types';
import { formatCurrency, formatPercent } from './calculator';

// Official broker contact phone in Ecuador
const DEFAULT_BROKER_WHATSAPP = '593998765432';

/**
 * Builds prefilled WhatsApp URL for instant client onboarding.
 */
export function buildWhatsAppQuoteUrl(
  result: InsurerQuoteResult,
  input: QuoteInput,
  brokerPhone: string = DEFAULT_BROKER_WHATSAPP
): string {
  const { insurer, breakdown } = result;

  const lines = [
    `🚗 *COTIZACIÓN DE SEGURO VEHICULAR — DC ASESORES*`,
    `¡Hola! Deseo contratar la póliza para mi vehículo cotizada en la plataforma web:`,
    ``,
    `👤 *Cliente:* ${input.clientName}`,
    `📱 *Teléfono:* ${input.clientPhone}`,
    `🚘 *Vehículo:* ${input.vehicleBrandModel} (${input.vehicleYear}) ${input.vehicleType ? `[${input.vehicleType}]` : ''}`,
    `💰 *Valor Asegurado (VA):* ${formatCurrency(input.vehicleValue)}`,
    `📍 *Ciudad:* ${input.city}`,
    ``,
    `🛡️ *Aseguradora Seleccionada:* ${insurer.name}`,
    `📊 *Tasa Aplicada:* ${formatPercent(breakdown.tasaAplicada)}`,
    `💵 *Cuota Mensual (12 pagos):* ${formatCurrency(breakdown.cuotaMensual)} / mes`,
    `📑 *Prima Total Anual (IVA 15%):* ${formatCurrency(breakdown.primaTotalAnual)}`,
    `🛡️ *Límite Responsabilidad Civil:* ${formatCurrency(breakdown.responsabilidadCivil)}`,
    ``,
    `*Deducibles:*`,
    `• Choque: ${insurer.conditions.choque}`,
    `• Pérdida Total: ${insurer.conditions.perdidaTotal}`,
    `• Grúa: ${insurer.conditions.grua}`,
    ``,
    `Por favor, indíquenme los requisitos para la inspección y emisión de la póliza. ¡Muchas gracias!`,
  ];

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${brokerPhone}?text=${encoded}`;
}
