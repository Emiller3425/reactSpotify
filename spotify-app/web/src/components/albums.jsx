import react, {useState} from 'react';

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

    return (
        <div>
            {authStatus?.items ? (
                <>{console.log("User Not Auth")}</>
            ) : (
                <div className="display flex flex-wrap justify-center gap-4 p-4">
                <>{userAlbums?.items.map(album => 
                    <img 
                    key={album.album.id}
                    src={album.album.images[0].url} 
                    alt={album.album.name} 
                    className="h-40 w18 rounded transition duration-300 ease-in-out hover:scale-110" 
                    onClick={() => openAlbumDetails(album)}></img>
                )}</>
                </div>
            )}

            {/* If you want a "back" button or close button for AlbumDetails */}

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
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{details.album.name}</h2>
            <p className="text-gray-700 mb-1">Artist: {details.album.artists[0]?.name}</p>
            <p className="text-gray-700 mb-1">Released: {details.album.release_date}</p>
        </div>
    )
}

export default Albums;