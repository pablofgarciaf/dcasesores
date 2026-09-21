import React from 'react';
import { Award, ShieldCheck, TrendingUp, Clock } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      value: '+15 Años',
      label: 'Experiencia & Trayectoria',
      subtext: 'Asesoría actuarial líder en Ecuador',
      icon: Award,
      color: 'from-red-500 to-orange-500',
    },
    {
      value: '10+',
      label: 'Aseguradoras Aliadas',
      subtext: 'Convenios directos y mejores tasas',
      icon: ShieldCheck,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      value: '99.8%',
      label: 'Siniestros Aprobados',
      subtext: 'Acompañamiento y cobro oportuno',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      value: '24 / 7',
      label: 'Respaldo In Situ',
      subtext: 'Asistencia real ante emergencias',
      icon: Clock,
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-10 shadow-2xl shadow-slate-900/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${idx > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                    <Icon className="w-5 h-5 text-[#e11b22]" />
                  </div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-mono">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
