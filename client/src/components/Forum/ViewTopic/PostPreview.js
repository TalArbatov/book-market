import React from 'react';
import styled from 'styled-components';

const PostPreview = ({post}) => {
  return(
    <div>
      <p>{post.title}</p>
    </div>
  )
}
export default PostPreview;