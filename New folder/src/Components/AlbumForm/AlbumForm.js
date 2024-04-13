import React, { useState } from 'react';
import styles from './AlbumForm.module.css';
import { db } from '../../Firebase-init';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, Timestamp , addDoc } from 'firebase/firestore';

export default function AlbumForm({  showImageList }) {
    const [albumName, setAlbumName] = useState('');


    const handleInputChange = (e) => {
        setAlbumName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const albumRef = collection(db, 'albums');
            await addDoc(albumRef, {
                name: albumName,
                created: Timestamp.now(),
            });
            toast.success('Album added successfully.');
            setAlbumName('');
        } catch (error) {
            console.error('Error creating album:', error);
            toast.error('Failed to create album. Please try again later.');
        }
    };

    const handleCancelButton = (e) => {
        e.preventDefault();
        setAlbumName('');
    };

    return (
        <>
            <ToastContainer />
            {!showImageList ? <div className={styles.container}>
                    <form onSubmit={handleFormSubmit}>
                        <span>Create Your Album</span>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Enter Your Album Name"
                                value={albumName}
                                onChange={handleInputChange}
                                required
                                className={styles.AlbumInput}
                            />
                            <button type="button" onClick={handleCancelButton} className={styles.AlbumButton}>
                                Cancel
                            </button>
                            <button type="submit"  className={styles.AlbumButton}>Create</button>
                        </div>
                    </form>
                </div> :null}
        </>
    );
}
