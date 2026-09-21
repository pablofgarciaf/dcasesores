import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones Legales | DC Asesores Ecuador',
  description: 'Conoce los términos y condiciones de asesoría actuarial, cotización de seguros y tratamiento de datos de DC Asesores en Seguros Ecuador.',
  alternates: {
    canonical: 'https://dcasesoresec.com/terminos-y-condiciones',
  },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Breadcrumb */}
      <nav className="bg-slate-950 text-slate-400 py-3.5 px-4 border-b border-slate-900 text-xs">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-semibold">Términos y Condiciones</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 border-b border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[#e11b22] border border-red-500/20 text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Marco Legal y Regulatorio
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transparencia, independencia y cumplimiento con la Superintendencia de Compañías, Valores y Seguros del Ecuador.
          </p>
        </div>
      </section>

      {/* Main Legal Content */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              1. Naturaleza del Servicio de Intermediación
            </h2>
            <p>
              DC Asesores en Seguros es una Agencia Asesora Productora de Seguros legalmente constituida en la República del Ecuador, con registro oficial ante la Superintendencia de Compañías, Valores y Seguros. Nuestro objeto es brindar asesoría profesional e independiente a personas naturales y jurídicas en la contratación, administración y reclamo de pólizas emitidas por compañías aseguradoras autorizadas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              2. Validez de las Cotizaciones y Cálculos Actuariales
            </h2>
            <p>
              Los valores calculados a través de nuestros cotizadores en línea (incluyendo prima neta, contribuciones SUPER, SSC, derechos de emisión e IVA del 15%) son referenciales y se basan en las matrices vigentes al momento de la simulación. La emisión definitiva de la póliza queda sujeta a la inspección previa del vehículo o bien asegurable, historial de siniestralidad y aprobación formal por parte de la aseguradora elegida.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              3. Protección de Datos Personales
            </h2>
            <p>
              En estricto cumplimiento con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP), la información suministrada mediante formularios, cotizaciones o contacto directo será tratada con confidencialidad absoluta y utilizada exclusivamente para elaborar propuestas técnicas y gestionar pólizas de seguros. DC Asesores no comercializa ni cede bases de datos a terceros.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              4. Acompañamiento en Siniestros y Reclamos
            </h2>
            <p>
              El servicio de acompañamiento y peritación ante siniestros es una prestación gratuita para todos los clientes de DC Asesores en Seguros con pólizas vigentes y al día en pagos. El asegurado se compromete a notificar oportunamente el evento dentro de los plazos estipulados en la Ley General de Seguros y las condiciones generales de su póliza.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <span>Última actualización: Enero 2026</span>
            <Link href="/" className="font-bold text-[#e11b22] hover:underline">
              ← Regresar a la Página Principal
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
