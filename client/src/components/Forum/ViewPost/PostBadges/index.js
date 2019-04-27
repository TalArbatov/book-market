import React, { useState } from "react";
import styled from "styled-components";
import Star from "@material-ui/icons/Star";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import SubmittedBadge from "./SubmittedBadge";
import PopWindow from "../PopWindow";
import OptionsBadge from "./OptionsBadge";
import SavedBadge from "./SavedBadge";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostBadges = props => {
  return (
    <Container>
      <SubmittedBadge post={props.post} />
      <SavedBadge post={props.post}></SavedBadge>
      <OptionsBadge post={props.post} />
    </Container>
  );
};

export default PostBadges;
