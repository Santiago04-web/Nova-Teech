import React from 'react';
import CategoryCard from './CategoryCard';
import SectionTitle from './SectionTitle';
import { CATEGORIES } from '../data/products';

export default function CategoriesSection({ onSelectCategory }) {
  return (
    <section id="categorias" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionTitle
        eyebrow="EXPLORA POR LÍNEA"
        title="CATEGORÍAS"
        subtitle="Prendas estructuradas que redefinen la silueta urbana. Selecciona tu estilo y encuentra tu identidad."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={() => onSelectCategory(category.title)}
          />
        ))}
      </div>
    </section>
  );
}
