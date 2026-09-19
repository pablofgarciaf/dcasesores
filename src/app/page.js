import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'DC Asesores en Seguros | Cotizador Inteligente',
  description: 'Asesoría Integral en Seguros. Protege lo que más importa con el respaldo correcto.',
  icons: {
    icon: '/logo.ico',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafbfc] selection:bg-red-600 selection:text-white font-sans overflow-hidden">
      
      {/* 📞 Top Contact Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs font-medium py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href="mailto:info@dcasesoresec.com" className="hover:text-white flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              info@dcasesoresec.com
            </a>
            <a href="tel:+593025003373" className="hover:text-white flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              02 500 3373
            </a>
          </div>
          <a href="https://wa.me/593991938754" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2 text-green-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.938-6.938 6.938z"/></svg>
            +593 99 193 8754
          </a>
        </div>
      </div>

      {/* 🚀 Sticky Navbar */}
      <div className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-[130px] h-[40px]">
              <Image 
                src="/logo.webp" 
                alt="DC Asesores" 
                fill
                className="object-contain"
                priority 
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-bold text-red-600">Inicio</Link>
            <Link href="#nosotros" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Nosotros</Link>
            <Link href="#servicios" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Servicios</Link>
            <Link href="#contacto" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Contacto</Link>
            
            <Link 
              href="/cotizador" 
              className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95 flex items-center gap-2"
            >
              Cotizador
            </Link>
          </div>
        </nav>
      </div>

      {/* 🏆 Hero Section */}
      <main className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-400/20 mix-blend-multiply filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-300/20 mix-blend-multiply filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Asesoría Integral en Seguros
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
            Protección Financiera <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
              Inteligente.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Convierte los imprevistos en tranquilidad. Te ayudamos a elegir seguros estratégicos que protejan tu salud, tu familia, tu empresa y tu patrimonio.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              href="/cotizador" 
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group"
            >
              Cotizar mi seguro ahora
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            <a 
              href="https://wa.link/eukaff" 
              target="_blank" rel="noreferrer"
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg shadow-sm transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Hablar con un asesor
            </a>
          </div>
        </div>
      </main>

      {/* 🚀 EnergyEngine Style Brands Marquee */}
      <section id="marcas" className="relative py-14 overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-y border-slate-200/80">
        <div className="container mx-auto px-6 mb-10 text-center max-w-5xl relative z-10">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tighter leading-none uppercase">
            Empresas aliadas <br />
            <span className="text-red-600">con las que trabajamos</span>
          </h3>
          <p className="mt-4 text-sm md:text-base text-slate-600 font-semibold max-w-2xl mx-auto leading-relaxed">
            La confianza de nuestros clientes está respaldada por las aseguradoras más sólidas y prestigiosas de Ecuador y el mundo.
          </p>
        </div>

        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="w-[200%] flex overflow-hidden group py-6">
          <div className="animate-marquee flex items-center space-x-16 sm:space-x-32 px-8 w-1/2 justify-around grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
            <div className="text-4xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">///</span> BMI</div>
            <div className="text-4xl font-black text-slate-800"><span className="text-blue-600 text-5xl leading-none mr-1">♦</span> SWEADEN</div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter">CONFIAMED</div>
            <div className="text-4xl font-serif font-black text-red-600">MAPFRE</div>
            <div className="text-4xl font-black text-blue-700">ZURICH</div>
            <div className="text-4xl font-serif font-black text-slate-800"><span className="text-red-600">■</span> Redbridge.</div>
            <div className="text-4xl font-black text-slate-800 flex items-center gap-1"><span className="text-green-500 text-5xl">*</span> Olé</div>
            <div className="text-5xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">AF</span> <span className="text-slate-300">|||</span></div>
            <div className="text-3xl font-black text-indigo-900 tracking-wider">PRIVILEGIO</div>
          </div>
          
          <div className="animate-marquee flex items-center space-x-16 sm:space-x-32 px-8 w-1/2 justify-around grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
            <div className="text-4xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">///</span> BMI</div>
            <div className="text-4xl font-black text-slate-800"><span className="text-blue-600 text-5xl leading-none mr-1">♦</span> SWEADEN</div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter">CONFIAMED</div>
            <div className="text-4xl font-serif font-black text-red-600">MAPFRE</div>
            <div className="text-4xl font-black text-blue-700">ZURICH</div>
            <div className="text-4xl font-serif font-black text-slate-800"><span className="text-red-600">■</span> Redbridge.</div>
            <div className="text-4xl font-black text-slate-800 flex items-center gap-1"><span className="text-green-500 text-5xl">*</span> Olé</div>
            <div className="text-5xl font-black text-slate-800 flex items-center gap-2"><span className="text-red-600">AF</span> <span className="text-slate-300">|||</span></div>
            <div className="text-3xl font-black text-indigo-900 tracking-wider">PRIVILEGIO</div>
          </div>
        </div>
      </section>

      {/* 🏢 Sobre Nosotros */}
      <section id="nosotros" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h4 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">10 Años de Experiencia</h4>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Sobre DC Asesores en Seguros</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
              Protección estratégica con acompañamiento real. En DC Asesores brindamos asesoría integral en seguros con un enfoque personalizado y profesional. Analizamos las necesidades reales de cada cliente para diseñar soluciones en salud, vida y patrimonio que garanticen estabilidad financiera y tranquilidad a largo plazo.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Nuestro compromiso va más allá de la contratación: acompañamos cada proceso con ética, cercanía y responsabilidad.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Asesoría personalizada', 'Protección financiera real', 'Acompañamiento total', 'Gestión de siniestros', 'Transparencia y ética', 'Soluciones a medida'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="font-bold text-slate-800 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500 to-orange-400 rounded-3xl transform rotate-3 scale-105 -z-10 opacity-20"></div>
            <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center transform translate-y-8 border border-slate-100">
              <h3 className="text-5xl font-black text-slate-900 mb-2">+500</h3>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Clientes protegidos</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center text-white border border-slate-800">
              <h3 className="text-5xl font-black text-red-500 mb-2">99%</h3>
              <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">Resoluciones efectivas</p>
            </div>
            <div className="bg-red-600 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center text-white border border-red-500">
              <h3 className="text-5xl font-black mb-2">+1200</h3>
              <p className="text-red-200 font-bold uppercase tracking-wider text-xs">Asesorías realizadas</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center transform -translate-y-8 border border-slate-100">
              <h3 className="text-5xl font-black text-slate-900 mb-2">+80</h3>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Empresas asesoradas</p>
            </div>
          </div>
        </div>
      </section>

      {/* 💼 Servicios Section */}
      <section id="servicios" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Nuestros Servicios</h4>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Coberturas estratégicas para personas, familias y empresas</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Seguro Médico Integral', desc: 'Protección médica completa con respaldo financiero y acompañamiento profesional.' },
              { title: 'Seguro de Vida con Ahorro', desc: 'Respaldo financiero con ahorro planificado para tu tranquilidad futura duradera.' },
              { title: 'Seguro de Vida Tradicional', desc: 'Respaldo financiero inmediato para proteger la estabilidad económica familiar.' },
              { title: 'Seguro Vehicular', desc: 'Protección integral para tu vehículo con respaldo financiero seguro.' },
              { title: 'Seguros Patrimoniales', desc: 'Protección financiera integral para resguardar tus bienes y patrimonio.' },
              { title: 'Seguros Empresariales', desc: 'Protección financiera estratégica para empresas y equipos de trabajo.' },
              { title: 'Asesoría de Siniestros', desc: 'Acompañamiento profesional para resolver siniestros con respaldo oportuno.' }
            ].map((srv, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-red-200 bg-slate-50 hover:bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-200 group-hover:bg-red-100 text-slate-600 group-hover:text-red-600 flex items-center justify-center mb-6 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
                <p className="text-slate-500 mb-6">{srv.desc}</p>
                <a href="https://wa.link/eukaff" target="_blank" rel="noreferrer" className="text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Más Información <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔄 Proceso */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">Cómo Trabajamos</h4>
            <h2 className="text-4xl font-black text-slate-900">Nuestro proceso de asesoría</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Análisis de necesidades', desc: 'Comprendemos tu situación financiera, prioridades y riesgos actuales mediante un diagnóstico.' },
              { num: '02', title: 'Diseño de solución', desc: 'Evaluamos las mejores opciones del mercado y estructuramos una propuesta estratégica.' },
              { num: '03', title: 'Contratación y gestión', desc: 'Te acompañamos durante la contratación, explicando coberturas y beneficios con transparencia.' },
              { num: '04', title: 'Acompañamiento', desc: 'Brindamos seguimiento permanente y gestionamos cualquier siniestro de manera oportuna.' }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-black text-slate-200 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🗣️ Testimonios */}
      <section className="py-24 bg-white border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">La confianza de nuestros clientes es nuestro mejor respaldo</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 snap-x">
          {[
            { text: "Lo que más valoro es el acompañamiento después de contratar. Cuando se presentó un siniestro, no tuve que preocuparme por trámites complicados. Ellos gestionaron todo con responsabilidad.", author: "Jorge Paredes", role: "Empresario" },
            { text: "Buscaba un seguro de vida con ahorro que realmente se adapte a mis objetivos financieros. En DC Asesores entendieron mi situación y me presentaron una solución clara.", author: "Andrea Molina", role: "Consultora Financiera" },
            { text: "Contraté mi seguro vehicular con ellos y la experiencia fue excelente. Me explicaron cada cobertura con transparencia y cuando necesité asesoría, respondieron de inmediato.", author: "Luis Cárdenas", role: "Ingeniero Civil" },
            { text: "DC Asesores no solo me ayudó a elegir el seguro adecuado para mi familia, sino que me acompañó en todo momento. Me sentí respaldado desde el primer día.", author: "Carlos Andrade", role: "Gerente Comercial" }
          ].map((testimonial, i) => (
            <div key={i} className="min-w-[320px] max-w-[400px] shrink-0 bg-slate-50 p-8 rounded-3xl border border-slate-100 snap-center">
              <div className="text-red-500 mb-4 flex gap-1">
                {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
              </div>
              <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{testimonial.author}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Protege tu estabilidad financiera hoy.</h2>
          <p className="text-xl text-slate-300 mb-10">Cotiza de manera inteligente, rápida y 100% digital, o habla con nuestros expertos.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/cotizador" 
              className="inline-flex bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-1 active:scale-95 items-center justify-center gap-3"
            >
              Cotizar Seguro Vehicular
            </Link>
            <a 
              href="https://wa.link/eukaff" target="_blank" rel="noreferrer"
              className="inline-flex bg-white hover:bg-slate-100 text-slate-900 px-10 py-5 rounded-full font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 items-center justify-center gap-3"
            >
              Recibir Asesoría
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Image src="/logo.webp" alt="DC Asesores" width={150} height={50} className="opacity-80 mb-6 object-contain filter grayscale invert brightness-200" />
            <p className="text-slate-400 font-medium text-sm max-w-sm mb-6">
              En DC Asesores en Seguros brindamos asesoría integral en protección financiera para personas, familias y empresas. Analizamos cada necesidad de forma personalizada y acompañamos a nuestros clientes con ética, compromiso y profesionalismo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="/" className="hover:text-red-400">Inicio</Link></li>
              <li><Link href="#nosotros" className="hover:text-red-400">Nosotros</Link></li>
              <li><Link href="#servicios" className="hover:text-red-400">Servicios</Link></li>
              <li><Link href="/cotizador" className="hover:text-red-400">Cotizador</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> 02 500 3373</li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.938-6.938 6.938z"/></svg> +593 99 193 8754</li>
              <li className="flex items-center gap-2"><svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> info@dcasesoresec.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center border-t border-white/10 pt-8">
          <p className="text-slate-600 font-medium text-sm">© 2026 DC Asesores en Seguros. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
