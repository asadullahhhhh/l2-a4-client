"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    title: "Delicious Meals Delivered",
    description: "Order your favorite food from top restaurants near you.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
    title: "Fresh & Tasty",
    description: "Experience fresh ingredients and amazing flavors.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1703073186159-ae38e1c42dee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Fast Delivery",
    description: "Get your food delivered hot and fast at your doorstep.",
  },
];

export default function Banner() {
  return (
    <div className="w-full h-[60vh] md:h-[70vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">

              {/* IMAGE */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/50" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="max-w-xl text-sm md:text-lg text-gray-200">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}