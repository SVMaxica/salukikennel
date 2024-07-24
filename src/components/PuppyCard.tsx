

interface PuppyCardProps {
  name: string;
  images: string[];
  onClick?: () => void;
}

const PuppyCard: React.FC<PuppyCardProps> = ({ name, images, onClick }) => {
  const imageSrc = new URL(`../assets/images/${images[0]}`, import.meta.url).href;

  return (
    <div onClick={onClick} className="flex flex-col items-center bg-platinum border border-gray-200 rounded-lg shadow-md p-2 w-[150px] m-2 cursor-pointer">
      <img src={imageSrc} alt={name} className="w-full h-[120px] object-cover rounded-t-lg" />
      <div className="text-center text-sm mt-2">{name}</div>
    </div>
  );
};

export default PuppyCard;

