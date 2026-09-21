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
    maxVehicleAge: 15,
    active: true,
    notes: 'Segmentación geográfica estricta: Quito, Guayaquil, Cuenca, Santo Domingo y Resto del País.',
    conditions: {
      choque: '10% VS, 1% VA, mín. $350 (<3.000 km/mes) | 15% VS, 1.5% VA, mín. $500 (>3.000 km/mes)',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$300 por evento (asistencia nacional 24/7)',
      autoSustituto: 'Hasta 15 días consecutivos por siniestro de pérdida parcial o total',
      amparoPatrimonial: 'Amparo Patrimonial: Sin alcohol/drogas 25% VS, con alcohol/drogas 25% VS',
      talleresAutorizados: 'Red de concesionarios autorizados multimarcas',
    },
    rateRules: [
      // Quito (UIO)
      { id: 'ali-uio-1', minVA: 0, maxVA: 15000, rate: 3.80, rcLimit: 30000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-uio-2', minVA: 15000.01, maxVA: 25000, rate: 3.10, rcLimit: 30000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-uio-3', minVA: 25000.01, maxVA: 35000, rate: 2.90, rcLimit: 30000, cityCategory: 'UIO_GYE_CUE' },
      { id: 'ali-uio-4', minVA: 35000.01, maxVA: 999999, rate: 2.30, rcLimit: 30000, cityCategory: 'UIO_GYE_CUE' },
      // Resto del país / Otras
      { id: 'ali-otr-1', minVA: 0, maxVA: 15000, rate: 3.15, rcLimit: 30000, cityCategory: 'OTRAS' },
      { id: 'ali-otr-2', minVA: 15000.01, maxVA: 25000, rate: 2.65, rcLimit: 30000, cityCategory: 'OTRAS' },
      { id: 'ali-otr-3', minVA: 25000.01, maxVA: 35000, rate: 2.65, rcLimit: 30000, cityCategory: 'OTRAS' },
      { id: 'ali-otr-4', minVA: 35000.01, maxVA: 999999, rate: 2.15, rcLimit: 30000, cityCategory: 'OTRAS' },
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
    notes: 'Doble programa: Liviano Classic y Liviano Go con coberturas extendidas.',
    conditions: {
      choque: '10% del Valor Siniestro, 1% Valor Asegurado no menor a $250',
      perdidaTotal: '25% del Valor Asegurado',
      grua: '$300 por evento nacional',
      autoSustituto: 'Hasta 10 días para reparación en taller afiliado',
      amparoPatrimonial: 'Incluido sin costo adicional (Deducible RC: 10% VS mín $200 en Guayas)',
      talleresAutorizados: 'Red de talleres certificados Latina',
    },
    rateRules: [
      // LIVIANO CLASSIC
      { id: 'lat-c1', minVA: 0, maxVA: 15000, rate: 4.20, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c2', minVA: 15000.01, maxVA: 20000, rate: 3.30, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c3', minVA: 20000.01, maxVA: 25000, rate: 3.00, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c4', minVA: 25000.01, maxVA: 35000, rate: 2.60, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c5', minVA: 35000.01, maxVA: 50000, rate: 2.30, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      { id: 'lat-c6', minVA: 50000.01, maxVA: 999999, rate: 2.10, rcLimit: 40000, productType: 'LIVIANO_CLASSIC' },
      // LIVIANO GOLD / GO
      { id: 'lat-g1', minVA: 0, maxVA: 15000, rate: 3.80, rcLimit: 25000, productType: 'LIVIANO_GOLD' },
      { id: 'lat-g2', minVA: 15000.01, maxVA: 20000, rate: 3.00, rcLimit: 25000, productType: 'LIVIANO_GOLD' },
      { id: 'lat-g3', minVA: 20000.01, maxVA: 25000, rate: 2.80, rcLimit: 25000, productType: 'LIVIANO_GOLD' },
      { id: 'lat-g4', minVA: 25000.01, maxVA: 35000, rate: 2.40, rcLimit: 25000, productType: 'LIVIANO_GOLD' },
      { id: 'lat-g5', minVA: 35000.01, maxVA: 50000, rate: 2.10, rcLimit: 25000, productType: 'LIVIANO_GOLD' },
      { id: 'lat-g6', minVA: 50000.01, maxVA: 999999, rate: 2.00, rcLimit: 25000, productType: 'LIVIANO_GOLD' },
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
    notes: 'Tarifas altamente competitivas. Restricción en vehículos Chevrolet LUV D-Max.',
    conditions: {
      choque: '10% del Valor Siniestro o 1% Valor Asegurado. Mínimo $300',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$500 por evento nacional',
      autoSustituto: 'Con costo adicional según requerimiento',
      amparoPatrimonial: 'Pérdida Parcial: 15% VS o 2% VA (mín. $500). Pérdida Total: 25% VA. Robo comp: 20% VS',
      talleresAutorizados: 'Red selecta con repuestos originales garantizados',
    },
    rateRules: [
      { id: 'his-1', minVA: 0, maxVA: 30000, rate: 3.00, rcLimit: 30000 },
      { id: 'his-2', minVA: 30000.01, maxVA: 999999, rate: 2.50, rcLimit: 40000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ads',
    name: 'ADS Seguros',
    slug: 'ads',
    color: '#1E3A8A',
    logoText: 'ADS SEGUROS',
    maxVehicleAge: 10,
    active: true,
    notes: 'Restricción de suscripción en Chevrolet LUV D-Max. Cobertura todo riesgo.',
    conditions: {
      choque: '10% del Valor Siniestro o 1% Valor Asegurado. Mínimo $300',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$500 por evento nacional',
      autoSustituto: 'Incluido según póliza',
      amparoPatrimonial: 'Pérdida Parcial: 15% VS o 2% VA (mín. $500). Pérdida Total: 25% VA. Robo comp: 20% VS',
      talleresAutorizados: 'Red multimarca calificada nacional',
    },
    rateRules: [
      { id: 'ads-1', minVA: 0, maxVA: 15000, rate: 4.80, rcLimit: 30000 },
      { id: 'ads-2', minVA: 15000.01, maxVA: 30000, rate: 4.20, rcLimit: 30000 },
      { id: 'ads-3', minVA: 30000.01, maxVA: 999999, rate: 3.80, rcLimit: 30000 },
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
    notes: 'Deducible mínimo económico ($200) y respuesta ágil en siniestros.',
    conditions: {
      choque: '10% del Valor Siniestro, 1% Valor Asegurado, mínimo $200',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$300 por evento nacional',
      autoSustituto: 'Incluido para vehículos livianos',
      amparoPatrimonial: 'Con costo adicional',
      talleresAutorizados: 'Talleres multimarca calificados Vaz',
    },
    rateRules: [
      // PRODUCTO 1: VEHICULO LIVIANO
      { id: 'vaz-liv-1', minVA: 0, maxVA: 15000, rate: 4.80, rcLimit: 30000, vehicleType: 'LIVIANO' },
      { id: 'vaz-liv-2', minVA: 15001, maxVA: 19999, rate: 4.30, rcLimit: 30000, vehicleType: 'LIVIANO' },
      { id: 'vaz-liv-3', minVA: 20000, maxVA: 24999, rate: 3.80, rcLimit: 30000, vehicleType: 'LIVIANO' },
      { id: 'vaz-liv-4', minVA: 25000, maxVA: 29999, rate: 2.60, rcLimit: 30000, vehicleType: 'LIVIANO' },
      { id: 'vaz-liv-5', minVA: 30000, maxVA: 34999, rate: 2.40, rcLimit: 30000, vehicleType: 'LIVIANO' },
      { id: 'vaz-liv-6', minVA: 35000, maxVA: 69999, rate: 2.20, rcLimit: 30000, vehicleType: 'LIVIANO' },
      { id: 'vaz-liv-7', minVA: 70000, maxVA: 999999, rate: 2.00, rcLimit: 30000, vehicleType: 'LIVIANO' },
      // PRODUCTO 2: VEHICULO CAMIONETA
      { id: 'vaz-cam-1', minVA: 0, maxVA: 15000, rate: 5.25, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      { id: 'vaz-cam-2', minVA: 15001, maxVA: 19999, rate: 5.25, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      { id: 'vaz-cam-3', minVA: 20000, maxVA: 24999, rate: 4.25, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      { id: 'vaz-cam-4', minVA: 25000, maxVA: 29999, rate: 4.25, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      { id: 'vaz-cam-5', minVA: 30000, maxVA: 34999, rate: 2.40, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      { id: 'vaz-cam-6', minVA: 35000, maxVA: 69999, rate: 2.20, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      { id: 'vaz-cam-7', minVA: 70000, maxVA: 999999, rate: 2.20, rcLimit: 30000, vehicleType: 'CAMIONETA' },
      // PRODUCTO 3: GENERAL / OTROS
      { id: 'vaz-gen-1', minVA: 0, maxVA: 15000, rate: 5.30, rcLimit: 30000 },
      { id: 'vaz-gen-2', minVA: 15001, maxVA: 19999, rate: 4.80, rcLimit: 30000 },
      { id: 'vaz-gen-3', minVA: 20000, maxVA: 24999, rate: 4.30, rcLimit: 30000 },
      { id: 'vaz-gen-4', minVA: 25000, maxVA: 29999, rate: 2.90, rcLimit: 30000 },
      { id: 'vaz-gen-5', minVA: 30000, maxVA: 34999, rate: 2.70, rcLimit: 30000 },
      { id: 'vaz-gen-6', minVA: 35000, maxVA: 69999, rate: 2.50, rcLimit: 30000 },
      { id: 'vaz-gen-7', minVA: 70000, maxVA: 999999, rate: 2.30, rcLimit: 30000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sweaden',
    name: 'Sweaden Seguros',
    slug: 'sweaden',
    color: '#004B87',
    logoText: 'SWEADEN',
    maxVehicleAge: 15,
    active: true,
    notes: 'Responsabilidad Civil de hasta $50,000 USD (la más alta del mercado).',
    conditions: {
      choque: '10% del Valor Siniestro, 1% Valor Asegurado no menor a $250 (taller sin convenio +30%)',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$300 por evento nacional',
      autoSustituto: 'No Aplica',
      amparoPatrimonial: 'Incluido sin costo',
      talleresAutorizados: 'Red de talleres seleccionados y concesionarios autorizados',
    },
    rateRules: [
      { id: 'swe-1', minVA: 0, maxVA: 15000, rate: 5.00, rcLimit: 50000 },
      { id: 'swe-2', minVA: 15000.01, maxVA: 30000, rate: 3.45, rcLimit: 50000 },
      { id: 'swe-3', minVA: 30000.01, maxVA: 999999, rate: 3.20, rcLimit: 50000 },
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
    notes: 'Tarificación segmentada por antigüedad: hasta 10 años vs más de 10 años.',
    conditions: {
      choque: '10% del Valor Siniestro, Mínimo 1% del Valor Asegurado no menor a $250',
      perdidaTotal: '25% del Valor Asegurado',
      grua: '$500 por evento nacional',
      autoSustituto: 'Incluido por accidente o robo',
      amparoPatrimonial: 'Incluido (25% del valor asegurado en amparo patrimonial)',
      talleresAutorizados: 'Convenios preferenciales en todo el país',
    },
    rateRules: [
      // Antigüedad hasta 10 años
      { id: 'priv-10-1', minVA: 0, maxVA: 19999.99, rate: 2.90, rcLimit: 30000, minAge: 0, maxAge: 10 },
      { id: 'priv-10-2', minVA: 20000, maxVA: 29999.99, rate: 2.70, rcLimit: 30000, minAge: 0, maxAge: 10 },
      { id: 'priv-10-3', minVA: 30000, maxVA: 39999.99, rate: 2.50, rcLimit: 30000, minAge: 0, maxAge: 10 },
      { id: 'priv-10-4', minVA: 40000, maxVA: 999999, rate: 2.30, rcLimit: 30000, minAge: 0, maxAge: 10 },
      // Antigüedad mayor a 10 años (11 a 15 años)
      { id: 'priv-11-1', minVA: 0, maxVA: 19999.99, rate: 4.00, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'priv-11-2', minVA: 20000, maxVA: 29999.99, rate: 3.80, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'priv-11-3', minVA: 30000, maxVA: 39999.99, rate: 3.50, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'priv-11-4', minVA: 40000, maxVA: 999999, rate: 3.30, rcLimit: 30000, minAge: 11, maxAge: 15 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'atlantida',
    name: 'Seguros Atlántida',
    slug: 'atlantida',
    color: '#006699',
    logoText: 'ATLÁNTIDA',
    maxVehicleAge: 10,
    active: true,
    notes: 'Cobertura de Responsabilidad Civil de $45,000 USD y tarifas competitivas.',
    conditions: {
      choque: '10% VS, 1% VA, mín. $350 USD',
      perdidaTotal: '15% VA',
      grua: '$300 por evento nacional',
      autoSustituto: 'Incluido por accidente o robo',
      amparoPatrimonial: 'Incluido',
      talleresAutorizados: 'Red multimarca nacional',
    },
    rateRules: [
      { id: 'atl-1', minVA: 0, maxVA: 15000, rate: 3.80, rcLimit: 45000 },
      { id: 'atl-2', minVA: 15000.01, maxVA: 30000, rate: 3.50, rcLimit: 45000 },
      { id: 'atl-3', minVA: 30000.01, maxVA: 999999, rate: 3.25, rcLimit: 45000 },
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
    notes: 'Respaldo global multinacional con RC $40,000 USD y asistencia integral.',
    conditions: {
      choque: '10% del Valor Siniestro, 1% Valor Asegurado, mín. $350; el que sea mayor',
      perdidaTotal: '15% del Valor Asegurado',
      grua: '$300 por evento nacional',
      autoSustituto: 'Incluido por accidente o robo',
      amparoPatrimonial: 'Incluido',
      talleresAutorizados: 'Red VIP de concesionarios y talleres autorizados',
    },
    rateRules: [
      { id: 'zur-1', minVA: 0, maxVA: 15000, rate: 3.70, rcLimit: 40000 },
      { id: 'zur-2', minVA: 15000.01, maxVA: 30000, rate: 3.40, rcLimit: 40000 },
      { id: 'zur-3', minVA: 30000.01, maxVA: 999999, rate: 3.20, rcLimit: 40000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mapfre',
    name: 'Mapfre Seguros Ecuador',
    slug: 'mapfre',
    color: '#D8232A',
    logoText: 'MAPFRE',
    maxVehicleAge: 10,
    active: true,
    notes: 'Pérdida total con el deducible más bajo del mercado (10% VA). RC $35,000.',
    conditions: {
      choque: '10% V.S., 1% S.A., Mín. 500 USD',
      perdidaTotal: '10% del Valor Asegurado',
      grua: '$300 por evento nacional',
      autoSustituto: 'Incluido por accidente o robo',
      amparoPatrimonial: 'Rotura de vidrios: 10% VST, 1% SA, mín. $500',
      talleresAutorizados: 'Red de concesionarios Mapfre ServiAuto',
    },
    rateRules: [
      { id: 'map-1', minVA: 0, maxVA: 15000, rate: 3.60, rcLimit: 35000 },
      { id: 'map-2', minVA: 15000.01, maxVA: 30000, rate: 3.30, rcLimit: 35000 },
      { id: 'map-3', minVA: 30000.01, maxVA: 999999, rate: 3.10, rcLimit: 35000 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dc-nacional',
    name: 'DC Asesores - Plan Nacional Livianos',
    slug: 'dc-nacional',
    color: '#C9A84C',
    logoText: 'DC ASESORES',
    maxVehicleAge: 15,
    active: true,
    notes: 'Producto exclusivo DC Asesores (Diego Carpio G.) a nivel nacional con $30,000 RC y sepelio.',
    conditions: {
      choque: '0-5 años: 10% VS (mín 1% VA, mín $250) | 6-10 años: 12% VS (mín 1% VA, mín $300) | 11-15 años: 12% VS (mín 1.2% VA, mín $350)',
      perdidaTotal: 'Robo: 20% VA | Choque/Otros: 15% del valor del siniestro',
      grua: '$500 por accidente (exceso remolque hasta $400, rescate $300)',
      autoSustituto: 'Fianza judicial hasta $500 para liberación vehículo o conductor',
      amparoPatrimonial: 'Amparo Patrimonial incluido sin costo. Sepelio $200, Ambulancia $100',
      talleresAutorizados: 'Concesionarios hasta 2 años; posterior talleres multimarca direccionados',
    },
    rateRules: [
      // 0 KM
      { id: 'dc-0km-1', minVA: 0, maxVA: 20000, rate: 2.90, rcLimit: 30000, minAge: 0, maxAge: 0 },
      { id: 'dc-0km-2', minVA: 20000.01, maxVA: 30000, rate: 2.50, rcLimit: 30000, minAge: 0, maxAge: 0 },
      { id: 'dc-0km-3', minVA: 30000.01, maxVA: 999999, rate: 2.20, rcLimit: 30000, minAge: 0, maxAge: 0 },
      // 1 a 5 años
      { id: 'dc-1-5-1', minVA: 0, maxVA: 20000, rate: 3.30, rcLimit: 30000, minAge: 1, maxAge: 5 },
      { id: 'dc-1-5-2', minVA: 20000.01, maxVA: 30000, rate: 3.10, rcLimit: 30000, minAge: 1, maxAge: 5 },
      { id: 'dc-1-5-3', minVA: 30000.01, maxVA: 999999, rate: 2.30, rcLimit: 30000, minAge: 1, maxAge: 5 },
      // 6 a 10 años
      { id: 'dc-6-10-1', minVA: 0, maxVA: 20000, rate: 3.60, rcLimit: 30000, minAge: 6, maxAge: 10 },
      { id: 'dc-6-10-2', minVA: 20000.01, maxVA: 30000, rate: 3.30, rcLimit: 30000, minAge: 6, maxAge: 10 },
      { id: 'dc-6-10-3', minVA: 30000.01, maxVA: 999999, rate: 2.60, rcLimit: 30000, minAge: 6, maxAge: 10 },
      // 11 a 15 años
      { id: 'dc-11-15-1', minVA: 0, maxVA: 20000, rate: 4.30, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'dc-11-15-2', minVA: 20000.01, maxVA: 30000, rate: 4.10, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'dc-11-15-3', minVA: 30000.01, maxVA: 999999, rate: 3.80, rcLimit: 30000, minAge: 11, maxAge: 15 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dc-clasicos',
    name: 'DC Asesores - Livianos 16 a 25 Años',
    slug: 'dc-clasicos',
    color: '#8A5340',
    logoText: 'DC CLÁSICOS',
    maxVehicleAge: 25,
    active: true,
    notes: 'Producto especial Todo Riesgo para vehículos livianos de 16 a 25 años de antigüedad (no clásicos de colección).',
    conditions: {
      choque: '15% del Valor Siniestro, 2% Valor Asegurado no menor a $500',
      perdidaTotal: '35% del Valor Asegurado (por robo o choque)',
      grua: 'Asistencia vehicular por accidente: 1 evento al año',
      autoSustituto: 'Auto sustituto $40 adicional',
      amparoPatrimonial: 'Gastos Médicos $2.500 ($500/ocupante). Accidentes Personales $5.000 ($1.000/ocupante). Gastos Judiciales $500',
      talleresAutorizados: 'Talleres Multimarca direccionados por la compañía',
    },
    rateRules: [
      { id: 'dc-clas-1', minVA: 0, maxVA: 999999, rate: 5.00, rcLimit: 5000, minAge: 16, maxAge: 25 },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dc-pesados',
    name: 'DC Asesores - Vehículos Pesados e HINO',
    slug: 'dc-pesados',
    color: '#059669',
    logoText: 'DC PESADOS',
    maxVehicleAge: 15,
    active: true,
    notes: 'Producto especializado para camiones, volquetas y cabezales individuales. Tasas preferenciales y condiciones HINO.',
    conditions: {
      choque: 'VA < $50.000: 12% VS, 2% VA, mín $500 | VA > $50.000: 15% VS, 2% VA, mín $750',
      perdidaTotal: 'Robo: 25% VA (HINO requiere dispositivo satelital activo) | Otros: 20% VS',
      grua: 'Wincha por accidente hasta $1.000 USD',
      autoSustituto: 'Lucro cesante opcional $200/día por 20 días ($4.000 max en talleres de convenio)',
      amparoPatrimonial: 'Amparo Patrimonial 30% VS (0.30% adicional a la prima). Vidrios 10% VS mín $100',
      talleresAutorizados: 'Talleres de convenio y multimarca a nivel nacional',
    },
    rateRules: [
      // 1 a 10 años
      { id: 'dc-pes-1', minVA: 15000, maxVA: 50000, rate: 3.40, rcLimit: 30000, minAge: 1, maxAge: 10 },
      { id: 'dc-pes-2', minVA: 50000.01, maxVA: 100000, rate: 3.20, rcLimit: 30000, minAge: 1, maxAge: 10 },
      { id: 'dc-pes-3', minVA: 100000.01, maxVA: 999999, rate: 3.00, rcLimit: 30000, minAge: 1, maxAge: 10 },
      // 11 a 15 años
      { id: 'dc-pes-4', minVA: 15000, maxVA: 50000, rate: 3.60, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'dc-pes-5', minVA: 50000.01, maxVA: 100000, rate: 3.40, rcLimit: 30000, minAge: 11, maxAge: 15 },
      { id: 'dc-pes-6', minVA: 100000.01, maxVA: 999999, rate: 3.30, rcLimit: 30000, minAge: 11, maxAge: 15 },
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
