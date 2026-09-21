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
  Building2
} from 'lucide-react';

const BRANDS = [
  { label: 'ALIANZA', prefix: 'AF', prefixColor: 'text-[#e11b22]', size: 'text-3xl' },
  { label: 'LATINA', prefix: '●', prefixColor: 'text-[#D9222A]', size: 'text-3xl font-bold' },
  { label: 'HISPANA', prefix: '♦', prefixColor: 'text-amber-500', size: 'text-3xl' },
  { label: 'SWEADEN', prefix: '♦', prefixColor: 'text-blue-600', size: 'text-3xl' },
  { label: 'ZURICH', prefix: '■', prefixColor: 'text-blue-700', size: 'text-3xl' },
  { label: 'MAPFRE', size: 'text-3xl font-serif text-[#e11b22]' },
  { label: 'PRIVILEGIO', size: 'text-3xl text-indigo-900 font-bold' },
  { label: 'ATLÁNTIDA', prefix: '▲', prefixColor: 'text-teal-600', size: 'text-3xl' },
  { label: 'ADS SEGUROS', size: 'text-3xl font-bold text-slate-800' },
  { label: 'VAZ SEGUROS', prefix: '✦', prefixColor: 'text-orange-500', size: 'text-3xl' },
  { label: 'BMI', prefix: '///', prefixColor: 'text-[#e11b22]', size: 'text-3xl' },
];
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS];

function MarqueeBrands() {
  return (
    <div className="animate-marquee flex items-center w-max">
      {BRANDS_DOUBLED.map((brand, idx) => (
        <div key={idx} className="shrink-0 w-[200px] md:w-[260px] flex items-center justify-center px-4">
          <div className={`font-black text-slate-800 flex items-center gap-2 ${brand.size}`}>
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
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-800 relative scroll-smooth selection:bg-[#e11b22] selection:text-white">
      
      {/* 🟢 WIDGET FLOTANTE DE WHATSAPP */}
      <WhatsAppWidget />

      {/* 🔴 LUXURY NAVBAR UNIFICADO CON MENÚ HAMBURGUESA */}
      <Navbar />

      {/* 🔴 LUXURY HERO SECTION (IMAGEN MÓVIL Y ESCRITORIO ESPECIALIZADAS) */}
      <section className="relative w-full min-h-[640px] lg:h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Imagen de Fondo Responsiva */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero-mobile.webp" />
            <source media="(min-width: 768px)" srcSet="/hero-desktop.webp" />
            <img 
              src="/hero-desktop.webp" 
              alt="DC Asesores en Seguros - Protección Familiar y Financiera" 
              className="w-full h-full object-cover object-center opacity-45 transition-opacity"
            />
          </picture>
          
          {/* Degradados cinemáticos de superposición */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
          
          {/* Luz roja escénica (Aetherion Glow) */}
          <div className="absolute top-1/4 -right-1/4 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-[#e11b22]/25 rounded-full blur-[160px] pointer-events-none"></div>
        </div>

        {/* Contenido Central del Hero */}
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white pt-16 pb-24 sm:py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#e11b22] animate-ping"></span> 
            ASESORÍA INTEGRAL EN SEGUROS • ECUADOR
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black leading-[1.08] tracking-tight mb-8">
            Protege lo que más importa con el <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] via-red-500 to-orange-400">
              respaldo correcto.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
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
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-5 font-bold text-base rounded-full border border-white/20 backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Explorar Coberturas
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 1. SECCIÓN DE STATS DE ALTO IMPACTO (Métricas de Confianza) */}
      <StatsSection />

      {/* 🔴 2. BANDA DE MARCAS (Ubicada exactamente después de los stats) */}
      <section className="relative py-16 overflow-hidden bg-white border-b border-slate-200/80 shadow-xs">
        <div className="container mx-auto px-6 mb-8 text-center max-w-5xl relative z-10">
          <p className="text-xs font-mono font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
            Alianzas Estratégicas
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Respaldados por las aseguradoras <span className="text-[#e11b22]">más sólidas del mercado</span>
          </h2>
        </div>
        
        {/* Sombras laterales difuminadas para carrusel infinito */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="w-full flex overflow-hidden py-3">
          <MarqueeBrands />
        </div>
      </section>

      {/* 🔴 3. CARRUSEL INTERMINABLE DE SERVICIOS (Estilo Vermilion / Aetherion) */}
      <ServicesCarousel />

      {/* 🔴 CÓMO TRABAJAMOS (Metodología DC Asesores) */}
      <section id="proceso" className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
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
                className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 hover:border-[#e11b22] transition-colors group"
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
      <section className="py-24 sm:py-32 bg-[#f4f4f6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
            <div>
              <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-xs uppercase mb-3 font-mono">
                Últimas publicaciones
              </h4>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Inteligencia Financiera & Seguros
              </h2>
            </div>
            <Link 
              href="/blog" 
              className="mt-4 md:mt-0 font-bold text-sm text-slate-600 hover:text-[#e11b22] flex items-center gap-2 transition-colors"
            >
              <span>Ver todos los artículos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/blog" className="group rounded-[2.5rem] bg-white overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60">
              <div className="h-60 relative overflow-hidden">
                <img src="/blog_peace.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="El Seguro y la Tranquilidad" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  El seguro: La herramienta para que Latinoamérica salga de la pobreza
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Jürgen Klarić lo advierte: asegurar tu salud y tu vida es comprar el derecho a dormir tranquilo.
                </p>
              </div>
            </Link>
            
            <Link href="/blog" className="group rounded-[2.5rem] bg-white overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60">
              <div className="h-60 relative overflow-hidden">
                <img src="/blog_history.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Historia de los Seguros en Ecuador" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  Los orígenes: Cómo iniciaron los seguros en el Ecuador
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Desde los grandes incendios de Guayaquil hasta la actualidad, conoce la evolución de la protección.
                </p>
              </div>
            </Link>

            <Link href="/blog" className="group rounded-[2.5rem] bg-white overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60">
              <div className="h-60 relative overflow-hidden">
                <img src="/blog_advisor.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Asistencia Real en Siniestros" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22] transition-colors leading-snug">
                  Más que un papel: Cómo en DC Asesores te damos asistencia real
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Si tienes un siniestro a las 2 AM o una urgencia clínica, nuestro equipo toma el control presencial.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 SECCIÓN CONTACTO + GOOGLE MAPS OFICIAL */}
      <section id="contacto" className="py-24 sm:py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-xs uppercase mb-3 font-mono">
              Atención Personalizada
            </h4>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Visítanos o Solicita Asesoría Directa
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium mt-3">
              Estamos ubicados en el corazón corporativo y financiero de Quito, con cobertura en todo el Ecuador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Columna Izquierda: Información de Empresa & Formulario */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Tarjetas de Datos de la Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-[#e11b22] flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-mono font-black uppercase text-slate-500 mb-1">Oficina Central</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Quito, Pichincha, Ecuador
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Sector La Carolina / República de El Salvador
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-mono font-black uppercase text-slate-500 mb-1">Teléfonos de Contacto</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
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

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-mono font-black uppercase text-slate-500 mb-1">Correo Electrónico</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    <span>info</span><span className="text-[#e11b22]">&#64;</span><span>dcasesoresec.com</span>
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Respuesta en menos de 2 horas hábiles
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-mono font-black uppercase text-slate-500 mb-1">Horario Laboral</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Lunes a Viernes: 08:30 - 18:00
                  </p>
                  <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                    Emergencias & Siniestros: 24/7
                  </span>
                </div>
              </div>

              {/* Formulario de Consulta Rápida */}
              <div className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  Envíanos un mensaje
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Tu nombre completo*" 
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 transition-colors shadow-2xs" 
                      required 
                    />
                    <input 
                      type="tel" 
                      placeholder="WhatsApp o celular*" 
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 transition-colors shadow-2xs" 
                      required 
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Correo electrónico institucional o personal*" 
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 transition-colors shadow-2xs" 
                    required 
                  />
                  <textarea 
                    placeholder="¿Qué tipo de seguro deseas cotizar o qué inquietud tienes?" 
                    rows="3" 
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-[#e11b22] text-xs font-medium text-slate-800 transition-colors shadow-2xs resize-none"
                  ></textarea>
                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-[#e11b22] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Columna Derecha: Mapa de Google Maps Interactivo */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-2">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700">Ubicación Satelital DC Asesores</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Quito • Ecuador</span>
                </div>
                
                {/* Iframe provisto por el usuario */}
                <div className="w-full h-[450px] rounded-2xl overflow-hidden relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d359.5141084768887!2d-78.48699087144594!3d-0.18020313187060877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sec!4v1789947987659!5m2!1ses-419!2sec" 
                    width="100%" 
                    height="100%" 
                    className="border-0"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ubicación DC Asesores en Seguros Quito"
                  />
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
              <li><Link href="/cotizador" className="hover:text-[#e11b22] transition-colors">Cotizador Inteligente 2026</Link></li>
              <li><Link href="/servicios" className="hover:text-[#e11b22] transition-colors">Catálogo de Servicios</Link></li>
              <li><Link href="/blog" className="hover:text-[#e11b22] transition-colors">Blog de Educación Financiera</Link></li>
              <li><Link href="/#contacto" className="hover:text-[#e11b22] transition-colors">Contacto & Mapa</Link></li>
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
            <Link href="/admin" className="hover:text-slate-400 transition-colors">Acceso Privado</Link>
            <span>•</span>
            <Link href="/servicios" className="hover:text-slate-400 transition-colors">Aviso Legal</Link>
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
              'https://facebook.com/dcasesores',
              'https://instagram.com/dcasesores',
              'https://linkedin.com/company/dcasesores'
            ]
          }),
        }}
      />
    </div>
  );
}
