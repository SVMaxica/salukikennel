import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import SwipeableCarousel from '../components/Carousel';
import instagramData from '../instagram_posts.json';

interface Post {
  id: string;
  images: string[];
  text: string;
}

interface Account {
  username: string;
  description: string;
}

// Dynamisk bildimport funktion
const importImages = async (): Promise<Record<string, string>> => {
  const context = import.meta.glob('../assets/images/*.{png,jpg,jpeg,JPG}');
  const images: Record<string, string> = {};
  
  for (const path in context) {
    const key = path.replace('../assets/images/', '');
    // Hantera rätt typ för context[path]
    const module = await context[path]();
    images[key] = (module as { default: string }).default;
  }
  
  return images;
};

const InstagramCarousel: React.FC = () => {
  const [posts] = useState<Post[]>(instagramData.posts);
  const [account, setAccount] = useState<Account | null>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const { account } = instagramData;
    setAccount(account);

    // Ladda bilderna dynamiskt
    const loadImages = async () => {
      const importedImages = await importImages();
      setImages(importedImages);
    };

    loadImages();
  }, []);

  return (
    <div className=" bg-white">
      <h2 className="text-2xl text-liberty font-lora pt-8 mb-4">Instagram Posts</h2>
      <SwipeableCarousel>
        {posts.map((post) => (
          <div key={post.id} className="bg-white w-[320px] flex-shrink-0">
            {account && <PostCard post={post} username={account.username} images={images} />}
          </div>
        ))}
      </SwipeableCarousel>
    </div>
  );
};

interface PostCardProps {
  post: Post;
  username: string;
  images: Record<string, string>;
}

const PostCard: React.FC<PostCardProps> = ({ post, username, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 100;

  const handleToggleText = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % post.images.length),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length),
    trackMouse: true,
  });

  return (
    <div className="bg-baby-powder rounded-lg shadow-lg overflow-hidden p-4 h-auto max-w-sm mx-auto">
      <div {...handlers} className="relative w-full pt-[100%] bg-gray-200 overflow-hidden">
        {post.images.map((image, index) => (
          <img
            key={index}
            src={images[image]}
            alt={`Post ${post.id} image ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {post.images.length > 1 && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length)}
              className="bg-midnight-blue bg-opacity-50 text-white p-1 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % post.images.length)}
              className="bg-midnight-blue bg-opacity-50 text-white p-1 rounded-full"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold text-midnight-blue text-left mt-4">{username}</h2>
      <p className="text-charcoal text-left">
        {isExpanded || post.text.length <= maxTextLength ? post.text : `${post.text.slice(0, maxTextLength)}...`}
        {post.text.length > maxTextLength && (
          <span onClick={handleToggleText} className="text-gray-web cursor-pointer">
            {isExpanded ? ' Read less' : ' Read more'}
          </span>
        )}
      </p>
    </div>
  );
};

export default InstagramCarousel;
