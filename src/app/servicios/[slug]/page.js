import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SERVICES_DATA } from '@/lib/servicesData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  Award,
  Building2,
  Users,
  Send,
  Lock,
  FileCheck
} from 'lucide-react';

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado | DC Asesores',
    };
  }

  // Título quirúrgico: 50-60 caracteres
  const rawTitle = `DC Asesores | ${service.title} Ecuador`;
  const metaTitle = rawTitle.length > 60 ? rawTitle.substring(0, 60) : rawTitle;

  // Descripción quirúrgica: 120-160 caracteres
  const metaDesc = `${service.shortDesc} Cotiza con respaldo directo de 10 aseguradoras líderes en Ecuador. Asesoría actuarial 24/7.`.substring(0, 160);

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `https://dcasesoresec.com/servicios/${service.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://dcasesoresec.com/servicios/${service.slug}`,
      siteName: 'DC Asesores en Seguros',
      locale: 'es_EC',
      type: 'article',
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES_DATA.filter((s) => s.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.fullDesc,
    'provider': {
      '@type': 'InsuranceAgency',
      'name': 'DC Asesores en Seguros',
      'url': 'https://dcasesoresec.com',
      'telephone': '+593-99-193-8754',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Quito',
        'addressRegion': 'Pichincha',
        'addressCountry': 'EC',
      },
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Ecuador',
    },
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'priceCurrency': 'USD',
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Inicio',
        'item': 'https://dcasesoresec.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Servicios',
        'item': 'https://dcasesoresec.com/servicios',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': service.title,
        'item': `https://dcasesoresec.com/servicios/${service.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      {/* Schema.org Injected */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <Navbar />

      {/* Breadcrumb Visual de Lujo */}
      <nav className="bg-slate-950/95 border-b border-slate-800/80 text-slate-400 py-3.5 px-4 text-xs sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-[#e11b22] font-semibold truncate">{service.title}</span>
        </div>
      </nav>

      {/* Hero del Servicio con Atmósfera Aetherion */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 px-4 overflow-hidden border-b border-slate-900">
        
        {/* Fotografía de Fondo con Alta Visibilidad (Imagen nítida y reconocible) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={service.imageUrl || '/services-hero.webp'} 
            alt={service.title} 
            className="w-full h-full object-cover object-center opacity-95 dark:opacity-85 transition-opacity duration-700"
          />
          {/* Degradado Cinematográfico Suave que no ahoga la fotografía */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/20 lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
          
          {/* Orbe Ruby Aetherion */}
          <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-[#e11b22]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Columna Izquierda: Encabezado y Propuesta de Valor */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#e11b22] animate-pulse" />
                {service.badge}
              </div>

              {service.headline && (
                <p className="text-red-400 font-extrabold text-sm sm:text-base uppercase tracking-wider">
                  {service.headline}
                </p>
              )}

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                {service.fullDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                {service.slug === 'seguro-vehicular' ? (
                  <Link 
                    href="/cotizador"
                    className="px-8 py-4.5 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_10px_35px_rgba(225,27,34,0.4)] active:scale-95 transition-all flex items-center gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cotizar en Línea Ahora</span>
                  </Link>
                ) : (
                  <a 
                    href={`https://wa.me/593991938754?text=${encodeURIComponent(`Hola DC Asesores, deseo asesoría y cotización formal del servicio: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4.5 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_10px_35px_rgba(225,27,34,0.4)] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Solicitar Asesoría por WhatsApp</span>
                  </a>
                )}

                <Link 
                  href="/#contacto"
                  className="px-8 py-4.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/25 backdrop-blur-md active:scale-95 transition-all"
                >
                  Agendar Cita en Oficina
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Aetherion Glass con Métricas & Respaldo */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] p-7 sm:p-8 bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#e11b22]/10 rounded-full blur-2xl group-hover:bg-[#e11b22]/20 transition-all duration-500" />

                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#e11b22] flex items-center justify-center font-black text-white shadow-lg shadow-red-900/40">
                      DC
                    </div>
                    <div>
                      <span className="text-sm font-black text-white block">Garantía DC Asesores</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Superintendencia de Cías.</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
                    Vigente 2026
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Independencia de Tarifa</h4>
                      <p className="text-xs text-slate-400">Comparamos entre 10+ aseguradoras aliadas sin sobreprecios.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#e11b22] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Acompañamiento In Situ 24/7</h4>
                      <p className="text-xs text-slate-400">Presencia técnica y jurídica cuando ocurre el siniestro.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Consultor Actuarial Senior</h4>
                      <p className="text-xs text-slate-400">Liderado por Diego Carpio G., con más de 15 años de trayectoria.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Atención telefónica directa:</span>
                  <a href="tel:025003373" className="font-mono font-bold text-white hover:text-[#e11b22] transition-colors">
                    02 500 3373
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cápsula GEO / Direct Answer Byte 0 */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <aside className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-200/90 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e11b22] animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e11b22] font-black block">
              Resumen GEO / IA
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
          <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed flex-1">
            {service.geoSummary}
          </p>
        </aside>
      </section>

      {/* Contenido Principal en 2 Columnas de Lujo (Aetherion Structure) */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 🔴 COLUMNA IZQUIERDA: COBERTURAS, BENEFICIOS Y FAQS */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Bloque 1: Beneficios & Coberturas Específicas */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-[#e11b22] to-transparent" />
                <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#e11b22]">
                  Coberturas Incluidas
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Qué contempla este programa de protección
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Todas nuestras pólizas se estructuran bajo condiciones particulares y generales avaladas legalmente, brindándote certidumbre ante cualquier evento imprevisto.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {service.benefits.map((benefit, i) => (
                  <div 
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-3.5 hover:border-[#e11b22]/50 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-950/60 text-[#e11b22] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloque 1.1: Ventajas Oficiales del Servicio (Si están especificadas) */}
            {service.ventajas && service.ventajas.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-[#e11b22] to-transparent" />
                  <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#e11b22]">
                    {service.ventajasSectionTitle || 'Ventajas del Servicio'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {service.ventajasSectionSubtitle || 'Beneficios que protegen tu salud y tu estabilidad'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {service.ventajas.map((v, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-[#e11b22]/50 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-red-500/10 text-[#e11b22] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-[#e11b22] transition-colors">
                          {v.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed pl-9">
                        {v.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bloque 1.2: Cobertura Detallada del Plan (Si está especificada) */}
            {service.coberturaPlan && service.coberturaPlan.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-[#e11b22] to-transparent" />
                  <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#e11b22]">
                    {service.coberturaSectionTitle || 'Cobertura del Plan'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {service.coberturaSectionSubtitle || 'Protección completa para cada necesidad'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {service.coberturaPlan.map((c, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-[#e11b22]/50 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-[#e11b22] transition-colors">
                          {c.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed pl-9">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bloque 2: ¿A quién está dirigido? (Aetherion Card) */}
            <div className="p-8 sm:p-10 rounded-[32px] bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/15 transition-all duration-700" />
              
              <div className="relative z-10 max-w-2xl space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#e11b22]">
                  Perfil Recomendado
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  ¿Es esta solución adecuada para ti o tu empresa?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium pt-1">
                  {service.target}
                </p>
              </div>
            </div>

            {/* Bloque 3: Preguntas Frecuentes */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-[#e11b22] to-transparent" />
                <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-[#e11b22]">
                  Resolución de Dudas
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Preguntas Frecuentes sobre {service.title}
              </h2>

              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-4 h-4 text-[#e11b22] shrink-0 mt-1" />
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {faq.q}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-7 leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 🔴 COLUMNA DERECHA: SIDEBAR STICKY CON ASESORÍA DIRECTA */}
          <aside className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            
            {/* Formulario / CTA de Consulta Express */}
            <div className="p-7 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/50 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#e11b22]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atención Personalizada</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Solicita una cotización a medida
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Sin ningún compromiso de compra. Te enviamos la comparativa de mercado con las mejores aseguradoras en menos de 2 horas.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/593991938754?text=${encodeURIComponent(`Hola DC Asesores, deseo una cotización detallada de ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-[#e11b22] hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Hablar por WhatsApp</span>
                </a>

                <Link
                  href="/#contacto"
                  className="w-full py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Llenar Formulario Web</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Horario de atención: 08:30 - 18:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Confidencialidad de datos garantizada</span>
                </div>
              </div>
            </div>

            {/* Banner de Otras Coberturas */}
            <div className="p-6 rounded-[28px] bg-slate-100 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Otros Ramos Disponibles
              </h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                {otherServices.map((other) => (
                  <li key={other.slug}>
                    <Link 
                      href={`/servicios/${other.slug}`}
                      className="text-slate-700 dark:text-slate-300 hover:text-[#e11b22] dark:hover:text-[#e11b22] flex items-center justify-between py-1 transition-colors"
                    >
                      <span>{other.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>
      </section>

      {/* Footer Final */}
      <Footer />
    </div>
  );
}
