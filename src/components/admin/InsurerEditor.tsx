/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — InsurerEditor.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/admin/InsurerEditor.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Panel de Administración & CMS
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Panel de Administración
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L35   → Imports de Firestore, Lucide React y tipos
 *   L36-L110 → Estado local de la aseguradora seleccionada y handlers de matriz
 *   L111-L320→ Formularios de condiciones, deducibles y tabla multidimensional de tasas
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { Insurer, RateRule, CityCategory, ProductType } from '../../types';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import {
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Shield,
  Layers,
  Wrench,
  Percent,
  Sliders,
  DollarSign,
} from 'lucide-react';

interface InsurerEditorProps {
  insurers: Insurer[];
  onInsurersUpdated: (updatedInsurers: Insurer[]) => void;
}

export const InsurerEditor: React.FC<InsurerEditorProps> = ({
  insurers,
  onInsurersUpdated,
}) => {
  const [selectedInsurerId, setSelectedInsurerId] = useState<string>(insurers[0]?.id || 'alianza');
  const selectedInsurer = insurers.find((ins) => ins.id === selectedInsurerId) || insurers[0];

  const [formData, setFormData] = useState<Insurer>({ ...selectedInsurer });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // When dropdown selection changes, sync form data
  const handleSelectInsurer = (id: string) => {
    setSelectedInsurerId(id);
    const target = insurers.find((i) => i.id === id);
    if (target) {
      setFormData({ ...target });
    }
  };

  const handleSaveInsurer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      const payload: Insurer = {
        ...formData,
        maxVehicleAge: Number(formData.maxVehicleAge),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'insurers', payload.id), payload);
      await setDoc(doc(db, 'aseguradoras', payload.id), payload);

      const updatedList = insurers.map((item) => (item.id === payload.id ? payload : item));
      onInsurersUpdated(updatedList);
      setToast(`¡Aseguradora ${payload.name} actualizada con éxito en Firestore!`);
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `insurers/${formData.id}`);
    } finally {
      setSaving(false);
    }
  };

  // Rate Rule Handlers
  const handleUpdateRule = (index: number, field: keyof RateRule, value: any) => {
    const updated = [...formData.rateRules];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setFormData({ ...formData, rateRules: updated });
  };

  const handleAddRule = () => {
    const newRule: RateRule = {
      id: `rule-${Date.now()}`,
      minVA: 0,
      maxVA: 999999,
      rate: 3.50,
      rcLimit: 30000,
    };
    setFormData({
      ...formData,
      rateRules: [...formData.rateRules, newRule],
    });
  };

  const handleRemoveRule = (index: number) => {
    if (formData.rateRules.length <= 1) {
      alert('La aseguradora debe poseer al menos una regla de tarificación.');
      return;
    }
    const updated = formData.rateRules.filter((_, i) => i !== index);
    setFormData({ ...formData, rateRules: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Selector de Aseguradora Activa */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Seleccionar Aseguradora a Configurar:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {insurers.map((ins) => (
                <button
                  key={ins.id}
                  type="button"
                  onClick={() => handleSelectInsurer(ins.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    ins.id === selectedInsurerId
                      ? 'bg-sky-800 text-white border-sky-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {ins.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Estado:</span>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
              />
              <span className="text-xs font-bold text-slate-700">
                {formData.active ? 'Habilitada en Cotizador' : 'Inactiva (Oculta)'}
              </span>
            </label>
          </div>
        </div>
      </div>

      {toast && (
        <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <form onSubmit={handleSaveInsurer} className="p-6 space-y-6">
        
        {/* 1. Datos Generales de la Compañía */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            1. Perfil Corporativo y Límites
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Razón Social / Nombre Comercial
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Antigüedad Máx. (Años)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.maxVehicleAge}
                onChange={(e) => setFormData({ ...formData, maxVehicleAge: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-mono font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Ej: 15 años (Alianza), 10 años (Hispana)
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Color de Marca
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.color || '#0284C7'}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-10 h-8 rounded border border-slate-300 p-0.5 cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-600">
                  {formData.color}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Deducibles y Condiciones */}
        <div className="pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            2. Condiciones de Cobertura y Deducibles
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deducible Choque / Accidente
              </label>
              <input
                type="text"
                required
                value={formData.conditions.choque}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    conditions: { ...formData.conditions, choque: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                placeholder="Ej. 10% del siniestro, mín $250"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deducible Pérdida Total (Robo/Daño)
              </label>
              <input
                type="text"
                required
                value={formData.conditions.perdidaTotal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    conditions: { ...formData.conditions, perdidaTotal: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                placeholder="Ej. 10% del valor asegurado"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Servicio de Grúa y Asistencia
              </label>
              <input
                type="text"
                required
                value={formData.conditions.grua}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    conditions: { ...formData.conditions, grua: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                placeholder="Ej. $500 por evento nacional"
              />
            </div>
          </div>
        </div>

        {/* 3. Matriz de Tarifas Multidimensional */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5" />
                3. Matriz Actuarial de Tasas y Responsabilidad Civil
              </h4>
              <p className="text-[11px] text-slate-500">
                El motor matemático resuelve la tasa según el rango de valor, ciudad, antigüedad y tipo de producto.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddRule}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Regla</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2 px-3">VA Mín ($)</th>
                  <th className="py-2 px-3">VA Máx ($)</th>
                  <th className="py-2 px-3">Ciudad</th>
                  <th className="py-2 px-3">Producto</th>
                  <th className="py-2 px-3">Antigüedad</th>
                  <th className="py-2 px-3">Tasa %</th>
                  <th className="py-2 px-3">RC ($)</th>
                  <th className="py-2 px-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {formData.rateRules.map((rule, idx) => (
                  <tr key={rule.id || idx} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="500"
                        value={rule.minVA}
                        onChange={(e) => handleUpdateRule(idx, 'minVA', parseFloat(e.target.value) || 0)}
                        className="w-20 px-1.5 py-1 rounded border border-slate-300 bg-white"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="500"
                        value={rule.maxVA > 999999 ? 999999 : rule.maxVA}
                        onChange={(e) => handleUpdateRule(idx, 'maxVA', parseFloat(e.target.value) || 0)}
                        className="w-20 px-1.5 py-1 rounded border border-slate-300 bg-white"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={rule.cityCategory || ''}
                        onChange={(e) => handleUpdateRule(idx, 'cityCategory', e.target.value ? (e.target.value as CityCategory) : undefined)}
                        className="px-1.5 py-1 rounded border border-slate-300 bg-white font-sans text-xs"
                      >
                        <option value="">Todas</option>
                        <option value="UIO_GYE_CUE">UIO/GYE/CUE</option>
                        <option value="OTRAS">Otras</option>
                      </select>
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={rule.productType || ''}
                        onChange={(e) => handleUpdateRule(idx, 'productType', e.target.value ? (e.target.value as ProductType) : undefined)}
                        className="px-1.5 py-1 rounded border border-slate-300 bg-white font-sans text-xs"
                      >
                        <option value="">Estándar</option>
                        <option value="LIVIANO_CLASSIC">Classic</option>
                        <option value="LIVIANO_GOLD">Gold</option>
                      </select>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1 font-mono">
                        <input
                          type="number"
                          placeholder="Mín"
                          value={rule.minAge ?? ''}
                          onChange={(e) => handleUpdateRule(idx, 'minAge', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-12 px-1 py-1 rounded border border-slate-300 bg-white text-center"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Máx"
                          value={rule.maxAge ?? ''}
                          onChange={(e) => handleUpdateRule(idx, 'maxAge', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-12 px-1 py-1 rounded border border-slate-300 bg-white text-center"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.01"
                        value={rule.rate}
                        onChange={(e) => handleUpdateRule(idx, 'rate', parseFloat(e.target.value) || 0)}
                        className="w-16 px-1.5 py-1 rounded border border-slate-300 bg-white font-bold text-sky-800 text-right"
                      />
                      <span className="ml-1">%</span>
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="5000"
                        value={rule.rcLimit}
                        onChange={(e) => handleUpdateRule(idx, 'rcLimit', parseFloat(e.target.value) || 0)}
                        className="w-20 px-1.5 py-1 rounded border border-slate-300 bg-white text-right"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveRule(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                        title="Eliminar regla"
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
            <span>{saving ? 'Guardando en Firestore...' : `Guardar Matriz de ${formData.name}`}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
