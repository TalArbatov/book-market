import React from 'react';
import {Link} from 'react-router-dom';
import PostPreview from './PostPreview';
const PostPreviewList = ({posts}) => {
  return(
    <>
    {posts.map((post, index) => {
      return <PostPreview key={index}post={post}/>
    })}
    </>
  )
}

export default PostPreviewList