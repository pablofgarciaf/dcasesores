'use client';

import { useState, useEffect, useMemo } from 'react';
import { defaultTasas } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ConsultationsCrm } from '@/components/admin/ConsultationsCrm';
import { 
  FileSpreadsheet, 
  Save, 
  Plus, 
  Trash2, 
  UploadCloud, 
  X, 
  Check, 
  Search, 
  RefreshCw, 
  Layers, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('aseguradoras');

  return (
    <div className="h-screen max-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#e11b22] selection:text-white flex flex-col md:flex-row w-full overflow-hidden">
      
      {/* SIDEBAR ADMIN (Compacto, 100% de la ventana, sin scrollbar) */}
      <aside className="w-full md:w-60 md:h-screen md:max-h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-800 p-4 md:p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#e11b22] flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-900/40 shrink-0">
              DC
            </div>
            <div>
              <span className="font-black text-white text-sm tracking-tight block">DC ASESORES</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#e11b22] font-bold">Panel Master</span>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveTab('aseguradoras')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'aseguradoras' 
                  ? 'bg-[#e11b22] text-white shadow-lg shadow-red-900/30' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span>Motor & Tasas Excel</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('crm')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'crm' 
                  ? 'bg-[#e11b22] text-white shadow-lg shadow-red-900/30' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Prospectos / CRM</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cms' 
                  ? 'bg-[#e11b22] text-white shadow-lg shadow-red-900/30' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>CMS Web & Contenido</span>
            </button>
          </nav>
        </div>
        
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-mono text-slate-400">Sistema Actuarial Activo</span>
          </div>
          <a 
            href="/" 
            className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors py-1 px-1"
          >
            <span>← Ver Sitio Público</span>
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT (Edge-to-edge full width con scroll interno en el viewport) */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen w-full">
        {activeTab === 'aseguradoras' && <AseguradorasManager />}
        {activeTab === 'crm' && <ConsultationsCrm />}
        {activeTab === 'cms' && <CMSManager />}
      </main>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. GESTOR DE ASEGURADORAS Y TASAS (Con Modal TSV y Edición Inline)
// ─────────────────────────────────────────────────────────────
function AseguradorasManager() {
  const [data, setData] = useState(defaultTasas);
  const [isUploading, setIsUploading] = useState(false);
  const [activeAseguradora, setActiveAseguradora] = useState(Object.keys(defaultTasas)[0] || 'ALIANZA');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para Modal de Carga de Excel (TSV)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInsurer, setModalInsurer] = useState(activeAseguradora);
  const [pasteData, setPasteData] = useState('');
  const [importMode, setImportMode] = useState('replace'); // 'replace' | 'append'
  const [parsedPreview, setParsedPreview] = useState([]);
  const [isMultiInsurer, setIsMultiInsurer] = useState(false);
  const [detectedInsurers, setDetectedInsurers] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Parsear texto copiado en tiempo real para previsualización (Soporta 8 cols Consolidado o 7 cols individual)
  useEffect(() => {
    if (!pasteData.trim()) {
      setParsedPreview([]);
      setIsMultiInsurer(false);
      setDetectedInsurers([]);
      return;
    }

    const lines = pasteData.trim().split('\n');
    const validLines = lines.filter(l => l.trim().length > 0);
    if (validLines.length === 0) {
      setParsedPreview([]);
      return;
    }

    // Verificar si la primera fila es encabezado
    let startIndex = 0;
    const firstLineCols = validLines[0]?.split('\t') || [];
    const firstColClean = (firstLineCols[0] || '').trim().toUpperCase();
    if (firstColClean === 'ASEGURADORA' || firstColClean === 'COMPAÑÍA' || firstColClean === 'COMPANIA' || firstColClean === 'PRODUCTO') {
      startIndex = 1;
    }

    // Detectar si las filas tienen 8 o más columnas (donde col 0 es Aseguradora)
    const sampleCols = (validLines[startIndex] || validLines[0])?.split('\t') || [];
    const is8Col = sampleCols.length >= 8;
    setIsMultiInsurer(is8Col);

    const insurersSet = new Set();
    const parsed = [];

    for (let i = startIndex; i < validLines.length; i++) {
      const cols = validLines[i].split('\t');
      if (cols.length < 4) continue;

      if (is8Col) {
        const rawIns = cols[0]?.trim().toUpperCase().replace(/[\s-]+/g, '_') || modalInsurer;
        insurersSet.add(rawIns);
        parsed.push({
          id: i,
          aseguradora: rawIns,
          producto: cols[1]?.trim().toUpperCase() || 'TODORIESGO',
          ciudad: cols[2]?.trim().toUpperCase() || 'NACIONAL',
          vehiculo: cols[3]?.trim().toUpperCase() || 'LIVIANO',
          desde: Number(cols[4]?.replace(/[^0-9.]/g, '')) || 0,
          hasta: cols[5] ? Number(cols[5]?.replace(/[^0-9.]/g, '')) || 99999 : 99999,
          tasa: Number(cols[6]?.replace(/[^0-9.]/g, '')) || 0,
          rc: Number(cols[7]?.replace(/[^0-9.]/g, '')) || 0,
        });
      } else {
        parsed.push({
          id: i,
          aseguradora: modalInsurer,
          producto: cols[0]?.trim().toUpperCase() || 'TODORIESGO',
          ciudad: cols[1]?.trim().toUpperCase() || 'NACIONAL',
          vehiculo: cols[2]?.trim().toUpperCase() || 'LIVIANO',
          desde: Number(cols[3]?.replace(/[^0-9.]/g, '')) || 0,
          hasta: cols[4] ? Number(cols[4]?.replace(/[^0-9.]/g, '')) || 99999 : 99999,
          tasa: Number(cols[5]?.replace(/[^0-9.]/g, '')) || 0,
          rc: Number(cols[6]?.replace(/[^0-9.]/g, '')) || 0,
        });
      }
    }

    setDetectedInsurers(Array.from(insurersSet));
    setParsedPreview(parsed);
  }, [pasteData, modalInsurer]);

  // Cargar datos guardados previamente en Firestore si existen
  useEffect(() => {
    async function loadSavedTasas() {
      try {
        const snap = await getDoc(doc(db, "configuracion", "tasasVehiculares"));
        if (snap.exists()) {
          const remoteData = snap.data();
          if (Object.keys(remoteData).length > 0) {
            setData(remoteData);
          }
        }
      } catch (err) {
        console.warn("Usando tasas locales por defecto:", err);
      }
    }
    loadSavedTasas();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const uploadToFirebase = async () => {
    try {
      setIsUploading(true);
      await setDoc(doc(db, "configuracion", "tasasVehiculares"), data);
      showToast('✓ ¡Todas las tasas se sincronizaron con Firebase exitosamente!');
    } catch (error) {
      console.error(error);
      showToast('✕ Error subiendo a Firebase. Revisa conexión o reglas.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyExcelImport = () => {
    if (parsedPreview.length === 0) return;

    if (isMultiInsurer) {
      // Agrupar filas por aseguradora
      const grouped = {};
      parsedPreview.forEach(row => {
        const ins = row.aseguradora;
        if (!grouped[ins]) grouped[ins] = [];
        const { id, aseguradora, ...cleanRow } = row;
        grouped[ins].push(cleanRow);
      });

      setData(prev => {
        const nextData = { ...prev };
        Object.keys(grouped).forEach(ins => {
          if (importMode === 'replace') {
            nextData[ins] = grouped[ins];
          } else {
            nextData[ins] = [...(nextData[ins] || []), ...grouped[ins]];
          }
        });
        return nextData;
      });

      const insurerList = Object.keys(grouped).join(', ');
      showToast(`✓ Se importaron ${parsedPreview.length} registros en: ${insurerList}`);
      if (detectedInsurers.length > 0) {
        setActiveAseguradora(detectedInsurers[0]);
      }
    } else {
      setData(prev => {
        const currentList = prev[modalInsurer] || [];
        const cleanRows = parsedPreview.map(({ id, aseguradora, ...row }) => row);
        const updatedList = importMode === 'replace' 
          ? cleanRows 
          : [...currentList, ...cleanRows];

        return {
          ...prev,
          [modalInsurer]: updatedList
        };
      });

      showToast(`✓ Se importaron ${parsedPreview.length} registros en ${modalInsurer}`);
      setActiveAseguradora(modalInsurer);
    }

    setPasteData('');
    setIsModalOpen(false);
  };

  // Edición Inline de Celda
  const handleCellChange = (index, field, value) => {
    setData(prev => {
      const updatedList = [...(prev[activeAseguradora] || [])];
      updatedList[index] = {
        ...updatedList[index],
        [field]: (field === 'desde' || field === 'hasta' || field === 'tasa' || field === 'rc')
          ? Number(value)
          : value
      };
      return {
        ...prev,
        [activeAseguradora]: updatedList
      };
    });
  };

  // Agregar nueva fila vacía
  const handleAddRow = () => {
    const newRow = {
      producto: 'TODORIESGO',
      ciudad: 'QUITO',
      vehiculo: 'LIVIANO',
      desde: 0,
      hasta: 25000,
      tasa: 3.5,
      rc: 300
    };
    setData(prev => ({
      ...prev,
      [activeAseguradora]: [newRow, ...(prev[activeAseguradora] || [])]
    }));
    showToast('✓ Nueva fila agregada al inicio de la tabla.');
  };

  // Eliminar fila
  const handleDeleteRow = (index) => {
    setData(prev => {
      const updatedList = (prev[activeAseguradora] || []).filter((_, i) => i !== index);
      return {
        ...prev,
        [activeAseguradora]: updatedList
      };
    });
    showToast('✓ Fila eliminada.');
  };

  // Agregar nueva aseguradora personalizada
  const handleAddNewInsurer = () => {
    const name = prompt('Ingresa el nombre de la nueva Aseguradora (Ej: SEGUROS_DEL_PICHINCHA):');
    if (!name || !name.trim()) return;
    const cleanName = name.trim().toUpperCase().replace(/\s+/g, '_');
    if (data[cleanName]) {
      alert('Esta aseguradora ya existe.');
      return;
    }
    setData(prev => ({
      ...prev,
      [cleanName]: [
        { producto: 'TODORIESGO', ciudad: 'NACIONAL', vehiculo: 'LIVIANO', desde: 0, hasta: 30000, tasa: 3.5, rc: 300 }
      ]
    }));
    setActiveAseguradora(cleanName);
    showToast(`✓ Aseguradora ${cleanName} creada.`);
  };

  const currentRecords = data[activeAseguradora] || [];
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return currentRecords;
    const q = searchTerm.toLowerCase();
    return currentRecords.filter(r => 
      (r.producto || '').toLowerCase().includes(q) ||
      (r.ciudad || '').toLowerCase().includes(q) ||
      (r.vehiculo || '').toLowerCase().includes(q)
    );
  }, [currentRecords, searchTerm]);

  return (
    <div className="w-full space-y-6">
      
      {/* Notificación Flotante */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-slate-900 border border-[#e11b22] text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header y Acciones Principales */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#e11b22] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            Matriz Multicompañía de Cotización
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gestor Actuarial de Tasas & Excel
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Edita directamente en la tabla o pega tablas tabuladas desde Excel / Google Sheets para actualizar al instante las proformas de los clientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button 
            type="button"
            onClick={() => {
              setModalInsurer(activeAseguradora);
              setIsModalOpen(true);
            }}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all border border-slate-700 active:scale-95 cursor-pointer shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>📋 Pegar desde Excel</span>
          </button>

          <button 
            type="button"
            onClick={uploadToFirebase}
            disabled={isUploading}
            className="px-6 py-3 rounded-xl bg-[#e11b22] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-50 active:scale-95 cursor-pointer shadow-lg shadow-red-900/40"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? 'Guardando...' : 'Sincronizar con Firebase ☁️'}</span>
          </button>
        </div>
      </div>

      {/* Barra de Pestañas de Aseguradoras */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Object.keys(data).map(aseguradora => (
          <button
            key={aseguradora}
            onClick={() => setActiveAseguradora(aseguradora)}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeAseguradora === aseguradora 
                ? 'bg-[#e11b22] text-white shadow-lg shadow-red-900/40 scale-100' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            <span>{aseguradora}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              activeAseguradora === aseguradora ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-500'
            }`}>
              {(data[aseguradora] || []).length}
            </span>
          </button>
        ))}

        <button
          type="button"
          onClick={handleAddNewInsurer}
          className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-dashed border-slate-700 flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nueva Compañía</span>
        </button>
      </div>

      {/* Barra de Filtro y Controles de la Tabla */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Buscar por producto, ciudad o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 outline-none focus:border-[#e11b22] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-400 font-medium">
            Mostrando <strong>{filteredRecords.length}</strong> de {currentRecords.length} filas
          </span>
          <button
            type="button"
            onClick={handleAddRow}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Fila</span>
          </button>
        </div>
      </div>

      {/* Tabla Editable Inline (Full Width & Responsive) */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">#</th>
                <th className="px-4 py-3.5">Producto</th>
                <th className="px-4 py-3.5">Ciudad</th>
                <th className="px-4 py-3.5">Vehículo</th>
                <th className="px-4 py-3.5 text-right">Desde ($)</th>
                <th className="px-4 py-3.5 text-right">Hasta ($)</th>
                <th className="px-4 py-3.5 text-right">Tasa (%)</th>
                <th className="px-4 py-3.5 text-right">RC ($)</th>
                <th className="px-4 py-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                    No se encontraron registros en <strong>{activeAseguradora}</strong>.<br />
                    Haz clic en <strong>Agregar Fila</strong> o usa <strong>Pegar desde Excel</strong>.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-slate-500">{idx + 1}</td>
                    
                    {/* Producto */}
                    <td className="px-3 py-2">
                      <input 
                        type="text" 
                        value={row.producto || ''} 
                        onChange={(e) => handleCellChange(idx, 'producto', e.target.value)}
                        className="bg-slate-950/70 border border-slate-800 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold outline-none w-full min-w-[120px]"
                      />
                    </td>

                    {/* Ciudad */}
                    <td className="px-3 py-2">
                      <input 
                        type="text" 
                        value={row.ciudad || ''} 
                        onChange={(e) => handleCellChange(idx, 'ciudad', e.target.value)}
                        className="bg-slate-950/70 border border-slate-800 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 outline-none w-full min-w-[100px]"
                      />
                    </td>

                    {/* Vehículo */}
                    <td className="px-3 py-2">
                      <input 
                        type="text" 
                        value={row.vehiculo || ''} 
                        onChange={(e) => handleCellChange(idx, 'vehiculo', e.target.value)}
                        className="bg-slate-950/70 border border-slate-800 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 outline-none w-full min-w-[100px]"
                      />
                    </td>

                    {/* Desde */}
                    <td className="px-3 py-2 text-right">
                      <input 
                        type="number" 
                        value={row.desde ?? 0} 
                        onChange={(e) => handleCellChange(idx, 'desde', e.target.value)}
                        className="bg-slate-950/70 border border-slate-800 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 text-right font-mono outline-none w-24"
                      />
                    </td>

                    {/* Hasta */}
                    <td className="px-3 py-2 text-right">
                      <input 
                        type="number" 
                        value={row.hasta ?? 99999} 
                        onChange={(e) => handleCellChange(idx, 'hasta', e.target.value)}
                        className="bg-slate-950/70 border border-slate-800 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 text-right font-mono outline-none w-28"
                      />
                    </td>

                    {/* Tasa (%) */}
                    <td className="px-3 py-2 text-right">
                      <input 
                        type="number" 
                        step="0.01"
                        value={row.tasa ?? 0} 
                        onChange={(e) => handleCellChange(idx, 'tasa', e.target.value)}
                        className="bg-slate-950/70 border border-red-500/30 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-[#e11b22] font-black text-right font-mono outline-none w-20"
                      />
                    </td>

                    {/* RC ($) */}
                    <td className="px-3 py-2 text-right">
                      <input 
                        type="number" 
                        value={row.rc ?? 0} 
                        onChange={(e) => handleCellChange(idx, 'rc', e.target.value)}
                        className="bg-slate-950/70 border border-slate-800 focus:border-[#e11b22] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 text-right font-mono outline-none w-24"
                      />
                    </td>

                    {/* Eliminar */}
                    <td className="px-3 py-2 text-center">
                      <button 
                        type="button"
                        onClick={() => handleDeleteRow(idx)}
                        title="Eliminar fila"
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: CARGAR / PEGAR DESDE EXCEL CON PREVIEW
          ───────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Importar Datos desde Excel o Sheets</h3>
                  <p className="text-xs text-slate-400">Copia tus celdas en Excel y pégalas directamente en el cuadro.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    {isMultiInsurer ? 'Modo de Distribución:' : 'Aseguradora Destino:'}
                  </label>
                  {isMultiInsurer ? (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-slate-200">
                      <span className="font-bold text-[#e11b22] block mb-1">⚡ Consolidado Multicompañía Detectado (8 Cols)</span>
                      <span className="text-[11px] text-slate-400">
                        Los registros se asignarán automáticamente a cada aseguradora según la Columna 1.
                      </span>
                    </div>
                  ) : (
                    <select 
                      value={modalInsurer} 
                      onChange={(e) => setModalInsurer(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#e11b22]"
                    >
                      {Object.keys(data).map(ins => (
                        <option key={ins} value={ins}>{ins}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Modo de Inserción:</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input 
                        type="radio" 
                        name="importMode" 
                        value="replace" 
                        checked={importMode === 'replace'} 
                        onChange={() => setImportMode('replace')}
                        className="accent-[#e11b22]"
                      />
                      <span>Reemplazar toda la matriz</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input 
                        type="radio" 
                        name="importMode" 
                        value="append" 
                        checked={importMode === 'append'} 
                        onChange={() => setImportMode('append')}
                        className="accent-[#e11b22]"
                      />
                      <span>Añadir al final</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Badges de Aseguradoras Detectadas en modo multi */}
              {isMultiInsurer && detectedInsurers.length > 0 && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Compañías encontradas en el texto copiado ({detectedInsurers.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {detectedInsurers.map(ins => (
                      <span key={ins} className="px-2.5 py-1 rounded-lg bg-[#e11b22]/20 border border-red-500/30 text-white font-mono text-[10px] font-bold">
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Guía de Columnas */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span className="text-[#e11b22] font-bold shrink-0">Columnas soportadas:</span>
                <span className="text-slate-300 text-[10px]">
                  {isMultiInsurer 
                    ? 'ASEGURADORA [TAB] PRODUCTO [TAB] CIUDAD [TAB] VEHÍCULO [TAB] DESDE [TAB] HASTA [TAB] TASA% [TAB] RC$'
                    : 'PRODUCTO [TAB] CIUDAD [TAB] VEHÍCULO [TAB] DESDE [TAB] HASTA [TAB] TASA% [TAB] RC$'
                  }
                </span>
              </div>

              {/* Textarea */}
              <textarea 
                value={pasteData}
                onChange={(e) => setPasteData(e.target.value)}
                placeholder={
                  isMultiInsurer 
                    ? "Pega aquí las filas de la hoja Consolidado con aseguradora en columna 1..."
                    : "Pega aquí los datos copiados de Excel o Sheets (Ctrl + V)..."
                }
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 outline-none focus:border-[#e11b22] resize-none"
              />

              {/* Vista Previa */}
              {parsedPreview.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400">
                      ✓ {parsedPreview.length} registros listos para importar {isMultiInsurer && `en ${detectedInsurers.length} aseguradoras`}
                    </span>
                    <span className="text-[11px] text-slate-500">Mostrando primeros 5 registros</span>
                  </div>
                  <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-900 text-slate-400 font-mono">
                        <tr>
                          {isMultiInsurer && <th className="p-2 text-[#e11b22]">Aseguradora</th>}
                          <th className="p-2">Producto</th>
                          <th className="p-2">Ciudad</th>
                          <th className="p-2">Vehículo</th>
                          <th className="p-2 text-right">Rango</th>
                          <th className="p-2 text-right">Tasa</th>
                          <th className="p-2 text-right">RC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40 text-slate-300">
                        {parsedPreview.slice(0, 5).map(row => (
                          <tr key={row.id}>
                            {isMultiInsurer && <td className="p-2 font-mono font-bold text-[#e11b22]">{row.aseguradora}</td>}
                            <td className="p-2">{row.producto}</td>
                            <td className="p-2">{row.ciudad}</td>
                            <td className="p-2">{row.vehiculo}</td>
                            <td className="p-2 text-right font-mono">${row.desde} - ${row.hasta}</td>
                            <td className="p-2 text-right font-bold text-[#e11b22]">{row.tasa}%</td>
                            <td className="p-2 text-right font-mono">${row.rc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/80">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                disabled={parsedPreview.length === 0}
                onClick={handleApplyExcelImport}
                className="px-6 py-2.5 rounded-xl bg-[#e11b22] hover:bg-red-600 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>
                  {isMultiInsurer 
                    ? `Aplicar a ${detectedInsurers.length} Aseguradoras (${parsedPreview.length} filas)`
                    : `Aplicar a ${modalInsurer} (${parsedPreview.length} filas)`
                  }
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. GESTOR DE CMS (Hero, Stats, Marcas, Contacto & Google Maps)
// ─────────────────────────────────────────────────────────────
const DEFAULT_CMS_DATA = {
  hero: {
    badge: 'ASESORÍA INTEGRAL EN SEGUROS • ECUADOR',
    title: 'Protege lo que más importa con el',
    titleHighlight: 'respaldo correcto.',
    subtitle: 'Analizamos tus necesidades reales para diseñar soluciones personalizadas en salud, vida y patrimonio. Tu tranquilidad es nuestro contrato.',
    ctaText1: 'Cotizar mi seguro ahora',
    ctaText2: 'Explorar Coberturas'
  },
  stats: [
    { value: '+15 Años', label: 'Experiencia & Trayectoria', subtext: 'Asesoría actuarial líder en Ecuador' },
    { value: '10+', label: 'Aseguradoras Aliadas', subtext: 'Convenios directos y mejores tasas' },
    { value: '99.8%', label: 'Siniestros Aprobados', subtext: 'Acompañamiento y cobro oportuno' },
    { value: '24 / 7', label: 'Respaldo In Situ', subtext: 'Asistencia real ante emergencias' },
  ],
  brands: [
    { label: 'ALIANZA' },
    { label: 'LATINA' },
    { label: 'HISPANA' },
    { label: 'SWEADEN' },
    { label: 'ZURICH' },
    { label: 'MAPFRE' },
    { label: 'PRIVILEGIO' },
    { label: 'ATLÁNTIDA' },
    { label: 'ADS SEGUROS' },
    { label: 'VAZ SEGUROS' },
    { label: 'BMI' },
  ],
  contact: {
    address: 'Quito, Pichincha, Ecuador',
    addressDetail: 'Sector La Carolina / República de El Salvador',
    phone: '02 500 3373',
    whatsapp: '+593 99 193 8754',
    email: 'info@dcasesoresec.com',
    hours: 'Lunes a Viernes: 08:30 - 18:00',
    emergencyHours: 'Emergencias & Siniestros: 24/7',
    mapsUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d359.5141084768887!2d-78.48699087144594!3d-0.18020313187060877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sec!4v1789947987659!5m2!1ses-419!2sec'
  }
};

function CMSManager() {
  const [cmsData, setCmsData] = useState(DEFAULT_CMS_DATA);
  const [activeSubTab, setActiveSubTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [newBrandName, setNewBrandName] = useState('');

  useEffect(() => {
    async function loadCms() {
      try {
        const snap = await getDoc(doc(db, "configuracion", "cmsHome"));
        if (snap.exists()) {
          setCmsData(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.warn("Usando configuración CMS por defecto:", err);
      }
    }
    loadCms();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveToFirebase = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "configuracion", "cmsHome"), cmsData);
      showToast('✓ Contenidos web guardados exitosamente en Firebase!');
    } catch (err) {
      console.error(err);
      showToast('✕ Error guardando en Firebase. Revisa conexión.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleHeroChange = (field, value) => {
    setCmsData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleStatChange = (index, field, value) => {
    setCmsData(prev => {
      const nextStats = [...prev.stats];
      nextStats[index] = { ...nextStats[index], [field]: value };
      return { ...prev, stats: nextStats };
    });
  };

  const handleContactChange = (field, value) => {
    setCmsData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setCmsData(prev => ({
      ...prev,
      brands: [...prev.brands, { label: newBrandName.trim().toUpperCase() }]
    }));
    setNewBrandName('');
    showToast('✓ Marca agregada al carrusel.');
  };

  const handleDeleteBrand = (index) => {
    setCmsData(prev => ({
      ...prev,
      brands: prev.brands.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-slate-900 border border-[#e11b22] text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header CMS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#e11b22] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3 h-3" />
            Control de Contenidos Centralizado
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Gestor CMS de la Landing Page
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Modifica textos del Hero, cifras de impacto, aseguradoras y datos de contacto de la página principal.
          </p>
        </div>

        <button 
          type="button"
          onClick={handleSaveToFirebase}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-[#e11b22] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-50 active:scale-95 cursor-pointer shadow-lg shadow-red-900/40 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Guardando...' : 'Guardar Cambios CMS ☁️'}</span>
        </button>
      </div>

      {/* Sub-Pestañas CMS */}
      <div className="flex gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: 'hero', label: '1. Portada / Hero' },
          { id: 'stats', label: '2. Estadísticas de Impacto' },
          { id: 'brands', label: '3. Aseguradoras Aliadas' },
          { id: 'contact', label: '4. Contacto & Google Maps' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === tab.id 
                ? 'bg-white text-slate-900 shadow-md' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 1: HERO
          ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'hero' && (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white mb-4">Textos Principales del Hero</h3>
          
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Badge Superior:</label>
              <input 
                type="text" 
                value={cmsData.hero.badge}
                onChange={(e) => handleHeroChange('badge', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Título Línea 1:</label>
                <input 
                  type="text" 
                  value={cmsData.hero.title}
                  onChange={(e) => handleHeroChange('title', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Título Destacado (Gradiente Rojo):</label>
                <input 
                  type="text" 
                  value={cmsData.hero.titleHighlight}
                  onChange={(e) => handleHeroChange('titleHighlight', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-[#e11b22] font-black outline-none focus:border-[#e11b22]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Subtítulo / Bajada Descriptiva:</label>
              <textarea 
                rows={3}
                value={cmsData.hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 outline-none focus:border-[#e11b22] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Texto Botón Primario:</label>
                <input 
                  type="text" 
                  value={cmsData.hero.ctaText1}
                  onChange={(e) => handleHeroChange('ctaText1', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Texto Botón Secundario:</label>
                <input 
                  type="text" 
                  value={cmsData.hero.ctaText2}
                  onChange={(e) => handleHeroChange('ctaText2', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 2: STATS
          ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'stats' && (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white mb-2">Métricas de Confianza (4 Bloques)</h3>
          <p className="text-xs text-slate-400 mb-6">Estas cifras se muestran justo debajo de la portada principal.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cmsData.stats.map((st, i) => (
              <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono text-[#e11b22] font-black uppercase">Métrica #{i + 1}</span>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Número / Cifra:</label>
                  <input 
                    type="text" 
                    value={st.value}
                    onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-base font-black text-white font-mono outline-none focus:border-[#e11b22]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Etiqueta Principal:</label>
                  <input 
                    type="text" 
                    value={st.label}
                    onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 outline-none focus:border-[#e11b22]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Descripción Breve:</label>
                  <input 
                    type="text" 
                    value={st.subtext}
                    onChange={(e) => handleStatChange(i, 'subtext', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 outline-none focus:border-[#e11b22]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 3: BRANDS (Aseguradoras Aliadas)
          ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'brands' && (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Marcas Aliadas del Carrusel Continuo</h3>
              <p className="text-xs text-slate-400">Logos y nombres que recorren la cinta horizontal debajo de los stats.</p>
            </div>
            
            <form onSubmit={handleAddBrand} className="flex gap-2 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder="Nombre de la aseguradora..."
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#e11b22] min-w-[220px]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-[#e11b22] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4">
            {cmsData.brands.map((b, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">
                <span className="text-xs font-black text-white tracking-wider">{b.label}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteBrand(i)}
                  className="p-1 text-slate-600 hover:text-red-400 transition-colors cursor-pointer"
                  title="Eliminar marca"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-TAB 4: CONTACTO & GOOGLE MAPS
          ───────────────────────────────────────────────────────────── */}
      {activeSubTab === 'contact' && (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white mb-2">Información Corporativa & Google Maps</h3>
          <p className="text-xs text-slate-400 mb-6">Datos que se muestran en el pie de página y en la sección de Contacto.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Ciudad / País:</label>
              <input 
                type="text" 
                value={cmsData.contact.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Detalle de Dirección:</label>
              <input 
                type="text" 
                value={cmsData.contact.addressDetail}
                onChange={(e) => handleContactChange('addressDetail', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Teléfono Fijo:</label>
              <input 
                type="text" 
                value={cmsData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Número de WhatsApp:</label>
              <input 
                type="text" 
                value={cmsData.contact.whatsapp}
                onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-emerald-400 font-bold outline-none focus:border-[#e11b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Correo Electrónico:</label>
              <input 
                type="email" 
                value={cmsData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Horario Laboral:</label>
              <input 
                type="text" 
                value={cmsData.contact.hours}
                onChange={(e) => handleContactChange('hours', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#e11b22]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-400 block mb-1">Enlace de Inserción Google Maps (src del iframe):</label>
              <input 
                type="text" 
                value={cmsData.contact.mapsUrl}
                onChange={(e) => handleContactChange('mapsUrl', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-slate-300 outline-none focus:border-[#e11b22]"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
