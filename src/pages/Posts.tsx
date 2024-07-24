
import { useEffect, useState } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import instagramData from '../instagram_posts.json';
import instagramIcon from '../assets/images/instagram.svg';
import facebookIcon from '../assets/images/fb.svg';

interface Post {
  id: string;
  images: string[];
  text: string;
}

interface Account {
  username: string;
  description: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    // Directly use imported JSON data instead of fetching it
    const { account, posts } = instagramData;
    setAccount(account);
    setPosts(posts);
  }, []);

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-babypowder">
      <div className="mb-8">
        <h1 className="text-2xl text-liberty font-bold pt-8">{account.username}</h1>
        <div className='flex flex-row justify-center'>
        <p className="text-gray-web">{account.description}</p>
        <a href="https://www.instagram.com/roya.the.saluki" target="_blank" rel="noopener noreferrer" className="ml-2 w-6 h-6 flex items-center justify-center">
            <img src={instagramIcon} alt="Instagram" className="w-full h-full" />
          </a>
          <a href="https://www.facebook.com/sandra.gustafsson.98" target="_blank" rel="noopener noreferrer" className="ml-2 w-6 h-6 flex items-center justify-center">
            <img src={facebookIcon} alt="Facebook" className="w-full h-full" />
          </a>
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} username={account.username} />
        ))}
      </div>
    </div>
  );
};

interface PostCardProps {
  post: Post;
  username: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, username }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 100; // Max characters before truncating

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % post.images.length),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length),
    trackMouse: true,
  });

  const handleToggleText = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        
        <div {...handlers} className="relative w-full pt-[100%] bg-gray-200 overflow-hidden">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
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
                className="bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &#10094;
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % post.images.length)}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &#10095;
              </button>
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold ">{username}</h2>
        <p className="text-gray-700 text-left">
          {isExpanded || post.text.length <= maxTextLength ? post.text : `${post.text.slice(0, maxTextLength)}...`}
          {post.text.length > maxTextLength && (
            <span onClick={handleToggleText} className="text-gainsboro cursor-pointer">
              {isExpanded ? ' Read less' : ' Read more'}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};


export default Posts;

