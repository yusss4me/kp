"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "../atoms/container";
import { Box } from "lucide-react";

const SLIDES = [
  { id: 1, src: "/images/slider-1.jpg", alt: "Modern Tech Office" },
  { id: 2, src: "/images/slider-2.png", alt: "Corporate Collaboration" },
  { id: 3, src: "/images/slider-3.jpg", alt: "Premium Architecture" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
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
        {SLIDES.map((slide) => (
          <Container key={slide.id} className="min-w-full h-full relative">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slide.id === 1}
              className="object-cover"
            />
            <Container className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </Container>
        ))}
      </Container>

      {/* Dots Navigation */}
      <Container className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
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
        style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%` }}
      />
    </Container>
  );
}
