import React from 'react';
import Button from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function EditorialBanner({ onDiscoverClick }) {
  return (
    <section id="nueva-coleccion" className="relative w-full py-28 sm:py-36 overflow-hidden bg-brand-black border-y border-white/10 my-12">
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/editorial/banner-editorial.jpg"
          alt="Nova Teech Editorial Campaign"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.2] scale-105"
        />
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] text-neutral-300 uppercase">
              CAMPAÑA EXCLUSIVA 2026
            </span>
          </div>

          <span className="block text-xs sm:text-sm font-mono tracking-ultra uppercase text-neutral-400 mb-2">
            NUEVA COLECCIÓN
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-display leading-[0.95]">
            ELEVA TU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-white to-neutral-400">
              ESTILO URBANO
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light tracking-wide leading-relaxed max-w-lg">
            Cortes desestructurados, acabados en tejido pesado y detalles industriales pensados para quienes marcan su propio camino. Una declaración de identidad sin concesiones.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onDiscoverClick}
              icon={ArrowRight}
              iconPosition="right"
            >
              DESCUBRIR COLECCIÓN
            </Button>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-neutral-400">
              <span className="text-white font-bold">100% GARANTÍA</span>
              <span>//</span>
              <span>CALIDAD COMPROBADA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
