import React from 'react';
import {Link} from 'react-router-dom';
import PostPreview from './PostPreview';
const PostPreviewList = ({posts, topic}) => {
  return(
    <>
    {posts.map((post, index) => {
      return <PostPreview key={index}post={post} topic={topic}/>
    })}
    </>
  )
}

export default PostPreviewList