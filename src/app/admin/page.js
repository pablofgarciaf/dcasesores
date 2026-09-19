"use client";
import React, { useState } from 'react';

// Estructura base separada por Aseguradora
const defaultTasas = {
  "Latina Seguros": {
    pesados: {
      rango1: { min: 15000, max: 49999, tasa: 3.40 },
      rango2: { min: 50000, max: 99999, tasa: 3.20 },
      rango3: { min: 100000, max: 999999, tasa: 3.00 },
    },
    hino: {
      hasta4Anios: 3.80,
      hasta15Anios: 4.20
    }
  },
  "Hispana de Seguros": {
    pesados: {
      rango1: { min: 15000, max: 49999, tasa: 3.45 },
      rango2: { min: 50000, max: 99999, tasa: 3.25 },
      rango3: { min: 100000, max: 999999, tasa: 3.10 },
    },
    hino: {
      hasta4Anios: 3.85,
      hasta15Anios: 4.30
    }
  }
};

export default function AdminPage() {
  const [tasas, setTasas] = useState(defaultTasas);
  const [activeAseguradora, setActiveAseguradora] = useState("Latina Seguros");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // TODO: Integración con Firestore
    setTimeout(() => {
      setLoading(false);
      alert('Tasas actualizadas exitosamente en Firebase.');
    }, 1000);
  };

  const currentTasas = tasas[activeAseguradora];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Gestión de Tasas por Aseguradora</h2>
        <p className="text-slate-400 text-sm">Selecciona la aseguradora para actualizar sus porcentajes específicos.</p>
      </div>

      {/* Tabs Aseguradoras */}
      <div className="flex space-x-2 border-b border-white/10 pb-4">
        {Object.keys(tasas).map((aseguradora) => (
          <button
            key={aseguradora}
            onClick={() => setActiveAseguradora(aseguradora)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              activeAseguradora === aseguradora 
                ? 'bg-sky-600 text-white shadow-lg' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {aseguradora}
          </button>
        ))}
      </div>

      <div className="bg-[#19222a] border border-white/10 rounded-xl p-6 shadow-xl animate-fadeIn">
        <h3 className="text-lg font-semibold text-sky-400 mb-4 border-b border-white/5 pb-2">
          Vehículos Pesados ({activeAseguradora})
        </h3>
        
        <div className="space-y-4">
          {Object.entries(currentTasas.pesados).map(([key, value]) => (
            <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#131a20] p-4 rounded-lg border border-white/5">
              <div className="text-sm font-medium text-slate-300">
                Desde ${value.min.toLocaleString()} hasta ${value.max.toLocaleString()}
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Tasa Aplicable (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={value.tasa}
                  onChange={(e) => setTasas({
                    ...tasas,
                    [activeAseguradora]: {
                      ...currentTasas,
                      pesados: {
                        ...currentTasas.pesados,
                        [key]: { ...value, tasa: parseFloat(e.target.value) }
                      }
                    }
                  })}
                  className="bg-[#1c2631] border border-white/10 rounded px-3 py-2 text-white w-full focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#19222a] border border-white/10 rounded-xl p-6 shadow-xl animate-fadeIn">
        <h3 className="text-lg font-semibold text-sky-400 mb-4 border-b border-white/5 pb-2">
          Vehículos Marca HINO ({activeAseguradora})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#131a20] p-4 rounded-lg border border-white/5">
            <label className="text-xs text-slate-500 block mb-1">Hasta 4 años de antigüedad (Tasa %)</label>
            <input 
              type="number" 
              step="0.01"
              value={currentTasas.hino.hasta4Anios}
              onChange={(e) => setTasas({
                ...tasas, 
                [activeAseguradora]: {
                  ...currentTasas,
                  hino: { ...currentTasas.hino, hasta4Anios: parseFloat(e.target.value) }
                }
              })}
              className="bg-[#1c2631] border border-white/10 rounded px-3 py-2 text-white w-full focus:outline-none focus:border-sky-500"
            />
          </div>
          <div className="bg-[#131a20] p-4 rounded-lg border border-white/5">
            <label className="text-xs text-slate-500 block mb-1">Hasta 15 años de antigüedad (Tasa %)</label>
            <input 
              type="number" 
              step="0.01"
              value={currentTasas.hino.hasta15Anios}
              onChange={(e) => setTasas({
                ...tasas, 
                [activeAseguradora]: {
                  ...currentTasas,
                  hino: { ...currentTasas.hino, hasta15Anios: parseFloat(e.target.value) }
                }
              })}
              className="bg-[#1c2631] border border-white/10 rounded px-3 py-2 text-white w-full focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios Oficiales'}
        </button>
      </div>
    </div>
  );
}
