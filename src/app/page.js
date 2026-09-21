import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesCarousel } from '@/components/home/ServicesCarousel';
import { WhatsAppWidget } from '@/components/common/WhatsAppWidget';
import { ScrollReveal } from '@/components/common/ScrollReveal';
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

const INSURER_LOGOS = [
  { src: '/images/insurers/insurer_1.jpeg', alt: 'Aseguradora Alianza' },
  { src: '/images/insurers/insurer_2.jpeg', alt: 'Latina Seguros' },
  { src: '/images/insurers/insurer_3.jpeg', alt: 'Hispana de Seguros' },
  { src: '/images/insurers/insurer_4.jpeg', alt: 'Sweaden Seguros' },
  { src: '/images/insurers/insurer_5.jpeg', alt: 'Zurich Seguros' },
  { src: '/images/insurers/insurer_6.jpeg', alt: 'Mapfre Seguros' },
  { src: '/images/insurers/insurer_7.jpeg', alt: 'Seguros Privilegio' },
  { src: '/images/insurers/insurer_8.jpeg', alt: 'Seguros Atlántida' },
  { src: '/images/insurers/insurer_9.jpeg', alt: 'ADS Seguros' },
  { src: '/images/insurers/insurer_10.jpeg', alt: 'Vaz Seguros' },
  { src: '/images/insurers/insurer_11.jpeg', alt: 'BMI Ecuador' },
  { src: '/images/insurers/insurer_12.jpeg', alt: 'Chubb Seguros' },
  { src: '/images/insurers/insurer_13.jpeg', alt: 'Liberty Seguros' },
  { src: '/images/insurers/insurer_14.jpeg', alt: 'Bupa Seguros' },
  { src: '/images/insurers/insurer_15.jpeg', alt: 'AIG Metropolitana' },
  { src: '/images/insurers/insurer_16.jpeg', alt: 'Seguros Equinoccial' },
  { src: '/images/insurers/insurer_17.jpeg', alt: 'Confiamed' },
  { src: '/images/insurers/insurer_18.jpeg', alt: 'Pan-American Life' },
];
const INSURER_LOGOS_DOUBLED = [...INSURER_LOGOS, ...INSURER_LOGOS];

function MarqueeBrands() {
  return (
    <div className="animate-marquee flex items-center w-max">
      {INSURER_LOGOS_DOUBLED.map((brand, idx) => (
        <div key={idx} className="shrink-0 w-[170px] sm:w-[210px] flex items-center justify-center px-4 sm:px-6">
          <div className="h-14 sm:h-16 w-full flex items-center justify-center p-2 rounded-xl bg-white transition-all hover:scale-105">
            <img 
              src={brand.src} 
              alt={brand.alt}
              loading="lazy"
              className="max-h-full max-w-full object-contain filter contrast-105"
            />
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

      {/* 🔴 LUXURY HERO SECTION COMPACTA Y MAJESTUOSA CON FOTOGRAFÍA NÍTIDA (+20% DE ALTURA) */}
      <section className="relative w-full -mt-20 sm:-mt-28 min-h-[520px] sm:min-h-[570px] lg:h-[70vh] max-h-[740px] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Imagen de Fondo Responsiva con Alta Claridad que sube detrás del Navbar */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero-mobile.webp" />
            <source media="(min-width: 768px)" srcSet="/hero-desktop.webp" />
            <img 
              src="/hero-desktop.webp" 
              alt="DC Asesores en Seguros - Protección Familiar y Financiera" 
              className="w-full h-full object-cover object-center opacity-90 dark:opacity-80 transition-opacity duration-700"
            />
          </picture>
          
          {/* Degradado Cinematográfico Suave para perfecta legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20"></div>
          
          {/* Luz roja escénica (Aetherion Glow) */}
          <div className="absolute top-1/4 -right-1/4 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] bg-[#e11b22]/20 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        {/* Contenido Central del Hero con Transición Secuencial (Aetherion / Apple Feel) */}
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16">
          <ScrollReveal animation="fade-up" delay={75}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-4 sm:mb-5 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#e11b22] animate-ping"></span> 
              ASESORÍA INTEGRAL EN SEGUROS • ECUADOR
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 drop-shadow-md">
              Protege lo que más importa con el <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] via-red-500 to-amber-400">
                respaldo correcto.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-medium max-w-2xl mx-auto mb-7 sm:mb-8 leading-relaxed drop-shadow-md">
              Analizamos tus necesidades reales para diseñar soluciones personalizadas en salud, vida y patrimonio. Tu tranquilidad es nuestro contrato.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={450}>
            <div className="flex flex-row justify-center gap-3 sm:gap-4">
              <Link 
                href="/cotizador" 
                className="bg-[#e11b22] hover:bg-red-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 font-black text-xs sm:text-sm rounded-full shadow-[0_8px_30px_rgba(225,27,34,0.4)] transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Cotizar mi seguro ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/servicios" 
                className="bg-white/15 hover:bg-white/25 text-white px-5 sm:px-7 py-3.5 sm:py-4 font-bold text-xs sm:text-sm rounded-full border border-white/25 backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                Explorar Coberturas
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 🔴 1. SECCIÓN DE STATS DE ALTO IMPACTO (Métricas de Confianza) */}
      <ScrollReveal animation="fade-up" delay={150}>
        <StatsSection />
      </ScrollReveal>

      {/* 🔴 2. BANDA DE MARCAS (Blanca y nítida tanto en modo claro como oscuro) */}
      <section className="relative py-14 overflow-hidden bg-white dark:bg-white border-b border-slate-200/80 shadow-xs">
        <ScrollReveal animation="fade-up" className="container mx-auto px-6 mb-7 text-center max-w-5xl relative z-10">
          <p className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#e11b22] mb-2">
            Alianzas Estratégicas
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Respaldados por las aseguradoras <span className="text-[#e11b22]">más sólidas del mercado</span>
          </h2>
        </ScrollReveal>
        
        {/* Sombras laterales difuminadas para carrusel infinito (blanco consistente) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <ScrollReveal animation="fade-in" delay={150} className="w-full flex overflow-hidden py-2">
          <MarqueeBrands />
        </ScrollReveal>
      </section>

      {/* 🔴 3. CARRUSEL INTERMINABLE DE SERVICIOS (Estilo Vermilion / Aetherion) */}
      <ScrollReveal animation="fade-up">
        <ServicesCarousel />
      </ScrollReveal>

      {/* 🔴 4. SECCIÓN NOSOTROS (VINCULADA AL NAVBAR OFICIAL) */}
      <section id="nosotros" className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 aetherion-glow pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <ScrollReveal animation="left" className="lg:col-span-6 space-y-6">
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
            </ScrollReveal>

            <ScrollReveal animation="right" delay={200} className="lg:col-span-6 relative">
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
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 🔴 CÓMO TRABAJAMOS (Metodología Oficial DC Asesores - Estilo dcasesoresec.com) */}
      <section id="proceso" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        
        {/* Glow sutil de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 dark:bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

        <ScrollReveal animation="fade-up" className="max-w-7xl mx-auto px-4 text-center mb-16 sm:mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#e11b22] text-xs font-mono font-black uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            CÓMO TRABAJAMOS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Nuestro proceso de asesoría en seguros
          </h2>
          <div className="w-16 h-1 bg-[#e11b22] rounded-full mx-auto mt-4 mb-4"></div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Un acompañamiento profesional e integral desde el diagnóstico inicial hasta la resolución y liquidación oportuna de cualquier siniestro.
          </p>
        </ScrollReveal>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          
          {/* Línea conectora punteada para desktop */}
          <div className="hidden lg:block absolute top-[90px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-red-500/30 dark:border-red-500/20 pointer-events-none z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">
            {[
              {
                num: '01',
                img: '/images/process/paso1.png',
                title: 'Análisis de necesidades',
                desc: 'Nos reunimos contigo para comprender tu situación financiera, prioridades y riesgos actuales, realizando un diagnóstico profesional y personalizado.',
              },
              {
                num: '02',
                img: '/images/process/paso2.png',
                title: 'Diseño de solución',
                desc: 'Evaluamos las mejores opciones del mercado y estructuramos una propuesta estratégica alineada a tus objetivos de protección.',
              },
              {
                num: '03',
                img: '/images/process/paso3.png',
                title: 'Contratación y gestión',
                desc: 'Te acompañamos durante todo el proceso de contratación, explicando coberturas, condiciones y beneficios con total transparencia.',
              },
              {
                num: '04',
                img: '/images/process/paso4.png',
                title: 'Acompañamiento',
                desc: 'Brindamos seguimiento permanente y gestionamos cualquier siniestro de manera oportuna hasta su resolución final.',
              },
            ].map((step, i) => (
              <ScrollReveal 
                key={i} 
                animation="fade-up" 
                delay={i * 150}
                className="flex flex-col items-center text-center group relative hover:-translate-y-2 transition-all duration-500"
              >
                {/* Imagen Circular con Medallón Flotante */}
                <div className="relative mb-6">
                  <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 group-hover:border-[#e11b22] shadow-xl group-hover:shadow-2xl group-hover:shadow-red-600/20 transition-all duration-500 overflow-hidden">
                    <img 
                      src={step.img} 
                      alt={step.title}
                      width={195}
                      height={195}
                      className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  {/* Medallón con número rojo flotante */}
                  <div className="absolute -bottom-1 -right-1 w-11 h-11 rounded-full bg-[#e11b22] text-white font-mono font-black text-sm flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 ring-2 ring-red-100 dark:ring-red-950/50 group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                </div>

                {/* Título y Descripción */}
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2.5 group-hover:text-[#e11b22] transition-colors leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 🔴 SECCIÓN BLOG HOME */}
      <section className="py-24 sm:py-32 bg-[#f4f4f6] dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
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
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-up" delay={0}>
              <Link href="/blog" className="group rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60 dark:border-slate-800 h-full">
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
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150}>
              <Link href="/blog" className="group rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60 dark:border-slate-800 h-full">
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
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <Link href="/blog" className="group rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all block border border-slate-200/60 dark:border-slate-800 h-full">
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 🔴 SECCIÓN CONTACTO + GOOGLE MAPS (SIMÉTRICA: IZQUIERDA MAPA CON DATOS, DERECHA FORMULARIO) */}
      <section id="contacto" className="py-24 sm:py-32 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-xs uppercase mb-3 font-mono">
              Atención Personalizada
            </h4>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Visítanos o Solicita Asesoría Directa
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mt-3">
              Estamos ubicados en el corazón corporativo y financiero de Quito, con cobertura en todo el Ecuador.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* 🔴 COLUMNA IZQUIERDA: DATOS DE CONTACTO SOBRE EL MAPA (ALTURA IGUAL A LA DERECHA) */}
            <ScrollReveal animation="left" delay={100} className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              
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

            </ScrollReveal>

            {/* 🔴 COLUMNA DERECHA: FORMULARIO SOLO (CON AUTOCOMPLETADO Y ALTURA SINCRONIZADA) */}
            <ScrollReveal animation="right" delay={200} className="lg:col-span-6 flex flex-col justify-between h-full">
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
                          placeholder="Ej: Tu nombre completo" 
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
                        placeholder="Ej: nombre@empresa.com" 
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
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 🔴 FOOTER DE LUJO UNIFICADO */}
      <Footer />

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
