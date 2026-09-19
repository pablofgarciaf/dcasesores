/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — LeadRegistrationModal.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/LeadRegistrationModal.tsx
 * 🏷️ Type: Client Component (Lead Capture Gate)
 * 📦 Module: Cotizador Público & CRM
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Imports de Lucide React, Logo y tipos
 *   L26-L80  → Captura obligatoria de Correo y Usuario antes de la descarga
 *   L81-L200 → Guardado en Firestore 'consultas' y llamada al generador de PDF
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { User, Mail, Phone, FileDown, X, ShieldCheck, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { DcLogo } from '../common/DcLogo';
import { QuoteInput } from '../../types';

interface LeadRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInput: QuoteInput;
  mode: 'all' | 'single';
  targetInsurerName?: string;
  onConfirmDownload: (userData: { name: string; email: string; phone: string }) => void;
  isProcessing?: boolean;
}

export const LeadRegistrationModal: React.FC<LeadRegistrationModalProps> = ({
  isOpen,
  onClose,
  currentInput,
  mode,
  targetInsurerName,
  onConfirmDownload,
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(currentInput.clientName || '');
  const [email, setEmail] = useState(currentInput.clientEmail || '');
  const [phone, setPhone] = useState(currentInput.clientPhone || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Por favor ingresa un correo electrónico válido para enviar tu proforma.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setError('Por favor ingresa tu número de WhatsApp para contacto.');
      return;
    }

    setError(null);
    onConfirmDownload({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado con Logo Oficial de DC Asesores */}
        <div className="p-6 pb-4 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
          <div className="flex justify-center mb-3">
            <DcLogo size="md" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {mode === 'all'
              ? 'Descargar Comparativa Completa (Todas las Aseguradoras)'
              : `Descargar Proforma Formal de ${targetInsurerName || 'Seguro'}`}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Ingresa tus datos para registrar tu usuario y generar la proforma oficial con validez de 15 días.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nombre y Apellido *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-white"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Correo Electrónico (Para envío de la proforma) *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carlos.mendoza@gmail.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Teléfono / WhatsApp */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Número de Celular / WhatsApp *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0998128813"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-white"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Garantía de Privacidad */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Tus datos están protegidos bajo la Ley de Protección de Datos Personales del Ecuador.</span>
          </div>

          {/* Botón de Descarga */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold text-xs transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generando y descargando PDF oficial...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>
                  {mode === 'all'
                    ? 'Generar y Descargar Todas las Proformas'
                    : 'Generar y Descargar Proforma Individual'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
