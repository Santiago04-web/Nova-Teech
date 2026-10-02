import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({
  products = [],
  onAddToCart,
  onOpenQuickView,
  wishlist = [],
  onToggleWishlist,
  selectedCategoryFilter = 'TODOS',
  onSelectCategoryFilter
}) {
  const [activeFilter, setActiveFilter] = useState(selectedCategoryFilter);
  const [sortBy, setSortBy] = useState('featured');

  const filters = ['TODOS', 'HOMBRE', 'MUJER', 'HOODIES', 'CAMISETAS', 'PANTALONES'];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (onSelectCategoryFilter) onSelectCategoryFilter(filter);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (activeFilter !== 'TODOS') {
      result = result.filter(p => {
        if (activeFilter === 'HOMBRE') return p.category === 'Hombre';
        if (activeFilter === 'MUJER') return p.category === 'Mujer';
        if (activeFilter === 'HOODIES') return p.subCategory === 'Hoodies';
        if (activeFilter === 'CAMISETAS') return p.subCategory === 'Camisetas';
        if (activeFilter === 'PANTALONES') return p.subCategory === 'Pantalones';
        return true;
      });
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, activeFilter, sortBy]);

  return (
    <section id="productos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Title */}
      <SectionTitle
        eyebrow="COLECCIÓN ACTIVA"
        title="LO MÁS BUSCADO"
        subtitle="Descubre las prendas que están marcando tendencia en el streetwear contemporáneo."
      />

      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              className={`text-xs font-semibold tracking-widest uppercase px-3.5 py-2 whitespace-nowrap transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-white text-black'
                  : 'bg-brand-card/80 text-neutral-400 hover:text-white hover:bg-brand-elevated border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-neutral-400 font-mono">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden sm:inline">ORDENAR:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-brand-card border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-none focus:outline-none focus:border-white/40 cursor-pointer font-sans"
          >
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificados</option>
          </select>
        </div>
      </div>

      {/* Grid: 2 columns mobile, 3 tablet, 4 desktop */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/10 p-8">
          <p className="text-neutral-400 text-sm">No encontramos productos en esta categoría por ahora.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveFilter('TODOS')}
            className="mt-4"
          >
            VER TODOS LOS PRODUCTOS
          </Button>
        </div>
      )}
    </section>
  );
}
