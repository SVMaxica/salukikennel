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

export const fetchInstagramPosts = async (): Promise<Post[]> => {
  const accessToken = import.meta.env.VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN;
  const fields = 'id,caption,media_type,media_url,permalink,timestamp,children{media_type,media_url}';
  const response = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`);
  const data = await response.json();

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
      text: post.caption,
      date: new Date(post.timestamp).toLocaleDateString(),
      username: 'Roya the Saluki', // Placeholder username
      category: 'other', // Adjust based on your data if needed
    };
  });
};
