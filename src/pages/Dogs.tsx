import { useState } from 'react';
import dogImage from '../assets/images/ourdog1.png';
import data from '../data.json';
import DogCard from '../components/DogCard';
import ImageGallery from '../components/ImageGallery';
import { Dog } from '../types/types';

const Dogs: React.FC = () => {
  const dogs: Dog[] = data.dogs;
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  const handleDogCardClick = (dog: Dog) => {
    setSelectedDog(dog);
  };

  return (
    <div className='ourdogs-wrapper flex flex-col'>
      <div className="ourdogs-container flex flex-col md:flex-row items-center justify-between p-8 mb-6 ">
        <div className="text-section p-4 md:w-1/2">
          <h1 className="text-4xl text-liberty font-lora pb-2 mb-4">The stars in our breeding</h1>
          <p className="text-base font-inter text-taupe-gray text-left max-w-[320px] mt-4 mb-4 mx-auto">
            Here we will present the stars of our breeding program, all dogs live in our house and are our family members.
          </p>
        </div>
        <div className="image-section md:w-1/2 flex justify-center md:relative md:-mt-40">
          <img src={dogImage} alt="Kennel founder" className="md:w-auto max-w-xs object-cover w-[260px] h-[360px]"/>
        </div>
      </div>

      <div className="dogs-cards-container flex flex-wrap justify-center mb-8">
        {dogs.map((dog) => (
          <DogCard 
            key={dog.name} 
            name={dog.name} 
            images={dog.images} 
            onClick={() => handleDogCardClick(dog)} 
          />
        ))}
      </div>

      {selectedDog && (
        <div className="selected-dog-section bg-platinum p-8 sm:p-16">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <p className="text-lg mb-2 font-bold text-gray-web">{selectedDog.titles.join(', ')}</p>
              <div className="text-2xl text-liberty font-lora font-bold mb-4">{selectedDog.name}</div>
              <p className="text-lg mb-2 text-gray-web">Birthdate:</p>
              <p className="text-lg mb-2 text-charcoal">{selectedDog.birthdate}</p>
              <p className="text-lg mb-2 text-gray-web">Health:</p>
              <p className="text-lg mb-2 text-charcoal">{selectedDog.health.join(', ')}</p>
              <p className="text-lg mb-2 text-gray-web">Results:</p>
              <p className="text-lg mb-2 text-charcoal">{selectedDog.results.join(', ')}</p>
              <p className="text-lg mb-2 text-gray-web">About:</p>
              <p className="text-lg mb-2 text-charcoal">{selectedDog.about}</p>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              {selectedDog.images.length > 1 ? (
                <ImageGallery images={selectedDog.images} />
              ) : (
                <img
                  src={new URL(`../assets/images/${selectedDog.images[0]}`, import.meta.url).href}
                  alt={selectedDog.name}
                  className="w-auto h-[300px] object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dogs;


