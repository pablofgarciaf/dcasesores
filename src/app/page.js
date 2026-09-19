import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'DC Asesores en Seguros | Cotizador Inteligente',
  description: 'Cotización al instante con las mejores aseguradoras del país. Experiencia premium.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafbfc] selection:bg-red-600 selection:text-white font-sans relative overflow-hidden">
      
      {/* 🌟 Background Ambient Blobs (Stripe/Linear style) */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-400/20 mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-300/20 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-slate-300/30 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* 🚀 Floating Premium Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-4 sm:px-6 animate-fade-in">
        <nav className="max-w-6xl mx-auto glass-card rounded-full px-6 py-3 flex justify-between items-center transition-all hover:bg-white/80">
          <Link href="/" className="flex-shrink-0 transform transition-transform hover:scale-105 active:scale-95">
            {/* Logo ajustado sin distorsión */}
            <div className="relative w-[140px] h-[45px]">
              <Image 
                src="/logo.png" 
                alt="DC Asesores" 
                fill
                className="object-contain"
                priority 
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#servicios" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Servicios</Link>
            <Link href="#respaldo" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Aseguradoras</Link>
            <Link 
              href="/cotizador" 
              className="bg-slate-900 hover:bg-black text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-[0_8px_20px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_25px_rgb(0,0,0,0.2)] active:scale-95 flex items-center gap-2 group"
            >
              Cotizar Ahora
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        </nav>
      </div>

      {/* 🏆 Hero Section Ultra-Premium */}
      <main className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            El cotizador #1 de Ecuador
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
            Tu seguro vehicular. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
              Al instante, sin fricción.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Compara precios reales de las mejores aseguradoras, emite tu póliza y maneja con la tranquilidad que mereces hoy mismo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              href="/cotizador" 
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group"
            >
              Cotizar mi Vehículo
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            <Link 
              href="/admin" 
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg shadow-sm transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center"
            >
              Portal de Asesores
            </Link>
          </div>
        </div>
      </main>

      {/* 🚀 Infinite Marquee Brands Section (EnergyEngine Style) */}
      <section id="respaldo" className="py-20 relative overflow-hidden bg-white/40 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Respaldo oficial de las aseguradoras más sólidas</p>
        </div>
        
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fafbfc] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fafbfc] to-transparent z-10"></div>

        <div className="w-[200%] flex overflow-hidden group">
          <div className="animate-marquee flex items-center space-x-16 sm:space-x-32 px-8 w-1/2 justify-around opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            {/* Logos Tipográficos de Lujo */}
            <div className="text-4xl font-black text-slate-800 flex items-center gap-2">
              <span className="text-red-600">///</span> BMI
            </div>
            <div className="text-4xl font-black text-slate-800">
              <span className="text-blue-600 text-5xl leading-none mr-1">♦</span> SWEADEN
            </div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter">
              CONFIAMED
            </div>
            <div className="text-4xl font-serif font-black text-slate-800">
              <span className="text-red-600">■</span> Redbridge.
            </div>
            <div className="text-4xl font-black text-slate-800 flex items-center gap-1">
              <span className="text-green-500 text-5xl">*</span> Olé <span className="font-light text-slate-500">insurance</span>
            </div>
            <div className="text-5xl font-black text-slate-800 flex items-center gap-2">
              <span className="text-red-600">AF</span> 
              <span className="text-slate-300">|||</span>
            </div>
          </div>
          
          {/* Clon para bucle infinito perfecto */}
          <div className="animate-marquee flex items-center space-x-16 sm:space-x-32 px-8 w-1/2 justify-around opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            <div className="text-4xl font-black text-slate-800 flex items-center gap-2">
              <span className="text-red-600">///</span> BMI
            </div>
            <div className="text-4xl font-black text-slate-800">
              <span className="text-blue-600 text-5xl leading-none mr-1">♦</span> SWEADEN
            </div>
            <div className="text-3xl font-black text-slate-800 tracking-tighter">
              CONFIAMED
            </div>
            <div className="text-4xl font-serif font-black text-slate-800">
              <span className="text-red-600">■</span> Redbridge.
            </div>
            <div className="text-4xl font-black text-slate-800 flex items-center gap-1">
              <span className="text-green-500 text-5xl">*</span> Olé <span className="font-light text-slate-500">insurance</span>
            </div>
            <div className="text-5xl font-black text-slate-800 flex items-center gap-2">
              <span className="text-red-600">AF</span> 
              <span className="text-slate-300">|||</span>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 Premium Cards Section */}
      <section id="servicios" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">¿Por qué DC Asesores?</h2>
            <p className="text-slate-500 font-medium">Diseñamos una experiencia de cotización sin igual. Olvídate de los papeleos y esperas interminables.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[32px] group hover:-translate-y-2 transition-all duration-300 cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-red-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Velocidad Absoluta</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Cotización en tiempo real basada en matrices oficiales. Todo al instante, directo a tu pantalla.</p>
            </div>
            
            <div className="glass-card p-10 rounded-[32px] group hover:-translate-y-2 transition-all duration-300 cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Seguridad Total</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Alianzas exclusivas con aseguradoras clase A. Tu patrimonio está protegido por gigantes.</p>
            </div>
            
            <div className="glass-card p-10 rounded-[32px] group hover:-translate-y-2 transition-all duration-300 cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-slate-800">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Asesoría 24/7</h3>
              <p className="text-slate-600 font-medium leading-relaxed">No eres un número. Tienes a un asesor personal listo para responderte en todo momento.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Image src="/logo.png" alt="DC Asesores" width={100} height={35} className="mx-auto opacity-50 mb-6 object-contain" />
          <p className="text-slate-400 font-medium text-sm">© {new Date().getFullYear()} DC Asesores en Seguros. Ingeniería y diseño con estándares A+.</p>
        </div>
      </footer>
    </div>
  );
}
