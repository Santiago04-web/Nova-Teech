import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 z-50 flex items-center gap-3 bg-brand-elevated border border-white/20 text-white px-4 py-3 rounded shadow-2xl animate-fade-in-up">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <div className="text-xs font-mono">
        <p className="font-bold text-white">{toast.title}</p>
        {toast.message && <p className="text-neutral-400 text-[11px]">{toast.message}</p>}
      </div>
      <button onClick={onClose} className="text-neutral-400 hover:text-white ml-2">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
