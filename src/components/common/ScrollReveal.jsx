'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal: Componente luxury de revelación al hacer scroll.
 * Soporta animaciones fade-up, fade-in, left, right con retardos escalonados.
 * Totalmente compatible con Tailwind CSS sin estilos en línea.
 */
export function ScrollReveal({ 
  children, 
  className = '', 
  animation = 'fade-up', 
  delay = 0,
  threshold = 0.1,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si ya está en el viewport inicial al cargar la página
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -40px 0px' 
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const baseClass = 
    animation === 'fade-in' ? 'reveal-fade' :
    animation === 'left' ? 'reveal-left' :
    animation === 'right' ? 'reveal-right' :
    'reveal-base';

  const delayClass = 
    delay === 75 ? 'delay-75' :
    delay === 100 || delay === 150 ? 'delay-150' :
    delay === 200 ? 'delay-200' :
    delay === 300 ? 'delay-300' :
    delay === 400 ? 'delay-400' :
    delay === 450 || delay === 500 ? 'delay-500' :
    delay === 600 ? 'delay-600' : '';

  return (
    <Component 
      ref={ref} 
      className={`${baseClass} ${delayClass} ${isVisible ? 'reveal-in' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
