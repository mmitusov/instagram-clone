import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db, storage } from "../../firebase-config"
import { deleteObject, ref } from "firebase/storage"

export const postDelete = async (id: any) => {
  await deleteObject(ref(storage, `/posts/${id}/image`))
  await deleteDoc(doc(db, 'posts', id))
}