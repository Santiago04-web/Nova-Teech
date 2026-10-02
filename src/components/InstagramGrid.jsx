import React from 'react';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { INSTAGRAM_POSTS } from '../data/products';

export default function InstagramGrid() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] uppercase text-neutral-400 mb-2.5 flex items-center gap-2">
          <span className="inline-block w-4 h-[1px] bg-neutral-500"></span>
          COMUNIDAD URBANA
          <span className="inline-block w-4 h-[1px] bg-neutral-500"></span>
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display">
          SIGUE NUESTRO ESTILO
        </h2>

        <a
          href="https://instagram.com/novateech"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm sm:text-base font-mono text-neutral-300 hover:text-white transition-colors"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>@novateech</span>
        </a>
      </div>

      {/* Grid of 6 Instagram Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com/novateech"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-brand-card rounded-sm border border-white/5"
          >
            <img
              src={post.image}
              alt="Nova Teech Streetwear Instagram look"
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white p-2">
              <InstagramIcon className="w-6 h-6 mb-1 text-white" />
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current text-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  {post.comments}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Follow Button */}
      <div className="mt-10 sm:mt-12 flex justify-center">
        <Button
          variant="outline"
          size="md"
          href="https://instagram.com/novateech"
          target="_blank"
          rel="noopener noreferrer"
          icon={ArrowUpRight}
          iconPosition="right"
        >
          SEGUIR EN INSTAGRAM
        </Button>
      </div>
    </section>
  );
}
