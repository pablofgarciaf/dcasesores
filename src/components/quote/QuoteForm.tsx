'use client';

import React, { useState, useEffect } from 'react';
import { QuoteInput } from '../../types';
import {
  Car,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Phone,
  Sparkles,
  Shield,
  CheckCircle2,
} from 'lucide-react';

interface QuoteFormProps {
  initialValues: QuoteInput;
  onValuesChange: (values: QuoteInput) => void;
  onSubmitQuote: (values: QuoteInput) => void;
  isLoading?: boolean;
}

const VEHICLE_PRESETS = [
  'Chevrolet D-Max',
  'Toyota Hilux',
  'Kia Sportage',
  'Hyundai Tucson',
  'Renault Duster',
];

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialValues,
  onValuesChange,
  onSubmitQuote,
  isLoading = false,
}) => {
  const [clientName, setClientName] = useState(initialValues.clientName);
  const [clientPhone, setClientPhone] = useState(initialValues.clientPhone);
  const [clientEmail, setClientEmail] = useState(initialValues.clientEmail || '');
  const [vehicleBrandModel, setVehicleBrandModel] = useState(initialValues.vehicleBrandModel);
  const [vehicleYear, setVehicleYear] = useState(initialValues.vehicleYear);
  const [vehicleValue, setVehicleValue] = useState(initialValues.vehicleValue);
  const [city, setCity] = useState(initialValues.city);
  const [productPreference, setProductPreference] = useState(
    initialValues.productPreference || 'LIVIANO_CLASSIC'
  );

  const currentYear = new Date().getFullYear();

  // Emisión reactiva continua para cálculo instantáneo
  useEffect(() => {
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
  }, [
    clientName,
    clientPhone,
    clientEmail,
    vehicleBrandModel,
    vehicleYear,
    vehicleValue,
    city,
    productPreference,
    onValuesChange,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 overflow-hidden">
      
      {/* Header del formulario */}
      <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#e11b22]/20 border border-[#e11b22]/40 flex items-center justify-center text-[#e11b22]">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight text-white">
              Datos del Vehículo
            </h2>
            <p className="text-[11px] text-slate-400">
              Cálculo actuarial en tiempo real
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Sparkles className="w-3 h-3" />
          Ecuador 2026
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
        
        {/* 1. Datos del Solicitante */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#e11b22]" />
              1. Asegurado
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] bg-slate-50 focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                WhatsApp / Celular *
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="Ej. 0998765432"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] bg-slate-50 focus:bg-white transition-all font-mono font-medium"
              />
            </div>
          </div>
        </div>

        {/* 2. Especificaciones del Vehículo */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Car className="w-3 h-3 text-[#e11b22]" />
            2. Especificaciones
          </span>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Marca y Modelo *
            </label>
            <input
              type="text"
              required
              value={vehicleBrandModel}
              onChange={(e) => setVehicleBrandModel(e.target.value)}
              placeholder="Ej. Chevrolet D-Max 4x4"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] bg-slate-50 focus:bg-white transition-all font-medium"
            />
            
            {/* Presets rápidos */}
            <div className="mt-1.5 flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
              {VEHICLE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVehicleBrandModel(preset)}
                  className="shrink-0 px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-[#e11b22] text-slate-600 border border-slate-200/70 transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Año Fabricación *
              </label>
              <select
                value={vehicleYear}
                onChange={(e) => setVehicleYear(Number(e.target.value))}
                className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#e11b22] bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium"
              >
                {Array.from({ length: 18 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>
                    {y} ({currentYear - y}a)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Ciudad Circulación *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as any)}
                className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#e11b22] bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium"
              >
                <option value="UIO">Quito (Pichincha)</option>
                <option value="GYE">Guayaquil (Guayas)</option>
                <option value="CUE">Cuenca (Azuay)</option>
                <option value="OTRAS">Otras Provincias</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Nivel de Cobertura */}
        <div className="pt-3 border-t border-slate-100">
          <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>Nivel de Cobertura</span>
            <span className="text-[10px] text-slate-400 font-normal">Responsabilidad Civil</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setProductPreference('LIVIANO_CLASSIC')}
              className={`px-3 py-2 text-xs rounded-xl border text-center transition-all cursor-pointer font-bold ${
                productPreference === 'LIVIANO_CLASSIC'
                  ? 'bg-red-50 border-[#e11b22] text-[#e11b22] shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Estándar
            </button>
            <button
              type="button"
              onClick={() => setProductPreference('LIVIANO_GOLD')}
              className={`px-3 py-2 text-xs rounded-xl border text-center transition-all cursor-pointer font-bold ${
                productPreference === 'LIVIANO_GOLD'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Gold ($50k RC)
            </button>
          </div>
        </div>

        {/* 4. Valor Asegurado */}
        <div className="pt-3 border-t border-slate-100 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-black text-slate-800 uppercase tracking-wide flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Valor Comercial ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-2 top-1 text-slate-400 text-xs font-bold">$</span>
              <input
                type="number"
                min="3000"
                max="100000"
                step="500"
                value={vehicleValue}
                onChange={(e) => setVehicleValue(Number(e.target.value))}
                className="w-28 pl-5 pr-2 py-1 text-xs font-black text-right font-mono rounded-lg border border-slate-300 focus:outline-none focus:border-[#e11b22] bg-white text-slate-900 shadow-2xs"
              />
            </div>
          </div>

          <input
            type="range"
            min="5000"
            max="60000"
            step="500"
            value={vehicleValue}
            onChange={(e) => setVehicleValue(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#e11b22]"
          />
          
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>$5k</span>
            <span>$20k</span>
            <span>$35k</span>
            <span>$50k+</span>
          </div>
        </div>

        {/* Botón de Cotización Principal */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-[#e11b22] hover:brightness-110 text-white font-black text-sm shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-red-200 animate-pulse" />
            <span>⚡ Cotizar y Comparar Ofertas</span>
          </button>
        </div>

      </form>
    </div>
  );
};
