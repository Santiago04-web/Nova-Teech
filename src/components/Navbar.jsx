import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onNavigateCategory
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'INICIO', href: '#inicio', category: null },
    { label: 'HOMBRE', href: '#productos', category: 'HOMBRE' },
    { label: 'MUJER', href: '#productos', category: 'MUJER' },
    { label: 'NUEVOS', href: '#nueva-coleccion', category: 'NUEVA COLECCIÓN' },
    { label: 'OFERTAS', href: '#productos', category: 'OFERTAS' },
  ];

  const handleLinkClick = (link) => {
    setMobileMenuOpen(false);
    if (link.category && onNavigateCategory) {
      onNavigateCategory(link.category);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile hamburger & Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 text-neutral-300 hover:text-white focus:outline-none"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo NOVA TEECH */}
              <a href="#inicio" className="flex items-center gap-2.5 group">
                <img
                  src="/assets/badge.png"
                  alt="Nova Teech Logo NT"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full border border-white/20 group-hover:border-white/50 transition-all duration-300"
                />
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-black tracking-ultra uppercase text-white font-display">
                    NOVA TEECH
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase -mt-1 hidden sm:block">
                    CLOTHING // CALI
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link)}
                  className="text-xs font-semibold tracking-widest text-neutral-300 hover:text-white uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Actions (Buscar, Cuenta, Carrito) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search button */}
              <button
                onClick={onOpenSearch}
                aria-label="Buscar productos"
                className="p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account button (Desktop) */}
              <button
                onClick={onOpenAccount}
                aria-label="Mi cuenta"
                className="hidden sm:flex p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart button */}
              <button
                onClick={onOpenCart}
                aria-label="Carrito de compras"
                className="relative p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse-subtle">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slideout Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-brand-dark border-r border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/badge.png"
                  alt="NT Logo"
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <span className="font-display font-black text-sm tracking-widest text-white">
                  NOVA TEECH
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links in Mobile */}
            <div className="py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link)}
                  className="flex items-center justify-between text-base font-bold tracking-widest text-neutral-200 hover:text-white uppercase py-2 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom user & info */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="flex items-center gap-3 text-xs tracking-wider font-semibold text-neutral-300 hover:text-white py-2"
            >
              <User className="w-4 h-4" />
              <span>MI CUENTA / INICIAR SESIÓN</span>
            </button>
            <div className="text-[11px] font-mono text-neutral-400">
              soporte@novateech.online <br />
              Cali, Colombia
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
