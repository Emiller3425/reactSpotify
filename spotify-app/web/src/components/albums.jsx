import React, {useState} from 'react';

function Albums({loggedIn, albums}) {
    const userAlbums = albums;
    const authStatus = loggedIn;

    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [showModal, setShowModal] = useState(null);

    const openAlbumDetails = (album) => {
        setSelectedAlbum(album);
        setShowModal(true);
    };

    const CloseAlbumDetails = () => {
        setShowModal(false);
        setSelectedAlbum(null);
    }

    const isUserLoggedIn = authStatus;

    const isLoading = isUserLoggedIn && userAlbums === null;

    const noAlbumsFound = userAlbums && (!userAlbums.items || userAlbums.items.length <= 0);

    let content;

    if (!isUserLoggedIn) {
        content = <div><h1>Log in to view albums.</h1></div>;
    } else if (isLoading) {
        content = (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <h1 className="ml-4 text-xl font-medium">Loading Albums...</h1>
            </div>
        )
    } else if (noAlbumsFound) {
        content = <div><h1>No albums found</h1></div>;
    } else {
        // Logged in, loaded, and albums exist.
        content = (
            <div className="display flex flex-wrap justify-center gap-4 p-4">
                {userAlbums.items.map(album => (
                    <img 
                        key={album.album.id}
                        src={album.album.images[0]?.url}
                        alt={album.album.name}
                        className="h-40 w-40 object-cover rounded transition duration-300 ease-in-out hover:scale-110 cursor-pointer" 
                        onClick={() => openAlbumDetails(album)}
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            {content}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="absolute inlet-0" onClick={CloseAlbumDetails}></div>

                    <div className='bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative z-10'>
                        {selectedAlbum && <AlbumDetails album={selectedAlbum} />}
                        <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        onClick={CloseAlbumDetails}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

function AlbumDetails({album}) {
    if (!album || !album.album) {
        return null;
    }

    const details = album;
    const albumDate = new Date(details.album.release_date);

    const dateSpecifications = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const formattedDateUS = new Intl.DateTimeFormat('en-US', dateSpecifications).format(albumDate);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{details.album.name}</h2>
            <p className="text-gray-700 mb-1">Artist: {details.album.artists[0]?.name}</p>
            <p className="text-gray-700 mb-1">Released: {formattedDateUS}</p>
        </div>
    )
}

export default Albums;