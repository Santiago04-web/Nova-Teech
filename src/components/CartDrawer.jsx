import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from './Button';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 250000;
  const freeShippingRemaining = freeShippingThreshold - subtotal;
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    const itemsList = cartItems
      .map(i => `• ${i.quantity}x ${i.name} (Talla: ${i.selectedSize || 'M'}, Color: ${i.selectedColor || 'Negro'}) - ${formatPrice(i.price * i.quantity)}`)
      .join('%0A');
    const totalText = formatPrice(subtotal);
    const message = `Hola Nova Teech, quiero realizar este pedido:%0A%0A${itemsList}%0A%0A*Total: ${totalText}*%0A%0APor favor confírmenme disponibilidad para pagar.`;
    window.open(`https://wa.me/573044153358?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-dark border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-base font-bold font-mono tracking-widest uppercase text-white">
                TU CARRITO ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="px-6 py-3 bg-brand-card/60 border-b border-white/5">
            <div className="flex justify-between text-[11px] font-mono text-neutral-300 mb-1.5">
              <span>
                {freeShippingRemaining > 0
                  ? `Faltan ${formatPrice(freeShippingRemaining)} para ENVÍO GRATIS`
                  : '¡Felicidades! Tienes ENVÍO GRATIS 🎉'}
              </span>
              <span>{shippingPercent}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <ShoppingBag className="w-12 h-12 text-neutral-600 mb-4 stroke-1" />
                <p className="text-neutral-400 text-sm font-light">Tu carrito está vacío.</p>
                <p className="text-neutral-500 text-xs mt-1">Explora la colección y encuentra tu outfit.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="mt-6"
                >
                  SEGUIR COMPRANDO
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-brand-card/40 border border-white/5 rounded-sm"
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-center rounded-sm bg-neutral-900 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-white tracking-wide line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedColor, item.selectedSize)}
                          className="text-neutral-500 hover:text-red-400 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 mt-1 flex items-center gap-2">
                        <span>Talla: {item.selectedSize || 'M'}</span>
                        <span>•</span>
                        <span>{item.selectedColor || 'Negro'}</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white mt-1">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/10 rounded-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-brand-black/90 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>ENVÍO</span>
                  <span>{subtotal >= freeShippingThreshold ? 'GRATIS' : 'Calculado al finalizar'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>TOTAL ESTIMADO</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={handleWhatsAppCheckout}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  FINALIZAR POR WHATSAPP
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PAGO 100% PROTEGIDO Y VERIFICADO</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
