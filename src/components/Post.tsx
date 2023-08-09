import React, { useState } from 'react'
import { EllipsisHorizontalIcon, HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'

const Post = ({id, username, userImg, img, caption}: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='bg-white my-7 border rounded-lg'>
      {/* Header */}
      <div className='flex items-center p-5'>
        <img src={userImg} alt='userPic' className='h-12 w-12 object-contain border rounded-full p-1 mr-3'/>
        <p className='flex-1 font-bold'>
          {username}
        </p>
        <EllipsisHorizontalIcon className='h-5'/>
      </div>

      {/* Main img */}
      <img src={img} alt='' className='object-cover w-full'/>

      {/* Buttons */}
      <div className='flex justify-between px-4 pt-4'>
        <div className='flex space-x-4'>
          <HeartIcon className='postBtn'/>
          <ChatBubbleOvalLeftEllipsisIcon className='postBtn'/>
          <PaperAirplaneIcon className='postBtn'/>
        </div>
        <BookmarkIcon className='postBtn'/>
      </div>

      {/* Caption */}
      <div className={`p-5 ${expanded ? '' : 'truncate'}`}>
        <span className='font-bold mr-1'>{username} </span>
        {expanded 
          ?
            <span>{caption}</span>
          :
            <span onClick={() => setExpanded(!expanded)}>
              {caption}
            </span>
        }
      </div>

      {/* Input comment */}
      <form className='flex p-5 justify-between items-center'>
        <FaceSmileIcon className='postBtn'/>
        <input type='text' placeholder='Add a comment...' className='flex-1 border-none focus:ring-0'/>
        <button className='font-semibold text-blue-400'>
          Post
        </button>
      </form>
    </div>
  )
}

export default Post