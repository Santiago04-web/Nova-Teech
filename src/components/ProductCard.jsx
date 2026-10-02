import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onOpenQuickView,
  onToggleWishlist,
  isWishlisted = false
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAddedAnim(true);
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedColor: product.colors[selectedColor]?.name || 'Estándar',
        selectedSize: product.sizes[0] || 'M'
      });
    }
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onOpenQuickView) onOpenQuickView(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-brand-dark/40 border border-white/[0.07] hover:border-white/20 transition-all duration-300 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 2-image swap */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-brand-elevated cursor-pointer"
        onClick={handleQuickView}
      >
        {/* Primary Image */}
        <img
          src={product.image1}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.image2 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image for Hover */}
        {product.image2 && (
          <img
            src={product.image2}
            alt={`${product.name} detalle`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="bg-white text-black font-bold text-[10px] sm:text-xs tracking-wider uppercase px-2 py-0.5 rounded-none shadow-md">
              -{product.discount}%
            </span>
          )}
          {product.tag && (
            <span className="bg-black/80 backdrop-blur-sm text-neutral-300 border border-white/10 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-1.5 py-0.5">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Añadir a favoritos"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-black/60 text-white/70 hover:text-white hover:bg-black/90 border border-white/10'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button (Shows on desktop hover) */}
        <button
          onClick={handleQuickView}
          aria-label="Vista rápida"
          className="hidden sm:flex absolute bottom-14 right-2.5 p-2 rounded-full bg-black/70 backdrop-blur-md text-white/80 hover:text-white hover:bg-black border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Quick Add To Cart Button (Sliding from bottom on hover or visible on mobile) */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 z-10 transition-all duration-300 sm:translate-y-full sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-neutral-200 shadow-xl'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>AGREGADO</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>AGREGAR AL CARRITO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Colors selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(idx)}
                  title={c.name}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    selectedColor === idx ? 'border-white scale-125 ring-1 ring-white/40' : 'border-white/30 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-neutral-400 ml-1 font-mono tracking-wider">
                {product.colors[selectedColor]?.name}
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 
            onClick={handleQuickView}
            className="text-xs sm:text-sm font-medium tracking-wide text-neutral-200 hover:text-white transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-bold text-white font-mono">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-500 line-through font-mono">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
