import Link from 'next/link';

export const metadata = {
  title: 'Blog | DC Asesores en Seguros',
  description: 'Noticias, consejos y artículos sobre seguros, educación financiera y protección patrimonial.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f9f9fb] font-sans text-slate-800">
      
      {/* 🔴 HEADER CORPORATIVO (Mantenido global) */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
          <Link href="/">
            <img src="/logo.webp" alt="DC Asesores" className="h-14 object-contain" />
          </Link>
          <nav className="hidden md:flex gap-8 items-center font-medium text-slate-700 text-sm">
            <Link href="/" className="hover:text-[#e11b22] transition-colors">Inicio</Link>
            <Link href="/blog" className="text-[#e11b22] font-bold">Blog</Link>
            <Link href="/cotizador" className="flex items-center gap-1 hover:text-[#e11b22] transition-colors">
              Cotizador <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* HEADER DEL BLOG */}
      <section className="py-20 bg-slate-900 text-white text-center px-4">
        <h4 className="text-[#e11b22] font-semibold tracking-widest text-sm uppercase mb-3">APRENDE CON NOSOTROS</h4>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog de Seguros y Protección Financiera</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Consejos expertos para elegir la mejor cobertura, cuidar tu patrimonio y asegurar el futuro de tu familia.
        </p>
      </section>

      {/* GRID DE ARTÍCULOS */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Post Placeholder 1 */}
          <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-slate-200 w-full object-cover">
               {/* Placeholder image */}
               <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-26T213339.263.png" className="w-full h-full object-cover opacity-80" alt="Blog Post 1" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-[#e11b22] uppercase tracking-wider mb-2 block">Seguro de Vida</span>
              <h2 className="text-xl font-bold text-slate-800 mb-3 hover:text-[#e11b22] cursor-pointer">5 razones por las que necesitas un seguro de vida con ahorro</h2>
              <p className="text-slate-500 text-sm mb-4">Descubre cómo proteger a tu familia mientras construyes un fondo para tu jubilación o proyectos futuros.</p>
              <Link href="#" className="text-slate-800 font-bold text-sm flex items-center gap-2 hover:text-[#e11b22]">Leer artículo <span>→</span></Link>
            </div>
          </article>

          {/* Post Placeholder 2 */}
          <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-slate-200 w-full object-cover">
               <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-27T082522.267-380x380.png" className="w-full h-full object-cover opacity-80" alt="Blog Post 2" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-[#e11b22] uppercase tracking-wider mb-2 block">Salud</span>
              <h2 className="text-xl font-bold text-slate-800 mb-3 hover:text-[#e11b22] cursor-pointer">Diferencias entre seguros médicos locales e internacionales</h2>
              <p className="text-slate-500 text-sm mb-4">Aprende a elegir la cobertura médica adecuada dependiendo de tu estilo de vida y necesidades de viaje.</p>
              <Link href="#" className="text-slate-800 font-bold text-sm flex items-center gap-2 hover:text-[#e11b22]">Leer artículo <span>→</span></Link>
            </div>
          </article>

          {/* Post Placeholder 3 */}
          <article className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-slate-200 w-full object-cover">
               <img src="https://dcasesoresec.com/wp-content/uploads/2026/02/Diseno-sin-titulo-2026-02-26T215428.014-90x90.png" className="w-full h-full object-cover opacity-80" alt="Blog Post 3" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-[#e11b22] uppercase tracking-wider mb-2 block">Empresas</span>
              <h2 className="text-xl font-bold text-slate-800 mb-3 hover:text-[#e11b22] cursor-pointer">Protege tu patrimonio: Seguros empresariales obligatorios</h2>
              <p className="text-slate-500 text-sm mb-4">Una guía completa sobre las pólizas que toda PYME y empresa grande debe tener para operar con seguridad.</p>
              <Link href="#" className="text-slate-800 font-bold text-sm flex items-center gap-2 hover:text-[#e11b22]">Leer artículo <span>→</span></Link>
            </div>
          </article>

        </div>
      </section>
    </div>
  );
}
