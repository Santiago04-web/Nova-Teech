import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoriesSection from './components/CategoriesSection';
import ProductGrid from './components/ProductGrid';
import EditorialBanner from './components/EditorialBanner';
import Benefits from './components/Benefits';
import InstagramGrid from './components/InstagramGrid';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import AccountModal from './components/AccountModal';
import WhatsAppButton from './components/WhatsAppButton';
import Toast from './components/Toast';
import { PRODUCTS } from './data/products';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('novateech_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('novateech_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('TODOS');
  const [toast, setToast] = useState(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('novateech_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('novateech_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (title, message = '') => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    const color = product.selectedColor || 'Estándar';
    const size = product.selectedSize || 'M';
    const qtyToAdd = product.quantity || 1;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            selectedColor: color,
            selectedSize: size,
            quantity: qtyToAdd
          }
        ];
      }
    });

    showToast('¡Añadido al carrito!', `${product.name} (Talla: ${size})`);
  };

  const handleUpdateQuantity = (productId, color, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Eliminado de favoritos');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('¡Guardado en favoritos!', 'Encuéntralo en tu lista de deseos');
        return [...prev, productId];
      }
    });
  };

  const handleCategorySelect = (categoryTitle) => {
    const clean = categoryTitle.toUpperCase();
    if (clean.includes('HOMBRE')) setSelectedCategoryFilter('HOMBRE');
    else if (clean.includes('MUJER')) setSelectedCategoryFilter('MUJER');
    else if (clean.includes('NUEVA') || clean.includes('DROP')) setSelectedCategoryFilter('TODOS');
    else if (clean.includes('OFERTAS')) setSelectedCategoryFilter('TODOS');
    else setSelectedCategoryFilter('TODOS');

    // Smooth scroll to products
    const el = document.getElementById('productos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-black text-brand-silver font-sans selection:bg-white selection:text-black">
      {/* 1. Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigateCategory={handleCategorySelect}
      />

      <main>
        {/* 2. Hero Principal */}
        <Hero
          onShopClick={() => {
            const el = document.getElementById('productos');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCollectionClick={() => {
            const el = document.getElementById('categorias');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Categorías */}
        <CategoriesSection onSelectCategory={handleCategorySelect} />

        {/* 4. Productos Destacados */}
        <ProductGrid
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          selectedCategoryFilter={selectedCategoryFilter}
          onSelectCategoryFilter={setSelectedCategoryFilter}
        />

        {/* 5. Banner de Nueva Colección */}
        <EditorialBanner
          onDiscoverClick={() => {
            setSelectedCategoryFilter('TODOS');
            const el = document.getElementById('productos');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Sección de Beneficios */}
        <div id="beneficios">
          <Benefits />
        </div>

        {/* 7. Instagram / Redes */}
        <InstagramGrid />

        {/* 8. Newsletter */}
        <Newsletter
          onSubscribeSuccess={(email) => {
            showToast('¡Te has suscrito con éxito!', 'Revisa tu bandeja para tu cupón de bienvenida.');
          }}
        />
      </main>

      {/* 9. Footer */}
      <Footer onNavigateCategory={handleCategorySelect} />

      {/* Modals & Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
