/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — ConsultationsCrm.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/admin/ConsultationsCrm.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Panel de Administración & CMS
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Panel de Administración
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L35   → Imports de Firestore, Lucide React y tipos
 *   L36-L95  → Carga y estado del CRM de consultas recibidas
 *   L96-L260 → Tabla con filtros por estado, botón directo de WhatsApp y actualización
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { StoredConsultation, ConsultationStatus } from '../../types';
import {
  getStoredConsultations,
  updateConsultationStatus,
  deleteConsultation,
} from '../../lib/consultationService';
import { formatCurrency } from '../../lib/calculator';
import {
  Users,
  Search,
  MessageCircle,
  Trash2,
  CheckCircle2,
  Clock,
  Car,
  Phone,
  Calendar,
  Filter,
} from 'lucide-react';

export const ConsultationsCrm: React.FC = () => {
  const [consultations, setConsultations] = useState<StoredConsultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const data = await getStoredConsultations();
      setConsultations(data);
    } catch (err) {
      console.warn('Error al cargar consultas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ConsultationStatus) => {
    try {
      await updateConsultationStatus(id, newStatus);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      setToast('Estado actualizado con éxito.');
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro de consulta?')) {
      try {
        await deleteConsultation(id);
        setConsultations((prev) => prev.filter((c) => c.id !== id));
        setToast('Registro eliminado.');
        setTimeout(() => setToast(null), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleContactWhatsApp = (c: StoredConsultation) => {
    const rawPhone = c.clientPhone.replace(/\D/g, '');
    const cleanPhone = rawPhone.startsWith('0') ? `593${rawPhone.slice(1)}` : rawPhone;
    const msg = encodeURIComponent(
      `Hola ${c.clientName}, te saluda DC Asesores de Seguros. Recibimos tu cotización para tu ${c.vehicleBrandModel} (${c.vehicleYear}) con opción de ${c.bestPriceInsurer}. ¿Deseas que te apoyemos con la emisión de tu póliza?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const filtered = consultations.filter((c) => {
    const matchSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientPhone.includes(searchTerm) ||
      c.vehicleBrandModel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Barra de Filtros y Búsqueda */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-700" />
            CRM de Consultas y Solicitudes de Cotización
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Prospectos generados automáticamente desde el cotizador web.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cliente o auto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white w-48"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Filtro por estado */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-7 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white appearance-none cursor-pointer font-medium text-slate-700"
            >
              <option value="all">Todos los estados</option>
              <option value="nueva">Nuevas</option>
              <option value="contactado">Contactados</option>
              <option value="cerrada">Pólizas Cerradas</option>
              <option value="descartada">Descartadas</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={fetchConsultations}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
          >
            Actualizar
          </button>
        </div>
      </div>

      {toast && (
        <div className="mx-6 mt-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Tabla de Leads */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">
            Cargando consultas de Firestore...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No se encontraron consultas registradas con los criterios actuales.
          </div>
        ) : (
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Cliente / Contacto</th>
                <th className="py-3 px-4">Vehículo & Ciudad</th>
                <th className="py-3 px-4">Suma Asegurada</th>
                <th className="py-3 px-4">Mejor Opción</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* Fecha */}
                  <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{new Date(item.createdAt).toLocaleDateString('es-EC')}</span>
                    </div>
                  </td>

                  {/* Cliente */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{item.clientName}</div>
                    <div className="text-slate-500 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{item.clientPhone}</span>
                    </div>
                  </td>

                  {/* Auto */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{item.vehicleBrandModel} ({item.vehicleYear})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Ciudad: {item.city}
                    </div>
                  </td>

                  {/* Valor */}
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {formatCurrency(item.vehicleValue)}
                  </td>

                  {/* Mejor Opción */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{item.bestPriceInsurer || 'Varias'}</div>
                    <div className="text-[11px] font-mono text-sky-700">
                      {item.bestPriceMonthly ? `${formatCurrency(item.bestPriceMonthly)}/m` : ''}
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="py-3 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => item.id && handleStatusChange(item.id, e.target.value as ConsultationStatus)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                        item.status === 'nueva'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : item.status === 'contactado'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : item.status === 'cerrada'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <option value="nueva">Nueva</option>
                      <option value="contactado">Contactado</option>
                      <option value="cerrada">Cerrada</option>
                      <option value="descartada">Descartada</option>
                    </select>
                  </td>

                  {/* Acciones */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleContactWhatsApp(item)}
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="Contactar al cliente por WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => item.id && handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Eliminar consulta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};
