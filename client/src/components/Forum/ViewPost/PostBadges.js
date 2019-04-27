import React, { useState } from "react";
import styled from "styled-components";
import PopWindow from "./PopWindow";
import Star from "@material-ui/icons/Star";
import Fab from "@material-ui/core/Fab";
import Tooltip from '@material-ui/core/Tooltip';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
`;

const PostBadges = props => {
  return (
    <Container>
      <Tooltip title={"You created this post"}>
        <Star style={{width:'0.8em', color:'grey'}}/>
      </Tooltip>
      <Tooltip title="More options">
      <PopWindow post={props.post} />
      </Tooltip>
    </Container>
  );
};

export default PostBadges;
