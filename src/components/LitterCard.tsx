

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
  onClick?: () => void;
}

const LitterCard: React.FC<LitterCardProps> = ({ litter, image, date_of_birth, sire, sireTitles, dam, damTitles, onClick }) => {
  const imageSrc = new URL(`../assets/images/${image}`, import.meta.url).href;

  return (
    <div onClick={onClick} className="flex items-center border bg-baby-powder border-gray-200 rounded-lg shadow-md w-[320px] h-32 mb-3 cursor-pointer">
     <div className="w-[40%] h-full p-2">
        <img src={imageSrc} alt={`${litter}-litter`} className="w-full h-full object-cover rounded-l-lg" />
      </div>
      <div className="flex flex-col">
        <div className='flex flex-row items-center space-x-4'>
        <div className="text-lg text-midnight-blue font-lora font-bold pl-3">
          {litter}-litter 
        </div>
        <div className="text-rich-black">{date_of_birth}</div>
        </div>
        <div className="text-sm text-charcoal">{damTitles.join(', ')}<br></br> {dam}</div>
        <div className="text-sm pt-2 text-charcoal">{sireTitles.join(', ')}<br></br> {sire}</div>
      </div>
    </div>
  );
};

export default LitterCard;

