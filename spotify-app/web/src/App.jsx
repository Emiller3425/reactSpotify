import { useEffect, useState } from 'react'; // <-- Import useEffect
import './App.css';
import './index.css';

// API services
import { getUserProfile } from './services/getUserProfile.js';
import { getUserSavedAlbums } from './services/getUserSavedAlbums.js';

// components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Button from './components/button.jsx';


function App() {
  const [spotifyAccesToken, setSpotifyAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userSavedAlbums, setUserSavedAlbums] = useState(null);

  useEffect(() => {
    // fetch user profile if the user is authenticated
    const fetchUserProfile = async (token) => {
      if (token) {
        try {
          const profileData = await getUserProfile(token);
          setUserProfile(profileData);
          console.log("User Profile:", profileData);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    const fetchUserSavedAlbums = async (token) => {
      if (token) {
        try {
          const userSavedAlbums = await getUserSavedAlbums(token);
          setUserSavedAlbums(userSavedAlbums);
          console.log("User Saved Albums:", userSavedAlbums);
        } catch (error) {
          console.error("Failed to fetch user saved albums:", error);
        }
      }
    };

     // Check for spotify access token in the URL
    const queryparams = new URLSearchParams(window.location.search);
    const token = queryparams.get('access_token');

    // set token and user profile information in fronted
    if (token) {
      console.log("Spotify Access Token Recieved: ", token);
      setSpotifyAccessToken(token);
      fetchUserProfile(token);
      fetchUserSavedAlbums(token);
      // clean token from url
      window.history.replaceState({}, document.title, window.location.pathname);
    }

  }, []);

  return (
    <div className="wrapper bg-gray-500">
      <Header loggedIn={spotifyAccesToken} userData={userProfile}/>
      <div className="flex-1 ">
        {/* Landing Page Content Here */}
          {userProfile ? (
              <></>
          ) : (
              <></>
          )}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
