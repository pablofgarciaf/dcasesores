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
import { TrustSignals } from './TrustSignals';
import { PdfQuoteModal } from './PdfQuoteModal';
import { LeadRegistrationModal } from './LeadRegistrationModal';
import { CheckCircle, Sparkles, ArrowDown, ShieldCheck } from 'lucide-react';
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

  // Carga reactiva de datos desde Firestore con fallback silencioso
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
        // Fallback silencioso a las tasas pre-cargadas en memoria
      }
    }
    loadFirestoreData();
  }, []);

  // Cálculo actuarial reactivo
  const quoteResults = useMemo(() => {
    return calculateAllQuotes(currentInput, insurers, globalConfig);
  }, [currentInput, insurers, globalConfig]);

  const bestPrice = useMemo(() => quoteResults.find(q => q.isBestPrice), [quoteResults]);
  const topCoverage = useMemo(() => quoteResults.find(q => q.isTopCoverage), [quoteResults]);

  const handleValuesChange = useCallback((values: QuoteInput) => {
    setCurrentInput(values);
  }, []);

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      const el = document.getElementById('seccion-resultados');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }, []);

  const handleSubmitQuote = useCallback(
    async (values: QuoteInput) => {
      setCurrentInput(values);
      const calculated = calculateAllQuotes(values, insurers, globalConfig);
      await saveQuoteConsultation(values, calculated);
      
      scrollToResults();
      setToastMessage('✓ Cotización calculada. Mostrando comparativa abajo.');
      setTimeout(() => setToastMessage(null), 4000);
    },
    [insurers, globalConfig, scrollToResults]
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
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans text-slate-800">
      
      {/* Toast de notificación */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-red-500/40 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{toastMessage}</div>
        </div>
      )}

      {/* Breadcrumbs y Título Sutil (Cero Hero) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span>Inicio</span>
          <span>/</span>
          <span className="text-[#e11b22]">Cotizador Inteligente</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Cotizador de Seguros Vehiculares Multicompañía
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ingresa los datos de tu vehículo y compara al instante las tarifas de las mejores aseguradoras de Ecuador.
        </p>
      </div>

      {/* Contenido Principal: Formulario Único */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Formulario de Entrada */}
        <div>
          <QuoteForm
            initialValues={currentInput}
            onValuesChange={handleValuesChange}
            onSubmitQuote={handleSubmitQuote}
          />
        </div>

        {/* Resumen Rápido en Vivo que da Feedback Inmediato */}
        {bestPrice && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Mejor opción calculada:</p>
                <p className="text-sm font-black text-slate-900">
                  {bestPrice.insurer.name} — <span className="text-[#e11b22]">${bestPrice.breakdown.cuotaMensual}/mes</span> (Prima Anual: ${bestPrice.breakdown.primaTotalAnual})
                </p>
              </div>
            </div>

            <button
              onClick={scrollToResults}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#e11b22] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Ver Tabla Comparativa</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Señales de Confianza */}
        <TrustSignals />

        {/* Tablero Comparativo con ancla de scroll */}
        <div id="seccion-resultados" className="pt-4 scroll-mt-24">
          <div className="bg-slate-900 text-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold">
                Resultados de Cotización para {currentInput.vehicleBrandModel || 'tu Vehículo'} ({currentInput.vehicleYear})
              </span>
            </div>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-mono font-semibold">
              Valor: ${currentInput.vehicleValue.toLocaleString()} USD
            </span>
          </div>

          <ComparisonTable
            results={quoteResults}
            inputData={currentInput}
            onSelectForPdf={handleTriggerDownloadSingle}
            onDownloadAllPdf={handleTriggerDownloadAll}
            onContactWhatsApp={handleWhatsAppContact}
          />
        </div>

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
