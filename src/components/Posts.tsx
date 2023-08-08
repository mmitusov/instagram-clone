import React from 'react'
import Post from './Post'

const posts = [
  {
    id: '1',
    username: 'nice',
    userImg: 'https://media.licdn.com/dms/image/C4D03AQEJKHnUCzaTzQ/profile-displayphoto-shrink_800_800/0/1627924003185?e=2147483647&v=beta&t=krHq5etfeQaUoc1rIBA2ejYoJP5T80_6R_Eq-bftz7Y',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png',
    caption: 'Yoooooooo! Yoooooooo! Yoooooooo! Yoooooooo! Yoooooooo!'
  },
  {
    id: '1',
    username: 'nice',
    userImg: 'https://media.licdn.com/dms/image/C4D03AQEJKHnUCzaTzQ/profile-displayphoto-shrink_800_800/0/1627924003185?e=2147483647&v=beta&t=krHq5etfeQaUoc1rIBA2ejYoJP5T80_6R_Eq-bftz7Y',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png',
    caption: 'Yoooooooo!'
  },
]

const Posts = () => {
  return (
    <div>
      {
        posts.map(post => (
          <Post 
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
          />
        ))
      }
    </div>
  )
}

export default Posts