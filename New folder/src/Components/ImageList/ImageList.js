import React, { useState, useEffect } from 'react';
import styles from './ImageList.module.css';
import ImageForm from '../ImageForm/ImageForm';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../../Firebase-init';

export default function ImageList({ handleAlbumClick, albumId}) {
  const [showImageForm, setShowImageForm] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const[imageId , setImageId] = useState(null)


  const fetchImages = async () => {
    try {
      const albumRef = collection(db, 'images');
      const q = query(albumRef, orderBy('created', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredImages = fetchedData.filter((image) => image.albumId === albumId);
        setImages(filteredImages);
      });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [albumId]);

  const handleFormClick = () => {
    setShowImageForm(true);
  };

  const handleCancelClick = () => {
    setShowImageForm(false);
  };

  const handleDelete = async (imageId) => {
    const docRef = doc(db, 'images', imageId);
    console.log(docRef);
    await deleteDoc(docRef);
    fetchImages()
  };

  const handleUpdate = async (imgId) => {
    setShowImageForm(true)
     setTitle(imgId.title)
     setImageUrl(imgId.imageUrl)
    setImageId(imgId.id)
  }


  return (
    <>
      {showImageForm && <ImageForm setImages={setImages} images={images} albumId={albumId} imageId={imageId} title={title} setTitle={setTitle} imageUrl={imageUrl} setImageUrl={setImageUrl}/>}
      <div className={styles.container}>
        <div className={styles.upperTitle}>
          <img src="https://cdn-icons-png.flaticon.com/512/0/340.png" alt="Back" className={styles.backLogo} onClick={() => handleAlbumClick(false)} />
          {images.length <= 0 ? (<h1 className={styles.heading} >No Image Found In this AlbumList</h1>) : <h1>Images Available</h1>}
          {!showImageForm ? <button onClick={handleFormClick} className={styles.imageListButton}>Add Image</button> : (<button onClick={handleCancelClick} className={styles.imageListButton}>Cancel</button>)}
        </div>
      </div>
      <div className={styles.List}>
        {images.map((image , i) => (
          <div key={i} className={styles.card}>
            <img src={image.imageUrl} alt='poster' className={styles.ImageList} />
            <div className={styles.imageName}>
              <span>{image.title}</span>
              <div className={styles.icons}>
                <img className={styles.icon} src="https://previews.123rf.com/images/igoun/igoun1805/igoun180500088/101280971-cross-icon-in-circle-can-be-used-as-delete-block-close-button-etc-delete-x-cross-rounded-icon-is.jpg" alt="Delete" onClick={() => handleDelete(image.id)} />
                <img className={styles.icon} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwgm73OJoUDea22Fe7b-fgGe2pfscCOy03iHFqIEwew&s" alt="Edit" onClick={() => handleUpdate(image)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
