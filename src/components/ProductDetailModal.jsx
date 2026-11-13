'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProductVisual, imageRatio } from '@/components/Catalog';

export default function ProductDetailModal({ product, onClose }) {
  const variants = product.images || [];
  const [variantIndex, setVariantIndex] = useState(0);
  const shown = variants[variantIndex] ? { ...product, image: variants[variantIndex].src } : product;

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const specs = [
    ['Active composition', product.composition],
    ['Available strengths', product.availableStrengths],
    ['Pack size', product.packSize],
  ].filter(([, value]) => value);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-darkBlue/70 backdrop-blur-sm animate-fade-up"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative bg-brand-paper rounded-md w-full max-h-[90vh] overflow-hidden flex flex-col"
        // Width follows the photo's shape (narrow for square photos, wide for wide ones)
        // so the photo shows whole with nothing around it.
        style={{ maxWidth: `min(48rem, max(24rem, calc(62vh * ${imageRatio(product.image).toFixed(3)})))` }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-brand-border hover:border-brand-navy flex items-center justify-center text-brand-navy transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="overflow-y-auto">
          {/* Product visual */}
          <div className="relative overflow-hidden">
            <ProductVisual fill product={shown} />
            {variants.length > 1 && (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 p-3 bg-gradient-to-t from-black/40 to-transparent" role="tablist" aria-label="Select strength">
                {variants.map((v, i) => (
                  <button
                    key={v.src}
                    type="button"
                    role="tab"
                    aria-selected={i === variantIndex}
                    onClick={() => setVariantIndex(i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${i === variantIndex ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white text-brand-navy border-brand-border hover:border-brand-navy'}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap gap-1.5">
              <span className="tag tag-neutral">{product.category}</span>
              {product.prescription && (
                <span className={`tag ${product.isRx ? 'tag-rx' : 'tag-otc'}`}>{product.prescription}</span>
              )}
            </div>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{product.name}</h2>
            {product.tagline && <p className="mt-2 text-brand-blue font-semibold">{product.tagline}</p>}
            {product.description && <p className="mt-4 text-sm text-ink-80 leading-relaxed">{product.description}</p>}

            {specs.length > 0 && (
              <dl className="mt-8 border-t border-brand-navy">
                {specs.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-3 gap-4 py-3 border-b border-brand-border text-sm">
                    <dt className="field-label !mb-0 pt-0.5">{label}</dt>
                    <dd className="col-span-2 text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.closingLine && (
              <p className="mt-6 font-display text-lg italic text-brand-navy">{product.closingLine}</p>
            )}

          </div>
        </div>

        <div className="px-6 sm:px-10 py-4 border-t border-brand-border bg-white flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-60">Available across UAE and GCC distribution channels</p>
        </div>
      </div>
    </div>
  );
}
