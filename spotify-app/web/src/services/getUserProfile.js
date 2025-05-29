// The base URL of your backend API
const API_URL = 'http://localhost:3001/api';

/**
 * Fetches data from the backend.
 * @returns {Promise<Object>} The data from the API.
 */
export const getUserProfile = async (accessToken) => {
  try {
    const response = await fetch(`${API_URL}/getUserProfile`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });

    // Check if the request was successful
    if (!response.ok) {
        const errorBody = await response.json();
        console.error("Error fetching user profile", errorBody);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data:", error);
    throw error;
  }
};