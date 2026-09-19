'use client';
import { Header } from '@/components/layout/Header';
import { PublicQuoteView } from '@/components/quote/PublicQuoteView';
import { Footer } from '@/components/layout/Footer';

export default function CotizadorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <PublicQuoteView />
      </main>
      <Footer />
    </div>
  );
}
