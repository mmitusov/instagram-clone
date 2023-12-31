import React, { useEffect, useState } from 'react'
import { EllipsisHorizontalIcon, HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { removeLike, setLike } from '@/http/userLikes';
import { commentCreate } from '@/http/commentCreate';
import { postDelete } from '@/http/postDelete';
import Moment from 'react-moment';


const Post = ({id, username, userImg, postImg, caption}: any) => {
  const [comment, setComment] = useState<any>('');
  const [commentsList, setCommentsList] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession()

  useEffect(() => {
    return onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), 
      snapshot => {setCommentsList(snapshot.docs)})
  }, [db]) //id

  useEffect(() => {
    return onSnapshot(query(collection(db, 'posts', id, 'likes')), 
      snapshot => {setLikes(snapshot.docs)})
  }, [db]) //id

  useEffect(() => {
    (async() => {
      const checkLiked = await likes.findIndex((like: any) => like.id === session?.user?.uid) !== -1
      setIsLiked(checkLiked)
    })()
  }, [likes]);

  const likePost = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault() 
    if (isLiked) {
      await removeLike({id, session});
    } else {
      await setLike({id, session});
    }
  }

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const commentCopy = comment
    setComment('')

    await commentCreate({
      id, 
      comment: commentCopy,
      username: session?.user?.username!,
      profileImg: session?.user?.image!,
    })
  }

  return ( 
    <div className='bg-white my-7 border rounded-lg'>
      {/* Header */}
      <div className='relative flex items-center p-5'>
        <img src={userImg} alt='userPic' className='h-12 w-12 object-contain border rounded-full p-1 mr-3'/>
        <p className='flex-1 font-bold'>
          {username}
        </p>
        <EllipsisHorizontalIcon className='h-5 cursor-pointer' onClick={() => setShowDropdown(!showDropdown)}/>
        {showDropdown &&
          <button
            onClick={() => postDelete(id)}
            className='absolute top-[25%] right-[50px] border rounded-lg p-2 cursor-pointer hover:bg-red-500 hover:text-white'
          >
            Delete post
          </button>
        }
      </div>

      {/* Main img */}
      <img src={postImg} alt='' className='object-cover w-full'/>

      {/* Buttons */}
      {session &&
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {isLiked
              ?
                <HeartIconFilled className='postBtn text-red-500' onClick={likePost}/>
              :
                <HeartIcon className='postBtn' onClick={likePost}/>
            }
            <ChatBubbleOvalLeftEllipsisIcon className='postBtn'/>
            <PaperAirplaneIcon className='postBtn'/>
          </div>
          <BookmarkIcon className='postBtn'/>
        </div>
      }

      {/* Caption */}
      <div className={`p-5 ${expanded ? '' : 'truncate'}`}>
        {likes.length > 0 &&
          <p className='font-bold mb-1'>{likes.length} likes</p>
        }
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

      {/* Comment section */}
      {commentsList.length > 0 &&
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {commentsList.map((comment: any) => (
            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
              <img src={comment.data().profileImg} alt='userPic' className='h-7 rounded-full'/>
              <span className='font-bold'>{comment.data().username}</span>
              <p className='text-sm flex-1'>{comment.data().comment}</p>
              <Moment fromNow interval={300000} className='pr-5 text-xs'>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))
          }
        </div>
      }

      {/* Input comment */}
      {session &&
        <form className='flex p-5 justify-between items-center'>
          <FaceSmileIcon className='postBtn'/>
          <input 
            type='text' 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment...' 
            className='flex-1 border-none focus:ring-0'
          />
          <button
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
            className='font-semibold text-blue-400'
          >
            Post
          </button>
        </form>
      }
    </div>
  )
}

export default Post