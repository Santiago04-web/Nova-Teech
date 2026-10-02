import React, { useState } from 'react';
import Button from './Button';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function Newsletter({ onSubscribeSuccess }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    setError('');
    setSubscribed(true);
    if (onSubscribeSuccess) {
      onSubscribeSuccess(email);
    }
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="relative p-8 sm:p-14 bg-gradient-to-b from-brand-card to-brand-black border border-white/10 rounded-sm overflow-hidden box-glow">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/5 blur-3xl pointer-events-none" />

        <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-neutral-400 mb-3 block">
          // MEMBERSHIP & DROPS //
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display">
          ENTRA AL UNIVERSO NOVA TEECH
        </h2>

        <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto">
          Recibe novedades, nuevas colecciones y promociones directamente en tu correo antes que nadie.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm flex items-center justify-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>¡Bienvenido a NOVA TEECH! Usa el código <strong>NOVACLUB10</strong> para un 10% OFF.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3.5 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="shrink-0"
              >
                QUIERO ESTAR DENTRO
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-400 font-mono">{error}</p>
            )}
            <p className="mt-3 text-[11px] text-neutral-500 font-mono">
              Al suscribirte aceptas nuestra política de tratamiento de datos. Cero spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
