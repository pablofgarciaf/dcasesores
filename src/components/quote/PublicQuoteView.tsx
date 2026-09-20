'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QuoteInput, InsurerQuoteResult, Insurer, GlobalTaxConfig } from '../../types';
import { calculateAllQuotes } from '../../lib/calculator';
import { INITIAL_GLOBAL_CONFIG, INITIAL_INSURERS } from '../../lib/seedData';
import { saveQuoteConsultation } from '../../lib/consultationService';
import { buildWhatsAppQuoteUrl } from '../../lib/whatsappService';
import { buildAllInsurersHtml, buildSingleInsurerHtml, generateAndDownloadPdf } from '../../lib/pdfGenerator';
import { QuoteForm } from './QuoteForm';
import { ComparisonTable } from './ComparisonTable';
import { PdfQuoteModal } from './PdfQuoteModal';
import { LeadRegistrationModal } from './LeadRegistrationModal';
import { CheckCircle, Sparkles, ArrowRight, ShieldCheck, FileDown, Layers } from 'lucide-react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export const PublicQuoteView: React.FC = () => {
  const [globalConfig, setGlobalConfig] = useState<GlobalTaxConfig>(INITIAL_GLOBAL_CONFIG);
  const [insurers, setInsurers] = useState<Insurer[]>(INITIAL_INSURERS);
  const [activeQuoteForPdf, setActiveQuoteForPdf] = useState<InsurerQuoteResult | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Estados para descarga de proformas y registro
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<'all' | 'single'>('all');
  const [targetQuoteForDownload, setTargetQuoteForDownload] = useState<InsurerQuoteResult | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasCalculated, setHasCalculated] = useState(true);

  // Valores iniciales
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
        }

        const insurersSnap = await getDocs(collection(db, 'insurers'));
        if (!insurersSnap.empty) {
          const loadedInsurers = insurersSnap.docs.map((d) => d.data() as Insurer);
          if (loadedInsurers.length > 0) {
            setInsurers(loadedInsurers);
          }
        }
      } catch {
        // Fallback silencioso a tasas de memoria
      }
    }
    loadFirestoreData();
  }, []);

  // Cálculo actuarial reactivo para TODAS las aseguradoras
  const quoteResults = useMemo(() => {
    return calculateAllQuotes(currentInput, insurers, globalConfig);
  }, [currentInput, insurers, globalConfig]);

  const handleValuesChange = useCallback((values: QuoteInput) => {
    setCurrentInput(values);
  }, []);

  const handleSubmitQuote = useCallback(
    async (values: QuoteInput) => {
      setCurrentInput(values);
      setHasCalculated(true);
      const calculated = calculateAllQuotes(values, insurers, globalConfig);
      await saveQuoteConsultation(values, calculated);
      
      // En móviles hace scroll suave hacia la derecha/abajo
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('panel-resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      
      setToastMessage('✓ Cotizaciones actualizadas para todas las aseguradoras.');
      setTimeout(() => setToastMessage(null), 3500);
    },
    [insurers, globalConfig]
  );

  // Modal para ver proforma en pantalla
  const handleSelectForPdfModal = (result: InsurerQuoteResult) => {
    setActiveQuoteForPdf(result);
    setIsPdfModalOpen(true);
    saveQuoteConsultation(currentInput, quoteResults);
  };

  // Disparador de descarga de TODAS las proformas
  const handleTriggerDownloadAll = () => {
    setDownloadMode('all');
    setTargetQuoteForDownload(null);
    setIsLeadModalOpen(true);
  };

  // Disparador de descarga de una proforma individual
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

      await saveQuoteConsultation(updatedInput, quoteResults);

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

      await generateAndDownloadPdf(htmlToPrint, fileName);

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
      
      {/* Toast flotante */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-red-500/40 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{toastMessage}</div>
        </div>
      )}

      {/* Micro Barra Superior */}
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Inicio</span>
              <span>/</span>
              <span className="text-[#e11b22]">Cotizador Inteligente</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Cotizador y Comparador Multicompañía
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{insurers.length} Aseguradoras Activas</span>
            </span>
            <button
              onClick={handleTriggerDownloadAll}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#e11b22] text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Proforma Consolidada</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SPLIT SCREEN DASHBOARD (Todo visible en una sola pantalla desktop)
          ───────────────────────────────────────────────────────────── */}
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA (4 COLS): Formulario Compacto */}
          <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-24">
            <QuoteForm
              initialValues={currentInput}
              onValuesChange={handleValuesChange}
              onSubmitQuote={handleSubmitQuote}
            />

            {/* Micro Señales de Confianza debajo del form */}
            <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantía DC Asesores en Siniestros 24/7</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Pólizas emitidas directamente con las aseguradoras autorizadas por la Superintendencia de Compañías del Ecuador.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA (8 COLS): Tablero de Resultados Dinámico */}
          <div id="panel-resultados" className="lg:col-span-8 xl:col-span-8 space-y-6">
            <ComparisonTable
              results={quoteResults}
              inputData={currentInput}
              onSelectForPdf={handleTriggerDownloadSingle}
              onDownloadAllPdf={handleTriggerDownloadAll}
              onContactWhatsApp={handleWhatsAppContact}
            />
          </div>

        </div>
      </main>

      {/* Modal: Registro de prospecto antes de descargar Proforma */}
      <LeadRegistrationModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        currentInput={currentInput}
        mode={downloadMode}
        targetInsurerName={targetQuoteForDownload?.insurer.name}
        onConfirmDownload={handleConfirmDownload}
        isProcessing={isGeneratingPdf}
      />

      {/* Modal: Visualización en pantalla */}
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
