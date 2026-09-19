'use client';
import { Navbar } from '@/components/layout/Navbar';
import { PublicQuoteView } from '@/components/quote/PublicQuoteView';
import { Footer } from '@/components/layout/Footer';

export default function CotizadorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />
      <main className="flex-1">
        <PublicQuoteView />
      </main>
      <Footer />
    </div>
  );
}
