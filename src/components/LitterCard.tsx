

interface LitterCardProps {
  litter: string;
  image: string;
  date_of_birth: string;
  bitches: number;
  dog_puppies: number;
  sire: string;
  sireTitles: string[];
  dam: string;
  damTitles: string[];
}

const LitterCard: React.FC<LitterCardProps> = ({ litter, image, date_of_birth, sire, sireTitles, dam, damTitles }) => {
  const imageSrc = new URL(`../assets/images/${image}`, import.meta.url).href;

  return (
    <div className="flex items-center border bg-baby-powder border-gray-200 rounded-lg shadow-md w-[320px] h-32 mb-3">
     <div className="w-[40%] h-full">
        <img src={imageSrc} alt={`${litter}-litter`} className="w-full h-full object-cover rounded-l-lg" />
      </div>
      <div className="flex flex-col">
        <div className='flex flex-row items-center space-x-4'>
        <div className="text-lg font-bold pl-3">
          {litter}-litter 
        </div>
        <div>{date_of_birth}</div>
        </div>
        <div className="text-sm">{damTitles}<br></br> {dam}</div>
        <div className="text-sm pt-2">{sireTitles}<br></br> {sire}</div>
      </div>
    </div>
  );
};

export default LitterCard;

