'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ShieldCheck } from 'lucide-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Tooltip / Mini tarjeta de contacto */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-md">
                DC
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 leading-none">Diego Carpio G.</h4>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Asesor Activo en Línea
                </span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
            ¡Hola! 👋 Te ayudamos a comparar seguros de salud, vehículos o vida entre las 10 aseguradoras líderes. ¿En qué podemos asesorarte hoy?
          </p>

          <a
            href="https://wa.me/593991938754?text=Hola%20DC%20Asesores,%20deseo%20asesor%C3%ADa%20en%20seguros"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Iniciar Chat en WhatsApp</span>
          </a>
        </div>
      )}

      {/* Botón Flotante con efecto radar */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contactar por WhatsApp a DC Asesores"
          className="relative w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-950/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-2 border-white"
        >
          <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.938-6.938 6.938z"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
