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
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-800">
      <Navbar />

      {/* Hero Servicios */}
      <section className="bg-slate-950 text-white py-20 lg:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e11b22]/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Portafolio Estratégico 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            Soluciones en Seguros para Personas y Empresas
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Protegemos tu patrimonio, tu salud familiar y tus inversiones comerciales con respaldo directo ante las 10 aseguradoras líderes de Ecuador.
          </p>
        </div>
      </section>

      {/* Cápsula GEO / Key Takeaways */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <aside className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/80">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#e11b22] font-black mb-3">
            Resumen Ejecutivo • ¿Por qué elegir DC Asesores?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Acompañamiento 24/7 en siniestros:</strong> Peritaje y asistencia in situ sin costo adicional.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Independencia total:</strong> Comparamos tarifas y deducibles para entregarte la mejor oferta real.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Resolución probada:</strong> Tasa superior al 99.8% en cobro oportuno de indemnizaciones.</span>
            </li>
          </ul>
        </aside>
      </section>

      {/* Lista de Servicios */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((srv) => (
            <div 
              key={srv.slug}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg shadow-slate-200/40 flex flex-col justify-between hover:shadow-2xl hover:border-[#e11b22]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 text-[#e11b22] border border-red-100">
                    {srv.badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-[#e11b22]/10 flex items-center justify-center transition-colors">
                    <img src={srv.iconUrl} alt={srv.title} className="w-6 h-6 object-contain" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  {srv.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                  {srv.shortDesc}
                </p>

                <div className="space-y-2 mb-8">
                  {srv.benefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e11b22] shrink-0 mt-1.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Link 
                  href={`/servicios/${srv.slug}`}
                  className="font-bold text-xs uppercase tracking-wider text-slate-900 group-hover:text-[#e11b22] flex items-center gap-1.5 transition-colors"
                >
                  <span>Ver cobertura completa</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                {srv.slug === 'seguro-vehicular' && (
                  <Link 
                    href="/cotizador"
                    className="px-3 py-1 rounded-xl bg-[#e11b22] text-white text-[11px] font-black uppercase tracking-wider shadow-sm hover:brightness-110 active:scale-95"
                  >
                    Cotizar
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            ¿Necesitas una asesoría personalizada sin costo?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Analizamos tus pólizas actuales para optimizar costos y eliminar vacíos de cobertura.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link 
              href="/cotizador"
              className="px-8 py-4 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all"
            >
              Cotizar en Línea
            </Link>
            <a 
              href="https://wa.me/593991938754?text=Hola%20DC%20Asesores,%20deseo%20una%20revisión%20de%20mis%20seguros"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider border border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
