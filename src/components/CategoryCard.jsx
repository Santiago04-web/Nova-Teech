import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({
  category,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className="group relative h-[360px] sm:h-[420px] md:h-[480px] w-full overflow-hidden bg-brand-dark border border-white/10 cursor-pointer rounded-sm"
    >
      {/* Background Image with smooth zoom on hover */}
      <img
        src={category.image}
        alt={category.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
      />

      {/* Dark Overlay (changes subtly on hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/80 group-hover:via-black/30 group-hover:to-transparent transition-all duration-500" />

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />

      {/* Top Tag */}
      {category.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-300 uppercase px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/15">
            {category.tag}
          </span>
        </div>
      )}

      {/* Content at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end z-10">
        <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase mb-1">
          {category.count}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-display">
          {category.title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1.5 line-clamp-2 max-w-sm">
          {category.subtitle}
        </p>

        {/* CTA that slides in on hover */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 group-hover:translate-y-0">
          <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
            EXPLORAR CATEGORÍA
          </span>
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
