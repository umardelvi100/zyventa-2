'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import { CountUp } from '@/components/Motion';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="hero" className="bg-brand-paper pt-20">
      {/* Headline over the photo: statement on the faded left, pharmacy photo on the right */}
      <div className="relative isolate overflow-hidden">
        <div
          className="hidden lg:block absolute inset-y-0 right-0 -z-10 w-[76%] h-full"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, #000 42%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, #000 42%)' }}
          aria-hidden="true"
        >
          <img src="/assets/images/hero-pharmacy-products.webp" alt="" width={1672} height={941} fetchPriority="high" className="hero-fade-a absolute inset-0 h-full w-full object-cover object-right" />
          <img src="/assets/images/hero-pharmacy-closeup.webp" alt="" width={1160} height={652} className="hero-fade-b absolute inset-0 h-full w-full object-cover object-[40%_center] opacity-0" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:min-h-[34rem] flex items-center">
            <div className="py-14 sm:py-20 lg:max-w-[46%] reveal">
              <h1 className="display max-w-[26rem] sm:max-w-none lg:max-w-[26rem] text-[2.6rem] sm:text-6xl lg:text-[3rem]">
                Your partner in creating a <em>healthier</em> tomorrow.
              </h1>
              <p className="mt-7 max-w-[27rem] text-lg text-ink-80 leading-relaxed">
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
          </div>
        </div>
        {/* Photo below the text on tablet and phone */}
        <div className="lg:hidden relative w-full aspect-[1672/941] overflow-hidden">
          <img
            src="/assets/images/hero-pharmacy-products.webp"
            alt="Zyventa Biocare pain-care products on display in a Dubai pharmacy and distribution centre"
            width={1672}
            height={941}
            className="hero-fade-a absolute inset-0 h-full w-full object-cover"
          />
          <img
            src="/assets/images/hero-pharmacy-closeup.webp"
            alt=""
            width={1160}
            height={652}
            className="hero-fade-b absolute inset-0 h-full w-full object-cover opacity-0"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Key figures */}
        <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 bg-brand-navy text-white rounded-md overflow-hidden">
          {contentData.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-3 sm:py-3.5 px-5 sm:px-6 border-white/15 ${i % 2 === 1 ? 'border-l' : ''} ${i === 2 ? 'lg:border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              {stat.display ? (
                // A word instead of a figure (e.g. "Worldwide"), in the accent colour.
                <dd className="font-display text-2xl sm:text-3xl leading-none text-brand-green">{stat.display}</dd>
              ) : (
                <dd className="font-display text-2xl sm:text-3xl leading-none text-white">
                  <CountUp value={stat.value} /><span className="text-brand-green">{stat.suffix}</span>
                </dd>
              )}
              <dd className="mt-1.5 text-sm font-semibold text-white">{stat.label}</dd>
              <dd className="text-xs text-brand-onDarkMuted leading-snug">{stat.description}</dd>
            </div>
          ))}
        </dl>

        {/* Company film */}
        <figure className="mt-14 sm:mt-20 reveal" style={{ animationDelay: '.15s' }}>
          <div className="relative aspect-[21/9] w-full bg-brand-navy overflow-hidden rounded-md">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
              aria-label="Zyventa Biocare company film"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={contentData.site.videoSrc} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={togglePlay}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-paper/90 text-brand-navy text-xs font-bold hover:bg-brand-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </figure>
      </div>
      <div className="h-16 sm:h-24" />
    </section>
  );
}
