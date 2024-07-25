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

const InstagramCarousel: React.FC = () => {
  const [posts] = useState<Post[]>(instagramData.posts);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const { account } = instagramData;
    setAccount(account);
  }, []);

  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl text-liberty font-lora pt-8 mb-4">Instagram Posts</h2>
      <SwipeableCarousel>
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 w-[320px] flex-shrink-0">
            {account && <PostCard post={post} username={account.username} />}
          </div>
        ))}
      </SwipeableCarousel>
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



// import { useState, useRef, useEffect } from 'react';
// import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
// import instagramData from '../instagram_posts.json';

// interface Post {
//   id: string;
//   images: string[];
//   text: string;
// }

// interface Account {
//   username: string;
//   description: string;
// }

// const InstagramCarousel: React.FC = () => {
//   const [posts] = useState<Post[]>(instagramData.posts);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [postWidth, setPostWidth] = useState(0);
//   const [account, setAccount] = useState<Account | null>(null);

//   useEffect(() => {
//     const { account } = instagramData;
//     setAccount(account);
//     if (carouselRef.current) {
//       const width = carouselRef.current.querySelector('.post-card')?.clientWidth || 0;
//       setPostWidth(width);
//     }
//   }, []);


//   const next = () => {
//     if (currentIndex < posts.length - 1.2) {
//       setCurrentIndex(currentIndex + 1.2);
//     }
//   };

//   const prev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1.2);
//     }
//   };

//   const carouselHandlers: SwipeableHandlers = useSwipeable({
//     onSwipedLeft: next,
//     onSwipedRight: prev,
//     trackMouse: true,
//   });

  

  
//   return (
//     <div className="p-4 bg-babypowder">
//       <h2 className="text-2xl text-liberty font-bold pt-8 mb-4">Instagram Posts</h2>
//       <div className="relative" {...carouselHandlers}>
//         <div className="flex overflow-hidden" ref={carouselRef}>
//           <div
//             className="flex transition-transform duration-300"
//             style={{ transform: `translateX(-${currentIndex * postWidth}px)` }}
//           >
//             {posts.map((post) => (
//               <div key={post.id} className="w-full max-w-sm flex-shrink-0 p-4 post-card">
//                {account && <PostCard post={post} username={account.username} />} 
//               </div>
//             ))}
//           </div>
//         </div>
//         <button
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-taupe-gray rounded-full text-white p-1"
//           onClick={prev}
//           disabled={currentIndex === 0}
//         >
//           &#10094;
//         </button>
//         <button
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-taupe-gray rounded-full text-white p-1"
//           onClick={next}
//           disabled={currentIndex === posts.length - 1}
//         >
//           &#10095;
//         </button>
//       </div>
//     </div>
//   );
// };

// interface PostCardProps {
//   post: Post;
//   username: string;
// }

// const PostCard: React.FC<PostCardProps> = ({ post, username }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const maxTextLength = 100;

//   const handleToggleText = () => {
//     setIsExpanded((prevState) => !prevState);
//   };

//   const handlers: SwipeableHandlers = useSwipeable({
//     onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % post.images.length),
//     onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length),
//     trackMouse: true,
//   });

//   return (
//     <div className="bg-baby-powder rounded-lg shadow-lg overflow-hidden p-4 h-auto max-w-sm mx-auto">
//       <div {...handlers} className="relative w-full pt-[100%] bg-gray-200 overflow-hidden">
//         {post.images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Post ${post.id} image ${index + 1}`}
//             className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           />
//         ))}
//         {post.images.length > 1 && (
//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
//             <button
//               onClick={() => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length)}
//               className="bg-black bg-opacity-50 text-white p-1 rounded-full"
//             >
//               &#10094;
//             </button>
//             <button
//               onClick={() => setCurrentIndex((prev) => (prev + 1) % post.images.length)}
//               className="bg-black bg-opacity-50 text-white p-1 rounded-full"
//             >
//               &#10095;
//             </button>
//           </div>
//         )}
//       </div>
//       <h2 className="text-lg font-semibold text-left mt-4">{username}</h2>
//       <p className="text-gray-700 text-left">
//         {isExpanded || post.text.length <= maxTextLength ? post.text : `${post.text.slice(0, maxTextLength)}...`}
//         {post.text.length > maxTextLength && (
//           <span onClick={handleToggleText} className="text-gainsboro cursor-pointer">
//             {isExpanded ? ' Read less' : ' Read more'}
//           </span>
//         )}
//       </p>
//     </div>
//   );
// };

// export default InstagramCarousel;

