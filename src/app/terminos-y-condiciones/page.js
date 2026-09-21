import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  ShieldCheck, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  Lock, 
  CreditCard, 
  FileCheck, 
  AlertCircle,
  HelpCircle,
  Phone,
  Mail
} from 'lucide-react';

export const metadata = {
  title: 'Términos, Condiciones y Privacidad | DC Asesores Ecuador',
  description: 'Términos y condiciones oficiales de intermediación, condiciones de pagos electrónicos y política de protección de datos personales de DC Asesores Ecuador.',
  alternates: {
    canonical: 'https://dcasesoresec.com/terminos-y-condiciones',
  },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Breadcrumb Visual */}
      <nav className="bg-slate-950 text-slate-400 py-3.5 px-4 border-b border-slate-900 text-xs">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#e11b22] font-semibold">Términos y Condiciones de Uso & Privacidad</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 px-4 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e11b22]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#e11b22]" />
            Marco Legal y Regulatorio Oficial
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            TÉRMINOS Y CONDICIONES DE USO <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11b22] via-rose-500 to-amber-500">
              DC ASESORES DE SEGUROS
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Transparencia, cumplimiento de la normativa ecuatoriana y protección de los derechos de nuestros clientes y asegurados.
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <a 
              href="#terminos"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              Términos del Servicio
            </a>
            <a 
              href="#clausula-13"
              className="px-5 py-2.5 rounded-full bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold transition-all border border-red-500/30"
            >
              Condiciones Pagos Electrónicos
            </a>
            <a 
              href="#privacidad"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              Política de Privacidad
            </a>
          </div>
        </div>
      </section>

      {/* Main Legal Content Container */}
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-12">
        
        {/* ═════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN I: TÉRMINOS Y CONDICIONES DE USO GENERALES           */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div id="terminos" className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#e11b22]" />
              <span>1. Identificación del prestador del servicio</span>
            </h2>
            <p className="mt-3">
              <strong>DC Asesores de Seguros</strong> es un intermediario especializado en asesoría y gestión de seguros, enfocado en brindar soluciones personalizadas en protección financiera, salud, vida y patrimonio.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#e11b22]" />
              <span>2. Objeto del servicio</span>
            </h2>
            <p className="mt-3">
              El presente documento regula el acceso y uso de los servicios de asesoría ofrecidos por <strong>DC Asesores de Seguros</strong>, los cuales incluyen:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-3 pl-2">
              <li>Análisis de necesidades del cliente</li>
              <li>Cotización de seguros con diferentes aseguradoras</li>
              <li>Asesoría personalizada</li>
              <li>Gestión de contratación de pólizas</li>
              <li>Acompañamiento durante la vigencia del seguro</li>
            </ul>
            <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 italic">
              El servicio tiene carácter informativo, consultivo y de intermediación.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              3. Condiciones de acceso y uso
            </h2>
            <p className="mt-3">
              El acceso a los servicios implica la aceptación de estos términos y condiciones. El usuario se compromete a hacer uso adecuado de la información y servicios ofrecidos.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              4. Proceso de contratación
            </h2>
            <p className="mt-3">
              El proceso de adquisición de un seguro a través de DC Asesores de Seguros se realiza de la siguiente manera:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-[#e11b22] block mb-1">Paso 1</span>
                <strong className="block text-slate-900 dark:text-white text-sm">Solicitud de información:</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">El cliente contacta por canales digitales o presenciales.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-[#e11b22] block mb-1">Paso 2</span>
                <strong className="block text-slate-900 dark:text-white text-sm">Levantamiento de perfil:</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Se recopila información relevante (edad, necesidades, presupuesto, etc.).</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-[#e11b22] block mb-1">Paso 3</span>
                <strong className="block text-slate-900 dark:text-white text-sm">Presentación de opciones:</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Se entregan cotizaciones personalizadas de distintas aseguradoras.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-[#e11b22] block mb-1">Paso 4</span>
                <strong className="block text-slate-900 dark:text-white text-sm">Selección del producto:</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">El cliente elige la opción que mejor se ajuste a sus necesidades.</p>
              </div>
            </div>
            <p className="mt-4">
              <strong>Gestión de emisión:</strong> Se tramita la póliza con la aseguradora correspondiente. La contratación final se realiza directamente con la compañía aseguradora seleccionada.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              5. Servicio personalizado
            </h2>
            <p className="mt-3">
              Todos los servicios ofrecidos son personalizados, lo que implica que:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
              <li>Las condiciones, coberturas y precios varían según el perfil del cliente</li>
              <li>Las recomendaciones se basan en la información proporcionada</li>
              <li>No existen productos estándar aplicables a todos los clientes</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              6. Relación con las aseguradoras
            </h2>
            <p className="mt-3">
              DC Asesores de Seguros actúa como intermediario entre el cliente y las compañías aseguradoras. Por lo tanto:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
              <li>No asume el riesgo asegurado</li>
              <li>No emite pólizas directamente</li>
              <li>No define las condiciones finales del contrato</li>
            </ul>
            <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">
              Las condiciones del seguro dependen exclusivamente de la aseguradora.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              7. Costos y forma de pago
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-3 pl-2">
              <li>En la mayoría de los casos, la asesoría no tiene costo directo para el cliente</li>
              <li>DC Asesores recibe comisiones por parte de las aseguradoras</li>
              <li>Los pagos de pólizas se realizan directamente a la aseguradora</li>
              <li>Cualquier costo adicional será informado previamente</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              8. Obligaciones del cliente
            </h2>
            <p className="mt-3">El cliente se compromete a:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 pl-2">
              <li>Proporcionar información veraz, completa y actualizada</li>
              <li>Revisar detalladamente las condiciones de la póliza antes de contratar</li>
              <li>Cumplir con los pagos y requisitos establecidos por la aseguradora</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              9. Responsabilidad del servicio
            </h2>
            <p className="mt-3"><strong>DC Asesores de Seguros se compromete a:</strong></p>
            <ul className="list-disc list-inside space-y-1.5 mt-1 pl-2">
              <li>Brindar asesoría transparente y profesional</li>
              <li>Presentar opciones acordes al perfil del cliente</li>
              <li>Acompañar en el proceso de contratación</li>
            </ul>
            <p className="mt-4"><strong>Sin embargo, no se responsabiliza por:</strong></p>
            <ul className="list-disc list-inside space-y-1.5 mt-1 pl-2 text-slate-600 dark:text-slate-400">
              <li>Decisiones tomadas por el cliente</li>
              <li>Rechazos de cobertura por parte de la aseguradora</li>
              <li>Cambios en condiciones, tarifas o políticas de las compañías</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              10. Propiedad intelectual
            </h2>
            <p className="mt-3">
              Todo el contenido publicado (textos, imágenes, marca, diseño) es propiedad de <strong>DC Asesores de Seguros</strong> y no puede ser utilizado sin autorización previa y por escrito.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              11. Modificaciones
            </h2>
            <p className="mt-3">
              DC Asesores de Seguros se reserva el derecho de modificar estos términos en cualquier momento. Las actualizaciones entrarán en vigencia desde su publicación en el sitio web oficial.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              12. Legislación aplicable
            </h2>
            <p className="mt-3">
              Estos términos se rigen e interpretan bajo la legislación vigente en la <strong>República del Ecuador</strong>.
            </p>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN II: CONDICIONES ESPECIALES PARA SEGUROS MASIVOS Y    */}
        {/* PAGOS ELECTRÓNICOS (CLÁUSULA 13.1 A 13.10)                   */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div id="clausula-13" className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="border-b border-slate-800 pb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <CreditCard className="w-3.5 h-3.5" />
              Cláusula Decimotercera Oficial
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              13. CONDICIONES ESPECIALES PARA SEGUROS MASIVOS Y PAGOS ELECTRÓNICOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm relative z-10">
            
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.1 Definición</h3>
              <p className="text-slate-300 leading-relaxed">
                Se consideran seguros masivos aquellos productos estandarizados, de contratación simplificada, con condiciones predefinidas por la aseguradora, de emisión inmediata o automática y bajo modalidad de prima única (pago único).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.2 Modalidad de intermediación y recaudación</h3>
              <p className="text-slate-300 leading-relaxed mb-2">El cliente acepta que:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs sm:text-sm pl-1">
                <li>DC Asesores actúa como intermediario en la comercialización</li>
                <li>El pago podrá ser realizado directamente al intermediario o mediante plataformas autorizadas</li>
                <li>DC Asesores gestionará la transferencia a la aseguradora</li>
                <li>El pago constituye una instrucción expresa de contratación</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.3 Uso de links de pago y medios electrónicos</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Para facilitar la contratación, DC Asesores podrá proporcionar links de pago, botones de pago o medios electrónicos (pasarelas, transferencias, plataformas digitales). El cliente reconoce que:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-1 mt-1">
                <li>El acceso al enlace es libre y voluntario</li>
                <li>El uso del enlace implica su intención de contratar el seguro</li>
                <li>Es responsabilidad del cliente verificar que proviene de canales oficiales de DC Asesores</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.4 Aceptación mediante pago electrónico</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                De conformidad con la normativa ecuatoriana sobre comercio electrónico y mensajes de datos:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-1 mt-1">
                <li>El pago constituye aceptación expresa de los términos y condiciones</li>
                <li>Equivale a una firma electrónica válida</li>
                <li>Genera obligación contractual entre el cliente y la aseguradora</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.5 Naturaleza del pago (prima única)</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                El cliente reconoce que el valor pagado corresponde a una prima única devengada; el seguro inicia su cobertura desde la emisión o activación, y el servicio se considera ejecutado una vez procesado el pago.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-red-500/30 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.6 Política de no devolución</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                El cliente acepta que <strong>no aplica devolución total ni parcial</strong> del pago realizado, una vez procesado y emitida la póliza, fundamentado en la activación inmediata del riesgo asegurado. Se exceptúan únicamente los casos previstos en la ley ecuatoriana o errores atribuibles al intermediario.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.7 Comprobantes de pago</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                El cliente deberá conservar su comprobante de pago y enviarlo a DC Asesores para la validación y emisión del seguro a través de nuestros sistemas o plataformas de pago.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.8 Seguridad y validación</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DC Asesores utiliza medios confiables y verifica la autenticidad de las transacciones. No se responsabiliza por pagos a cuentas no autorizadas o ingresos incorrectos de datos por parte del usuario.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.9 Consentimiento informado</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Previo al pago, el cliente declara haber recibido información clara sobre coberturas, exclusiones, vigencia y condiciones del producto, manifestando que su decisión es libre, voluntaria e informada.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-black text-red-400 text-base">13.10 Medios de prueba</h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Se considerarán medios válidos de prueba los comprobantes de pago, confirmaciones por WhatsApp o correo electrónico, registros de plataformas de pago y formularios digitales aceptados.
              </p>
            </div>

          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* SECCIÓN III: POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS   */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div id="privacidad" className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5" />
              Ley Orgánica de Protección de Datos Personales (LOPDP)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS PERSONALES
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-mono mt-1">
              DC ASESORES DE SEGUROS • ECUADOR
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                1. Responsable del tratamiento
              </h3>
              <p className="mt-2">
                <strong>DC Asesores de Seguros</strong> es responsable del tratamiento de los datos personales recopilados a través de sus distintos canales de atención (presencial, telefónico, cotizadores web, correo electrónico y WhatsApp).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                2. Datos recopilados
              </h3>
              <p className="mt-2">Se podrán recopilar los siguientes datos del usuario o contratante:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
                <li><strong>Datos de identificación:</strong> nombres completos, número de cédula o RUC.</li>
                <li><strong>Datos de contacto:</strong> número de teléfono móvil, teléfono fijo y correo electrónico.</li>
                <li><strong>Información financiera básica:</strong> datos necesarios para el análisis de riesgo y forma de pago.</li>
                <li><strong>Información familiar:</strong> dependientes y beneficiarios designados.</li>
                <li><strong>Información médica:</strong> cuando sea estrictamente requerida para seguros de salud, vida o accidentes.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                3. Finalidad del tratamiento
              </h3>
              <p className="mt-2">Los datos personales serán tratados exclusivamente para:</p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
                <li>Elaborar cotizaciones personalizadas y comparativas actuariales</li>
                <li>Gestionar procesos de emisión y contratación de pólizas con las aseguradoras</li>
                <li>Enviar información comercial, coberturas actualizadas y asesoría técnica</li>
                <li>Mantener contacto continuo durante la vigencia de la póliza y en siniestros</li>
                <li>Cumplir con las obligaciones legales y regulatorias de la Superintendencia</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                4. Uso y transferencia de datos
              </h3>
              <p className="mt-2">
                El cliente autoriza expresamente a DC Asesores a compartir su información con aseguradoras aliadas con fines exclusivos de cotización y contratación. 
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold mt-3">
                🛡️ DC Asesores de Seguros bajo ninguna circunstancia venderá ni comercializará datos personales a terceros no autorizados.
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                5. Seguridad de la información
              </h3>
              <p className="mt-2">
                Se aplican medidas técnicas, administrativas y organizativas para proteger los datos personales contra pérdida, destrucción accidental, acceso no autorizado o uso indebido.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                6. Derechos del titular
              </h3>
              <p className="mt-2">
                Conforme a la Ley Orgánica de Protección de Datos Personales, el titular tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2 pl-2">
                <li><strong>Acceso:</strong> conocer qué datos están siendo tratados.</li>
                <li><strong>Rectificación:</strong> solicitar corrección o actualización de datos erróneos.</li>
                <li><strong>Eliminación:</strong> solicitar la supresión de sus datos cuando no exista obligación legal.</li>
                <li><strong>Revocatoria:</strong> retirar el consentimiento otorgado en cualquier momento.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                7. Conservación de datos y Consentimiento
              </h3>
              <p className="mt-2">
                Los datos serán almacenados durante el tiempo estrictamente necesario para cumplir con las finalidades descritas o mientras subsista una relación comercial y los plazos legales aplicables. Al proporcionar sus datos mediante este sitio web o canales asociados, el usuario acepta de manera expresa esta política de tratamiento.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Canal de Contacto para Datos Personales:
                </h4>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#e11b22]" />
                    <a href="tel:025003373" className="hover:text-[#e11b22]">02 500 3373</a>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#e11b22]" />
                    <span><span>info</span><span className="text-[#e11b22]">&#64;</span><span>dcasesoresec.com</span></span>
                  </span>
                </div>
              </div>

              <Link 
                href="/cotizador"
                className="px-6 py-3 rounded-full bg-[#e11b22] hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                Ir al Cotizador
              </Link>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
