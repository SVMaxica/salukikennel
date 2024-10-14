
import { useEffect, useState } from 'react';
import SwipeableCarousel from '../components/Carousel';
import data from '../data.json';

interface Testimonial {
  id: number;
  image: string;
  name: string;
  message: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Set testimonials from JSON file
    setTestimonials(data.testimonials);
  }, []);

  return (
    <div className="w-full bg-platinum pl-4 pr-4 pb-12 pt-6 mt-8">
      <h2 className="text-2xl font-lora text-liberty text-center mb-4 mt-4">Testimonials</h2>
      <SwipeableCarousel>
        {testimonials.map((testimonial) => {
          // Dynamically import image
          const imageSrc = new URL(`../assets/images/${testimonial.image}`, import.meta.url).href;
          return (
            <div key={testimonial.id} className="bg-baby-powder p-4 rounded-lg shadow-lg w-[320px] flex-shrink-0 mb-6">
              <div className="flex items-start">
                <img
                  src={imageSrc}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="pl-2">
                  <p className="text-sm text-taupe-gray">{testimonial.message}</p>
                  <p className="text-right font-lora text-sm text-liberty">- {testimonial.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </SwipeableCarousel>
    </div>
  );
};

export default Testimonials;
