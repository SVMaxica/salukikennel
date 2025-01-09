// Typdefinitioner för poster och API-data
export interface Post {
  id: string;
  mediaItems: { url: string; type: string }[];
  text: string;
  date: string;
  username: string;
  category: string;
}

interface InstagramPostData {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  children?: {
    data: Array<{
      id: string;
      media_type: string;
      media_url: string;
    }>;
  };
}

// Importera JSON för fallback
import instagramData from '../instagram_posts.json';

// Dynamisk import av bilder i `src/assets/images`
const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,JPG}');

// Funktion för att matcha bildnamn till importerade bilder
const resolveImagePath = async (imageName: string): Promise<string> => {
  const imagePath = `../assets/images/${imageName}`;
  if (images[imagePath]) {
    const module = (await images[imagePath]()) as { default: string }; // Typa `module` som en modul med en `default`-export
    return module.default; // Returnerar den faktiska URL:en för bilden
  }
  console.warn(`Image not found: ${imageName}`);
  return ''; // Returnera tom sträng om bilden inte hittas
};

// Funktion för att hämta poster från API eller fallback till JSON
export const fetchInstagramPosts = async (): Promise<Post[]> => {
  try {
    // API-förfrågan
    const accessToken = import.meta.env.VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN;
    const fields =
      'id,caption,media_type,media_url,permalink,timestamp,children{media_type,media_url}';
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram API');
    }

    const data = await response.json();

    // Omvandla API-data till Post-format
    return data.data.map((post: InstagramPostData) => {
      let mediaItems: Post['mediaItems'] = [];

      if (post.media_type === 'CAROUSEL_ALBUM' && post.children) {
        mediaItems = post.children.data.map((child) => ({
          url: child.media_url,
          type: child.media_type,
        }));
      } else {
        mediaItems = [{ url: post.media_url, type: post.media_type }];
      }

      return {
        id: post.id,
        mediaItems,
        text: post.caption || '',
        date: new Date(post.timestamp).toLocaleDateString(),
        username: 'Roya the Saluki', // Placeholder-användarnamn
        category: 'other',
      };
    });
  } catch (error) {
    // console.warn('Fetching from API failed. Falling back to JSON data.', error);

    // Fallback: Hämta data från JSON och hantera bilder
    const fallbackPosts = await Promise.all(
      instagramData.posts.map(async (post) => ({
        id: post.id,
        mediaItems: await Promise.all(
          post.images.map(async (image) => ({
            url: await resolveImagePath(image), // Dynamiskt genererade bildsökvägar
            type: 'IMAGE',
          }))
        ),
        text: post.text,
        date: post.date,
        username: instagramData.account.username, // Användarnamn från JSON
        category: 'backup', // Kategori för fallback-data
      }))
    );

    return fallbackPosts;
  }
};

// Fetch from APi without fallback

// export interface Post {
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

// export const fetchInstagramPosts = async (): Promise<Post[]> => {
//   const accessToken = import.meta.env.VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN;
//   const fields = 'id,caption,media_type,media_url,permalink,timestamp,children{media_type,media_url}';
//   const response = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`);
//   const data = await response.json();

//   return data.data.map((post: InstagramPostData) => {
//     let mediaItems: Post['mediaItems'] = [];

//     if (post.media_type === 'CAROUSEL_ALBUM' && post.children) {
//       mediaItems = post.children.data.map((child) => ({
//         url: child.media_url,
//         type: child.media_type,
//       }));
//     } else {
//       mediaItems = [{ url: post.media_url, type: post.media_type }];
//     }

//     return {
//       id: post.id,
//       mediaItems,
//       text: post.caption,
//       date: new Date(post.timestamp).toLocaleDateString(),
//       username: 'Roya the Saluki', // Placeholder username
//       category: 'other', // Adjust based on your data if needed
//     };
//   });
// };
