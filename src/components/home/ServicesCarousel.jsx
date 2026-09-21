'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/servicesData';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);

  const items = SERVICES_DATA;
  const total = items.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay continuo inteligente (se pausa al pasar el cursor)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  // Manejador táctil para swipe en móviles
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  // Función pura de posición relativa (Coverflow 3D con Tailwind sin inline styles)
  const getCardClasses = (idx) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    switch (diff) {
      case 0:
        return 'z-30 opacity-100 scale-100 translate-x-0 shadow-2xl shadow-red-600/15 border-2 border-[#e11b22] dark:border-[#e11b22] pointer-events-auto';
      case 1:
        return 'z-20 opacity-75 scale-[0.88] translate-x-[48%] sm:translate-x-[65%] lg:translate-x-[78%] shadow-lg border border-slate-200/80 dark:border-slate-800 pointer-events-auto hover:opacity-95';
      case -1:
        return 'z-20 opacity-75 scale-[0.88] -translate-x-[48%] sm:-translate-x-[65%] lg:-translate-x-[78%] shadow-lg border border-slate-200/80 dark:border-slate-800 pointer-events-auto hover:opacity-95';
      case 2:
        return 'z-10 opacity-30 scale-[0.75] translate-x-[90%] sm:translate-x-[120%] lg:translate-x-[145%] shadow-md pointer-events-none hidden sm:block';
      case -2:
        return 'z-10 opacity-30 scale-[0.75] -translate-x-[90%] sm:-translate-x-[120%] lg:-translate-x-[145%] shadow-md pointer-events-none hidden sm:block';
      default:
        return 'z-0 opacity-0 scale-50 pointer-events-none hidden';
    }
  };

  return (
    <section 
      id="servicios" 
      className="py-16 sm:py-24 px-4 max-w-7xl mx-auto overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Luz roja escénica suave Aetherion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 dark:bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Encabezado Aetherion Luxury */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#e11b22] text-xs font-mono font-black uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Portafolio Estratégico Multirramo
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Coberturas diseñadas para <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] via-rose-500 to-amber-500">
              proteger tu tranquilidad
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-2 max-w-2xl">
            Haz clic en cualquier tarjeta para conocer las ventajas, coberturas del plan y asistencia personalizada 24/7.
          </p>
        </div>

        {/* Controles de navegación 3D de lujo */}
        <div className="flex items-center gap-3 mt-6 md:mt-0 shrink-0">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Servicio anterior"
            className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-[#e11b22] hover:text-[#e11b22] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente servicio"
            className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-[#e11b22] hover:text-[#e11b22] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <Link
            href="/servicios"
            className="hidden sm:inline-flex items-center gap-2 ml-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-[#e11b22] hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95"
          >
            <span>Ver Catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 🔴 CONTENEDOR CENTRAL DEL CARRUSEL 3D POSICIONAL */}
      <div className="relative h-[390px] sm:h-[410px] w-full flex items-center justify-center overflow-hidden">
        {items.map((service, idx) => {
          let diff = idx - activeIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const positionClasses = getCardClasses(idx);

          return (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              onClick={(e) => {
                // Si el usuario hace clic en una tarjeta lateral, primero la centramos
                if (diff !== 0) {
                  e.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              className={`absolute w-[290px] sm:w-[350px] lg:w-[380px] h-[360px] sm:h-[380px] rounded-3xl overflow-hidden bg-white dark:bg-slate-900/95 transition-all duration-500 ease-out flex flex-col justify-between group cursor-pointer ${positionClasses}`}
            >
              {/* Parte Superior: Imagen con Degradado y Nombre del Servicio ADENTRO */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950 shrink-0">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Degradado inferior cinematográfico para resaltar el título */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                
                {/* Badge de categoría flotante */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs">
                    {service.badge}
                  </span>
                </div>

                {/* Ícono institucional en orbe translúcido */}
                <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md group-hover:bg-[#e11b22] transition-colors">
                  <img src={service.iconUrl} alt={service.title} className="w-5 h-5 object-contain filter brightness-200" />
                </div>

                {/* 🔴 TÍTULO DEL SERVICIO ADENTRO DE LA IMAGEN */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-md group-hover:text-red-400 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Parte Inferior: Descripción corta, Beneficios clave y Llamado sutil (Sin botón tosco) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white dark:bg-slate-900/95">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 mb-3">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-1.5 mb-2">
                    {service.benefits.slice(0, 2).map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e11b22] shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>

      {/* Indicadores de Posición (Dots Interactivos) */}
      <div className="flex justify-center items-center gap-2 mt-6 relative z-10">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir al servicio ${idx + 1}`}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx 
                ? 'w-8 bg-[#e11b22] shadow-sm shadow-red-600/50' 
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
