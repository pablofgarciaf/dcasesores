export const metadata = {
  title: 'Admin Suite | DC Asesores en Seguros',
  description: 'Panel de control maestro, tarificación actuarial y CMS',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 antialiased">
      {children}
    </div>
  );
}
