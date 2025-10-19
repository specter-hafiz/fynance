"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "../ui/TestimonialCard";

const testimonials = [
  {
    id: "testimonial1",
    name: "Sarah Chen, Freelance Designer",
    image: "/images/profile2.png",
    quote: "Finally, a finance app that doesn't make me feel stupid.",
    feedback:
      "Before Fynance, I tried a dozen budgeting apps, but I'd always quit after a week. Too much effort, too much data entry. Fynance just gets it. It synced with my bank, showed me where my money was going, and helped me make a plan without stress. I'm finally in control, and it feels amazing.",
  },
  {
    id: "testimonial2",
    name: "Marcus Johnson, Small Business Owner",
    image: "/images/profile3.png",
    quote:
      "Fynance helped me separate business and personal finances effortlessly.",
    feedback:
      "Running a business while managing personal expenses was chaotic. Fynance's separate financial spaces feature changed everything. I can track both without confusion, and the debt tracking helped me pay off my business loan faster than expected. This app is a game-changer.",
  },
  {
    id: "testimonial3",
    name: "Emma Rodriguez, Graduate Student",
    image: "/images/profile4.png",
    quote: "I saved $500 in my first month just by seeing where my money went.",
    feedback:
      "As a student on a tight budget, every dollar counts. Fynance showed me I was spending way too much on food delivery. Now I meal prep, and I'm actually building an emergency fund. The goal tracking keeps me motivated, and I love how simple everything is.",
  },
  {
    id: "testimonial4",
    name: "David Kim, Software Engineer",
    image: "/images/profile5.png",
    quote: "The most intuitive financial tool I've ever used.",
    feedback:
      "I've tried everything from spreadsheets to complex finance software. Fynance strikes the perfect balance between powerful features and ease of use. The insights are actionable, not overwhelming. I recommended it to my entire team, and now we all use it.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Calculate visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    // Show 1 testimonial on mobile, 2 on tablet, 3 on desktop
    return [
      testimonials[currentIndex],
      testimonials[(currentIndex + 1) % testimonials.length],
      testimonials[(currentIndex + 2) % testimonials.length],
    ];
  };

  return (
    <section className="padding py-16 sm:py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium">
          What Our Users Say
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            aria-label="Previous testimonial"
            className="hover:opacity-70 transition-opacity hover:bg-lightblue/10 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="hover:opacity-70 transition-opacity hover:bg-lightblue/10 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile: Show 1 testimonial */}
      <div className="grid grid-cols-1 gap-6 sm:hidden">
        <TestimonialCard
          key={testimonials[currentIndex].id}
          image={testimonials[currentIndex].image}
          alt={testimonials[currentIndex].name}
          quote={testimonials[currentIndex].quote}
          feedback={testimonials[currentIndex].feedback}
          name={testimonials[currentIndex].name}
        />
      </div>

      {/* Tablet: Show 2 testimonials */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6">
        {getVisibleTestimonials()
          .slice(0, 2)
          .map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              image={testimonial.image}
              alt={testimonial.name}
              quote={testimonial.quote}
              feedback={testimonial.feedback}
              name={testimonial.name}
            />
          ))}
      </div>

      {/* Desktop: Show 3 testimonials */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {getVisibleTestimonials().map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            image={testimonial.image}
            alt={testimonial.name}
            quote={testimonial.quote}
            feedback={testimonial.feedback}
            name={testimonial.name}
          />
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-green w-6"
                : "bg-lightblue/30 hover:bg-lightblue/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
