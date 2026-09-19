/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — consultationService.ts
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/lib/consultationService.ts
 * 🏷️ Type: Firestore Service Layer
 * 📦 Module: Core Compartido Actuarial & Base de Datos
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Motor Actuarial & Datos
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Imports de Firestore y tipos
 *   L26-L90  → saveQuoteConsultation para almacenar prospectos en Firestore
 *   L91-L150 → getStoredConsultations para el CRM de administración
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import { collection, addDoc, getDocs, query, orderBy, limit, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { InsurerQuoteResult, QuoteInput, StoredConsultation, ConsultationStatus } from '../types';

/**
 * Saves a quotation lead to Firestore collection 'consultas'.
 */
export async function saveQuoteConsultation(
  input: QuoteInput,
  quotes: InsurerQuoteResult[]
): Promise<string | null> {
  try {
    const bestPrice = quotes.find(q => q.isBestPrice);
    const topCoverage = quotes.find(q => q.isTopCoverage);

    const payload: Omit<StoredConsultation, 'id'> = {
      clientName: input.clientName.trim().slice(0, 100),
      clientPhone: input.clientPhone.trim().slice(0, 30),
      clientEmail: input.clientEmail?.trim().slice(0, 120) || '',
      vehicleBrandModel: input.vehicleBrandModel.trim().slice(0, 100),
      vehicleYear: Number(input.vehicleYear),
      vehicleValue: Number(input.vehicleValue),
      city: input.city.slice(0, 50),
      createdAt: new Date().toISOString(),
      status: 'nueva',
      bestPriceInsurer: bestPrice?.insurer.name || '',
      bestPriceMonthly: bestPrice?.breakdown.cuotaMensual || 0,
      topCoverageInsurer: topCoverage?.insurer.name || '',
      quotesSummary: quotes.map(q => ({
        insurerName: q.insurer.name,
        annualTotal: q.breakdown.primaTotalAnual,
        monthlyFee: q.breakdown.cuotaMensual,
        rate: q.breakdown.tasaAplicada,
        rc: q.breakdown.responsabilidadCivil,
        eligible: q.breakdown.elegible,
        reason: q.breakdown.motivoNoElegible || '',
      })),
    };

    const docRef = await addDoc(collection(db, 'consultas'), payload);
    console.log('Consulta guardada en Firestore con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.warn('Advertencia al guardar consulta:', error);
    // Silent fail on public side to prevent blocking user experience
    return null;
  }
}

/**
 * Fetches leads from 'consultas' for the Admin CRM.
 */
export async function getStoredConsultations(): Promise<StoredConsultation[]> {
  try {
    const q = query(collection(db, 'consultas'), orderBy('createdAt', 'desc'), limit(100));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<StoredConsultation, 'id'>),
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'consultas');
  }
}

/**
 * Updates lead status (nueva, contactado, cerrada, descartada).
 */
export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus
): Promise<void> {
  try {
    const ref = doc(db, 'consultas', id);
    await updateDoc(ref, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `consultas/${id}`);
  }
}

/**
 * Deletes a lead record from CRM.
 */
export async function deleteConsultation(id: string): Promise<void> {
  try {
    const ref = doc(db, 'consultas', id);
    await deleteDoc(ref);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `consultas/${id}`);
  }
}
