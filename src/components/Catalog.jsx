import { Search, ArrowRight, ArrowUpRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import imageSizes from '@/data/imageSizes.json';
import imageFit from '@/data/imageFit.json';
import { Reveal } from '@/components/Motion';
import MarketplaceLinks from '@/components/MarketplaceLinks';

const { productBadges } = contentData;

// Soft tint + strong accent per therapy area. Pack shots have white
// backgrounds, so they sit on these tints with mix-blend-multiply.
export const THERAPY_STYLES = {
  'Cardiovascular': { tint: '#FBE6E4', accent: '#B42318', short: 'CV' },
  'CNS & Neurology': { tint: '#ECE6F6', accent: '#5B3A8E', short: 'CNS' },
  'Orthopedic & Pain Care': { tint: '#FCEBDA', accent: '#B4561A', short: 'Ortho' },
  'Metabolic & Diabetes': { tint: '#E2F2EC', accent: '#1F7A5C', short: 'Metabolic' },
  'Dermatology': { tint: '#FBE8F0', accent: '#A23B67', short: 'Derma' },
  'Anorectal Care': { tint: '#E3EEF7', accent: '#1D5F8A', short: 'Anorectal' },
};
const DEFAULT_STYLE = { tint: '#EEF1F4', accent: '#334155', short: '' };
export const therapyStyle = (category) => THERAPY_STYLES[category] || DEFAULT_STYLE;

const verifiedPacks = new Set(contentData.packShotVerified || []);
export const hasPackShot = (product) => verifiedPacks.has(product.id);

// Real pixel size of every product photo (generated from the files in
// public/assets/images). Lets each image box take its photo's exact shape, so
// photos show whole with no bars, borders or cropping, and the page doesn't
// jump while they load.
const FALLBACK_SIZE = [3, 2];
export const imageSize = (src) => imageSizes[src] || FALLBACK_SIZE;
export const imageRatio = (src) => {
  const [w, h] = imageSize(src);
  return w / h;
};

// Per-photo tuning for the uniform catalogue-card frame (src/data/imageFit.json).
// Photos are shot with the pack at different distances, so a few need a little zoom
// (scale) and/or a nudge (x, y in % of the frame) to look the same size and centred.
export const imageFitFor = (src) => {
  const f = imageFit[src] || {};
  return { scale: f.scale ?? 1, x: f.x ?? 0, y: f.y ?? 0 };
};

// Real pack shot when we have one; otherwise a designed pack graphic so a
// product never shows another company's logo or another product's box.
// `fill` renders the photo edge to edge at its own proportions: no frame, tint or padding.
// `frame` fills a parent of fixed size (the uniform catalogue-card image area): the whole
// photo, centred, never stretched or cropped, with optional per-photo scale/offset.
export function ProductVisual({ product, size = 'card', imgClassName = '', fill = false, frame = false }) {
  const style = therapyStyle(product.category);
  if (hasPackShot(product) && frame) {
    const { scale, x, y } = imageFitFor(product.image);
    const [w, h] = imageSize(product.image);
    return (
      <img
        src={product.image}
        alt={product.name}
        width={w}
        height={h}
        className={`absolute inset-0 h-full w-full object-contain object-center ${imgClassName}`}
        style={scale !== 1 || x || y ? { transform: `translate(${x}%, ${y}%) scale(${scale})` } : undefined}
        loading="lazy"
      />
    );
  }
  if (hasPackShot(product) && fill) {
    const [w, h] = imageSize(product.image);
    return (
      <img
        src={product.image}
        alt={product.name}
        width={w}
        height={h}
        className={`block w-full h-auto ${imgClassName}`}
        loading="lazy"
      />
    );
  }
  if (hasPackShot(product)) {
    return (
      <img
        src={product.image}
        alt=""
        className={`max-h-full max-w-full object-contain ${imgClassName}`}
        loading="lazy"
      />
    );
  }
  if (size === 'thumb') {
    return (
      <span className="w-full h-full rounded-md flex items-center justify-center font-display text-sm font-bold text-white" style={{ background: style.accent }}>
        {product.name.slice(0, 2)}
      </span>
    );
  }
  const form = (product.packSize || '').split(' ').slice(1).join(' ') || (product.isRx ? 'Prescription' : 'OTC');
  return (
    <span className={`relative flex w-[72%] max-w-[15rem] aspect-[16/10] rounded-lg bg-white shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)] overflow-hidden ${imgClassName}`}>
      <span className="w-3 shrink-0" style={{ background: style.accent }} />
      <span className="flex-1 flex flex-col justify-between p-3 sm:p-4 text-left">
        <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: style.accent }}>{product.category}</span>
        <span>
          <span className="block font-display text-xl sm:text-2xl leading-none text-ink">{product.name}</span>
          {product.availableStrengths && (
            <span className="block mt-1 text-[10px] text-ink-60 line-clamp-1">{product.availableStrengths}</span>
          )}
        </span>
        <span className="text-[9px] text-ink-60 line-clamp-1">{form}</span>
      </span>
    </span>
  );
}

// Achievement badges from the company portfolio (first-to-market, owned brands).
export function productHighlights(id) {
  const out = [];
  if (productBadges.firstToMarket.includes(id)) out.push('First to market');
  if (productBadges.firstGeneric.includes(id)) out.push('First generic in UAE');
  if (productBadges.owned.includes(id)) out.push('Zyventa Biocare brand');
  return out;
}

// Shared building blocks for the product range and online store pages.

export function SearchField({ value, onChange, placeholder, compact = false }) {
  if (compact) {
    return (
      <label className="relative block w-full">
        <span className="sr-only">{placeholder}</span>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-60" aria-hidden="true" />
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field !rounded-full !pl-10 !py-2.5"
        />
      </label>
    );
  }
  return (
    <label className="relative block w-full">
      <span className="sr-only">{placeholder}</span>
      <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy" aria-hidden="true" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-brand-navy/30 pl-8 pr-2 py-3 font-display text-lg sm:text-2xl text-brand-navy placeholder:text-slate-400 focus:outline-none focus:border-brand-green"
      />
    </label>
  );
}

export function ChipGroup({ label, options, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="field-label !mb-0 mr-2">{label}</span>}
      {options.map((opt) => {
        const key = typeof opt === 'string' ? opt : opt.value;
        const text = typeof opt === 'string' ? opt : opt.label;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`chip ${value === key ? 'chip-active' : ''}`}
            aria-pressed={value === key}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}

// Therapy-area tiles that double as the main category filter.
export function TherapyTiles({ categories, products, value, onChange }) {
  return (
    <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {categories.map((cat) => {
        const items = products.filter((p) => p.category === cat);
        const style = therapyStyle(cat);
        const active = value === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(active ? 'All' : cat)}
            aria-pressed={active}
            className={`group relative text-left rounded-xl p-6 pb-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${
              active ? 'ring-2 ring-offset-2 ring-offset-brand-paper' : ''
            }`}
            style={{ background: style.tint, '--tw-ring-color': style.accent }}
          >
            <div className="flex -space-x-5 h-20">
              {[...items].sort((a, b) => hasPackShot(b) - hasPackShot(a)).slice(0, 3).map((p) => (
                <span key={p.id} className="w-20 h-20 rounded-xl bg-white/70 flex items-center justify-center p-2 border border-white">
                  <ProductVisual product={p} size="thumb" />
                </span>
              ))}
            </div>
            <p className="mt-6 font-display text-2xl sm:text-[1.7rem] leading-tight" style={{ color: style.accent }}>{cat}</p>
            <p className="mt-2 text-sm font-semibold text-ink-60">
              {items.length} {items.length === 1 ? 'product' : 'products'}
            </p>
            <ArrowUpRight
              className="absolute top-5 right-5 w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: style.accent }}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </Reveal>
  );
}

// Compact cards for the first-to-market launches. `items` are { name, use, product? }:
// ones that match a catalogue product show its photo (whole, at its own proportions)
// and open its details; the rest are text-only. An even grid with one fixed photo
// frame keeps every card in a row aligned and the same height.
export function Spotlight({ items, onOpen }) {
  const cardClass = 'flex h-full w-full flex-col text-left rounded-xl overflow-hidden bg-white/5 border border-white/10';
  return (
    <Reveal stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
      {items.map(({ name, use, product }) => {
        const body = (
          <>
            {product && hasPackShot(product) && (
              <span className="block relative aspect-[4/3] shrink-0 overflow-hidden bg-brand-paper">
                <ProductVisual frame product={product} />
              </span>
            )}
            <span className="block flex-1 p-4">
              <span className="block font-display text-lg leading-snug text-brand-paper">{name}</span>
              {use && <span className="block mt-1 text-xs text-brand-onDarkMuted leading-relaxed">{use}</span>}
            </span>
          </>
        );
        return product ? (
          <button
            key={name}
            type="button"
            onClick={() => onOpen(product)}
            className={`group ${cardClass} hover:border-brand-green transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green`}
          >
            {body}
          </button>
        ) : (
          <div key={name} className={cardClass}>
            {body}
          </div>
        );
      })}
    </Reveal>
  );
}

export function ProductCard({ product, onOpen, actionLabel, showMarketplaces = false }) {
  const highlights = productHighlights(product.id);
  const style = therapyStyle(product.category);
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white border border-brand-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-24px_rgb(var(--c-navy)/0.35)]">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block w-full aspect-[4/3] shrink-0 overflow-hidden bg-brand-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
        aria-label={`View ${product.name}`}
      >
        <ProductVisual frame product={product} />
        {highlights.length > 0 && (
          <span className="absolute top-3 left-3 flex flex-col items-start gap-1">
            {highlights.map((h) => (
              <span key={h} className={`tag ${h === 'Zyventa Biocare brand' ? 'bg-brand-navy text-brand-paper' : 'bg-brand-green text-brand-darkBlue'}`}>{h}</span>
            ))}
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-navy opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Quick view <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </button>
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: style.accent }}>
            {product.category}
          </span>
          {product.prescription && (
            <span className={`tag ${product.isRx ? 'tag-rx' : 'tag-otc'}`}>{product.isRx ? 'Rx' : 'OTC'}</span>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl text-brand-navy line-clamp-1">{product.name}</h3>
        {product.tagline && <p className="mt-1 text-sm text-ink-60 line-clamp-2 min-h-[2.5rem]">{product.tagline}</p>}
        {product.composition && (
          <p className="mt-4 pt-4 border-t border-brand-border text-xs text-ink-80 line-clamp-2 min-h-[3.25rem]">
            <span className="font-bold text-brand-blue">Active · </span>
            {product.composition}
          </p>
        )}
        <div className="mt-auto pt-6">
          {showMarketplaces && <MarketplaceLinks product={product} className="mb-6" />}
          <button type="button" onClick={() => onOpen(product)} className="link-accent text-sm">
            {actionLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

// Even grid: every card has the same image frame and stretches to the row height,
// so titles, details and buttons line up across each row.
export function ProductGrid({ children }) {
  return (
    <Reveal
      stagger
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    >
      {children}
    </Reveal>
  );
}

export function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-border py-20 text-center">
      <p className="font-display text-2xl text-brand-navy">No products match your search.</p>
      <button type="button" onClick={onReset} className="link-accent mt-5 text-sm">
        Clear filters
      </button>
    </div>
  );
}
