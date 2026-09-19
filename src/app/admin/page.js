'use client';
import { useState } from 'react';
import { defaultTasas } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('aseguradoras');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#e11b22] selection:text-white flex">
      
      {/* SIDEBAR ADMIN */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0">
         <img src="/logo.webp" alt="DC Asesores" className="h-10 object-contain mb-10 filter grayscale brightness-200" />
         
         <nav className="space-y-2 flex-1">
            <button 
              onClick={() => setActiveTab('aseguradoras')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'aseguradoras' ? 'bg-[#e11b22] text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              Calculadora Tasas
            </button>
            <button 
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'cms' ? 'bg-[#e11b22] text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              Gestor Blog / Textos
            </button>
         </nav>
         
         <div className="pt-6 border-t border-slate-800">
           <a href="/" className="text-slate-500 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors">
             ← Volver a la Web
           </a>
         </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        
        {activeTab === 'aseguradoras' && (
          <AseguradorasManager />
        )}

        {activeTab === 'cms' && (
          <CMSManager />
        )}

      </main>
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTE: GESTOR DE ASEGURADORAS Y TASAS (El original intacto)
// ----------------------------------------------------
function AseguradorasManager() {
  const [data, setData] = useState(defaultTasas);
  const [isUploading, setIsUploading] = useState(false);
  const [activeAseguradora, setActiveAseguradora] = useState(Object.keys(defaultTasas)[0]);
  const [pasteData, setPasteData] = useState('');
  
  const uploadToFirebase = async () => {
    try {
      setIsUploading(true);
      await setDoc(doc(db, "configuracion", "tasasVehiculares"), data);
      alert('¡Datos subidos a Firebase exitosamente!');
    } catch (error) {
      console.error(error);
      alert('Error subiendo a Firebase. Revisa las reglas o credenciales.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasteExcel = (e) => {
    e.preventDefault();
    if (!pasteData) return;
    const lines = pasteData.trim().split('\n');
    const newRecords = lines.map(line => {
      const cols = line.split('\t');
      return {
        producto: cols[0] || '',
        ciudad: cols[1] || '',
        vehiculo: cols[2] || '',
        desde: Number(cols[3]) || 0,
        hasta: Number(cols[4]) || 99999,
        tasa: Number(cols[5]) || 0,
        rc: Number(cols[6]) || 0,
      };
    });
    
    setData(prev => ({
      ...prev,
      [activeAseguradora]: newRecords
    }));
    setPasteData('');
    alert(`Se importaron ${newRecords.length} registros a ${activeAseguradora}`);
  };

  const currentRecords = data[activeAseguradora] || [];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Motor de Cotización</h1>
          <p className="text-slate-400 mt-1">Configura las tasas y tablas de Excel por Aseguradora.</p>
        </div>
        <button 
          onClick={uploadToFirebase}
          disabled={isUploading}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-green-900/50"
        >
          {isUploading ? 'Subiendo...' : 'Subir TODO a Firebase ☁️'}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {Object.keys(data).map(aseguradora => (
          <button
            key={aseguradora}
            onClick={() => setActiveAseguradora(aseguradora)}
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all shadow-md ${
              activeAseguradora === aseguradora 
                ? 'bg-[#e11b22] text-white' 
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {aseguradora}
            <span className="ml-2 bg-black/20 px-2 py-0.5 rounded-full text-xs">
              {(data[aseguradora] || []).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl h-fit">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            📥 Pegar desde Excel 
            <span className="text-[#e11b22] text-sm">({activeAseguradora})</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Copia las filas desde tu Google Sheets o Excel y pégalas aquí. <br/>
            <strong>Orden:</strong> Producto | Ciudad | Vehículo | Desde | Hasta | Tasa | RC
          </p>
          <textarea 
            value={pasteData}
            onChange={(e) => setPasteData(e.target.value)}
            className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 font-mono text-xs outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] transition-all resize-none mb-4"
            placeholder="Pega aquí los datos de Excel (Tabulados)..."
          ></textarea>
          <button 
            onClick={handlePasteExcel}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Reemplazar matriz
          </button>
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <h3 className="font-bold text-white">Matriz Actual: {activeAseguradora}</h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              {currentRecords.length} registros
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Producto</th>
                  <th className="px-6 py-4 font-bold">Ciudad</th>
                  <th className="px-6 py-4 font-bold">Vehículo</th>
                  <th className="px-6 py-4 font-bold text-right">Rango Valor</th>
                  <th className="px-6 py-4 font-bold text-right">Tasa</th>
                  <th className="px-6 py-4 font-bold text-right">RC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {currentRecords.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      No hay tasas cargadas para {activeAseguradora}.<br/>Usa el panel izquierdo para pegar desde Excel.
                    </td>
                  </tr>
                ) : (
                  currentRecords.slice(0, 15).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-300">{row.producto}</td>
                      <td className="px-6 py-3 text-slate-400">{row.ciudad}</td>
                      <td className="px-6 py-3 text-slate-400">{row.vehiculo}</td>
                      <td className="px-6 py-3 text-right font-mono text-slate-400">${row.desde} - ${row.hasta === 99999 ? '∞' : row.hasta}</td>
                      <td className="px-6 py-3 text-right font-black text-[#e11b22]">{row.tasa}%</td>
                      <td className="px-6 py-3 text-right text-slate-400 font-mono">${row.rc}</td>
                    </tr>
                  ))
                )}
                {currentRecords.length > 15 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-xs text-slate-500 bg-slate-900">
                      Y {currentRecords.length - 15} registros más... (Ocultos para rendimiento)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTE: GESTOR DE CMS (Blog y Textos) - NUEVO
// ----------------------------------------------------
function CMSManager() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Gestor de Contenidos (CMS)</h1>
          <p className="text-slate-400 mt-1">Administra los artículos de tu Blog y textos del sitio centralizados en Firebase.</p>
        </div>
        <button 
          className="bg-[#e11b22] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-red-900/50"
        >
          + Nuevo Artículo
        </button>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden mb-8">
         <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Artículos Publicados (Blog)</h3>
         </div>
         <div className="divide-y divide-slate-800/50">
            {/* FAKE DATA DEMO FOR THE ADMIN PANEL */}
            {[
              { id: 1, title: 'El seguro: La herramienta para que Latinoamérica salga de la pobreza', author: 'DC Equipo', status: 'Publicado', date: 'Hoy' },
              { id: 2, title: 'Los orígenes: Cómo iniciaron los seguros en el Ecuador', author: 'DC Equipo', status: 'Publicado', date: 'Ayer' },
              { id: 3, title: 'Más que un papel: Cómo en DC Asesores te damos asistencia real', author: 'Dirección Médica', status: 'Borrador', date: '15/Sep' },
            ].map(post => (
              <div key={post.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                 <div>
                    <h4 className="font-bold text-slate-200 text-lg mb-1">{post.title}</h4>
                    <div className="flex gap-4 text-xs text-slate-500 font-medium">
                       <span>Autor: {post.author}</span>
                       <span>•</span>
                       <span>Fecha: {post.date}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.status === 'Publicado' ? 'bg-green-900/50 text-green-400' : 'bg-orange-900/50 text-orange-400'}`}>
                      {post.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl opacity-60">
         <div className="flex items-center gap-4 mb-4">
            <svg className="w-8 h-8 text-[#e11b22]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="text-xl font-bold text-white">Próximo paso de desarrollo</h3>
         </div>
         <p className="text-slate-400 leading-relaxed max-w-3xl">
           La interfaz gráfica del CMS está lista. El siguiente paso técnico es conectar estos botones directamente con la colección <code>blog_posts</code> en Firebase Firestore. De esta manera, cualquier artículo que escribas o edites aquí, se actualizará instantáneamente en la página pública del Blog.
         </p>
      </div>
    </div>
  );
}
