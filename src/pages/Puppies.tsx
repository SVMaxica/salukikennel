import { useState } from 'react';
import puppieImage from '../assets/images/puppie.png';
import SwipeableCarousel from '../components/Carousel';
import LitterCard from '../components/LitterCard';
import PuppyCard from '../components/PuppyCard';
import ImageGallery from '../components/ImageGallery';
import data from '../data.json';
import { Litter, Puppy } from '../types/types';

const Puppies: React.FC = () => {
  const litters: Litter[] = data.litters;
  const [selectedLitter, setSelectedLitter] = useState<Litter | null>(null);
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);

  const handleCardClick = (litter: Litter) => {
    setSelectedLitter(litter);
    setSelectedPuppy(null);
  };

  const handlePuppyCardClick = (puppy: Puppy) => {
    setSelectedPuppy(puppy);
  };

  return (
    <div className='puppies-wrapper flex flex-col'>
      <div className="puppies-container flex flex-col md:flex-row items-center justify-between p-8 mb-6 ">
        <div className="text-section p-4 md:w-1/2">
          <h1 className="text-4xl text-liberty font-lora pb-2 mb-4">We have no puppie plans right now but...</h1>
          <p className="text-base font-inter text-taupe-gray text-left max-w-[320px] mt-4 mb-4 mx-auto">
            You can sign up to our newsletter and get noticed first of all when we have new puppie plans.
          </p>
        </div>
        <div className="image-section md:w-1/2 flex justify-center md:relative md:-mt-40">
          <img src={puppieImage} alt="Kennel founder" className="md:w-auto max-w-xs object-cover w-[260px] h-[360px]"/>
        </div>
      </div>

      <div className="litter-carousel-section pl-4 pr-4 pt-16 pb-16 bg-platinum">
        <h2 className="text-2xl font-lora font-bold text-liberty mb-4">Previous Litters</h2>
        <SwipeableCarousel>
          {litters.map((litter) => (
            <div key={litter.litter} className="flex-shrink-0" onClick={() => handleCardClick(litter)}>
              <LitterCard
                litter={litter.litter}
                images={litter.image}
                date_of_birth={litter.date_of_birth}
                bitches={litter.bitches}
                dog_puppies={litter.dog_puppies}
                sire={litter.parents.sire.name}
                sireTitles={litter.parents.sire.titles}
                dam={litter.parents.dam.name}
                damTitles={litter.parents.dam.titles}
                onClick={() => handleCardClick(litter)}
              />
            </div>
          ))}
        </SwipeableCarousel>
      </div>

      {selectedLitter && (
        <div className="selected-litter-section bg-white">
          <div className="flex flex-col md:flex-row mt-12 p-8 sm:p-16">
            <div className="md:w-1/2 flex items-center justify-center">
              {selectedLitter.image.length > 1 ? (
                <ImageGallery images={selectedLitter.image} />
              ) : (
                <img
                  src={new URL(`../assets/images/${selectedLitter.image[0]}`, import.meta.url).href}
                  alt={`${selectedLitter.litter}-litter`}
                  className="w-full h-full object-cover"
                  style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                />
              )}
            </div>
            <div className="md:w-1/2 p-4">
              <div className="text-2xl text-liberty font-lora font-bold mb-4">{selectedLitter.litter}-litter</div>
              <div className="text-lg mb-2 text-charcoal">{selectedLitter.date_of_birth}</div>
              <div className="text-lg mb-2 text-charcoal"><span className='font-bold'>♀</span>{selectedLitter.bitches}
                <span className='pl-8 font-bold'>♂</span> {selectedLitter.dog_puppies}</div>
              <p className='text-gray-web'>Parents:</p>
              <div className="text-lg mb-2 text-charcoal"> {selectedLitter.parents.dam.titles.join(', ')}<br></br>{selectedLitter.parents.dam.name}</div>
              <div className="text-lg mb-2 text-charcoal"> {selectedLitter.parents.sire.titles.join(', ')}<br></br>{selectedLitter.parents.sire.name}</div>
            </div>
          </div>
          <div className="puppy-cards-container flex flex-wrap justify-center mb-8">
            {selectedLitter.puppies.map((puppy) => (
              <PuppyCard key={puppy.name} name={puppy.name} images={puppy.image} onClick={() => handlePuppyCardClick(puppy)} />
            ))}
          </div>
        </div>
      )}

      {selectedPuppy && (
        <div className="selected-puppy-section bg-platinum p-8 sm:p-16">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <p className="text-lg mb-2 font-bold text-gray-web">{selectedPuppy.titles.join(', ')}</p>
              <div className="text-2xl text-liberty font-lora font-bold mb-4">{selectedPuppy.name}</div>
              <p className="text-lg mb-2 text-gray-web">Lives with:</p>
              <p className="text-lg mb-2 text-charcoal">{selectedPuppy.owners},<br></br>{selectedPuppy.hometown}</p>
              <p className="text-lg mb-2 text-gray-web">Results:</p>
              <p className="text-lg mb-2 text-charcoal">{selectedPuppy.results.join(', ')}</p>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              {selectedPuppy.image.length > 1 ? (
                <ImageGallery images={selectedPuppy.image} />
              ) : (
                <img
                  src={new URL(`../assets/images/${selectedPuppy.image[0]}`, import.meta.url).href}
                  alt={selectedPuppy.name}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Puppies;



// import { useState } from 'react';
// import puppieImage from '../assets/images/puppie.png';
// import SwipeableCarousel from '../components/Carousel';
// import LitterCard from '../components/LitterCard';
// import PuppyCard from '../components/PuppyCard';
// import ImageGallery from '../components/ImageGallery';
// import data from '../data.json';
// import { Litter, Puppy } from '../types/types';

// const Puppies: React.FC = () => {
//   const litters: Litter[] = data.litters;
//   const [selectedLitter, setSelectedLitter] = useState<Litter | null>(null);
//   const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);

//   const handleCardClick = (litter: Litter) => {
//     setSelectedLitter(litter);
//     setSelectedPuppy(null);
//   };

//   const handlePuppyCardClick = (puppy: Puppy) => {
//     setSelectedPuppy(puppy);
//   };

//   return (
//     <div className='puppies-wrapper flex flex-col'>
//       <div className="puppies-container flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
//         <div className="text-section p-4 md:w-1/2">
//           <h1 className="text-4xl text-liberty font-lora pb-2 mb-4 mt-4">We have no puppie plans right now but...</h1>
//           <p className="text-base font-inter text-taupe-gray text-left max-w-[320px] mt-4 mb-4 mx-auto">
//             You can sign up to our newsletter and get noticed first of all when we have new puppie plans.
//           </p>
//         </div>
//         <div className="image-section md:w-1/2 flex justify-center md:relative md:-mt-40">
//           <img src={puppieImage} alt="Kennel founder" className="md:w-auto max-w-xs" style={{ width: '260px', height: '360px', objectFit: 'cover' }}/>
//         </div>
//       </div>

//       <div className="litter-carousel-section pl-4 pr-4 pt-8 pb-16 bg-platinum">
//         <h2 className="text-2xl font-lora font-bold text-liberty mb-4">Previous Litters</h2>
//         <SwipeableCarousel>
//           {litters.map((litter) => (
//             <div key={litter.litter} className="flex-shrink-0" onClick={() => handleCardClick(litter)}>
//               <LitterCard
//                 litter={litter.litter}
//                 image={litter.image}
//                 date_of_birth={litter.date_of_birth}
//                 bitches={litter.bitches}
//                 dog_puppies={litter.dog_puppies}
//                 sire={litter.parents.sire.name}
//                 sireTitles={litter.parents.sire.titles}
//                 dam={litter.parents.dam.name}
//                 damTitles={litter.parents.dam.titles}
//               />
//             </div>
//           ))}
//         </SwipeableCarousel>
//       </div>

//       {selectedLitter && (
//         <div className="selected-litter-section bg-white">
//           <div className="flex flex-col md:flex-row p-8 sm:p-16">
//             <div className="md:w-1/2 flex items-center justify-center">
//               <img
//                 src={new URL(`../assets/images/${selectedLitter.image}`, import.meta.url).href}
//                 alt={`${selectedLitter.litter}-litter`}
//                 className="w-full h-full object-cover"
//                 style={{ width: '300px', height: '300px', objectFit: 'cover' }}
//               />
//             </div>
//             <div className="md:w-1/2 p-4">
//               <div className="text-2xl text-liberty font-lora font-bold mb-4">{selectedLitter.litter}-litter</div>
//               <div className="text-lg mb-2 text-charcoal">{selectedLitter.date_of_birth}</div>
//               <div className="text-lg mb-2 text-charcoal"><span className='font-bold'>♀</span>{selectedLitter.bitches}
//                 <span className='pl-8 font-bold'>♂</span> {selectedLitter.dog_puppies}</div>
//               <p className='text-gray-web'>Parents:</p>
//               <div className="text-lg mb-2 text-charcoal"> {selectedLitter.parents.dam.titles.join(', ')}<br></br>{selectedLitter.parents.dam.name}</div>
//               <div className="text-lg mb-2 text-charcoal"> {selectedLitter.parents.sire.titles.join(', ')}<br></br>{selectedLitter.parents.sire.name}</div>
//             </div>
//           </div>
//           <div className="puppy-cards-container flex flex-wrap justify-center mt-8 mb-8">
//             {selectedLitter.puppies.map((puppy) => (
//               <PuppyCard key={puppy.name} name={puppy.name} images={puppy.image} onClick={() => handlePuppyCardClick(puppy)} />
//             ))}
//           </div>
//         </div>
//       )}

//       {selectedPuppy && (
//         <div className="selected-puppy-section bg-platinum p-8 sm:p-16">
//           <div className="flex flex-col md:flex-row">
//             <div className="md:w-1/2 p-4">
//               <p className="text-lg mb-2 font-bold text-gray-web">{selectedPuppy.titles.join(', ')}</p>
//               <div className="text-2xl text-liberty font-lora font-bold mb-4">{selectedPuppy.name}</div>
//               <p className="text-lg mb-2 text-gray-web">Lives with:</p>
//               <p className="text-lg mb-2 text-charcoal">{selectedPuppy.owners},<br></br>{selectedPuppy.hometown}</p>
//               <p className="text-lg mb-2 text-gray-web">Results:</p>
//               <p className="text-lg mb-2 text-charcoal">{selectedPuppy.results.join(', ')}</p>
//             </div>
//             <div className="md:w-1/2 flex justify-center items-center">
//               {selectedPuppy.image.length > 1 ? (
//                 <ImageGallery images={selectedPuppy.image} />
//               ) : (
//                 <img
//                   src={new URL(`../assets/images/${selectedPuppy.image[0]}`, import.meta.url).href}
//                   alt={selectedPuppy.name}
//                   className="w-full h-full object-cover rounded-lg"
//                   style={{ width: '300px', height: '300px', objectFit: 'cover' }}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Puppies;
