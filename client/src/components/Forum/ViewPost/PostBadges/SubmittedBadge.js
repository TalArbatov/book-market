import React, { useState } from "react";
import styled from "styled-components";
import Star from "@material-ui/icons/Star";
import Fab from "@material-ui/core/Fab";
import Tooltip from '@material-ui/core/Tooltip';
import formatDate from '../../../../utils/formatDate';
const SubmittedBadge = ({post}) => {
  return (
    <>
      {post.isSubmittedPost ?       <Tooltip title={"You submitted this post at " + formatDate(post.date)}>
        <Star style={{width:'0.8em', color:'grey', marginLeft:'10px'}}/>
      </Tooltip> : <></>}
    </>
  )
}

export default SubmittedBadge