

interface DogCardProps {
  name: string;
  images: string[];
  onClick?: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ name, images, onClick }) => {
  const imageSrc = new URL(`../assets/images/${images[0]}`, import.meta.url).href;

  return (
    <div onClick={onClick} className="flex flex-col items-center bg-platinum border border-gray-200 rounded-lg shadow-md w-[110px] m-2 cursor-pointer mb-8">
      <img src={imageSrc} alt={name} className="w-full h-[110px] object-cover rounded-t-lg" />
      <div className="text-center pb-2 text-sm mt-2">{name}</div>
    </div>
  );
};

export default DogCard;
