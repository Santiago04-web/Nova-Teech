import React from 'react';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-neutral-400 mb-2.5 flex items-center gap-2">
          <span className="inline-block w-4 h-[1px] bg-neutral-500"></span>
          {eyebrow}
          <span className="inline-block w-4 h-[1px] bg-neutral-500"></span>
        </span>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display">
        {title}
      </h2>
      
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl font-light tracking-wide leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
