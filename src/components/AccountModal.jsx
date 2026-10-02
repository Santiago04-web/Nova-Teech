import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight, Check } from 'lucide-react';
import Button from './Button';

export default function AccountModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-brand-dark border border-white/15 w-full max-w-md rounded-sm overflow-hidden shadow-2xl z-10 p-6 sm:p-8 animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <img
            src="/assets/badge.png"
            alt="Logo NT"
            className="w-12 h-12 rounded-full border border-white/20 mx-auto mb-3"
          />
          <h3 className="text-xl font-black tracking-tight text-white uppercase font-display">
            {mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {mode === 'login'
              ? 'Accede a tus pedidos y drops exclusivos de NOVA TEECH.'
              : 'Regístrate y obtén 10% OFF en tu primera compra.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-white/5 border border-white/15 text-center space-y-2">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-white">¡Sesión iniciada con éxito!</p>
            <p className="text-xs text-neutral-400">Bienvenido de vuelta al universo Nova Teech.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1.5">
                CORREO ELECTRÓNICO
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@novateech.com"
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1.5">
                CONTRASEÑA
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
            >
              {mode === 'login' ? 'INGRESAR' : 'CREAR MI CUENTA'}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-xs text-neutral-400 hover:text-white underline font-mono"
              >
                {mode === 'login'
                  ? '¿No tienes cuenta? Regístrate aquí'
                  : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
