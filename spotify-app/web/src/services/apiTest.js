// The base URL of your backend API
const API_URL = 'http://localhost:3001/api';

/**
 * Fetches data from the backend.
 * @returns {Promise<Object>} The data from the API.
 */
export const testAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch data:", error);
    // Depending on your error handling strategy, you might want to re-throw the error
    // or return a default value like null.
    throw error;
  }
};

export const spotifyAuth = async () => {
    try {
        const response = await fetch(`${API_URL}/callback`)

        if (!response.ok) {
            throw new Error(`HTPP Error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.log("Could not fetch data", error);
        throw error;
    }
};