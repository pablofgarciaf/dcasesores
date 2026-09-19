import Link from 'next/link';
import Image from 'next/image';

const BRANDS = [
  { label: 'BMI', prefix: '///', prefixColor: 'text-[#e11b22]', size: 'text-4xl' },
  { label: 'SWEADEN', prefix: '♦', prefixColor: 'text-blue-600', size: 'text-4xl' },
  { label: 'CONFIAMED', size: 'text-3xl' },
  { label: 'MAPFRE', size: 'text-4xl font-serif text-[#e11b22]' },
  { label: 'ZURICH', size: 'text-4xl text-blue-700' },
  { label: 'Redbridge.', prefix: '■', prefixColor: 'text-[#e11b22]', size: 'text-4xl font-serif' },
  { label: 'Olé', prefix: '*', prefixColor: 'text-green-500', size: 'text-4xl' },
  { label: 'ALIANZA', prefix: 'AF', prefixColor: 'text-[#e11b22]', size: 'text-4xl' },
  { label: 'PRIVILEGIO', size: 'text-3xl text-indigo-900' },
];
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS];

function MarqueeBrands() {
  return (
    <div className="animate-marquee flex items-center w-max">
      {BRANDS_DOUBLED.map((brand, idx) => (
        <div key={idx} className="shrink-0 w-[220px] md:w-[280px] flex items-center justify-center px-4">
          <div className={`font-black text-slate-800 flex items-center gap-2 ${brand.size}`}>
            {brand.prefix && <span className={brand.prefixColor}>{brand.prefix}</span>}
            {brand.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export const metadata = {
  title: 'DC Asesores en Seguros | Protección Financiera',
  description: 'Asesoría Integral en Seguros. Protege lo que más importa con el respaldo correcto.',
  icons: { icon: '/logo.ico' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] font-sans text-slate-800 relative scroll-smooth selection:bg-[#e11b22] selection:text-white">
      
      {/* 🔴 FLOTANTES (WhatsApp) */}
      <a href="https://wa.link/eukaff" target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.938-6.938 6.938z"/></svg>
      </a>

      {/* 🔴 LUXURY HEADER */}
      <header className="w-full bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <Link href="/">
            <img src="/logo.webp" alt="DC Asesores" className="h-10 md:h-12 object-contain" />
          </Link>
          <nav className="hidden md:flex gap-8 items-center font-bold text-slate-800 text-sm">
            <Link href="/" className="text-[#e11b22]">Inicio</Link>
            <Link href="#servicios" className="hover:text-[#e11b22] transition-colors">Servicios</Link>
            <Link href="#proceso" className="hover:text-[#e11b22] transition-colors">Cómo Trabajamos</Link>
            <Link href="/blog" className="hover:text-[#e11b22] transition-colors">Blog</Link>
            <Link href="#contacto" className="hover:text-[#e11b22] transition-colors">Contacto</Link>
            <Link href="/cotizador" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-[#e11b22] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
              Cotizador Inteligente
            </Link>
          </nav>
        </div>
      </header>

      {/* 🔴 LUXURY HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-26T213339.263.png" 
            alt="Hero Asesoría" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
          {/* Luz roja escénica */}
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#e11b22]/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#e11b22] animate-pulse"></span> ASESORÍA INTEGRAL EN SEGUROS
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[1.05] tracking-tight mb-8">
            Protege lo que más importa con el <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] to-orange-500">
              respaldo correcto.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Analizamos tus necesidades reales para diseñar soluciones personalizadas en salud, vida y patrimonio. Tu tranquilidad es nuestro contrato.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/cotizador" 
              className="bg-[#e11b22] hover:bg-red-600 text-white px-10 py-5 font-black text-lg rounded-full shadow-[0_10px_40px_rgba(225,27,34,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              Cotizar mi seguro ahora
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 BENTO GRID: SERVICIOS (World's Most Beautiful) */}
      <section id="servicios" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-sm uppercase mb-4">Nuestros Servicios</h4>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Coberturas Estratégicas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Bento Box 1: Médico (Large span 2 cols) */}
          <div className="md:col-span-2 rounded-[2rem] bg-white p-10 flex flex-col justify-end relative overflow-hidden group shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow border border-slate-100">
            <div className="absolute inset-0 bg-slate-950 z-0">
               <img src="https://dcasesoresec.com/wp-content/uploads/2023/03/h1-box-service-bg.jpg" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" alt="Médico" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
            <div className="relative z-20 text-white">
               <div className="w-14 h-14 bg-[#e11b22] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                 <img src="https://dcasesoresec.com/wp-content/uploads/2023/03/01-10.svg" className="w-8 h-8 filter brightness-0 invert" alt="Icon" />
               </div>
               <h3 className="text-3xl font-black mb-2">Seguro Médico Integral</h3>
               <p className="text-slate-300 font-medium max-w-md">Protección médica completa con respaldo financiero y acompañamiento profesional para ti y tu familia en todo el mundo.</p>
            </div>
          </div>

          {/* Bento Box 2: Vida Ahorro (Tall) */}
          <div className="md:row-span-2 rounded-[2rem] bg-slate-900 p-10 flex flex-col relative overflow-hidden group shadow-xl shadow-slate-200/50 border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e11b22]/20 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>
            <div className="relative z-20 h-full flex flex-col">
              <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/01-12.svg" className="w-8 h-8 filter brightness-0 invert" alt="Icon" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Seguro de Vida con Ahorro</h3>
              <p className="text-slate-400 font-medium mb-8">Construye un fondo para tu jubilación o el futuro de tus hijos, mientras garantizas la protección de tu familia en caso de imprevistos fatales.</p>
              
              <div className="mt-auto">
                 <Link href="/cotizador" className="inline-flex items-center justify-center w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-[#e11b22] hover:text-white transition-colors">
                   Cotizar ahora
                 </Link>
              </div>
            </div>
          </div>

          {/* Bento Box 3: Vehicular */}
          <div className="rounded-[2rem] bg-white p-8 flex flex-col justify-center relative overflow-hidden group shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-[#e11b22] transition-colors">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 group-hover:bg-[#e11b22]/10 rounded-xl flex items-center justify-center transition-colors">
                  <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/01-14.svg" className="w-6 h-6" alt="Icon" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Seguro Vehicular</h3>
             </div>
             <p className="text-slate-500 text-sm font-medium">Protección total contra choques, robos y daños a terceros con grúa y asistencia vial 24/7.</p>
          </div>

          {/* Bento Box 4: Patrimoniales y Empresariales */}
          <div className="rounded-[2rem] bg-[#e11b22] p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group shadow-xl shadow-red-500/20 text-white">
             <div className="absolute inset-0 bg-[url('https://dcasesoresec.com/wp-content/uploads/2023/03/about-shape1.png')] bg-repeat opacity-10"></div>
             <div className="relative z-10 flex-1">
               <h3 className="text-3xl font-black mb-3">Seguros Empresariales y Patrimoniales</h3>
               <p className="text-red-100 font-medium text-sm md:text-base">Blindamos los activos de tu empresa, tu flota de vehículos y la salud de tus empleados con pólizas corporativas diseñadas a medida.</p>
             </div>
             <div className="relative z-10">
                <a href="#contacto" className="whitespace-nowrap bg-white text-[#e11b22] font-black px-8 py-4 rounded-xl hover:bg-slate-900 hover:text-white transition-colors shadow-lg">
                  Hablar con un asesor
                </a>
             </div>
          </div>

        </div>
      </section>

      {/* 🔴 MARCAS (Estilo Original Preservado - A Color y Perfecto) */}
      <section className="relative py-20 overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-y border-slate-200/80">
        <div className="container mx-auto px-6 mb-12 text-center max-w-5xl relative z-10">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
            Respaldados por las aseguradoras <br />
            <span className="text-[#e11b22]">más sólidas del mercado</span>
          </h3>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="w-full flex overflow-hidden py-4">
          <MarqueeBrands />
        </div>
      </section>

      {/* 🔴 CÓMO TRABAJAMOS (Ultra Clean) */}
      <section id="proceso" className="py-32 bg-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 text-center mb-20">
          <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-sm uppercase mb-4">Metodología DC</h4>
          <h2 className="text-4xl md:text-5xl font-black">Nuestro proceso de asesoría</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
             {[
               { num: '01', title: 'Diagnóstico', desc: 'Analizamos tus riesgos y capacidades financieras.' },
               { num: '02', title: 'Diseño', desc: 'Estructuramos la póliza perfecta para tu necesidad.' },
               { num: '03', title: 'Contratación', desc: 'Transparencia total en cláusulas y beneficios.' },
               { num: '04', title: 'Siniestros', desc: 'Asistencia 24/7 real cuando más nos necesitas.' },
             ].map((step, i) => (
               <div key={i} className="bg-slate-900/50 backdrop-blur p-8 rounded-3xl border border-slate-800 hover:border-[#e11b22] transition-colors group">
                 <div className="text-6xl font-black text-slate-800 group-hover:text-[#e11b22] transition-colors mb-4 opacity-50">{step.num}</div>
                 <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                 <p className="text-slate-400 text-sm">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 🔴 SECCIÓN BLOG HOME (Imágenes Generadas) */}
      <section className="py-32 bg-[#f4f4f6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <div>
                <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-sm uppercase mb-4">Últimas publicaciones</h4>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900">Inteligencia Financiera</h2>
             </div>
             <Link href="/blog" className="mt-6 md:mt-0 font-bold text-slate-600 hover:text-[#e11b22] flex items-center gap-2">
               Ver todos los artículos <span>→</span>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/blog" className="group rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform block">
               <div className="h-64 relative overflow-hidden">
                 <img src="/blog_peace.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog 1" />
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22]">El seguro: La herramienta para que Latinoamérica salga de la pobreza</h3>
                 <p className="text-slate-500 font-medium">Jürgen Klarić lo advierte: asegurar tu salud y vida es comprar el derecho a dormir tranquilo.</p>
               </div>
            </Link>
            
            <Link href="/blog" className="group rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform block">
               <div className="h-64 relative overflow-hidden">
                 <img src="/blog_history.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog 2" />
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22]">Los orígenes: Cómo iniciaron los seguros en el Ecuador</h3>
                 <p className="text-slate-500 font-medium">Desde los incendios de Guayaquil hasta la actualidad, conoce la historia de protección del país.</p>
               </div>
            </Link>

            <Link href="/blog" className="group rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform block">
               <div className="h-64 relative overflow-hidden">
                 <img src="/blog_advisor.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog 3" />
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#e11b22]">Más que un papel: Cómo en DC Asesores te damos asistencia real</h3>
                 <p className="text-slate-500 font-medium">Si tienes un choque a las 2 AM, o una emergencia médica, nosotros tomamos el control.</p>
               </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔴 FORMULARIO DE CONTACTO (Ultra Modern) */}
      <section id="contacto" className="w-full flex flex-col lg:flex-row bg-white border-y border-slate-200">
        <div className="w-full lg:w-1/2 p-10 md:p-24 lg:p-32 flex flex-col justify-center">
           <h4 className="text-[#e11b22] font-black tracking-[0.2em] text-sm uppercase mb-4">SOLICITA INFORMACIÓN</h4>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-10">Protege tu futuro hoy mismo.</h2>
           
           <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nombre completo*" className="w-full bg-[#f4f4f6] border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-[#e11b22] transition-all font-medium text-slate-700" required />
                <input type="tel" placeholder="Teléfono / WhatsApp*" className="w-full bg-[#f4f4f6] border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-[#e11b22] transition-all font-medium text-slate-700" required />
              </div>
              <input type="email" placeholder="Correo electrónico*" className="w-full bg-[#f4f4f6] border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-[#e11b22] transition-all font-medium text-slate-700" required />
              <textarea placeholder="¿En qué podemos ayudarte? (Ej: Seguro Médico Familiar)" rows="4" className="w-full bg-[#f4f4f6] border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-[#e11b22] transition-all font-medium text-slate-700 resize-none"></textarea>
              
              <button type="submit" className="bg-slate-900 hover:bg-[#e11b22] text-white font-black text-lg py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full">
                Enviar Mensaje
              </button>
           </form>
        </div>
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-auto relative overflow-hidden bg-slate-100">
           <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-27T100045.195-380x380.png" className="w-full h-full object-cover absolute inset-0 mix-blend-multiply" alt="Contacto DC Asesores" />
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </section>

      {/* 🔴 FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t-4 border-[#e11b22]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src="/logo.webp" alt="DC Asesores" className="h-10 mb-8 filter grayscale brightness-200" />
            <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6">
              Asesoría integral en protección financiera para personas, familias y empresas. Acompañamos a nuestros clientes con ética y profesionalismo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black text-lg mb-6">Navegación</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link href="/" className="hover:text-[#e11b22] transition-colors">Inicio</Link></li>
              <li><Link href="#servicios" className="hover:text-[#e11b22] transition-colors">Servicios</Link></li>
              <li><Link href="/blog" className="hover:text-[#e11b22] transition-colors">Blog</Link></li>
              <li><Link href="/cotizador" className="hover:text-[#e11b22] transition-colors">Cotizador</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black text-lg mb-6">Contacto Directo</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex gap-3">
                <span className="text-[#e11b22] font-black">T.</span> 02 500 3373
              </li>
              <li className="flex gap-3">
                <span className="text-[#e11b22] font-black">W.</span> +593 99 193 8754
              </li>
              <li className="flex gap-3">
                <span className="text-[#e11b22] font-black">M.</span> 
                <span>info</span><span className="text-[#e11b22]">&#64;</span><span>dcasesoresec.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center border-t border-slate-800 pt-8">
          <p className="text-slate-600 font-bold text-xs uppercase tracking-wider">© 2026 DC Asesores en Seguros.</p>
        </div>
      </footer>

      {/* JSON-LD GEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", "name": "DC Asesores en Seguros",
        "url": "https://dcasesoresec.com", "logo": "https://dcasesoresec.com/logo.webp",
        "contactPoint": { "@type": "ContactPoint", "telephone": "+593-99-193-8754", "contactType": "customer service" }
      })}} />
    </div>
  );
}
