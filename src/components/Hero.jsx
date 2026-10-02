import React from 'react';
import Button from './Button';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function Hero({ onShopClick, onCollectionClick }) {
  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-20"
    >
      {/* Background Cinematographic Master Asset */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-banner.jpg"
          alt="Nova Teech Campaña Ropa Urbana"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.12] scale-102 transform transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradients & Vignette for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070708]/90 via-[#070708]/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#070708]/95" />
      </div>

      {/* Atmospheric Subtle Grid Pattern & Light Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex flex-col justify-between min-h-[75vh]">
        {/* Top Campaign Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-300 uppercase">
              DROP 01 // EDICIÓN 2026 DISPONIBLE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono tracking-widest text-neutral-400">
            <span>CALI, COLOMBIA</span>
            <span>✦</span>
            <span>STREETWEAR PREMIUM</span>
          </div>
        </div>

        {/* Center Main Message */}
        <div className="max-w-2xl my-auto py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-neutral-300 uppercase">
              NUEVAS COLECCIONES CADA SEMANA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-display leading-[0.95] drop-shadow-2xl">
            ROPA QUE TE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              IDENTIFICA
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-neutral-300 font-light tracking-wide max-w-xl leading-relaxed">
            Moda, estilo y actitud para todos los días. Diseños exclusivos confeccionados con textiles de alto gramaje y corte contemporáneo.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onShopClick}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              COMPRAR AHORA
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onCollectionClick}
              className="w-full sm:w-auto"
            >
              VER COLECCIÓN
            </Button>
          </div>
        </div>

        {/* Bottom Ticker / Brand Attributes */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              SILUETAS OVERSIZED
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              ALGODÓN 450 GSM
            </span>
            <span className="hidden md:flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              ENVÍOS SEGUROS
            </span>
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#categorias"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="text-[10px] tracking-widest uppercase">EXPLORAR</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
