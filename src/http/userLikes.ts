import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase-config"

export const setLike = async ({id, session}: any) => {
  //db, 'posts', id, 'likes', session.user.uid - path
  await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
    username: session?.user?.username
  })
}

export const removeLike = async ({id, session}: any) => {
  //db, 'posts', id, 'likes', session.user.uid - path
  await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid))
}