/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — types.ts
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/types.ts
 * 🏷️ Type: Type Definitions & Interfaces
 * 📦 Module: Core Compartido Actuarial & Base de Datos
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Motor Actuarial & Datos
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Categorías geográficas, productos y configuración fiscal
 *   L26-L55  → Reglas de tarifas y condiciones de aseguradoras
 *   L56-L90  → Entradas de cotización y desglose actuarial paso a paso
 *   L91-L135 → Entidades de consulta CRM e historial
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

export type CityCategory = 'UIO_GYE_CUE' | 'OTRAS';

export type ProductType = 'LIVIANO_CLASSIC' | 'LIVIANO_GOLD' | 'ESTANDAR';

export type VehicleCategory = 'LIVIANO' | 'SUV' | 'CAMIONETA' | 'PESADO';

export interface EmissionTier {
  id: string;
  minNetPremium: number;
  maxNetPremium: number; // Use Infinity or high value (e.g. 9999999) for no upper limit
  fee: number;
}

export interface GlobalTaxConfig {
  superRate: number; // 0.035 (3.50% Superintendencia de Compañías)
  sscRate: number;   // 0.005 (0.50% Seguro Social Campesino)
  ivaRate: number;   // 0.150 (15.00% IVA)
  emissionTiers: EmissionTier[];
  updatedAt?: string;
}

export interface RateRule {
  id: string;
  minVA: number;
  maxVA: number;
  rate: number; // e.g. 3.80 means 3.80%
  rcLimit: number; // Responsabilidad Civil limit, e.g. 30000 ($30k)
  cityCategory?: CityCategory; // for Alianza
  productType?: ProductType;   // for Latina
  vehicleType?: VehicleCategory; // Liviano, SUV, Camioneta, Pesado
  minAge?: number;             // for Privilegio (e.g. 0)
  maxAge?: number;             // for Privilegio (e.g. 5 or 10)
}

export interface InsurerConditions {
  choque: string;
  perdidaTotal: string;
  grua: string;
  autoSustituto?: string;
  amparoPatrimonial?: string;
  talleresAutorizados?: string;
  asistenciaVial?: string;
}

export interface Insurer {
  id: string;
  name: string;
  slug: string;
  color: string;
  logoText: string;
  maxVehicleAge: number; // e.g. 15 or 10
  active: boolean;
  notes?: string;
  conditions: InsurerConditions;
  rateRules: RateRule[];
  updatedAt?: string;
}

export interface QuoteInput {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  vehicleBrandModel: string;
  vehicleYear: number;
  vehicleValue: number; // Valor Asegurado (VA)
  city: 'UIO' | 'GYE' | 'CUE' | 'OTRAS';
  vehicleType?: VehicleCategory;
  productPreference?: ProductType;
}

export interface QuoteBreakdown {
  valorAsegurado: number;
  antiguedad: number;
  elegible: boolean;
  motivoNoElegible?: string;
  tasaAplicada: number;
  primaNeta: number;
  superCias: number;
  campesino: number;
  derechosEmision: number;
  subtotal: number;
  iva: number;
  primaTotalAnual: number;
  cuotaMensual: number;
  responsabilidadCivil: number;
  matchedRule?: RateRule;
}

export interface InsurerQuoteResult {
  insurer: Insurer;
  breakdown: QuoteBreakdown;
  isBestPrice?: boolean;
  isTopCoverage?: boolean;
}

export type ConsultationStatus = 'nueva' | 'contactado' | 'cerrada' | 'descartada';

export interface StoredConsultation {
  id?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  vehicleBrandModel: string;
  vehicleYear: number;
  vehicleValue: number;
  city: string;
  createdAt: string;
  status: ConsultationStatus;
  bestPriceInsurer?: string;
  bestPriceMonthly?: number;
  topCoverageInsurer?: string;
  quotesSummary: {
    insurerName: string;
    annualTotal: number;
    monthlyFee: number;
    rate: number;
    rc: number;
    eligible: boolean;
    reason?: string;
  }[];
}
