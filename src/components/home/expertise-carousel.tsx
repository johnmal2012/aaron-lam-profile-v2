'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Expertise } from '@/lib/types/expertise';

export function ExpertiseCarousel({ items }: { items: Expertise[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback((api: CarouselApi) => {
    if (!api) return;

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;

    updateScrollState(api);

    api.on('select', updateScrollState);
    api.on('reInit', updateScrollState);

    return () => {
      api.off('select', updateScrollState);
      api.off('reInit', updateScrollState);
    };
  }, [api, updateScrollState]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
          slidesToScroll: 1,
          containScroll: 'trimSnaps',
        }}
        className="relative w-full px-10 sm:px-12 lg:px-14"
      >
        <CarouselContent className="-ml-2">
          {items.slice(0, 16).map((item, index) => (
            <CarouselItem
              key={`${item.text}-${index}`}
              className="min-w-0 shrink-0 basis-1/2 pl-2 md:basis-1/4 md:pl-3 lg:basis-[12.5%]"
            >
              <ConditionCard item={item} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous button */}
        <button
          type="button"
          aria-label="Previous expertise"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
          className="absolute left-1 top-[38%] z-30 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#174f75] bg-[#174f75] text-white shadow-md transition-all hover:bg-[#123b5c] hover:shadow-lg disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:text-slate-500 disabled:opacity-70 sm:left-1 sm:size-10"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </button>

        {/* Next button */}
        <button
          type="button"
          aria-label="Next expertise"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
          className="absolute right-1 top-[38%] z-30 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#174f75] bg-[#174f75] text-white shadow-md transition-all hover:bg-[#123b5c] hover:shadow-lg disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:text-slate-500 disabled:opacity-70 sm:right-1 sm:size-10"
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </button>
      </Carousel>
    </div>
  );
}

function ConditionCard({ item, index }: { item: Expertise; index: number }) {
  const imageSources = [
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=500&q=80',
    'https://www.footcaremd.org/images/librariesprovider2/article-images/achillesrupture.png?sfvrsn=5c7d297d_0',
    'https://footcaremd.org/images/librariesprovider2/banners/ankle-conditions.jpg?sfvrsn=9ff79bc_4',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=500&q=80',
    'https://www.footcaremd.org/images/librariesprovider2/article-images/halluxrigidus.png?sfvrsn=1a74a198_0&MaxWidth=350&MaxHeight=200&ScaleUp=false&Quality=High&Method=ResizeFitToAreaArguments&Signature=9F6B62D061285B96711B66E23230A843B80579D5',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=500&q=80',
  ];

  const content = item.text || 'Foot & Ankle Care';

  const imageSrc =
    item.image?.trim() || imageSources[index % imageSources.length];

  const card = (
    <article className="group flex h-full min-w-0 flex-col items-center">
      <div className="aspect-[1.55/1] w-[88%] shrink-0 overflow-hidden rounded-md bg-slate-200 sm:w-[86%] lg:w-[82%]">
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex w-[88%] flex-1 justify-center px-0.5 pt-3 pb-1 sm:w-[86%] lg:w-[82%]">
        <h3
          className="m-0 block w-full max-w-full text-center font-serif text-[11px] font-semibold leading-[1.35] text-[#123b5c] sm:text-xs lg:text-[10px] xl:text-[11px]"
          style={{
            overflowWrap: 'break-word',
            wordBreak: 'normal',
          }}
        >
          {content}
        </h3>
      </div>
    </article>
  );

  if (!item.url) {
    return card;
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full min-w-0 max-w-full"
    >
      {card}
    </a>
  );
}
