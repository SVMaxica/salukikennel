
// import axios from 'axios'; 

// // Bas-URL för Strapi API:t. Ersätt 'din-strapi-url-här' med din faktiska URL.
// const STRAPI_BASE_URL = 'https://din-strapi-url-här/api';


// const STRAPI_ACCESSTOKEN = process.env.STRAPI_ACCESSTOKEN;

// // Denna funktion gör en GET-förfrågan till en specifik endpoint på Strapi och returnerar datan.
// // 'endpoint' parametern specificerar vilken del av API:t som ska hämtas, t.ex. 'testimonials' eller 'litters'.
// export const fetchStrapiData = async (endpoint: string) => {
//   try {
//     // Vi använder axios för att göra en GET-begäran till Strapi API:t.
//     // Vi skickar med vår access token i Authorization-headern för att autentisera.
//     const response = await axios.get(`${STRAPI_BASE_URL}/${endpoint}`, {
//       headers: {
//         Authorization: `Bearer ${STRAPI_ACCESSTOKEN}`, // Strapi kräver att vi autentiserar med Bearer-token.
//       },
//     });
//     return response.data; // Returnerar datan från Strapi API:t om anropet lyckas.
//   } catch (error) {
//     // Fångar och loggar eventuella fel som uppstår vid hämtningen.
//     console.error('Error fetching data from Strapi:', error);
//     throw new Error('Failed to fetch Strapi data'); // skickar ett felmeddelande om något går snett.
//   }
// };
