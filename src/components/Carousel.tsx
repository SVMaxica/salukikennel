
import { useSwipeable } from 'react-swipeable';

interface SwipeableCarouselProps {
  children: React.ReactNode;
}

const SwipeableCarousel: React.FC<SwipeableCarouselProps> = ({ children }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log('Swiped left'),
    onSwipedRight: () => console.log('Swiped right'),
  });

  return (
    <div {...handlers} className="flex overflow-x-auto space-x-4">
      {children}
    </div>
  );
};

export default SwipeableCarousel;
