/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — QuoteForm.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/QuoteForm.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Cotizador Público
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L25   → Imports de React, Lucide Icons y tipos
 *   L26-L90  → Estado local de inputs, validación y presets de vehículos
 *   L91-L260 → Markup de formulario con slider reactivo, selects y feedback de error
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { Car, DollarSign, Calendar, MapPin, User, Phone, Sparkles, Check } from 'lucide-react';
import { QuoteInput, ProductType } from '../../types';

interface QuoteFormProps {
  initialValues?: Partial<QuoteInput>;
  onValuesChange: (values: QuoteInput) => void;
  onSubmitQuote: (values: QuoteInput) => void;
  isLoading?: boolean;
}

const VEHICLE_PRESETS = [
  'Chevrolet D-Max',
  'Kia Sportage R',
  'Toyota Hilux',
  'Hyundai Tucson',
  'Renault Duster',
  'Suzuki Grand Vitara',
  'Chevrolet Tracker',
  'Chery Tiggo 2',
];

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialValues,
  onValuesChange,
  onSubmitQuote,
  isLoading = false,
}) => {
  const currentYear = new Date().getFullYear();

  const [clientName, setClientName] = useState(initialValues?.clientName || 'Carlos Mendoza');
  const [clientPhone, setClientPhone] = useState(initialValues?.clientPhone || '0998765432');
  const [clientEmail, setClientEmail] = useState(initialValues?.clientEmail || '');
  const [vehicleBrandModel, setVehicleBrandModel] = useState(initialValues?.vehicleBrandModel || 'Chevrolet D-Max');
  const [vehicleYear, setVehicleYear] = useState<number>(initialValues?.vehicleYear || currentYear - 2);
  const [vehicleValue, setVehicleValue] = useState<number>(initialValues?.vehicleValue || 22000);
  const [city, setCity] = useState<'UIO' | 'GYE' | 'CUE' | 'OTRAS'>(initialValues?.city || 'UIO');
  const [productPreference, setProductPreference] = useState<ProductType>('LIVIANO_CLASSIC');

  // Trigger reactive calculation when parameters change
  useEffect(() => {
    if (vehicleValue > 0 && vehicleYear > 1990) {
      onValuesChange({
        clientName,
        clientPhone,
        clientEmail,
        vehicleBrandModel,
        vehicleYear,
        vehicleValue,
        city,
        productPreference,
      });
    }
  }, [clientName, clientPhone, clientEmail, vehicleBrandModel, vehicleYear, vehicleValue, city, productPreference, onValuesChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Por favor, ingresa tu nombre completo.');
      return;
    }
    if (!clientPhone.trim() || clientPhone.length < 9) {
      alert('Por favor, ingresa un número de teléfono / WhatsApp válido.');
      return;
    }
    if (vehicleValue < 2000) {
      alert('El valor comercial mínimo para asegurar es de $2,000 USD.');
      return;
    }

    onSubmitQuote({
      clientName,
      clientPhone,
      clientEmail,
      vehicleBrandModel,
      vehicleYear,
      vehicleValue,
      city,
      productPreference,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header del formulario */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600/30 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                Datos del Vehículo y Asegurado
              </h2>
              <p className="text-xs text-slate-300">
                Cálculo actuarial instantáneo en tiempo real
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Tarifas 2026
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Sección: Datos del Propietario */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            1. Datos del Solicitante
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nombre Completo *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white transition-all"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                WhatsApp / Celular *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ej. 0991234567"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white transition-all font-mono"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Vehículo */}
        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" />
            2. Especificaciones del Auto
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Marca y Modelo */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Marca y Modelo *
              </label>
              <input
                type="text"
                required
                value={vehicleBrandModel}
                onChange={(e) => setVehicleBrandModel(e.target.value)}
                placeholder="Ej. Chevrolet D-Max 4x4"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white transition-all"
              />
              
              {/* Presets rápidos */}
              <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-slate-500 text-[11px]">
                <span className="shrink-0 text-slate-400">Modelos frecuentes:</span>
                {VEHICLE_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setVehicleBrandModel(preset)}
                    className="shrink-0 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60 transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Año */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Año de Fabricación *
              </label>
              <div className="relative">
                <select
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(Number(e.target.value))}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white transition-all appearance-none cursor-pointer"
                >
                  {Array.from({ length: 18 }, (_, i) => currentYear - i).map((y) => (
                    <option key={y} value={y}>
                      {y} ({currentYear - y} años)
                    </option>
                  ))}
                </select>
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Sección: Ciudad y Valor Comercial */}
        <div className="pt-2 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Ciudad de Circulación */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ciudad Principal de Circulación *
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="UIO">Quito (Pichincha)</option>
                  <option value="GYE">Guayaquil (Guayas)</option>
                  <option value="CUE">Cuenca (Azuay)</option>
                  <option value="OTRAS">Otras Provincias / Cantones</option>
                </select>
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Aseguradoras como Alianza aplican tasas preferenciales según la provincia.
              </p>
            </div>

            {/* Nivel de Cobertura */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nivel de Cobertura
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProductPreference('LIVIANO_CLASSIC')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                    productPreference === 'LIVIANO_CLASSIC'
                      ? 'bg-red-50 border-red-600 text-red-900 font-semibold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Cobertura Estándar
                </button>
                <button
                  type="button"
                  onClick={() => setProductPreference('LIVIANO_GOLD')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                    productPreference === 'LIVIANO_GOLD'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 font-semibold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Cobertura Gold ($50k RC)
                </button>
              </div>
            </div>

          </div>

          {/* Slider y Entrada de Valor Asegurado */}
          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Valor Comercial Asegurado (Suma Asegurada)
                </label>
                <p className="text-[11px] text-slate-500">
                  Valor estimado según la tabla de la Asociación de Empresas Automotrices del Ecuador (AEADE)
                </p>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="3000"
                  max="100000"
                  step="500"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(Number(e.target.value))}
                  className="w-36 pl-7 pr-3 py-1.5 text-base font-bold text-right font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-slate-900 shadow-2xs"
                />
                <span className="absolute left-2.5 top-2 text-slate-400 font-semibold">$</span>
              </div>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="5000"
              max="50000"
              step="500"
              value={vehicleValue}
              onChange={(e) => setVehicleValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#e11b22]"
            />
            
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>$5,000</span>
              <span>$15,000</span>
              <span>$25,000</span>
              <span>$35,000</span>
              <span>$50,000+</span>
            </div>
          </div>

        </div>

        {/* Botón de Cotización Principal con flecha indicadora */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-[#e11b22] hover:brightness-110 text-white font-black text-base shadow-lg shadow-red-600/30 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-red-200 animate-pulse" />
            <span>Comparar Todas las Aseguradoras y Ver Cotizaciones ↓</span>
          </button>
        </div>

      </form>
    </div>
  );
};
