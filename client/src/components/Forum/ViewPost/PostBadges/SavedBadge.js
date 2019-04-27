import React, { useState } from "react";
import styled from "styled-components";
import Favorite from "@material-ui/icons/Favorite";
import Fab from "@material-ui/core/Fab";
import Tooltip from '@material-ui/core/Tooltip';
import formatDate from '../../../../utils/formatDate'
const SavedBadge = ({post}) => {
  return (
    <>
      {post.isSavedPost ?       <Tooltip title={"You saved this post at " + formatDate(post.dateSaved)}>
        <Favorite style={{width:'0.7em', color:'grey', marginLeft:'10px'}}/>
      </Tooltip> : <></>}
    </>
  )
}

export default SavedBadge