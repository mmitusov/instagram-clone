import React, { useEffect, useState } from 'react'
import Post from './Post'
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase-config'

interface Posts {
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
      snapshot => {setPosts(snapshot.docs)})
  }, [db])
  console.log(posts[0].data())
  
  return (
    <div>
      {
        posts.map(post => (
          <Post 
            key={post.data().timestamp}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            postImg={post.data().postImg}
            caption={post.data().caption}
          />
        ))
      }
    </div>
  )
}

export default Posts