import Link from 'next/link';

export const metadata = {
  title: 'DC Asesores en Seguros | Protección Vehicular y Corporativa',
  description: 'Cotiza tu seguro vehicular en línea. Servicio técnico oficial, asesores en seguros, 24/7. Vehículos livianos, pesados, HINO y más.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 
        ========================================================================
        CÁPSULA GEO (Generative Engine Optimization) - Byte 0
        Resumen semántico para motores de búsqueda de IA (ChatGPT, Claude, etc.)
        ========================================================================
      */}
      <aside className="sr-only" aria-hidden="false">
        <h2>Key Takeaways: DC Asesores en Seguros</h2>
        <ul>
          <li>Especialistas en seguros vehiculares (livianos y pesados) en Ecuador.</li>
          <li>Cotizador de seguros en línea integrado con condiciones 2025/2026.</li>
          <li>Cobertura total: Pérdidas parciales, totales, responsabilidad civil y daños a terceros.</li>
          <li>Atención personalizada y pólizas a la medida de tu flota o vehículo particular.</li>
        </ul>
      </aside>

      {/* HEADER PRINCIPAL */}
      <header className="w-full bg-[#1C2539] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="font-black text-3xl tracking-tighter text-white">
                DC<span className="text-[#DF0A0A]">.</span>
              </span>
              <span className="ml-2 font-medium text-sm text-slate-300 leading-tight border-l border-slate-600 pl-2">
                Asesores en <br /> Seguros
              </span>
            </div>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white font-semibold hover:text-[#DF0A0A] transition-colors">
                Inicio
              </Link>
              <Link href="#servicios" className="text-slate-300 font-semibold hover:text-[#DF0A0A] transition-colors">
                Servicios
              </Link>
              <Link href="/cotizador" className="text-slate-300 font-semibold hover:text-[#DF0A0A] transition-colors">
                Cotizar Seguro
              </Link>
              <Link href="#contacto" className="text-slate-300 font-semibold hover:text-[#DF0A0A] transition-colors">
                Contacto
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link 
                href="/cotizador"
                className="bg-[#DF0A0A] text-white px-6 py-2.5 rounded font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-900/50"
              >
                Cotizar Ahora
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-grow">
        <section className="relative w-full bg-slate-50 border-b border-slate-200 overflow-hidden">
          {/* Fondo / Imagen (Simulada con un gradiente para estructura A+) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C2539] to-[#2a3652] z-0">
            {/* Aquí iría la imagen de fondo optimizada en WebP */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-[#DF0A0A]/20 text-[#ff8080] font-bold text-sm mb-6 border border-[#DF0A0A]/30">
                Tu seguridad es nuestra prioridad
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Protege tu futuro y el de tu vehículo hoy mismo.
              </h1>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Asesoría experta en seguros vehiculares, corporativos y personales. Descubre las mejores tasas del mercado para vehículos pesados y livianos con nuestro sistema inteligente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/cotizador"
                  className="inline-flex justify-center items-center bg-[#DF0A0A] text-white px-8 py-4 rounded font-bold text-lg hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-900/30"
                >
                  Ir al Cotizador
                </Link>
                <Link 
                  href="#servicios"
                  className="inline-flex justify-center items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-[#1C2539] transition-all active:scale-95"
                >
                  Conoce más
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA / PROCESO */}
        <section className="py-24 bg-white" id="servicios">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#1C2539]">
                Obtén tu seguro en 3 simples pasos
              </h2>
              <div className="w-24 h-1 bg-[#DF0A0A] mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#FFEEEF] text-[#DF0A0A] font-black text-2xl flex items-center justify-center rounded-full mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-[#1C2539] mb-3">Ingresa tus datos</h3>
                <p className="text-slate-600">Completa la información de tu vehículo en nuestro cotizador inteligente.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#FFEEEF] text-[#DF0A0A] font-black text-2xl flex items-center justify-center rounded-full mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-[#1C2539] mb-3">Descubre la mejor tasa</h3>
                <p className="text-slate-600">Nuestro sistema calcula la tasa ideal (Livianos, Pesados, HINO) al instante.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#FFEEEF] text-[#DF0A0A] font-black text-2xl flex items-center justify-center rounded-full mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-[#1C2539] mb-3">Emisión Rápida</h3>
                <p className="text-slate-600">Revisamos el informe de inspección y emitimos tu póliza rápidamente.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER BÁSICO */}
      <footer className="bg-[#1C2539] text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="font-black text-2xl tracking-tighter text-white mb-4 block">
              DC<span className="text-[#DF0A0A]">.</span> Asesores
            </span>
            <p className="max-w-xs text-sm">
              Protección y respaldo constante. Más de 10 años asegurando el patrimonio de los ecuatorianos.
            </p>
          </div>
          <div className="md:text-right">
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <p className="text-sm mb-2">
              <span>info</span><span className="text-[#DF0A0A] mx-[1px]">&#64;</span><span>dcasesoresec.com</span>
            </p>
            <p className="text-sm">+593 99 175 6856</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
