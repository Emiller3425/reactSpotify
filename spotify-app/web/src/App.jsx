import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import './App.css';
import './index.css';

// API services
import { getUserProfile } from './services/getUserProfile.js';
import { getUserSavedAlbums } from './services/getUserSavedAlbums.js';
import { getUserFollowedArtists } from './services/getUserFollowedArtists.js';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';

// components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

// Pages
import AudioPlayer from './components/audioplayer.jsx';
import Albums from './components/albums.jsx';
import Artists from './components/artists.jsx';
import Genres from './components/genres.jsx';
import Search from './components/search.jsx';
import Stats from './components/stats.jsx';

function App () {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
}

function AppContent() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userSavedAlbums, setUserSavedAlbums] = useState(null);
  const [userFollowedArtists, setUserFollowedArtists] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["authentication_token"]);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch user profile if the user is authenticated
    const fetchUserProfile = async (token) => {
      if (token) {
        try {
          const profileData = await getUserProfile(token);
          setUserProfile(profileData);
          // console.log("User Profile:", profileData);
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
          // console.log("User Saved Albums:", userSavedAlbums);
        } catch (error) {
          console.error("Failed to fetch user saved albums:", error);
        }
      }
    };

    const fetchUserFollowedArtists = async (token) => {
      if(token) {
        try {
          const userFollowedArtists = await getUserFollowedArtists(token);
          setUserFollowedArtists(userFollowedArtists);
          // console.log("User Followed Artists:", userFollowedArtists);
        } catch(error) {
          console.error("Failed to fetch user saved albums:", error);
        }
      }
    };

    const setAuthenticationCookie = async (token) => {
      const now = new Date();
      const expiryDate = new Date(now.getTime());
      expiryDate.setHours(expiryDate.getHours() + 1);
      if (token) {
        try {
          setCookie("authentication_token", token, 
            { path: "/", 
              secure: true, 
              sameSite: 'lax',
              expires: expiryDate,
            }
            );
          // console.log("Set authentication cookie successfully");
        } catch(error) {
          // console.log("Failed to store authentication cookie:", error);
        }
      }
    }

     // Check for spotify access token in the URL
    const queryparams = new URLSearchParams(window.location.search);
    let token = queryparams.get('access_token');
    let stateUrl = queryparams.get('state');

    // If no token from URL, try the cookie
    if (!token && cookies.authentication_token) {
        token = cookies.authentication_token;
    }

    // set token and user profile information in fronted
    if (token) {
      // console.log("Spotify Access Token Recieved: ", token);
      setSpotifyAccessToken(token);
      fetchUserProfile(token);
      fetchUserSavedAlbums(token);
      fetchUserFollowedArtists(token);
      setAuthenticationCookie(token);
      if (!cookies?.authentication_token) {
        token = null;
        window.location.reload(true);
      }

      if (stateUrl) {
        try {
          const urlObject = new URL(stateUrl);
          const targetPath = urlObject.pathname;
          navigate(targetPath, {replace:true});
        } catch (e) {
          console.log(`Error parsing state URL from redirection: ${e}`)
        }
      } else {
      // clean token from url
      window.history.replaceState({}, document.title, window.location.pathname);        
      }
    }

  }, []);

  return (
    <div className="wrapper bg-gray-500">
      <Header loggedIn={spotifyAccessToken} userData={userProfile}/>
      <div className="flex-1 ">
        {/* Landing Page Content Here */}
        {/* Navigation Tabs Section */}
        <Tabs />
        {/* Main Content Area: Dynamically renders components based on the route */}
        {/* Removed vertical padding (py-3 md:py-4) to eliminate space below tabs */}
        <div className="flex-grow flex justify-center w-full px-4"> {/* CHANGED: Removed py-3 md:py-4 */}
          <Routes>
            {/* Define routes for each page/component, passing adminAccess where needed */}
            <Route path="/" element = {<Albums loggedIn={spotifyAccessToken} albums = {userSavedAlbums}/>} />
            <Route path="/artists" element = {<Artists loggedIn={spotifyAccessToken} artists={userFollowedArtists}/>} />
            <Route path="/genres" element = {<Genres/>}  />
            <Route path="/audio-player" element = {<AudioPlayer/>} />
            <Route path="/search" element = {<Search/>} />
            <Route path="/stats" element = {<Stats/>}  />
          </Routes>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

function Tabs() {
  // Get the current location object to determine the active path
  const location = useLocation();

  // base CSS classes applied to all tabs
  const baseTabClasses = 'flex-1 px-4 py-2 md:py-4 text-center bg-gray-800 text-white border-b-4 transition-colors duration-200 ease-in-out whitespace-nowrap'; // Kept border-b-4

  // Determine the border color class based on whether the tab is active
  const getActiveTabStyling = (path) => {
    if (location.pathname === path) {
      // Active tab
      return 'bg-gray-1000 border-emerald-500 text-white';
    } else {
      // Inactive tab
      return 'hover:bg-gray-700 hover:border-emerald-100';
    }
  };

  return (
    // Container for the tabs:
    <div className="flex flex-wrap w-full">
       {/* Navigation links for each section */}
      <Link to="/" className={`${baseTabClasses} ${getActiveTabStyling('/')}`}>Albums</Link>
      <Link to="/artists" className={`${baseTabClasses} ${getActiveTabStyling('/artists')}`}>Artists</Link>
      <Link to="/genres" className={`${baseTabClasses} ${getActiveTabStyling('/genres')}`}>Genres</Link>
      <Link to="/audio-player" className={`${baseTabClasses} ${getActiveTabStyling('/audio-player')}`}>Audio Player</Link>
      <Link to="/search" className={`${baseTabClasses} ${getActiveTabStyling('/search')}`}>Search</Link>
      <Link to="/stats" className={`${baseTabClasses} ${getActiveTabStyling('/stats')}`}>Stats</Link>
    </div>
  );
}


export default App;
