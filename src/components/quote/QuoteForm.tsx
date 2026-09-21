'use client';

import React, { useState, useEffect } from 'react';
import { QuoteInput, VehicleCategory, ProductType } from '../../types';
import {
  Car,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Phone,
  Sparkles,
  Shield,
  Truck,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface QuoteFormProps {
  initialValues: QuoteInput;
  onValuesChange: (values: QuoteInput) => void;
  onSubmitQuote?: (values: QuoteInput) => void;
  isLoading?: boolean;
}

const VEHICLE_CATEGORIES: { id: VehicleCategory; label: string; icon: string; desc: string }[] = [
  { id: 'CAMIONETA', label: 'Camioneta', icon: '🛻', desc: 'Pick-Up 4x2 / 4x4' },
  { id: 'SUV', label: 'SUV', icon: '🚙', desc: 'Familiar / Crossover' },
  { id: 'LIVIANO', label: 'Liviano', icon: '🚗', desc: 'Sedán / Hatchback' },
  { id: 'PESADO', label: 'Pesado', icon: '🚛', desc: 'Camión / Carga' },
];

const VEHICLE_PRESETS: { [key in VehicleCategory]: string[] } = {
  CAMIONETA: ['Chevrolet D-Max', 'Toyota Hilux', 'Ford F-150', 'Great Wall Poer'],
  SUV: ['Kia Sportage', 'Hyundai Tucson', 'Renault Duster', 'Toyota RAV4'],
  LIVIANO: ['Chevrolet Onix', 'Kia Soluto', 'Hyundai Accent', 'Toyota Yaris'],
  PESADO: ['Hino Dutro', 'Isuzu Forward', 'Chevrolet FTR', 'Fuso Canter'],
};

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialValues,
  onValuesChange,
  onSubmitQuote,
  isLoading = false,
}) => {
  const [vehicleType, setVehicleType] = useState<VehicleCategory>(
    initialValues.vehicleType || 'CAMIONETA'
  );
  const [clientName, setClientName] = useState(initialValues.clientName || 'Carlos Mendoza');
  const [clientPhone, setClientPhone] = useState(initialValues.clientPhone || '0991938754');
  const [clientEmail, setClientEmail] = useState(initialValues.clientEmail || '');
  const [vehicleBrandModel, setVehicleBrandModel] = useState(
    initialValues.vehicleBrandModel || 'Chevrolet D-Max 4x4'
  );
  const [vehicleYear, setVehicleYear] = useState(initialValues.vehicleYear || 2023);
  const [vehicleValue, setVehicleValue] = useState(initialValues.vehicleValue || 24000);
  const [city, setCity] = useState(initialValues.city || 'UIO');
  const [productPreference, setProductPreference] = useState<ProductType>(
    initialValues.productPreference || 'LIVIANO_CLASSIC'
  );

  const currentYear = new Date().getFullYear();

  // Emisión reactiva continua para cálculo instantáneo actuarial
  useEffect(() => {
    onValuesChange({
      clientName,
      clientPhone,
      clientEmail,
      vehicleBrandModel,
      vehicleYear,
      vehicleValue,
      city,
      vehicleType,
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
    vehicleType,
    productPreference,
    onValuesChange,
  ]);

  const handleCategoryChange = (cat: VehicleCategory) => {
    setVehicleType(cat);
    const presets = VEHICLE_PRESETS[cat];
    if (presets && presets.length > 0) {
      setVehicleBrandModel(presets[0]);
    }
  };

  const handleScrollToResults = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitQuote) {
      onSubmitQuote({
        clientName,
        clientPhone,
        clientEmail,
        vehicleBrandModel,
        vehicleYear,
        vehicleValue,
        city,
        vehicleType,
        productPreference,
      });
    }
    const resultsElement = document.getElementById('panel-resultados');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden transition-all">
      
      {/* BARRA HORIZONTAL SUPERIOR: Tipo de Vehículo + Cobertura + Estado en Vivo */}
      <div className="bg-slate-950 px-4 sm:px-6 py-3 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Selector de Tipo de Vehículo */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 max-w-full">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            Tipo:
          </span>
          {VEHICLE_CATEGORIES.map((cat) => {
            const isSelected = vehicleType === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isSelected
                    ? 'bg-[#e11b22] text-white shadow-md shadow-red-600/30 font-black'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Nivel de Cobertura y Live Status */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Plan Cobertura */}
          <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setProductPreference('LIVIANO_CLASSIC')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                productPreference === 'LIVIANO_CLASSIC'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Estándar
            </button>
            <button
              type="button"
              onClick={() => setProductPreference('LIVIANO_GOLD')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                productPreference === 'LIVIANO_GOLD'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Gold ($50k RC)
            </button>
          </div>

          {/* Indicador de cálculo en tiempo real */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cálculo en Vivo</span>
          </div>
        </div>

      </div>

      {/* CUERPO DEL FORMULARIO HORIZONTAL: Compacto, Intuitivo y de Un Solo Impacto */}
      <form onSubmit={handleScrollToResults} className="p-4 sm:p-6 space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
          
          {/* 1. Marca y Modelo (4 cols) */}
          <div className="lg:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-[#e11b22]" />
                Marca y Modelo
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Requerido</span>
            </label>
            <input
              type="text"
              required
              value={vehicleBrandModel}
              onChange={(e) => setVehicleBrandModel(e.target.value)}
              placeholder="Ej. Chevrolet D-Max 4x4"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#e11b22] dark:focus:border-[#e11b22] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold transition-all shadow-2xs"
            />
            {/* Chips rápidos de modelos según categoría */}
            <div className="mt-1.5 flex items-center gap-1 overflow-x-auto text-[10px] pb-0.5">
              {VEHICLE_PRESETS[vehicleType]?.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVehicleBrandModel(preset)}
                  className={`shrink-0 px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${
                    vehicleBrandModel === preset
                      ? 'bg-red-50 dark:bg-red-950/40 border-[#e11b22] text-[#e11b22] font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-[#e11b22]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Año Fabricación (2 cols) */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#e11b22]" />
              <span>Año</span>
            </label>
            <div className="relative">
              <select
                value={vehicleYear}
                onChange={(e) => setVehicleYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#e11b22] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold transition-all cursor-pointer shadow-2xs appearance-none"
              >
                {Array.from({ length: 18 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>
                    {y} ({currentYear - y === 0 ? '0 km' : `${currentYear - y} años`})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Antigüedad: {currentYear - vehicleYear} años</span>
          </div>

          {/* 3. Ciudad de Circulación (2 cols) */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#e11b22]" />
              <span>Ciudad</span>
            </label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#e11b22] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold transition-all cursor-pointer shadow-2xs appearance-none"
              >
                <option value="UIO">Quito (Pichincha)</option>
                <option value="GYE">Guayaquil (Guayas)</option>
                <option value="CUE">Cuenca (Azuay)</option>
                <option value="OTRAS">Otras Provincias</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Tarifa territorial</span>
          </div>

          {/* 4. Valor Comercial Asegurado (4 cols con Mini Slider) */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Valor Comercial ($ USD)</span>
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1 text-slate-400 text-xs font-bold">$</span>
                <input
                  type="number"
                  min="3000"
                  max="120000"
                  step="500"
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(Number(e.target.value))}
                  className="w-28 pl-5 pr-2 py-0.5 text-xs font-black text-right font-mono rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:border-[#e11b22] bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                />
              </div>
            </div>

            <input
              type="range"
              min="5000"
              max="70000"
              step="500"
              value={vehicleValue}
              onChange={(e) => setVehicleValue(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#e11b22]"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>$5,000</span>
              <span>$25,000</span>
              <span>$45,000</span>
              <span>$70,000+</span>
            </div>
          </div>

        </div>

        {/* LÍNEA 2: Datos de Contacto del Asegurado + Resumen Actuarial */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-[#e11b22]" />
              <span>Asegurado:</span>
            </div>
            
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nombre completo"
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-[#e11b22] w-36 sm:w-44"
              />
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="WhatsApp (099...)"
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-medium focus:outline-none focus:border-[#e11b22] w-32 sm:w-36"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Comparando 11 aseguradoras en vivo</span>
            </span>

            {/* En móviles, botón para scrollear hacia resultados */}
            <button
              type="submit"
              className="sm:hidden px-4 py-2 rounded-xl bg-[#e11b22] text-white font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95"
            >
              Ver Ofertas ↓
            </button>
          </div>

        </div>

      </form>

    </div>
  );
};
