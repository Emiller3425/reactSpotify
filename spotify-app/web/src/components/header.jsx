import {useState} from 'react';
import spoootify from '../images/spoootify.png';
import LoginButton from './loginbutton.jsx';
import UserProfileCard from './userProfileCard.jsx';
import defaultUserImage from '../images/defaultUserProfileImage.jpg';

function Header({loggedIn, userData}) {
    const userProfileData = userData;
    return (
        <div className="flex flex-col bg-slate-900 px-4 py-2 text-white">
            <div className="flex items-center justify-between">
                {/* Left Aligned */}
                <div className="flex items-center">
                    <img src={spoootify} alt="Spoootify Logo" className="h-24 w-24"></img>
                </div>
                {/* Right Aligned */}
            <UserGreeting status={loggedIn} user={userProfileData}/>
            </div>
        </div>
    );
}

function UserGreeting({status, user}) {
    const [profileIsHovered, setProfileIsHovered] = useState(false);

    if (status && user) {
        return (
        <div 
        onMouseEnter={() => setProfileIsHovered(true)} 
        onMouseLeave={() => setProfileIsHovered(false)}
        className="flex flex-row items-end" 
        >
        <h1>Hello {user.display_name}!&nbsp;&nbsp;&nbsp;</h1>
        {user?.images?.[0]?.url ? (
            <img src={user.images[0].url} alt="User Profile" className="h-8 w-8 rounded-full"></img>
        ) : (
            <img src={defaultUserImage} alt="User Profile" className="h-8 w-8 rounded-full"></img>
        )}
        {profileIsHovered === true ? (
            <>
            <UserProfileCard loggedIn={true}/>
            </>
        ) : (
            <></>
        )}
        </div>
        );
    } else {
        return <LoginButton displayText="Log In"/>;
    }
}


export default Header;