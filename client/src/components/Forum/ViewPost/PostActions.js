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
        <button>Save</button>
        <button>Share</button>
      </ButtonWrapper>
    </ButtonArrayWrapper>
  );
};

export default PostActions;
