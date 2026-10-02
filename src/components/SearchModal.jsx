import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim() === '' ? [] : PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
    (p.tag && p.tag.toLowerCase().includes(query.toLowerCase()))
  );

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-brand-dark border border-white/15 w-full max-w-2xl rounded-sm overflow-hidden shadow-2xl z-10 animate-fade-in-up">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por prenda, categoría o drop (ej. Hoodie, Matrix, Oversized)..."
            className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono tracking-wider text-neutral-400 hover:text-white border border-white/10 px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs font-mono text-neutral-500">
              <p>BÚSQUEDAS POPULARES:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Hoodies Oversize', 'Camisetas Boxy', 'Pantalones Cargo', 'Colección 2026'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag.split(' ')[0])}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-neutral-300 text-xs border border-white/5 rounded-none"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 bg-brand-card/40 hover:bg-brand-elevated border border-transparent hover:border-white/10 cursor-pointer rounded-sm transition-all group"
              >
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-12 h-14 object-cover object-center rounded-sm bg-neutral-900 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    {product.category} // {product.subCategory}
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate group-hover:text-neutral-200">
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs font-mono text-neutral-400">
              No se encontraron resultados para "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
