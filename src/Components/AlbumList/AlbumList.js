import React, { useState , useEffect } from 'react';
import styles from "./AlbumList.module.css";
import ImageList from '../ImageList/ImageList';
import AlbumForm from '../AlbumForm/AlbumForm';
import { db } from '../../Firebase-init';
import { collection, query, orderBy, onSnapshot} from 'firebase/firestore';

export default function AlbumList() {
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [showImageList, setShowImageList]= useState(false);
    const[albumId , setAlbumId] = useState(null)
    const [albums, setAlbums] = useState([]);
    console.log(albums);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const albumRef = collection(db, 'albums');
                const q = query(albumRef, orderBy('created', 'desc'));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const fetchedAlbums = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setAlbums(fetchedAlbums);
                });
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchAlbums();
    }, []);


    

    const handleClick = () => {
        setShowAlbumForm(!showAlbumForm);
    };

    const handleFormClose = () => {
        setShowAlbumForm(false);
    };

    const handleAlbumClick = (id) => {
        // console.log(id);
        setShowImageList(true);
        setAlbumId(id)
    };


    return (
        <>
            {showAlbumForm && <AlbumForm onClose={handleFormClose} albums={albums} setAlbums={setAlbums} showImageList={showImageList} />}
            {showImageList && <ImageList handleAlbumClick={setShowImageList} albumId={albumId}  setShowAlbumForm={setShowAlbumForm}/>}
            {!showImageList && (
                <div className={styles.container}>
                    <h2>Your Albums</h2>
                    {showAlbumForm ? <button onClick={handleClick} className={styles.AlbumListButton}>Cancel</button> : <button onClick={handleClick} className={styles.AlbumListButton}>Add Album</button>}
                </div>
            )}
            {!showImageList && (
                <div className={styles.List}>
                    {albums.map((album) => (
                        <div key={album.id} className={styles.card} onClick={() => handleAlbumClick(album.id)}>
                            <img src='https://png.pngtree.com/png-vector/20190226/ourmid/pngtree-vector-portfolio-icon-png-image_705750.jpg' alt='poster' className={styles.AlbumListImage} />
                            <span>{album.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
