/**
 * ═══════════════════════════════════════════════════════════════
 * 📄 ARCHITECTURE MAP — PublicQuoteView.tsx
 * ═══════════════════════════════════════════════════════════════
 * 📁 Path: src/components/quote/PublicQuoteView.tsx
 * 🏷️ Type: Client Component
 * 📦 Module: Sitio Público & Cotizador
 * 🔗 Ver: ARCHITECTURE_MAP.md § Módulo Sitio Público & Cotizador
 * ─────────────────────────────────────────────────────────────
 * 🔍 STRUCTURE:
 *   L1-L40   → Imports de componentes, PDF engine, logo y servicios actuariales
 *   L41-L120 → Hook de cálculo reactivo, persistencia de prospectos en CRM y WhatsApp
 *   L121-L170→ Gestión de descarga de proformas individuales y consolidadas con registro
 *   L171-L260→ Shell de la vista pública (Hero DC Asesores, Formulario, Tabla y Modales)
 * ─────────────────────────────────────────────────────────────
 * 📝 LAST UPDATED: 2026-09-17
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QuoteInput, InsurerQuoteResult, Insurer, GlobalTaxConfig } from '../../types';
import { calculateAllQuotes } from '../../lib/calculator';
import { INITIAL_GLOBAL_CONFIG, INITIAL_INSURERS, seedInitialDataToFirestore } from '../../lib/seedData';
import { saveQuoteConsultation } from '../../lib/consultationService';
import { buildWhatsAppQuoteUrl } from '../../lib/whatsappService';
import { buildAllInsurersHtml, buildSingleInsurerHtml, generateAndDownloadPdf, DC_COMPANY_INFO } from '../../lib/pdfGenerator';
import { QuoteForm } from './QuoteForm';
import { ComparisonTable } from './ComparisonTable';
import { TrustSignals } from './TrustSignals';
import { PdfQuoteModal } from './PdfQuoteModal';
import { LeadRegistrationModal } from './LeadRegistrationModal';
import { DcLogo } from '../common/DcLogo';
import { CheckCircle2, Zap, FileDown, CheckCircle, Shield } from 'lucide-react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export const PublicQuoteView: React.FC = () => {
  const [globalConfig, setGlobalConfig] = useState<GlobalTaxConfig>(INITIAL_GLOBAL_CONFIG);
  const [insurers, setInsurers] = useState<Insurer[]>(INITIAL_INSURERS);
  const [activeQuoteForPdf, setActiveQuoteForPdf] = useState<InsurerQuoteResult | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Estados para la pasarela de descarga de proformas con registro de usuario y correo
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<'all' | 'single'>('all');
  const [targetQuoteForDownload, setTargetQuoteForDownload] = useState<InsurerQuoteResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Valores iniciales de cotización
  const [currentInput, setCurrentInput] = useState<QuoteInput>({
    clientName: 'Carlos Mendoza',
    clientPhone: '0998765432',
    clientEmail: '',
    vehicleBrandModel: 'Chevrolet D-Max 4x4',
    vehicleYear: 2023,
    vehicleValue: 24000,
    city: 'UIO',
    productPreference: 'LIVIANO_CLASSIC',
  });

  // Carga reactiva de datos desde Firestore
  useEffect(() => {
    async function loadFirestoreData() {
      try {
        const configSnap = await getDoc(doc(db, 'config', 'parameters'));
        if (configSnap.exists()) {
          setGlobalConfig(configSnap.data() as GlobalTaxConfig);
        } else {
          await seedInitialDataToFirestore(false);
        }

        const insurersSnap = await getDocs(collection(db, 'insurers'));
        if (!insurersSnap.empty) {
          const loadedInsurers = insurersSnap.docs.map((d) => d.data() as Insurer);
          if (loadedInsurers.length > 0) {
            setInsurers(loadedInsurers);
          }
        }
      } catch (err) {
        console.warn('Usando configuración local en memoria:', err);
      }
    }
    loadFirestoreData();
  }, []);

  // Cálculo actuarial reactivo
  const quoteResults = useMemo(() => {
    return calculateAllQuotes(currentInput, insurers, globalConfig);
  }, [currentInput, insurers, globalConfig]);

  const handleValuesChange = useCallback((values: QuoteInput) => {
    setCurrentInput(values);
  }, []);

  const handleSubmitQuote = useCallback(
    async (values: QuoteInput) => {
      setCurrentInput(values);
      const calculated = calculateAllQuotes(values, insurers, globalConfig);
      await saveQuoteConsultation(values, calculated);
    },
    [insurers, globalConfig]
  );

  // Modal para ver proforma en pantalla
  const handleSelectForPdfModal = (result: InsurerQuoteResult) => {
    setActiveQuoteForPdf(result);
    setIsPdfModalOpen(true);
    saveQuoteConsultation(currentInput, quoteResults);
  };

  // Disparador de descarga de TODAS las proformas (abre el modal de registro de usuario y correo)
  const handleTriggerDownloadAll = () => {
    setDownloadMode('all');
    setTargetQuoteForDownload(null);
    setIsLeadModalOpen(true);
  };

  // Disparador de descarga de una proforma individual (abre el modal de registro de usuario y correo)
  const handleTriggerDownloadSingle = (result: InsurerQuoteResult) => {
    setDownloadMode('single');
    setTargetQuoteForDownload(result);
    setIsLeadModalOpen(true);
  };

  // Ejecución final tras registrar el correo y usuario
  const handleConfirmDownload = async (userData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setIsGeneratingPdf(true);
    try {
      const updatedInput: QuoteInput = {
        ...currentInput,
        clientName: userData.name,
        clientEmail: userData.email,
        clientPhone: userData.phone,
      };
      setCurrentInput(updatedInput);

      // 1. Registrar consulta y prospecto en Firestore CRM
      await saveQuoteConsultation(updatedInput, quoteResults);

      // 2. Generar el HTML oficial con logo e información de dcasesoresec.com
      let htmlToPrint = '';
      let fileName = 'Proforma_DC_Asesores.pdf';
      const safeClient = updatedInput.clientName.trim().replace(/\s+/g, '_').slice(0, 30);

      if (downloadMode === 'all') {
        htmlToPrint = buildAllInsurersHtml(quoteResults, updatedInput);
        fileName = `Proforma_Comparativa_DC_Asesores_${safeClient}.pdf`;
      } else if (targetQuoteForDownload) {
        htmlToPrint = buildSingleInsurerHtml(targetQuoteForDownload, updatedInput);
        fileName = `Proforma_${targetQuoteForDownload.insurer.slug.toUpperCase()}_DC_Asesores_${safeClient}.pdf`;
      } else if (quoteResults[0]) {
        htmlToPrint = buildSingleInsurerHtml(quoteResults[0], updatedInput);
        fileName = `Proforma_${quoteResults[0].insurer.slug.toUpperCase()}_DC_Asesores_${safeClient}.pdf`;
      }

      // 3. Generar y descargar directamente el archivo .PDF
      await generateAndDownloadPdf(htmlToPrint, fileName);

      // Cerrar modal y notificar al usuario
      setIsLeadModalOpen(false);
      setToastMessage(
        downloadMode === 'all'
          ? '¡Proforma comparativa descargada en PDF con éxito!'
          : `¡Proforma de ${targetQuoteForDownload?.insurer.name || 'seguro'} descargada en PDF con éxito!`
      );
      setTimeout(() => setToastMessage(null), 5000);
    } catch (err) {
      console.error('Error al generar proforma:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleWhatsAppContact = (result: InsurerQuoteResult) => {
    const url = buildWhatsAppQuoteUrl(result, currentInput);
    saveQuoteConsultation(currentInput, quoteResults);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Toast de notificación de descarga */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-red-500/40 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{toastMessage}</div>
        </div>
      )}

      {/* Hero Section con Identidad Corporativa DC Asesores */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-red-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Logo de la Empresa en el Hero */}
            <div className="flex justify-center mb-2">
              <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/15 inline-block shadow-lg">
                <DcLogo size="md" variant="white" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-xs font-semibold text-red-300">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>Comparador Actuarial en Vivo • Ley de Seguros Ecuador</span>
            </div>

            {/* Encabezado Principal H1 para A+ SEO */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Cotiza y Compara tu Seguro de Auto en Ecuador al Instante
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Calculamos al centavo tu prima neta, SUPER (3.5%), SSC (0.5%), derechos de emisión e IVA 15% 
              con las principales aseguradoras del país: Alianza, Latina, Hispana, Vaz y Privilegio.
            </p>

            {/* Micro-beneficios con estética DC */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-400" />
                <span>Emisión 100% digital</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-400" />
                <span>12 cuotas mensuales sin recargo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-400" />
                <span>Asesoría en siniestros 24/7 ({DC_COMPANY_INFO.whatsappDisplay})</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contenido Principal: Formulario y Tablero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        
        {/* Formulario de Entrada */}
        <div className="max-w-4xl mx-auto">
          <QuoteForm
            initialValues={currentInput}
            onValuesChange={handleValuesChange}
            onSubmitQuote={handleSubmitQuote}
          />
        </div>

        {/* Señales de Confianza */}
        <div className="max-w-5xl mx-auto">
          <TrustSignals />
        </div>

        {/* Tablero Comparativo con Tabla Resumen y Selector Desplegable */}
        <section className="mt-8">
          <ComparisonTable
            results={quoteResults}
            inputData={currentInput}
            onSelectForPdf={handleTriggerDownloadSingle}
            onDownloadAllPdf={handleTriggerDownloadAll}
            onContactWhatsApp={handleWhatsAppContact}
          />
        </section>

      </main>

      {/* Pasarela Modal: Registro obligatorio de Correo y Usuario antes de descargar la Proforma */}
      <LeadRegistrationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        currentInput={currentInput}
        mode={downloadMode}
        targetInsurerName={targetQuoteForDownload?.insurer.name}
        onConfirmDownload={handleConfirmDownload}
        isProcessing={isGeneratingPdf}
      />

      {/* Modal de visualización de Proforma Formal en pantalla */}
      <PdfQuoteModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        result={activeQuoteForPdf}
        inputData={currentInput}
        onWhatsAppContact={handleWhatsAppContact}
      />

    </div>
  );
};
