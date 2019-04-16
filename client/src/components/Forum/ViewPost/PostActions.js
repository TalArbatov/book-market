import React from "react";
import styled from "styled-components";
import ButtonWrapper from "../../shared/ButtonWrapper";
import { Button } from "@material-ui/core";
const ButtonArrayWrapper = styled.div`
  button {
    margin-right: 5px;
  }
`;
const PostActions = props => {
  return (
    <ButtonArrayWrapper>
      <ButtonWrapper>
        <button onClick={props.toggleCreateComment}>Reply</button>
        {props.isSavedPost ? (
          <button onClick={() => props.toggleSavePost('unsave')}>Unsave</button>
        ) : <button onClick={() => props.toggleSavePost('save')}>Save</button>}
        
        <button>Share</button>
      </ButtonWrapper>
    </ButtonArrayWrapper>
  );
};

export default PostActions;
