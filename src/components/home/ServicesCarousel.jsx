'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/servicesData';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function ServicesCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = SERVICES_DATA;

  // Actualizar estado de scroll y dots
  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    // Calcular índice aproximado
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 380;
    const newIndex = Math.round(scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(newIndex, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  // Navegación manual fluida
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 380;
    const scrollAmount = cardWidth + 24; // ancho + gap

    if (direction === 'next') {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 40) {
        // Volver al inicio suavemente para carrusel infinito
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 20) {
        // Ir al final
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Autoplay continuo inteligente
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      scroll('next');
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollToDot = (idx) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 380;
    scrollRef.current.scrollTo({ left: idx * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section 
      id="servicios" 
      className="py-24 sm:py-32 px-4 max-w-7xl mx-auto overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo con brillo Aetherion sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/5 dark:bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Encabezado Aetherion Luxury */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 relative z-10">
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
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium mt-3 max-w-2xl">
            Soluciones actuariales independientes con más de 10 aseguradoras líderes en Ecuador. Compara, elige y cuenta con asesoría presencial en cada siniestro.
          </p>
        </div>

        {/* Controles de navegación de lujo */}
        <div className="flex items-center gap-3 mt-6 md:mt-0 shrink-0">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label="Servicio anterior"
            className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-[#e11b22] hover:text-[#e11b22] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Siguiente servicio"
            className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-[#e11b22] hover:text-[#e11b22] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
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

      {/* Track del carrusel: suave, táctil, snap nativo y responsive */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-6 pt-2 px-1 relative z-10"
      >
        {items.map((service, idx) => (
          <div
            key={service.slug}
            className="snap-start shrink-0 w-[86vw] sm:w-[380px] lg:w-[410px] group relative rounded-[32px] overflow-hidden bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/60 hover:shadow-2xl hover:border-[#e11b22]/40 transition-all duration-500 flex flex-col justify-between"
          >
            {/* Cabecera con imagen WebP de alta fidelidad y efecto zoom */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-950">
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Badge flotante con glow */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md">
                  {service.badge}
                </span>
              </div>

              {/* Ícono de rama en orbe translúcido */}
              <div className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#e11b22] transition-all duration-300">
                <img src={service.iconUrl} alt={service.title} className="w-6 h-6 object-contain filter brightness-200" />
              </div>
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2.5 group-hover:text-[#e11b22] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-3 mb-5">
                  {service.shortDesc}
                </p>

                {/* Beneficios Clave */}
                <div className="space-y-2 mb-6">
                  {service.benefits.slice(0, 3).map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e11b22] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones de la Tarjeta */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 group-hover:text-[#e11b22] flex items-center gap-1.5 transition-colors"
                >
                  <span>Ver Cobertura</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                {service.slug === 'seguro-vehicular' ? (
                  <Link
                    href="/cotizador"
                    className="px-4 py-2.5 rounded-xl bg-[#e11b22] hover:bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-600/30 active:scale-95 transition-all"
                  >
                    Cotizar Auto
                  </Link>
                ) : (
                  <a
                    href={`https://wa.me/593991938754?text=${encodeURIComponent(`Hola DC Asesores, deseo una cotización o asesoría para: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#e11b22] hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-all active:scale-95"
                  >
                    Consultar
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de Páginas (Dots) Interactivos */}
      <div className="flex justify-center items-center gap-2 mt-8 relative z-10">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir al servicio ${idx + 1}`}
            onClick={() => scrollToDot(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx 
                ? 'w-9 bg-[#e11b22] shadow-sm shadow-red-600/50' 
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
