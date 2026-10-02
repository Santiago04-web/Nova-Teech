import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton({
  phoneNumber = "573044153358",
  customMessage = "Hola Nova Teech, me interesa conocer más sobre las prendas y hacer un pedido."
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-brand-card text-white text-xs px-3.5 py-2 rounded-lg border border-white/10 shadow-2xl flex items-center gap-2 animate-fade-in">
          <span>¿Dudas con tu talla? Escríbenos</span>
          <button 
            onClick={() => setShowTooltip(false)} 
            className="text-neutral-400 hover:text-white"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        {/* Glow pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-75 blur-sm transition-opacity duration-300 animate-pulse"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
}
