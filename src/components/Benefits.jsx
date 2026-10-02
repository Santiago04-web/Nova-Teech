import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Truck,
      title: "ENVÍOS A TODO COLOMBIA",
      description: "Enviamos tus pedidos de forma segura y monitoreada a cualquier ciudad."
    },
    {
      icon: ShieldCheck,
      title: "PAGOS SEGUROS",
      description: "Compra con métodos de pago confiables: PSE, tarjetas, Nequi y Daviplata."
    },
    {
      icon: RotateCcw,
      title: "CAMBIOS Y DEVOLUCIONES",
      description: "Compra con tranquilidad. Proceso ágil y sin complicaciones en tus prendas."
    },
    {
      icon: Sparkles,
      title: "CALIDAD NOVA TEECH",
      description: "Prendas seleccionadas con textiles de alto gramaje para tu estilo diario."
    }
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-white/10 bg-brand-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col p-6 bg-brand-card/30 hover:bg-brand-elevated/50 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-white/5 border border-white/10 text-white mb-5 group-hover:scale-110 group-hover:border-white/30 transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-white font-display">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
