import react, {useState} from 'react';

function Artists({loggedIn, artists}) {
    const userArtists = artists;
    const authStatus = loggedIn;

    const [selectedArtist, setSelectedArtist] = useState(null);
    const [showModal, setShowModal] = useState(null);

    const openArtistDetails = (artist) => {
        setSelectedArtist(artist);
        setShowModal(true);
    };

    const CloseArtistDetails = () => {
        setShowModal(false);
        setSelectedArtist(null);
    }

    return (
        <div>
            {authStatus?.items ? (
                <>{console.log("User Not Auth")}</>
            ) : (
                <div className="display flex flex-wrap justify-center gap-4 p-4">
                <>{userArtists?.artists.items.map(artist => 
                    <img 
                    key={artist.id}
                    src={artist.images[0].url} 
                    alt={artist.name} 
                    className="h-40 w18 rounded transition duration-300 ease-in-out hover:scale-110" 
                    onClick={() => openArtistDetails(artist)}></img>
                )}</>
                </div>
            )}

            {/* If you want a "back" button or close button for AlbumDetails */}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="absolute inlet-0" onClick={CloseArtistDetails}></div>

                    <div className='bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative z-10'>
                        {selectedArtist && <ArtistDetails artist={selectedArtist} />}
                        <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        onClick={CloseArtistDetails}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

function ArtistDetails({artist}) {
    if (!artist) {
        return null;
    }

    const details = artist;
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{details.name}</h2>
            <p className="text-gray-700 mb-1">Popularity: {details.popularity}</p>
            <p className="text-gray-700 mb-1">Followers: {details.followers.total}</p>
        </div>
    )
}

export default Artists;