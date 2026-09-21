'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/servicesData';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Duplicamos la lista para efecto loop infinito
  const items = SERVICES_DATA;
  const total = items.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay pausible en hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3800);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  // Manejo táctil para celulares
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      id="servicios" 
      className="py-24 sm:py-32 px-4 max-w-7xl mx-auto overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#e11b22] border border-red-100 text-xs font-mono font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            Carrusel de Soluciones
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Coberturas Estratégicas a tu Medida
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl">
            Desliza y explora nuestros ramos de protección diseñados para familias, vehículos y corporaciones.
          </p>
        </div>

        {/* Controles de navegación */}
        <div className="flex items-center gap-3 mt-6 md:mt-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Servicio anterior"
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente servicio"
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-[#e11b22] hover:text-white hover:border-[#e11b22] text-slate-700 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <Link
            href="/servicios"
            className="hidden sm:inline-flex items-center gap-1.5 ml-3 font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-[#e11b22] transition-colors"
          >
            <span>Ver Catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Contenedor del carrusel con swipe y sin inline styles */}
      <div 
        className="w-full relative cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((offset) => {
            const itemIndex = (currentIndex + offset) % total;
            const service = items[itemIndex];
            const isHiddenMobile = offset >= 1 ? 'hidden md:block' : 'block';
            const isHiddenTablet = offset >= 2 ? 'hidden lg:block' : isHiddenMobile;

            return (
              <div
                key={service.slug + '-' + itemIndex}
                className={`${isHiddenTablet} transition-all duration-500 ease-out`}
              >
                <div className="h-[430px] rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 p-8 flex flex-col justify-between group hover:border-[#e11b22]/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  {/* Glow decorativo sutil en hover */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#e11b22]/5 rounded-full blur-2xl group-hover:bg-[#e11b22]/15 transition-all duration-500"></div>

                  <div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#e11b22] group-hover:text-white transition-colors">
                        {service.badge}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <img src={service.iconUrl} alt={service.title} className="w-6 h-6 object-contain" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22] transition-colors leading-snug relative z-10">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 relative z-10">
                      {service.shortDesc}
                    </p>

                    <div className="mt-6 space-y-2 relative z-10">
                      {service.benefits.slice(0, 2).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e11b22] shrink-0" />
                          <span className="truncate">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="font-bold text-xs uppercase tracking-wider text-slate-800 group-hover:text-[#e11b22] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Más Información</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {service.slug === 'seguro-vehicular' ? (
                      <Link
                        href="/cotizador"
                        className="px-4 py-2 rounded-xl bg-[#e11b22] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-600/25 hover:brightness-110 active:scale-95 transition-all"
                      >
                        Cotizar
                      </Link>
                    ) : (
                      <a
                        href={`https://wa.me/593991938754?text=${encodeURIComponent(`Hola DC Asesores, deseo información de ${service.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicador de Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir al slide ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === idx 
                ? 'w-8 bg-[#e11b22]' 
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
