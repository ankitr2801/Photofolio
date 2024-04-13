
import styles from "./ImageForm.module.css";
import { db } from '../../Firebase-init';
import { collection , addDoc , Timestamp , doc , setDoc} from 'firebase/firestore';



export default function ImageForm({ showImageForm , albumId  ,imageId , title , imageUrl , setTitle , setImageUrl}) {
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(imageId){
                await setDoc(doc(db,'images', imageId), {
                    albumId , 
                    title ,
                    imageUrl 
              });
            }
            handleClearClick();
            const imageRef = collection(db, 'images');
            await addDoc(imageRef, {
                title: title,
                imageUrl: imageUrl,
                created: Timestamp.now(),
                albumId:albumId
            });
            setImageUrl('');
            setTitle('');
        } catch (error) {
            console.error('Error creating album:', error);
        }
    };

    const handleClearClick = () => {
        setImageUrl('');
        setTitle('');
    };

    return (
        <>
            {!showImageForm ? (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <h1>Add Image in Album</h1>
                        <input
                            placeholder='Enter Your Text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            placeholder='Enter Your imageUrl'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                        <div className={styles.buttons}>
                            <button className={styles.imageFormButton} onClick={handleClearClick}>Clear</button>
                            <button type="submit" className={styles.imageFormButton}>Add</button>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    );
}
