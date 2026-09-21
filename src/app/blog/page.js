import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Blog de Protección Financiera | DC Asesores',
  description: 'Noticias, consejos e historia sobre seguros, educación financiera y protección patrimonial en Ecuador.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] font-sans text-slate-800">
      
      {/* 🔴 HEADER UNIFICADO */}
      <Navbar />

      {/* HEADER DEL BLOG */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        {/* Background blobs for luxury feel */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#e11b22]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h4 className="text-[#e11b22] font-bold tracking-[0.3em] text-xs uppercase mb-4">Aprende con DC Asesores</h4>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Inteligencia <br/> Financiera y Seguros</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Información real y valiosa para proteger tu patrimonio, entender la historia de los seguros y mejorar tu calidad de vida.
          </p>
        </div>
      </section>

      {/* ARTÍCULOS DESTACADOS */}
      <section className="py-20 max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ARTÍCULO 1: Jurgen / Pobreza */}
          <article className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-60 overflow-hidden">
               <Image src="/blog_peace.jpg" alt="Familia durmiendo tranquila" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                 Educación Financiera
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#e11b22] transition-colors">
                El seguro: La herramienta para que Latinoamérica salga de la pobreza
              </h2>
              <div className="prose prose-sm text-slate-500 flex-1">
                <p>
                  Como menciona frecuentemente el experto <strong>Jürgen Klarić</strong>, una de las grandes diferencias entre las economías desarrolladas y Latinoamérica es la cultura de la prevención. Los seguros no son un gasto, son un escudo contra la pobreza extrema.
                </p>
                <p>
                  Un imprevisto médico o la pérdida del proveedor principal de la familia puede destruir décadas de esfuerzo patrimonial en un solo día. <strong>Asegurar tu vida y tu salud es comprar el derecho a dormir tranquilo</strong>. Mejora tu calidad de vida sabiendo que, pase lo que pase, el futuro de tus hijos y tu dignidad financiera están completamente protegidos.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">DC</div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Equipo Asesor</p>
                  <p className="text-xs text-slate-500">Lectura de 3 min</p>
                </div>
              </div>
            </div>
          </article>

          {/* ARTÍCULO 2: Historia */}
          <article className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-60 overflow-hidden">
               <Image src="/blog_history.jpg" alt="Historia de los seguros" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-[#e11b22]/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                 Historia
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#e11b22] transition-colors">
                Los orígenes: Cómo iniciaron los seguros en el Ecuador
              </h2>
              <div className="prose prose-sm text-slate-500 flex-1">
                <p>
                  La historia de los seguros a nivel mundial nació de la necesidad de proteger las expediciones marítimas comerciales. En **Ecuador**, esta historia no fue muy distinta. A finales del siglo XIX y principios del XX, impulsados por el auge cacaotero en Guayaquil, los comerciantes necesitaron proteger sus cargas de los voraces incendios que azotaban la ciudad.
                </p>
                <p>
                  Así nacieron las primeras compañías de seguros nacionales, sentando las bases del sistema financiero moderno ecuatoriano. Hoy en día, la industria aseguradora en Ecuador es robusta, regulada y esencial para el desarrollo de todo tipo de empresas y familias a lo largo de las 24 provincias.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">DC</div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Equipo Asesor</p>
                  <p className="text-xs text-slate-500">Lectura de 4 min</p>
                </div>
              </div>
            </div>
          </article>

          {/* ARTÍCULO 3: DC Asistencia */}
          <article className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-60 overflow-hidden">
               <Image src="/blog_advisor.jpg" alt="Asesora de seguros" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                 Servicio al Cliente
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#e11b22] transition-colors">
                Más que un papel: Cómo en DC Asesores te damos asistencia real
              </h2>
              <div className="prose prose-sm text-slate-500 flex-1">
                <p>
                  Vender un seguro es fácil; el verdadero valor de un *bróker* se demuestra en el momento de la verdad: **el siniestro**. En DC Asesores, nuestro trabajo real comienza el día que firmas tu póliza.
                </p>
                <p>
                  Contamos con un departamento especializado de asistencia. Si tienes un choque a las 2 AM, o una emergencia médica el fin de semana, nosotros tomamos el control. Hablamos con los peritos, llenamos los formularios por ti, peleamos las coberturas con la aseguradora y garantizamos que recibas tu indemnización en tiempo récord. **Tu única preocupación debe ser tu salud; del papeleo nos encargamos nosotros.**
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">DC</div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Dirección Médica</p>
                  <p className="text-xs text-slate-500">Lectura de 2 min</p>
                </div>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
