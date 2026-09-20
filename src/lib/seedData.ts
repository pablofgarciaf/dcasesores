/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — seedData.ts
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/lib/seedData.ts
 * 🏷️ Type: Seed Data & Firestore Population Script
 * 📦 Module: Core Compartido Actuarial & Base de Datos
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Motor Actuarial & Datos
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Configuración fiscal inicial de Ecuador (SUPER, SSC, IVA, Derechos Emisión)
 *   L26-L170 → Matrices y condiciones de Alianza, Latina, Hispana, Vaz, Privilegio
 *   L171-L210→ Función seedInitialDataToFirestore para sembrado persistente
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { GlobalTaxConfig, Insurer } from '../types';

export const INITIAL_GLOBAL_CONFIG: GlobalTaxConfig = {
  superRate: 0.035, // 3.50% Superintendencia de Compañías
  sscRate: 0.005,   // 0.50% Seguro Social Campesino
  ivaRate: 0.150,   // 15.00% IVA vigente en Ecuador
  emissionTiers: [
    { id: 'tier-1', minNetPremium: 0, maxNetPremium: 250, fee: 0.50 },
    { id: 'tier-2', minNetPremium: 250.0001, maxNetPremium: 500, fee: 1.00 },
    { id: 'tier-3', minNetPremium: 500.0001, maxNetPremium: 1000, fee: 3.00 },
    { id: 'tier-4', minNetPremium: 1000.0001, maxNetPremium: 2000, fee: 5.00 },
    { id: 'tier-5', minNetPremium: 2000.0001, maxNetPremium: 4000, fee: 7.00 },
    { id: 'tier-6', minNetPremium: 4000.0001, maxNetPremium: 99999999, fee: 9.00 },
  ],
  updatedAt: new Date().toISOString(),
};

export const INITIAL_INSURERS: Insurer[] = [
  {
    id: 'alianza',
    name: 'Alianza Compañía de Seguros',
    slug: 'alianza',
    color: '#005596',
    logoText: 'ALIANZA',
    maxVehicleAge: 30,
    active: true,
    notes: 'Segmentación geográfica estricta: Quito, Guayaquil y Cuenca vs Resto del País.',
    conditions: {
      choque: '10% Valor Siniestro / 1% Valor Asegurado, mín. $350 (<3.000 km) o $500 (>3.000 km)',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$300 por evento (asistencia nacional 24/7)',
      autoSustituto: 'Hasta 15 días consecutivos por siniestro de pérdida parcial o total',
      amparoPatrimonial: 'Incluido 100% de la suma asegurada',
      talleresAutorizados: 'Red de concesionarios autorizados multimarcas',
    },
    rateRules: [
      // Rango $0 - $14,999
      { id: 'ali-1', minVA: 0, maxVA: 14999.99, rate: 3.80, rcLimit: 30000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-2', minVA: 0, maxVA: 14999.99, rate: 3.75, rcLimit: 30000, cityCategory: 'OTRAS' },
      // Rango $15,000 - $19,999
      { id: 'ali-3', minVA: 15000, maxVA: 19999.99, rate: 3.70, rcLimit: 35000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-4', minVA: 15000, maxVA: 19999.99, rate: 3.65, rcLimit: 35000, cityCategory: 'OTRAS' },
      // Rango $20,000 - $29,999
      { id: 'ali-5', minVA: 20000, maxVA: 29999.99, rate: 3.60, rcLimit: 40000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-6', minVA: 20000, maxVA: 29999.99, rate: 3.55, rcLimit: 40000, cityCategory: 'OTRAS' },
      // Rango $30,000 - $49,999
      { id: 'ali-7', minVA: 30000, maxVA: 49999.99, rate: 3.50, rcLimit: 45000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-8', minVA: 30000, maxVA: 49999.99, rate: 3.45, rcLimit: 45000, cityCategory: 'OTRAS' },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'latina',
    name: 'Latina Seguros',
    slug: 'latina',
    color: '#D9222A',
    logoText: 'LATINA',
    maxVehicleAge: 15,
    active: true,
    notes: 'Doble programa: Liviano Classic y Liviano Gold con coberturas extendidas.',
    conditions: {
      choque: '10% Valor Siniestro / 1% Valor Asegurado, mín. $250',
      perdidaTotal: '25% del Valor Asegurado',
      grua: '$300 por evento sin límite de eventos anuales',
      autoSustituto: 'Hasta 10 días para reparación en taller afiliado',
      amparoPatrimonial: 'Incluido sin costo adicional',
      talleresAutorizados: 'Red de talleres certificados Latina',
    },
    rateRules: [
      // LIVIANO CLASSIC
      { id: 'lat-c1', minVA: 0, maxVA: 15000, rate: 4.20, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c2', minVA: 15000.01, maxVA: 25000, rate: 3.90, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c3', minVA: 25000.01, maxVA: 35000, rate: 3.80, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c4', minVA: 35000.01, maxVA: 50000, rate: 3.70, rcLimit: 50000, productType: 'LIVIANO_CLASSIC' },
      // LIVIANO GOLD
      { id: 'lat-g1', minVA: 10000, maxVA: 20000, rate: 4.10, rcLimit: 50000, productType: 'LIVIANO_GOLD' },
      { id: 'lat-g2', minVA: 20000.01, maxVA: 35000, rate: 3.95, rcLimit: 50000, productType: 'LIVIANO_GOLD' },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'hispana',
    name: 'Hispana de Seguros',
    slug: 'hispana',
    color: '#0A2540',
    logoText: 'HISPANA',
    maxVehicleAge: 10,
    active: true,
    notes: 'Tasas altamente competitivas para vehículos de hasta 10 años.',
    conditions: {
      choque: '10% Valor Siniestro o 1% Valor Asegurado, mín. $300',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$500 por evento nacional',
      autoSustituto: 'Hasta 12 días por siniestro calificado',
      amparoPatrimonial: '100% de la suma asegurada',
      talleresAutorizados: 'Red selecta con repuestos originales garantizados',
    },
    rateRules: [
      { id: 'his-1', minVA: 0, maxVA: 10000, rate: 3.99, rcLimit: 30000 },
      { id: 'his-2', minVA: 10000.01, maxVA: 20000, rate: 2.99, rcLimit: 30000 },
      { id: 'his-3', minVA: 20000.01, maxVA: 30000, rate: 2.89, rcLimit: 35000 },
      { id: 'his-4', minVA: 30000.01, maxVA: 40000, rate: 2.79, rcLimit: 40000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'vaz',
    name: 'Vaz Seguros',
    slug: 'vaz',
    color: '#E06D10',
    logoText: 'VAZ SEGUROS',
    maxVehicleAge: 10,
    active: true,
    notes: 'Excelente respuesta ágil y deducibles de choque mínimos económicos.',
    conditions: {
      choque: '10% Valor Siniestro, 1% Valor Asegurado, mín. $200',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$300 por evento',
      autoSustituto: 'Hasta 8 días para vehículos livianos',
      amparoPatrimonial: 'Incluido',
      talleresAutorizados: 'Talleres multimarca calificados Vaz',
    },
    rateRules: [
      { id: 'vaz-1', minVA: 0, maxVA: 15000, rate: 4.80, rcLimit: 20000 },
      { id: 'vaz-2', minVA: 15000.01, maxVA: 25000, rate: 4.60, rcLimit: 20000 },
      { id: 'vaz-3', minVA: 25000.01, maxVA: 35000, rate: 4.40, rcLimit: 30000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'privilegio',
    name: 'Seguros Privilegio',
    slug: 'privilegio',
    color: '#2A6F97',
    logoText: 'PRIVILEGIO',
    maxVehicleAge: 15,
    active: true,
    notes: 'Tarificación estratificada por bloques de antigüedad: 0-5 años y 6-10 años.',
    conditions: {
      choque: '10% Valor Siniestro, 1% Valor Asegurado, mín. $250',
      perdidaTotal: '25% del Valor Asegurado',
      grua: '$500 por evento con cobertura ampliada',
      autoSustituto: 'Hasta 15 días previa calificación',
      amparoPatrimonial: '100% de la suma asegurada',
      talleresAutorizados: 'Convenios preferenciales en todo Ecuador',
    },
    rateRules: [
      // 0 a 5 años de antigüedad
      { id: 'priv-0-5-a', minVA: 0, maxVA: 15000, rate: 4.00, rcLimit: 30000, minAge: 0, maxAge: 5 },
      { id: 'priv-0-5-b', minVA: 15000.01, maxVA: 30000, rate: 3.80, rcLimit: 35000, minAge: 0, maxAge: 5 },
      // 6 a 10 años de antigüedad
      { id: 'priv-6-10-a', minVA: 0, maxVA: 15000, rate: 4.20, rcLimit: 30000, minAge: 6, maxAge: 10 },
      { id: 'priv-6-10-b', minVA: 15000.01, maxVA: 30000, rate: 4.00, rcLimit: 35000, minAge: 6, maxAge: 10 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mapfre',
    name: 'Mapfre Seguros Ecuador',
    slug: 'mapfre',
    color: '#D8232A',
    logoText: 'MAPFRE',
    maxVehicleAge: 15,
    active: true,
    notes: 'Tarifario corporativo con amplia cobertura de responsabilidad civil y talleres preferenciales.',
    conditions: {
      choque: '10% Valor Siniestro, mín. $300',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$350 por evento (24/7 nacional)',
      autoSustituto: 'Hasta 10 días por siniestro calificado',
      amparoPatrimonial: '100% de la suma asegurada',
      talleresAutorizados: 'Red de concesionarios Mapfre ServiAuto',
    },
    rateRules: [
      { id: 'map-1', minVA: 0, maxVA: 15000, rate: 3.60, rcLimit: 35000 },
      { id: 'map-2', minVA: 15000.01, maxVA: 30000, rate: 3.30, rcLimit: 40000 },
      { id: 'map-3', minVA: 30000.01, maxVA: 100000, rate: 3.10, rcLimit: 50000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'zurich',
    name: 'Zurich Seguros Ecuador',
    slug: 'zurich',
    color: '#1B365D',
    logoText: 'ZURICH',
    maxVehicleAge: 15,
    active: true,
    notes: 'Respaldo global con la cobertura más alta de responsabilidad civil y asistencia premium.',
    conditions: {
      choque: '10% Valor Siniestro, mín. $350',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$400 por evento nacional e internacional',
      autoSustituto: 'Hasta 15 días consecutivos',
      amparoPatrimonial: '100% suma asegurada',
      talleresAutorizados: 'Red VIP de concesionarios certificados',
    },
    rateRules: [
      { id: 'zur-1', minVA: 0, maxVA: 15000, rate: 3.70, rcLimit: 40000 },
      { id: 'zur-2', minVA: 15000.01, maxVA: 30000, rate: 3.40, rcLimit: 45000 },
      { id: 'zur-3', minVA: 30000.01, maxVA: 100000, rate: 3.20, rcLimit: 50000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'atlantida',
    name: 'Seguros Atlántida',
    slug: 'atlantida',
    color: '#006699',
    logoText: 'ATLÁNTIDA',
    maxVehicleAge: 20,
    active: true,
    notes: 'Excelente relación costo-beneficio para vehículos comerciales y particulares.',
    conditions: {
      choque: '10% Valor Siniestro, mín. $250',
      perdidaTotal: '20% del Valor Asegurado',
      grua: '$250 por evento nacional',
      autoSustituto: 'Opcional según póliza',
      amparoPatrimonial: '100% suma asegurada',
      talleresAutorizados: 'Red multimarca nacional',
    },
    rateRules: [
      { id: 'atl-1', minVA: 0, maxVA: 15000, rate: 3.80, rcLimit: 25000 },
      { id: 'atl-2', minVA: 15000.01, maxVA: 30000, rate: 3.50, rcLimit: 30000 },
      { id: 'atl-3', minVA: 30000.01, maxVA: 100000, rate: 3.25, rcLimit: 35000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sweaden',
    name: 'Sweaden Seguros',
    slug: 'sweaden',
    color: '#004B87',
    logoText: 'SWEADEN',
    maxVehicleAge: 20,
    active: true,
    notes: 'Agilidad de respuesta y atención preferencial en reclamos vehiculares.',
    conditions: {
      choque: '10% Valor Siniestro, mín. $300',
      perdidaTotal: '18% del Valor Asegurado',
      grua: '$300 por evento nacional',
      autoSustituto: 'Hasta 10 días',
      amparoPatrimonial: '100% suma asegurada',
      talleresAutorizados: 'Talleres seleccionados y concesionarios',
    },
    rateRules: [
      { id: 'swe-1', minVA: 0, maxVA: 15000, rate: 3.75, rcLimit: 30000 },
      { id: 'swe-2', minVA: 15000.01, maxVA: 30000, rate: 3.45, rcLimit: 35000 },
      { id: 'swe-3', minVA: 30000.01, maxVA: 100000, rate: 3.20, rcLimit: 40000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'bmi',
    name: 'BMI del Ecuador',
    slug: 'bmi',
    color: '#C8102E',
    logoText: 'BMI',
    maxVehicleAge: 15,
    active: true,
    notes: 'Compañía multinacional con respaldo actuarial de primer nivel y asistencia integral.',
    conditions: {
      choque: '10% Valor Siniestro, mín. $350',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$400 por evento nacional',
      autoSustituto: 'Hasta 15 días consecutivos',
      amparoPatrimonial: '100% suma asegurada',
      talleresAutorizados: 'Red VIP multimarcas autorizadas',
    },
    rateRules: [
      { id: 'bmi-1', minVA: 0, maxVA: 15000, rate: 3.90, rcLimit: 40000 },
      { id: 'bmi-2', minVA: 15000.01, maxVA: 30000, rate: 3.50, rcLimit: 50000 },
      { id: 'bmi-3', minVA: 30000.01, maxVA: 100000, rate: 3.30, rcLimit: 60000 },
    ],
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Seeds initial parameters and insurers into Firestore if not present,
 * or forces an update when executed by the administrator.
 */
export async function seedInitialDataToFirestore(force = false): Promise<{ success: boolean; message: string }> {
  try {
    const configRef = doc(db, 'config', 'parameters');
    const configSnap = await getDoc(configRef);

    if (!configSnap.exists() || force) {
      await setDoc(configRef, INITIAL_GLOBAL_CONFIG);
      // Alias en español para compatibilidad total con consultas directas
      await setDoc(doc(db, 'parametros_legales', 'actual'), INITIAL_GLOBAL_CONFIG);
      console.log('Global configuration seeded to Firestore (config/parameters & parametros_legales/actual).');
    }

    for (const insurer of INITIAL_INSURERS) {
      const insurerRef = doc(db, 'insurers', insurer.id);
      const insurerSnap = await getDoc(insurerRef);

      if (!insurerSnap.exists() || force) {
        await setDoc(insurerRef, insurer);
        // Alias en español
        await setDoc(doc(db, 'aseguradoras', insurer.id), insurer);
        console.log(`Insurer ${insurer.name} seeded to Firestore (insurers & aseguradoras).`);
      }
    }

    return { success: true, message: 'Base de datos Firestore sembrada con éxito.' };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/insurers');
  }
}
