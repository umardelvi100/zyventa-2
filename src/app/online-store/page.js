'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import ProductDetailModal from '@/components/ProductDetailModal';
import HomeCta from '@/components/HomeCta';
import { SearchField, ChipGroup, ProductCard, ProductGrid, EmptyState } from '@/components/Catalog';
import { MarketplaceBadges } from '@/components/MarketplaceLinks';

const CATEGORIES = ['All', 'Dermatology', 'CNS & Neurology', 'Orthopedic & Pain Care', 'Anorectal Care'];

export default function OnlineStorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const filtered = contentData.products
    .filter((p) => p.isStore)
    .filter((p) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = [p.name, p.composition, p.tagline, p.category]
        .some((field) => field && field.toLowerCase().includes(searchLower));
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div>
      <PageHeader eyebrow="Consumer healthcare" title={<>The <em>online</em> store.</>}>
        Consumer health formulations, scar care gels, neuro-nutrients, relaxation botanicals and topical pain relief, direct from Zyventa Biocare.
      </PageHeader>

      <section className="py-14 sm:py-20 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* E-commerce marketing: the same products are sold on the marketplaces */}
          <aside className="mb-14 rounded-r-xl border-l-4 border-brand-green bg-brand-sand p-6 sm:p-8" aria-label="Also available on online marketplaces">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-60">Selected products also on</p>
              <MarketplaceBadges />
            </div>
            <p className="mt-5 max-w-3xl text-base sm:text-lg text-ink-80 leading-relaxed">
              Our digital marketing extends to e-commerce. Alongside our own online store, selected Zyventa Biocare products are available on leading online marketplaces such as Amazon, noon and Trendyol, making it easier for customers across the region to find and order them.
            </p>
          </aside>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-4">
              <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="Search store products" />
            </div>
            <div className="lg:col-span-8 lg:justify-self-end">
              <ChipGroup options={CATEGORIES} value={selectedCategory} onChange={setSelectedCategory} />
            </div>
          </div>

          <div className="mt-12 mb-5 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-60">
            <span>
              <span className="font-display text-2xl text-brand-navy mr-1.5">{filtered.length}</span>
              products
            </span>
            <a href={contentData.site.ecommerceUrl} target="_blank" rel="noopener noreferrer" className="link-accent text-sm">
              Shop on our online portal <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {filtered.length > 0 ? (
            <ProductGrid>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={setActiveModalProduct} actionLabel="View and order" showMarketplaces />
              ))}
            </ProductGrid>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </section>

      <HomeCta />

      {activeModalProduct && (
        <ProductDetailModal product={activeModalProduct} onClose={() => setActiveModalProduct(null)} showMarketplaces />
      )}
    </div>
  );
}
