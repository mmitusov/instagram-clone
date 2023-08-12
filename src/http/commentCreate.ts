import { db } from '../../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface Commnent {
  id: string, 
  comment: string,
  username: string,
  profileImg: any,
}

export const commentCreate = async ({ id, comment, username, profileImg }: Commnent) => {
  // create a comment
  //db, 'posts', id, 'comments' - path
  const docRef = await addDoc(collection(db, 'posts', id, 'comments'), {
    comment: comment,
    username: username,
    profileImg: profileImg,
    timestamp: serverTimestamp()
  })
}