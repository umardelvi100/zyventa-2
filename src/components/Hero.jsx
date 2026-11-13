import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import { CountUp } from '@/components/Motion';

export default function Hero() {
  return (
    <section id="hero" className="bg-brand-paper pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center reveal">
          <div className="lg:col-span-7">
            <h1 className="display text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">
              Creating a <em>healthy</em> tomorrow, across the Middle East &amp; North&nbsp;Africa.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-ink-80 leading-relaxed">
              We connect global pharmaceutical and biotechnology companies with the patients who need them, from registration to the pharmacy shelf.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/contact-us" className="btn btn-accent">
                Partner with us <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/services" className="link-accent">
                See what we do <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none pb-6">
            <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/hero-dubai-bridge.webp"
                alt="Pedestrian bridge at sunset with the Dubai skyline in the distance"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute left-4 right-4 bottom-0 sm:left-6 sm:right-6 rounded-2xl bg-white p-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)] border-l-4 border-brand-green">
              <p className="font-display text-xl sm:text-2xl leading-tight text-brand-navy">Global partnerships. Local understanding.</p>
              <p className="mt-1.5 text-sm text-ink-80">Discover the people and purpose behind Zyventa.</p>
              <Link href="/about-us" className="link-accent mt-2 text-sm">
                About Zyventa <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Key figures */}
        <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 bg-brand-navy text-white rounded-md overflow-hidden">
          {contentData.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-10 px-6 border-white/15 ${i % 2 === 1 ? 'border-l' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              {stat.value ? (
                <dd className="font-display text-4xl sm:text-5xl text-white">
                  <CountUp value={stat.value} /><span className="text-brand-green">{stat.suffix}</span>
                </dd>
              ) : (
                <dd className="font-display text-2xl sm:text-3xl text-brand-green leading-snug min-h-[3rem] flex items-center">
                  Worldwide
                </dd>
              )}
              <dd className="mt-2 text-sm font-semibold text-white">{stat.label}</dd>
              <dd className="mt-1 text-xs sm:text-sm text-brand-onDarkMuted leading-relaxed">{stat.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="h-16 sm:h-24" />
    </section>
  );
}
