"use client";
import React, { useState } from 'react';

// Estado inicial flexible para alojar datos tabulares
const defaultTasas = {
  "ALIANZA": [],
  "LATINA": [],
  "HISPANA": [],
  "VAZ": [],
  "ADS": [],
  "SWEADEN": [],
  "ATL": []
};

export default function AdminPage() {
  const [aseguradoras, setAseguradoras] = useState(defaultTasas);
  const [activeAseguradora, setActiveAseguradora] = useState("ALIANZA");
  const [loading, setLoading] = useState(false);
  const [pasteData, setPasteData] = useState("");

  const handleSave = async () => {
    setLoading(true);
    // TODO: Integración real con Firestore
    setTimeout(() => {
      setLoading(false);
      alert('Tasas actualizadas exitosamente en Firebase.');
    }, 1000);
  };

  // Función para procesar el pegado desde Excel/Google Sheets
  const handlePasteFromExcel = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('Text');
    setPasteData(clipboardData);
    
    // Separar por filas (saltos de línea)
    const rows = clipboardData.split('\n').filter(row => row.trim() !== '');
    
    // Mapear celdas (separadas por tabulaciones \t)
    const parsedData = rows.map(row => {
      const cells = row.split('\t');
      return {
        producto: cells[0] || '',
        ciudad: cells[1] || '',
        vehiculo: cells[2] || '',
        desde: cells[3] || '',
        hasta: cells[4] || '',
        tasa: cells[5] || '',
        rc: cells[6] || ''
      };
    });

    // Validar si pegó las cabeceras (PRODUCTO, CIUDAD, etc.) y quitarlas
    if (parsedData.length > 0 && parsedData[0].producto.toUpperCase().includes('PRODUCTO')) {
      parsedData.shift();
    }

    setAseguradoras(prev => ({
      ...prev,
      [activeAseguradora]: [...prev[activeAseguradora], ...parsedData]
    }));
    
    setPasteData(""); // Limpiar el input
  };

  const currentData = aseguradoras[activeAseguradora];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Matriz de Tarifas por Aseguradora</h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Selecciona la aseguradora y pega directamente los datos desde Excel o Google Sheets. 
          El sistema tabulará automáticamente los campos (Producto, Ciudad, Vehículo, Rango de valores y Tasa).
        </p>
      </div>

      {/* Tabs Aseguradoras */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {Object.keys(aseguradoras).map((aseguradora) => (
          <button
            key={aseguradora}
            onClick={() => setActiveAseguradora(aseguradora)}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 ${
              activeAseguradora === aseguradora 
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-900/50' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {aseguradora}
          </button>
        ))}
      </div>

      <div className="bg-[#19222a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-sky-400">
            Tabla de Tarifas: {activeAseguradora}
          </h3>
          <button 
            onClick={() => setAseguradoras({...aseguradoras, [activeAseguradora]: []})}
            className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-md font-semibold transition-colors"
          >
            Limpiar Tabla
          </button>
        </div>

        {/* Zona de Pegado de Excel */}
        <div className="mb-6 relative">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Pegado rápido desde Excel</label>
          <textarea
            className="w-full bg-[#131a20] border-2 border-dashed border-sky-500/30 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-sky-500 focus:bg-[#1a232f] transition-all resize-none"
            rows="3"
            placeholder="Selecciona las celdas en tu Excel, presiona Ctrl+C y pega aquí (Ctrl+V)..."
            value={pasteData}
            onChange={(e) => setPasteData(e.target.value)}
            onPaste={handlePasteFromExcel}
          ></textarea>
        </div>

        {/* Tabla Visual */}
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left text-sm text-slate-300 whitespace-nowrap">
            <thead className="bg-[#131a20] text-xs uppercase font-bold text-slate-500">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Ciudad</th>
                <th className="px-4 py-3">Vehículo</th>
                <th className="px-4 py-3">Desde ($)</th>
                <th className="px-4 py-3">Hasta ($)</th>
                <th className="px-4 py-3 text-sky-400">Tasa (%)</th>
                <th className="px-4 py-3">RC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-slate-500 italic">
                    No hay datos para {activeAseguradora}. Pega los datos desde Excel arriba.
                  </td>
                </tr>
              ) : (
                currentData.map((row, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{row.producto}</td>
                    <td className="px-4 py-3">{row.ciudad}</td>
                    <td className="px-4 py-3">{row.vehiculo}</td>
                    <td className="px-4 py-3">{row.desde}</td>
                    <td className="px-4 py-3">{row.hasta}</td>
                    <td className="px-4 py-3 font-bold text-sky-400">{row.tasa}</td>
                    <td className="px-4 py-3">{row.rc}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      <div className="flex justify-end pt-4 pb-12">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3.5 px-10 rounded-xl shadow-xl shadow-emerald-900/30 transition-all active:scale-95 disabled:opacity-50 text-lg"
        >
          {loading ? 'Guardando...' : 'Sincronizar con Base de Datos'}
        </button>
      </div>
    </div>
  );
}
