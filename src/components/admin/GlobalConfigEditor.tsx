/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — GlobalConfigEditor.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/admin/GlobalConfigEditor.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Panel de Administración & CMS
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Panel de Administración
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L30   → Imports de Firestore, Lucide React y tipos
 *   L31-L85  → Estado local de impuestos de Ecuador y tiers de emisión
 *   L86-L230 → Formulario interactivo con persistencia directa a Firestore
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { GlobalTaxConfig, EmissionTier } from '../../types';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Save, RotateCcw, Plus, Trash2, CheckCircle2, AlertTriangle, Percent, Receipt } from 'lucide-react';
import { INITIAL_GLOBAL_CONFIG } from '../../lib/seedData';

interface GlobalConfigEditorProps {
  currentConfig: GlobalTaxConfig;
  onConfigSaved: (config: GlobalTaxConfig) => void;
}

export const GlobalConfigEditor: React.FC<GlobalConfigEditorProps> = ({
  currentConfig,
  onConfigSaved,
}) => {
  const [config, setConfig] = useState<GlobalTaxConfig>(currentConfig);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToastMessage(null);

    try {
      const payload: GlobalTaxConfig = {
        ...config,
        superRate: Number(config.superRate),
        sscRate: Number(config.sscRate),
        ivaRate: Number(config.ivaRate),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'config', 'parameters'), payload);
      await setDoc(doc(db, 'parametros_legales', 'actual'), payload);
      onConfigSaved(payload);
      setToastMessage('¡Parámetros impositivos y escala de emisión guardados con éxito en Firestore!');
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'config/parameters');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToOfficial = () => {
    if (window.confirm('¿Deseas restaurar las tasas oficiales de la Ley de Seguros del Ecuador (SUPER 3.5%, SSC 0.5%, IVA 15%)?')) {
      setConfig({ ...INITIAL_GLOBAL_CONFIG });
    }
  };

  const updateTier = (index: number, field: keyof EmissionTier, value: number) => {
    const updated = [...config.emissionTiers];
    updated[index] = {
      ...updated[index],
      [field]: Number(value),
    };
    setConfig({ ...config, emissionTiers: updated });
  };

  const addTier = () => {
    const lastTier = config.emissionTiers[config.emissionTiers.length - 1];
    const newTier: EmissionTier = {
      id: `tier-${Date.now()}`,
      minNetPremium: lastTier ? lastTier.maxNetPremium : 0,
      maxNetPremium: lastTier ? lastTier.maxNetPremium + 1000 : 500,
      fee: lastTier ? lastTier.fee + 2 : 1,
    };
    setConfig({
      ...config,
      emissionTiers: [...config.emissionTiers, newTier],
    });
  };

  const removeTier = (index: number) => {
    if (config.emissionTiers.length <= 1) {
      alert('Debe existir al menos un escalón de derechos de emisión.');
      return;
    }
    const updated = config.emissionTiers.filter((_, i) => i !== index);
    setConfig({ ...config, emissionTiers: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Cabecera */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-sky-700" />
            Parámetros Fiscales y Emisión (Ley de Seguros del Ecuador)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Afecta a todas las cotizaciones de Alianza, Latina, Hispana, Vaz y Privilegio en tiempo real.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToOfficial}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer Tasas de Ley</span>
        </button>
      </div>

      {toastMessage && (
        <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 space-y-6">
        
        {/* Bloque de Tasas Porcentuales */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" />
            1. Tasas Legales Obligatorias
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* SUPER */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Superintendencia de Compañías (SUPER)
              </label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="0.20"
                  value={config.superRate}
                  onChange={(e) => setConfig({ ...config, superRate: parseFloat(e.target.value) || 0 })}
                  className="w-24 px-3 py-1.5 text-sm font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span className="text-xs font-semibold text-slate-600">
                  = {(config.superRate * 100).toFixed(2)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Aplicado directamente sobre la Prima Neta. Oficial: 3.50% (0.035).
              </p>
            </div>

            {/* SSC */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Seguro Social Campesino (SSC)
              </label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="0.10"
                  value={config.sscRate}
                  onChange={(e) => setConfig({ ...config, sscRate: parseFloat(e.target.value) || 0 })}
                  className="w-24 px-3 py-1.5 text-sm font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span className="text-xs font-semibold text-slate-600">
                  = {(config.sscRate * 100).toFixed(2)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Aplicado directamente sobre la Prima Neta. Oficial: 0.50% (0.005).
              </p>
            </div>

            {/* IVA */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Impuesto al Valor Agregado (IVA)
              </label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="0.30"
                  value={config.ivaRate}
                  onChange={(e) => setConfig({ ...config, ivaRate: parseFloat(e.target.value) || 0 })}
                  className="w-24 px-3 py-1.5 text-sm font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span className="text-xs font-semibold text-slate-600">
                  = {(config.ivaRate * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Aplicado sobre el Subtotal (PN + SUPER + SSC + Emisión). Ley 2024: 15.00%.
              </p>
            </div>

          </div>
        </div>

        {/* Bloque de Escala de Derechos de Emisión */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5" />
                2. Escala Escalonada de Derechos de Emisión (USD)
              </h4>
              <p className="text-[11px] text-slate-500">
                La tarifa fija de emisión se determina automáticamente según el rango donde se ubique la Prima Neta.
              </p>
            </div>

            <button
              type="button"
              onClick={addTier}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Escalón</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Escalón</th>
                  <th className="py-2.5 px-3">Prima Neta Mínima ($)</th>
                  <th className="py-2.5 px-3">Prima Neta Máxima ($)</th>
                  <th className="py-2.5 px-3">Tasa Fija Emisión ($)</th>
                  <th className="py-2.5 px-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {config.emissionTiers.map((tier, idx) => (
                  <tr key={tier.id || idx} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 font-sans font-semibold text-slate-700">
                      Nivel {idx + 1}
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.01"
                        value={tier.minNetPremium}
                        onChange={(e) => updateTier(idx, 'minNetPremium', parseFloat(e.target.value) || 0)}
                        className="w-28 px-2 py-1 rounded border border-slate-300 bg-white"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.01"
                        value={tier.maxNetPremium > 999999 ? 999999 : tier.maxNetPremium}
                        onChange={(e) => updateTier(idx, 'maxNetPremium', parseFloat(e.target.value) || 0)}
                        className="w-28 px-2 py-1 rounded border border-slate-300 bg-white"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.1"
                        value={tier.fee}
                        onChange={(e) => updateTier(idx, 'fee', parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-1 rounded border border-slate-300 bg-white font-bold text-sky-800"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeTier(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                        title="Eliminar escalón"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botón de Guardado */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-semibold text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Guardando en Firestore...' : 'Guardar Parámetros Globales'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
