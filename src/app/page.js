import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesCarousel } from '@/components/home/ServicesCarousel';
import { WhatsAppWidget } from '@/components/common/WhatsAppWidget';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Building2,
  Award,
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';

const BRANDS = [
  { label: 'ALIANZA', prefix: 'AF', prefixColor: 'text-[#e11b22]', size: 'text-3xl' },
  { label: 'LATINA', prefix: '●', prefixColor: 'text-[#D9222A]', size: 'text-3xl font-bold' },
  { label: 'HISPANA', prefix: '♦', prefixColor: 'text-amber-500', size: 'text-3xl' },
  { label: 'SWEADEN', prefix: '♦', prefixColor: 'text-blue-600', size: 'text-3xl' },
  { label: 'ZURICH', prefix: '■', prefixColor: 'text-blue-700', size: 'text-3xl' },
  { label: 'MAPFRE', size: 'text-3xl font-serif text-[#e11b22]' },
  { label: 'PRIVILEGIO', size: 'text-3xl text-indigo-900 dark:text-indigo-400 font-bold' },
  { label: 'ATLÁNTIDA', prefix: '▲', prefixColor: 'text-teal-600', size: 'text-3xl' },
  { label: 'ADS SEGUROS', size: 'text-3xl font-bold text-slate-800 dark:text-slate-200' },
  { label: 'VAZ SEGUROS', prefix: '✦', prefixColor: 'text-orange-500', size: 'text-3xl' },
  { label: 'BMI', prefix: '///', prefixColor: 'text-[#e11b22]', size: 'text-3xl' },
];
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS];

function MarqueeBrands() {
  return (
    <div className="animate-marquee flex items-center w-max">
      {BRANDS_DOUBLED.map((brand, idx) => (
        <div key={idx} className="shrink-0 w-[200px] md:w-[260px] flex items-center justify-center px-4">
          <div className={`font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 ${brand.size}`}>
            {brand.prefix && <span className={brand.prefixColor}>{brand.prefix}</span>}
            <span>{brand.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export const metadata = {
  title: 'DC Asesores en Seguros | Protección Financiera Ecuador',
  description: 'Asesoría integral en seguros de salud, vehículos, vida y patrimoniales en Ecuador. Comparamos más de 10 aseguradoras líderes con atención 24/7.',
  alternates: {
    canonical: 'https://dcasesoresec.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 relative scroll-smooth selection:bg-[#e11b22] selection:text-white transition-colors">
      
      {/* 🟢 WIDGET FLOTANTE DE WHATSAPP */}
      <WhatsAppWidget />

      {/* 🔴 LUXURY NAVBAR UNIFICADO CON TOPBAR OFICIAL Y THEME SWITCH */}
      <Navbar />

      {/* 🔴 LUXURY HERO SECTION CON FOTOGRAFÍA NÍTIDA VISIBLE (MOBILE / DESKTOP) */}
      <section className="relative w-full min-h-[640px] lg:h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Imagen de Fondo Responsiva con Alta Claridad */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero-mobile.webp" />
            <source media="(min-width: 768px)" srcSet="/hero-desktop.webp" />
            <img 
              src="/hero-desktop.webp" 
              alt="DC Asesores en Seguros - Protección Familiar y Financiera" 
              className="w-full h-full object-cover object-center opacity-85 dark:opacity-75 transition-opacity duration-700"
            />
          </picture>
          
          {/* Degradado Cinematográfico Suave que conserva la visibilidad de la foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20"></div>
          
          {/* Luz roja escénica (Aetherion Glow) */}
          <div className="absolute top-1/4 -right-1/4 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-[#e11b22]/20 rounded-full blur-[160px] pointer-events-none"></div>
        </div>

        {/* Contenido Central del Hero */}
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white pt-16 pb-24 sm:py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#e11b22] animate-ping"></span> 
            ASESORÍA INTEGRAL EN SEGUROS • ECUADOR
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black leading-[1.08] tracking-tight mb-8">
            Protege lo que más importa con el <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] via-red-500 to-amber-400">
              respaldo correcto.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Analizamos tus necesidades reales para diseñar soluciones personalizadas en salud, vida y patrimonio. Tu tranquilidad es nuestro contrato.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/cotizador" 
              className="bg-[#e11b22] hover:bg-red-600 text-white px-10 py-5 font-black text-base sm:text-lg rounded-full shadow-[0_10px_40px_rgba(225,27,34,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <span>Cotizar mi seguro ahora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/servicios" 
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-5 font-bold text-base rounded-full border border-white/25 backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Explorar Coberturas
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 1. SECCIÓN DE STATS DE ALTO IMPACTO (Métricas de Confianza) */}
      <StatsSection />

      {/* 🔴 2. BANDA DE MARCAS (Ubicada exactamente después de los stats) */}
      <section className="relative py-16 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div className="container mx-auto px-6 mb-8 text-center max-w-5xl relative z-10">
          <p className="text-xs font-mono font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            Alianzas Estratégicas
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Respaldados por las aseguradoras <span className="text-[#e11b22]">más sólidas del mercado</span>
          </h2>
        </div>
        
        {/* Sombras laterales difuminadas para carrusel infinito */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        <div className="w-full flex overflow-hidden py-3">
          <MarqueeBrands />
        </div>
      </section>

      {/* 🔴 3. CARRUSEL INTERMINABLE DE SERVICIOS (Estilo Vermilion / Aetherion) */}
      <ServicesCarousel />

      {/* 🔴 4. SECCIÓN NOSOTROS (VINCULADA AL NAVBAR OFICIAL) */}
      <section id="nosotros" className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 aetherion-glow pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" />
                Sobre DC Asesores
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Más de 15 años protegiendo lo que más valoras en el Ecuador
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                Somos una Agencia Asesora Productora de Seguros legalmente autorizada por la Superintendencia de Compañías. Nuestro rol fundamental es defender los derechos del asegurado, asesorándolo con independencia total y acompañándolo presencialmente en cada siniestro.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-black text-[#e11b22] font-mono mb-1">100%</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Independencia</div>
                  <p className="text-[11px] text-slate-400 mt-1">Sin ataduras comerciales a una sola aseguradora.</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-black text-emerald-400 font-mono mb-1">24/7</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Soporte In Situ</div>
                  <p className="text-[11px] text-slate-400 mt-1">Presencia física inmediata en emergencias graves.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img 
                  src="/services-hero.webp" 
                  alt="Equipo DC Asesores en Seguros Quito" 
                  className="w-full h-[450px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e11b22] flex items-center justify-center text-white font-black">
                      DC
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Diego Carpio G.</h4>
                      <p className="text-xs text-slate-300">Director General & Consultor Actuarial</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔴 CÓMO TRABAJAMOS (Metodología DC Asesores) */}
      <section id="proceso" className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16 sm:mb-20 relative z-10">
          <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-xs uppercase mb-3 font-mono">
            Metodología DC
          </h4>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Nuestro proceso de asesoría integral
          </h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { num: '01', title: 'Diagnóstico', desc: 'Analizamos tus riesgos y capacidades financieras sin costo.' },
              { num: '02', title: 'Diseño', desc: 'Estructuramos y comparamos la póliza perfecta entre 10 aseguradoras.' },
              { num: '03', title: 'Contratación', desc: 'Transparencia total en cláusulas, deducibles y derechos de ley.' },
              { num: '04', title: 'Siniestros', desc: 'Acompañamiento presencial e in situ 24/7 cuando más nos necesitas.' },
            ].map((step, i) => (
              <div 
                key={i} 
                className="bg-slate-950/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 hover:border-[#e11b22] transition-colors group"
              >
                <div className="text-5xl sm:text-6xl font-black text-slate-800 group-hover:text-[#e11b22] transition-colors mb-4 opacity-70 font-mono">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔴 SECCIÓN BLOG HOME */}
      <section className="py-24 sm:py-32 bg-[#f4f4f6] dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
            <div>
              <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-xs uppercase mb-3 font-mono">
                Últimas publicaciones
              </h4>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Inteligencia Financiera & Seguros
              </h2>
            </div>
            <Link 
              href="/blog" 
              className="mt-4 md:mt-0 font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-[#e11b22] flex items-center gap-2 transition-colors"
            >
              <span>Ver todos los artículos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/blog" className="group rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60 dark:border-slate-800">
              <div className="h-60 relative overflow-hidden">
                <img src="/blog_peace.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="El Seguro y la Tranquilidad" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  El seguro: La herramienta para que Latinoamérica salga de la pobreza
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                  Jürgen Klarić lo advierte: asegurar tu salud y tu vida es comprar el derecho a dormir tranquilo.
                </p>
              </div>
            </Link>
            
            <Link href="/blog" className="group rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60 dark:border-slate-800">
              <div className="h-60 relative overflow-hidden">
                <img src="/blog_history.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Historia de los Seguros en Ecuador" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  Los orígenes: Cómo iniciaron los seguros en el Ecuador
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                  Desde los grandes incendios de Guayaquil hasta la actualidad, conoce la evolución de la protección.
                </p>
              </div>
            </Link>

            <Link href="/blog" className="group rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60 dark:border-slate-800">
              <div className="h-60 relative overflow-hidden">
                <img src="/blog_advisor.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Asistencia Real en Siniestros" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  Más que un papel: Cómo en DC Asesores te damos asistencia real
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                  Si tienes un siniestro a las 2 AM o una urgencia clínica, nuestro equipo toma el control presencial.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 SECCIÓN CONTACTO + GOOGLE MAPS (SIMÉTRICA: IZQUIERDA MAPA CON DATOS, DERECHA FORMULARIO) */}
      <section id="contacto" className="py-24 sm:py-32 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-xs uppercase mb-3 font-mono">
              Atención Personalizada
            </h4>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Visítanos o Solicita Asesoría Directa
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-3">
              Estamos ubicados en el corazón corporativo y financiero de Quito, con cobertura en todo el Ecuador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* 🔴 COLUMNA IZQUIERDA: DATOS DE CONTACTO SOBRE EL MAPA (ALTURA IGUAL A LA DERECHA) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              
              {/* Tarjetas Corporativas Sobre el Mapa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#e11b22] flex items-center justify-center mb-2.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 mb-1">Oficina Central</h4>
                  <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                    Quito, Pichincha, Ecuador
                  </p>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Sector La Carolina / República de El Salvador
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 mb-1">Teléfonos de Contacto</h4>
                  <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                    02 500 3373
                  </p>
                  <a 
                    href="https://wa.me/593991938754" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#e11b22] hover:underline block mt-0.5"
                  >
                    WhatsApp: +593 99 193 8754
                  </a>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 mb-1">Correo Electrónico</h4>
                  <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                    <span>info</span><span className="text-[#e11b22]">&#64;</span><span>dcasesoresec.com</span>
                  </p>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Respuesta en menos de 2 horas hábiles
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 mb-1">Horario Laboral</h4>
                  <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                    Lunes a Viernes: 08:30 - 18:00
                  </p>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    Emergencias & Siniestros: 24/7
                  </span>
                </div>
              </div>

              {/* Mapa de Google Maps Interactivo */}
              <div className="flex-1 min-h-[300px] bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg relative flex flex-col">
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ubicación Satelital DC Asesores</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Quito • Ecuador</span>
                </div>
                
                <div className="flex-1 w-full relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d359.5141084768887!2d-78.48699087144594!3d-0.18020313187060877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sec!4v1789947987659!5m2!1ses-419!2sec" 
                    width="100%" 
                    height="100%" 
                    className="border-0 w-full h-full min-h-[260px]"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ubicación DC Asesores en Seguros Quito"
                  />
                </div>
              </div>

            </div>

            {/* 🔴 COLUMNA DERECHA: FORMULARIO SOLO (CON AUTOCOMPLETADO Y ALTURA SINCRONIZADA) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Respuesta Inmediata
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                    Solicita tu Cotización o Asesoría
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">
                    Déjanos tus datos y un especialista senior de DC Asesores te contactará con la comparativa de mercado en menos de 2 horas.
                  </p>

                  <form className="space-y-4" autoComplete="on">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="client-name" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Nombre completo*
                        </label>
                        <input 
                          id="client-name"
                          name="name" 
                          type="text" 
                          autoComplete="name"
                          placeholder="Ej: Carlos Mendoza" 
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 dark:text-slate-100 transition-colors shadow-2xs" 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="client-phone" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          WhatsApp o celular*
                        </label>
                        <input 
                          id="client-phone"
                          name="tel" 
                          type="tel" 
                          autoComplete="tel"
                          placeholder="Ej: 099 193 8754" 
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 dark:text-slate-100 transition-colors shadow-2xs" 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="client-email" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Correo electrónico*
                      </label>
                      <input 
                        id="client-email"
                        name="email" 
                        type="email" 
                        autoComplete="email"
                        placeholder="Ej: carlos.mendoza@empresa.com" 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 dark:text-slate-100 transition-colors shadow-2xs" 
                        required 
                      />
                    </div>

                    <div>
                      <label htmlFor="client-service" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Tipo de seguro que deseas cotizar
                      </label>
                      <select
                        id="client-service"
                        name="service"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 dark:text-slate-100 transition-colors shadow-2xs"
                      >
                        <option value="vehicular">Seguro Vehicular Multicompañía</option>
                        <option value="salud">Seguro Médico Integral</option>
                        <option value="vida-ahorro">Seguro de Vida con Ahorro</option>
                        <option value="vida-tradicional">Seguro de Vida Tradicional</option>
                        <option value="patrimonial">Seguro Patrimonial & Hogar</option>
                        <option value="empresarial">Seguro Empresarial & Corporativo</option>
                        <option value="siniestros">Asistencia y Gestión de Siniestro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="client-message" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Detalles o requerimientos adicionales
                      </label>
                      <textarea 
                        id="client-message"
                        name="message"
                        placeholder="Indícanos marca, año y valor del vehículo, o edad de los integrantes de tu familia..." 
                        rows={4} 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 dark:text-slate-100 transition-colors shadow-2xs resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 rounded-2xl bg-[#e11b22] hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitud Inmediata</span>
                    </button>
                  </form>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-400 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Tus datos están protegidos bajo estricto secreto profesional y confidencialidad.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 🔴 FOOTER DE LUJO */}
      <footer className="bg-slate-950 pt-20 pb-12 border-t-4 border-[#e11b22] text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.webp" alt="DC Asesores" className="h-10 w-auto filter brightness-200" />
              <div className="flex flex-col border-l border-slate-700 pl-3">
                <span className="text-sm font-black tracking-tight text-white leading-none">DC ASESORES</span>
                <span className="text-[10px] font-bold tracking-wider text-[#e11b22] uppercase mt-0.5">Asesores en Seguros</span>
              </div>
            </Link>
            <p className="text-slate-400 font-medium text-xs leading-relaxed mb-4">
              Asesoría actuarial y corretaje de seguros en Ecuador. Protección patrimonial, vehicular, médica y corporativa con estándares de excelencia.
            </p>

            {/* Redes Sociales Oficiales */}
            <div className="pt-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Canales Oficiales
              </span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.facebook.com/Asesor012/" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Facebook DC Asesores"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#e11b22] hover:text-white border border-white/10 text-slate-300 transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@asesorseguros2?_r=1&_t=ZS-94CCdpAiPGZ" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="TikTok DC Asesores"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#e11b22] hover:text-white border border-white/10 text-slate-300 transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.64 1.25-.11 2.37-.93 2.78-2.11.23-.6.3-1.25.28-1.89.02-4.97.01-9.94.01-14.91z"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/dc.asesorseguros?igsh=MXMwd2oxbWkza3hjdw%3D%3D" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram DC Asesores"
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#e11b22] hover:text-white border border-white/10 text-slate-300 transition-all flex items-center justify-center active:scale-95 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-5">Ramos de Seguros</h4>
            <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
              <li><Link href="/servicios/seguro-medico-integral" className="hover:text-[#e11b22] transition-colors">Seguro Médico Integral</Link></li>
              <li><Link href="/servicios/seguro-vida-ahorro" className="hover:text-[#e11b22] transition-colors">Seguro de Vida con Ahorro</Link></li>
              <li><Link href="/servicios/seguro-vehicular" className="hover:text-[#e11b22] transition-colors">Seguro Vehicular Multicompañía</Link></li>
              <li><Link href="/servicios/seguros-empresariales" className="hover:text-[#e11b22] transition-colors">Seguros Empresariales</Link></li>
              <li><Link href="/servicios/seguros-patrimoniales" className="hover:text-[#e11b22] transition-colors">Seguros Patrimoniales & Hogar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-5">Navegación Rápida</h4>
            <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
              <li><Link href="/" className="hover:text-[#e11b22] transition-colors">Inicio</Link></li>
              <li><Link href="/#nosotros" className="hover:text-[#e11b22] transition-colors">Nosotros</Link></li>
              <li><Link href="/servicios" className="hover:text-[#e11b22] transition-colors">Catálogo de Servicios</Link></li>
              <li><Link href="/cotizador" className="hover:text-[#e11b22] transition-colors">Cotizador Inteligente 2026</Link></li>
              <li><Link href="/blog" className="hover:text-[#e11b22] transition-colors">Blog & Artículos</Link></li>
              <li><Link href="/terminos-y-condiciones" className="hover:text-[#e11b22] transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-5">Contacto Oficial</h4>
            <ul className="space-y-3 text-slate-400 text-xs font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e11b22] shrink-0 mt-0.5" />
                <span>Quito, Pichincha, Ecuador (Sector La Carolina)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e11b22] shrink-0" />
                <span>(02) 500-3373 / +593 99 193 8754</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e11b22] shrink-0" />
                <span><span>info</span><span className="text-[#e11b22]">&#64;</span><span>dcasesoresec.com</span></span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 text-center border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium">
          <p>© 2026 DC Asesores en Seguros. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/admin" className="hover:text-slate-400 transition-colors">Acceso Master</Link>
            <span>•</span>
            <Link href="/terminos-y-condiciones" className="hover:text-slate-400 transition-colors">Términos Legales</Link>
          </div>
        </div>
      </footer>

      {/* JSON-LD Schema.org de Organización */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'InsuranceAgency',
            'name': 'DC Asesores en Seguros',
            'url': 'https://dcasesoresec.com',
            'logo': 'https://dcasesoresec.com/logo.webp',
            'telephone': '+593-99-193-8754',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Sector La Carolina / República de El Salvador',
              'addressLocality': 'Quito',
              'addressRegion': 'Pichincha',
              'addressCountry': 'EC',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': -0.18020313187060877,
              'longitude': -78.48699087144594,
            },
            'openingHours': 'Mo-Fr 08:30-18:00',
            'sameAs': [
              'https://www.facebook.com/Asesor012/',
              'https://www.tiktok.com/@asesorseguros2?_r=1&_t=ZS-94CCdpAiPGZ',
              'https://www.instagram.com/dc.asesorseguros?igsh=MXMwd2oxbWkza3hjdw%3D%3D'
            ]
          }),
        }}
      />
    </div>
  );
}
