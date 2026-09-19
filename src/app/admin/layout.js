export const metadata = {
  title: 'Admin | DC Asesores',
  description: 'Panel de administración interno',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#131a20] text-slate-200">
      <nav className="bg-[#19222a] border-b border-white/5 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">DC Admin <span className="text-xs font-normal bg-sky-500/20 text-sky-400 px-2 py-1 rounded ml-2">Panel Privado</span></h1>
        <div className="text-sm text-slate-400">Autenticado</div>
      </nav>
      <main className="p-8 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}
