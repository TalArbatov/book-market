import React from 'react';
import {Link} from 'react-router-dom';
import PostPreview from './PostPreview';
const PostPreviewList = ({posts}) => {
  return(
    <>
    {posts.map((post, index) => {
      return <Link key={index} to="/fuck"><PostPreview post={post}/></Link>
    })}
    </>
  )
}

export default PostPreviewList