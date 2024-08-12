Saluki Kennel Website

Overview
The Saluki Kennel website is a dynamic, responsive platform designed to showcase a Saluki kennel's achievements and updates. Built with React and TypeScript, the site integrates seamlessly with the Instagram Graph API to display real-time posts, images, and videos directly from Instagram. The project also features advanced filtering and sorting options, ensuring an engaging user experience across all devices.

Features
Instagram API Integration: Real-time fetching and display of Instagram posts, including images, videos, and carousels, with automatic token management.
Advanced Filtering and Sorting: Users can filter posts by keywords or sort them by the latest, oldest, or specific years dynamically generated from the content.
Responsive Design: The site adapts to various screen sizes, using Tailwind CSS for styling and react-swipeable for smooth media navigation.
Modern Development Stack: Developed with React, TypeScript, and Vite, ensuring a fast, maintainable, and scalable codebase.

Technologies Used
React 18.3.1
TypeScript 5.2.2
Vite 5.3.1
Tailwind CSS 3.4.4
React Router 6.24.1
React-Swipeable 7.0.1
Instagram Graph API
Netlify
Installation
Clone the repository:

bash
Kopiera kod
git clone https://github.com/yourusername/salukikennel.git
cd salukikennel
Install dependencies:

bash
Kopiera kod
npm install
Set up environment variables:
Create a .env file in the root directory with the following:

plaintext
Kopiera kod
VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN=your_instagram_long_lived_access_token
VITE_NETLIFY_AUTH_TOKEN=your_netlify_auth_token
VITE_NETLIFY_SITE_ID=your_netlify_site_id
Run the development server:

bash
Kopiera kod
npm run dev
Deployment
The project is set up for deployment on Netlify. The site is automatically built and deployed with continuous integration, and the Instagram access token is refreshed every 59 days through a scheduled Netlify function.

License
This project is licensed under the MIT License. See the LICENSE file for details.
