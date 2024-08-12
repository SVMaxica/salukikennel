import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { fetchInstagramPosts, Post } from '../utils/fetchInstagramPosts';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterSort, setFilterSort] = useState<string>('latest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  const showKeywords = [
    'show', 'shows', 'dogshow', 'dogshows', 'hundutställning', 'utställning', 'utställningen',
  ];

  const lureCoursingKeywords = [
    'lure coursing', 'lurecoursing', 'coursing', 'race', 'whippet race',
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await fetchInstagramPosts();
      setPosts(postsData);

      // Extract years from posts and create a unique list of years
      const years = Array.from(new Set(postsData.map(post => new Date(post.date).getFullYear().toString())));
      setAvailableYears(years);
    };

    fetchPosts();
  }, []);

  const filteredAndSortedPosts = posts
    .filter(post => {
      if (filterSort === 'shows') {
        return showKeywords.some(keyword => post.text.toLowerCase().includes(keyword));
      }
      if (filterSort === 'lure coursing') {
        return lureCoursingKeywords.some(keyword => post.text.toLowerCase().includes(keyword));
      }
      if (availableYears.includes(filterSort)) {
        return new Date(post.date).getFullYear().toString() === filterSort;
      }
      return (
        post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const sortedPosts = filterSort === 'oldest' 
    ? filteredAndSortedPosts.reverse() 
    : filteredAndSortedPosts;

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl text-liberty font-lora pt-8 mb-4">Instagram Posts</h2>

      <div className="flex justify-between mb-4">
        <select
          value={filterSort}
          onChange={(e) => setFilterSort(e.target.value)}
          className="p-2 border rounded z-50"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="shows">Shows</option>
          <option value="lure coursing">Lure Coursing</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or text"
          className="p-2 border rounded z-50"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {sortedPosts.map((post) => (
          <div key={post.id} className="w-[320px] xl:w-[450px] mx-auto">
            <PostCard post={post} username={post.username} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;






// import { useEffect, useState } from 'react';
// import PostCard from '../components/PostCard';

// interface Post {
//   id: string;
//   mediaItems: { url: string; type: string }[];
//   text: string;
//   date: string;
//   username: string;
//   category: string;
// }

// interface InstagramPostData {
//   id: string;
//   caption: string;
//   media_type: string;
//   media_url: string;
//   permalink: string;
//   timestamp: string;
//   children?: {
//     data: Array<{
//       id: string;
//       media_type: string;
//       media_url: string;
//     }>;
//   };
// }

// const fetchInstagramPosts = async (): Promise<Post[]> => {
//   const accessToken = import.meta.env.VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN;
//   const fields = 'id,caption,media_type,media_url,permalink,timestamp,children{media_type,media_url}';
//   const response = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`);
//   const data = await response.json();

//   return data.data.map((post: InstagramPostData) => {
//     const mediaItems = post.children
//       ? post.children.data.map(child => ({
//           url: child.media_url,
//           type: child.media_type,
//         }))
//       : [{ url: post.media_url, type: post.media_type }];

//     return {
//       id: post.id,
//       mediaItems,
//       text: post.caption,
//       date: new Date(post.timestamp).toLocaleDateString(),
//       username: 'Roya the Saluki',
//       category: post.caption.toLowerCase().includes('show') ? 'shows' : 'other', // Basic example for assigning category
//     };
//   });
// };

// const Posts: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [filterSort, setFilterSort] = useState<string>('latest');
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const showKeywords = [
//     'show', 'shows', 'dogshow', 'dogshows', 'hundutställning', 'utställning', 'utställningen',
//   ];

//   const lureCoursingKeywords = [
//     'lure coursing', 'lurecoursing', 'coursing', 'race', 'whippet race'
//   ];

//   useEffect(() => {
//     const init = async () => {
//       const instagramPosts = await fetchInstagramPosts();
//       setPosts(instagramPosts);
//     };
//     init();
//   }, []);

//   const filteredAndSortedPosts = posts
//     .filter(post => {
//       if (filterSort === 'latest' || filterSort === 'oldest') return true;
//       if (filterSort === 'shows') {
//         return showKeywords.some(keyword => post.text.toLowerCase().includes(keyword));
//       }
//       if (filterSort === 'lure coursing') {
//         return lureCoursingKeywords.some(keyword => post.text.toLowerCase().includes(keyword));
//       }
//       return true;
//     })
//     .filter(post => {
//       return (
//         post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.text.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
//       if (filterSort === 'latest') {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       } else if (filterSort === 'oldest') {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       } else {
//         return 0;
//       }
//     });

//   return (
//     <div className="bg-white p-4">
//       <h2 className="text-2xl text-liberty font-lora pt-8 mb-4">Instagram Posts</h2>

//       {/* Kombinerad Filter- och Sorteringsdropdown och Sökfält */}
//       <div className="flex justify-between mb-4 z-50">
//         <select
//           value={filterSort}
//           onChange={(e) => setFilterSort(e.target.value)}
//           className="p-2 border rounded z-50"
//         >
//           <option value="latest">Latest</option>
//           <option value="oldest">Oldest</option>
//           <option value="shows">Shows</option>
//           <option value="lure coursing">Lure Coursing</option>
//           {/* Lägg till fler kategorier vid behov */}
//         </select>

//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search by name or text"
//           className="p-2 border rounded z-50"
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
//         {filteredAndSortedPosts.map((post) => (
//           <div key={post.id} className="w-[320px] xl:w-[450px] mx-auto z-50">
//             <PostCard post={post} username={post.username} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Posts;





//___________Used when fetching posts from json file_____________________

// import { useEffect, useState } from 'react';
// import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
// import instagramData from '../instagram_posts.json';
// import instagramIcon from '../assets/images/instagram.svg';
// import facebookIcon from '../assets/images/fb.svg';


// interface Post {
//   id: string;
//   images: string[];
//   text: string;
//   hashtags: string[];
//   date: string;
// }


// interface Account {
//   username: string;
//   description: string;
// }

// // Dynamisk bildimport funktion
// const importImages = async (): Promise<Record<string, string>> => {
//   const context = import.meta.glob('../assets/images/*.{png,jpg,jpeg,JPG}');
//   const images: Record<string, string> = {};

//   for (const path in context) {
//     const key = path.replace('../assets/images/', '');
//     const module = await context[path]();
//     images[key] = (module as { default: string }).default;
//   }

//   return images;
// };

// // Funktion för att kapitalisera första bokstaven i varje ord
// const capitalizeWords = (str: string): string => {
//   return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
// };

// const Posts: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [account, setAccount] = useState<Account | null>(null);
//   const [images, setImages] = useState<Record<string, string>>({});
//   const [filter, setFilter] = useState<string>('all');
//   const [allHashtags, setAllHashtags] = useState<string[]>([]);

//   // Ladda kontoinformation och poster från JSON-fil
//   useEffect(() => {
//     const { account, posts } = instagramData;
//     setAccount(account);
//     setPosts(posts);

//     // Ladda bilderna dynamiskt
//     const loadImages = async () => {
//       const importedImages = await importImages();
//       setImages(importedImages);
//     };

//     loadImages();

//     // Extrahera alla unika hashtags
//     const hashtags = new Set<string>();
//     posts.forEach(post => {
//       post.hashtags.forEach(tag => hashtags.add(tag.toLowerCase()));
//     });
//     setAllHashtags(['all', 'newest', 'oldest', ...Array.from(hashtags)]);

//   }, []);

//   // Hantera förändringar i filterval
//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilter(event.target.value);
//   };

//   // Filtrera och sortera poster baserat på valt filter
//   const filteredAndSortedPosts = posts
//     .filter(post => {
//       if (filter === 'all') return true;
//       if (filter === 'newest' || filter === 'oldest') return true;
//       return post.hashtags.some(tag => tag.toLowerCase() === filter.toLowerCase());
//     })
//     .sort((a, b) => {
//       if (filter === 'newest') {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       } else if (filter === 'oldest') {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       } else {
//         return 0;
//       }
//     });

//   if (!account) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4 bg-babypowder">
//       <div className="mb-8 text-center">
//         <h1 className="text-2xl text-liberty font-bold pt-8">{account.username}</h1>
//         <div className="flex flex-row justify-center">
//           <p className="text-gray-web">{account.description}</p>
//           <a href="https://www.instagram.com/roya.the.saluki" target="_blank" rel="noopener noreferrer" className="ml-2 w-6 h-6 flex items-center justify-center">
//             <img src={instagramIcon} alt="Instagram" className="w-full h-full" />
//           </a>
//           <a href="https://www.facebook.com/sandra.gustafsson.98" target="_blank" rel="noopener noreferrer" className="ml-2 w-6 h-6 flex items-center justify-center">
//             <img src={facebookIcon} alt="Facebook" className="w-full h-full" />
//           </a>
//         </div>
//       </div>

//       <div className="mb-4 relative z-50 flex flex-col items-center">
//         <label htmlFor="filter-select" className="block text-sm font-medium text-gray-700 text-center">Filter and Sort:</label>
//         <select
//           id="filter-select"
//           value={filter}
//           onChange={handleFilterChange}
//           className="mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm rounded-md z-50"
//         >
//           {allHashtags.map(tag => (
//             <option key={tag} value={tag}>{capitalizeWords(tag)}</option>
//           ))}
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredAndSortedPosts.map(post => (
//           <PostCard key={post.id} post={post} username={account.username} images={images} />
//         ))}
//       </div>
//     </div>
//   );
// };

// interface PostCardProps {
//   post: Post;
//   username: string;
//   images: Record<string, string>;
// }

// const PostCard: React.FC<PostCardProps> = ({ post, username, images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const maxTextLength = 100; // Max characters before truncating

//   const handlers: SwipeableHandlers = useSwipeable({
//     onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % post.images.length),
//     onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length),
//     trackMouse: true,
//   });

//   const handleToggleText = () => {
//     setIsExpanded(prevState => !prevState);
//   };

//   return (
//     <div className="bg-baby-powder rounded-lg shadow-lg overflow-hidden">
//       <div className="p-4">
//         <div {...handlers} className="relative w-full pt-[100%] bg-gray-200 overflow-hidden">
//           {post.images.map((image, index) => (
//             <img
//               key={index}
//               src={images[image]}
//               alt={`Post ${post.id} image ${index + 1}`}
//               className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
//             />
//           ))}
//           {post.images.length > 1 && (
//             <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
//               <button
//                 onClick={() => setCurrentIndex((prev) => (prev - 1 + post.images.length) % post.images.length)}
//                 className="bg-black bg-opacity-50 text-white p-2 rounded-full"
//               >
//                 &#10094;
//               </button>
//               <button
//                 onClick={() => setCurrentIndex((prev) => (prev + 1) % post.images.length)}
//                 className="bg-black bg-opacity-50 text-white p-2 rounded-full"
//               >
//                 &#10095;
//               </button>
//             </div>
//           )}
//         </div>
//         <div className='flex flex-row mx-auto'>
//         <h2 className="text-lg font-semibold text-midnight-blue">{username}</h2>
//         <p className="text-charcoal text-xs flex items-center pl-6">Posted {new Date(post.date).toLocaleDateString()}</p>
//         </div>
//         <p className="text-gray-700 text-left">
//           {isExpanded || post.text.length <= maxTextLength ? post.text : `${post.text.slice(0, maxTextLength)}...`}
//           {post.text.length > maxTextLength && (
//             <span onClick={handleToggleText} className="text-gainsboro cursor-pointer">
//               {isExpanded ? ' Read less' : ' Read more'}
//             </span>
//           )}
//         </p>
        
//       </div>
//     </div>
//   );
// };

// export default Posts;
