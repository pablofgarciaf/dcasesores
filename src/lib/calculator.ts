/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — calculator.ts
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/lib/calculator.ts
 * 🏷️ Type: Pure Actuarial Engine
 * 📦 Module: Core Compartido Actuarial
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Motor Actuarial & Datos
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L40   → Utilidades de formato (moneda, porcentaje, categorías de ciudad)
 *   L41-L85  → Cálculo de derechos de emisión según escala escalonada
 *   L86-L160 → Algoritmo de resolución y búsqueda de regla en matrices
 *   L161-L245→ Pipeline actuarial unitario calculateQuoteForInsurer
 *   L246-L320→ Comparador multiautocompañía y detección de insignias
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import {
  CityCategory,
  GlobalTaxConfig,
  Insurer,
  InsurerQuoteResult,
  QuoteBreakdown,
  QuoteInput,
  RateRule,
} from '../types';
import { INITIAL_GLOBAL_CONFIG } from './seedData';

/**
 * Standard rounding to 2 decimal places for financial calculations.
 */
export function roundCurrency(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

/**
 * Formats numbers into standard US Dollar currency strings ($ 1,234.56).
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats rate numbers into percentage strings (3.80%).
 */
export function formatPercent(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

/**
 * Maps a city string to the city category used by carriers like Alianza.
 */
export function getCityCategory(city: string): CityCategory {
  const upper = city.trim().toUpperCase();
  if (['UIO', 'GYE', 'CUE', 'QUITO', 'GUAYAQUIL', 'CUENCA'].includes(upper)) {
    return 'UIO_GYE_CUE';
  }
  return 'OTRAS';
}

/**
 * Calculates the staggered Derechos de Emisión based on net premium ranges.
 * 
 * Legal Scale:
 * $0.00    - $250.00   -> $0.50
 * $250.01  - $500.00   -> $1.00
 * $500.01  - $1,000.00 -> $3.00
 * $1,000.01- $2,000.00 -> $5.00
 * $2,000.01- $4,000.00 -> $7.00
 * > $4,000.00          -> $9.00
 */
export function calculateEmissionFee(netPremium: number, config: GlobalTaxConfig = INITIAL_GLOBAL_CONFIG): number {
  if (netPremium <= 0) return 0;

  const tiers = config.emissionTiers;
  if (tiers && tiers.length > 0) {
    for (const tier of tiers) {
      if (netPremium >= tier.minNetPremium && netPremium <= tier.maxNetPremium) {
        return tier.fee;
      }
    }
  }

  // Fallback to statutory scale if tiers are not provided
  if (netPremium <= 250) return 0.50;
  if (netPremium <= 500) return 1.00;
  if (netPremium <= 1000) return 3.00;
  if (netPremium <= 2000) return 5.00;
  if (netPremium <= 4000) return 7.00;
  return 9.00;
}

/**
 * Finds the matching rate rule in an insurer's matrix based on:
 * - Vehicle Sum Insured (Valor Asegurado)
 * - City
 * - Product Type (Classic vs Gold for Latina)
 * - Vehicle Age (for Privilegio)
 */
export function findMatchingRateRule(
  insurer: Insurer,
  vehicleValue: number,
  vehicleAge: number,
  city: string,
  preferredProduct?: string,
  vehicleType?: string
): RateRule | null {
  const cityCategory = getCityCategory(city);

  const matched = insurer.rateRules.filter((rule) => {
    // Check Value Range: minVA <= VA <= maxVA
    const inValueRange = vehicleValue >= rule.minVA && vehicleValue <= rule.maxVA;
    if (!inValueRange) return false;

    // Check Vehicle Type if rule specifies one
    if (rule.vehicleType && vehicleType && rule.vehicleType !== vehicleType) {
      return false;
    }

    // Check City if rule specifies one (e.g. Alianza)
    if (rule.cityCategory && rule.cityCategory !== cityCategory) {
      return false;
    }

    // Check Product Type if rule specifies one (e.g. Latina)
    if (rule.productType) {
      if (preferredProduct) {
        if (rule.productType !== preferredProduct) return false;
      } else {
        // Default to Classic if not specified and multiple exist
        if (rule.productType !== 'LIVIANO_CLASSIC' && insurer.rateRules.some(r => r.productType === 'LIVIANO_CLASSIC')) {
          // keep searching if classic exists
        }
      }
    }

    // Check Vehicle Age if rule specifies age range (e.g. Privilegio)
    if (rule.minAge !== undefined && rule.maxAge !== undefined) {
      if (vehicleAge < rule.minAge || vehicleAge > rule.maxAge) {
        return false;
      }
    }

    return true;
  });

  if (matched.length === 0) return null;

  // If multiple match (e.g. preferred product specified), select exact match or best rate
  if (preferredProduct) {
    const exact = matched.find(r => r.productType === preferredProduct);
    if (exact) return exact;
  }

  return matched[0];
}

/**
 * Pure calculation pipeline for a single insurer.
 * 
 * Pipeline:
 * 1. Antigüedad = AñoActual - AñoVehiculo
 * 2. Elegibilidad por Antigüedad
 * 3. Búsqueda de Tasa Base en Matriz
 * 4. Prima Neta = VA * (Tasa / 100)
 * 5. SuperCias = Prima Neta * 0.035
 * 6. Campesino = Prima Neta * 0.005
 * 7. Emisión = Escala Escalón(Prima Neta)
 * 8. Subtotal = Prima Neta + SuperCias + Campesino + Emision
 * 9. Prima Total Anual = Subtotal * 1.15 (IVA 15%)
 * 10. Cuota Mensual = Prima Total Anual / 12
 */
export function calculateQuoteForInsurer(
  input: QuoteInput,
  insurer: Insurer,
  config: GlobalTaxConfig = INITIAL_GLOBAL_CONFIG,
  currentYear = new Date().getFullYear()
): QuoteBreakdown {
  const { vehicleValue, vehicleYear, city, productPreference, vehicleType } = input;
  const antiguedad = Math.max(0, currentYear - vehicleYear);

  // 1. Check age eligibility
  const maxAllowedAge = (vehicleType === 'PESADO') ? Math.min(insurer.maxVehicleAge, 12) : insurer.maxVehicleAge;
  if (antiguedad > maxAllowedAge) {
    return {
      valorAsegurado: vehicleValue,
      antiguedad,
      elegible: false,
      motivoNoElegible: `No asegurable: Antigüedad de ${antiguedad} años supera el límite permitido (${maxAllowedAge} años) por ${insurer.name}.`,
      tasaAplicada: 0,
      primaNeta: 0,
      superCias: 0,
      campesino: 0,
      derechosEmision: 0,
      subtotal: 0,
      iva: 0,
      primaTotalAnual: 0,
      cuotaMensual: 0,
      responsabilidadCivil: 0,
    };
  }

  // 2. Find matching rule
  const matchedRule = findMatchingRateRule(insurer, vehicleValue, antiguedad, city, productPreference, vehicleType);

  if (!matchedRule) {
    return {
      valorAsegurado: vehicleValue,
      antiguedad,
      elegible: false,
      motivoNoElegible: `Fuera de rango: El valor de $${vehicleValue.toLocaleString()} no se encuentra dentro de las tablas tarifarias activas de ${insurer.name}.`,
      tasaAplicada: 0,
      primaNeta: 0,
      superCias: 0,
      campesino: 0,
      derechosEmision: 0,
      subtotal: 0,
      iva: 0,
      primaTotalAnual: 0,
      cuotaMensual: 0,
      responsabilidadCivil: 0,
    };
  }

  // 3. Mathematical calculation exactly following Google Sheets formula:
  // BaseEmision = PrimaNeta + Super + SSC
  // Emision = VLOOKUP(BaseEmision, Escala, 3, TRUE)
  // Subtotal = BaseEmision + Emision
  // PrimaTotal = Subtotal * 1.15
  // CuotaMensual = PrimaTotal / 12
  let tasaAplicada = matchedRule.rate;
  if (!matchedRule.vehicleType) {
    if (vehicleType === 'CAMIONETA') {
      tasaAplicada = roundCurrency(tasaAplicada + 0.15);
    } else if (vehicleType === 'PESADO') {
      tasaAplicada = roundCurrency(tasaAplicada + 0.45);
    }
  }

  const rawPrimaNeta = vehicleValue * (tasaAplicada / 100);
  const rawSuperCias = rawPrimaNeta * config.superRate;
  const rawCampesino = rawPrimaNeta * config.sscRate;
  const baseEmision = rawPrimaNeta + rawSuperCias + rawCampesino;
  const derechosEmision = calculateEmissionFee(baseEmision, config);
  const rawSubtotal = baseEmision + derechosEmision;
  const rawIva = rawSubtotal * config.ivaRate;
  const rawTotal = rawSubtotal + rawIva;
  const rawCuota = rawTotal / 12;

  const primaNeta = roundCurrency(rawPrimaNeta);
  const superCias = roundCurrency(rawSuperCias);
  const campesino = roundCurrency(rawCampesino);
  const subtotal = roundCurrency(rawSubtotal);
  const iva = roundCurrency(rawIva);
  const primaTotalAnual = roundCurrency(rawTotal);
  const cuotaMensual = roundCurrency(rawCuota);
  const responsabilidadCivil = matchedRule.rcLimit;

  return {
    valorAsegurado: vehicleValue,
    antiguedad,
    elegible: true,
    tasaAplicada,
    primaNeta,
    superCias,
    campesino,
    derechosEmision,
    subtotal,
    iva,
    primaTotalAnual,
    cuotaMensual,
    responsabilidadCivil,
    matchedRule,
  };
}

/**
 * Calculates quotes across all active carriers and marks "Mejor Precio" and "Mayor Cobertura".
 */
export function calculateAllQuotes(
  input: QuoteInput,
  insurers: Insurer[],
  config: GlobalTaxConfig = INITIAL_GLOBAL_CONFIG,
  currentYear = new Date().getFullYear()
): InsurerQuoteResult[] {
  const activeInsurers = insurers.filter(i => i.active);

  const results: InsurerQuoteResult[] = activeInsurers.map(insurer => ({
    insurer,
    breakdown: calculateQuoteForInsurer(input, insurer, config, currentYear),
    isBestPrice: false,
    isTopCoverage: false,
  }));

  const eligibleResults = results.filter(r => r.breakdown.elegible);

  if (eligibleResults.length > 0) {
    // Find lowest annual price
    let minPrice = Infinity;
    let bestPriceItem: InsurerQuoteResult | null = null;

    for (const item of eligibleResults) {
      if (item.breakdown.primaTotalAnual < minPrice) {
        minPrice = item.breakdown.primaTotalAnual;
        bestPriceItem = item;
      }
    }

    if (bestPriceItem) {
      bestPriceItem.isBestPrice = true;
    }

    // Find highest RC limit (Coverage)
    let maxRC = -1;
    let topCoverageItem: InsurerQuoteResult | null = null;

    for (const item of eligibleResults) {
      if (item.breakdown.responsabilidadCivil > maxRC) {
        maxRC = item.breakdown.responsabilidadCivil;
        topCoverageItem = item;
      }
    }

    if (topCoverageItem) {
      topCoverageItem.isTopCoverage = true;
    }
  }

  // Sort: Eligible first (sorted by price ascending), then non-eligible at the bottom
  return results.sort((a, b) => {
    if (a.breakdown.elegible && !b.breakdown.elegible) return -1;
    if (!a.breakdown.elegible && b.breakdown.elegible) return 1;
    if (a.breakdown.elegible && b.breakdown.elegible) {
      return a.breakdown.primaTotalAnual - b.breakdown.primaTotalAnual;
    }
    return 0;
  });
}

/**
 * Función canónica pura en JavaScript para auditar y calcular la cotización
 * exacta según las fórmulas de Google Sheets y documentos de Firestore.
 *
 * @param va Valor Asegurado comercial (ej: 14622.00)
 * @param anio Año de fabricación del vehículo (ej: 2000 o 2023)
 * @param ciudad Código o nombre de ciudad (ej: 'UIO', 'GYE', 'CUE', 'OTRAS')
 * @param plan Plan o preferencia de producto (ej: 'LIVIANO_CLASSIC', 'LIVIANO_GOLD')
 * @param aseguradoraDoc Documento Firestore de la aseguradora (ej: Alianza)
 * @param parametrosDoc Documento Firestore de parámetros impositivos (SUPER, SSC, IVA, Escalas)
 * @returns QuoteBreakdown con resultados redondeados al centavo
 */
export function calcularCotizacion(
  va: number,
  anio: number,
  ciudad: string,
  plan: string = 'LIVIANO_CLASSIC',
  aseguradoraDoc: Insurer,
  parametrosDoc: GlobalTaxConfig = INITIAL_GLOBAL_CONFIG
): QuoteBreakdown {
  const upperCity = ciudad.toUpperCase().trim();
  const validCity: 'UIO' | 'GYE' | 'CUE' | 'OTRAS' = ['UIO', 'GYE', 'CUE'].includes(upperCity)
    ? (upperCity as 'UIO' | 'GYE' | 'CUE')
    : 'OTRAS';

  const input: QuoteInput = {
    clientName: 'Auditoría Sheets',
    clientPhone: '0999999999',
    vehicleBrandModel: 'Vehículo Prueba',
    vehicleYear: anio,
    vehicleValue: va,
    city: validCity,
    productPreference: plan as any,
  };
  return calculateQuoteForInsurer(input, aseguradoraDoc, parametrosDoc);
}

