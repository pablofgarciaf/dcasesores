import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
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
  Award
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
  const metaDesc = `${service.shortDesc} Cotiza con respaldo directo de las 10 aseguradoras líderes en Ecuador. Asesoría 24/7.`.substring(0, 160);

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.fullDesc,
    'provider': {
      '@type': 'Organization',
      'name': 'DC Asesores en Seguros',
      'url': 'https://dcasesoresec.com',
      'telephone': '+593-99-193-8754',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Quito',
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
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-800">
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

      {/* Breadcrumb Visual */}
      <nav className="bg-slate-900 text-slate-400 py-3 px-4 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-medium truncate">{service.title}</span>
        </div>
      </nav>

      {/* Hero del Servicio */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#e11b22]/25 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            {service.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-3xl leading-relaxed mb-8">
            {service.fullDesc}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {service.slug === 'seguro-vehicular' ? (
              <Link 
                href="/cotizador"
                className="px-8 py-4 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Cotizar en Línea Ahora</span>
              </Link>
            ) : (
              <a 
                href={`https://wa.me/593991938754?text=${encodeURIComponent(`Hola DC Asesores, deseo cotizar el ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Solicitar Asesoría por WhatsApp</span>
              </a>
            )}

            <Link 
              href="/#contacto"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider border border-white/20 active:scale-95 transition-all"
            >
              Consultar Formulario
            </Link>
          </div>
        </div>
      </section>

      {/* Cápsula GEO / Direct Answer Byte 0 */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <aside className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/90">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e11b22] font-black block mb-2">
            Cápsula de Información Directa (GEO / IA)
          </span>
          <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
            {service.geoSummary}
          </p>
        </aside>
      </section>

      {/* Contenido Detallado del Servicio */}
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-16">
        
        {/* Beneficios Principales */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Award className="w-6 h-6 text-[#e11b22]" />
            Beneficios y Coberturas Estratégicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, i) => (
              <div 
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5 hover:border-[#e11b22]/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700 leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Perfil del Asegurado */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e11b22] block mb-2">
            ¿A quién va dirigido?
          </span>
          <h3 className="text-xl sm:text-2xl font-black mb-4">
            Diseñado para máxima tranquilidad financiera
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {service.target}
          </p>
        </div>

        {/* Preguntas Frecuentes (FAQs) */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#e11b22]" />
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2"
              >
                <h4 className="font-bold text-base text-slate-900">{faq.q}</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* CTA Inferior */}
      <section className="bg-white border-t border-slate-200 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-black text-slate-900">
            ¿Listo para estructurar tu {service.title}?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Obtén cotizaciones oficiales con Alianza, Latina, Hispana, Sweaden, Zurich, Mapfre y más de 10 aseguradoras aliadas.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            {service.slug === 'seguro-vehicular' ? (
              <Link 
                href="/cotizador"
                className="px-8 py-4 rounded-full bg-[#e11b22] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all"
              >
                Ir al Cotizador Vehicular
              </Link>
            ) : (
              <a 
                href={`https://wa.me/593991938754?text=${encodeURIComponent(`Hola DC Asesores, deseo una propuesta para ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#e11b22] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Chatear con un Asesor</span>
              </a>
            )}
            <Link 
              href="/servicios"
              className="px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm uppercase tracking-wider transition-colors"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
