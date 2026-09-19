import Link from 'next/link';

export const metadata = {
  title: 'DC Asesores en Seguros',
  description: 'Asesoría Integral en Seguros. Protege lo que más importa con el respaldo correcto.',
  icons: { icon: '/logo.ico' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative scroll-smooth">
      
      {/* 🔴 FLOTANTES (WhatsApp y Scroll Top) */}
      <a href="https://wa.link/eukaff" target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.938-6.938 6.938z"/></svg>
      </a>
      <a href="#" className="fixed bottom-6 right-6 z-50 bg-[#e11b22] text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </a>

      {/* 🔴 HEADER CORPORATIVO (Clon exacto) */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
          <Link href="/">
            <img src="/logo.webp" alt="DC Asesores" className="h-14 object-contain" />
          </Link>
          <nav className="hidden md:flex gap-8 items-center font-medium text-slate-700 text-sm">
            <Link href="/" className="text-[#e11b22]">Inicio</Link>
            <Link href="#nosotros" className="hover:text-[#e11b22] transition-colors">Nosotros</Link>
            <Link href="#servicios" className="flex items-center gap-1 hover:text-[#e11b22] transition-colors">
              Servicios <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </Link>
            <Link href="/cotizador" className="flex items-center gap-1 hover:text-[#e11b22] transition-colors">
              Cotizador <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </Link>
            <Link href="#contacto" className="hover:text-[#e11b22] transition-colors">Contacto</Link>
            <Link href="#terminos" className="flex items-center gap-1 hover:text-[#e11b22] transition-colors">
              Términos y condiciones <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </Link>
          </nav>
          <div className="bg-[#e11b22] text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-red-700 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
          </div>
        </div>
      </header>

      {/* 🔴 HERO SECTION (Diseño fotográfico de lado a lado) */}
      <section className="relative w-full h-auto min-h-[500px] md:h-[600px] bg-[#f9f9fb] flex items-center overflow-hidden">
        {/* Imagen de fondo en el lado derecho */}
        <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 opacity-20 md:opacity-100">
          <img 
            src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-26T213339.263.png" 
            alt="Hero Asesoría" 
            className="w-full h-full object-cover object-left"
          />
        </div>

        {/* Controles del slider decorativos */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 cursor-pointer hover:bg-slate-50 text-red-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 cursor-pointer hover:bg-slate-50 text-red-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>

        <div className="max-w-7xl mx-auto w-full px-16 relative z-10">
          <div className="w-full md:w-1/2 bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-2xl">
            <h5 className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-200"></span> ASESORÍA INTEGRAL EN SEGUROS
            </h5>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-[1.1] mb-6">
              Protege lo que más importa con el <span className="text-[#e11b22]">respaldo correcto</span>
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              En DC Asesores analizamos tus necesidades reales para diseñar soluciones personalizadas en salud, vida y patrimonio. Te acompañamos antes, durante y después de la contratación, garantizando tranquilidad y respaldo financiero en cada etapa de tu vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/cotizador" 
                className="bg-[#e11b22] text-white px-8 py-4 font-bold rounded shadow-lg hover:bg-red-700 transition-colors"
              >
                Cotizar mi seguro ahora
              </Link>
              <a 
                href="https://wa.link/eukaff" 
                className="bg-slate-800 text-white px-8 py-4 font-bold rounded shadow-lg hover:bg-black transition-colors text-center"
              >
                Solicitar asesoría
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 🔴 SOBRE NOSOTROS (Composición Fotográfica Compleja) */}
      <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Lado Izquierdo: Composición de imágenes */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
            {/* Fondo Rojo */}
            <div className="absolute top-10 left-0 w-[70%] h-[80%] bg-[#e11b22] rounded-tr-[80px] rounded-bl-[40px] z-0"></div>
            
            {/* Patrón de Puntos (Simulado con CSS para evitar error 404 del recurso externo, exacto visualmente) */}
            <div className="absolute top-0 right-10 w-48 h-48 bg-[radial-gradient(#e11b22_3px,transparent_3px)] [background-size:16px_16px] opacity-40 z-0"></div>
            
            {/* Foto principal */}
            <img 
              src="https://dcasesoresec.com/wp-content/uploads/2023/03/Diseno-sin-titulo-2026-02-27T082522.267-380x380.png" 
              alt="Asesor DC Seguros" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] md:w-[65%] h-auto object-cover shadow-2xl z-10 border-8 border-white"
            />
            
            {/* Badge de 10 Años Flotante */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#e11b22] text-white p-6 text-center shadow-2xl z-20 min-w-[140px]">
              <span className="block text-5xl font-black mb-1 leading-none">10</span>
              <span className="block text-xs font-semibold uppercase tracking-wider">Años de<br/>Experiencia</span>
            </div>
          </div>

          {/* Lado Derecho: Textos e Íconos */}
          <div className="w-full lg:w-1/2">
            <h4 className="text-[#e11b22] font-semibold tracking-widest text-sm uppercase mb-4">SOBRE DC ASESORES EN SEGUROS</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">Protección estratégica con acompañamiento real</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              En DC Asesores brindamos asesoría integral en seguros con un enfoque personalizado y profesional. Analizamos las necesidades reales de cada cliente para diseñar soluciones en salud, vida y patrimonio que garanticen estabilidad financiera y tranquilidad a largo plazo. Nuestro compromiso va más allá de la contratación: acompañamos cada proceso con ética, cercanía y responsabilidad.
            </p>
            
            {/* Bullets con doble flecha roja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 p-6 bg-red-50/50 rounded-lg mb-8">
              {[
                'Asesoría personalizada', 'Gestión de siniestros', 
                'Protección financiera real', 'Transparencia y ética',
                'Acompañamiento total', 'Soluciones a medida'
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                  <span className="text-[#e11b22] font-black text-lg leading-none">»</span> {item}
                </div>
              ))}
            </div>
            
            {/* Teléfono Contacto */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-md">
                 <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-26T215428.014-90x90.png" alt="Asesora" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">¿Necesitas asesoría personalizada?</p>
                <a href="https://wa.link/eukaff" className="text-2xl font-bold text-slate-800 hover:text-red-600 transition-colors">+593 99 193 8754</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔴 SERVICIOS (Tarjetas con Hover oscuro e imágenes de fondo) */}
      <section id="servicios" className="py-24 bg-[#f9f9fb] relative">
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <h4 className="text-[#e11b22] font-semibold tracking-[0.2em] text-sm uppercase mb-4">SERVICIOS DE ASESORIA EN SEGUROS</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">Coberturas estratégicas para personas, familias y empresas</h2>
          <div className="w-20 h-1 bg-[#e11b22] mx-auto mt-6"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Seguro Médico Integral', icon: 'https://dcasesoresec.com/wp-content/uploads/2023/03/01-10.svg', desc: 'Protección médica completa con respaldo financiero y acompañamiento profesional.' },
            { title: 'Seguro de Vida con Ahorro', icon: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-12.svg', desc: 'Respaldo financiero con ahorro planificado para tu tranquilidad futura duradera.' },
            { title: 'Seguro de Vida Tradicional', icon: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-13.svg', desc: 'Respaldo financiero inmediato para proteger la estabilidad económica familiar.' },
            { title: 'Seguro Vehicular', icon: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-14.svg', desc: 'Protección integral para tu vehículo con respaldo financiero seguro.' },
            { title: 'Seguros Patrimoniales', icon: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-15.svg', desc: 'Protección financiera integral para resguardar tus bienes y patrimonio.' },
            { title: 'Seguros Empresariales', icon: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-16.svg', desc: 'Protección financiera estratégica para empresas y equipos de trabajo.' }
          ].map((srv, idx) => (
            <div key={idx} className="group relative bg-white p-10 border-b-4 border-transparent hover:border-[#e11b22] transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden cursor-pointer">
              
              {/* Imagen y overlay oscuro en HOVER */}
              <div className="absolute inset-0 bg-[url('https://dcasesoresec.com/wp-content/uploads/2023/03/h1-box-service-bg.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="absolute inset-0 bg-slate-900/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              
              {/* Contenido de la Tarjeta */}
              <div className="relative z-20 flex flex-col h-full">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 transform transition-transform group-hover:-translate-y-2 border border-slate-100">
                  <img src={srv.icon} alt={srv.title} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#e11b22] transition-colors">{srv.title}</h3>
                <p className="text-slate-500 mb-8 group-hover:text-slate-300 transition-colors">{srv.desc}</p>
                <div className="mt-auto flex items-center gap-3 text-slate-600 font-semibold group-hover:text-[#e11b22] transition-colors">
                  <span className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#e11b22] group-hover:bg-[#e11b22] group-hover:text-white transition-all">
                    →
                  </span>
                  Más Información
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔴 MARCAS (Estilo EnergyEngine, A Color, Sin cortes) */}
      <section id="marcas" className="relative py-14 overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-y border-slate-200/80">
        <div className="container mx-auto px-6 mb-10 text-center max-w-5xl relative z-10">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-none uppercase">
            Empresas aliadas <br />
            <span className="text-[#e11b22]">con las que trabajamos</span>
          </h3>
          <p className="mt-4 text-sm md:text-base text-slate-600 font-semibold max-w-2xl mx-auto leading-relaxed">
            La confianza de nuestros clientes está respaldada por las aseguradoras más sólidas y prestigiosas de Ecuador y el mundo.
          </p>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="w-full flex overflow-hidden py-6">
          <div className="animate-marquee flex items-center w-max">
            {[
              <div className="text-4xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">///</span> BMI</div>,
              <div className="text-4xl font-black text-slate-800"><span className="text-blue-600 text-5xl leading-none mr-1">♦</span> SWEADEN</div>,
              <div className="text-3xl font-black text-slate-800 tracking-tighter">CONFIAMED</div>,
              <div className="text-4xl font-serif font-black text-red-600">MAPFRE</div>,
              <div className="text-4xl font-black text-blue-700">ZURICH</div>,
              <div className="text-4xl font-serif font-black text-slate-800"><span className="text-red-600">■</span> Redbridge.</div>,
              <div className="text-4xl font-black text-slate-800 flex items-center gap-1"><span className="text-green-500 text-5xl">*</span> Olé</div>,
              <div className="text-5xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">AF</span> <span className="text-slate-300">|||</span></div>,
              <div className="text-3xl font-black text-indigo-900 tracking-wider">PRIVILEGIO</div>,
              <div className="text-4xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">///</span> BMI</div>,
              <div className="text-4xl font-black text-slate-800"><span className="text-blue-600 text-5xl leading-none mr-1">♦</span> SWEADEN</div>,
              <div className="text-3xl font-black text-slate-800 tracking-tighter">CONFIAMED</div>,
              <div className="text-4xl font-serif font-black text-red-600">MAPFRE</div>,
              <div className="text-4xl font-black text-blue-700">ZURICH</div>,
              <div className="text-4xl font-serif font-black text-slate-800"><span className="text-red-600">■</span> Redbridge.</div>,
              <div className="text-4xl font-black text-slate-800 flex items-center gap-1"><span className="text-green-500 text-5xl">*</span> Olé</div>,
              <div className="text-5xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">AF</span> <span className="text-slate-300">|||</span></div>,
              <div className="text-3xl font-black text-indigo-900 tracking-wider">PRIVILEGIO</div>
            ].map((brand, idx) => (
              <div key={idx} className="shrink-0 w-[220px] md:w-[280px] flex items-center justify-center px-4">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔴 CÓMO TRABAJAMOS (El flujo de 4 pasos circulares) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h4 className="text-[#e11b22] font-semibold tracking-widest text-sm uppercase mb-3">CÓMO TRABAJAMOS</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Nuestro proceso de asesoría en seguros</h2>
          <div className="w-20 h-1 bg-[#e11b22] mx-auto mt-6"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative mt-20">
           {/* The dashed line (Desktop only) */}
           <div className="hidden md:block absolute top-[90px] left-[10%] w-[80%] border-t-[3px] border-dashed border-slate-300 z-0"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
             {[
               { num: '01', title: 'Análisis de necesidades', desc: 'Nos reunimos contigo para comprender tu situación financiera, prioridades y riesgos actuales, realizando un diagnóstico profesional y personalizado.', img: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-8-195x195.png' },
               { num: '02', title: 'Diseño de solución', desc: 'Evaluamos las mejores opciones del mercado y estructuramos una propuesta estratégica alineada a tus objetivos de protección.', img: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-9-195x195.png' },
               { num: '03', title: 'Contratación y gestión', desc: 'Te acompañamos durante todo el proceso de contratación, explicando coberturas, condiciones y beneficios con total transparencia.', img: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-10-195x195.png' },
               { num: '04', title: 'Acompañamiento', desc: 'Brindamos seguimiento permanente y gestionamos cualquier siniestro de manera oportuna hasta su resolución final.', img: 'https://dcasesoresec.com/wp-content/uploads/2026/02/01-11-195x195.png' },
             ].map((step, i) => (
               <div key={i} className="flex flex-col items-center text-center group">
                 <div className="relative mb-8">
                   <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-2xl border-4 border-white transform transition-transform group-hover:scale-105">
                      <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute top-2 -left-2 bg-[#e11b22] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
                     {step.num}
                   </div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed px-2">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 🔴 FORMULARIO DE CONTACTO */}
      <section id="contacto" className="w-full flex flex-col md:flex-row bg-[#f9f9fb] border-y border-slate-200">
        <div className="w-full md:w-1/2 min-h-[400px] bg-slate-200 relative overflow-hidden">
           {/* Imagen de fondo representativa (apretón de manos o póliza) */}
           <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-26T213533.380.png" className="w-full h-full object-cover absolute inset-0" alt="Contacto DC Asesores" />
           <div className="absolute inset-0 bg-[#e11b22]/70 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-slate-900/30"></div>
           
           <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
              <svg className="w-16 h-16 mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              <h3 className="text-3xl font-bold mb-4">Estamos aquí para ayudarte</h3>
              <p className="text-lg font-medium opacity-90 max-w-sm">Déjanos tus datos y un asesor especializado se comunicará contigo a la brevedad.</p>
           </div>
        </div>
        
        <div className="w-full md:w-1/2 p-10 md:p-20 bg-white">
           <h4 className="text-[#e11b22] font-semibold tracking-widest text-sm uppercase mb-3">SOLICITA INFORMACIÓN</h4>
           <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-10">Hablemos sobre la protección que necesitas</h2>
           
           <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nombre completo*" className="w-full bg-white border border-slate-300 rounded p-4 outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] shadow-sm transition-all" required />
                <input type="tel" placeholder="Teléfono / WhatsApp*" className="w-full bg-white border border-slate-300 rounded p-4 outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] shadow-sm transition-all" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="email" placeholder="Correo electrónico*" className="w-full bg-white border border-slate-300 rounded p-4 outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] shadow-sm transition-all" required />
                <input type="text" placeholder="Servicio de interés (Ej: Seguro Médico)" className="w-full bg-white border border-slate-300 rounded p-4 outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] shadow-sm transition-all" />
              </div>
              <textarea placeholder="Cuéntanos qué tipo de protección necesitas..." rows="4" className="w-full bg-white border border-slate-300 rounded p-4 outline-none focus:border-[#e11b22] focus:ring-1 focus:ring-[#e11b22] shadow-sm transition-all resize-none"></textarea>
              
              <button type="submit" className="bg-slate-800 hover:bg-[#e11b22] text-white font-bold py-4 px-10 rounded transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto">
                Solicitar asesoría
              </button>
           </form>
        </div>
      </section>

      {/* 🔴 FOOTER CON OFUSCACIÓN DE CORREOS PARA SEGURIDAD (Agente Arquitectura) */}
      <footer className="bg-slate-900 pt-20 pb-10 border-t-4 border-[#e11b22]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Nosotros</h4>
            <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6">
              En DC Asesores en Seguros brindamos asesoría integral en protección financiera para personas, familias y empresas. Analizamos cada necesidad de forma personalizada y acompañamos a nuestros clientes con ética, compromiso y profesionalismo en cada etapa de su vida.
            </p>
            <div className="flex gap-4">
               {/* Redes sociales */}
               <a href="#" className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-white hover:bg-[#e11b22] transition-colors shadow-lg">
                 f
               </a>
               <a href="#" className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-white hover:bg-[#e11b22] transition-colors shadow-lg">
                 in
               </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Sitio Web</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link href="/" className="hover:text-[#e11b22] flex items-center gap-2"><span className="text-[#e11b22]">»</span> Inicio</Link></li>
              <li><Link href="#nosotros" className="hover:text-[#e11b22] flex items-center gap-2"><span className="text-[#e11b22]">»</span> Nosotros</Link></li>
              <li><Link href="#servicios" className="hover:text-[#e11b22] flex items-center gap-2"><span className="text-[#e11b22]">»</span> Servicios</Link></li>
              <li><Link href="/blog" className="hover:text-[#e11b22] flex items-center gap-2"><span className="text-[#e11b22]">»</span> Blog</Link></li>
              <li><Link href="/cotizador" className="hover:text-[#e11b22] flex items-center gap-2"><span className="text-[#e11b22]">»</span> Cotizador</Link></li>
              <li><Link href="#contacto" className="hover:text-[#e11b22] flex items-center gap-2"><span className="text-[#e11b22]">»</span> Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Contáctanos</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-[#e11b22] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                02 500 3373
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-[#e11b22] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/></svg>
                +593 99 193 8754
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-[#e11b22] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {/* Obfuscación de correo para evitar scrapers de spam (Regla Agente Arquitectura) */}
                <span>info</span><span className="text-[#e11b22]">&#64;</span><span>dcasesoresec.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center border-t border-slate-800 pt-8">
          <p className="text-slate-500 font-medium text-sm">© 2026 DC Asesores en Seguros. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* 🤖 INYECCIÓN DE JSON-LD PARA GOOGLE Y AI OVERVIEWS (Regla GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DC Asesores en Seguros",
            "url": "https://dcasesoresec.com",
            "logo": "https://dcasesoresec.com/logo.webp",
            "description": "Asesoría integral en seguros, salud, vida, patrimoniales y vehiculares en Ecuador.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+593-99-193-8754",
              "contactType": "customer service",
              "areaServed": "EC",
              "availableLanguage": "es"
            },
            "sameAs": [
              "https://www.facebook.com/dcasesoresec",
              "https://www.linkedin.com/company/dcasesoresec"
            ]
          })
        }}
      />
    </div>
  );
}
