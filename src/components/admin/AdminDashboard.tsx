/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — AdminDashboard.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/admin/AdminDashboard.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Panel de Administración & CMS
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Panel de Administración
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L35   → Imports de tabs, servicios de semilla y componentes admin
 *   L36-L100 → Estados de autenticación, pestaña activa y sincronización con Firestore
 *   L101-L240→ Layout del dashboard con barra de estadísticas y conmutador de vistas
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { GlobalTaxConfig, Insurer } from '../../types';
import { INITIAL_GLOBAL_CONFIG, INITIAL_INSURERS, seedInitialDataToFirestore } from '../../lib/seedData';
import { GlobalConfigEditor } from './GlobalConfigEditor';
import { InsurerEditor } from './InsurerEditor';
import { ConsultationsCrm } from './ConsultationsCrm';
import { AdminAuth } from './AdminAuth';
import {
  Shield,
  Sliders,
  Receipt,
  Users,
  LogOut,
  RotateCcw,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface AdminDashboardProps {
  onReturnToQuote: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToQuote }) => {
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parametros' | 'aseguradoras' | 'crm'>('parametros');
  const [globalConfig, setGlobalConfig] = useState<GlobalTaxConfig>(INITIAL_GLOBAL_CONFIG);
  const [insurers, setInsurers] = useState<Insurer[]>(INITIAL_INSURERS);
  const [resetting, setResetting] = useState(false);

  // Load latest data from Firestore
  const loadData = async () => {
    try {
      const configSnap = await getDoc(doc(db, 'config', 'parameters'));
      if (configSnap.exists()) {
        setGlobalConfig(configSnap.data() as GlobalTaxConfig);
      }

      const insurersSnap = await getDocs(collection(db, 'insurers'));
      if (!insurersSnap.empty) {
        const list = insurersSnap.docs.map((d) => d.data() as Insurer);
        if (list.length > 0) {
          setInsurers(list);
        }
      }
    } catch (err) {
      console.warn('Carga de datos CMS en Firestore:', err);
    }
  };

  useEffect(() => {
    if (adminUser) {
      loadData();
    }
  }, [adminUser]);

  const handleResetAllToOfficial = async () => {
    if (
      window.confirm(
        '¿Deseas restaurar todas las matrices de aseguradoras (Alianza, Latina, Hispana, Vaz, Privilegio) e impuestos a los valores iniciales oficiales?'
      )
    ) {
      setResetting(true);
      try {
        await seedInitialDataToFirestore(true);
        await loadData();
        alert('¡Todas las matrices y parámetros fiscales han sido restaurados con éxito!');
      } catch (err) {
        console.error(err);
      } finally {
        setResetting(false);
      }
    }
  };

  // If not logged in, render the Auth gate
  if (!adminUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4">
        <AdminAuth
          onSuccess={(email) => setAdminUser(email)}
          onBypassForDemo={() => setAdminUser('admin.demo@dcasesores.ec')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      
      {/* Barra de Control Admin */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center shadow-xs">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Panel de Administración & CMS Insurtech
                </h1>
                <p className="text-xs text-slate-500">
                  Sesión activa: <span className="font-semibold text-slate-700">{adminUser}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAllToOfficial}
                disabled={resetting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Restaura matrices a valores por defecto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>{resetting ? 'Restaurando...' : 'Restaurar Matrices'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminUser(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Selector de Pestañas */}
          <div className="flex items-center gap-2 border-t border-slate-100 pt-1 -mb-px overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('parametros')}
              className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'parametros'
                  ? 'border-sky-700 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>1. Parámetros Globales (Leyes Ecuador)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('aseguradoras')}
              className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'aseguradoras'
                  ? 'border-sky-700 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>2. Aseguradoras & Matrices de Tarifas ({insurers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('crm')}
              className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'crm'
                  ? 'border-sky-700 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>3. CRM de Consultas & Prospectos</span>
            </button>
          </div>

        </div>
      </div>

      {/* Contenido Principal de Pestañas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'parametros' && (
          <GlobalConfigEditor
            currentConfig={globalConfig}
            onConfigSaved={(updated) => setGlobalConfig(updated)}
          />
        )}

        {activeTab === 'aseguradoras' && (
          <InsurerEditor
            insurers={insurers}
            onInsurersUpdated={(updated) => setInsurers(updated)}
          />
        )}

        {activeTab === 'crm' && <ConsultationsCrm />}
      </div>

    </div>
  );
};
