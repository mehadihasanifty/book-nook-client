"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const slides = [
  {
    title: "A small library, open to everyone",
    description:
      "Browse the shelf, borrow a book for a week, or leave one you have finished for the next reader. Free to join, and it takes a minute.",
    image: "/slider-img-main.jpg",
    highlight: "everyone",
  },
  {
    title: "Discover Your Next Great Book",
    description:
      "Explore thousands of books, from timeless classics to modern bestsellers, all in one place.",
    image: "/slider-img1.jpg",
    highlight: "Great Book",
  },
  {
    title: "Every Book Opens a New World",
    description:
      "Travel through different stories, discover new perspectives, and let your imagination grow.",
    image: "/slider-img2.jpg",
    highlight: "New World",
  },
  {
    title: "Find Stories Worth Sharing",
    description:
      "From inspiring journeys to unforgettable adventures, your next favorite read is waiting for you.",
    image: "/slider-img3.jpg",
    highlight: "Worth Sharing",
  },
];

const HeroBanner = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const isMounted = useSyncExternalStore(
    (subscribe) => subscribe,
    () => true,
    () => false,
  );

  return (
    <section className="w-full bg-[#94ec8d] px-3 py-3 dark:bg-[#071F17] sm:px-5 sm:py-4">
      {!isMounted ? (
        <div className="min-h-[500px] w-full rounded-[2.5rem] bg-[#F8F6F0] dark:bg-[#0E241C] sm:min-h-[600px]" />
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          direction="horizontal"
          effect="slide"
          loop={true}
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={setSwiperInstance}
          className="swiper-no-swiping relative w-full"
        >
          {slides.map((slide, ind) => (
            <SwiperSlide key={ind}>
              <div className="grid min-h-[500px] grid-cols-1 overflow-hidden rounded-[2.5rem] bg-[#F8F6F0] shadow-[0_24px_60px_rgba(7,31,23,0.18)] dark:bg-[#0E241C] sm:min-h-[600px] lg:grid-cols-[1.05fr_1fr]">
                {/* Left: content panel */}
                <div className="relative flex flex-col justify-center gap-6 px-7 py-12 sm:px-12 sm:py-14 lg:px-14">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#174D38]/20 bg-[#174D38]/5 px-4 py-2 text-[12px] font-semibold tracking-wide text-[#174D38] dark:border-[#D5B477]/25 dark:bg-transparent dark:text-[#D5B477]">
                    <span className="h-2 w-2 rounded-full bg-[#C5EF70]" />
                    Welcome to BookNook
                  </span>

                  <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[1.15] text-[#1D241D] sm:text-5xl lg:text-[3.4rem] dark:text-[#F5EFE3]">
                    {slide.title.split(slide.highlight)[0]}
                    <span className="relative inline-block">
                      <span className="relative z-10">{slide.highlight}</span>
                      <span className="absolute inset-x-0 bottom-1 h-3.5 rounded-full bg-[#F3B54A]/50" />
                    </span>
                    {slide.title.split(slide.highlight)[1]}
                  </h1>

                  <p className="max-w-xl text-base leading-7 text-[#6B6F63] sm:text-lg sm:leading-8 dark:text-gray-400">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-7">
                    <Link
                      href="/books"
                      className="group inline-flex items-center gap-3 rounded-full bg-[#174D38] px-7 py-3.5 font-semibold text-[#F5EFE3] shadow-md shadow-[#174D38]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#103B2B] hover:shadow-lg"
                    >
                      Browse Books
                      <ArrowRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      href="/register"
                      className="text-[13px] font-semibold tracking-wide text-[#174D38] underline decoration-[#F3B54A]/70 decoration-2 underline-offset-4 transition-colors hover:text-[#103B2B] dark:text-[#D5B477] dark:hover:text-[#E5C88F] sm:text-sm"
                    >
                      Join for free
                    </Link>
                  </div>

                  {/* Slide progress footer */}
                  <div className="mt-4 flex items-center gap-6 border-t border-[#174D38]/10 pt-6 dark:border-gray-800">
                    <span className="whitespace-nowrap font-serif text-xl text-[#174D38] dark:text-[#D5B477]">
                      0{ind + 1}
                      <span className="text-sm text-[#A18A62]">
                        {" "}
                        / 0{slides.length}
                      </span>
                    </span>

                    <span className="flex flex-1 gap-2">
                      {slides.map((_, pos) => (
                        <span
                          key={pos}
                          className={`h-1.5 flex-1 rounded-full ${
                            pos === ind
                              ? "bg-[#174D38] dark:bg-[#D5B477]"
                              : "bg-[#174D38]/15 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>

                {/* Right: arched image window */}
                <div className="relative flex min-h-[320px] items-end justify-center bg-gradient-to-b from-[#0E4630] to-[#071F17] px-6 pb-0 pt-10 sm:px-12 lg:pt-14">
                  <div className="absolute left-6 top-6 hidden rounded-full border border-[#D5B477]/30 px-4 py-2 font-serif text-[12px] tracking-[2px] text-[#E7C995] lg:block">
                    THE READING CORNER
                  </div>

                  <div className="relative z-10 h-full max-h-[500px] w-full max-w-[430px] overflow-hidden rounded-t-[999px] rounded-b-[1.4rem] border border-[#D5B477]/40 shadow-[0_-10px_40px_rgba(7,31,23,0.45)]">
                    <div
                      className="absolute inset-0 bg-center bg-cover"
                      style={{ backgroundImage: `url('${slide.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071F17]/85 via-[#071F17]/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-5 pb-4">
                      <span className="font-serif text-lg text-white">
                        {slide.highlight}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#E7C995]">
                        0{ind + 1} of 0{slides.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Previous Button */}
          <button
            ref={prevRef}
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="absolute bottom-6 right-[4.6rem] z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#071F17]/70 text-[#F5EFE3] backdrop-blur-sm transition hover:bg-[#174D38]"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Custom Next Button */}
          <button
            ref={nextRef}
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="absolute bottom-6 right-6 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#071F17]/70 text-[#F5EFE3] backdrop-blur-sm transition hover:bg-[#174D38]"
          >
            <ChevronRight size={24} />
          </button>
        </Swiper>
      )}
    </section>
  );
};

export default HeroBanner;
