import puppieImage from '../assets/images/puppie.png';
import SwipeableCarousel from '../components/Carousel';
import LitterCard from '../components/LitterCard';
import data from '../data.json';
import { Litter } from '../types/types';

const Puppies: React.FC = () => {
  const litters: Litter[] = data.litters;

  return (
    <div className='puppies-wrapper flex flex-col'>
      <div className="puppies-container flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
        <div className="text-section p-4 md:w-1/2">
          <h1 className="text-4xl md:text-5xl text-liberty font-lora pb-2 mb-4 mt-4">We have no puppie plans right now but...</h1>
          <p className="text-base font-inter text-taupe-gray text-left max-w-[320px] mt-4 mb-4 mx-auto">
            You can sign up to our newsletter and get noticed first of all when we have new puppie plans.
          </p>
        </div>
        <div className="image-section md:w-1/2 flex justify-center md:relative md:-mt-20">
          <img src={puppieImage} alt="Kennel founder" className="md:w-auto max-w-xs" />
        </div>
      </div>

      <div className="litter-carousel-section p-4 md:p-8 bg-platinum">
        <h2 className="text-2xl font-lora text-liberty mb-4">Previous Litters</h2>
        <SwipeableCarousel>
          {litters.map((litter) => (
            <div key={litter.litter} className="flex-shrink-0">
              <LitterCard
                litter={litter.litter}
                image={litter.image}
                date_of_birth={litter.date_of_birth}
                bitches={litter.bitches}
                dog_puppies={litter.dog_puppies}
                sire={litter.parents.sire.name}
                sireTitles={litter.parents.sire.titles}
                dam={litter.parents.dam.name}
                damTitles={litter.parents.dam.titles}
              />
            </div>
          ))}
        </SwipeableCarousel>
      </div>
    </div>
  );
};

export default Puppies;

