import { useEffect, useState } from 'react'; // <-- Import useEffect

import './App.css';
import './index.css';

// API services
import { getUserProfile } from './services/getUserProfile.js';
import { getUserSavedAlbums } from './services/getUserSavedAlbums.js';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

// components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
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
          for (var i = 0; i < userSavedAlbums.items.length; i++) {
            console.log(userSavedAlbums.items[i].album.name);
          }
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
    <Router>
    <div className="wrapper bg-gray-500">
      <Header loggedIn={spotifyAccesToken} userData={userProfile}/>
      <div className="flex-1 ">
        {/* Landing Page Content Here */}
        {/* Navigation Tabs Section */}
        <Tabs />

        {/* Main Content Area: Dynamically renders components based on the route */}
        {/* Removed vertical padding (py-3 md:py-4) to eliminate space below tabs */}
        <div className="flex-grow flex justify-center w-full px-4"> {/* CHANGED: Removed py-3 md:py-4 */}
          <Routes>
            {/* Define routes for each page/component, passing adminAccess where needed */}
            <Route path="/" />
            <Route path="/announcements" />
            <Route path="/syndication" />
            <Route path="/calendar"/>
            <Route path="/leadership" />
            <Route path="/login" />
            <Route path="/resources" />
          </Routes>
        </div>
          {userProfile ? (
           <></>
          ) : (
             <></>
          )}
          {/* fucking other shit */}
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

function Tabs() {
  // Get the current location object to determine the active path
  const location = useLocation();

  // base CSS classes applied to all tabs
  const baseTabClasses = 'flex-1 px-4 py-2 md:py-4 text-center bg-gray-800 text-white border-b-4 border-transparent transition-colors duration-200 ease-in-out whitespace-nowrap'; // Kept border-b-4

  // Determine the border color class based on whether the tab is active
  const getActiveTabStyling = (path) => {
    if (location.pathname === path) {
      // Active tab
      return 'bg-emerald-500 border-emerald-500 text-white';
    } else {
      // Inactive tab
      return 'hover:bg-gray-700 hover:border-gray-500';
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
