import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { SERVICES_DATA } from '@/lib/servicesData';
import { Shield, ArrowRight, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Servicios de Seguros en Ecuador | DC Asesores 2026',
  description: 'Portafolio de seguros de salud, vida con ahorro, vehículos y corporativos en Ecuador. Asesoría integral y cotizaciones con las mejores aseguradoras.',
  alternates: {
    canonical: 'https://dcasesoresec.com/servicios',
  },
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Hero Servicios con Imagen Nítida y Aetherion Glow */}
      <section className="relative bg-slate-950 text-white py-24 lg:py-36 px-4 overflow-hidden">
        
        {/* Imagen de Fondo de Alta Calidad Visible */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/services-hero.webp" 
            alt="DC Asesores - Servicios de Seguros en Ecuador" 
            className="w-full h-full object-cover object-center opacity-75 dark:opacity-60 transition-opacity duration-700"
          />
          {/* Overlay cinemático Aetherion */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
          {/* Luz difusa roja Aetherion */}
          <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#e11b22]/20 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#e11b22] animate-ping" />
            Portafolio Estratégico 2026
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight mb-6 leading-[1.08]">
            Soluciones de Protección para <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] via-red-500 to-amber-400">
              Personas y Empresas
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Respaldamos tu patrimonio, la salud de tu familia y tus activos comerciales con convenios directos ante las aseguradoras más solventes del Ecuador.
          </p>
        </div>
      </section>

      {/* Cápsula GEO / Key Takeaways Byte-0 */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <aside className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-900/10 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e11b22]" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#e11b22] font-black">
              Resumen Ejecutivo • ¿Por qué elegir DC Asesores?
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Acompañamiento 24/7 en siniestros:</strong> Peritaje técnico y defensa jurídica in situ sin costo adicional.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Independencia real:</strong> Comparamos tarifas y deducibles para entregarte la mejor propuesta del mercado.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Resolución garantizada:</strong> Tasa superior al 99.8% en cobro oportuno y efectivo de indemnizaciones.</span>
            </li>
          </ul>
        </aside>
      </section>

      {/* Cuadrícula de Servicios Luxury con Imágenes y Transiciones */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((srv) => (
            <div 
              key={srv.slug}
              className="bg-white dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/40 flex flex-col justify-between hover:shadow-2xl hover:border-[#e11b22]/50 dark:hover:border-[#e11b22]/50 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Imagen Fotográfica del Servicio con Zoom */}
              <div className="h-56 relative overflow-hidden bg-slate-950">
                <img 
                  src={srv.imageUrl || '/services-hero.webp'} 
                  alt={srv.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md">
                    {srv.badge}
                  </span>
                </div>
              </div>

              {/* Contenido del Servicio */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    {srv.shortDesc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {srv.benefits.slice(0, 3).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e11b22] shrink-0 mt-1.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link 
                    href={`/servicios/${srv.slug}`}
                    className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white group-hover:text-[#e11b22] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Ver cobertura completa</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {srv.slug === 'seguro-vehicular' && (
                    <Link 
                      href="/cotizador"
                      className="px-3.5 py-1.5 rounded-xl bg-[#e11b22] hover:bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md active:scale-95 transition-all"
                    >
                      Cotizar
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final Luxury */}
      <section className="bg-slate-950 text-white py-20 px-4 relative overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 aetherion-glow pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-300 uppercase tracking-widest border border-white/10">
            Atención Especializada
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            ¿Necesitas una auditoría gratuita de tus pólizas actuales?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Revisamos tus contratos vigentes para optimizar deducibles, eliminar exclusiones abusivas y rebajar costos sin perder cobertura.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link 
              href="/cotizador"
              className="px-8 py-4 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all"
            >
              Cotizar en Línea
            </Link>
            <a 
              href="https://wa.me/593991938754?text=Hola%20DC%20Asesores,%20deseo%20una%20revisión%20de%20mis%20seguros"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 DC Asesores en Seguros Ecuador. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>•</span>
            <Link href="/cotizador" className="hover:text-white transition-colors">Cotizador</Link>
            <span>•</span>
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
