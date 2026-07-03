"use client";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Dhaka Medical Hospital",
    designation: "Medical Oxygen Client",
    review:
      "Taher Enterprise has been our trusted supplier for years. Their medical oxygen delivery is always punctual and meets the highest safety standards.",
  },
  {
    name: "ABC Steel Industries",
    designation: "Industrial Partner",
    review:
      "Excellent service, competitive pricing, and dependable supply. They understand industrial requirements better than anyone we've worked with.",
  },
  {
    name: "Green Flame Restaurant",
    designation: "Commercial LPG",
    review:
      "Reliable LPG deliveries with excellent customer support. We never have to worry about interruptions to our business.",
  },
  {
    name: "TechLab Bangladesh",
    designation: "Specialty Gas Client",
    review:
      "Their specialty gases are consistently high quality and delivered with exceptional professionalism.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-linear-to-b from-white to-sky-50 py-24">
      <div className="container mx-auto px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-semibold uppercase tracking-[0.3em] text-sky-600">
            Testimonials
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Trusted Across Bangladesh
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            Thousands of businesses, hospitals and commercial facilities
            rely on our gas solutions every single day.
          </p>
        </motion.div>

        {/* Carousel */}

        <Carousel
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            loop: true,
            align: "start",
          }}
          className="mt-16"
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 xl:basis-1/3"
              >
                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                  className="h-full rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-xl"
                >
                  <Quote className="h-10 w-10 text-orange-500" />

                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>

                  <p className="mt-6 leading-8 text-slate-600">
                    {item.review}
                  </p>

                  <div className="mt-8 border-t pt-5">
                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.designation}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}