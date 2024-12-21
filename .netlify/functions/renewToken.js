/* eslint-disable no-undef */
import fetch from 'node-fetch';

export async function handler() {
  const longLivedAccessToken = process.env.VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN;  // Access token from environment variables
  const siteId = process.env.VITE_NETLIFY_SITE_ID;  // Netlify Site ID
  const netlifyToken = process.env.VITE_NETLIFY_AUTH_TOKEN;  // Netlify API Token

  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLivedAccessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.access_token) {
      // Update the environment variable in Netlify via API
      const updateEnvUrl = `https://api.netlify.com/api/v1/sites/${siteId}/env`;
      const updateResponse = await fetch(updateEnvUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${netlifyToken}`,
        },
        body: JSON.stringify({
          VITE_INSTAGRAM_LONGLIVED_ACCESSTOKEN: data.access_token,  // Updating the token
        }),
      });

      const updateData = await updateResponse.json();

      if (updateResponse.ok) {
        console.log('Access token renewed and updated:', data.access_token);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Access token renewed and updated successfully.' }),
        };
      } else {
        console.error('Failed to update environment variable:', updateData);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Failed to update environment variable.', error: updateData }),
        };
      }
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to renew access token.', error: data }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error renewing access token.', error: error.message }),
    };
  }
}

