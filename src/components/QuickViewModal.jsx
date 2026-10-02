import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Shield, Check, Truck, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState(product.image1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'M');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAdd = () => {
    setAdded(true);
    onAddToCart({
      ...product,
      selectedColor: product.colors[selectedColor]?.name || 'Estándar',
      selectedSize,
      quantity
    });
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-brand-dark border border-white/15 w-full max-w-3xl rounded-sm overflow-hidden shadow-2xl z-10 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-black/60 rounded-full z-20 transition-colors"
          aria-label="Cerrar vista rápida"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Section */}
          <div className="p-6 bg-brand-elevated/40 flex flex-col justify-between">
            <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-neutral-900 border border-white/5">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.discount && (
                <span className="absolute top-3 left-3 bg-white text-black font-bold text-xs px-2 py-0.5 uppercase tracking-wider">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.image2 && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveImage(product.image1)}
                  className={`w-14 h-18 rounded-sm overflow-hidden border-2 transition-all ${
                    activeImage === product.image1 ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={product.image1} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.image2)}
                  className={`w-14 h-18 rounded-sm overflow-hidden border-2 transition-all ${
                    activeImage === product.image2 ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={product.image2} alt="Thumbnail 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  {product.category} // {product.subCategory}
                </span>
                <span className="text-neutral-600">•</span>
                <div className="flex items-center text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 text-white font-mono text-[11px]">{product.rating}</span>
                  <span className="ml-1 text-neutral-500 font-mono text-[10px]">({product.reviewsCount})</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-display">
                {product.name}
              </h3>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-mono text-neutral-400 tracking-wider">COLOR:</span>
                    <span className="text-white font-medium">{product.colors[selectedColor]?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColor === idx ? 'border-white scale-110 ring-2 ring-white/40' : 'border-white/20 opacity-70'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-mono text-neutral-400 tracking-wider">TALLA:</span>
                    <span className="text-neutral-400 text-[11px] underline cursor-pointer hover:text-white">Guía de tallas</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-mono font-semibold transition-all border ${
                          selectedSize === s
                            ? 'bg-white text-black border-white'
                            : 'bg-brand-card text-neutral-300 border-white/10 hover:border-white/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 pt-5 border-t border-white/10 space-y-4">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-1"
                  icon={added ? Check : ShoppingBag}
                >
                  {added ? '¡AGREGADO AL CARRITO!' : 'AGREGAR AL CARRITO'}
                </Button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="Guardar en favoritos"
                  className={`p-3 border rounded-sm transition-colors ${
                    isWishlisted
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'border-white/15 text-neutral-300 hover:text-white hover:border-white/40'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Shopping perks badges */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  <span>Envíos a todo Colombia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-white" />
                  <span>Cambios fáciles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
