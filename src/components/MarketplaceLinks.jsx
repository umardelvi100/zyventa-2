import { ArrowUpRight } from 'lucide-react';

// Marketplaces Zyventa sells on. Each has its own button and link, so a
// customer goes straight to the listing on the marketplace they prefer.
export const MARKETPLACES = [
  { key: 'amazon', name: 'Amazon', logo: '/assets/logos/marketplaces/amazon.svg', width: 120, height: 40 },
  { key: 'noon', name: 'noon', logo: '/assets/logos/marketplaces/noon.png', width: 288, height: 108 },
];

// Logo-only badges, used in the "Selected products also on" banner.
export function MarketplaceBadges({ className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {MARKETPLACES.map((m) => (
        <li key={m.key} className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-brand-border bg-white">
          <img src={m.logo} alt={m.name} width={m.width} height={m.height} className="h-6 w-auto" />
        </li>
      ))}
    </ul>
  );
}

// "Buy online" block for a product: one row per pack size, with a separate
// Amazon and noon button for each (a button is left out when the sheet has no link).
export default function MarketplaceLinks({ product, className = '' }) {
  const listings = (product.marketplaces || []).filter((l) => MARKETPLACES.some((m) => l[m.key]));
  if (listings.length === 0) return null;

  return (
    <div className={className}>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-60">Buy online</p>
      <div className="mt-2.5 space-y-3">
        {listings.map((listing) => (
          <div key={listing.label || 'default'} className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {listing.label && (
              <span className="w-full text-xs font-semibold text-ink-80 -mb-0.5">{listing.label}</span>
            )}
            {MARKETPLACES.filter((m) => listing[m.key]).map((m) => (
              <a
                key={m.key}
                href={listing[m.key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buy ${product.name}${listing.label ? ` (${listing.label})` : ''} on ${m.name}`}
                title={`Buy on ${m.name}`}
                className="group/mk inline-flex items-center gap-2 h-11 pl-3.5 pr-3 rounded-lg border border-brand-border bg-white transition-all hover:border-brand-navy hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
              >
                <img src={m.logo} alt="" width={m.width} height={m.height} className="h-6 w-auto" />
                <ArrowUpRight className="w-4 h-4 text-ink-60 transition-transform group-hover/mk:translate-x-0.5 group-hover/mk:-translate-y-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
