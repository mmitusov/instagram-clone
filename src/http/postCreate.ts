import { db, storage } from '../../firebase-config';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString, uploadBytes } from 'firebase/storage';

export const postCreate = async ({session, captionRef, selectegImg}: any) => {
  // create a post
  const docRef = await addDoc(collection(db, 'posts'), {
    username: session?.user?.username,
    profileImg: session?.user?.image, 
    caption: captionRef?.current?.value,
    timestamp: serverTimestamp()
  })

  // get the post ID
  console.log('New document added. ID: ', docRef.id) 
  const imageRef = ref(storage, `/posts/${docRef.id}/image`);

  // upload the image to firebase storage
  const snapshot = await uploadString(imageRef, selectegImg, 'data_url')
  
  // get a download URL
  const downloadURL = await getDownloadURL(imageRef);
  await updateDoc(doc(db, 'posts', docRef.id), {postImg: downloadURL});
}