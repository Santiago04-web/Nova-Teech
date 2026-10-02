import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer({ onNavigateCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black border-t border-white/10 text-neutral-400 text-xs font-light pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Col 1: NOVA TEECH Brand */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/badge.png"
                alt="Nova Teech Logo"
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <span className="text-lg font-black tracking-widest text-white uppercase font-display">
                NOVA TEECH
              </span>
            </div>
            <p className="text-neutral-300 font-normal italic mb-4">
              "Moda, estilo y actitud."
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              Ropa urbana contemporánea con textiles de primera línea. Piezas diseñadas para quienes buscan distinción sin esfuerzo.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/novateech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/573044153358"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: TIENDA */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase mb-4">
              TIENDA
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#productos"
                  onClick={() => onNavigateCategory && onNavigateCategory('HOMBRE')}
                  className="hover:text-white transition-colors"
                >
                  Hombre
                </a>
              </li>
              <li>
                <a
                  href="#productos"
                  onClick={() => onNavigateCategory && onNavigateCategory('MUJER')}
                  className="hover:text-white transition-colors"
                >
                  Mujer
                </a>
              </li>
              <li>
                <a
                  href="#nueva-coleccion"
                  className="hover:text-white transition-colors"
                >
                  Nuevos Drops
                </a>
              </li>
              <li>
                <a
                  href="#productos"
                  onClick={() => onNavigateCategory && onNavigateCategory('OFERTAS')}
                  className="hover:text-white transition-colors"
                >
                  Ofertas Especiales
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: AYUDA */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase mb-4">
              AYUDA
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Tiempos de Envío
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">
                  Cambios y Devoluciones
                </a>
              </li>
              <li>
                <a href="https://wa.me/573044153358" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: LEGAL */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase mb-4">
              LEGAL
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Términos y condiciones
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Política de privacidad
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Tratamiento de datos personales
                </span>
              </li>
              <li className="pt-2 text-[11px] text-neutral-500 font-mono">
                NIT: 800117785-9 <br />
                Cámara de Comercio de Cali
              </li>
            </ul>
          </div>

          {/* Col 5: CONTACTO */}
          <div id="contacto">
            <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase mb-4">
              CONTACTO
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <a href="mailto:soporte@novateech.online" className="hover:text-white transition-colors break-all">
                  soporte@novateech.online
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <a href="tel:+573044153358" className="hover:text-white transition-colors">
                  +57 304 415 3358
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  CL 34 NORTE # 53 - 247 CS 4<br />
                  Cali, Colombia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-neutral-500 font-mono text-center sm:text-left">
            © {new Date().getFullYear()} NOVA TEECH. Todos los derechos reservados. Diseñado para elevar tu estilo.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>COMPRA 100% SEGURA</span>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors rounded"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
