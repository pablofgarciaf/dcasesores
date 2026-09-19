"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CotizadorPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tipoVehiculo: 'pesado', // pesado, liviano
    marca: '', // HINO, u otros
    anio: new Date().getFullYear(),
    valor: 0,
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulación de las reglas de Firebase extraídas del documento
  const calcularCotizacion = () => {
    setLoading(true);
    
    // Simular fetch a Firebase
    setTimeout(() => {
      let tasa = 0;
      let mensaje = "";
      
      const isHino = formData.marca.toUpperCase().includes('HINO');
      const edad = new Date().getFullYear() - formData.anio;

      if (isHino) {
        if (edad <= 4) {
          tasa = 3.80;
          mensaje = "Tasa aplicada para HINO (Hasta 4 años de antigüedad)";
        } else if (edad <= 15) {
          tasa = 4.20;
          mensaje = "Tasa aplicada para HINO (Hasta 15 años de antigüedad)";
        } else {
          mensaje = "Vehículo HINO fuera de rango de antigüedad para esta tarifa estándar. Requiere revisión manual.";
        }
      } else {
        // Vehículos pesados excepto HINO
        if (formData.valor >= 15000 && formData.valor < 50000) {
          tasa = 3.40;
          mensaje = "Tasa aplicada por rango de valor ($15k - $50k)";
        } else if (formData.valor >= 50000 && formData.valor < 100000) {
          tasa = 3.20;
          mensaje = "Tasa aplicada por rango de valor ($50k - $100k)";
        } else if (formData.valor >= 100000) {
          tasa = 3.00;
          mensaje = "Tasa aplicada por rango de valor (Mayor a $100k)";
        } else {
          mensaje = "El valor asegurado no entra en los rangos mínimos establecidos para esta cotización automática.";
        }
      }

      if (tasa > 0) {
        const primaNeta = (formData.valor * tasa) / 100;
        setResultado({
          tasa,
          primaNeta,
          mensaje
        });
      } else {
        setResultado({ error: mensaje });
      }

      setLoading(false);
      setStep(3); // Go to results
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-[#1C2539] w-full p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-white font-bold text-xl">
            DC<span className="text-[#DF0A0A]">.</span> Asesores
          </Link>
          <div className="text-slate-300 text-sm">Cotizador en Línea</div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Progress Bar */}
          <div className="flex w-full bg-slate-100 h-2">
            <div className={`bg-[#DF0A0A] transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
          </div>

          <div className="p-8 md:p-12">
            
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-black text-[#1C2539]">Datos del Vehículo</h2>
                <p className="text-slate-500">Comencemos con las características principales.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de Vehículo</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#DF0A0A]"
                      value={formData.tipoVehiculo}
                      onChange={e => setFormData({...formData, tipoVehiculo: e.target.value})}
                    >
                      <option value="pesado">Vehículo Pesado</option>
                      <option value="liviano">Vehículo Liviano</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Marca</label>
                    <input 
                      type="text" 
                      placeholder="Ej. HINO, Chevrolet, etc."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#DF0A0A]"
                      value={formData.marca}
                      onChange={e => setFormData({...formData, marca: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-[#1C2539] text-white font-bold py-4 rounded-lg mt-8 hover:bg-slate-800 transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-black text-[#1C2539]">Valor y Antigüedad</h2>
                <p className="text-slate-500">Para calcular la tasa correcta según las políticas de las aseguradoras.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Año de Fabricación</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#DF0A0A]"
                      value={formData.anio}
                      onChange={e => setFormData({...formData, anio: parseInt(e.target.value) || new Date().getFullYear()})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Valor Asegurado Estimado ($ USD)</label>
                    <input 
                      type="number" 
                      placeholder="Ej. 25000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#DF0A0A]"
                      value={formData.valor || ''}
                      onChange={e => setFormData({...formData, valor: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 text-slate-600 font-bold py-4 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Volver
                  </button>
                  <button 
                    onClick={calcularCotizacion}
                    disabled={loading}
                    className="w-2/3 bg-[#DF0A0A] text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex justify-center items-center gap-2"
                  >
                    {loading ? 'Calculando...' : 'Obtener Cotización'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && resultado && (
              <div className="space-y-6 text-center animate-fadeIn">
                {resultado.error ? (
                  <>
                    <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">
                      !
                    </div>
                    <h2 className="text-2xl font-black text-[#1C2539]">Cotización Especial</h2>
                    <p className="text-slate-600">{resultado.error}</p>
                    <p className="text-sm text-slate-400 mt-4">Un asesor se pondrá en contacto para brindarte una tarifa personalizada.</p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 font-black">
                      ✓
                    </div>
                    <h2 className="text-2xl font-black text-[#1C2539]">¡Cotización Exitosa!</h2>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left space-y-4 my-8">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                        <span className="text-slate-500 font-medium">Suma Asegurada</span>
                        <span className="text-lg font-bold text-[#1C2539]">${formData.valor.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                        <span className="text-slate-500 font-medium">Tasa Aplicable</span>
                        <span className="text-lg font-bold text-[#DF0A0A]">{resultado.tasa.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-slate-800 font-bold">Prima Neta Estimada</span>
                        <span className="text-2xl font-black text-[#1C2539]">${resultado.primaNeta.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-6">{resultado.mensaje}</p>

                    <button className="w-full bg-[#1C2539] text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors">
                      Solicitar Emisión
                    </button>
                  </>
                )}
                
                <button 
                  onClick={() => { setStep(1); setFormData({tipoVehiculo: 'pesado', marca: '', anio: new Date().getFullYear(), valor: 0}); setResultado(null); }}
                  className="w-full bg-transparent text-slate-500 font-bold py-4 rounded-lg hover:text-slate-800 mt-2 transition-colors"
                >
                  Nueva Cotización
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
