import { useEffect, useState } from 'react';
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
    // Sätt testimonials från JSON-filen
    setTestimonials(data.testimonials);
  }, []);

  return (
    <div className="w-full bg-platinum p-4 mt-8">
      <h2 className="text-2xl font-lora text-liberty text-center mb-8 mt-4">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {testimonials.map((testimonial) => {
          // Dynamisk import av bild
          const imageSrc = new URL(`../assets/images/${testimonial.image}`, import.meta.url).href;
          return (
            <div key={testimonial.id} className="bg-baby-powder p-4 rounded-lg shadow-lg max-w-[320px]">
              <div className="flex items-start">
                <img
                  src={imageSrc}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="pl-2 text-sm text-charcoal">{testimonial.message}</p>
                  <p className=" text-right font-lora text-sm text-gray-600">- {testimonial.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;