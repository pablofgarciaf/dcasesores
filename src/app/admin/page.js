"use client";
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Asegúrate de que esta ruta sea correcta

// Datos pre-llenados extraídos del Google Sheets (Alianza) y PDFs (Latina/Hispana)
const defaultTasas = {
  "ALIANZA": [
    { producto: "1", ciudad: "GYE", vehiculo: "TODOS", desde: "$ -", hasta: "$ 15.000,00", tasa: "3,35%", rc: "25000" },
    { producto: "1", ciudad: "GYE", vehiculo: "TODOS", desde: "$ 15.001,00", hasta: "$ 25.000,00", tasa: "2,75%", rc: "25000" },
    { producto: "1", ciudad: "GYE", vehiculo: "TODOS", desde: "$ 25.001,00", hasta: "$ 35.000,00", tasa: "2,55%", rc: "25000" },
    { producto: "1", ciudad: "GYE", vehiculo: "TODOS", desde: "$ 35.001,00", hasta: "$ 999.999,00", tasa: "2,15%", rc: "25000" },
    { producto: "1", ciudad: "UIO", vehiculo: "TODOS", desde: "$ -", hasta: "$ 15.000,00", tasa: "3,80%", rc: "25000" },
    { producto: "1", ciudad: "UIO", vehiculo: "TODOS", desde: "$ 15.001,00", hasta: "$ 25.000,00", tasa: "3,10%", rc: "25000" },
    { producto: "1", ciudad: "UIO", vehiculo: "TODOS", desde: "$ 25.001,00", hasta: "$ 35.000,00", tasa: "2,90%", rc: "25000" },
    { producto: "1", ciudad: "UIO", vehiculo: "TODOS", desde: "$ 35.001,00", hasta: "$ 999.999,00", tasa: "2,30%", rc: "25000" },
    { producto: "1", ciudad: "STO", vehiculo: "TODOS", desde: "$ -", hasta: "$ 15.000,00", tasa: "3,15%", rc: "25000" },
    { producto: "1", ciudad: "STO", vehiculo: "TODOS", desde: "$ 15.001,00", hasta: "$ 25.000,00", tasa: "2,65%", rc: "25000" },
    { producto: "1", ciudad: "STO", vehiculo: "TODOS", desde: "$ 25.001,00", hasta: "$ 35.000,00", tasa: "2,65%", rc: "25000" },
    { producto: "1", ciudad: "STO", vehiculo: "TODOS", desde: "$ 35.001,00", hasta: "$ 999.999,00", tasa: "2,15%", rc: "25000" },
    { producto: "2", ciudad: "GYE", vehiculo: "TODOS", desde: "$ -", hasta: "$ 15.000,00", tasa: "3,35%", rc: "25000" },
    { producto: "2", ciudad: "GYE", vehiculo: "TODOS", desde: "$ 15.001,00", hasta: "$ 25.000,00", tasa: "2,75%", rc: "25000" },
  ],
  "LATINA": [
    { producto: "Pesados", ciudad: "NACIONAL", vehiculo: "EXCEPTO HINO", desde: "$ 15.000,00", hasta: "$ 49.999,99", tasa: "3.40%", rc: "25000" },
    { producto: "Pesados", ciudad: "NACIONAL", vehiculo: "EXCEPTO HINO", desde: "$ 50.000,00", hasta: "$ 99.999,99", tasa: "3.20%", rc: "25000" },
    { producto: "Pesados", ciudad: "NACIONAL", vehiculo: "EXCEPTO HINO", desde: "$ 100.000,00", hasta: "ADELANTE", tasa: "3.00%", rc: "25000" },
    { producto: "Pesados", ciudad: "NACIONAL", vehiculo: "HINO (HASTA 4 AÑOS)", desde: "$ -", hasta: "ADELANTE", tasa: "3.80%", rc: "25000" },
    { producto: "Pesados", ciudad: "NACIONAL", vehiculo: "HINO (HASTA 15 AÑOS)", desde: "$ -", hasta: "ADELANTE", tasa: "4.20%", rc: "25000" },
  ],
  "HISPANA": [
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ -", hasta: "$ 30.000,00", tasa: "3,00%", rc: "$ 40.000,00" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 30.001,00", hasta: "$ 999.999,00", tasa: "2,50%", rc: "$ 40.000,00" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ -", hasta: "$ 45.000,00", tasa: "3,50%", rc: "$ 40.000,00" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO CERO", desde: "$ -", hasta: "$ 20.000,00", tasa: "3,00%", rc: "$ 40.000,00" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO CERO", desde: "$ 21.000,00", hasta: "$ 30.000,00", tasa: "2,30%", rc: "$ 40.000,00" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO CERO", desde: "$ 31.000,00", hasta: "$ 999.999,00", tasa: "2,10%", rc: "$ 40.000,00" },
    { producto: "4", ciudad: "NACIONAL", vehiculo: "CAMIONETA CERO", desde: "$ -", hasta: "$ 45.000,00", tasa: "3,50%", rc: "$ 40.000,00" },
  ],
  "VAZ": [
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ -", hasta: "$ 15.000,00", tasa: "4,80%", rc: "" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 15.001,00", hasta: "$ 19.999,00", tasa: "4,30%", rc: "" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 20.000,00", hasta: "$ 24.999,00", tasa: "3,80%", rc: "" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 25.000,00", hasta: "$ 29.999,00", tasa: "2,60%", rc: "" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 30.000,00", hasta: "$ 34.999,00", tasa: "2,40%", rc: "" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 35.000,00", hasta: "$ 69.999,00", tasa: "2,20%", rc: "" },
    { producto: "1", ciudad: "NACIONAL", vehiculo: "LIVIANO", desde: "$ 70.000,00", hasta: "$ 999.999,00", tasa: "2,00%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ -", hasta: "$ 15.000,00", tasa: "5,25%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ 15.001,00", hasta: "$ 19.999,00", tasa: "5,25%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ 20.000,00", hasta: "$ 24.999,00", tasa: "4,25%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ 25.000,00", hasta: "$ 29.999,00", tasa: "4,25%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ 30.000,00", hasta: "$ 34.999,00", tasa: "2,40%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ 35.000,00", hasta: "$ 69.999,00", tasa: "2,20%", rc: "" },
    { producto: "2", ciudad: "NACIONAL", vehiculo: "CAMIONETA", desde: "$ 70.000,00", hasta: "$ 999.999,00", tasa: "2,20%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ -", hasta: "$ 15.000,00", tasa: "5,30%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ 15.001,00", hasta: "$ 19.999,00", tasa: "4,80%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ 20.000,00", hasta: "$ 24.999,00", tasa: "4,30%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ 25.000,00", hasta: "$ 29.999,00", tasa: "2,90%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ 30.000,00", hasta: "$ 34.999,00", tasa: "2,70%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ 35.000,00", hasta: "$ 69.999,00", tasa: "2,50%", rc: "" },
    { producto: "3", ciudad: "NACIONAL", vehiculo: "LIVIANO ELECTRICO", desde: "$ 70.000,00", hasta: "$ 999.999,00", tasa: "2,30%", rc: "" },
  ],
  "ADS": [],
  "SWEADEN": [],
  "ATL": []
};

export default function AdminPage() {
  const [aseguradoras, setAseguradoras] = useState(defaultTasas);
  const [activeAseguradora, setActiveAseguradora] = useState("ALIANZA");
  const [loading, setLoading] = useState(false);
  const [pasteData, setPasteData] = useState("");

  const handleSaveToFirebase = async () => {
    setLoading(true);
    try {
      // Guardar todo el objeto de aseguradoras en un documento Firestore llamado "tarifario"
      await setDoc(doc(db, "cotizador", "tarifario"), aseguradoras);
      alert('¡Éxito! Todas las tablas han sido subidas y sincronizadas con Firebase.');
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert('Error al guardar. Asegúrate de haber colocado las credenciales correctas en src/lib/firebase.js o en las variables de entorno de Vercel.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasteFromExcel = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('Text');
    setPasteData(clipboardData);
    
    const rows = clipboardData.split('\n').filter(row => row.trim() !== '');
    
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

    if (parsedData.length > 0 && parsedData[0].producto.toUpperCase().includes('PRODUCTO')) {
      parsedData.shift();
    }

    setAseguradoras(prev => ({
      ...prev,
      [activeAseguradora]: [...prev[activeAseguradora], ...parsedData]
    }));
    
    setPasteData("");
  };

  const currentData = aseguradoras[activeAseguradora] || [];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Matriz de Tarifas por Aseguradora</h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Selecciona la aseguradora y pega directamente los datos desde Excel. Las tablas ya vienen pre-cargadas con los datos de Alianza y Latina.
          </p>
        </div>
        <button 
          onClick={handleSaveToFirebase}
          disabled={loading}
          className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3 px-8 rounded-xl shadow-xl shadow-emerald-900/30 transition-all active:scale-95 disabled:opacity-50 text-base flex items-center gap-2 border border-emerald-400/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Sincronizando...
            </span>
          ) : 'Subir TODO a Firebase'}
        </button>
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
            {aseguradoras[aseguradora].length > 0 && (
              <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {aseguradoras[aseguradora].length}
              </span>
            )}
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
        <div className="overflow-x-auto rounded-xl border border-white/5 max-h-[500px] overflow-y-auto">
          <table className="w-full text-left text-sm text-slate-300 whitespace-nowrap">
            <thead className="bg-[#131a20] text-xs uppercase font-bold text-slate-500 sticky top-0">
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
    </div>
  );
}
