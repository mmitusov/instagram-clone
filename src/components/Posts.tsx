import React, { useEffect, useState } from 'react'
import Post from './Post'
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase-config'
// import useSWR from 'swr'
 
interface Posts {
  id: string, //It's our unique post ID
  username: string,
  profileImg: string,
  postImg: string,
  caption: string,
  timestamp: string
}

const Posts = () => {
  const [posts, setPosts] = useState<Posts[] | DocumentData[]>([])
  useEffect(() => {
    return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), 
      (snapshot) => {
        //Extract all of the data from snapshot before saving
        const postsData: Posts[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username,
            profileImg: data.profileImg,
            postImg: data.postImg,
            caption: data.caption,
            timestamp: data.timestamp,
          }
        });
        setPosts(postsData);
      }
    )
  }, [db])

  // const { data: posts } = useSWR(db, async () => {
  //   const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  //   const querySnapshot = await getDocs(q);
  //   return querySnapshot.docs;
  // });
  
  return (
    <div>
      {
        Array.isArray(posts) && posts.map(post => (
          <Post 
            key={post.id}
            id={post.id} //It's our unique post ID
            username={post.username}
            userImg={post.profileImg}
            postImg={post.postImg}
            caption={post.caption}
          />
        ))
      }
    </div>
  )
}

export default Posts