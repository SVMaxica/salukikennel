import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface PostCardProps {
  post: {
    id: string;
    mediaItems: { url: string; type: string }[];
    text: string;
    date: string;
    tags?: string[]; // Lägger till tags som en valfri property
  };
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
    onSwipedLeft: () =>
      setCurrentIndex((prev) => (prev + 1) % post.mediaItems.length),
    onSwipedRight: () =>
      setCurrentIndex(
        (prev) => (prev - 1 + post.mediaItems.length) % post.mediaItems.length
      ),
    trackMouse: true,
  });

  const currentMedia = post.mediaItems[currentIndex];

  return (
    <div className="bg-baby-powder rounded-lg shadow-lg overflow-hidden h-[400px] max-w-sm mx-auto flex flex-col mb-5">
      {/* Bildsektionen */}
      <div
        {...handlers}
        className="relative w-full bg-gray-200 overflow-hidden flex-grow"
        style={{ maxHeight: '300px' }}
      >
        {currentMedia.type === 'VIDEO' ? (
          <video controls className="w-full h-full object-cover">
            <source src={currentMedia.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={currentMedia.url}
            alt={`Post ${post.id} media ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}
        {post.mediaItems.length > 1 && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + post.mediaItems.length) % post.mediaItems.length
                )
              }
              className="bg-midnight-blue bg-opacity-50 text-white p-1 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % post.mediaItems.length)
              }
              className="bg-midnight-blue bg-opacity-50 text-white p-1 rounded-full"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>

      {/* Textsektionen */}
      <h2 className="text-lg font-semibold text-midnight-blue text-left mt-4">
        {username}
      </h2>
      <p className="text-charcoal text-left flex-grow">
        {isExpanded || post.text.length <= maxTextLength
          ? post.text
          : `${post.text.slice(0, maxTextLength)}...`}
        {post.text.length > maxTextLength && (
          <span
            onClick={handleToggleText}
            className="text-gray-web cursor-pointer"
          >
            {isExpanded ? ' Read less' : ' Read more'}
          </span>
        )}
      </p>

      {/* Publiceringsdatum */}
      <p className="text-xs text-gray-500 mt-2">
        Published: {new Date(post.date).toLocaleDateString()}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;

// import React, { useState } from 'react';
// import { useSwipeable } from 'react-swipeable';

// interface PostCardProps {
//   post: {
//     id: string;
//     mediaItems: { url: string; type: string }[];
//     text: string;
//     date: string;
//   };
//   username: string;
// }

// const PostCard: React.FC<PostCardProps> = ({ post, username }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const maxTextLength = 100;

//   const handleToggleText = () => {
//     setIsExpanded((prevState) => !prevState);
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () =>
//       setCurrentIndex((prev) => (prev + 1) % post.mediaItems.length),
//     onSwipedRight: () =>
//       setCurrentIndex(
//         (prev) => (prev - 1 + post.mediaItems.length) % post.mediaItems.length
//       ),
//     trackMouse: true,
//   });

//   const currentMedia = post.mediaItems[currentIndex];

//   return (
//     <div className="bg-baby-powder rounded-lg shadow-lg overflow-hidden h-auto p-4 max-w-sm mx-auto">
//       <div
//         {...handlers}
//         className="relative w-full bg-gray-200 overflow-hidden"
//       >
//         {currentMedia.type === 'VIDEO' ? (
//           <video controls className="w-full h-auto">
//             <source src={currentMedia.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <img
//             src={currentMedia.url}
//             alt={`Post ${post.id} media ${currentIndex + 1}`}
//             className="w-full h-auto"
//           />
//         )}
//         {post.mediaItems.length > 1 && (
//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
//             <button
//               onClick={() =>
//                 setCurrentIndex(
//                   (prev) =>
//                     (prev - 1 + post.mediaItems.length) % post.mediaItems.length
//                 )
//               }
//               className="bg-midnight-blue bg-opacity-50 text-white p-1 rounded-full"
//             >
//               &#10094;
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentIndex((prev) => (prev + 1) % post.mediaItems.length)
//               }
//               className="bg-midnight-blue bg-opacity-50 text-white p-1 rounded-full"
//             >
//               &#10095;
//             </button>
//           </div>
//         )}
//       </div>
//       <h2 className="text-lg font-semibold text-midnight-blue text-left mt-4">
//         {username}
//       </h2>
//       <p className="text-charcoal text-left">
//         {isExpanded || post.text.length <= maxTextLength
//           ? post.text
//           : `${post.text.slice(0, maxTextLength)}...`}
//         {post.text.length > maxTextLength && (
//           <span
//             onClick={handleToggleText}
//             className="text-gray-web cursor-pointer"
//           >
//             {isExpanded ? ' Read less' : ' Read more'}
//           </span>
//         )}
//       </p>
//     </div>
//   );
// };

// export default PostCard;
