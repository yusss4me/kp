"use client";

import { useState, useEffect } from "react";
import { Img } from "../atoms/image";
import { Container } from "../atoms/container";

export interface HeroSliderProps {
  slide: {
    id: string;
    src: string;
    alt: string;
  }[];
  className?: string;
}

/**
 * HeroSlider
 * 
 * Komponen slider gambar otomatis untuk bagian hero.
 * Menampilkan rangkaian gambar slide dengan transisi halus, navigasi dot, 
 * dan indikator progres waktu (progress bar).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {HeroSliderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen HeroSlider
 */
export default function HeroSlider({ slide }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slide.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="relative w-full h-full max-w-[600px] aspect-square overflow-hidden bg-black rounded-3xl shadow-2xl">
      {/* Slider Container */}
      <Container
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slide.map((s) => (
          <Container key={s.id} className="min-w-full h-full relative">
            <Img
              src={s.src}
              alt={s.alt}
              fill
              width={undefined}
              height={undefined}
              sizes="(max-width: 600px) 100vw, 600px"
              priority={s.id === '1'}
              className="object-cover"
            />
            <Container className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </Container>
        ))}
      </Container>

      {/* Dots Navigation */}
      <Container className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slide.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
                                h-1.5 bg-white transition-all duration-500 rounded-full
                                ${currentIndex === index ? "w-8 opacity-100" : "w-1.5 opacity-50 hover:opacity-80"}
                                cursor-pointer border-none outline-none
                            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </Container>

      {/* Progress Bar */}
      <Container
        className="absolute left-0 bottom-0 h-1 bg-red-primary z-30 transition-all duration-[5000ms] ease-linear"
        style={{ width: `${((currentIndex + 1) / slide.length) * 100}%` }}
      />
    </Container>
  );
}
