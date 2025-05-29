import { useEffect, useState } from 'react'; // <-- Import useEffect
import './App.css';
import './index.css';

// API services
import { testAPI } from './services/apiTest.js';
import { getUserProfile } from './services/getUserProfile.js';

// components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';


function App() {
  const [spotifyAccesToken, setSpotifyAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Define a function to call testAPI
    const getData = async () => {
      const data = await testAPI();
      if (data) {
        console.log("data from test api:", data);
      }
    };

    const fetchUserProfile = async (token) => {
      if (token) {
        try {
          const profileData = await getUserProfile(token);
          setUserProfile(profileData);
          console.log("User Profile:", profileData);
        } catch (error) {
          console.error("Fialed to fetch user profile:", error);
        }
      }
    };

    getData();

     // Check for spotify access token in the URL
    const queryparams = new URLSearchParams(window.location.search);
    const token = queryparams.get('access_token');

    if (token) {
      console.log("Spotify Access Token Recieved: ", token);
      setSpotifyAccessToken(token);
      fetchUserProfile(token);
      // clean token from url
      window.history.replaceState({}, document.title, window.location.pathname);
    }

  }, []);

  return (
    <div className="wrapper bg-gray-500">
      <Header loggedIn={spotifyAccesToken} userData={userProfile}/>
      <div className="flex-1 ">
        {/* Landing Page Content Here */}
        {spotifyAccesToken && (
          <p className="text-white p-4 text-center"> Spotify Token Received: {spotifyAccesToken}</p>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
